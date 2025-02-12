import { use_search_store } from "../stores/search";

export const search_controller = {
  // 初始化搜索頁
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
    await store.fetch_products(page, store.selected_category_id);
  },

  // 選擇分類
  async handle_category_select(category_id, router) {
    const store = use_search_store();

    // 重複點選同個分類 取消所選分類 呈現所有商品
    if (store.selected_category_id === category_id) {
      store.set_selected_category(null);
      router.push({ path: "/search" });
      await store.fetch_products(1, null);
    } else {
      // 找到所選種類的 id 獲取他的中文名稱 丟給 url 轉譯
      const category_name = store.categories.find(
        (c) => c.category_id === category_id
      )?.name_zh;
      store.set_selected_category(category_id);

      // 改變 url 防止丟失
      router.push({
        path: "/search",
        query: { category: encodeURIComponent(category_name) },
      });
      await store.fetch_products(1, category_id);
    }
  },

  // 更新當前頁數
  async update_current_page(page, router, route) {
    const store = use_search_store();

    if (page !== store.currentPage) {
      // 更新 url 這樣重整不會丟失
      router.push({
        path: "/search",
        query: {
          category: route.query.category,
          page,
        },
      });
      await store.fetch_products(page, store.selected_category_id);
    }
  },
};
