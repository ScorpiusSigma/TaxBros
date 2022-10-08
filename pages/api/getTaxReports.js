// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	const { walletAddress } = JSON.parse(req.body);

	const txHistory = await fetch(
		`https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=T5F14H1RXART3EQSAGZQSU8GJK9P1QRE4C`
	).then((res) => res.json());

	let result = txHistory.result.map(async (tx) => {
		const value = await getUSDValue(
			tx.timeStamp,
			tx.value,
			tx.from,
			walletAddress
		);
		tx.usd = value[1];
		tx.eth = value[0];
        tx.type = value[2];
		tx.humantimeStamp = value[3];
		return tx;
	});

	await Promise.all(result).then((values) => (result = values));
	console.log(result)
	res.status(200).json({ name: result });
}

const getUSDValue = async (timeStamp, value, fromAddress, address) => {
	const result = await fetch(
		"https://min-api.cryptocompare.com/data/v2/histohour?tsym=USD&fsym=ETH&limit=10&toTs=" +
			timeStamp
	).then((res) => res.json());
	//console.log('this',result["Data"]["Data"][1])
	const length = result["Data"]["Data"].length;
	const rate = result["Data"]["Data"][length - 1]["close"];
	const eth = value / 10 ** 18;
	const humantimeStamp = String(new Date(timeStamp * 1000));
	
    if (fromAddress == address.toLowerCase()){
		return [eth, eth * rate, 'expense', humantimeStamp]
	}

	return [eth, eth * rate, 'receivable', humantimeStamp];
};
