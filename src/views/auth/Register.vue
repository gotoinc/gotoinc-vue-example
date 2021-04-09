<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Sign up form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="form.email"
                    @input="$v.form.email.$touch()"
                    :class="{ 'clr-error': $v.form.email.$error }"
                    :error-messages="emailError($v.form.email)"
                  ></v-text-field>
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.name"
                    @input="$v.form.name.$touch()"
                    :class="{ 'clr-error': $v.form.name.$error }"
                    :error-messages="nameError($v.form.name)"
                  ></v-text-field>
                  <v-text-field
                    label="Last name"
                    name="last_name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.last_name"
                    @input="$v.form.last_name.$touch()"
                    :class="{ 'clr-error': $v.form.last_name.$error }"
                    :error-messages="lastNameError($v.form.last_name)"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.password"
                    @input="$v.form.password.$touch()"
                    :class="{ 'clr-error': $v.form.password.$error }"
                    :error-messages="passwordError($v.form.password)"
                  ></v-text-field>
                  <v-text-field
                    id="repeat-password"
                    label="Repeat password"
                    name="repeat-password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.repeatPassword"
                    @input="$v.form.repeatPassword.$touch()"
                    :class="{ 'clr-error': $v.form.repeatPassword.$error }"
                    :error-messages="
                      repeatPasswordError($v.form.repeatPassword)
                    "
                  ></v-text-field>
                  <v-select
                    v-model="form.group_id"
                    :items="groups"
                    label="Select Group"
                    item-text="name"
                    item-value="id"
                    @input="$v.form.group_id.$touch()"
                    :class="{ 'clr-error': $v.form.group_id.$error }"
                    :error-messages="groupError($v.form.group_id)"
                  >
                  </v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn link text to="/login">Sign in</v-btn>
                <v-btn link text to="/create-group">Create group</v-btn>
                <v-spacer></v-spacer>
                <ErrorAlert v-if="error.length" :data="error"> </ErrorAlert>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="register($v)"
                  >Sign up</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import { mapActions } from 'vuex'
import ErrorAlert from "@/components/common/ErrorAlert";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  components: {
    ErrorAlert
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        last_name: "",
        password: "",
        repeatPassword: "",
        group_id: null
      },
      error: ""
    };
  },
  computed: {
    ...mapState(["groups"])
  },
  validations: {
    form: {
      email: { required, email },
      name: { required, minLength: minLength(3) },
      last_name: { required, minLength: minLength(3) },
      password: { required, minLength: minLength(6) },
      repeatPassword: {
        required,
        sameAsPassword: sameAs(function() {
          return this.form.password;
        })
      },
      group_id: { required }
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
    this.$store.dispatch("getGroups");
  },
  methods: {
    register(validation) {
      this.$v.$touch();

      if (validation.$invalid) {
        return false;
      }

      this.$store
        .dispatch("register", this.form)
        .then(() => this.$router.push("/"))
        .catch(err => {
          this.error = err;
        });
    },
    emailError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Email is required";
      } else if (!field.email) {
        return "Invalid email";
      } else {
        return [];
      }
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
    lastNameError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Last name is required";
      } else if (!field.minLength) {
        return "Last name is too short";
      } else {
        return [];
      }
    },
    passwordError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Password is required";
      } else if (!field.minLength) {
        return "Password is too short";
      } else {
        return [];
      }
    },
    repeatPasswordError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Repeat password";
      } else if (!field.sameAsPassword) {
        return "Passwords do not match";
      } else {
        return [];
      }
    },
    groupError(field) {
      if (!field.$dirty) {
        return;
      } else if (!field.required) {
        return "Group is required";
      } else {
        return [];
      }
    }
  }
};
</script>
