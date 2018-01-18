import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    dateCreated?: Date;
    items?: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [itemId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for (const itemId in itemsMap) {
            if (itemId) {
                const item = itemsMap[itemId];
                this.items.push(new ShoppingCartItem({ ...item, $key: itemId }));
            }
        }
    }

    get totalQuantity() {
        let quantity = 0;
        for (const item of this.items)
          quantity += item.quantity || 0;
        return quantity;
    }

    get totalPrice() {
        let totalPrice = 0;
        for (const item of this.items)
          totalPrice += item.totalPrice || 0;
        return totalPrice;
    }

    getItemQuantity(product: Product) {
        const item: ShoppingCartItem = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }
}
