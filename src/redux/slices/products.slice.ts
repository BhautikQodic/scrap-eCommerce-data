import { createSlice } from "@reduxjs/toolkit";
import { EProductDetails } from "../../scripts/globalInterfaces";

interface InitialState {
    products: EProductDetails[]
}

const initialState: InitialState = {
    products: []
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.payload;
        },
    },
    extraReducers: (builder) => { },
});

export const { setProducts } =
    productsSlice.actions;

export default productsSlice.reducer;
