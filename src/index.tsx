import React, { useEffect } from "react";
import "./assets/index.css";
import { Container, Header, HeaderContent, H1, TableWrapper, Table, Td, Th } from "./components";
import { getLocalStoreData } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./redux";
import { setProducts } from "./redux/slices/products.slice";

chrome.runtime.onMessage.addListener((data) => {
    try {
        switch (data.action) {
            case "update-data":
                store.dispatch(setProducts({ payload: data.data }))
                break;

            default:
                break;
        }
    } catch (error) {
        console.log(error, "error");
    }
})

export function App() {

    const dispatch = useDispatch<AppDispatch>();

    const { products } = useSelector((state: RootState) => state.productsSlice);
    


    useEffect(() => {
        /**
         * Fetches data from the local store and dispatches an action to set the products in the state.
         * 
         * @async
         * @function fetchLocalStoreData
         * @returns {Promise<void>} A promise that resolves when the data has been fetched and the action has been dispatched.
         * @throws Will log an error to the console if the fetch operation fails.
         */
        const fetchLocalStoreData = async () => {
            try {
                const data = await getLocalStoreData();
                dispatch(setProducts({ payload: data }));
            } catch (error) {
                console.log(error);
            }
        };

        fetchLocalStoreData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <H1>Compare Products</H1>
                </HeaderContent>

                <div className="controls">
                    <div className="search-bar">
                        <input type="text" className="search-input" placeholder="Search products..." />
                    </div>
                </div>

                <div className="chips-container">
                    <div className="chip">Price: Low to High</div>
                    <div className="chip">Discount: Highest First</div>
                    <div className="chip">Rating: 4+ Stars</div>
                </div>
            </Header>

            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th>Product</Th>
                            <Th>Original Price</Th>
                            <Th>Discount</Th>
                            <Th>Final Price</Th>
                            <Th>Rating</Th>
                            <Th>Availability</Th>
                            <Th>Actions</Th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Td>
                                <div className="product-cell">
                                    <img src="/api/placeholder/80/80" alt="Product 1" className="product-image" />
                                        <div className="product-info">
                                            <span className="product-title">Sony WH-1000XM4</span>
                                            <span className="product-source">Amazon</span>
                                        </div>
                                </div>
                            </Td>
                            <Td>
                                <span className="original-price">$399.99</span>
                            </Td>
                            <Td>
                                <span className="discount">-13% ($52)</span>
                            </Td>
                            <Td>
                                <span className="final-price">$347.99</span>
                            </Td>
                            <Td>
                                <div className="rating">
                                    <span className="stars">★★★★★</span>
                                    <span className="review-count">(2,345)</span>
                                </div>
                            </Td>
                            <Td>
                                <span className="stock-status in-stock">In Stock</span>
                            </Td>
                            <Td>
                                <div className="action-buttons">
                                    <button className="buy-btn">Buy Now</button>
                                    <button className="delete-btn">×</button>
                                </div>
                            </Td>
                        </tr>
                    </tbody>
                </Table>
            </TableWrapper>


        </Container>
    )
}