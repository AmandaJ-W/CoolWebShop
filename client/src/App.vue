<template>
  <div id="app" v-on:click="clearMessage">
    <div id="fixed-container">
    <header>
      <img src="img/SSGeek.png" />
    </header>
    <nav>
      <div id="left-side">
        <router-link v-bind:to="{ name: 'products'}">Home</router-link>
        <router-link v-bind:to="{ name: 'cart'}">Cart</router-link>
      </div>
      <!-- Message window -->
      <div id="message-window" v-if="message">
        {{ message }}
      </div>
      <div id="right-side">
        <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token">
         Logout
        </router-link>
        <router-link v-bind:to="{ name: 'login' }" v-else>Login</router-link>
      </div>
    </nav>
    </div>

    <main>
        <router-view />
    </main>
    <footer>
      <p>&copy; 2024 All rights reserved</p>
    </footer>
  </div>
</template>
<script>
export default {
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
  methods: {
    clearMessage() {
      if (this.message) {
        this.$store.commit('CLEAR_MESSAGE');
      }
    }
  }
}
</script>
<style scoped>
html {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
 #app {
    display: grid;
    grid-template-rows: 120px 1fr 35px;
    grid-template-areas: "fixed-container"
                        "main"
                        "footer";
    height: 100%;
  }
  header > img {
    max-height: 68px;
  }
  #fixed-container {
   grid-area: fixed-container;
   position: sticky;
   top: 0;
   z-index: 999;
   width: 100%;
  }
  main {
    grid-area: main;
    background-color: #EE2115;
    padding: 20px;
    overflow-y: auto;
  }
  footer {
    grid-area: footer;
    display: flex;
    text-align: bottom;
    align-items: center;
    position: sticky;
    bottom: 0;
    background-color: white;
    border: 1px solid black;
  }
  footer p {
   margin-left: 10px;
  }
  header {
    background-color: white;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  nav {
    margin-left: auto;
    background-color: white;
    margin-top: 0px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  a {
      text-decoration: none;
      color: black;
      padding: 5px;
  }
  a:hover {
    color:#78B563;
    text-decoration: underline;
  }
</style>