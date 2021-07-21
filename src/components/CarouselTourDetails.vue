<template>
  <v-container>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.url"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: "Carousel",
  components: {},
  props: {
    items: Array,
    required: true,
  },
  data() {
    return {
      //items: [],
    };
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>