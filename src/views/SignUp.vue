<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-text>
      <v-card-title class="d-flex justify-center">
        <v-img src="../assets/profile.png" width="150" height="100"></v-img>
      </v-card-title>
      <v-text-field
        v-model="form.name"
        :error-messages="nameErrors"
        label="Name"
        required
        @input="$v.form.name.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="form.last_name"
        :error-messages="lastNameErrors"
        label="Last Name"
        required
        @input="$v.form.last_name.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="form.email"
        :error-messages="emailErrors"
        label="Email"
        required
        @input="$v.form.email.$touch()"
      ></v-text-field>

      <v-select
        v-model="form.country"
        :items="countries"
        label="Country"
        required
      ></v-select>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.birth_date"
            label="Birth date"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="form.birth_date"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
        ></v-date-picker>
      </v-menu>

      <v-text-field
        v-model="form.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="passwordErrors"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        counter
        @input="$v.form.password.$touch()"
        @click:append="show1 = !show1"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit" text color="purple accent-4"> SIGN UP</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import { countries } from "../db/countries";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  sameAs,
  helpers,
} from "vuelidate/lib/validators";
import axios from "axios";

const passwordRegex = helpers.regex(
  "passwordRegex",
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
);

export default {
  mixins: [validationMixin],

  validations: {
    form: {
      name: { required, maxLength: maxLength(10) },
      last_name: { required, maxLength: maxLength(10) },
      email: { required, email },
      password: { required, passwordRegex },
    },
  },

  data() {
    return {
      form: {
        name: "",
        last_name: "",
        country: "",
        birth_date: "",
        email: "",
        password: "",
        is_admin: 0,
      },
      menu: false,
      countries: [],
      //some data used for password ui
      show1: false,
      show2: true,
      show3: false,
      show4: false,
    };
  },

  mounted() {
    let country;
    for (country in countries) {
      this.countries.push(countries[country].name);
    }
  },

  computed: {
    idErrors() {
      const errors = [];
      return errors;
    },

    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.maxLength &&
        errors.push("Name must be at most 10 characters long");

      !this.$v.form.name.required && errors.push("Name is required.");
      return errors;
    },

    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.last_name.$dirty) return errors;

      !this.$v.form.last_name.maxLength &&
        errors.push("Last name must be at most 10 characters long");

      !this.$v.form.last_name.required && errors.push("Last name is required.");

      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.required && errors.push("Email is required");

      !this.$v.form.email.email && errors.push("Email format invalid");

      return errors;
    },

    birthDateErros() {
      const errors = [];
      if (!this.$v.form.birth_date.$dirty) return errors;

      !this.$v.form.birth_date && errors.push("Birth Date is required");

      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;

      !this.$v.form.password.required && errors.push("Password is required");

      !this.$v.form.password.passwordRegex &&
        errors.push("Password must contan format");

      return errors;
    },
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
        url: "http://127.0.0.1:8000/api/users",
        data: this.form,
        method: "POST",
        config: config,
      })
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "Login",
          });
        })
        .catch(({ error }) => {
          alert("something went wrong");
        });
    },

    clear() {
      this.$v.$reset();
    },
  },
};
</script>