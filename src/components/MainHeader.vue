<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/">
          <v-img src="../assets/profile.png" width="200" height="100"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items> </v-toolbar-items>
      <v-btn
        text
        color="deep-purple"
        :to="{
          name: 'AvailableTours',
        }"
      >
        Tours</v-btn
      >

      <div v-if="this.$session.exists() && this.$session.get('is_admin')">
        <v-btn
          text
          color="deep-purple"
          :to="{
            name: 'ListTours',
          }"
        >
          Panel
        </v-btn>

        
        <v-btn @click="logOut" text color="deep-purple"> Log out </v-btn>

      </div>

      <div v-if="this.$session.exists() && !this.$session.get('is_admin')">
        <v-btn
          text
          color="deep-purple"
          :to="{
            name: 'favorites',
          }"
        >
          Favorites
        </v-btn>

        <v-btn
          text
          color="deep-purple"
          :to="{
            name: 'Cart',
          }"
        >
          Cart
        </v-btn>

        <v-btn @click="logOut" text color="deep-purple"> Log out </v-btn>
      </div>

      <div v-if="!this.$session.exists()">
        <v-btn
          text
          color="deep-purple"
          :to="{
            name: 'SignUp',
          }"
        >
          Sign Up
        </v-btn>

        <v-btn
          text
          color="deep-purple"
          :to="{
            name: 'Login',
          }"
        >
          Login
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>
<script>
import SearchBar from "./SearchBar.vue";
export default {
  components: { SearchBar },
  name: "MainHeader",
  data() {
    return {
      categories: [
        "Family",
        "Camping",
        "Adventures",
        "Hiking",
        "National Park",
        "Other",
      ],
    };
  },
  methods: {
    loadToursByCategory(item) {
      console.log(item);
    },
    logOut() {
      if (this.$session.exists()) {
        this.$session.destroy();
        this.$router.go();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>