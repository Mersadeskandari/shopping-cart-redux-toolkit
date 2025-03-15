import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { removeFromCart, toggleAmount } from "../redux/cartSlice.js";
import { useDispatch } from "react-redux";

const CartItems = ({ id, title, image, price, rating: { count }  , amount}) => {

	const dispatch = useDispatch()

	return (
		<Card style={{ width: '18rem' }} className="my-2">
			<Card.Img variant="top" width={100} height={250} src={image} />
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>
					<p>قیمت: {price}</p>
					<div>
						<p>تعداد:  {amount}</p>
						<Button
							variant="success"
							className="mx-2"
							onClick={() => dispatch(toggleAmount({ id, type: "inc" }))}
							disabled={count === 0}
						>
							+
						</Button>

						<Button
							variant="danger"
							className="mx-2"
							onClick={() => dispatch(toggleAmount({ id, type: "dec" }))}
						>
							-
						</Button>
					</div>
				</Card.Text>
				<Button variant="outline-danger" onClick={() => dispatch(removeFromCart(id))}>
					حذف از سبد خرید
				</Button>
			</Card.Body>
		</Card>
	);
};

export default CartItems
