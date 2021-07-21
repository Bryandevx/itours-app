<template>
  <div>
    <v-container>
      <v-spacer></v-spacer>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn
            x-large
            text
            color="deep-purple"
            :to="{
              name: 'Home',
            }"
          >
            Go Back
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-spacer></v-spacer>
      <v-row>
        <v-col class="d-flex justify-center">
          <div v-if="error">
            <v-alert dense outlined type="error">
              Something went wrong, verify the tour information and try again.
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-spacer></v-spacer>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-card width="700">
            <v-card-title class="card-title">
              Experience information</v-card-title
            >

            <v-card-text class="mt-8">
              <v-text-field
                v-model="form.tour_name"
                label="Tour Name"
                required
                @input="$v.form.tour_name.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="form.description"
                label="Description"
              ></v-text-field>

              <v-text-field
                v-model="form.indications"
                label="Indications"
              ></v-text-field>

              <v-menu
                ref="start_date_menu"
                v-model="start_date_menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.start_date"
                    label="Start Date"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="form.start_date"
                  :allowed-dates="StartDateDisablePastDates"
                ></v-date-picker>
              </v-menu>

              <v-menu
                ref="end_date_menu"
                v-model="end_date_menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.end_date"
                    label="End Date"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="form.end_date"
                  :allowed-dates="EndDateDisablePastDates"
                ></v-date-picker>
              </v-menu>

              <v-menu
                ref="time_menu"
                v-model="time_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time_menu"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.start_time"
                    label="Start time"
                    append-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="form.start_time"
                  full-width
                ></v-time-picker>
              </v-menu>

              <!------------------------------->

              <v-select
                v-model="form.country"
                :items="countries"
                label="Country"
                required
              ></v-select>

              <v-text-field
                v-model="form.duration"
                label="Duration"
              ></v-text-field>

              <v-text-field
                v-model="form.price_per_person"
                type="number"
                label="Price per person"
              ></v-text-field>

              <v-text-field
                type="number"
                v-model="form.quota"
                label="Max Quota"
              ></v-text-field>

              <v-text-field
                v-model="form.include"
                label="Includes"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="d-flex justify-center">
      <v-card width="700">
        <v-card-title class="card-title">Categories</v-card-title>
        <v-card-text>
          <p>{{ categories.length }}</p>
          <div v-for="(category, index) in loadCategories" v-bind:key="index">
            <v-checkbox
              v-model="categories"
              :label="category.name"
              :value="category.id"
            ></v-checkbox>
          </div>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-card width="700">
            <v-card-title class="card-title">Upload Tour Images</v-card-title>
            <v-card-text class="mt-8">
              <VueFileAgent v-model="fileRecords"></VueFileAgent>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="mt-3 mb-5 text-center">
      <v-btn :disabled="checkArrays" @click="submit" id="save-btn" x-large dark>
        Save Tour
        <v-icon class="ml-2"> mdi-cloud-upload </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { countries } from "../../db/countries";
import _ from "lodash";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  sameAs,
  helpers,
} from "vuelidate/lib/validators";

export default {
  name: "CreateTours",
  mixins: [validationMixin],

  validations: {
    form: {
      tour_name: { required },
      indications: { required },
      start_date: { required },
      end_date: { required },
      description: { required },
      price_per_person: { required },
      duration: { required },
      start_time: { required },
      include: { required },
    },
  },

  components: {},
  name: "CreateTour",
  validations: {
    form: {},
  },
  data() {
    return {
      form: {
        tour_name: "",
        slug: "",
        stars: 0,
        indications: "",
        country: "",
        start_date: "",
        end_date: "",
        description: "",
        price_per_person: 0,
        quota: 0,
        duration: "",
        start_time: "",
        include: "",
        images: [],
      },

      categories: [],
      loadCategories: [],
      start_date_menu: false,
      end_date_menu: false,
      time_menu: false,
      countries: [],
      fileRecords: [],
      selected: [],
      error: false,
    };
  },
  beforeCreate: function () {
    if (this.$session.exists() && this.$session.get("is_admin") === 1) {
      //incluir dentro de la validacion tipo de usuario ya sea cliente o admin
      console.log("ok");
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    let country;
    for (country in countries) {
      this.countries.push(countries[country].name);
    }
    this.getCategories();
  },
  methods: {
    submit() {
      this.appendTourImages();
      this.createSlug();
      console.log(this.form.images);
      console.log(typeof this.form.categories);
      console.log(this.form.categories);

      let formData = new FormData();

      for (var i = 0; i < this.fileRecords.length; i++) {
        let file = this.fileRecords[i].file;
        formData.append("files[" + i + "]", file);
      }

      for (var i = 0; i < this.categories.length; i++) {
        let category = this.categories[i];
        formData.append("categories[" + i + "]", category);
      }

      _.each(this.form, (value, key) => {
        formData.append(key, value);
      });

      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      };
      axios({
        url: "http://127.0.0.1:8000/api/tours",
        data: formData,
        method: "POST",
        config: config,
      })
        .then(({ data }) => {
          console.log("new data!!@21");
          console.log(data);
          this.$router.push({
            name: "ListTours",
            params: { isAlertActive: true },
          });
        })
        .catch(({ error }) => {
          console.log("catched error");
          this.error = true;
        });
    },

    StartDateDisablePastDates(val) {
      console.log(new Date().toISOString().substr(0, 10));
      return val >= new Date().toISOString().substr(0, 10);
    },
    EndDateDisablePastDates(val) {
      return val >= this.form.start_date;
    },

    async getCategories() {
      this.loadCategories = await axios
        .get("http://127.0.0.1:8000/api/categories")
        .then(({ data }) => {
          return data.data;
        });
      console.log(this.loadCategories);
    },

    appendTourImages() {
      for (let i = 0; i < this.fileRecords.length; i++) {
        this.form.images.push(this.fileRecords[i].file);
      }
    },

    check() {
      this.appendTourImages();
      this.createSlug();
      console.log(this.form.images);
    },

    createSlug() {
      this.form.slug = this.form.tour_name.replace(/\s/g, "-"); //cambiar esto por un computed que retorne el nombre
      console.log(this.form.slug);
    },
  },
  computed: {
    TourNameErrors() {},

    IndicationsErrors() {
      const errors = [];
      if (!this.$v.form.indications.$dirty) return errors;

      !this.$v.form.indications.required &&
        errors.push("Indications is required");

      return errors;
    },

    StartDateErrors() {
      const errors = [];
      if (!this.$v.form.start_date.$dirty) return errors;

      !this.$v.form.start_date.required &&
        errors.push("Start date is required");

      return errors;
    },

    EndDateErrors() {
      const errors = [];
      if (!this.$v.form.end_date.$dirty) return errors;

      !this.$v.form.end_date.required && errors.push("End date is required");

      return errors;
    },

    DescriptionErrors() {
      const errors = [];
      if (!this.$v.form.description.$dirty) return errors;

      !this.$v.form.description.required &&
        errors.push("Description is required");

      return errors;
    },

    PricePerPersonErros() {
      const errors = [];
      if (!this.$v.form.price_per_person.$dirty) return errors;

      !this.$v.form.price_per_person.required &&
        errors.push("Price per person is required");

      return errors;
    },

    DurationErrors() {
      const errors = [];
      if (!this.$v.form.duration.$dirty) return errors;

      !this.$v.form.duration.required && errors.push("Duration is required");

      return errors;
    },

    StartTimeErrors() {
      const errors = [];
      if (!this.$v.form.start_time.$dirty) return errors;

      !this.$v.form.start_time.required &&
        errors.push("Start time is required");

      return errors;
    },

    IncludeErrors() {
      const errors = [];
      if (!this.$v.form.include.$dirty) return errors;

      !this.$v.form.include.required && errors.push("Include is required");

      return errors;
    },

    checkArrays() {
      if (this.categories.length < 1 || this.fileRecords.length < 1) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.card-title {
  background: #821f94;
  color: white;
}
#save-btn {
  background: #a438b6;
  width: 400px;
}
</style>