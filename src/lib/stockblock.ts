import fs from "fs";

let list: string[] = [];
export async function getBlackList(): Promise<string[]> {
  if (list.length) {
    return Promise.resolve(list);
  }
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('stock.txt')) {
      console.error('stock.txt file does not exist');
      reject(new Error('stock.txt file does not exist'));
      return;
    }

    fs.readFile("stock.txt", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject(err);
      } else {
        list = JSON.parse(data);
        resolve(list);
      }
    });
  });
}

export async function addBlackList(code: string) {
  if (list.includes(code)) {
    return;
  }
  list.push(code);
  if (!fs.existsSync('stock.txt')) {
    fs.writeFileSync('stock.txt', '[]');
  }
  fs.writeFile('stock.txt', JSON.stringify(list), 'utf-8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
    }
  });
}