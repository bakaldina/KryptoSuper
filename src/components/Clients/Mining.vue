<template>
    <section id="MINING">
        <div class="main_menu"><v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
        </v-btn></div>
        <br>
        <button class="new-client">Данные по майнингу</button> 
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
        no-data-text="Нет данных для отображения"
        class="elevation-1 clients-table"
        >
        <template slot="items" scope="props" >
            <td class="text-xs-right"><input :value="props.item.date" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'date')"></td>
            <td class="text-xs-right"><input :value="props.item.miningItem" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'miningItem')"></td>
            <td class="text-xs-right"><input :value="props.item.payOut" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'payOut')"></td>
            <td class="text-xs-right"><input :value="props.item.maintence" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'maintence')"></td>
            <td class="text-xs-right"><input :value="props.item.feeDayItem" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'feeDayItem')"></td>
            <td class="text-xs-right"><input :value="props.item.feeDay" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'feeDay')"></td>
            <td class="text-xs-right"><input :value="props.item.сoursesBTC" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'сoursesBTC')"></td>
            <td class="text-xs-right"><input :value="props.item.сoursesUSD" @keyup.enter="editClient($event, 'customer_mining', props.item.superkey, 'сoursesUSD')"></td>
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
                      v-model="mining.date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker  locale="ru-RU" date-format='DD-MM-YYYY' v-model="mining.date" scrollable >
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Отмена</v-btn>
                          <v-btn flat primary @click.native="save()">Сохранить</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>

                    <v-text-field
                    label="Майнинг"
                    v-model="mining.miningItem"
                    ></v-text-field>

                    <v-text-field
                    label="Payout"
                    v-model="mining.payOut"
                    ></v-text-field>

                    <v-text-field
                    label="Maintence"
                    v-model="mining.maintence"
                    ></v-text-field>

                    <v-text-field
                    label="Размер Fee day, %"
                    v-model="mining.feeDayItem"
                    ></v-text-field>

                    <v-text-field
                    label="Курс BTC"
                    required
                    v-model="mining.сoursesBTC"
                    ></v-text-field>

                    <v-text-field
                    label="Курс USD"
                    v-model="mining.сoursesUSD"
                    ></v-text-field>

                    <v-btn class="form-button" @click="postMining" :class="{ green: valid, red: !valid }">Подтвердить</v-btn>
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
      pagination: { sortBy: 'date', page: 1, rowsPerPage: 25, descending: true, totalItems: 0 },
      massiv: [10, 25, 50, { text: 'Все', value: -1 }],
      mining: {
        date: '',
        payOut: '',
        maintence: '',
        feeDay: '',
        сoursesBTC: '',
        сoursesUSD: ''
      },
      headers: [
        { text: 'Дата', value: 'date' },
        { text: 'Майнинг', value: 'miningItem' },
        { text: 'Pay out', value: 'payOut' },
        { text: 'Maintence', value: 'maintence' },
        { text: 'Размер Fee day, %', value: 'feeDayItem' },
        { text: 'Fee day', value: 'feeDay' },
        { text: 'Курс BTC', value: 'сoursesBTC' },
        { text: 'Курс USD', value: 'сoursesUSD' },
        { text: 'Удалить', value: 'Remove' }
      ],
      items: [],
      valid: false
    }
  },
  // watch: {
  //   pagination: {
  //     handler () {
  //       this.getDataFromApi()
  //         .then(data => {
  //           this.items = data.items
  //           this.totalItems = data.total
  //         })
  //     },
  //     deep: true
  //   }
  // },
  // mounted () {
  //   this.getDataFromApi()
  //     .then(data => {
  //       this.items = data.items
  //       this.totalItems = data.total
  //     })
  // },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    removeClient: function (key) {
      let db = this.firebase.database()
      db.ref('customer_mining').child(key).remove()
      this.items = []
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_mining.json').then(function (data) {
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
      this.$http.get('https://vueti-5ed25.firebaseio.com/customer_mining.json').then(function (data) {
        return data.json()
      }).then(function (data) {
        for (let key in data) {
          let elem = data[key]
          elem['superkey'] = key
          this.items.push(elem)
        }
      })
    },
    // getDataFromApi () {
    //   this.loading = true
    //   return new Promise((resolve, reject) => {
    //     const { sortBy, descending, page, rowsPerPage } = this.pagination

    //     let items = this.getDesserts()
    //     const total = items.length

    //     if (this.pagination.sortBy) {
    //       items = items.sort((a, b) => {
    //         const sortA = a[sortBy]
    //         const sortB = b[sortBy]

    //         if (descending) {
    //           if (sortA < sortB) return 1
    //           if (sortA > sortB) return -1
    //           return 0
    //         } else {
    //           if (sortA < sortB) return -1
    //           if (sortA > sortB) return 1
    //           return 0
    //         }
    //       })
    //     }
    //     if (rowsPerPage > 0) {
    //       items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    //     }
    //     setTimeout(() => {
    //       this.loading = false
    //       resolve({
    //         items,
    //         total
    //       })
    //     }, 1000)
    //   })
    // },
    postMining: function () {
      this.$http.post('https://vueti-5ed25.firebaseio.com/customer_mining.json', this.mining).then(function (data) {
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
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_mining.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      console.log(data)
      for (let key in data) {
        let elem = data[key]
        elem['superkey'] = key
        if ((data[key]['date'] === '2017-08-14') || (data[key]['date'] === '2017-08-15') || (data[key]['date'] === '2017-08-16') || (data[key]['date'] === '2017-08-17') || (data[key]['date'] === '2017-08-18') || (data[key]['date'] === '2017-08-19') || (data[key]['date'] === '2017-08-20') || (data[key]['date'] === '2017-08-21') || (data[key]['date'] === '2017-08-22') || (data[key]['date'] === '2017-08-23') || (data[key]['date'] === '2017-08-24') || (data[key]['date'] === '2017-08-25') || (data[key]['date'] === '2017-08-26')) {
          data[key]['feeDay'] = +data[key]['feeDayItem'] / 100 * +data[key]['payOut']
          data[key]['feeDay'] = Math.round(data[key]['feeDay'] * 100000000) / 100000000
          this.firebase.database().ref('customer_mining').child(key).child('feeDay').set(data[key]['feeDay'])
        } else {
          data[key]['feeDay'] = +data[key]['feeDayItem'] / 100 * +data[key]['payOut']
          data[key]['feeDay'] = Math.ceil(data[key]['feeDay'] * 1000000) / 1000000
          this.firebase.database().ref('customer_mining').child(key).child('feeDay').set(data[key]['feeDay'])
        }
        if ((data[key]['date'] === '2017-07-14') || (data[key]['date'] === '2017-07-15') || (data[key]['date'] === '2017-07-16') || (data[key]['date'] === '2017-07-17') || (data[key]['date'] === '2017-07-18') || (data[key]['date'] === '2017-07-19') || (data[key]['date'] === '2017-07-20') || (data[key]['date'] === '2017-07-21') || (data[key]['date'] === '2017-07-22') || (data[key]['date'] === '2017-07-23') || (data[key]['date'] === '2017-07-24') || (data[key]['date'] === '2017-07-25') || (data[key]['date'] === '2017-07-26') || (data[key]['date'] === '2017-07-27') || (data[key]['date'] === '2017-07-28') || (data[key]['date'] === '2017-07-29') || (data[key]['date'] === '2017-07-30') || (data[key]['date'] === '2017-07-31') || (data[key]['date'] === '2017-08-01') || (data[key]['date'] === '2017-08-02') || (data[key]['date'] === '2017-08-03') || (data[key]['date'] === '2017-08-04') || (data[key]['date'] === '2017-08-05') || (data[key]['date'] === '2017-08-06') || (data[key]['date'] === '2017-08-07') || (data[key]['date'] === '2017-08-08') || (data[key]['date'] === '2017-08-09') || (data[key]['date'] === '2017-08-10') || (data[key]['date'] === '2017-08-11') || (data[key]['date'] === '2017-08-12') || (data[key]['date'] === '2017-08-13') || (data[key]['date'] === '2017-08-14') || (data[key]['date'] === '2017-08-15') || (data[key]['date'] === '2017-08-16') || (data[key]['date'] === '2017-08-17') || (data[key]['date'] === '2017-08-18') || (data[key]['date'] === '2017-08-19') || (data[key]['date'] === '2017-08-20') || (data[key]['date'] === '2017-08-21') || (data[key]['date'] === '2017-08-22') || (data[key]['date'] === '2017-08-23') || (data[key]['date'] === '2017-08-24') || (data[key]['date'] === '2017-08-25') || (data[key]['date'] === '2017-08-26') || (data[key]['date'] === '2017-08-27') || (data[key]['date'] === '2017-08-28') || (data[key]['date'] === '2017-08-29') || (data[key]['date'] === '2017-08-30') || (data[key]['date'] === '2017-08-31') || (data[key]['date'] === '2017-09-01') || (data[key]['date'] === '2017-09-02') || (data[key]['date'] === '2017-09-03') || (data[key]['date'] === '2017-09-04') || (data[key]['date'] === '2017-09-05') || (data[key]['date'] === '2017-09-06') || (data[key]['date'] === '2017-09-07') || (data[key]['date'] === '2017-09-08') || (data[key]['date'] === '2017-09-09') || (data[key]['date'] === '2017-09-10') || (data[key]['date'] === '2017-09-11') || (data[key]['date'] === '2017-09-12') || (data[key]['date'] === '2017-09-13') || (data[key]['date'] === '2017-09-14') || (data[key]['date'] === '2017-09-15') || (data[key]['date'] === '2017-09-16') || (data[key]['date'] === '2017-09-17') || (data[key]['date'] === '2017-09-18') || (data[key]['date'] === '2017-09-19') || (data[key]['date'] === '2017-09-20') || (data[key]['date'] === '2017-09-21') || (data[key]['date'] === '2017-09-22') || (data[key]['date'] === '2017-09-23') || (data[key]['date'] === '2017-09-24') || (data[key]['date'] === '2017-09-25') || (data[key]['date'] === '2017-09-26') || (data[key]['date'] === '2017-09-27') || (data[key]['date'] === '2017-09-28') || (data[key]['date'] === '2017-09-29') || (data[key]['date'] === '2017-09-30')) {
          data[key]['miningItem'] = Math.floor((+data[key]['payOut'] - +data[key]['maintence'] - +data[key]['feeDay']) * 100000) / 1000000
          console.log(data[key]['miningItem'])
        } else {
          data[key]['miningItem'] = Math.floor((+data[key]['payOut'] - +data[key]['maintence'] - +data[key]['feeDay']) * 10000) / 10000
          console.log(data[key]['miningItem'])
        }
        this.firebase.database().ref('customer_mining').child(key).child('miningItem').set(data[key]['miningItem'])
        this.items.push(elem)
      }
    })
    this.mining.date = moment().format('YYYY-MM-DD')
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
table.table tbody td, table.table tbody th {
    height: 35px;
}
</style>
