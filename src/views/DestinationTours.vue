<template>
  <div>
    <v-row>
      <v-col
        v-for="(tour, index) in tours"
        :key="index"
        class=""
      >
        <tour-card :data="tour"></tour-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TourCard from "../components/TourCard.vue";
import {destinations} from "../db/store";

export default {
  name: "DestinationTours",
  components: {
    TourCard,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tours: [],
    };
  },
  mounted() {
    this.tours = this.findDestinationTours();
    console.log(this.slug);
  },
  methods: {
    findDestinationTours() {
      let tours = destinations.filter((tour) =>
        tour.slug.includes(this.slug)
      );
      return tours;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>