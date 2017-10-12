<template>
    <section id="REPORT">
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
        <h2>Отчет фонда</h2>
        <!-- <v-data-table
        hide-actions
        class=""
        > -->
        <v-data-table
            v-bind:headers="headers"
            :items="items"
            hide-actions
            class="elevation-1 clients-table"
        >
        <template>
            <tr align="center">
                <td class="text-xs-right"><input :value="props.item.miningItem"></td>
                <td class="text-xs-right"><input :value="props.item.miningItem">Значение</td>
            </tr>
            <tr align="center">
                <td>Ячейка 2</td>
                <td>Значение</td>
            </tr>
        </template>
        </v-data-table>
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
    //   modal: false,
      firebase: firebase,
    //   isOpen: false,
    //   showModal: false,
      active: null,
      rating: {
        clientsBTC: '',
        amountExchange: '',
        amountHashnest: '',
        amountTotal: '',
        difference: '',
        commissionManagement: '',
        commissionDay: '',
        commissionTotal: '',
        fundBTC: '',
        rounding: '',
        powerFund: '',
        quantityClients: '',
        amoundTotalFund: '',
        amountPayout: ''
      },
      headers: [
        // { text: 'Дата', value: 'date' },
        // { text: 'Майнинг', value: 'miningItem' },
        // { text: 'Pay out', value: 'payOut' },
        // { text: 'Maintence', value: 'maintence' },
        // { text: 'Размер Fee day, %', value: 'feeDayItem' },
        // { text: 'Fee day', value: 'feeDay' },
        // { text: 'Курс BTC', value: 'сoursesBTC' },
        // { text: 'Курс USD', value: 'сoursesUSD' },
        // { text: 'Удалить', value: 'Remove' }
      ],
      items: [],
      valid: false
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
    // removeClient: function (key) {
    //   let db = this.firebase.database()
    //   db.ref('customer_mining').child(key).remove()
    //   console.log(this.items)
    //   this.items = []
    //   this.$http.get('https://vueti-5ed25.firebaseio.com/customer_report.json').then(function (data) {
    //     return data.json()
    //   }).then(function (data) {
    //     for (let key in data) {
    //       let elem = data[key]
    //       elem['superkey'] = key
    //       this.items.push(elem)
    //     }
    //   })
    // },
    // editClient: function (event, base, index, param) {
    //   let db = this.firebase.database()
    //   db.ref(base).child(index).child(param).set(event.target.value)
    //   this.items = []
    //   this.$http.get('https://vueti-5ed25.firebaseio.com/customer_report.json').then(function (data) {
    //     return data.json()
    //   }).then(function (data) {
    //     for (let key in data) {
    //       let elem = data[key]
    //       elem['superkey'] = key
    //       this.items.push(elem)
    //     }
    //   })
    // },
    // postMining: function () {
    //   this.$http.post('https://vueti-5ed25.firebaseio.com/customer_report.json', this.mining).then(function (data) {
    //     console.log(data)
    //     this.showModal = false
    //   })
    // },
//     submit () {
//       if (this.$refs.formachka.validate()) {
//         this.$refs.formachka.$el.submit()
//       }
//     },
//     clear () {
//       this.$refs.formachka.reset()
//     }
//   },
//   created () {
//     this.$http.get('https://vueti-5ed25.firebaseio.com/customer_report.json').then(function (data) {
//       return data.json()
//     }).then(function (data) {
//       for (let key in data) {
//         let elem = data[key]
//         elem['superkey'] = key
//         this.items.push(elem)
//       }
//     })
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
</style>
