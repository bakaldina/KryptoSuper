<template>
  <v-app toolbar>
    <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar v-if="this.userEmail=='bakaldina.e@gmail.com'">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/women/4.jpg"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Бакалдина Eкатерина</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

           <v-list-tile avatar v-if="this.userEmail=='lubinetskn@gmail.com'">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/4.jpg"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Лубинец Константин</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile avatar v-if="this.userEmail=='mahusv@gmail.com'">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/12.jpg"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Маху Сергей Васильевич</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile avatar v-if="this.userEmail=='mahus@mac.com'">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/11.jpg"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Маху Сергей Васильевич</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      
      <v-list class="pt-0" dense v-if="this.userEmail=='mahus@mac.com'">
      <v-divider></v-divider>
      <v-list-tile  
          v-for="item in menuItems1"
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

       <v-list class="pt-0" dense v-if="this.userEmail!=='mahus@mac.com'">
      <v-divider></v-divider>
      <v-list-tile  
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      </v-toolbar>
    </v-navigation-drawer>
     <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title><img src="./assets/logo_mini.png" height='50' alt="логотип" style="vertical-align: middle; margin-right: 10px;">
        <router-link to="/" tag="span" style="cursor: pointer">CRYPTO MANAGEMENT</router-link>
      </v-toolbar-title>
      <v-btn large v-on:click="logout" class="cyan button">выйти</v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'app',
    data () {
      return {
        drawer: true,
        menuItems1: [
          {icon: 'business', title: 'Хэшрейт', link: '/hash'},
          {icon: 'local_atm', title: 'Обмен', link: '/exchange'},
          {icon: 'call_to_action', title: 'Кошелек', link: '/pouch'},
          {icon: 'lock_outline', title: 'Выйти', link: '/login'}
        ],
        menuItems: [
          {icon: 'supervisor_account', title: 'Контракты', link: '/contracts'},
          {icon: 'business', title: 'Хэшрейт', link: '/hash'},
          {icon: 'local_atm', title: 'Обмен', link: '/exchange'},
          {icon: 'call_to_action', title: 'Кошелек', link: '/pouch'},
          {icon: 'lock_outline', title: 'Выйти', link: '/login'}
        ],
        mini: false,
        right: null
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    },
    created () {
      var user = firebase.auth().currentUser
      this.userEmail = user.email
    //  вобщем передаешь почту в this.user.email и v-if'ом выбираешь что нужно
    }
  }
</script>

<style lang="stylus">
body .application--light{
  background-color: #fff;
  background-size cover;
}
  @import './stylus/main'
</style>
