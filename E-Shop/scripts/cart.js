

Vue.component('cart-list', {
    props: ['cartItems'],
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
        
        createNewProduct(prod) {
            return {
                product_name: prod.dataset['name'],
                price: prod.dataset['price'],
                id_product: prod.dataset['id'],
                quantity: 1
            }
        },
        addProductToCart(e) {
            let id = e.target.dataset['id'];
            let find = this.$parent.itemsCart.find(product => product.id_product == id);
            if (find) {
                find.quantity++;
            } else {
                let prod = this.createNewProduct(e.target);
                this.$parent.itemsCart.push(prod);
                console.log(this.$parent.itemsCart);
            }
        },
        deleteProductFromCart(e) {
            console.log(e.target)
            let id = e.target.dataset['id']
            
            let find = this.$parent.itemsCart.find(product => product.id_product == id)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.$parent.itemsCart.splice(this.items.indexOf(find), 1)
            }
        },
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