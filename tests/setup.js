import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import { createLocalVue } from '@vue/test-utils';

// ...yeap :)
global._localVue = createLocalVue();

// plugins for _localVue.use()
const pluginsLocal = [VueRouter, Vuelidate];

// plugins for Vue.use()
const pluginsGlobal = [Vuetify];

// connect plugins for all tests
pluginsLocal.forEach(plugin => global._localVue.use(plugin));
pluginsGlobal.forEach(plugin => Vue.use(plugin));
