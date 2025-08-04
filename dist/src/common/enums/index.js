"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIRequestType = exports.AIProvider = exports.CouponStatus = exports.DiscountType = exports.ReviewStatus = exports.NotificationStatus = exports.NotificationType = exports.ShippingStatus = exports.ShippingMethod = exports.ProductType = exports.ProductStatus = exports.PaymentMethod = exports.PaymentStatus = exports.OrderStatus = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
    UserRole["MODERATOR"] = "moderator";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["SUSPENDED"] = "suspended";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PROCESSING"] = "processing";
    OrderStatus["SHIPPED"] = "shipped";
    OrderStatus["OUT_FOR_DELIVERY"] = "out_for_delivery";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["REFUNDED"] = "refunded";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["DEBIT_CARD"] = "debit_card";
    PaymentMethod["PAYPAL"] = "paypal";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["CASH_ON_DELIVERY"] = "cash_on_delivery";
    PaymentMethod["DIGITAL_WALLET"] = "digital_wallet";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "active";
    ProductStatus["INACTIVE"] = "inactive";
    ProductStatus["OUT_OF_STOCK"] = "out_of_stock";
    ProductStatus["DISCONTINUED"] = "discontinued";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var ProductType;
(function (ProductType) {
    ProductType["PHYSICAL"] = "physical";
    ProductType["DIGITAL"] = "digital";
    ProductType["SERVICE"] = "service";
})(ProductType || (exports.ProductType = ProductType = {}));
var ShippingMethod;
(function (ShippingMethod) {
    ShippingMethod["STANDARD"] = "standard";
    ShippingMethod["EXPRESS"] = "express";
    ShippingMethod["SAME_DAY"] = "same_day";
    ShippingMethod["NEXT_DAY"] = "next_day";
    ShippingMethod["PICKUP"] = "pickup";
})(ShippingMethod || (exports.ShippingMethod = ShippingMethod = {}));
var ShippingStatus;
(function (ShippingStatus) {
    ShippingStatus["PENDING"] = "pending";
    ShippingStatus["PROCESSING"] = "processing";
    ShippingStatus["SHIPPED"] = "shipped";
    ShippingStatus["OUT_FOR_DELIVERY"] = "out_for_delivery";
    ShippingStatus["DELIVERED"] = "delivered";
    ShippingStatus["FAILED"] = "failed";
    ShippingStatus["RETURNED"] = "returned";
})(ShippingStatus || (exports.ShippingStatus = ShippingStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["ORDER_CONFIRMATION"] = "order_confirmation";
    NotificationType["ORDER_SHIPPED"] = "order_shipped";
    NotificationType["ORDER_DELIVERED"] = "order_delivered";
    NotificationType["PAYMENT_SUCCESS"] = "payment_success";
    NotificationType["PAYMENT_FAILED"] = "payment_failed";
    NotificationType["STOCK_ALERT"] = "stock_alert";
    NotificationType["PROMOTION"] = "promotion";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "pending";
    NotificationStatus["SENT"] = "sent";
    NotificationStatus["FAILED"] = "failed";
    NotificationStatus["READ"] = "read";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["PENDING"] = "pending";
    ReviewStatus["APPROVED"] = "approved";
    ReviewStatus["REJECTED"] = "rejected";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "percentage";
    DiscountType["FIXED_AMOUNT"] = "fixed_amount";
    DiscountType["FREE_SHIPPING"] = "free_shipping";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var CouponStatus;
(function (CouponStatus) {
    CouponStatus["ACTIVE"] = "active";
    CouponStatus["INACTIVE"] = "inactive";
    CouponStatus["EXPIRED"] = "expired";
    CouponStatus["USED"] = "used";
})(CouponStatus || (exports.CouponStatus = CouponStatus = {}));
var AIProvider;
(function (AIProvider) {
    AIProvider["OPENAI"] = "openai";
    AIProvider["GEMINI"] = "gemini";
    AIProvider["ANTHROPIC"] = "anthropic";
})(AIProvider || (exports.AIProvider = AIProvider = {}));
var AIRequestType;
(function (AIRequestType) {
    AIRequestType["PRODUCT_RECOMMENDATION"] = "product_recommendation";
    AIRequestType["CHAT_SUPPORT"] = "chat_support";
    AIRequestType["REVIEW_ANALYSIS"] = "review_analysis";
    AIRequestType["SENTIMENT_ANALYSIS"] = "sentiment_analysis";
})(AIRequestType || (exports.AIRequestType = AIRequestType = {}));
//# sourceMappingURL=index.js.map