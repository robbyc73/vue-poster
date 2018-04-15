var PRICE = 9.99;
new Vue({
    el: '#app',
    data: {
        search: '',
        products: [
            {
                id: 1,
                name: 'apple',
              price: 19.99,
              quantity: 0
            },
            {
                id: 2,
                name: 'orange',
                price: 12.32,
                quantity: 0
            },
            {
                id: 3,
                name: 'pear',
                price: 45.01,
                quantity: 0
            }
        ],
        filteredProducts: [

        ],
        cart: {
            items: []
        }
    },
    watch: {
        // whenever search changes, this function will run
        search: function (newSearch, oldSearch) {
            //this.filteredProducts = this.filterProducts(newSearch);
        }
    },
    filters: {
        productId: function(id) {
            return 'Fruit_sku_'+id;
        },
        currency: function(value) {
            return '$'+value.toFixed(2);
        }
    },
    computed: {
        calculateTotal: function () {
            var currentTotal = 0;
            for (i = 0; i < this.cart.items.length; i++) {
                currentTotal += this.calculateSubTotal(this.cart.items[i]);
            }
            return currentTotal;
        },
    },
        methods: {
            filterProducts: function(search) {
                var options = {
                    shouldSort: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [
                        "name",
                    ]
                };
                var fuse = new Fuse(this.products, options);
                var filteredProducts = fuse.search(search);
                return filteredProducts;
            },
            calculateSubTotal: function (item) {
                var subTotal = 0;

                subTotal =  item.price * item.quantity;

                return subTotal;
            },

            addItem: function (item) {
                var itemInCartIndex = this.isItemInCartIndex(item);

                if(itemInCartIndex === false) {
                    item.quantity = 1;
                    item.price = PRICE;
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
                    if (this.cart.items[i].id == item.id) {
                        itemInCartIndex = i;
                        break;
                    }
                }
                return itemInCartIndex;
            },

            onSubmit: function() {
                //this.filteredProducts = this.filterProducts(this.search);

                // GET /someUrl
                this.$http.get('/search/'+this.search).then(response => {
                    // get body data
                    this.filteredProducts = response.body;
                }, response => {
                    // error callback
                });

            }

        }
    });