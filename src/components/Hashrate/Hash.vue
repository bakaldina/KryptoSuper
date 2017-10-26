<template>
    <section id="hashrate">
        <h1>Хэшрейт</h1>
        <div>{{this.dataOpen}}</div>
        <div>{{this.dataDif}}</div>
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
          v-bind:items="balance"
          v-bind:pagination.sync="pagination"
          v-bind:rows-per-page-items="massiv"
          :total-items="totalItems"
          rows-per-page-text="Количество строк:"
          class="elevation-1 clients-table"
        >
      <template slot="items" scope="props" >
            <td class="text-xs-right">{{ props.item.day }}</td>
            <td class="text-xs-right">{{ props.item.day }}</td>
           <!-- <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.mining }}</td>
            <td class="text-xs-right">{{ props.item.balanceItem }}</td>
            <td class="text-xs-right">{{ props.item.courseBTC }}</td>
            <td class="text-xs-right">{{ props.item.incomeUSD }}</td>-->
        </template>
        </v-data-table>
    </section>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'

export default {
  name: 'hash',
  data () {
    return {
      balance: [],
      dataOpen: '',
      headers: [
        { text: 'День', value: 'day' },
        { text: 'Дата', value: 'date' },
        { text: 'Майнинг', value: 'mining' },
        { text: 'Баланс', value: 'balanceItem' },
        { text: 'Курс BTC', value: 'courseBTC' },
        { text: 'Заработано USD', value: 'incomeUSD' }
      ],
      mining: [],
      items: [],
      dataDif: 0,
      active: null,
      checkbox: false,
      search: '',
      totalItems: 0,
      transaction: [],
      pagination: { sortBy: 'day', page: 1, rowsPerPage: 25, descending: false, totalItems: 0 },
      massiv: [10, 25, 50, { text: 'Все', value: -1 }],
      menuItems: [
        {icon: 'attach_money', title: 'Баланс счета', link: '/hash'},
        {icon: 'trending_up', title: 'Статистика счета', link: '/statistics'}
      ]
    }
  },
  created () {
    var user = firebase.auth().currentUser
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (let key in data) {
        if (data[key].email === user.email) {
          var dataOpen = moment(data[key].dateOfAccountOpening)
          var dataOpenPlusOne = dataOpen.add(1, 'days')
          var datatoday = moment()
          this.dataDif = datatoday.diff(dataOpenPlusOne, 'days')
          console.log(this.balance)
          for (var i = 0; i < this.dataDif; i++) {
            this.balance.push({
              'day': i
            })
          }
          console.log(this.balance)
        }
      }
    })
    // this.dataDif = moment().format('YYYY-MM-DD').diff(moment(this.dataOpen))
    // this.dataDif = moment(this.dataOpen).format('DD').diff(moment().format('YYYY-MM-DD'))
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_mining.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (let key in data) {
        let elem = data[key]
        elem['superkey'] = key
        this.mining.push(data)
      }
    })
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_transaction.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (let key in data) {
        if (data[key].accountNnumber === '9999-002') {
          let elem = data[key]
          elem['superkey'] = key
          this.transaction.push(elem)
        }
      }
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
