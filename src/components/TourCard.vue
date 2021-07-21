<template>
  <v-card class="mx-auto" width="315" height="">
    <v-img
      class="white--text align-end"
      height="150px"
      :src=tour.promo_img
    >
    </v-img>

    <v-card-title>{{ tour.name }}</v-card-title>

    <v-card-subtitle class="pb-0"> {{tour.ratings_number}} reviews</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>
        <v-rating
          :value="tour.stars"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
      </div>

      <div>{{tour.duration}} hours</div>

      <div>
        <strong> ${{ tour.price_per_person }} per person</strong>
      </div>
    </v-card-text>

    <div class="text-right">
      <v-btn
        :to="{
          name: 'TourDetails',
          params: {
            id: tour.id,
          },
        }"
        color="orange"
        text
      >
        View More
      </v-btn>

      <v-btn
        @click="likeManagement"
        v-if="this.$session.exists()"
        icon
        color="pink"
      >
        <v-icon :disabled="getLikeStatus">mdi-heart</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "TourdCard",
  props: {
    data: Object,
    likedTours: Array,
    promoImgs:{
      type:Array
    }
  },
  components: {},
  data() {
    return {
      tour: {
        id: this.data.id,
        name: this.data.tour_name,
        description: this.data.description,
        stars: this.data.stars,
        indications: null,
        ratings_number: this.data.ratings_number,
        duration:this.data.duration,
        // location: this.data.location,
        // slug: this.data.slug,
        start_date: this.data.start_date,
        //end_date: ,
        //include:,
        price_per_person: this.data.price_per_person,
        //quota: 1,
        categories: ["hiking", "food", "waterfalls"],
        indications: this.data.indications,
        promo_img: "",
      },
      form: {
        user_id: this.$session.get("user_id"),
        tour_id: this.data.id,
      },
      disableLike: true,
    };
  },
  mounted() {
    //this.verifyIfLiked();
    console.log("hereee");
    console.log(this.likedTours);

    this.disableLike = this.verifyIfLiked();
    this.loadPromoImg();
    console.log(this.disableLike);

    console.log("here at data");
    console.log(this.data);
    console.log(this.$session.get("user_id"));
    console.log(this.data.id);
  },
  methods: {
    async likeManagement() {
      if (this.disableLike) {
        console.log("added");
        this.disableLike = false;
        await this.addTourToFavorites();
        return;
      }
      console.log("removed");
      this.disableLike = true;
      await this.removeFromFavorites();
    },
    async addTourToFavorites() {
      console.log("like proceed");
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      await axios({
        url: "http://127.0.0.1:8000/api/likes",
        data: this.form,
        method: "POST",
        config: config,
      }).then(({ data }) => {
        console.log(data);
      });
    },

    async removeFromFavorites() {
      console.log("like removed");
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      await axios({
        url: `http://127.0.0.1:8000/api/likes/${this.$session.get("user_id")}/${
          this.data.id
        }`,
        data: this.form,
        method: "DELETE",
        config: config,
      }).then(({ data }) => {
        console.log(data);
      });
    },
    verifyIfLiked() {
      console.log("print length");
      console.log(this.likedTours.length);
      let result = this.likedTours.includes(this.tour.id);
      if (result) {
        return false;
      }
      return true;
    },

    loadPromoImg() {
      let result = this.promoImgs.find(element => element.tour_id === this.tour.id);
      console.log('RESULT FROM CARD');
      console.log(result);
      this.tour.promo_img = result.url;
      console.log(this.tour.promo_img);
    },
  },
  computed: {
    getLikeStatus() {
      return this.disableLike;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>