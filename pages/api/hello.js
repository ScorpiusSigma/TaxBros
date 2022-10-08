// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
const txHistory = await fetch("https://api.etherscan.io/api?module=account&action=txlist&address=0xf396b0385faC34992E96263256B1ffC02d21b5fc&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=T5F14H1RXART3EQSAGZQSU8GJK9P1QRE4C").then(res => res.json());
const result = txHistory.result.map(tx => {
  const value = getUSDValue(tx.timeStamp, tx.value)
  console.log(value)
  tx.usd = value[1]
  tx.eth = value[0]
  
  return tx;
})


  res.status(200).json({ name: result })
}


const getUSDValue = async (timeStamp, value) => {
  const result = await fetch("https://min-api.cryptocompare.com/data/v2/histohour?tsym=USD&fsym=ETH&limit=10&toTs=" + timeStamp).then(res => res.json());
  const rate = result['Data']['Data'][1]['close']
  const eth = value / (10 ** 18)
  return [eth, eth * rate]
  
}

