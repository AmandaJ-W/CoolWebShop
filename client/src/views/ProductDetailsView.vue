<template>
    <div class="content">
        <div id="left-column"> 
            <div class="sku-price">
            <div class="sku">{{ product.productSku }}</div>
            <div class="price">{{ formatCurrency(product.price) }}</div>
            </div>
        <div v-if="product" class="product-name"><h1>{{ product.name }}</h1></div>
        <div class="img"><img src="/img/product_350x250.jpg"/></div>
        <div class="description">"{{ product.description }}"</div>
    </div>
    <div id="right-column">
        <div v-if="isLoggedIn" v-on:click="addToCart(product)"><button><font-awesome-icon icon="fa-solid fa-cart-plus" class="add-cart" />Add to Cart</button></div>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/ProductService.js';
import CartService from '../services/CartService.js';
export default {
    components: {},
    data() {
        return {
        isLoading: false,
        product: {},
        authenticated: false,
        productId: {
            type: String,
            required: true
        }
        };
},
computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    }
},
methods: {
    getProductById(productId) {
        
        ProductService.getProductById(productId) 
        .then(response => {
            this.product = response.data;
        })
        .catch(error => {
            alert("Cannot find product.");
        });
    },
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
created() {
    const productId = this.getProductById(this.$route.params.productId);
}

}

</script>

<style scoped>
#left-column {
    background-color: white;
    width: 500px;
    padding: 10px;
    border: 1px solid black;
    box-shadow: 2px 2px;
}
.sku-price {
    display: flex;
    justify-content: space-between;
}
.img {
    text-align: center;
}
.content {
    display: flex;
    justify-content: space-between;
}
button {
    padding: 5px;
    background-color: white;
    border: 1px solid black;
}
button:hover {
    background-color: black;
    color: white;
}
</style>