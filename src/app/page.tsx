// import Image from "next/image";
import dayjs from "dayjs";
export const dynamic = 'force-dynamic';

async function getData() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
      resolve("Hello World " + currentDate);
    }, 1000);
    }
  );
}

export default async function Home() {
  const currentDate = await getData();
  return (
    <div>{currentDate}</div>
  );
}
