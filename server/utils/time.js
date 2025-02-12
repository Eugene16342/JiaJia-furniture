const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Taipei");

const getCurrentTime = () => dayjs().tz().toDate();
const formatTime = (date, format = "YYYY-MM-DD HH:mm:ss") =>
  dayjs(date).tz().format(format);

module.exports = { dayjs, getCurrentTime, formatTime };
