let app = new Vue({
    el: '#app',
    data: {
        items: [],
        itemsCart: [],
        filteredItems: [],
        isVisibleCart: false,
        totalQua: 0,
        totalSum: 0,
        userSearch: '',

    },
    methods: {
        get(url) {
            return fetch(url).then(d => d.json())
        },
        post(url, item) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then(d => d.json());
        },
        put(url, item) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then(d => d.json());
        },
        delete(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(d => d.json());
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