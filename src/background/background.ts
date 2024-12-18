import { store } from "../redux";
import { setProducts } from "../redux/slices/products.slice";
import { getLocalStoreData } from "../utils";

chrome.runtime.onMessage.addListener(async (data) => {
    try {
        switch (data.action) {
            case "product-data-available":
                let alreadyStoredData = []
                let localData = await getLocalStoreData()

                alreadyStoredData = [...localData, data.data]

                await chrome.storage.local.set({ products: alreadyStoredData })
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error, "error");
    }
})

chrome.storage.onChanged.addListener((changes: chrome.storage.StorageChange, areaName) => {
    try {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            // store.dispatch(setProducts({ payload: newValue }))
            
            //! QUERY: This function throws error when popup is close because 
            // when popoup is close there is no listner for this event
            chrome.runtime.sendMessage({ action: "update-data", data: newValue || [] })
        }
    } catch (error) {
        console.log(error, "error");
    }
})