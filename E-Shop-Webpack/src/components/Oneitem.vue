<template>
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
</template>

<script>
export default {
    props: ['item'],
}
</script>

<style lang="stylus" scoped>

</style>
