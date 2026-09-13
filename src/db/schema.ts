import { relations } from 'drizzle-orm';
import { pgTable, text, boolean, numeric, integer, jsonb, timestamp, date } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  role: text('role').default('ORDER_STAFF').notNull(),
  branchId: text('branch_id').default('b-dhanmondi'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const branches = pgTable('branches', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phone: text('phone').notNull(),
  active: boolean('active').default(true),
});

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon'),
});

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price').notNull(),
  category: text('category').notNull(),
  image: text('image'),
  available: boolean('available').default(true),
  isPopular: boolean('is_popular').default(false),
  preparationTimeMinutes: integer('preparation_time_minutes').default(5),
  options: jsonb('options'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  branchId: text('branch_id').references(() => branches.id),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerEmail: text('customer_email'),
  orderType: text('order_type').notNull(),
  deliveryAddress: text('delivery_address'),
  deliveryNotes: text('delivery_notes'),
  subtotal: numeric('subtotal').notNull(),
  discount: numeric('discount').default('0'),
  deliveryFee: numeric('delivery_fee').default('0'),
  total: numeric('total').notNull(),
  status: text('status').default('NEW').notNull(),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').default('PENDING').notNull(),
  specialInstructions: text('special_instructions'),
  cancellationReason: text('cancellation_reason'),
  cancelledBy: text('cancelled_by'),
  refundRecord: jsonb('refund_record'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').references(() => orders.id, { onDelete: 'cascade' }),
  productId: text('product_id').references(() => products.id),
  productName: text('product_name').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price').notNull(),
  totalPrice: numeric('total_price').notNull(),
  customization: jsonb('customization'),
});

export const offers = pgTable('offers', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  discountPercent: integer('discount_percent').notNull(),
  couponCode: text('coupon_code').notNull().unique(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  active: boolean('active').default(true),
});

export const banners = pgTable('banners', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  ctaText: text('cta_text').default('View'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  active: boolean('active').default(true),
});

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  orderId: text('order_id'),
  read: boolean('read').default(false),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: text('id').primaryKey(),
  adminName: text('admin_name').notNull(),
  adminRole: text('admin_role').notNull(),
  action: text('action').notNull(),
  orderId: text('order_id'),
  details: text('details'),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow(),
});
