new Vue({
    el: '#app',
    data: {
        products: [
            { name: 'apple',
              price: 19.99,
              quantity: 0
            },
            {
                name: 'orange',
                price: 12.32,
                quantity: 0
            },
            {
                name: 'pear',
                price: 45.01,
                quantity: 0
            }
        ],
        cart: {
            items: []
        }
    },
    computed: {
        calculateTotal: function () {
            var currentTotal = 0;
            for (i = 0; i < this.cart.items.length; i++) {
                currentTotal += (this.cart.items[i].price * this.cart.items[i].quantity);
            }
            return currentTotal;
        },
    },
        methods: {
            addItem: function (item) {
                var itemInCartIndex = this.isItemInCartIndex(item);

                if(itemInCartIndex === false) {
                    item.quantity++;
                    this.cart.items.push(item);
                } else {
                    this.cart.items[itemInCartIndex].quantity++;
                }

            },
            removeItem: function (item) {
                var itemInCartIndex = this.isItemInCartIndex(item);

                if(itemInCartIndex >= 0) {
                    this.cart.items[itemInCartIndex].quantity--;
                    if(this.cart.items[itemInCartIndex].quantity == 0) {
                        this.cart.items.splice(itemInCartIndex, 1);
                    }
                }
            },
            isItemInCartIndex: function (item) {
                var itemInCartIndex = false;
                for (i = 0; i < this.cart.items.length; i++) {
                    if (this.cart.items[i].name == item.name) {
                        itemInCartIndex = i;
                        continue;
                    }
                }
                return itemInCartIndex;
            }

        }
    });