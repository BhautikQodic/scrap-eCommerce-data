import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    products: any[]
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
