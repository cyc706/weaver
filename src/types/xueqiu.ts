/**
 * 雪球股票数据类型定义
 */

/**
 * 市场信息
 */
export interface Market {
  status_id: number;       // 市场状态ID，如：2表示盘前交易
  region: string;          // 地区，如：US
  status: string;          // 交易状态，如：盘前交易
  time_zone: string;       // 时区，如：America/New_York
  time_zone_desc: string | null; // 时区描述
  delay_tag: number;       // 延迟标记
}

/**
 * 股票报价信息
 */
export interface Quote {
  symbol: string;          // 股票代码，如：META
  code: string;            // 代码，如：META
  exchange: string;        // 交易所，如：NASDAQ
  name: string;            // 股票名称，如：Meta
  type: number;            // 类型
  sub_type: string;        // 子类型
  status: number;          // 状态
  current: number;         // 当前价格
  currency: string;        // 货币，如：USD
  percent: number;         // 涨跌幅百分比
  chg: number;             // 涨跌额
  timestamp: number;       // 时间戳
  time: number;            // 时间
  lot_size: number;        // 手数
  tick_size: number;       // 最小变动价位
  open: number;            // 开盘价
  last_close: number;      // 上一个交易日收盘价
  high: number;            // 最高价
  low: number;             // 最低价
  avg_price: number;       // 平均价格
  volume: number;          // 成交量
  amount: number;          // 成交额
  turnover_rate: number;   // 换手率
  amplitude: number;       // 振幅
  market_capital: number;  // 市值
  float_market_capital: number | null; // 流通市值
  total_shares: number;    // 总股本
  float_shares: number | null; // 流通股本
  issue_date: number;      // 上市日期
  lock_set: number;        // 锁定设置
  current_year_percent: number; // 今年以来涨跌幅
  high52w: number;         // 52周最高
  low52w: number;          // 52周最低
  variable_tick_size: string; // 可变最小变动价位
  volume_ratio: number;    // 量比
  eps: number;             // 每股收益
  pe_ttm: number;          // 市盈率(TTM)
  pe_lyr: number;          // 市盈率(LYR)
  navps: number;           // 每股净资产
  pb: number;              // 市净率
  dividend: number;        // 股息
  dividend_yield: number;  // 股息收益率
  psr: number;             // 市销率
  short_ratio: number | null; // 空头比例
  inst_hld: number | null; // 机构持股
  beta: number | null;     // 贝塔系数
  timestamp_ext: number;   // 扩展时间戳
  current_ext: number;     // 扩展当前价格
  percent_ext: number;     // 扩展涨跌幅
  chg_ext: number;         // 扩展涨跌额
  contract_size: number;   // 合约大小
  pe_forecast: number;     // 预测市盈率
  profit_forecast: number; // 预测利润
  profit: number;          // 利润
  profit_four: number;     // 四季度利润
  pledge_ratio: number | null; // 质押率
  goodwill_in_net_assets: number; // 净资产中的商誉
  shareholder_funds: number; // 股东资金
}

/**
 * 其他信息
 */
export interface Others {
  cyb_switch: boolean;     // 创业板开关
}

/**
 * 完整的股票数据
 */
export interface StockData {
  market: Market;          // 市场信息
  quote: Quote;            // 股票报价信息
  others: Others;          // 其他信息
}