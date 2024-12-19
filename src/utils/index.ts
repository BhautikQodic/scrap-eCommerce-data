import { EProductDetails } from "../scripts/globalInterfaces";

/**
 * Gets the ID of the currently active tab
 * @returns a promise that resolves with the current tab's ID
 */
export const getATabID = (callBack) => {
    
    // let tabId: number;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: chrome.tabs.Tab[]
    ) {
        // The first tab in the array is the current active tab
        callBack(tabs[0].id);
    });

}

/**
 * Retrieves the products stored in chrome's local storage
 * @returns a promise that resolves with an array of product objects
 */
export const getLocalStoreData = async (): Promise<[]> => {
    try {
        let localData = await chrome.storage.local.get(["products"])
    
        if(Object.keys(localData).length > 0){
            return Promise.resolve(localData.products);
        } else {
            return Promise.resolve([]);
        }
    } catch (error) {
        Promise.reject([]);
    }
}


/**
 * Clears all data stored in chrome's local storage.
 * @returns {Promise<boolean>} - A promise that resolves to true if the data was successfully cleared, or rejects with false if an error occurred.
 */
export const clearLocalData = async (): Promise<boolean> => {
    try {
        await chrome.storage.local.clear();
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Deletes a product from the list of products based on the provided product ID.
 *
 * @param {EProductDetails[]} products - The array of product details.
 * @param {number} productId - The ID of the product to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the product was successfully deleted, or rejects with false if an error occurred.
 */
export const deleteAProduct = async (products: EProductDetails[], productId: number): Promise<boolean> => {
    try {
        const filteredProducts = products.filter(({ id }) => id !== productId);
        await chrome.storage.local.set({ products: filteredProducts });
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(false);
    }
}