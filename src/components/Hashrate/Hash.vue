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
          v-bind:items="balance"
          v-bind:pagination.sync="pagination"
          v-bind:rows-per-page-items="massiv"
          :total-items="totalItems"
          rows-per-page-text="Количество строк:"
          class="elevation-1 clients-table"
        >
      <template slot="items" scope="props" >
            <td class="text-xs-right">{{ props.item.day }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.mining }}</td>
            <td></td>
            <td class="text-xs-right">{{ props.item.coursesBTC }}</td>
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
        { text: 'Курс BTC', value: 'coursesBTC' },
        { text: 'Заработано USD', value: 'incomeUSD' }
      ],
      items: [],
      DataCurs: [],
      Transactions: [],
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
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_mining.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (let key in data) {
        let elem = data[key]
        elem['superkey'] = key
        console.log(data[key].miningItem)
        this.DataCurs.push({
          'date': data[key].date,
          'coursesBTC': data[key].сoursesBTC,
          'miningItem': data[key].miningItem
        })
      }
      console.log(this.DataCurs)
    })
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_transaction.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (let key in data) {
        let elem = data[key]
        elem['superkey'] = key
        this.Transactions.push({
          'dolya': 0,
          'data': data[key].data2,
          'quantity': data[key].quantity
        })
      }
      console.log(this.Transactions)
    })
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (let key in data) {
        if (data[key].email === user.email) {
          var dataOpen = moment(data[key].dateOfAccountOpening)
          var dataOpenPlusOne = dataOpen.add(1, 'days')
          var datatoday = moment()
          this.dataDif = datatoday.diff(dataOpenPlusOne, 'days')
          var dataKursMass = this.DataCurs
          // var quantity = this.Transactions
          // var summQuantity =
          for (var i = 1; i < this.dataDif + 2; i++) {
            let j = i - 1
            console.log(this.DataCurs.length)
            console.log(this.Transactions.length)
            var miningItem = this.DataCurs[j].miningItem
            var quantity = this.Transactions[j].quantity
            this.balance.push({
              'day': i,
              'date': moment(data[key].dateOfAccountOpening).add(i, 'days').format('DD.MM.YYYY'),
              'coursesBTC': dataKursMass[j].coursesBTC,
              'mining': miningItem * quantity * 100 // summQuantity
            })
          }
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
