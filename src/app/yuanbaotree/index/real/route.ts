import { getFileCookie } from '@/lib/cookie';
import axios from 'axios';
import { get } from '@/utils/index';

export async function GET() {
  const data = await getIndexData();

  return Response.json({
    code: 0,
    data,
  });
}

interface IndexData {
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

async function getIndexData(): Promise<IndexData[]> {
  const cookie = await getFileCookie();
  const res = await axios.request({
    method: 'get',
    url: 'https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,HKHSTECH,.DJI&extend=detail&is_delay_hk=false',
    headers: {
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    },
  });
  const result: IndexData[] = [];
  const list = get(res.data, 'data.items', []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list.forEach((item: any) => {
    const indexData: IndexData = {
      name: item.quote.name,
      symbol: item.quote.symbol,
      status_id: item.market.status,
      status: item.market.status_text,
      region: item.market.region,
      percent: item.quote.percent,
      current: item.quote.current,
      chg: item.quote.chg,
      timestamp: Math.floor(item.quote.timestamp / 1000),
    };
    result.push(indexData);
  });

  return result;

}


