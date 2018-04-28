var PRICE = 9.99;
var LOAD_NUM = 10;
new Vue({
    el: '#app',
    props: {
       search: {
           type: String,
           'default': 'anime'
       },
        lastSearch: {
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
       },
       loading: {
           type: Boolean,
           'default': false
       },
       price: {
           type: Number,
           'default': PRICE
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
        numberSearchResultsFound: function() {
            return this.filteredProducts.length+' results found for search term '+this.lastSearch;
        }
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
                        title: item.title,
                        quantity: 1,
                        price: PRICE,
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
                    this.cart[index].show = false;
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
                self.cart = [];
                self.filteredProducts = [];
                self.loading = true;
                //this.filteredProducts = this.filterProducts(this.search);

                // GET /someUrl
                this.$http.get('/search/'+this.search).then(response => {
                    // get body data
                    self.filteredProducts = response.body.slice(0,LOAD_NUM);
                    self.lastSearch = self.search;
                    self.loading = false;
                }, response => {
                    // error callback
                });

            }

        },
        mounted(){
            this.onSubmit();
        },
        updated(){
            var elem = this.$el
            console.log("elem "+elem.clientHeight)
            elem.scrollTop = elem.clientHeight;
        },
    });