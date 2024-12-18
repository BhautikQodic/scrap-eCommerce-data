import React, { useEffect } from "react";
import "./assets/index.css";
import { Container, Button, Table } from "./components";
import { clearLocalData, deleteAProduct, getLocalStoreData } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./redux";
import { setProducts } from "./redux/slices/products.slice";
import { EProductDetails } from "./scripts/globalInterfaces";

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

    /**
     * Gets the products stored in chrome's local storage when the component mounts and updates the redux store with the products
     */
    useEffect(() => {
        getLocalStoreData().then((data) => dispatch(setProducts({ payload: data }))).catch((error) => console.log(error));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <h1 className="main_title" >scrap-ecommerce-data</h1>
            <div className="scrap_button" >
                <Button onClick={() => clearLocalData()} type="danger" >Clear</Button>
            </div>

            <div className="products_section">
                {products.length > 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Site</th>
                                <th>Name</th>
                                <th>Review</th>
                                <th>Original Price</th>
                                <th>Discount</th>
                                <th>Final Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: EProductDetails) => (
                                <tr key={product.id}>
                                    <td>{product.eCommerce}</td>
                                    <td>{product.title}</td>
                                    <td>{product.review}</td>
                                    <td>{product.originalPrice}</td>
                                    <td>{product.dicsount}</td>
                                    <td>₹{product.finalPrice}</td>
                                    <td>
                                        <p style={{ cursor: "pointer" }} onClick={() => deleteAProduct(products, product.id)} >Delete</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p style={{ textAlign: "center" }} >No Products available to compare</p>
                )}

            </div>
        </Container>
    )
}