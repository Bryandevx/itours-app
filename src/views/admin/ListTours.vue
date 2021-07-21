<template>
  <div>
    <main-header></main-header>
    <v-container d-flex-column justify-center align-center>
      <div class="d-flex justify-center" v-if="this.isAlertActive">
        <v-alert dense text type="success"> Tour created sucessfully! </v-alert>
      </div>
    </v-container>

    <v-card class="d-flex justify-center" width="700">
      <div class="d-flex flex-column">
        <div>
        <v-card-title>
          Add New Tour
        </v-card-title>
        </div>
        <div>
          <v-card-text>
            With iTours you can add a variety of tours, click in the button "+" below to add a new Tour
          </v-card-text>
        </div>
        <div class="d-flex justify-center">
        <v-btn
          class="mx-2"
          fab
          dark
          mediu
          color="purple"
          :to="{
            name: 'CreateTour',
          }"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import MainHeader from '../../components/MainHeader.vue'
export default {
  name: "ListTours",
  components:{
    MainHeader 
  },
  props:
    {
    isAlertActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  beforeCreate: function () {
    if (this.$session.exists() && this.$session.get("is_admin") === 1) {
      //incluir dentro de la validacion tipo de usuario ya sea cliente o admin
      console.log("ok");
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
</style>