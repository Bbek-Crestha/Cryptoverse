import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/CryptoAPI";

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins?.filter((coin) =>
			coin.name.toLowerCase().includes(search.toLowerCase())
		);

		setCryptos(filteredData);
	}, [cryptosList, search]);

	if (isFetching) return <h1>Loading...</h1>;

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			)}

			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((crypto) => (
					<Col xs={24} sm={12} lg={8} className="crypto-card" key={crypto.id}>
						<Link to={`/crypto/${crypto.id}`}>
							<Card
								title={`${crypto.rank}. ${crypto.name}`}
								extra={
									<img
										className="crypto-img"
										src={crypto.iconUrl}
										alt={crypto.name}
										height="35rem"
										width="35rem"
									/>
								}
								hoverable
							>
								<p>Price: {crypto.price}</p>
								<p>Market Cap: {millify(crypto.marketCap)}</p>
								<p>Daily Change: {millify(crypto.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
