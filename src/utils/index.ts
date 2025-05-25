import dayjs from "dayjs";
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 安全获取嵌套对象属性的值
 * @param obj 要查询的对象
 * @param path 属性路径，可以是字符串或数组
 * @param defaultValue 如果解析值是 undefined 时返回的默认值
 * @returns 返回解析的值或默认值
 */
export function get<T, D>(
  obj: T,
  path: string | Array<string | number>,
  defaultValue?: D
): any | D {
  // 将路径统一转换为数组形式
  const pathArray = Array.isArray(path)
    ? path
    : path.split(/[\.\[\]]/).filter(Boolean);

  let result: any = obj;

  for (const key of pathArray) {
    if (result == null) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}

type DebouncedFunction<T extends (...args: any[]) => any> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this; // 保存原函数的 this 上下文
    const later = () => {
      timeoutId = null; // 清空定时器 ID
      // 非立即执行模式下，延迟结束后调用原函数
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeoutId; // 判断是否需要立即执行

    // 每次调用时，先清除之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 设置新的定时器
    timeoutId = setTimeout(later, wait);

    // 立即执行模式且首次触发时，直接调用原函数
    if (callNow) {
      func.apply(context, args);
    }
  };
}


export const HOLIDAYS_2025 = [
  { date: "2025-01-01", name: "元旦" },
  { date: "2025-01-28", name: "除夕" },
  { date: "2025-01-29", name: "春节" },
  { date: "2025-01-30", name: "春节" },
  { date: "2025-01-31", name: "春节" },
  { date: "2025-02-01", name: "春节" },
  { date: "2025-02-02", name: "春节" },
  { date: "2025-02-03", name: "春节" },
  { date: "2025-02-04", name: "春节" },
  { date: "2025-04-04", name: "清明节" },
  { date: "2025-04-05", name: "清明节" },
  { date: "2025-04-06", name: "清明节" },
  { date: "2025-05-01", name: "劳动节" },
  { date: "2025-05-02", name: "劳动节" },
  { date: "2025-05-03", name: "劳动节" },
  { date: "2025-05-04", name: "劳动节" },
  { date: "2025-05-05", name: "劳动节" },
  { date: "2025-10-01", name: "国庆节" },
  { date: "2025-10-02", name: "国庆节" },
  { date: "2025-10-03", name: "国庆节" },
  { date: "2025-10-04", name: "国庆节" },
  { date: "2025-10-05", name: "国庆节" },
  { date: "2025-10-06", name: "国庆节" },
  { date: "2025-10-07", name: "国庆节" },
  { date: "2025-10-08", name: "国庆节" },
];

interface TradingDayInfo {
  // 当前日期 YYYY-MM-DD
  currentDate: string;
  // 是否交易日
  isTradingDay: boolean;
  // 交易日 节假日 周末休市
  currentDateName: string;
  // 上一个交易日日期 YYYY-MM-DD
  lastTradingDate: string;
}

function getDateInfo(date: dayjs.Dayjs): { name: string; isTradingDay: boolean } {
  const dateStr = date.format('YYYY-MM-DD');
  const weekdayNames = ['周末休市', '周一', '周二', '周三', '周四', '周五', '周末休市'];
  
  // 检查节假日数据
  const holiday = HOLIDAYS_2025.find(h => h.date === dateStr);
  if (holiday) {
    return {
      name: holiday.name,
      isTradingDay: false,
    };
  }
  
  // 周末判断
  const dayOfWeek = date.day();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      name: weekdayNames[dayOfWeek],
      isTradingDay: false
    };
  }
  
  // 默认交易日
  return {
    name: weekdayNames[dayOfWeek],
    isTradingDay: true
  };
}

// 获取上一个交易日
function findLastTradingDay(currentDate: dayjs.Dayjs): string {
  let date = currentDate.subtract(1, 'day');
  const maxLookbackDays = 20; // 最多回溯20天
  
  for (let i = 0; i < maxLookbackDays; i++) {
    const { isTradingDay } = getDateInfo(date);
    if (isTradingDay) {
      return date.format('YYYY-MM-DD');
    }
    date = date.subtract(1, 'day');
  }
  
  return currentDate.format('YYYY-MM-DD');
}

// 主函数
export function getTradingDayInfo(inputDate?: string | Date): TradingDayInfo {
  const today = inputDate ? dayjs(inputDate) : dayjs();
  const { name, isTradingDay } = getDateInfo(today);
  
  return {
    currentDate: today.format('YYYY-MM-DD'),
    isTradingDay: isTradingDay,
    currentDateName: name,
    lastTradingDate: isTradingDay 
      ? today.format('YYYY-MM-DD') 
      : findLastTradingDay(today)
  };
}