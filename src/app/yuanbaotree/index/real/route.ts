import { getIndexData } from '@/lib/stock';

export async function GET() {
  const data = await getIndexData();

  return Response.json({
    code: 0,
    data,
  });
}
