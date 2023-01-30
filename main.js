const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\x1b[31m%s\x1b[0m", `
██╗███████╗███╗   ███╗ █████╗ ██╗██╗    ██╗███████╗
██║██╔════╝████╗ ████║██╔══██╗██║██║    ██║╚══███╔╝
██║███████╗██╔████╔██║███████║██║██║ █╗ ██║  ███╔╝ 
██║╚════██║██║╚██╔╝██║██╔══██║██║██║███╗██║ ███╔╝  
██║███████║██║ ╚═╝ ██║██║  ██║██║╚███╔███╔╝███████╗
╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝ ╚══╝╚══╝ ╚══════╝
\n`);
console.log("\x1b[32m%s\x1b[0m", " Welcome to ismaiwz#7045's asset stealer. Thats only for shirts and pants. Only for educational purposes!")
rl.question("Enter asset ID: ", async function(id) {
  const asset = `https://assetdelivery.roblox.com/v1/asset?id=${id}`;
  const response = await fetch(asset)
    .then(res => res.text())
    .catch(error => console.error(error));

  if (!response) return;

  const newId = response.split("<url>").join().split("</url>").join().split(",")[1].replace(/\D/g, '');
  if (!newId) { return console.error("Invalid ID") };

  const newUrl = `https://assetdelivery.roblox.com/v1/asset?id=${newId}`;
  const res = await fetch(newUrl)
    .then(res => res.arrayBuffer())
    .catch(error => console.error(error));

  if (!res) return;

  const type = ".png";
  fs.writeFileSync(`./assets/${newId}${type}`, Buffer.from(res));
  console.log(`Asset with ID ${newId} saved as ./assets/${newId}${type}`);
  rl.close();
});
