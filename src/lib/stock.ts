import { getFileCookie } from '@/lib/cookie';
import axios from 'axios';
import { get } from '@/utils/index';
import { StockData } from '@/types/xueqiu';
import { FEStock } from '@/types/fe';

export async function getIndexData(): Promise<FEStock[]> {
  const cookie = await getFileCookie();
  const res = await axios.request({
    method: 'get',
    url: 'https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,HKHSTECH,.DJI&extend=detail&is_delay_hk=false',
    headers: {
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    },
  });
  const result: FEStock[] = [];
  const list = get(res.data, 'data.items', []) as StockData[];
  
  list.forEach((item: StockData) => {
    const indexData: FEStock = {
      name: item.quote.name,
      symbol: item.quote.symbol,
      status_id: item.market.status_id,
      status: item.market.status,
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



function getLogo(symbol: string, region: string): string {

  if (symbol.startsWith('0')) {
    return `https://baidu-finance.cdn.bcebos.com/imgs/icons/${symbol.slice(1)}.svg`;
  }

  if (region === 'US') {
    return `https://baidu-finance.cdn.bcebos.com/imgs/icons/${symbol.toLocaleLowerCase()}.svg`;
  }


  if (region === 'CN') {
    return `https://baidu-finance.cdn.bcebos.com/imgs/icons/${symbol.slice(2)}.svg`;
  }


  return ''


}

export async function getStockData(symbol: string[] | number[]): Promise<FEStock[]> {
  const cookie = await getFileCookie();
  const res = await axios.request({
    method: 'get',
    url: `https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=${symbol.join(',')}&extend=detail&is_delay_hk=true`,
    headers: {
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    },
  });

  const result: FEStock[] = [];
  const list = get(res.data, 'data.items', []) as StockData[];
  
  list.forEach((item: StockData) => {
    const indexData: FEStock = {
      name: item.quote.name,
      symbol: item.quote.symbol,
      status_id: item.market.status_id,
      status: item.market.status,
      region: item.market.region,
      percent: item.quote.percent,
      current: item.quote.current,
      chg: item.quote.chg,
      timestamp: Math.floor(item.quote.timestamp / 1000),
      logo: getLogo(item.quote.symbol, item.market.region),
    };
    result.push(indexData);
  });

  return result;
}