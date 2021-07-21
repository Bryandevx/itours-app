<template>
  <div>
    <main-header></main-header>
    <v-container class="d-flex flex-column">
      <v-container fluid>
        <v-card elevation="0">
          <v-card-title>
            <h1>{{ tour.tour_name.toUpperCase() }}</h1>
          </v-card-title>
        </v-card>
      </v-container>

      <carousel-tour-details :items="this.tour.images"></carousel-tour-details>
    </v-container>

    <v-container class="d-flex flex-wrap justify-space-between">
      <v-card width="600">
        <v-card-title> About this activity </v-card-title>
        <v-card-text>
          <v-list rounded>
            <v-subheader><h3>About this activity</h3></v-subheader>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large>mdi-bookmark-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Include</v-list-item-title>
                  <v-list-item-subtitle>{{
                    tour.include
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon large>mdi-file-document</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Full Description</v-list-item-title>
                  <v-list-item-subtitle>{{
                    tour.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon large> mdi-clock-alert-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Duration 3 hours</v-list-item-title>
                  <v-list-item-subtitle
                    >Stating time 6:00am</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon large> mdi-bus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Pickup included</v-list-item-title>
                  <v-list-item-subtitle
                    >Pickup is available on this tour</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon large> mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Group</v-list-item-title>
                  <v-list-item-subtitle
                    > {{tour.quota}} people allowed in this tour</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card
        v-if="this.$session.exists()"
        class="d-flex align-content-space-around flex-column"
        width="400"
        height="300"
      >
        <v-card-title> Tickets Amount </v-card-title>

        <v-card-text class="d-flex flex-column">
          <v-row class="d-flex justify-center align-center">
            <v-btn @click="decreaseTickets" color="white" fab medium dark>
              <v-icon color="red">mdi-minus</v-icon>
            </v-btn>

            <v-text-field
              v-model="form.spaces"
              readonly
              type="number"
              class="centered-input text--darken-3 mt-3 shrink"
              style="width: 200px"
            >
            </v-text-field>

            <v-btn @click="increaseTickets" color="white" fab medium dark>
              <v-icon color="red">mdi-plus</v-icon>
            </v-btn>
          </v-row>

          <v-row class="d-flex flex-column">
            <v-card-title> Price breakdown </v-card-title>

            <div class="d-flex justify-space-around">
              <p class="font-weight-bold">
                {{ form.spaces }} Tickets x ${{ this.tour.price_per_person }}
              </p>
              <h4>Total: ${{ form.final_price }}</h4>
            </div>
          </v-row>

          <v-row class="d-flex align-end mt-8">
            <v-btn @click="addReservation" large color="success"
              >Add to Cart</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <h2>Tour Reviews</h2>

      <comments :tour_id="this.id"></comments>
    </v-container>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import axios from "axios";
import CarouselTourDetails from "../components/CarouselTourDetails.vue";
import Comments from "./Comments.vue";
export default {
  name: "TourDetails",
  props: {
    id: String,
  },
  components: { MainHeader, CarouselTourDetails, Comments },
  data() {
    return {
      tour: {},
      ratings: [],
      images: [],
      error: false,

      form: {
        tour_id: this.id,
        user_id: this.$session.get("user_id"),
        spaces: 0,
        status: 0,
        final_price: 0,
      },
    };
  },
  async mounted() {
    await axios.get(`http://127.0.0.1:8000/api/tours/${this.id}`).then(
      (response) => {
        console.log(response.data.data[0]);
        this.tour = response.data.data[0];
        console.log("showing stored rating below");
        console.log(this.tour.images);
        this.ratings = this.tour.ratings;
        console.log(this.ratings);
        // this.images = this.tour.images
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    increaseTickets() {
      this.form.spaces += 1;
      this.calcTotal();
    },
    decreaseTickets() {
      this.form.spaces -= 1;
      this.calcTotal();
    },

    calcTotal() {
      this.form.final_price = this.tour.price_per_person * this.form.spaces;
    },

    addReservation() {
      console.log("here adding reserv!");
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      axios({
        url: "http://127.0.0.1:8000/api/reservations",
        data: this.form,
        method: "POST",
        config: config,
      })
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "Cart",
          });
        })
        .catch(({ error }) => {
          this.error = true;
        });
    },
  },
  computed: {

    getSpaces() {
      return this.form.spaces;
    },
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>