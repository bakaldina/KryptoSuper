<template>
    <section id="hashrate">
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
        <br>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:pagination.sync="pagination"
          v-bind:rows-per-page-items="massiv"
          :total-items="totalItems"
          rows-per-page-text="Количество строк:"
          class="elevation-1 clients-table"
        >
        <template slot="items" scope="props" >
            <td class="text-xs-right">{{ balance.day }}</td>
            <td class="text-xs-right">{{ balance.date }}</td>
            <td class="text-xs-right">{{ balance.mining }}</td>
            <td class="text-xs-right">{{ balance.balanceItem }}</td>
            <td class="text-xs-right">{{ balance.courseBTC }}</td>
            <td class="text-xs-right">{{ balance.incomeUSD }}</td>
        </template>
        </v-data-table>
    </section>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      balance: {
        day: '',
        date: '',
        mining: '',
        balanceItem: '',
        courseBTC: '',
        incomeUSD: ''
      },
      headers: [
        { text: 'День', value: 'day' },
        { text: 'Дата', value: 'date' },
        { text: 'Майнинг', value: 'mining' },
        { text: 'Баланс', value: 'balanceItem' },
        { text: 'Курс BTC', value: 'courseBTC' },
        { text: 'Заработано USD', value: 'incomeUSD' }
      ],
      items: [],
      firebase: firebase,
      menuItems: [
        {icon: 'attach_money', title: 'Баланс счета', link: '/hash'},
        {icon: 'trending_up', title: 'Статистика счета', link: '/statistics'}
      ]
    //   items: ['Баланс счета', 'Статистика счета'],
    //   text: ['Раздел в разработке!', 'Раздел в разработке!']
    }
  },
  created () {
    this.$http.get('https://vueti-5ed25.firebaseio.com/hashrate_balance.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      this.balance.day = data.day
      this.balance.date = data.date
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
