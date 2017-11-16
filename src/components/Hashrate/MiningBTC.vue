<template>
    <section id="miningBTC">
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
          no-data-text="Нет данных для отображения"
          class="elevation-1 clients-table"
        >
      <template slot="items" scope="props" >
            <td class="text-xs-right">{{ props.item.day }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.mining }}</td>
            <td class="text-xs-right">{{ props.item.balanceItem }}</td>
            <td class="text-xs-right">{{ props.item.coursesBTC }}</td>
            <td class="text-xs-right">{{ props.item.incomeUSD }}</td>
        </template>
        </v-data-table>
    </section>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import _ from 'underscore'

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
      details: [],
      mining: [],
      items: [],
      dataDif: 0,
      active: null,
      checkbox: false,
      search: '',
      DataCurs: [],
      totalItems: 0,
      transaction: [],
      pagination: { sortBy: 'day', page: 1, rowsPerPage: 25, descending: false, totalItems: 0 },
      massiv: [10, 25, 50, { text: 'Все', value: -1 }],
      menuItems: [
        {icon: 'gavel', title: 'Майнинг BTC', link: '/miningBTC'},
        {icon: 'gavel', title: 'Майнинг LTC', link: '/miningLTC'},
        {icon: 'attach_money', title: 'Баланс счета', link: '/balance'},
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
        this.DataCurs.push({
          'date': data[key].date,
          'timestamp': moment(data[key].date).valueOf(),
          'coursesBTC': data[key].сoursesBTC,
          'miningItem': data[key].miningItem
        })
      }
      this.DataCurs = _.sortBy(this.DataCurs, 'timestamp')
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_details.json').then(function (data) {
        return data.json()
      }).then(function (data) {
        for (let key in data) {
          if (data[key].accountNnumber === '9999-002') {
            let elem = data[key]
            elem['superkey'] = key
            this.details.push(elem)
          }
        }
        // console.log(3)
        this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
          return data.json()
        }).then(function (data) {
          for (let key in data) {
            let lastDolya = []
            let lastPower = []
            data[key].email = data[key].email || ''
            if (data[key].email === user.email) {
              var acca = data[key].accountNnumber
              // формирование таблички с первого дня создания крипто
              var dataOpen = moment(data[key].dateOfAccountOpening)
              var dataOpenPlusOne = dataOpen.add(1, 'days')
              var datatoday = moment()
              this.dataDif = datatoday.diff(dataOpenPlusOne, 'days')
              var DataCurs = this.DataCurs
              let min = [0]
              for (let i = 1; i < this.dataDif + 2; i++) {
                let j
                if (i < DataCurs.length) {
                  j = i - 1
                } else {
                  j = DataCurs.length
                }
                DataCurs[j] = DataCurs[j] || ''
                if (DataCurs[j] !== undefined) {
                  let thatDate = moment(data[key].dateOfAccountOpening).add(i - 1, 'days').format('YYYY-MM-DD')
                  let inf
                  var self = this
                  //  получить долю
                  firebase.database().ref('customer_details').child(thatDate).on('value', function (snapshot) {
                    let temp = snapshot.val() || []
                    if (temp.length > 0) {
                      // ищем ключ равный нашему массиву
                      let allPower
                      temp.map(function (account, index, array) {
                        allPower = 0
                        for (let name in account) {
                          // справа заменяем на акаунт номер пользователя
                          if (name === acca) {
                            // тут добавляем дол этого чувака на дату
                            lastPower.push(account[name].power)
                            console.log(thatDate)
                            console.log(lastPower)
                          }
                          if (name === 'all') {
                            allPower = account[name].power
                          }
                        }
                      })
                      let proportion = lastPower[lastPower.length - 1] / allPower
                      lastDolya.push(proportion)
                    }
                    inf = lastDolya[lastDolya.length - 1]
                    let balancis
                    if (i !== 1) {
                      balancis = +DataCurs[j - 2].miningItem * +inf * 10 + min[min.length - 1]
                      min.push(balancis)
                    }
                    self.balance.push({
                      'day': i - 2,
                      'date': moment(thatDate).add(-1, 'days').format('YYYY-MM-DD'),
                      'coursesBTC': DataCurs[j - 2].coursesBTC || '',
                      'mining': +DataCurs[j - 2].miningItem * +inf * 10 || '',
                      'balanceItem': min[min.length - 1],
                      'incomeUSD': (+DataCurs[j - 2].coursesBTC * min[min.length - 1]).toFixed(4)
                    })
                  })
                }
              }
            }
          }
        })
      })
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
