import { useEffect } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/products-slice";
import { addToCart, decrementTheQuantity } from "../rtk/slices/cart-slice";

export const Home = () => {
  const products = useSelector((state) => state.products.filteredItems);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container className="py-5">
      <Row className="py-5">
        {products && products.length > 0 ? (
          products.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const itemInCart = Boolean(cartItem);
            return (
              <Col
                className="py-3 d-flex justify-content-center"
                key={product.id}
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    style={{ height: "200px" }}
                    src={product.image}
                    alt=""
                  />
                  <Card.Body>
                    <Card.Title>
                      {product.title}
                      {itemInCart && (
                        <Badge pill bg="secondary" className="ms-2">
                          {cartItem.quantity}
                        </Badge>
                      )}
                    </Card.Title>

                    <Card.Text>${product.price}</Card.Text>
                    {itemInCart ? (
                      <>
                        <Button
                          variant="danger"
                          className="w-100"
                          onClick={() => dispatch(addToCart(product))}
                        >
                          Increment the product
                        </Button>
                        <Button
                          variant="warning"
                          className="w-100 mt-2"
                          onClick={() => dispatch(decrementTheQuantity(product))}
                        >
                          Decrement the product
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add to cart
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </Row>
    </Container>
  );
};
