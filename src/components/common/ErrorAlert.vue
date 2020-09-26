<template>
  <v-alert dense type="error" class="mb-0">
      {{ data }}
  </v-alert>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    data: {
      type: String
    }
  }
}
</script>