<template>
    <div class="products">
        <Oneitem v-for="item in items" 
            :item="item"
            :key="item.id_product"
            @addProductToCart="addProductToCart">
        </Oneitem>
    </div>
</template>

<script>

import Oneitem from './Oneitem.vue'

export default {
    components: { Oneitem },
    props: ['items'],
    data() {
        return {
            itemApi: 'catalogData.json'
        }
    },
    methods: {
        createNewProduct(prod) {
            return {
                product_name: prod.product_name,
                price: prod.price,
                id_product: prod.id_product,
                quantity: 1
            }
        },
        addProductToCart(e) {
            let find = this.$parent.itemsCart.find(product => product.id_product == e.id_product);
            if (find) {
                console.log(find);
                find.quantity++;
            } else {
                console.log(e);
                let prod = this.createNewProduct(e);
                this.$parent.itemsCart.push(prod);
                console.log(this.$parent.itemsCart);
            }
        },
    },
    mounted() {
        this.$parent.get(this.$parent.API + this.itemApi)
            .then(res => {
                this.$parent.items = res;
                this.$parent.filteredItems = res;
                console.log(res);
            })
    }
}
</script>

<style lang="stylus" scoped>

</style>
