new Vue({
    el: '#app',
    data: {
        products: [
            { name: 'apple',
              price: 19.99
            },
            {
                name: 'orange',
                price: 12.32
            },
            {
                name: 'pear',
                price: 45.01
            }
        ],
        cart: {
            items: []
        }
    },
    computed: {
        calculateTotal: function(){
            var currentTotal = 0;
            for(i=0;i< this.cart.items.length; i++)
            {
                currentTotal += this.cart.items[i].price;
            }
            return currentTotal;
        },
    },
    methods: {
        addItem: function(item) {
            this.cart.items.push(item);
        },
        removeItem: function(item) {
            for(i=0;i< this.cart.items.length; i++) {
                if(this.cart.items[i].name == item.name) {
                    this.cart.items.splice(i, 1);
                    continue;
                }
            }
        },
        isItemInCart: function(item) {
            var isItemInCart = false;
            for(i=0;i< this.cart.items.length; i++) {
                if(this.cart.items[i].name == item.name) {
                    isItemInCart = true;
                }
            }
            return isItemInCart;
        }
    }
    }
);