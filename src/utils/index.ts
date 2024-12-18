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