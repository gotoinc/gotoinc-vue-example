<template>
  <v-col :cols="6">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>{{ $t("createBuilding") }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            :label="$t('name')"
            name="name"
            prepend-icon="mdi-rename-box"
            type="text"
            v-model="form.name"
            @input="$v.form.name.$touch()"
            :class="{ 'clr-error': $v.form.name.$error }"
            :error-messages="nameError($v.form.name)"
          ></v-text-field>
          <v-text-field
            :label="$t('description')"
            name="description"
            prepend-icon="mdi-card-text-outline"
            type="text"
            v-model="form.description"
            @input="$v.form.description.$touch()"
            :class="{ 'clr-error': $v.form.description.$error }"
            :error-messages="descriptionError($v.form.description)"
          ></v-text-field>
          <v-text-field
            :label="$t('location')"
            name="location"
            prepend-icon="mdi-map-marker"
            type="text"
            v-model="form.location"
            @input="$v.form.location.$touch()"
            :class="{ 'clr-error': $v.form.location.$error }"
            :error-messages="locationError($v.form.location)"
          ></v-text-field>
          <v-text-field
            :label="`${$t('area')} ${locale === 'en' ? 'ft²' : 'm²'}`"
            name="area"
            prepend-icon="mdi-account"
            type="number"
            v-model="form.area"
            @input="$v.form.area.$touch()"
            :class="{ 'clr-error': $v.form.area.$error }"
            :error-messages="areaError($v.form.area)"
          ></v-text-field>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                :label="$t('latitude')"
                name="lat"
                prepend-icon="mdi-crosshairs"
                type="number"
                v-model="form.lat"
                @input="$v.form.lat.$touch()"
                :class="{ 'clr-error': $v.form.lat.$error }"
                :error-messages="latError($v.form.lat)"
              ></v-text-field>
            </v-col>
            <v-col :cols="6">
              <v-text-field
                :label="$t('longtitude')"
                name="lon"
                prepend-icon="mdi-crosshairs-gps"
                type="number"
                v-model="form.lon"
                @input="$v.form.lon.$touch()"
                :class="{ 'clr-error': $v.form.lon.$error }"
                :error-messages="lonError($v.form.lon)"
              ></v-text-field>
            </v-col>
            <v-col :cols="6">
              <h2>{{ $t("startTime") }}:</h2>
              <v-time-picker
                v-model="form.startTime"
                full-width
                :format="locale === 'en' ? 'ampm' : '24hr'"
                @input="$v.form.startTime.$touch()"
                :allowed-minutes="[0]"
              ></v-time-picker>
              <span v-if="$v.form.startTime.$error" class="error-time">
                {{ startTimeError($v.form.startTime) }}
              </span>
            </v-col>
            <v-col :cols="6">
              <h2>{{ $t("endTime") }}:</h2>
              <v-time-picker
                v-model="form.endTime"
                full-width
                :format="locale === 'en' ? 'ampm' : '24hr'"
                @input="$v.form.endTime.$touch()"
                :allowed-minutes="[0]"
              ></v-time-picker>
              <span v-if="$v.form.endTime.$error" class="error-time">
                {{ endTimeError($v.form.endTime) }}
              </span>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <ErrorAlert v-if="errors.length" :dataArray="errors"> </ErrorAlert>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.prevent="createBuilding($v)">{{
          $t("create")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
//import { mapActions } from 'vuex'
import ErrorAlert from "@/components/common/ErrorAlert";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapGetters, mapState } from "vuex";
import { translateText } from "../../components/helpers/locales.js";
import moment from "moment";

export default {
  name: "add-building",
  components: {
    ErrorAlert
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        location: "",
        area: 0,
        lat: 0,
        lon: 0,
        startTime: "",
        endTime: ""
      },
      errors: ""
    };
  },
  computed: {
    ...mapState(["locale"]),
    ...mapGetters(["university"])
  },
  validations: {
    form: {
      name: { required, minLength: minLength(3) },
      description: { required, minLength: minLength(10) },
      location: { required, minLength: minLength(5) },
      area: { required },
      lat: { required },
      lon: { required },
      startTime: { required },
      endTime: { required }
    }
  },
  methods: {
    range(start, end) {
      return Array(end - start)
        .fill()
        .map((_, idx) => start + idx);
    },
    createBuilding(validation) {
      this.$v.$touch();

      if (validation.$invalid) {
        return false;
      }

      const timeFrom = +this.form.startTime.split(":")[0];
      const endTime = +this.form.endTime.split(":")[0];
      const availbaleTime = this.range(timeFrom, endTime);

      const formData = {
        available_time: JSON.stringify({
          mon: availbaleTime,
          tue: availbaleTime,
          wed: availbaleTime,
          thu: availbaleTime,
          fri: availbaleTime,
          sat: availbaleTime,
          sun: availbaleTime
        }),
        lat: this.form.lat,
        lon: this.form.lon,
        area: this.form.area
      };

      const translateName = translateText(this.form.name).then(
        translated => (formData.name = translated)
      );
      const translateDescription = translateText(this.form.description).then(
        translated => (formData.description = translated)
      );
      const translateLocation = translateText(this.form.location).then(
        translated => (formData.location = translated)
      );

      Promise.all([
        translateName,
        translateDescription,
        translateLocation
      ]).then(() => {
        this.$store
          .dispatch("createBuilding", formData)
          .then(() => this.$router.push("/buildings/list"))
          .catch(err => {
            this.errors = err.response.data.error.message.split(",");
          });
        console.log("done", formData);
      });
    },
    nameError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Name is required";
      } else if (!field.minLength) {
        return "Name is too short";
      } else {
        return [];
      }
    },
    descriptionError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Description is required";
      } else if (!field.minLength) {
        return "Description must be at least 10 symbols";
      } else {
        return [];
      }
    },
    locationError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Location is required";
      } else if (!field.minLength) {
        return "Location must be at least 10 symbols";
      } else {
        return [];
      }
    },
    areaError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Area is required";
      } else {
        return [];
      }
    },
    latError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Latitude is required";
      } else {
        return [];
      }
    },
    lonError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Latitude is required";
      } else {
        return [];
      }
    },
    startTimeError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Start time is required";
      } else {
        return [];
      }
    },
    endTimeError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "End time is required";
      } else {
        return [];
      }
    }
  }
};
</script>
