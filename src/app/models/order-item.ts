import { OrderItemProduct } from './order-item-product';

export interface OrderItem {
    product: OrderItemProduct;
    quantity: number;
    totalPrice: number;
}
