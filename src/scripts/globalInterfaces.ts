/**
 * Interface representing the details of a product from an e-commerce platform.
 */
export interface EProductDetails {
    /**
     * Unique identifier for the product.
     */
    id: number;

    /**
     * Title or name of the product.
     */
    title: string;

    /**
     * Review or rating of the product.
     */
    review: string;

    /**
     * Original price of the product before any discounts.
     */
    originalPrice: string;

    /**
     * Final price of the product after applying discounts.
     */
    finalPrice: string;

    /**
     * Discount applied to the product.
     */
    dicsount: string;

    /**
     * E-commerce platform where the product is listed.
     * Can be either "Amazon" or "FlipKart".
     */
    eCommerce: "Amazon" | "FlipKart";
}