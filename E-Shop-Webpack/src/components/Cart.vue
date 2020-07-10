<template>
       <div class="cart-items">
        <Onecart 
            v-for="item of cartItems" 
            :key="item.id_product"
            :item="item"
            @deleteProductFromCart="deleteProductFromCart">
        </Onecart>
    </div>
</template>

<script>

import Onecart from './Onecart.vue'

export default {
    components: { Onecart },
    props: ['cartItems'],
    data() {
        return {
            cartApi: 'cartData.json',
        }
    },
    methods: {
        deleteProductFromCart(e) {
            let find = this.$parent.itemsCart.find(product => product.id_product == e.id_product)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.$parent.itemsCart.splice(this.$parent.items.indexOf(find), 1)
            }
        },
        
    },
    mounted() {
        this.$parent.get(this.$parent.API + this.cartApi)
            .then(res => {
                this.$parent.itemsCart = res;
                console.log(res);
            })
    }
}
</script>

<style lang="stylus" scoped>

</style>


