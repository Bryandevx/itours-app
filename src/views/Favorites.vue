<template>
  <div>
    <main-header></main-header>

    <v-row class="dense mt-10" v-if="dataLoaded">
      <v-col sm="4" v-for="(tour, index) in tours" :key="index">
        <liked-tour-card :data="tour" :promoImgs="promoImgs"></liked-tour-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TourCard from "../components/TourCard.vue";
import axios from "axios";
import MainHeader from "../components/MainHeader.vue";
import LikedTourCard from "../components/LikedTourCard.vue";
export default {
  name: "Favorites",
  components: {
    TourCard,
    MainHeader,
    LikedTourCard,
  },

  data() {
    return {
      tours: [],
      promoImgs: [],
      dataLoaded: false,
    };
  },
  async mounted() {
    let config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    await axios({
      url: `http://127.0.0.1:8000/api/likes/${this.$session.get("user_id")}`,
      //data: this.form,
      method: "GET",
      config: config,
    }).then(({ data }) => {
      console.log(data);
      this.tours = data;
    });

    await axios.get("http://127.0.0.1:8000/api/images").then((response) => {
      console.log("PROMO DATA!");
      console.log(response.data);
      this.promoImgs = response.data;
    });

    this.dataLoaded = true;
  },
  methods: {
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>