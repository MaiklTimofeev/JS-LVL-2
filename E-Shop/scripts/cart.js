Vue.component('cart-list', {
    props: ['cartItems'],
    data() {
        return {
            cartApi: '/cartData',
        }
    },
    template: `
    <div class="cart-items">
        <one-cart 
            v-for="item of cartItems" 
            :key="item.id_product"
            :item="item"
            @deleteProductFromCart="deleteProductFromCart">
        </one-cart>
    </div>
    `,
    methods: {
        deleteProductFromCart(e) {
            if (e.quantity > 1) {
                e.quantity--
            } else {
                // this.$parent.itemsCart.splice(this.cartItems.indexOf(e), 1);
                this.$parent.delete('/cartData', e)
                    .then(res => {
                        console.log(res);
                        this.$parent.itemsCart = res;
                    });
            }
        },
        
    },
    mounted() {
        this.$parent.get(this.cartApi)
            .then(res => {
                this.$parent.itemsCart = res;
                console.log(res);
            })
    }
});

Vue.component('one-cart', {
    data(){
        return{
            // itemsCart: [],
            
            // cartUrl: 'cartData.json'
        }
    },
    props: ['item'],
    template: `
        <div class="cart-item" :data-id="item.id_product">
            <img src="https://placehold.it/100x80" alt="">
            <div class="product-desc">
                <p class="product-title">{{ item.product_name }}</p>
                <p class="product-quantity">{{ item.quantity }}</p>
                <p class="product-single-price">{{ item.price }}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" :data-id="item.id_product"
                    @click="$emit('deleteProductFromCart', item)">&times;</button>
            </div>
        </div>
    `
    

});