export declare enum UserRole {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    REFUNDED = "refunded",
    PARTIALLY_REFUNDED = "partially_refunded"
}
export declare enum PaymentMethod {
    CREDIT_CARD = "credit_card",
    DEBIT_CARD = "debit_card",
    PAYPAL = "paypal",
    BANK_TRANSFER = "bank_transfer",
    CASH_ON_DELIVERY = "cash_on_delivery",
    DIGITAL_WALLET = "digital_wallet"
}
export declare enum ProductStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    OUT_OF_STOCK = "out_of_stock",
    DISCONTINUED = "discontinued"
}
export declare enum ProductType {
    PHYSICAL = "physical",
    DIGITAL = "digital",
    SERVICE = "service"
}
export declare enum ShippingMethod {
    STANDARD = "standard",
    EXPRESS = "express",
    SAME_DAY = "same_day",
    NEXT_DAY = "next_day",
    PICKUP = "pickup"
}
export declare enum ShippingStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered",
    FAILED = "failed",
    RETURNED = "returned"
}
export declare enum NotificationType {
    ORDER_CONFIRMATION = "order_confirmation",
    ORDER_SHIPPED = "order_shipped",
    ORDER_DELIVERED = "order_delivered",
    PAYMENT_SUCCESS = "payment_success",
    PAYMENT_FAILED = "payment_failed",
    STOCK_ALERT = "stock_alert",
    PROMOTION = "promotion"
}
export declare enum NotificationStatus {
    PENDING = "pending",
    SENT = "sent",
    FAILED = "failed",
    READ = "read"
}
export declare enum ReviewStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED_AMOUNT = "fixed_amount",
    FREE_SHIPPING = "free_shipping"
}
export declare enum CouponStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    EXPIRED = "expired",
    USED = "used"
}
export declare enum AIProvider {
    OPENAI = "openai",
    GEMINI = "gemini",
    ANTHROPIC = "anthropic"
}
export declare enum AIRequestType {
    PRODUCT_RECOMMENDATION = "product_recommendation",
    CHAT_SUPPORT = "chat_support",
    REVIEW_ANALYSIS = "review_analysis",
    SENTIMENT_ANALYSIS = "sentiment_analysis"
}
