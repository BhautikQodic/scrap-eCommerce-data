// Product Data

let productData: { title: string, review: string, originalPrice: string, finalPrice: string, dicsount: string } = { title: "", review: "", originalPrice: "", finalPrice: "", dicsount: "" }

// 1. Product Title
let title = document.getElementById("productTitle")?.innerText
productData.title = title


// 2. Product Review
let reviews = document.getElementById("averageCustomerReviews")
let review = reviews.getElementsByClassName("a-color-base")

Array.from(review).forEach((element: HTMLElement) => {
    productData.review = element.innerText
})

// 3. Product Price
let priceSection = document.getElementById("corePriceDisplay_desktop_feature_div")
//  3.1. Original Price
let originalPrice = priceSection.getElementsByClassName("a-offscreen")
Array.from(originalPrice).forEach((element: HTMLElement) => {
    productData.originalPrice = element.innerText
})

// 3.2. Final Price
let finalPrice = priceSection.getElementsByClassName("a-price-whole")
Array.from(finalPrice).forEach((element: HTMLElement) => {
    productData.finalPrice = element.innerText
})

// 3.3. Dicsount
let discount = priceSection.getElementsByClassName("savingPriceOverride")
Array.from(discount).forEach((element: HTMLElement) => {
    productData.dicsount = element.innerText
    
})

chrome.runtime.sendMessage({ action: "product-data-available", data: productData })