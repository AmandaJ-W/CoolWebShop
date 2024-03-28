<template>
<div class="cart">

    <div id="left">
        <h1>Your shopping cart</h1>
        <table class="product-table">
     <tr>
       <th><h2>Qty</h2></th>
       <th><h2>Product</h2></th>
       <th><h2>Price</h2></th>
       <th><h2>Amount</h2></th>
       <th><h2></h2></th>
     </tr>
       <tr v-for="product in cart" :key="product.productId" class="cartItem">
         <td><div id="quantity">{{ product.quantity }}</div></td>
         <td><div id="product">{{ product.product.name }}</div></td>
         <td><div id="price">{{ formatCurrency(product.product.price) }}</div></td>
         <td><div id="amount">{{ formatCurrency(product.product.price * product.quantity) }}</div></td>
         <td><div id="remove" v-on:click="removeItem(product.cartItemId)">X</div></td>
       </tr>
       <tr id="spacer"></tr>
       <tr id="line">
        <td></td>
        <td>Subtotal:</td>
        <td></td>
        <td>{{ formatCurrency(shoppingCart.itemSubtotal) }}</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Tax:</td>
        <td></td>
        <td>{{ formatCurrency(shoppingCart.tax) }}</td>
      </tr>
      <tr>
        <td></td>
        <td>Total:</td>
        <td></td>
        <td>{{ formatCurrency(shoppingCart.total) }}</td>
      </tr>
 </table>
    </div>



    <div id="right">
        <button v-on:click="clearCart"><font-awesome-icon icon="fa-solid fa-trash-can" class="add-cart"/> Clear cart</button>
    </div>
</div>
</template>

<script>
import CartService from '../services/CartService.js';

export default {
  data() {
    return {
      cart: [],
      shoppingCart: {},
    }
  },
  methods: {
    getCart() {
      CartService.getCart() 
      .then(response => {
        console.log(response);
        this.cart = response.data.items;
        this.shoppingCart = response.data;
      })
      .catch(error => {
        console.log('Error getting cart:', error);
        alert('Error getting cart.');
      });
    },
    formatCurrency(value) {
      return Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
      }).format(value);
    },
    removeItem(cartItemId) {
      CartService.removeItem(cartItemId)
      .then(response => {
        this.getCart();
        this.updateMessage('Item removed from cart!');
      })
      .catch(error => {
        console.log('Error removing item:' + error);
      });
    },
    clearCart() {
      CartService.clearCart()
      .then(response => {
        this.getCart();
        this.updateMessage('Cart emptied!')
      })
      .catch(error => {
        alert('Error removing item from cart.');
      });
    },
    updateMessage(message) {
      this.$store.commit('SET_MESSAGE', message);
    }
  },
  created() {
    this.getCart();
  }
}
</script>

<style>
.cart {
    display: flex;
    justify-content: space-between;
}
#remove {
  font-weight: bold;
}
#remove:hover {
  cursor: pointer;
}
.product-table {
  margin-top: 15px;
  width: 500px;
  border-collapse: collapse;
  background-color: white;
  border: 1px solid black;
  box-shadow: 2px 2px;
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
#line {
  border-top: 2px solid black;
}
#spacer {
  height: 1px;
}
button:hover {
  cursor: pointer;
  background-color: black;
  color: white;
}
/* .product-table {
  margin-top: 15px;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  background-color: white;
}
.product-table th,
.product-table td, .public-table tr {
  padding: 8px;
  width: 33.33%; 
}
.product-table th {
  font-weight: bold;
  text-align: left;
  background-color: #78B563
} */
</style>