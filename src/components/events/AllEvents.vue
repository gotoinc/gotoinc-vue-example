<template>
  <v-col>
    <v-row>
      <v-col :cols="12" class="m-0">
        <v-row class="m-0">
          <v-col :cols="6">
            <v-text-field
              :label="$t('searchPhrase')"
              hide-details="auto"
              v-model="search"
            ></v-text-field>
          </v-col>
          <v-col :cols="4">
            <v-select
              :label="$t('university')"
              hide-details="auto"
              :items="universities"
              item-text="name"
              item-value="id"
              v-model="university_id"
            ></v-select>
          </v-col>
          <v-col :cols="2">
            <v-btn color="primary mt-3" @click="searchEvents">
              {{ $t("search") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="4" :key="event.id" v-for="event in events">
        <v-card :loading="loading" class="mx-auto " max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-card-title>
            {{ event.name }}
            <v-spacer></v-spacer>
            <v-tooltip bottom v-if="!event.isParticipant">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :dark="$vuetify.theme.dark"
                  icon
                  v-bind="attrs"
                  @click="willAttend(event.id)"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("willAttend") }}</span>
            </v-tooltip>
            <v-tooltip bottom v-else>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :dark="$vuetify.theme.dark"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("willAttend") }}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="isGroupAdmin">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :dark="$vuetify.theme.dark"
                  icon
                  v-bind="attrs"
                  @click="cancelEvent(event.id)"
                  v-on="on"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("cancelEvent") }}</span>
            </v-tooltip>
          </v-card-title>

          <v-card-text v-if="event.building && event.booking">
            <v-row align="center" class="mx-0">
              <div class="grey--text">
                {{ event.date }}
              </div>
            </v-row>
            <v-chip-group>
              <v-chip>
                {{ event.booking.date_from_locale }}
              </v-chip>
              <v-divider class="mt-5 mr-2"></v-divider>
              <v-chip>
                {{ event.booking.date_to_locale }}
              </v-chip>
            </v-chip-group>

            <div class="my-4 subtitle-1">
              {{ $t("totalParticipants") }} - {{ event.total_participants }}
            </div>

            <div class="my-4 subtitle-1">
              {{ event.building.name_locale }} -
              {{ event.building.location_locale }}
            </div>

            <div></div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="orange lighten-2" text>
              {{ $t("description") }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="event.show = !event.show">
              <v-icon>{{
                event.show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="event.show">
              <v-divider></v-divider>

              <v-card-text>
                {{ event.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import inPrimaryLocale from "../helpers/locales";
import moment from "moment";
import { mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    events: [],
    university_id: "",
    search: ""
  }),
  created() {
    this.$store.dispatch("getUniversities");
    this.initialize();
  },
  methods: {
    initialize() {
      this.$store.dispatch("getAllEvents").then(resp => {
        this.events = this.transformData(resp.data.data);
      });
    },
    searchEvents() {
      this.events = [];
      this.$store
        .dispatch("searchEvents", {
          s: this.search,
          university_id: this.university_id
        })
        .then(resp => {
          this.$set(this, "events", this.transformData(resp.data.data));
        });
    },
    transformData(events) {
      return events.map(user => {
        let tmp = user.attributes ? { ...user.attributes } : { ...user };
        tmp.show = false;
        tmp.isParticipant =
          tmp.users.findIndex(({ data }) => data.id == this.user.id) !== -1;
        tmp.name = inPrimaryLocale(tmp.name);
        tmp.description = inPrimaryLocale(tmp.description);

        if (tmp.building) {
          tmp.building.name_locale = inPrimaryLocale(tmp.building.name);
          tmp.building.location_locale = inPrimaryLocale(tmp.building.location);

          tmp.booking.date_from_locale = moment(tmp.booking.date_from)
            .lang(this.locale)
            .format("LT");
          tmp.booking.date_to_locale = moment(tmp.booking.date_to)
            .lang(this.locale)
            .format("LT");
        }
        return tmp;
      });
    },
    async willAttend(eventId) {
      try {
        let response = await this.$store.dispatch("willAttend", eventId);
        const eventIndex = this.events.findIndex(
          ({ id }) => id == response.data.data.id
        );
        let transformedEvent = this.transformData([response.data.data])[0];
        this.$set(this.events, eventIndex, transformedEvent);
        console.log(this.events);
      } catch {}
    },
    cancelEvent(eventId) {
      this.$store.dispatch("deleteEvent", eventId).then(() => {
        const index = this.events.findIndex(({ id }) => id == eventId);
        this.events.splice(index, 1);
      });
    }
  },
  computed: {
    ...mapState(["locale", "universities", "user"]),
    ...mapGetters(["isGroupAdmin"])
  },
  watch: {
    locale() {
      this.events = this.transformData(this.events);
      this.searchEvents();
    }
  }
};
</script>
