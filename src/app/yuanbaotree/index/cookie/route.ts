import { getFileCookie, writeCookie } from '@/lib/cookie';

export async function GET() {
  const cookie = await getFileCookie();
  return Response.json({
    cookie,
  });
}


export async function POST(request: Request) {
  try {
    const { cookie } = await request.json();
    if (!cookie) {
      return Response.json({
        message: '缺少cookie字段'
      }, { status: 400 });
    }
    writeCookie(cookie);
    return Response.json({
      message: 'Cookie写入成功',
      cookie
    });
  } catch (error) {
    return Response.json({
      message: '参数解析失败',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}