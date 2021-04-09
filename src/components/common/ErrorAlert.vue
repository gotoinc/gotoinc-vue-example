<template>
  <div>
    <v-alert v-if="data" dense type="error" class="mb-0">
      {{ data }}
    </v-alert>
    <template v-if="dataArray">
      <v-alert
        :key="err"
        v-for="err in dataArray"
        dense
        type="error"
        class="mb-0"
      >
        {{ err }}
      </v-alert>
    </template>
  </div>
</template>

<script>
export default {
  name: "ErrorAlert",
  props: {
    data: {
      type: String
    },
    dataArray: {
      type: Array
    }
  }
};
</script>
