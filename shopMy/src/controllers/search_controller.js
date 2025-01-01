import { use_search_store } from "../stores/search";

export const search_controller = {
  async init_search_page(route) {
    const store = use_search_store();

    await store.fetch_categories();

    const category = route.query.category || null;
    const page = parseInt(route.query.page) || 1;

    if (category) {
      const matched_category = store.categories.find(
        (c) => c.name_zh === decodeURIComponent(category)
      );
      store.set_selected_category(matched_category?.category_id || null);
    }

    store.set_current_page(page);
    await store.fetch_products(page, store.selected_categoryId);
  },

  async handle_category_select(categoryId, router, route) {
    const store = use_search_store();

    if (store.selected_categoryId === categoryId) {
      store.set_selected_category(null);
      router.push({ path: "/search" });
      await store.fetch_products(1, null);
    } else {
      const category_name = store.categories.find(
        (category) => category.category_id === categoryId
      )?.name_zh;
      store.set_selected_category(categoryId);
      console.log("設定的分類ID:", categoryId); // 確認是否正確設置
      router.push({
        path: "/search",
        query: { category: encodeURIComponent(category_name) },
      });
      await store.fetch_products(1, categoryId);
    }
  },

  async update_current_page(page, router, route) {
    const store = use_search_store();

    if (page !== store.currentPage) {
      router.push({
        path: "/search",
        query: {
          category: route.query.category,
          page,
        },
      });
      await store.fetch_products(page, store.selected_categoryId);
    }
  },
};
