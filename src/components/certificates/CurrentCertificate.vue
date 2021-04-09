<template>
  <v-col>
    <v-card class="mx-auto cert" max-width="600" color="#1F7087">
      <v-card-title>{{ $t("currentcertIsValid") }}</v-card-title>

      <v-card-subtitle class="pb-0">
        {{ $t("validTo") }}: {{ expire_at }}
      </v-card-subtitle>
      <v-card-actions>
        <!-- <v-btn
          color="orange"
        >
          {{ $t('update') }}
        </v-btn> -->
      </v-card-actions>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "current-certificate",
  data() {
    return {
      expire_at: ""
    };
  },
  computed: {
    ...mapState(["locale"])
  },
  created() {
    this.getCurrentCertificate();
  },
  methods: {
    getCurrentCertificate() {
      this.$store.dispatch("getCurrentCertificate").then(resp => {
        this.expire_at = moment(resp.data.expire_at)
          .lang(this.locale)
          .format("LLL");
      });
    }
  },
  watch: {
    locale() {
      this.getCurrentCertificate();
    }
  }
};
</script>

<style lang="scss">
.cert {
  margin-top: 100px;
}
</style>
