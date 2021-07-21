<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col
        v-for="(destination, index) in destinations"
        :key="index"
        class="d-flex child-flex"
        cols="4"
      >
        <router-link
          :to="{
            name: 'CategoryTours',
            params: {
              category: destination.name,
            },
          }"
        >
          <v-img
            :src="destination.img"
            aspect-ratio="1"
            class="grey lighten-2"
            max-height="225"
          >
            <v-row class="fill-height" align="center" justify="center">
              <span class="text-md-body-1 white--text">{{
                destination.name
              }}</span>
            </v-row>
          </v-img>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {locations} from "../db/store";
export default {
  name: "TourGallery",
  components: {},

  data() {
    return {
      destinations: locations,
    };
  },
  mounted() {
    console.log(this.tours);
  },
};
</script>

<style lang="scss" scoped>
</style>