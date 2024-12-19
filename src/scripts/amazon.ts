import { EProductDetails } from "./globalInterfaces";

(() => {

    console.log("Scrapping Amazon Product Details");
    
    // Initialize product data with default values
    let productData: EProductDetails = { 
        id: Date.now(), 
        title: "", 
        review: "", 
        originalPrice: "", 
        finalPrice: "", 
        dicsount: "", 
        eCommerce: "Amazon" 
    }

    // Get the product title from the page
    let title = document.getElementById("productTitle")?.innerText;
    productData.title = title.trim();

    // Get the reviews section from the page
    let reviews = document.getElementById("averageCustomerReviews");
    let review = reviews.getElementsByClassName("a-color-base");

    // Extract and set the review text
    Array.from(review).forEach((element: HTMLElement) => {
        productData.review = element.innerText;
    });

    // Get the price section from the page
    let priceSection = document.getElementById("corePriceDisplay_desktop_feature_div");

    // Extract and set the original price
    let originalPrice = priceSection.getElementsByClassName("a-offscreen");
    Array.from(originalPrice).forEach((element: HTMLElement) => {
        productData.originalPrice = element.innerText;
    });

    // Extract and set the final price
    let finalPrice = priceSection.getElementsByClassName("a-price-whole");
    Array.from(finalPrice).forEach((element: HTMLElement) => {
        productData.finalPrice = element.innerText;
    });

    // Extract and set the discount
    let discount = priceSection.getElementsByClassName("savingPriceOverride");
    Array.from(discount).forEach((element: HTMLElement) => {
        productData.dicsount = element.innerText;
    });

    // Send the product data to the background script
    chrome.runtime.sendMessage({ action: "product-data-available", data: productData });
})()