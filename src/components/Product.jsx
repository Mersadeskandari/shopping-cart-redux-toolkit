import Button from 'react-bootstrap/Button';
import { Col, Container, Modal, Navbar as NavbarBs } from "react-bootstrap";
import {FaCartShopping} from "react-icons/fa6";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartSlice, increase, removeFromCart, toggleAmount } from "../redux/cartSlice.js";
export const Product = ({ product }) => {

	const {id , title , image , desc , price , rating: {count}} = product

	const cart = useSelector(state => state.cart)

	const dispatch = useDispatch()

	const cartItem = cart.cart.find(item => item.id === id)

	const currentCount = cartItem ? cartItem.rating.count : count

	return (
		<Card style={{ width: '18rem', textAlign: 'center' }} className="p-1">
			<Card.Img variant="top" width={200} height={300} src={image} />
			<Card.Body>
				<Card.Title className="text-truncate">{title}</Card.Title>
				<Card.Text className="text-truncate">
				</Card.Text>
				{
					cartItem
						? (
							<>
							 <Button
								 variant="success"
								 className="btn-sm mx-2"
								 onClick={() => dispatch(toggleAmount({ id, type: "inc" }))}
								 disabled={currentCount === 0}
							 >
								 +
							 </Button>
								{cartItem.amount}
							 <Button
								 variant="danger"
								 className="btn-sm mx-2"
								 onClick={() => dispatch(toggleAmount({ id, type: "dec" }))}
							 >
								 -
							 </Button>
							 <div>
								<Button variant="outline-danger" className="my-2"
										onClick={() => dispatch(removeFromCart(id))}>حذف از سبد خرید</Button>
							 </div>

							</>
						)
						: (
							<Button variant="primary"
									onClick={() => dispatch(addToCart(product))}>افزودن به سبد خرید</Button>
						)
				}
			</Card.Body>

			<Card.Footer className="text-muted d-flex flex-row-reverse justify-content-between">
				<p>قیمت:  {price} تومان </p>
				<p> موجودی:   {currentCount}</p>
			</Card.Footer>
		</Card>
	);
};


