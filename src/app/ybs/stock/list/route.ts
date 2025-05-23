import { getStockData } from "@/lib/stock";

export async function GET() {
  const list = [
    {
      name: "阿里巴巴-W",
      symbol: "09988",
      region: "HK",
    },
    {
      name: "快手-W",
      symbol: "01024",
      region: "HK",
    },
    {
      name: "理想汽车-W",
      symbol: "02015",
      region: "HK",
    },
    {
      name: "小米集团-W",
      symbol: "01810",
      region: "HK",
    },
    {
      name: "小鹏汽车-W",
      symbol: "09868",
      region: "HK",
    },
    {
      name: "泡泡玛特",
      symbol: "09992",
      region: "HK",
    },
    {
      name: "美团-W",
      symbol: "03690",
      region: "HK",
    },
    {
      name: "蔚来-SW",
      symbol: "09866",
      region: "HK",
    },
    {
      name: "零跑汽车",
      symbol: "09863",
      region: "HK",
    },
    {
      name: "万科企业",
      symbol: "02202",
      region: "HK",
    },
    {
      name: "蜜雪集团",
      symbol: "02097",
      region: "HK",
    },
    {
      name: "贵州茅台",
      symbol: "SH600519",
      region: "CN",
    },
    {
      name: "特斯拉",
      symbol: "TSLA",
      region: "US",
    },
    {
      name: "英伟达",
      symbol: "NVDA",
      region: "US",
    },
    {
      name: "Meta",
      symbol: "META",
      region: "US",
    },
    {
      name: "亚马逊",
      symbol: "AMZN",
      region: "US",
    },
    {
      name: "谷歌A",
      symbol: "GOOGL",
      region: "US",
    },
    {
      name: "微软",
      symbol: "MSFT",
      region: "US",
    },
    {
      name: "苹果",
      symbol: "AAPL",
      region: "US",
    },
  ];

  const result = await getStockData(list.map((item) => item.symbol));
  return Response.json(result);
}
