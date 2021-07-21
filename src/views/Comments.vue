<template>
  <div>
    <v-container v-if="this.ratings.length === 0">
      <h3>This tour dont have any reviews yet</h3>
    </v-container>
    <div v-else>
      <v-col v-for="(rating, index) in ratings" :key="index">
        <v-card>
          <v-card-title>
            {{ rating.name }}
          </v-card-title>
          <v-card-text>
            <h4>{{ rating.review }}</h4>

            <div>
              <v-rating
                :value="rating.score"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </div>

    <v-container v-if="this.$session.exists()">
      <v-card>
        <v-card-title> Post a comment </v-card-title>
        <v-card-text>
          <div>
            <v-rating
              v-model="form.score"
              color="amber"
              dense
              half-increments
              size="14"
            ></v-rating>
          </div>
          <div>
            <v-text-field
              v-model="form.review"
              counter
              maxlength="100"
              label="Post a review about this tour!"
            ></v-text-field>
          </div>
          <div class="mt-3">
            <v-btn @click="submit" large color="success">Post</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container >
    <v-container v-else>
      <v-card>
        <v-text>Please log in to post a comment</v-text>
      </v-card>
    </v-container>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Comments",
  props: {
    tour_id: {
      required: true,
    },
  },
  data() {
    return {
      form: {
        user_id: this.$session.get("user_id"),
        tour_id: this.tour_id,
        score: 1,
        review: "",
      },
      ratings: [],
    };
  },
  async mounted() {
      await this.getRatings();
  },
  methods: {
   async submit() {
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
     await axios({
        url: "http://127.0.0.1:8000/api/ratings",
        data: this.form,
        method: "POST",
        config: config,
      }).then(({ data }) => {
        console.log(data);
      });

      await this.getRatings();
      this.clearInputs();
    },

    async getRatings() {
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      await axios({
        url: `http://127.0.0.1:8000/api/ratings/tourRatings/${this.tour_id}`,
        data: this.form,
        method: "GET",
        config: config,
      }).then(({ data }) => {
        console.log(data);
        this.ratings = data.data;
        console.log("here at ratings!!!");
        console.log(this.ratings);
      });
    },

    clearInputs(){
        this.form.score = 1;
        this.form.review = "";
    }
  },
};
</script>

<style scoped>
</style>