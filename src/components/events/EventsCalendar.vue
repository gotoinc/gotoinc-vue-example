<template>
  <v-col :cols="10">
    <v-sheet height="64">
      <v-toolbar flat>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          {{ $t("today") }}
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
              <span>{{ $t(typeToLabel[type]) }}</span>
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>{{ $t("day") }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>{{ $t("week") }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>{{ $t("month") }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        :locale="locale"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color">
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom v-if="!selectedEvent.isParticipant">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :dark="$vuetify.theme.dark"
                  icon
                  v-bind="attrs"
                  @click="willAttend(selectedEvent.id)"
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
          </v-toolbar>
          <v-card-text class="black-color">
            <h3>{{ $t("description") }}</h3>
            <span dark v-html="selectedEvent.details"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              {{ $t("cancel") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-col>
</template>

<script>
import inPrimaryLocale from "../helpers/locales";
import { mapState } from "vuex";

export default {
  name: "events-list",
  data() {
    return {
      allEvents: [],
      focus: "",
      type: "month",
      typeToLabel: {
        month: "month",
        week: "week",
        day: "day"
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1"
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party"
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getAllEvents").then(resp => {
      this.allEvents = resp.data.data.map(user => {
        let tmp = { ...user.attributes };
        tmp.name = inPrimaryLocale(tmp.name);
        tmp.description = inPrimaryLocale(tmp.description);
        return tmp;
      });
      let calendarEvents = [];
      this.allEvents.forEach(event => {
        calendarEvents.push({
          id: event.id,
          name: event.name,
          details: event.description,
          isParticipant:
            event.users.findIndex(({ data }) => data.id == this.user.id) !== -1,
          start: event.booking
            ? new Date(event.booking.date_from)
            : new Date(event.date),
          end: event.booking
            ? new Date(event.booking.date_to)
            : new Date(event.date),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !!event.booking
        });
      });
      this.events = calendarEvents;
    }),
      this.$refs.calendar.checkChange();
  },
  computed: {
    ...mapState(["locale", "user"])
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    async willAttend(eventId) {
      try {
        let response = await this.$store.dispatch("willAttend", eventId);
        const eventIndex = this.events.findIndex(
          ({ id }) => id == response.data.data.id
        );
        console.log(eventIndex);
        this.events[eventIndex].isParticipant = true;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss">
.black-color {
  color: #000 !important;
}
</style>
