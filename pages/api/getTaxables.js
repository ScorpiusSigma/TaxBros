// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Jimp from "jimp";

export default async function handler(req, res) {
	const { taxables } = JSON.parse(req.body);
	let collatedResult = [];
	for (const taxable of taxables) {
		const walletId = taxable.walletAddress;
		const txHistory = await fetch(
			`https://api.etherscan.io/api?module=account&action=txlist&address=${walletId}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=T5F14H1RXART3EQSAGZQSU8GJK9P1QRE4C`
		).then((res) => res.json());

		txHistory.result = txHistory.result.filter((tx) =>
			taxable.hashes.includes(tx.hash)
		);

		let result = txHistory.result.map(async (tx) => {
			const value = await getUSDValue(
				tx.timeStamp,
				tx.value,
				tx.from,
				walletId
			);
			tx.usd = value[1].toFixed(2);
			tx.eth = value[0];
			tx.type = value[2];
			tx.humantimeStamp = value[3];
			return tx;
		});

		await Promise.all(result).then((values) => (result = values));
    
		collatedResult = collatedResult.concat(result);
	}
    console.log(collatedResult)
	console.log('this is the collated')
	res.status(200).json({ image: [...new Set(collatedResult)] });
}


const getUSDValue = async (timeStamp, value, fromAddress, address) => {
	const result = await fetch(
		"https://min-api.cryptocompare.com/data/v2/histohour?tsym=USD&fsym=ETH&limit=10&toTs=" +
			timeStamp
	).then((res) => res.json());

	const length = result.Data?.Data?.length;
	const rate = (length && result?.Data?.Data[length - 1]["close"]) || 1300;
	const eth = value / 10 ** 18;
	const humantimeStamp = String(new Date(timeStamp * 1000));
	const timearr = humantimeStamp.split(" ");
	const nicetime =
		timearr[2] +
		" " +
		timearr[1] +
		" " +
		timearr[3] +
		" " +
		timearr[4].slice(0, 5);

	if (fromAddress == address.toLowerCase()) {
		return [eth, eth * rate, "Expense", nicetime];
	}

	return [eth, eth * rate, "Receivable", nicetime];
};
