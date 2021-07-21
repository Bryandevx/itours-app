<template>
  <v-container>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-sheet v-show="item.text" height="100%" color="rgb(0, 0, 0,0.4)">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ item.text }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import store from "../assets/home";
import { imgs } from "../db/store";
export default {
  name: "Carousel",
  components: {},
  props: {
    data: Object,
    required: false,
    default: null,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    console.log(this.data);
    this.appendItems();
  },
  methods: {
    getTourImgs() {
      console.log(data);

    },
    appendItems() {
      if (!this.data) {
        this.items = store.items;   
        console.log(this.items);
        return;
      }
      this.getTourImgs();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>