


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
                        console.log(res);
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