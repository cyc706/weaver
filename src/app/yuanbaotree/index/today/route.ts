import axios from "axios";
import dayjs from "dayjs";
import { get, getTradingDayInfo } from "@/utils/index";

interface ListTimeItem {
  time: string;
  value: number;
}

interface FormatListTimeItem {
  time: number;
  value: number;
}

function formatDateFromStr(
  dateStr: string,
  list: ListTimeItem[]
): FormatListTimeItem[] {
  const today930Time = Math.floor(
    dayjs(dateStr).hour(9).minute(30).second(0).valueOf() / 1000
  );
  return list.map((item, index) => {
    return {
      time: today930Time + index * 60,
      value: item.value,
    };
  });
}

export async function GET() {
  const today = dayjs().format("YYYY-MM-DD");

  const dayInfo = getTradingDayInfo(today);
  const { lastTradingDate, currentDate, currentDateName, isTradingDate } =
    dayInfo;
  const indexCode = "000001"; // 上证指数

  try {
    const [minDataResult, summaryResult] = await Promise.all([
      // 上证指数的分时数据
      axios.request({
        method: "get",
        url: "http://47.99.211.178:8888/api/public/index_zh_a_hist_min_em",
        params: {
          symbol: indexCode,
          period: "1",
          start_date: `${lastTradingDate} 09:30:00`,
          end_date: `${lastTradingDate} 15:00:00`,
        },
      }),

      axios.request({
        method: "get",
        url: "http://47.99.211.178:8888/api/public/index_zh_a_hist",
        params: {
          symbol: indexCode,
          start_date: `${lastTradingDate}`,
          end_date: `${lastTradingDate}`,
        },
      }),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list = minDataResult.data.map((item: any) => {
      return {
        time: item.时间,
        value: item.最低,
      };
    });

    return Response.json({
      code: 0,
      data: {
        list: formatDateFromStr(lastTradingDate, list),
        summary: {
          indexCode,
          indexName: "上证指数",
          currentDate,
          currentDateName,
          isTradingDate,
          date: get(summaryResult.data, "[0].日期"),
          value: get(summaryResult.data, "[0].收盘"),
          diff: get(summaryResult.data, "[0].涨跌额"),
          diffPercent: get(summaryResult.data, "[0].涨跌幅"),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({
      code: 1,
      message: "获取数据异常",
    });
  }
}
