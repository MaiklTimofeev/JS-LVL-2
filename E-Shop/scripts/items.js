Vue.component('items-list', {
    props: ['items'],
    data() {
        return {
            itemApi: '/catalogData',
            cartApi: '/cartData'
        }
    },
    template: `
    <div class="products">
        <one-item v-for="item in items" 
            :item="item"
            :key="item.id_product"
            @addProductToCart="addProductToCart">
        </one-item>
    </div>
    `,
    methods: {
        createNewProduct(prod) {
            return {
                product_name: prod.dataset['name'],
                price: prod.dataset['price'],
                id_product: prod.dataset['id'],
                quantity: 1
            }
        },
        addProductToCart(e) {
            let find = this.$parent.itemsCart.find(product => product.id_product == e.id_product);
            if (find) {
                console.log(find);
                this.$parent.put('/cartDataAdd', e)
                    .then(res => {
                        if (res.status) {
                            this.$parent.itemsCart = res;
                        }
                    });
            } else {
                let prod = Object.assign({ quantity: 1 }, e);
                this.$parent.post('/cartData', prod)
                    .then(res => {
                        if (res.status) {
                            this.$parent.itemsCart = res;
                        }
                    });
                this.$parent.get(this.cartApi)
                    .then(res => {
                    this.$parent.itemsCart = res;
                        
                })
            }
        },
    },
    mounted() {
        this.$parent.get(this.itemApi)
            .then(res => {
                this.$parent.items = res;
                this.$parent.filteredItems = res;
                console.log(res);
            })
    }
});

Vue.component('one-item', {
    props: ['item'],
    template: `
        <div class="products">
            <div class="product-item">
                <img src="https://placehold.it/300x200" :alt="item.product_name">
                <div class="desc">
                    <h1>{{ item.product_name }}</h1>
                    <p>{{ item.price }}</p>
                    <button class="buy-btn" name="buy-btn" :data-name="item.product_name" :data-price="item.price"
                    :data-id="item.id_product" @click="$emit('addProductToCart', item)">Купить</button>
                </div>
            </div>
        </div>
    `,
    methods: {}
});