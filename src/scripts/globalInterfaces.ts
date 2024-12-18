export interface EProductDetails {
    id: number,
    title: string, 
    review: string, 
    originalPrice: string,
    finalPrice: string,
    dicsount: string,
    eCommerce: "Amazon" | "FlipKart"
}