<template>
    <section id="miningLTC">
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
      <template slot="items" scope="props">
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
        { text: 'Курс LTC', value: 'coursesLTC' },
        { text: 'Заработано USD', value: 'incomeUSD' }
      ],
      items: [],
    //   DataCurs: [],
    //   Transactions: [],
    //   dataDif: 0,
    //   active: null,
    //   checkbox: false,
    //   search: '',
    //   totalItems: 0,
    //   transaction: [],
    //   pagination: { sortBy: 'day', page: 1, rowsPerPage: 25, descending: false, totalItems: 0 },
      massiv: [10, 25, 50, { text: 'Все', value: -1 }],
      menuItems: [
        {icon: 'gavel', title: 'Майнинг BTC', link: '/miningBTC'},
        {icon: 'gavel', title: 'Майнинг LTC', link: '/miningLTC'},
        {icon: 'attach_money', title: 'Баланс счета', link: '/balance'},
        {icon: 'trending_up', title: 'Статистика счета', link: '/statistics'}
      ]
    }
  }
//   created () {
//     var user = firebase.auth().currentUser
//     this.$http.get('https://vueti-5ed25.firebaseio.com/customer_mining.json').then(function (data) {
//       return data.json()
//     }).then(function (data) {
//       for (let key in data) {
//         let elem = data[key]
//         elem['superkey'] = key
//         console.log(data[key].miningItem)
//         this.DataCurs.push({
//           'date': data[key].date,
//           'coursesBTC': data[key].сoursesBTC,
//           'miningItem': data[key].miningItem
//         })
//       }
//       console.log(1)
//       this.$http.get('https://vueti-5ed25.firebaseio.com/customer_transaction.json').then(function (data) {
//         return data.json()
//       }).then(function (data) {
//         for (let key in data) {
//           if (data[key].accountNnumber === '9999-002') {
//             let elem = data[key]
//             elem['superkey'] = key
//             this.transaction.push(elem)
//           }
//         }
//         console.log(2)
//         this.$http.get('https://vueti-5ed25.firebaseio.com/customer_details.json').then(function (data) {
//           return data.json()
//         }).then(function (data) {
//           for (let key in data) {
//             if (data[key].accountNnumber === '9999-002') {
//               let elem = data[key]
//               elem['superkey'] = key
//               this.details.push(elem)
//             }
//           }
//           console.log(3)
//           this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
//             return data.json()
//           }).then(function (data) {
//             for (let key in data) {
//               if (data[key].email === user.email) {
//                 // формирование таблички с первого дня создания крипто
//                 var dataOpen = moment(data[key].dateOfAccountOpening)
//                 var dataOpenPlusOne = dataOpen.add(1, 'days')
//                 var datatoday = moment()
//                 this.dataDif = datatoday.diff(dataOpenPlusOne, 'days')
//                 var DataCurs = this.DataCurs
//                 console.log(DataCurs.length)
//                 for (var i = 1; i < this.dataDif + 2; i++) {
//                   let j
//                   if (i < DataCurs.length) {
//                     j = i - 1
//                   } else {
//                     j = DataCurs.length
//                   }
//                   console.log(moment(data[key].dateOfAccountOpening).add(i, 'days'))
//                   // console.log(this.firebase.database().ref('customer_details').child(moment(data[key].dateOfAccountOpening).add(i, 'days').format('YYYY-MM-DD')))
//                   if (DataCurs[j].coursesBTC) {
//                     console.log(DataCurs[j].coursesBTC)
//                     this.balance.push({
//                       'day': i,
//                       'date': moment(data[key].dateOfAccountOpening).add(i, 'days').format('DD.MM.YYYY'),
//                       'coursesBTC': DataCurs[j].coursesBTC,
//                       'mining': DataCurs[j].miningItem
//                     })
//                   }
//                 }
//               }
//             }
//             console.log(4)
//           })
//         })
//       })
//     })
//  }
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
