import axios from "axios";
import dayjs from "dayjs";
import { get } from "@/utils/index";

export async function GET() {
  const today = dayjs().format("YYYY-MM-DD");
  const indexClode = "000001"; // 上证指数
  try {
    const [minDataResult, summaryResult] = await Promise.all([
      // 上证指数的分时数据
      axios.request({
        method: "get",
        url: "http://47.99.211.178:8888/api/public/index_zh_a_hist_min_em",
        params: {
          symbol: indexClode,
          period: "1",
          start_date: `${today} 09:30:00`,
          end_date: `${today} 15:00:00`,
        },
      }),

      axios.request({
        method: "get",
        url: "http://47.99.211.178:8888/api/public/index_zh_a_hist",
        params: {
          symbol: indexClode,
          start_date: `${today}`,
          end_date: `${today}`,
        },
      })
    ]);

    return Response.json({
      code: 0,
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        list: minDataResult.data.map((item: any) => {
          return {
            time: item.时间,
            value: item.最低,
          }
        }),
        summary: {
          indexClode,
          indexName: "上证指数",
          date: get(summaryResult.data, "[0].日期"),
          value: get(summaryResult.data, "[0].收盘"),
          rate: get(summaryResult.data, "[0].涨跌幅"),
        }
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({
      code: 1,
      message: "获取数据异常",
    });
  }



}
