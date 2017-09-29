<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <img src="./assets/logo_mini.png" height='50' alt="логотип" style="vertical-align: middle; margin-right: 10px;">
        <router-link to="/" tag="span" style="cursor: pointer">CRYPTO MANAGEMENT</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}

        </v-btn>
      </v-toolbar-items> -->
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'supervisor_account', title: 'Клиенты', link: '/contracts'},
          {icon: 'lock_open', title: 'Обмен', link: '/exchange'},
          {icon: 'lock_open', title: 'Хэшрейт', link: '/hash'},
          {icon: 'lock_open', title: 'Кошелек', link: '/pouch'},
          {icon: 'lock_open', title: 'Войти', link: '/signin'}
        ]
      }
    }

  }
</script>

<style lang="stylus">
body .application--light{
  background-color: #fff;
  background-size cover
}
  @import './stylus/main'
</style>
