import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterProductsByCategory } from "../rtk/slices/products-slice";

function NavbarPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const handleCategorySelect = (category) => {
    dispatch(filterProductsByCategory(category));
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary shadow-sm">
        <Container>
          <Link to="/" className="nav-link fs-3 me-3 fw-bold">
            Store
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Products
              </Link>
              <Link to="/cart" className="nav-link">
                Cart - {cart.length}
              </Link>
            </Nav>
            <Dropdown className="d-flex ms-auto">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarPage;
