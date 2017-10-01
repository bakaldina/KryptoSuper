<template>
  <v-container id="Main">
    <v-layout row wrap>
      <h1 class="welcome_text">Добро пожаловать!</h1>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'lock_open', title: 'Sign in', link: '/signin'},
          {icon: 'supervisor_account', title: 'Клиенты', link: '/contracts'},
          {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
          {icon: 'person', title: 'Profile', link: '/profile'},
          {icon: 'face', title: 'Sign up', link: '/signup'}
        ]
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
</script>

<style scoped>
.welcome_text {
  margin: auto;
  margin-top: 40px;
}
</style>
