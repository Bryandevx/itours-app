<template>
  <div>
    <main-header></main-header>

    <v-row class="dense mt-10" v-if="dataLoaded">
      <v-col sm="4" v-for="(tour, index) in tours" :key="index">
        <tour-card
          :data="tour"
          :likedTours="likedToursId"
          :promoImgs="promoImgs"
        ></tour-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TourCard from "../components/TourCard.vue";
import axios from "axios";
import MainHeader from "../components/MainHeader.vue";
export default {
  name: "DateTours",
  props: {
    start_date: {
      type: String,
      required: false,
      default: "2021-01-01",
    },
    end_date: {
      type: String,
      required: false,
      default: "2021-12-31",
    },
  },
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
      form: {
        start_date: this.start_date,
        end_date: this.end_date,
      },
    };
  },
  async mounted() {
    await this.getAllTours();

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
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      await axios({
        url: "http://127.0.0.1:8000/api/tours/ByRangeDate",
        data: this.form,
        method: "POST",
        config: config,
      }).then(({ data }) => {
        console.log(data);
        this.tours = data;
      });
    },

    async getLikedTours() {
      await axios.get("http://127.0.0.1:8000/api/images").then((response) => {
        console.log("PROMO DATA!");
        console.log(response.data);
        this.promoImgs = response.data;
      });
    },

    async getPromoImgs() {
      await axios.get("http://127.0.0.1:8000/api/images").then((response) => {
        console.log("PROMO DATA!");
        console.log(response.data);
        this.promoImgs = response.data;
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