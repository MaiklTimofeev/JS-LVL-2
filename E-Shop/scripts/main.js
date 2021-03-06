let app = new Vue({
    el: '#app',
    data: {
        items: [],
        itemsCart: [],
        filteredItems: [],
        API: 'https://raw.githubusercontent.com/MaiklTimofeev/E-Shop-API/master/',
        JSONS: ['catalogData.json', 'cartData.json'],
        isVisibleCart: false,
        totalQua: 0,
        totalSum: 0,
        userSearch: '',

    },

    mounted() {
       this.JSONS.forEach(json => {
           this.get(json)
           .then(res => {
               if (json === 'catalogData.json') {
                   this.items = res;
                   this.filteredItems = res;
               } else if (json === 'cartData.json') {
                   this.itemsCart = res;
                   console.log(this.itemsCart);
               }
           })
       })
            
    },
    methods: {
        get(url) {
            return fetch(this.API + url).then(d => d.json())
        },
        showHideCart() {
            !this.isVisibleCart ? this.isVisibleCart = true : this.isVisibleCart = false;
        },
        addProductToCart(e) {
            let id = e.target.dataset['id'];
            let find = this.itemsCart.find(product => product.id_product == id);
            if (find) {
                find.quantity++;
            } else {
                let prod = this.createNewProduct(e.target);
                this.itemsCart.push(prod);
                console.log(this.itemsCart);
            }
        },
        createNewProduct(prod) {
            return {
                product_name: prod.dataset['name'],
                price: prod.dataset['price'],
                id_product: prod.dataset['id'],
                quantity: 1
            }
        },
        deleteProductFromCart(e) {
            let id = e.target.dataset['id']
            let find = this.itemsCart.find(product => product.id_product == id)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.itemsCart.splice(this.items.indexOf(find), 1)
            }
        },
        filterItems() {
            console.log("filter");
            let regexp = new RegExp(this.userSearch, 'i');
            this.filteredItems = this.items.filter(el => regexp.test(el.product_name));
        }
    },
    computed: {
        checkTotalQua() {
            this.totalQua = 0;
            this.itemsCart.forEach(item => {
                this.totalQua += item.quantity;
            })
            return this.totalQua;
        },
        checkTotalSum() {
            this.totalSum = 0;
            this.itemsCart.forEach(item => {
                this.totalSum += item.price * item.quantity;
            })
            return this.totalSum;
        }
    }

})

