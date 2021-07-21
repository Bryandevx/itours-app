<template>
  <div>
    <main-header></main-header>

    <v-row class="dense mt-10" v-if="dataLoaded">
      <v-col sm="4" v-for="(tour, index) in tours" :key="index">
        <tour-card :data="tour" :likedTours="likedToursId" :promoImgs="promoImgs"></tour-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TourCard from "../components/TourCard.vue";
import axios from "axios";
import MainHeader from "../components/MainHeader.vue";
export default {
  name: "AvailableTours",
  components: {
    TourCard,
    MainHeader,
  },

  data() {
    return {
      tours: [],
      likedTours: [],
      likedToursId: [],
      promoImgs: [],
      dataLoaded: false,
    };
  },
  async mounted() {
    await this.getAllTours();
    await this.getPromoImgs();

    if (this.$session.exists()) {
      console.log("antes");
      await this.getLikedTours();
      console.log("despues");
      this.getLikedToursId();
    }

    this.dataLoaded = true;
  },
  methods: {
    async getAllTours() {
      await axios.get("http://127.0.0.1:8000/api/tours").then((response) => {
        console.log("AVAILABLE DATA!");
        this.tours = response.data;
        console.log(this.tours);
      });
    },

    async getPromoImgs() {
      await axios.get("http://127.0.0.1:8000/api/images").then((response) => {
        console.log("PROMO DATA!");
        console.log(response.data);
        this.promoImgs = response.data
      });
    },

    async getLikedTours() {
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
        this.likedTours = data;
      });
    },
    getLikedToursId() {
      console.log("et liked touds ");
      for (let tour of this.likedTours) {
        this.likedToursId.push(tour.id);
        console.log(tour.id);
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>