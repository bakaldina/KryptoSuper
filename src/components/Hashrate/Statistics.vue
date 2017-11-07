<template>
    <section id="statistics">
        <h1>Хэшрейт</h1>
        <div class="main_menu"><v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
        </v-btn></div>
        <br>
        <h4>Раздел в разработке</h4>
        <br>
    </section>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      items: [],
      firebase: firebase,
      menuItems: [
        {icon: 'gavel', title: 'Майнинг BTC', link: '/miningBTC'},
        {icon: 'gavel', title: 'Майнинг LTC', link: '/miningLTC'},
        {icon: 'attach_money', title: 'Баланс счета', link: '/balance'},
        {icon: 'trending_up', title: 'Статистика счета', link: '/statistics'}
      ]
    }
  },
  created () {
    this.$http.get('https://vueti-5ed25.firebaseio.com/hashrate_balance.json').then(function (data) {
      return data.json()
    }).then(function (data) {
    })
  }
}
</script>

<style>
.cyan {
    background-color:#3299BB !important;
}
.tabs__li a {
    color: #fff;
    font-weight: 600;
}
.border {
    border: 1px solid #FF9900 !important;
}
.tabs--centered .tabs__bar .tabs__container {
    justify-content: space-around;
}
</style>
