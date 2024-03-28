<template>
  <div class="home">
    <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>

    <div id="right">
      <div id="icons">
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: cardView }"
          v-on:click="cardView = true"
          icon="fa-solid fa-grip"
          title="View tiles"
          id= "format-icon"/>
          <font-awesome-icon
            v-bind:class="{ 'view-icon': true, active: !cardView }"
            v-on:click="cardView = false"
            icon="fa-solid fa-table"
            title="View table"
            id= "format-icon" />
          </div>
            <div id="search-container">
            <input type="text" 
            placeholder="Search an item" 
            name="search" 
            v-model="searchTerm" 
            v-on:input="filterProducts(searchTerm)">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="lupa"/>
          </div>
        </div>
      </div>

      <!-- Message displays if the user is not logged in  -->
      <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }">login</router-link> to add
      items to your shopping cart.
      </p>


      <!-- Tile or list the products by toggling  -->
    <product-cards v-if="cardView" :displayedProducts="displayedProducts"/>
    <product-table v-else :displayedProducts="displayedProducts" />

    </div>
    </template>



<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService.js";
import ProductCards from "../components/ProductCards.vue";
import ProductTable from "../components/ProductTable.vue";

export default {
  components: {
    LoadingSpinner,
    ProductCards,
    ProductTable
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
      products: [],
      searchTerm: '',
      filteredProducts: [],
      authenticated: false,
      cart: []
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
    displayedProducts() {
      // If the search term is not empty, display the filteredProducts array; otherwise, display all products
      return this.searchTerm.trim() !== '' ? this.filteredProducts : this.products;
    }
  },

  methods: {
    
    getProducts() {

     this.isLoading = true;

      ProductService.getProducts()
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.log("Error displaying products.");
      });

      this.isLoading = false;
    },
    filterProducts() {
      if (this.searchTerm.trim() !== '') {
        const searchTermLower = this.searchTerm.toLowerCase();
        this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(searchTermLower)
        );
      } else {
        this.filteredProducts = [];
      }
    }, 
    formatCurrency(value) {
      return Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
      }).format(value);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
#spinner {
  color: white;
}
#heading-line {
  display: flex; 
  justify-content: space-between;
}
#right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}
#icons, #search-container {
  margin-right: 20px; 
}
#icons > * {
  margin-right: 20px; 
}
  #product-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
input[type="text"]:focus::placeholder {
  color: transparent;
}
#login-message {
  background-color: white;
  border: 1px solid black;
  width: 50%;
  padding: 10px;
  box-shadow: 2px 2px;
}
</style>