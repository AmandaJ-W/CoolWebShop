<template>
    <table class="product-table">
      <tr>
        <th><h2>Sku</h2></th>
        <th><h2>Product</h2></th>
        <th><h2>Price</h2></th>
        <th> </th>
      </tr>
      <tr v-for="product in displayedProducts" :key="product.productId" class="list-item">
        <td>{{ product.productSku }}</td>
        <td><router-link class="detail-link" :to="{ name: 'product-details', params: { productId: product.productId }}">{{ product.name }}</router-link></td>
        <td>{{ formatCurrency(product.price) }}</td>
        <td>
          <div class="cart" v-if="isLoggedIn" v-on:click="addToCart(product)">
            <font-awesome-icon icon="fa-solid fa-cart-plus" class="add-cart" />
          </div>
        </td>
      </tr>
    </table>
  </template>
  
  <script>
  import CartService from '../services/CartService.js';

  export default {
    props: {
      displayedProducts: {
        type: Array,
        required: true
      }
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
          alert('Error adding product to cart.');
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
.product-table {
  margin-top: 15px;
  width: 500px;
  border-collapse: collapse;
  background-color: white;
  border: 1px solid black;
}
.product-table th,
.product-table td, .public-table tr {
  padding: 8px;
}
.product-table th {
  font-weight: bold;
  text-align: left;
  background-color: #78B563;
  border-bottom: 1px solid black;
}
.product-table tr {
  width: 50px;
  height: 40px;
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
  text-decoration: underline;
}
.cart {
  text-align: center;
  justify-content: flex-end;
}
  </style>
  