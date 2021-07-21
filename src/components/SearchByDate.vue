<template>
  <div>
    <v-container>
      <v-card class="card-date" width="600">
        <v-card-title>Enter your dates to find available tours</v-card-title>
        <v-row class="justify-space-around">
          <v-col cols="12" sm="6" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="start_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start_date"
                  label="Tour Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="start_date"
                no-title
                scrollable
                :allowed-dates="StartDateDisablePastDates"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(start_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>

            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="end_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="end_date"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="end_date"
                no-title
                scrollable
                :allowed-dates="EndDateDisablePastDates"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(end_date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-btn
              text
              color="deep-purple"
              :to="{
                name: 'DateTours',
                params: {
                  start_date: this.start_date,
                  end_date: this.end_date,
                },
              }"
            >
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SearchByDate",
  data() {
    return {
      start_date: new Date().toISOString().substr(0, 10),
      end_date: "",
      menu: false,
      menu2: false,
    };
  },
  methods: {
    StartDateDisablePastDates(val) {
      console.log(new Date().toISOString().substr(0, 10));
      return val >= new Date().toISOString().substr(0, 10);
    },
    EndDateDisablePastDates(val) {
      return val >= this.start_date;
    },
  },

  computed: {},
};
</script>


