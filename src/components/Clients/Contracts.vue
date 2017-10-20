<template>
    <section id="contracts">
        <div class="main_menu"><v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
        </v-btn></div>
        <br>
        <button class="new-client">Новый Клиент</button> 
        <v-btn v-on:click='addNew()' fab dark class="indigo">
            <v-icon dark>add</v-icon>
        </v-btn>

        <v-data-table
          v-bind:headers="headers"
          v-bind:items="superClients"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          v-bind:rows-per-page-items="massiv"
          :total-items="totalItems"
          rows-per-page-text="Количество строк:"
          class="elevation-1 clients-table"
        >
        <template slot="items" scope="props" >
            <td class="text-xs-right"><input :value="props.item.accountNnumber" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'accountNnumber')"></td>
            <td class="text-xs-right"><input :value="props.item.fullName"></td>
            <td class="text-xs-right"><input :value="props.item.email" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'email')"></td>
            <td class="text-xs-right"><input :value="props.item.dateOfAccountOpening" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'dateOfAccountOpening')"></td>
            <td class="text-xs-right"><input :value="props.item.amountOfCommission" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'amountOfCommission')"></td>
            <td class="text-xs-right"><input :value="props.item.summaBTC" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'summaBTC')"></td>
            <td class="text-xs-right"><input :value="props.item.summaRUR" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'summaRUR')"></td>
            <td class="text-xs-right"><input :value="props.item.power" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'power')"></td>
            <td class="text-xs-right"><input :value="props.item.proportion" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'proportion')"></td>
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
                 <!-- <v-text-field
                    label="Номер"
                    v-model="customer.accountNnumber"
                    ></v-text-field>-->
                    
                    <!-- <div class="account-number">{{ customer.accountNnumber }} </div> -->
                    <v-text-field
                    label="Номер"
                    v-model="customer.accountNnumber"
                    ></v-text-field>

                    <v-text-field
                    label="Фамилия"
                    v-model="customer.surname"
                    ></v-text-field>

                    <v-text-field
                    label="Имя"
                    v-model="customer.firstName"
                    ></v-text-field>

                    <v-text-field
                    label="Отчество"
                    v-model="customer.middleName"
                    ></v-text-field>

                    <v-dialog
                      persistent
                      v-model="modal"
                      lazy
                      full-width
                    >
                    <v-text-field
                      slot="activator"
                      label="Дата открытия"
                      v-model="customer.dateOfAccountOpening"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker  date-format="dd, MMM, yyyy" locale="ru-RU" v-model="customer.dateOfAccountOpening" scrollable autosave actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Отмена</v-btn>
                          <v-btn flat primary @click.native="save()">Сохранить</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                    <v-text-field
                    label="Почта"
                    v-model="customer.email"
                    ></v-text-field>

                    <v-text-field
                    label="Телефон"
                    :mask="'(##) ####-####'"
                    ></v-text-field>

                    <v-text-field
                    label="Размер комиссии"
                    v-model="customer.amountOfCommission"
                    ></v-text-field>

                    <v-btn class="form-button" @click="post" :class="{ green: valid, red: !valid }">Подтвердить</v-btn>
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
      pagination: { sortBy: 'accountNnumber', page: 1, rowsPerPage: 25, descending: false, totalItems: 0 },
      massiv: [10, 25, 50, { text: 'Все', value: -1 }],
      customer: {
        accountNnumber: '',
        firstName: '',
        middleName: '',
        surname: '',
        email: '',
        dateOfAccountOpening: '',
        amountOfCommission: '',
        summaBTC: '',
        summaRUR: '',
        power: '',
        proportion: ''
      },
      headers: [
        { text: 'Номер', value: 'accountNnumber' },
        { text: 'ФИО', value: 'fullName' },
        { text: 'Почта', value: 'email' },
        { text: 'Дата открытия', value: 'dateOfAccountOpening' },
        { text: 'Комиссия, %', value: 'amountOfCommission' },
        { text: 'Сумма BTC', value: 'summaBTC' },
        { text: 'Сумма RUR', value: 'summaRUR' },
        { text: 'Общее кол-во мощности', value: 'power' },
        { text: 'Доля, %', value: 'proportion' },
        { text: 'Удалить', value: 'Remove' }
      ],
      items: [],
      valid: false,
      select: null,
      transactions: [],
      power: [],
      powerSum: 0,
      summaBTCSum: 0,
      quantityClients: 0,
      TotalFundBTC: 0,
      proportionSum: 100,
      summaBTC: [],
      summaRUR: [],
      proportion: [],
      fullName: [],
      superClients: [],
      accountNnumbers: []
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
          .then(data => {
            this.items = data.items
            this.totalItems = data.total
          })
      },
      deep: true
    }
  },
  mounted () {
    this.getDataFromApi()
      .then(data => {
        this.items = data.items
        this.totalItems = data.total
      })
  },
  methods: {
    addNew: function () {
      this.showModal = !this.showModal
    },
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    removeClient: function (key) {
      let db = this.firebase.database()
      db.ref('customer_registry').child(key).remove()
      this.items = []
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
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
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
        return data.json()
      }).then(function (data) {
        for (let key in data) {
          let elem = data[key]
          elem['superkey'] = key
          this.items.push(elem)
        }
      })
    },
    getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        let items = this.items
        const total = items.length

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy]
            const sortB = b[sortBy]

            if (descending) {
              if (sortA < sortB) return 1
              if (sortA > sortB) return -1
              return 0
            } else {
              if (sortA < sortB) return -1
              if (sortA > sortB) return 1
              return 0
            }
          })
        }
        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }

        setTimeout(() => {
          this.loading = false
          resolve({
            items,
            total
          })
        }, 1000)
      })
    },
    post: function () {
      this.$http.post('https://vueti-5ed25.firebaseio.com/customer_registry.json', this.customer).then(function (data) {
        this.items = []
        this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
          return data.json()
        }).then(function (data) {
          for (let key in data) {
            let elem = data[key]
            elem['superkey'] = key
            this.items.push(elem)
          }
        })
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
      for (var key in data) {
        let elem = data[key]
        elem['superkey'] = key
        if (this.accountNnumbers.indexOf(data[key].accountNnumber) > -1) {  // проверка на существование номмера клиента в массиве
          if (data[key].typeOfTransaction === 'Покупка мощности') {
            this.power[this.accountNnumbers.indexOf(data[key].accountNnumber)] = +this.power[this.accountNnumbers.indexOf(data[key].accountNnumber)] + +data[key].quantity
            this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] = +this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] + +data[key].summa
          }
          if (data[key].typeOfTransaction === 'Продажа мощности') {
            this.power[this.accountNnumbers.indexOf(data[key].accountNnumber)] = +this.power[this.accountNnumbers.indexOf(data[key].accountNnumber)] - +data[key].quantity
            this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] = +this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] - +data[key].summa
          }
          // this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] = +this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] + +data[key].summa
          // this.proportion[this.accountNnumbers.indexOf(data[key].accountNnumber)] = this.power[this.accountNnumbers.indexOf(data[key].accountNnumber)] / this.powerSum
        } else { // если нет добавляем этот номер в массив
          this.accountNnumbers.push(data[key].accountNnumber)
          this.power.push(+data[key].quantity)
          this.summaBTC.push(+data[key].summa)
        }
        // if (this.accountNnumbers.indexOf(data[key].accountNnumber) > -1) {  // проверка на существование номмера клиента в массиве
        //   this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] = +this.summaBTC[this.accountNnumbers.indexOf(data[key].accountNnumber)] + +data[key].summa
        // } else { // если нет добавляем этот номер в массив
        //   this.accountNnumbers.push(data[key].accountNnumber)
        //   this.summaBTC.push(+data[key].summa)
        // }
        this.transactions.push(elem)
      }
      for (var i = 0; i < this.power.length; i++) {
        this.powerSum = this.powerSum + parseInt(this.power[i])
        this.summaBTCSum += this.summaBTC[i]
        // this.summaBTCSum = this.summaBTCSum.substr(0, 4)
      }
      this.TotalFundBTC = Math.round(this.summaBTCSum * 10000) / 10000
      console.log(this.TotalFundBTC)
      this.quantityClients = this.accountNnumbers.length
      this.firebase.database().ref('customer_report').child('powerFund').set(this.powerSum)
      this.firebase.database().ref('customer_report').child('amoundTotalFundBTC').set(this.TotalFundBTC)
      this.firebase.database().ref('customer_report').child('quantityClients').set(this.quantityClients)
      for (var e = 0; e < this.summaBTC.length; e++) {
        this.proportion.push(100 * Math.floor(this.power[e] / this.powerSum * 10000) / 10000)
      }
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
        return data.json()
      }).then(function (data) {
        for (let key in data) {
          let elem = data[key]
          elem['superkey'] = key
          data[key]['fullName'] = (data[key]['surname'] + ' ' + data[key]['firstName'] + ' ' + data[key]['middleName'])
          if (this.accountNnumbers.indexOf(data[key].accountNnumber.toString()) > -1) {
            let index = this.accountNnumbers.indexOf(data[key].accountNnumber)
            this.firebase.database().ref('customer_registry').child(key).child('power').set(this.power[index])
            this.firebase.database().ref('customer_registry').child(key).child('summaBTC').set(this.summaBTC[index])
            this.firebase.database().ref('customer_registry').child(key).child('proportion').set(this.proportion[index])
          }
          if (data[key]['accountNnumber'] === '9999-000') {
            this.firebase.database().ref('customer_registry').child(key).child('power').set(this.powerSum)
            this.firebase.database().ref('customer_registry').child(key).child('summaBTC').set(this.summaBTCSum)
            this.firebase.database().ref('customer_registry').child(key).child('proportion').set(this.proportionSum)
          }
          this.superClients.push(elem)
        }
      // this.customer.accountNnumber = '9999-0' + (this.items.length + 1)
      })
    })
  }
}
</script>

<style>
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
/* 
button {
    font-size: 26px;
    font-weight: 700; 
    vertical-align: sub;
    margin-top: 30px;
    margin-bottom: 30px;
} */
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
  top: 10px;
  right: 40px;
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
.application--light .btn {
  color: #fff;
}
.account-number {
  color: rgba(0,0,0,0.54);
  font-size: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.54);
  padding: 15px 0 0 0;
  margin-bottom: 7px;
}
input {
  width: 100%;
}
section {
  width: 100%;
}
.application--light .picker .picker__title {
    background: #37474f;
}
table.table tbody td, table.table tbody th {
    height: 35px;
}
table.table thead th {
      font-size: 16px;
      font-weight: 700;
}
.primary th {
  text-align: center;
}
@media (min-width: 0) {
.text-xs-right {
    text-align: center !important;
}
}
</style>
