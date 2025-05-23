export interface FEStock {
  name: string;
  symbol: string;
  status_id: number; // 5交易中 8休市
  status: string; // 交易状态tag
  region: string; // 地区
  percent: number; // 涨跌幅
  current: number; // 当前价
  chg: number; // 涨跌额
  timestamp: number; // 时间戳
}
