/** @format */

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CartItem from './CartItem';
import { random, commerce } from 'faker';
import { Container, Col, Row } from 'reactstrap';

const apiKey = '563492ad6f917000010000016b088938374947f68413d1bb6b02fb99';

const url = 'https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1';
const localUrl =
	'https://jsonware.com/json/7f26bf2c0233a09ad8426b4e6ad9ccbd.json';
const BuyPage = ({ addInCart }) => {
	const [product, setProduct] = useState([]);

	// const fetchPhotos = async () => {
	//     const response = await Axios.get(url, {
	//         header: {
	//             Authorization: apiKey
	//         }
	//     })

	const fetchPhotos = async () => {
		const { data } = await Axios.get(localUrl);
		const { photos } = data;

		const allProduct = photos.map((photo) => ({
			smallImage: photo.src.medium,
			tinyImage: photo.src.tiny,
			productName: random.word(),
			productPrice: commerce.price(),
			id: random.uuid(),
		}));

		setProduct(allProduct);
	};

	useEffect(() => {
		fetchPhotos();
	}, []);

	return (
		<Container fluid>
			<h1 className='text-success text-center'>Buy Page</h1>
			<Row>
				{product.map((product) => (
					<Col md={4} key={product.id}>
						<CartItem product={product} addInCart={addInCart} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default BuyPage;
