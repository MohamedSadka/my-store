import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import NavbarPage from "./components/Navbar";
import Cart from "./components/Cart"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, loadProductsFromLocalstorage } from "./rtk/slices/products-slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductsFromLocalstorage());
    dispatch(fetchProducts())
  },[dispatch]);
  return (
    <>
      <NavbarPage />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/cart" element={<Cart/>} /> 
      </Routes>
    </>
  );
}

export default App;
