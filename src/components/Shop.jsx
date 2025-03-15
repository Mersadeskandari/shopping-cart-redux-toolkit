import { Col, Row } from "react-bootstrap";
import data from "../data/data.js"
import { Product } from "./Product.jsx";

const Shop = () => {

  return(
	  <Row xs={1} md={4} className="g-4">
		  {
			  data.map(product => (
				  <Col>
					  <Product key={product.id} product={product} />
				  </Col>
			  ))
		  }
	  </Row>
  )
}

export default Shop;