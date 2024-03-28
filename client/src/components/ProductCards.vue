<template>
  <div class="tile-products">
    <div v-for="product in displayedProducts" :key="product.productId" class="tile">
      <div class="sku"><p>{{ product.productSku }}</p></div>
      <div class="price"><p>{{ formatCurrency(product.price) }}</p></div>
      <div class="product-name"><router-link class="detail-link" :to="{ name: 'product-details', params: { productId: product.productId }}">{{ product.name }}</router-link></div>
      <div class="product-image"><img src="/img/product_350x250.jpg"/></div>
      <div class="cart" v-on:click="addToCart(product)">
        <font-awesome-icon icon="fa-solid fa-cart-plus" class="add-cart" v-if="isLoggedIn" />
      </div>
    </div>
  </div>
</template>

<script>
import CartService from '../services/CartService.js';

export default {
  props: {
    displayedProducts: {
      type: Array,
      required: true
    },
  },
  methods: {
    formatCurrency(value) {
      return Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
      }).format(value);
    },
    addToCart(product) {
      const cartItem = {
        userId: this.$store.state.userId, 
        productId: product.productId,
        quantity: 1 
      };

      CartService.addToCart(cartItem)
        .then(response => {
          this.updateMessage( product.name  +  ' added to cart!');
        })
        .catch(error => {
          alert("Error adding product to cart.");
        });     
    },
    updateMessage(message) {
      this.$store.commit('SET_MESSAGE', message);
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    }
  }
}
</script>

<style scoped>
#icons, #search-container {
  margin-right: 20px; 
}
#icons > * {
  margin-right: 20px; 
}
.tile-products {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.tile {
  margin: 5px;
  padding: 10px;
  padding-top: 0px;
  background-color: white;
  border: 1px solid black;
  box-shadow: 2px 2px;
}
  #product-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tile {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr; 
      grid-template-areas: "sku . price"
                            "name name name"
                            "image image image"
                            ". . cart";
    
  }
  .tile:hover {
    border: 1px solid #000000;
    box-shadow: 2px 2px #78B563;
  }
  .sku {
    grid-area: sku;
  }
 .price {
  grid-area: price;
  text-align: right;
 }
 .product-name {
  grid-area: name;
  /* overflow: hidden; */

 }
.product-image {
  grid-area: image;
  text-align: center;
  max-width: 200px;
  max-height: 200px;
}
.cart {
  grid-area: cart;
  text-align: right;
}
.product-image > img {
  max-width: 100%;
  max-height: 100%;
}
#search-container {
  border: 1px solid black;
  padding: 4px;
  display: flex;
  background-color: white;
  box-shadow: 2px 2px;
}
#search-container input[type="text"] {
  border: none;
}
.lupa {
  padding: 10px;
}
input[type="text"]:focus {
  outline-color: #78B563;
}
/* input[type="text"] {
  font-family: sans-serif;
} */
input[type="text"]:focus::placeholder {
  color: transparent;
}
.add-cart:hover {
  cursor: pointer;
}
#format-icon:hover {
  cursor: pointer;
}
.detail-link {
  text-decoration: none;
  color: black;
}
.detail-link:hover {
  color:#78B563;
  text-decoration: underline;;
}
.cart {
  text-align: center;
  justify-content: flex-end;
}
</style>
