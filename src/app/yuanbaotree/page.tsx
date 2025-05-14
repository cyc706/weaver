import { getIndexData } from "@/app/yuanbaotree/index/real/route";

export default async function YuanbaoTree() {
  // const indices = [
  //   {
  //     name: "上证指数",
  //     symbol: "SH000001",
  //     current: 3254.32,
  //     change: 1.23,
  //     percent: 0.38,
  //     status: "交易中",
  //     status_id: 5,
  //   },
  //   {
  //     name: "深证成指",
  //     symbol: "SZ399001",
  //     current: 11714.16,
  //     change: -12.45,
  //     percent: -0.11,
  //     status: "休市",
  //     status_id: 8,
  //   },
  //   {
  //     name: "创业板指",
  //     symbol: "SZ399006",
  //     current: 2409.76,
  //     change: 5.67,
  //     percent: 0.24,
  //     status: "交易中",
  //     status_id: 5,
  //   },
  // ];

  const indices = await getIndexData();
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">主要指数行情</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((index) => (
          <div
            key={index.symbol}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{index.name}</h2>
                <p className="text-gray-500 text-sm">{index.symbol}</p>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded mt-1 ${
                    index.status_id === 5
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {index.status}
                </span>
              </div>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  index.percent >= 0
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {index.percent >= 0 ? "+" : ""}
                {index.percent}%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{index.current.toFixed(2)}</p>
              <p
                className={`text-sm ${
                  index.chg >= 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {index.chg >= 0 ? "+" : ""}
                {index.chg.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}