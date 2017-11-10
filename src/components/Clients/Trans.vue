<template>
    <section id="trans">
      <div class="main_menu"><v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
        </v-btn></div>
        <br>
        <button class="new-client">Транзакции</button> 
        <v-btn v-on:click='showModal = !showModal' fab dark class="indigo">
            <v-icon dark>add</v-icon>
        </v-btn>

          <v-data-table
            v-bind:headers="headers"
            v-bind:items="items"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            v-bind:rows-per-page-items="massiv"
            :total-items="totalItems"
            rows-per-page-text="Количество строк:"
            class="elevation-1 clients-table"
          >
            <template slot="items" scope="props">
              <td class="text-xs-right"><input :value="props.item.date2" @keyup.enter="editClient($event, 'customer_transaction', props.item.superkey, 'date2')"></td>
              <td class="text-xs-right"><input :value="props.item.typeOfTransaction" @keyup.enter="editClient($event, 'customer_transaction', props.item.superkey, 'typeOfTransaction')"></td>
              <td class="text-xs-right"><input :value="props.item.accountNnumber" @keyup.enter="editClient($event, 'customer_transaction', props.item.superkey, 'accountNnumber')"></td>
              <td class="text-xs-right"><input :value="props.item.summa" @keyup.enter="editClient($event, 'customer_transaction', props.item.superkey, 'summa')"></td>
              <td class="text-xs-right"><input :value="props.item.currency" @keyup.enter="editClient($event, 'customer_transaction', props.item.superkey, 'currency')"></td>
              <td class="text-xs-right"><input :value="props.item.price" @keyup.enter="editClient($event, 'customer_transaction', props.item.superkey, 'price')"></td>
              <td class="text-xs-right"><input :value="props.item.quantity" @keyup.enter="editClient($event, 'customer_transaction', props.item.superkey, 'quantity')"></td>
              <td class="text-xs-right">
              <v-btn fab dark small primary @click="removeClient(props.item.superkey)">
                <v-icon dark>remove</v-icon>
              </v-btn>
            </td>
            </template>
          </v-data-table>

          <div class="modal-mask" v-if="showModal==true">
            <div class="modal-wrapper" >
                <div class="modal-container">
                    <!-- <v-btn class="orange darken-2 white--text" v-on:click.stop='showModal = !showModal'>
                    <v-icon dark left>arrow_back</v-icon>Назад
                </v-btn> -->
                <button v-on:click.stop='showModal = !showModal' class="right">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45" height="45" viewBox="0 0 16 16">
                      <path fill="#444444" d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM12.2 10.8l-1.4 1.4-2.8-2.8-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8z"></path>
                    </svg>
                </button>
                <v-form v-model="valid" ref="formachka">

                    <v-dialog
                      persistent
                      v-model="modal"
                      lazy
                      full-width
                    >
                    <v-text-field
                      slot="activator"
                      label="Дата"
                      v-model="transactions.date2"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker  locale="ru-RU" date-format='DD-MM-YYYY' v-model="transactions.date2" scrollable>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Отмена</v-btn>
                          <v-btn flat primary @click.native="save()">Сохранить</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>

                  <v-select
                    label="Тип транзакции"
                    v-model="transactions.typeOfTransaction"
                    :items="items_typeOfTransaction"
                  ></v-select>

                    <v-text-field v-if="transactions.typeOfTransaction=='Ввод денежных средств'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-select v-if="transactions.typeOfTransaction=='Ввод денежных средств'"
                    label="Валюта"
                    v-model="transactions.currency"
                    :items="items_currency"
                    ></v-select>

                    <v-text-field v-if="transactions.typeOfTransaction=='Вывод денежных средств'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-select v-if="transactions.typeOfTransaction=='Вывод денежных средств'"
                    label="Валюта"
                    v-model="transactions.currency"
                    :items="items_currency"
                    ></v-select>

                    <v-text-field v-if="transactions.typeOfTransaction=='Покупка BTC'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-text-field v-if="transactions.typeOfTransaction=='Покупка BTC'"
                    label="Цена"
                    :counter="10"
                    v-model="transactions.price"
                    ></v-text-field>

                    <v-text-field v-if="transactions.typeOfTransaction=='Продажа BTC'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-text-field v-if="transactions.typeOfTransaction=='Продажа BTC'"
                    label="Цена"
                    :counter="10"
                    v-model="transactions.price"
                    ></v-text-field>

                    <v-text-field v-if="transactions.typeOfTransaction=='Ввод BTC'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>

                    <v-text-field v-if="transactions.typeOfTransaction=='Вывод BTC'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>

                    <v-text-field v-if="transactions.typeOfTransaction=='Покупка мощности'"
                    label="Количество"
                    v-model="transactions.quantity"
                    ></v-text-field>
                    <v-text-field v-if="transactions.typeOfTransaction=='Покупка мощности'"
                    label="Цена"
                    :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                    :counter="25"
                    v-model="transactions.price"
                    ></v-text-field>

                    <v-text-field v-if="transactions.typeOfTransaction=='Продажа мощности'"
                    label="Количество"
                    v-model="transactions.quantity"
                    ></v-text-field>
                    <v-text-field v-if="transactions.typeOfTransaction=='Продажа мощности'"
                    label="Цена"
                    :counter="10"
                    v-model="transactions.price"
                    ></v-text-field>

                    <v-text-field v-if="transactions.typeOfTransaction=='Списание комиссии'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-select v-if="transactions.typeOfTransaction=='Списание комиссии'"
                    label="Валюта"
                    v-model="transactions.currency"
                    :items="items_currency"
                    ></v-select>

                    <v-text-field v-if="transactions.typeOfTransaction=='Предоставление займа'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-select v-if="transactions.typeOfTransaction=='Предоставление займа'"
                    label="Валюта"
                    v-model="transactions.currency"
                    :items="items_currency"
                    ></v-select>

                    <v-text-field v-if="transactions.typeOfTransaction=='Погашение займа'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-select v-if="transactions.typeOfTransaction=='Погашение займа'"
                    label="Валюта"
                    v-model="transactions.currency"
                    :items="items_currency"
                    ></v-select>

                     <v-text-field v-if="transactions.typeOfTransaction=='Выплата процентов по займу'"
                    label="Сумма"
                    v-model="transactions.summa"
                    ></v-text-field>
                    <v-select v-if="transactions.typeOfTransaction=='Выплата процентов по займу'"
                    label="Валюта"
                    v-model="transactions.currency"
                    :items="items_currency"
                    ></v-select>
                    
                    <v-select
                    label="Номер портфеля"
                    v-model="transactions.accountNnumber"
                    :items="number_clientsText"
                    ></v-select>

                    <v-btn class="form-button" @click="postTransactions" :class="{ green: valid, red: !valid }">Подтвердить</v-btn>
                    <!-- <v-btn class="form-button" @click="clear">Очистка</v-btn> -->
                </v-form>
              </div>
            </div>
          </div>
    </section>
</template>

<script>
// Imports
import firebase from 'firebase'
import moment from 'moment'
import _ from 'underscore'

export default {
  data () {
    return {
      menuItems: [
        {icon: 'group', title: 'Клиенты', link: '/contracts'},
        {icon: 'query_builder', title: 'Транзакции', link: '/trans'},
        {icon: 'desktop_windows', title: 'Майнинг', link: '/mining'},
        {icon: 'insert_drive_file', title: 'Отчет фонда', link: '/report'}
      ],
      menu: false,
      modal: false,
      firebase: firebase,
      isOpen: false,
      showModal: false,
      active: null,
      checkbox: false,
      search: '',
      totalItems: 0,
      pagination: { sortBy: 'date2', page: 1, rowsPerPage: 25, descending: true, totalItems: 0 },
      massiv: [10, 25, 50, { text: 'Все', value: -1 }],
      transactions: {
        date2: '',
        typeOfTransaction: '',
        accountNnumber: '',
        summa: '',
        currency: '',
        quantity: '',
        price: ''
      },
      headers: [
        { text: 'Дата', value: 'date2' },
        { text: 'Тип транзакции', value: 'typeOfTransaction' },
        { text: 'Номер портфеля', value: 'accountNnumber' },
        { text: 'Сумма', value: 'summa' },
        { text: 'Валюта', value: 'currency' },
        { text: 'Цена', value: 'price' },
        { text: 'Количество', value: 'quantity' },
        { text: 'Удалить', value: 'Remove' }
      ],
      items: [],
      valid: false,
      select: null,
      items_typeOfTransaction: [
        'Ввод денежных средств',
        'Вывод денежных средств',
        'Покупка BTC',
        'Продажа BTC',
        'Ввод BTC',
        'Вывод BTC',
        'Покупка контракта',
        'Продажа контракта',
        'Покупка мощности',
        'Продажа мощности',
        'Списание комиссии',
        'Предоставление займа',
        'Погашение займа',
        'Выплата процентов по займу'
      ],
      number_clients: [],
      number_clientsText: [],
      power: [],
      accountNnumbers: [],
      items_currency: [
        'USD',
        'RUR',
        'BTC'
      ]
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    removeClient: function (key) {
      let db = this.firebase.database()
      db.ref('customer_transaction').child(key).remove()
      this.items = []
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_transaction.json').then(function (data) {
        return data.json()
      }).then(function (data) {
        for (let key in data) {
          let elem = data[key]
          elem['superkey'] = key
          this.items.push(elem)
        }
      })
    },
    editClient: function (event, base, index, param) {
      let db = this.firebase.database()
      db.ref(base).child(index).child(param).set(event.target.value)
      this.items = []
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_transaction.json').then(function (data) {
        return data.json()
      }).then(function (data) {
        for (let key in data) {
          let elem = data[key]
          elem['superkey'] = key
          this.items.push(elem)
        }
      })
    },
    postTransactions: function () {
      this.transactions['accountNnumber'] = this.transactions['accountNnumber'].split(' ')[0]
      this.$http.post('https://vueti-5ed25.firebaseio.com/customer_transaction.json', this.transactions).then(function (data) {
        this.showModal = false
      })
    },
    submit () {
      if (this.$refs.formachka.validate()) {
        this.$refs.formachka.$el.submit()
      }
    },
    clear () {
      this.$refs.formachka.reset()
    }
  },
  created () {
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_transaction.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      var calendar = {}
      for (let key in data) {
        let elem = data[key]
        elem['superkey'] = key
        elem['timestamp'] = moment(data[key]['date2']).valueOf()
        if (data[key]['typeOfTransaction'] === 'Покупка мощности' || 'Продажа мощности') {
          data[key]['currency'] = 'BTC'
          data[key]['summa'] = +data[key]['quantity'] * +data[key]['price']
          data[key]['summa'] = Math.ceil(data[key]['summa'] * 100000000) / 100000000
          this.firebase.database().ref('customer_transaction').child(key).child('summa').set(data[key]['summa'])
        }
        this.items.push(elem)
      }
      var accoountCreated = {}
      let afterGroup = _.groupBy(_.sortBy(this.items, 'timestamp'), 'date2')
      // формирование календаря
      for (var keyDate in afterGroup) {
        // afterGroup[keyDate] транзакции на эту дату
        // keyDate отдаст саму дату
        afterGroup[keyDate].map(function (account, index, array) {
          // добавлен ли номер аккаунта в accoountCreated?
          if (array[index].accountNnumber in accoountCreated) {
            accoountCreated[array[index].accountNnumber] = +accoountCreated[array[index].accountNnumber] + +array[index].quantity
            if (calendar[array[index].date2]) {
              accoountCreated[array[index].accountNnumber]
              calendar[array[index].date2].push({
                [array[index].accountNnumber]: {
                  power: accoountCreated[array[index].accountNnumber],
                  powerDay: +array[index].quantity
                }
              })
            } else {
              calendar[array[index].date2] = []
              accoountCreated[array[index].accountNnumber]
              calendar[array[index].date2].push({
                [array[index].accountNnumber]: {
                  power: accoountCreated[array[index].accountNnumber],
                  powerDay: +array[index].quantity
                }
              })
            }
          } else {
            if (calendar[array[index].date2]) {
              calendar[array[index].date2].push({
                [array[index].accountNnumber]: {
                  power: array[index].quantity,
                  powerDay: +array[index].quantity
                }
              })
            } else {
              calendar[array[index].date2] = []
              accoountCreated[array[index].accountNnumber]
              calendar[array[index].date2].push({
                [array[index].accountNnumber]: {
                  power: +array[index].quantity,
                  powerDay: +array[index].quantity
                }
              })
            }
            accoountCreated[array[index].accountNnumber] = array[index].quantity
          }
        })
      }
      // добавление общего намайненого
      console.log(calendar)
      for (let day in calendar) {
        let lastDay = lastDay || []
        let power = 0 // мощность за день
        let allForPast // мощность за предыдущий день
        calendar[day].map(function (day2, index, array) { // проход по каждому дню
          for (let acc in day2) { // проход по каждому аккаунт
            power += +day2[acc].powerDay
          }
        })
        if (lastDay.length > 0) {
          // calendar.data.numbAccaunta.lastElementArray.All
          let predData = lastDay[lastDay.length - 1]
          let massiv = calendar[lastDay[lastDay.length - 1]]
          allForPast = calendar[predData][massiv.length - 1].all.power
          power += allForPast
          lastDay.push(day)
          calendar[day].push({
            all: {
              'power': power
            }
          })
        } else {
          allForPast = 33410
          calendar[day].push({all: {'power': allForPast}})
        }
        lastDay.push(day)
      }
      // добавление доли каждому
      for (var date2 in calendar) {
        calendar[date2].forEach(function (item, index, arr) {
          for (var numb in item) {
            let thatPower = +item[numb].power
            let thatDayPower = +calendar[date2][arr.length - 1].all.power
            item[numb].proportion = thatPower / thatDayPower
          }
        })
      }
      this.firebase.database().ref('customer_details').set(calendar)
    })
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (var key in data) {
        this.number_clients.push(data[key]['accountNnumber'])
        this.number_clientsText.push(data[key]['accountNnumber'] + ' ' + data[key]['firstName'] + ' ' + data[key]['surname'])
      }
    })
    this.transactions.date2 = moment().format('DD.MM.YYYY')
    // var calendar = {}
    // var createCrypto = moment('2017-07-14')
    // var dataToday = moment()
    // var diffDate = dataToday.diff(createCrypto, 'd')
    // for (let i = 0; i < diffDate; i++) {
    //   var date = createCrypto.add(i, 'd')
    //   calendar[date] = [
    //     // [accountNumber]: {
    //     //   [power]:''
    //     // }
    //   ]
    // }
  }
}
</script>

<style scoped>
button.new-client {
    margin: 0 15px 25px 70px;
    font-size: 28px;
}
.cyan {
    background-color: #3299BB !important;
    color: #fff;
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
.cyan {
    background-color: #3299BB !important;
    color: #fff;
}
.tabs__li a {
    color: #fff;
    font-weight: 600;
}
.border {
    border: 1px solid #FF9900 !important;
}
.tabs__container {
    justify-content: space-around;
}
.indigo {
    background-color: #3299BB!important;
    border-color: #3299BB!important;
}
table.clients-table {
    width: 100%;
    border-collapse: collapse;
}
.clients-table th, .clients-table td {
    border: 1px solid black;
    padding: 15px;
}
.clients-table td:last-child {
    width: 50px;
}
.card__text {
    overflow: scroll;
}
.btn--floating.btn--large {
    height: 30px;
    width: 30px;
}
.btn--floating.btn--small {
    height: 30px;
    width: 30px;
}
.edit-color {
    background-color: #FCFCF8!important;
    border: none;
}
.btn--floating.btn--large .icon {
    font-size: 14px;
    height: 10px;
    width: 10px;
    color: #000;
}
.modal-mask {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .7s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  position: relative;
  width: 40%;
  height: 75%;
  margin: 0px auto;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .7s ease;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}
.right {
    margin-top: 0;
    margin-bottom: 0;
    position: absolute;
    top: -11px;
    right: -11px;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.5);
}
.button {
    position: absolute;
    top: 13px;
    right: 12px;
}
.button:active {
    outline: none;
}
.main_menu {
    display: flex;
    justify-content: space-around;
    background-color: #3299BB;
    margin-top: 40px;
    padding: 10px 0;
}
.btn__content:before {
  display: none;
}
.btn {
  margin: 0;
}
.input-group {
  padding: 15px 0 0 0;
}
.input-group--text-field input {
  height: 30px;
}
.input-group__details {
  min-height: 15px;
}
.form-button {
  margin-top: 30px;
}
.form-button .btn__content {
 color: #000 !important;
}
input {
  width: 100%;
}
.application--light .picker .picker__title {
    background: #37474f;
}
table.table tbody td, table.table tbody th {
    height: 35px;
}
</style>
