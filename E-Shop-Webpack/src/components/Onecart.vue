<template>
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
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: ['item'],
}
</script>

<style lang="stylus" scoped>

</style>

