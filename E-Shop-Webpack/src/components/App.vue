<template>
  <div id="app">
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">
        <form action="#" class="search-form">
          <input type="text" class="search-field" v-model="userSearch">
          <button class="btn-search" type="submit" @click="filterItems">Search</button>
        </form>
        <button class="btn-cart" @click="isVisibleCart = !isVisibleCart">Cart</button>
        <div div v-show="isVisibleCart" class="cart-block">
          <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
          </div>
          <hr />
          <p class="no-data" v-if="itemsCart.length == 0">Cart is Empty</p>
          <div class="cart-items">
            <Cart :cart-items="itemsCart"></Cart>
          </div>
          <hr />
          <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price">{{ checkTotalSum }}</div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <p class="no-data" v-if="items.length == 0">No Data</p>
      <Itemslist :items="filteredItems"></Itemslist>
    </main>
  </div>
</template>

<script>
import Cart from "./Cart.vue";
import Itemslist from "./Items.vue";

export default {
  components: { Cart, Itemslist },

  data() {
    return {
        items: [],
        itemsCart: [],
        filteredItems: [],
        API: 'https://raw.githubusercontent.com/MaiklTimofeev/E-Shop-API/master/',
        JSONS: ['catalogData.json', 'cartData.json'],
        isVisibleCart: false,
        totalQua: 0,
        totalSum: 0,
        userSearch: '',
    };
  },
  methods: {
    get(url) {
      return fetch(url).then(d => d.json());
    },
    showHideCart() {
      !this.isVisibleCart
        ? (this.isVisibleCart = true)
        : (this.isVisibleCart = false);
    },
    filterItems() {
      console.log("filter");
      let regexp = new RegExp(this.userSearch, "i");
      this.filteredItems = this.items.filter(el =>
        regexp.test(el.product_name)
      );
    }
  },
  computed: {
    checkTotalQua() {
      this.totalQua = 0;
      this.itemsCart.forEach(item => {
        this.totalQua += item.quantity;
      });
      return this.totalQua;
    },
    checkTotalSum() {
      this.totalSum = 0;
      this.itemsCart.forEach(item => {
        this.totalSum += item.price * item.quantity;
      });
      return this.totalSum;
    }
  }
};
</script>

<style lang="stylus" scoped></style>

