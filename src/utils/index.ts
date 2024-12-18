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
 * Clears all the stored data from chrome's local storage
 * @async
 * @returns a promise that resolves with a boolean indicating whether the data was cleared or not
 */
export const clearLocalData = async (): Promise<boolean> => {
    try {
        await chrome.storage.local.clear();
        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(false)
    }

}

/**
 * Deletes a product from the products stored in chrome's local storage
 * @async
 * @param {EProductDetails[]} products - The array of products from which the product needs to be deleted
 * @param {number} productId - The id of the product to be deleted
 * @returns a promise that resolves with a boolean indicating whether the product was deleted or not
 */
export const deleteAProduct = async (products: EProductDetails[], productId: number): Promise<boolean> => {
    try {
        let filteredProducts = products.filter(({ id }) => id !== productId)

        await chrome.storage.local.set({ products: filteredProducts })
    } catch (error) {
        return Promise.reject(false)
    }
}