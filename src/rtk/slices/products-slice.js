import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "fetchProducts/productsSlice",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  }
);

const saveProductsToLocalstorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    items: [],
    filteredItems: [],
    selectedCategory: null,
  },
  reducers: {
    loadProductsFromLocalstorage: (state) => {
      const products = localStorage.getItem("products");
      if (products) {
        state.items = JSON.parse(products);
        state.filteredItems = state.items;
      }
    },
    filterProductsByCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      if (category === "all") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (product) => product.category === category
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      saveProductsToLocalstorage(action.payload);
      state.items = action.payload;
      state.filteredItems = action.payload;
    });
  },
});

export const {
  loadProductsFromLocalstorage,
  filterProductsByCategory,
} = productsSlice.actions;
export default productsSlice.reducer;

