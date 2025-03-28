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