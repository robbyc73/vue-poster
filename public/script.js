var PRICE = 9.99;
new Vue({
    el: '#app',
    props: {
       search: {
           type: String,
           'default': ''
       },
       filteredProducts: {
           type: Array,
           'default': function() {
               return []
           }
       },
       cart: {
           type: Array,
           'default': function() {
               return []
           }
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
            var self = this;
            for (var i = 0; i < self.cart.length; i++) {
                currentTotal += self.calculateSubTotal(self.cart[i]);
            }
            return currentTotal;
        },
    },
        methods: {
            /*filterProducts: function(search) {
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
            },*/
            calculateSubTotal: function (item) {
                var subTotal = 0;

                subTotal =  item.price * item.quantity;

                return subTotal;
            },

            addItem: function (item) {
                var itemInCartIndex = this.isItemInCartIndex(item);
                var self = this;

                if(itemInCartIndex === false) {
                    self.cart.push({
                        id: item.id,
                        quantity: 1,
                        price: PRICE
                    });
                } else {
                    self.cart[itemInCartIndex].quantity++;
                }

            },
            increaseQuantity: function(index) {
                this.cart[index].quantity++;
            },
            decreaseQuantity: function(index) {
                this.cart[index].quantity--;
                if(this.cart[index].quantity == 0) {
                    this.cart.splice(index, 1);
                }
            },
            isItemInCartIndex: function (item) {
                var itemInCartIndex = false;
                var self = this;
                for (var i = 0; i < self.cart.length; i++) {
                    if (self.cart[i].id == item.id) {
                        itemInCartIndex = i;
                        return itemInCartIndex;
                    }
                }
                return itemInCartIndex;
            },

            onSubmit: function() {
                var self = this;
                //this.filteredProducts = this.filterProducts(this.search);

                // GET /someUrl
                this.$http.get('/search/'+this.search).then(response => {
                    // get body data
                    self.filteredProducts = response.body;
                }, response => {
                    // error callback
                });

            }

        }
    });