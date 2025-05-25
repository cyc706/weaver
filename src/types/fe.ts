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
  current_year_percent: number; // 年初至今涨跌幅
  logo?: string; // 图标
}


export interface FESearchStock {
  symbol: string;          // 股票代码，如：BABA
  name: string;          // 股票名称，如：阿里巴巴
  region: string;      // 交易所，如：NYSE HK CN
}