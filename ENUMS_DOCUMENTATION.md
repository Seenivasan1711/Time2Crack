# Time2Crack Enums Documentation

## Overview

This document describes all the enums used in the Time2Crack application. Enums provide type safety, data consistency, and better code maintainability.

## 📁 Location

All enums are centralized in: `src/common/enums/index.ts`

## 🔧 User-Related Enums

### UserRole
Defines user roles in the system.

```typescript
export enum UserRole {
  USER = 'user',           // Regular user
  ADMIN = 'admin',         // System administrator
  MODERATOR = 'moderator', // Content moderator
}
```

**Usage:**
- User registration and authentication
- Access control and permissions
- Admin panel access

### UserStatus
Defines the current status of a user account.

```typescript
export enum UserStatus {
  ACTIVE = 'active',       // Account is active
  INACTIVE = 'inactive',   // Account is inactive
  SUSPENDED = 'suspended', // Account is suspended
}
```

## 📦 Order-Related Enums

### OrderStatus
Defines the current status of an order.

```typescript
export enum OrderStatus {
  PENDING = 'pending',           // Order placed, waiting for confirmation
  CONFIRMED = 'confirmed',       // Order confirmed by admin
  PROCESSING = 'processing',     // Order is being processed
  SHIPPED = 'shipped',          // Order has been shipped
  OUT_FOR_DELIVERY = 'out_for_delivery', // Package is out for delivery
  DELIVERED = 'delivered',       // Order has been delivered
  CANCELLED = 'cancelled',       // Order has been cancelled
  REFUNDED = 'refunded',        // Order has been refunded
}
```

**Usage:**
- Order tracking
- Status updates
- Customer notifications

### PaymentStatus
Defines the payment status for orders.

```typescript
export enum PaymentStatus {
  PENDING = 'pending',           // Payment is pending
  PAID = 'paid',                // Payment completed successfully
  FAILED = 'failed',            // Payment failed
  REFUNDED = 'refunded',        // Payment has been refunded
  PARTIALLY_REFUNDED = 'partially_refunded', // Partial refund
}
```

### PaymentMethod
Defines available payment methods.

```typescript
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  DIGITAL_WALLET = 'digital_wallet',
}
```

## 🛍️ Product-Related Enums

### ProductStatus
Defines the current status of a product.

```typescript
export enum ProductStatus {
  ACTIVE = 'active',           // Product is available for purchase
  INACTIVE = 'inactive',       // Product is temporarily unavailable
  OUT_OF_STOCK = 'out_of_stock', // Product is out of stock
  DISCONTINUED = 'discontinued', // Product is discontinued
}
```

### ProductType
Defines the type of product.

```typescript
export enum ProductType {
  PHYSICAL = 'physical',       // Physical product that needs shipping
  DIGITAL = 'digital',         // Digital product (downloadable)
  SERVICE = 'service',         // Service-based product
}
```

## 🚚 Shipping-Related Enums

### ShippingMethod
Defines available shipping methods.

```typescript
export enum ShippingMethod {
  STANDARD = 'standard',       // Standard shipping (3-5 days)
  EXPRESS = 'express',         // Express shipping (1-2 days)
  SAME_DAY = 'same_day',       // Same day delivery
  NEXT_DAY = 'next_day',       // Next day delivery
  PICKUP = 'pickup',          // Store pickup
}
```

### ShippingStatus
Defines the shipping status of an order.

```typescript
export enum ShippingStatus {
  PENDING = 'pending',         // Shipping is pending
  PROCESSING = 'processing',   // Package is being prepared
  SHIPPED = 'shipped',        // Package has been shipped
  OUT_FOR_DELIVERY = 'out_for_delivery', // Out for delivery
  DELIVERED = 'delivered',     // Package has been delivered
  FAILED = 'failed',          // Delivery failed
  RETURNED = 'returned',      // Package has been returned
}
```

## 📧 Notification-Related Enums

### NotificationType
Defines types of notifications sent to users.

```typescript
export enum NotificationType {
  ORDER_CONFIRMATION = 'order_confirmation',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  STOCK_ALERT = 'stock_alert',
  PROMOTION = 'promotion',
}
```

### NotificationStatus
Defines the status of a notification.

```typescript
export enum NotificationStatus {
  PENDING = 'pending',         // Notification is pending
  SENT = 'sent',              // Notification has been sent
  FAILED = 'failed',          // Notification failed to send
  READ = 'read',              // Notification has been read
}
```

## ⭐ Review-Related Enums

### ReviewStatus
Defines the status of product reviews.

```typescript
export enum ReviewStatus {
  PENDING = 'pending',         // Review is pending approval
  APPROVED = 'approved',       // Review has been approved
  REJECTED = 'rejected',       // Review has been rejected
}
```

## 💰 Discount-Related Enums

### DiscountType
Defines types of discounts.

```typescript
export enum DiscountType {
  PERCENTAGE = 'percentage',           // Percentage discount
  FIXED_AMOUNT = 'fixed_amount',       // Fixed amount discount
  FREE_SHIPPING = 'free_shipping',     // Free shipping discount
}
```

### CouponStatus
Defines the status of coupons.

```typescript
export enum CouponStatus {
  ACTIVE = 'active',           // Coupon is active
  INACTIVE = 'inactive',       // Coupon is inactive
  EXPIRED = 'expired',         // Coupon has expired
  USED = 'used',              // Coupon has been used
}
```

## 🤖 AI-Related Enums

### AIProvider
Defines available AI service providers.

```typescript
export enum AIProvider {
  OPENAI = 'openai',          // OpenAI (GPT models)
  GEMINI = 'gemini',          // Google Gemini
  ANTHROPIC = 'anthropic',    // Anthropic (Claude)
}
```

### AIRequestType
Defines types of AI requests.

```typescript
export enum AIRequestType {
  PRODUCT_RECOMMENDATION = 'product_recommendation',
  CHAT_SUPPORT = 'chat_support',
  REVIEW_ANALYSIS = 'review_analysis',
  SENTIMENT_ANALYSIS = 'sentiment_analysis',
}
```

## 🎯 Usage Examples

### 1. Creating a User
```typescript
const user = new User();
user.role = UserRole.USER;
user.status = UserStatus.ACTIVE;
```

### 2. Updating Order Status
```typescript
const order = await orderRepository.findOne(id);
order.status = OrderStatus.SHIPPED;
await orderRepository.save(order);
```

### 3. Filtering Products
```typescript
const activeProducts = await productRepository.find({
  where: { status: ProductStatus.ACTIVE }
});
```

### 4. Payment Processing
```typescript
const payment = {
  method: PaymentMethod.CREDIT_CARD,
  status: PaymentStatus.PAID,
  amount: 99.99
};
```

## 🔧 Database Migration

When adding new enums, you need to:

1. **Add the enum to the centralized file**
2. **Update the entity to use the enum**
3. **Create a migration** to update the database schema
4. **Update existing data** if needed

### Example Migration:
```sql
-- Add new enum column
ALTER TABLE products ADD COLUMN status VARCHAR(50) DEFAULT 'active';
ALTER TABLE products ADD COLUMN type VARCHAR(50) DEFAULT 'physical';

-- Update existing data
UPDATE products SET status = 'active' WHERE status IS NULL;
UPDATE products SET type = 'physical' WHERE type IS NULL;
```

## 📊 Benefits of Using Enums

### 1. **Type Safety**
- Prevents invalid values
- Compile-time error checking
- Better IDE support

### 2. **Data Consistency**
- Standardized values across the application
- Prevents typos and inconsistencies
- Easier data validation

### 3. **Maintainability**
- Centralized definition
- Easy to update and extend
- Clear documentation

### 4. **Performance**
- Database indexes on enum columns
- Efficient queries
- Reduced storage space

### 5. **User Experience**
- Consistent UI labels
- Proper status tracking
- Clear communication

## 🚀 Best Practices

1. **Always use enums for status fields**
2. **Keep enum values descriptive and consistent**
3. **Document enum usage in comments**
4. **Use TypeScript's enum features for type safety**
5. **Consider database constraints for enum columns**
6. **Plan for future enum extensions**

This enum system provides a robust foundation for the Time2Crack application, ensuring data consistency and type safety throughout the system. 