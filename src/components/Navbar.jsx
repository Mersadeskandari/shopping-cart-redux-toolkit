import {Badge, Button, Container, Modal, Nav, Navbar as NavbarBs} from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearCart, getTotalAmount } from "../redux/cartSlice.js";
import CartItems from "./CardItems.jsx";

export const Navbar = () => {

	const [showModal , setShowModal] = useState(false)

	const cart = useSelector(state => state.cart)

	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(getTotalAmount())
	}, [cart.cart]);


	return(
		<NavbarBs expand="lg" className="bg-body-tertiary" style={{direction: 'rtl'}}>
			<Container fluid>
				<NavbarBs.Brand href="">
					<Button variant="btn btn-outline-dark" onClick={() => setShowModal(true)}>


						<FaCartShopping className="mx-2" />
						سبد خرید
						{cart.cart.length !== 0 && <Badge bg="secondary" className="mx-2">{cart.amount}</Badge>}
					</Button>

				</NavbarBs.Brand>

				<h1>قیمت کل:    {cart.total} تومان</h1>

				<NavbarBs.Brand>
					<Button variant="danger" onClick={() => dispatch((clearCart()))}>خالی کردن سبد خرید</Button>
				</NavbarBs.Brand>
				<Modal show={showModal} style={{direction: "rtl" , textAlign: "right"}}>
					<Modal.Header>
						<Modal.Title>سبد خرید</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{
							cart.cart.length === 0
								? <h3 className={"text-danger"}>سبد خرید شما خالی است</h3>
								: (
									<>
										{cart.cart.map(cartItem => <CartItems key={cartItem.id} {...cartItem}/>)}
										<h4>قیمت کل: {cart.total} تومان</h4>
									</>
								)
						}
					</Modal.Body>
					<Modal.Footer>

						{
							cart.cart.length === 0
								? <Button variant="outline-danger" onClick={() => setShowModal(false)}>بستن</Button>
								: (
									<>
										<Button variant="outline-success">ثبت</Button>
										<Button variant="outline-danger" onClick={() => setShowModal(false)}>بستن</Button>
									</>
								)
						}
					</Modal.Footer>
				</Modal>

			</Container>
		</NavbarBs>
	)
}