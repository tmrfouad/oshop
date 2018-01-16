import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    dateCreated?: Date;
    items?: ShoppingCartItem[];

    get Quantity() {
        let quantity = 0;
        for (const productId in this.items)
          quantity += (this.items[productId].quantity || 0);
        return quantity;
    }

    constructor(items: ShoppingCartItem[]) {
        this.items = items;
    }
}
