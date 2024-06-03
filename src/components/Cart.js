import { Container, Table, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart } from "../rtk/slices/cart-slice";

const Cart = () => {

const cart = useSelector(state => state.cart);
const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity , 0).toFixed(2);
const dispatch = useDispatch();
  return (
    <Container className="py-5">
      <h1 className="py-5">Welcome to the cart</h1>
      <h2 className="mb-2">Total price : ${totalPrice}</h2>
      <Button className="mb-3"  onClick={()=> dispatch(clearCart())}>
        Clear Cart
      </Button>
      <Table striped bordered hover variant="dark" className="py-5">
        <thead>
          <tr style={{textAlign:"center"}} >
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index)=> (
            <tr key={item.id}>
            <td style={{lineHeight: "90px", textAlign: "center"}}>{index + 1}</td>
            <td style={{lineHeight: "30px", textAlign: "center" , maxWidth: "250px"}}>{item.title}</td>
            <td style={{lineHeight: "90px", textAlign: "center"}}>
              <Image
                src={item.image}
                style={{ width: "100px", height: "100px" }}
              ></Image>
            </td>
            <td style={{lineHeight: "90px", textAlign: "center"}}>${item.price}</td>
            <td style={{lineHeight: "90px", textAlign: "center"}}>{item.quantity}</td>
            <td style={{lineHeight: "90px", textAlign: "center"}}>
              <Button
                variant="danger"
                onClick={() => dispatch(deleteFromCart(item))}
              >
                Delete
              </Button>
            </td>
          </tr>
          ))}
            
          
        </tbody>
      </Table>
    </Container>
  );
};

export default Cart;
