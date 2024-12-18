import React, { useEffect } from "react";
import "./assets/index.css";
import { Container, Button, Table } from "./components";
import { getATabID, getLocalStoreData } from "./utils";
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
        getLocalStoreData().then((data) => dispatch(setProducts({ payload: data }))).catch((error) => console.log(error));
    }, [])

    /**
     * Injects the scrapping script into the active tab
     * @async
     * @function
     */
    async function startScrapping() {

        getATabID((tabId) => {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["scrapper.bundle.js"]
            }, (data) => console.log(data));
        });
    }

    /**
     * Clears all the stored data from chrome's local storage
     * @async
     * @function
     */
    async function clearData() {
        await chrome.storage.local.clear();
    }

    /**
     * Deletes a product from the stored data in chrome's local storage
     * @param {number} productId - The ID of the product to be deleted
     * @async
     * @function
     */
    async function deleteProduct(productId: number){
        let filteredProducts = products.filter(({id}) => id !== productId )

        await chrome.storage.local.set({ products: filteredProducts })
    }

    return (
        <Container>
            <h1 className="main_title" >scrap-ecommerce-data</h1>
            <div className="scrap_button" >
                <Button onClick={startScrapping} >Scrap</Button>
                <Button onClick={clearData} type="danger" >Clear</Button>
            </div>

            <div className="products_section">
                {products.length > 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Review</th>
                                <th>Original Price</th>
                                <th>Discount</th>
                                <th>Final Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: any) => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{product.review}</td>
                                    <td>{product.originalPrice}</td>
                                    <td>{product.dicsount}</td>
                                    <td>₹{product.finalPrice}</td>
                                    <td>
                                        <p style={{ cursor: "pointer" }} onClick={() => deleteProduct(product.id)} >Delete</p>
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