<template>
  <div>
    <main-header></main-header>

    <v-container class="d-flex flex-wrap justify-space-between">
      <v-container>
        <v-card
          class=""
          v-for="(res, index) in form.reservations"
          :key="index"
          width="700"
        >
          <v-card-title
            ><h5>Item# {{ index + 1 }}</h5></v-card-title
          >

          <v-card-text>
            <v-container class="d-flex justify-space-around flex-wrap">
              <div class="d-flex">
                <div>
                  <v-img
                    height="90"
                    width="150"
                    src="https://i.imgur.com/mDXV34E.png"
                  >
                  </v-img>
                </div>
                <div class="d-flex-column ml-3">
                  <h2>{{ res.tour_name }}</h2>
                  <h2>{{ res.spaces }} tickets</h2>
                </div>
              </div>

              <div class="d-flex-column justify-center align-center">
                <h2>${{ res.final_price }}</h2>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-container>

      <v-card width="900" height="275">
        <v-card-title class="d-flex">Confirm Payment</v-card-title>

        <v-card-text>
          <h4>Items in cart total: ${{ non_total }}</h4>
          <h4>Taxes: ${{ non_total * 0.05 }}</h4>
          <span>5% from items in cart total</span>
        </v-card-text>

        <v-card-text>
          <v-row class="d-flex justify-space-between">
            <div class="d-flex flex-column">
              <v-btn @click="confirmPayment" color="success"
                >Confirm Payment</v-btn
              >
              <v-btn @click="emptyCard" class="mt-3" color="error"
                >Empty Cart</v-btn
              >
            </div>

            <div class="d-flex justify-center align-center">
              <h2>Total Bill: ${{ this.form.total }}</h2>
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container class="d-flex justify-space-around"> </v-container>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import axios from "axios";

export default {
  components: { MainHeader },
  name: "Cart",
  data() {
    return {
      form: {
        reservations: [],
        total: 0,
      },
      non_total: 0,
      isAlertActive: false,
    };
  },
  beforeCreate: function () {
    if (this.$session.exists() && !this.$session.get("is_admin")) {
      //incluir dentro de la validacion tipo de usuario ya sea cliente o admin
      console.log("ok");
    } else {
      this.$router.push("/");
    }
  },
  async mounted() {
    await this.getAllReservations();
    this.calcTotal();
    this.calcNonTotal();
  },
  methods: {
    async getAllReservations() {
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      await axios({
        url: `http://127.0.0.1:8000/api/reservations/byCustomerId/${this.$session.get(
          "user_id"
        )}`,
        data: this.form,
        method: "GET",
        config: config,
      }).then(({ data }) => {
        console.log(data);
        this.form.reservations = data;
        console.log(this.reservations);
      });
    },
    removeItem() {
      console.log("removed");
    },
    async confirmPayment() {
      console.log(this.reservations);

      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      await axios({
        url: "http://127.0.0.1:8000/api/reservations/payCart",
        data: this.form,
        method: "POST",
        config: config,
      }).then(({ data }) => {
        console.log(data);
        this.$router.push({
          name: "Home",
          params: { isAlertActive: true },
        });
      });
    },

    async emptyCard() {
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      await axios({
        url: `http://127.0.0.1:8000/api/reservations/deleteAll/${this.$session.get(
          "user_id"
        )}`,
        // data: myForm,
        method: "DELETE",
        config: config,
      }).then(({ data }) => {
        console.log(data);
        this.$router.push({
          name: "Home",
        });
      });

      await this.getAllReservations();
    },
    calcTotal() {
      for (let i = 0; i < this.form.reservations.length; i++) {
        this.form.total += this.form.reservations[i].final_price;
      }
      this.form.total += this.form.total * 0.05;
    },
    calcNonTotal() {
      for (let i = 0; i < this.form.reservations.length; i++) {
        this.non_total += this.form.reservations[i].final_price;
      }
    },
  },
  computed: {
    getTotalPrice() {},
  },
};
</script>

<style lang="scss" scoped>
</style>