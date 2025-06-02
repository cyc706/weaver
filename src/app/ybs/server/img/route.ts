import { addBlackList } from "@/lib/stockblock";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (code) {
    await addBlackList(code);
  }

  return Response.json({
    success: true,
    data: 'ok',
  });
}
