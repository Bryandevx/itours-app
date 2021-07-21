<template>
  <div class="home">
    <main-header></main-header>

    <v-container d-flex-column justify-center align-center>
      <div class="d-flex justify-center" v-if="this.isAlertActive">
        <v-alert dense text type="success">
          Thanks for working with us! We have sent you an email to
          {{ this.$session.get("user_email") }} with your bill.
        </v-alert>
      </div>
    </v-container>

    <search-by-date></search-by-date>
    <carousel></carousel>
    <v-container>
    </v-container>
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import MainHeader from "../components/MainHeader.vue";
import SearchByDate from "../components/SearchByDate.vue";
import TourGallery from "../components/TourGallery.vue";

export default {
  name: "Home",
  props: {
    isAlertActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    MainHeader,
    Carousel,
    TourGallery,
    SearchByDate,
  },
  data() {
    return {

    };
  },
  mounted() {
    console.log(this.$session.getAll());
    console.log(this.$session.exists());
    console.log("this user name " + this.$session.get("user_name"));
  },
};
</script>
