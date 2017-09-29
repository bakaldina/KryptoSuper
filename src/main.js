import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueFire from 'vuefire'

import firebase from 'firebase'

Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(VueFire)
Vue.config.productionTip = false

/* eslint-disable no-new */
let app
let config = {
  apiKey: 'AIzaSyDTzlHDq9G3bVGinOcCblDG6cYm5iWfs2Y',
  authDomain: 'vueti-5ed25.firebaseapp.com',
  databaseURL: 'https://vueti-5ed25.firebaseio.com',
  projectId: 'vueti-5ed25',
  storageBucket: 'vueti-5ed25.appspot.com',
  messagingSenderId: '178972367475'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      render: h => h(App)
    })
  }
})
