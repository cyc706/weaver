import { getIndexData } from "@/lib/stock";
export const dynamic = "force-dynamic";

export default async function YBS() {
  const indices = await getIndexData();

  return (
    <div className="flex p-2">
      {indices.map((index) => (
        <div key={index.symbol} className="flex-1">
          <div className="text-sm font-semibold text-center">{index.name}</div>
          <div
            className={`text-lg font-bold text-center ${
              index.percent >= 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {index.current.toFixed(2)}
          </div>
          <div
            className={`flex items-center justify-center gap-3 text-sm ${
              index.chg >= 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            <div>{index.chg.toFixed(2)}</div>
            <div>
              {index.percent >= 0 ? "+" : ""}
              {index.percent}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
