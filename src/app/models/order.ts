import { Shipping } from './shipping';
import { OrderItem } from './order-item';
import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    shipping: Shipping;
    items: OrderItem[];
    userId: string;

    constructor(cart: ShoppingCart, shipping: Shipping, userId: string) {
        this.datePlaced = new Date().getTime();
        this.shipping = shipping;
        this.items = cart.items.map(item => {
          return {
            product: {
              title: item.title,
              imageUrl: item.imageUrl,
              price: item.price
            },
            quantity: item.quantity,
            totalPrice: item.totalPrice
          };
        });
        this.userId = userId;
    }
}
