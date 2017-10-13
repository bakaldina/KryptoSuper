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
        <h1>Отчет фонда</h1>
        <table class="report-table" cellspacing="0" cellpadding="0" border="1" width="100%">
            <tr>
                <th>Клиентский BTC</th>
                <td>{{ report.clientsBTC }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Сумма на бирже</th>
                <td>{{ report.amountExchange }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Общая сумма</th>
                <td>{{ report.amountTotal }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Разница</th>
                <td>{{ report.difference }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Комиссия управления</th>
                <td>{{ report.commissionManagement }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Комиссия дня</th>
                <td>{{ report.commissionDay }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Округление</th>
                <td>{{ report.rounding }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Общая комиссия</th>
                <td>{{ report.commissionTotal }}</td>
                <td></td>
            </tr>
            <tr>
                <th>BTC фонда</th>
                <td>{{ report.fundBTC }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Общая мощность фонда</th>
                <td>{{ report.powerFund }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Количество клиентов</th>
                <td>{{ report.quantityClients }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Общая сумма привлеченных средств в BTC</th>
                <td>{{ report.amoundTotalFundBTC }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Общая сумма привлеченных средств в RUR</th>
                <td>{{ report.amoundTotalFundRUR }}</td>
                <td></td>
            </tr>
            <tr>
                <th>Общая сумма выплат</th>
                <td>{{ report.amountPayout }}</td>
                <td></td>
            </tr>
        </table>
    </section>
</template>

<script>
// Imports
import firebase from 'firebase'

export default {
  data () {
    return {
      report: {
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
        amoundTotalFundBTC: '',
        amoundTotalFundRUR: '',
        amountPayout: ''
      },
      firebase: firebase,
      menuItems: [
        {icon: 'group', title: 'Клиенты', link: '/contracts'},
        {icon: 'query_builder', title: 'Транзакции', link: '/trans'},
        {icon: 'desktop_windows', title: 'Майнинг', link: '/mining'},
        {icon: 'insert_drive_file', title: 'Отчет фонда', link: '/report'}
      ]
    //   headers: [
    //     { text: 'Клиентский BTC', value: 'clientsBTC' },
    //     { text: 'Сумма на бирже', value: 'amountExchange' },
    //     { text: 'Сумма на HasnNest', value: 'amountHashnest' },
    //     { text: 'Общая сумма', value: 'amountTotal' },
    //     { text: 'Разница', value: 'difference' },
    //     { text: 'Комиссия управления', value: 'commissionManagement' },
    //     { text: 'Комиссия дня', value: 'commissionDay' },
    //     { text: 'Округление', value: 'rounding' },
    //     { text: 'Общая комиссия', value: 'commissionTotal' },
    //     { text: 'BTC фонда', value: 'fundBTC' },
    //     { text: 'Общая мощность фонда', value: 'powerFund' },
    //     { text: 'Количество клиентов', value: 'quantityClients' },
    //     { text: 'Общая сумма привлеченных средств', value: 'amoundTotalFund' },
    //     { text: 'Общая сумма выплат', value: 'amountPayout' }

    //   ],
    }
  },
//   methods: {
//     logout: function () {
//       firebase.auth().signOut().then(() => {
//         this.$router.replace('login')
//       })
//     },
  created () {
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_report.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      console.log(data)
      this.report.powerFund = data.powerFund
      this.report.amoundTotalFundBTC = data.amoundTotalFundBTC
      this.report.amountExchange = data.amountExchange
      this.report.quantityClients = data.quantityClients
    })
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
table.report-table {
    width: 70%;
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
td {
    padding: 0 20px;
    text-align: left;
    font-size: 20px;
}
th {
    padding: 0 40px;
    font-size: 20px;
    text-align: left;
    width: 70%;
}
</style>
