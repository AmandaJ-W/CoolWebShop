<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>Please sign in to access your shopping cart:</h1>
      <div id="fields">
        <label for="username">Username: </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        <br><br>
        <label for="password">Password:  </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <br><br>
        <div><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
button {
  background-color: white;
  border: 1px solid black;
}
button:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}
a {
  color: black;
}
a:hover {
  color:#78B563;
  text-decoration: underline;
}
input:focus {
  outline-color: #78B563;
}
</style>
