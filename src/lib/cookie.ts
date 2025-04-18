import fs from 'fs';
export async function getFileCookie(): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile('cookie.txt', 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function writeCookie(str: string) {
  fs.writeFile('cookie.txt', str, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
    }
  })
}