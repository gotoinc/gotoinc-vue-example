import { mount, createLocalVue } from '@vue/test-utils';
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

    wrapper = mount(Login, {
      localVue,
      vuetify,
      router,
    });
  });

  it('component should be defined', () => {
    expect(wrapper).toBeDefined();
  });
});
