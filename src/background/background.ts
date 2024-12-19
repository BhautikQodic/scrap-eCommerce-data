import { store } from "../redux";
import { setProducts } from "../redux/slices/products.slice";
import { getLocalStoreData } from "../utils";


chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
})

/**
 * Listener for messages from other parts of the extension.
 * 
 * @param {Object} data - The message data.
 * @param {string} data.action - The action to be performed.
 * @param {Array} data.data - The product data to be stored.
 */
chrome.runtime.onMessage.addListener(async (data) => {
    try {
        switch (data.action) {
            case "product-data-available":
                let alreadyStoredData = [];
                let localData = await getLocalStoreData();

                alreadyStoredData = [...localData, ...data.data];

                await chrome.storage.local.set({ products: alreadyStoredData });
                break;
            default:
                break;
        }
    } catch (error) {
        console.error("Error handling message:", error);
    }
});

chrome.storage.onChanged.addListener((changes: chrome.storage.StorageChange, areaName) => {
    try {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            // store.dispatch(setProducts({ payload: newValue }))
            
            // Check if there are any listeners before sending the message
            chrome.runtime.sendMessage({ action: "update-data", data: newValue || [] }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("No listeners for update-data message:", chrome.runtime.lastError.message);
                }
            });
            chrome.runtime.sendMessage({ action: "update-data", data: newValue || [] })
        }
    } catch (error) {
        console.log(error, "error");
    }
})