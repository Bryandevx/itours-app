<template>
  <v-card class="mx-auto mt-16" max-width="400" elevation="10">
    <div v-if="error">
      <v-alert dense outlined type="error">
        Wrong <strong>email</strong> or <strong>password</strong>, please try again
      </v-alert>
    </div>

    <v-card-text>
      <v-card-title class="d-flex justify-center">
        <v-img src="../assets/profile.png" width="150" height="100"></v-img>
      </v-card-title>
      <v-text-field
        v-model="form.email"
        append-icon="mdi-account"
        :error-messages="emailErrors"
        label="Email"
        required
        @input="$v.form.email.$touch()"
      ></v-text-field>

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
      <v-btn @click="submit" text color="purple accent-4"> Log in </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import { countries } from "../db/countries";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    form: {
      email: { required, email },
      password: {},
    },
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      //some data used for password ui
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      error: false,
    };
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.required && errors.push("Email is required");

      !this.$v.form.email.email && errors.push("Email format invalid");

      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      return errors;
    },
  },

  beforeCreate: function () {
    if (!this.$session.exists()) {
      //incluir dentro de la validacion tipo de usuario ya sea cliente o admin
      console.log("ok");
    } else {
      this.$router.push("/");
    }
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
      axios({
        url: "http://127.0.0.1:8000/api/users/login",
        data: this.form,
        method: "POST",
        config: config,
      })
        .then(({ data }) => {
          console.log(data);

          this.$session.start();
          this.$session.set("jwt", data.token);
          this.$session.set("user_email", data.user.email);
          this.$session.set("user_name", data.user.name);
          this.$session.set("user_id", data.user.id);
          this.$session.set("is_admin", data.user.is_admin);
          this.$router.push("/");
        })
        .catch(({ error }) => {
          this.error = true;
        });

      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
    },
  },
};
</script>