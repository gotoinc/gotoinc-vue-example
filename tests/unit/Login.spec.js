import { mount, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Login from '@/views/auth/Login';

const localVue = global._localVue;
let wrapper;
let vuetify = new Vuetify();
let router = new VueRouter();

describe('Login.vue', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    wrapper = shallowMount(Login, {
      localVue,
      vuetify,
      router,
    });
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });
});
