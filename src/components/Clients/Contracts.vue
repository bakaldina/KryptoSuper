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
        <v-btn v-on:click='showModal = !showModal' fab dark class="indigo">
            <v-icon dark>add</v-icon>
        </v-btn>

        <v-data-table
        v-bind:headers="headers"
        :items="items"
        hide-actions
        class="elevation-1 clients-table"
        >
        <template slot="items" scope="props" >
            <td ><input :value="props.item.accountNnumber" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'accountNnumber')"></td>
            <td class="text-xs-right"><input :value="props.item.surname" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'surname')"></td>
            <td class="text-xs-right"><input :value="props.item.firstName" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'firstName')"></td>
            <td class="text-xs-right"><input :value="props.item.middleName" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'middleName')"></td>
            <td class="text-xs-right"><input :value="props.item.email" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'email')"></td>
            <td class="text-xs-right"><input :value="props.item.dateOfAccountOpening" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'dateOfAccountOpening')"></td>
            <td class="text-xs-right"><input :value="props.item.amountOfCommission" @keyup.enter="editClient($event, 'customer_registry', props.item.superkey, 'amountOfCommission')"></td>
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
                    <v-date-picker  locale="ru-RU" v-model="customer.dateOfAccountOpening" scrollable >
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
                    required
                    :mask="'(##) ####-####'"
                    v-model="customer.phone"
                    ></v-text-field>

                    <v-text-field
                    label="Размер комиссии"
                    v-model="customer.amountOfCommission"
                    ></v-text-field>

                    <v-btn class="form-button" @click="post" :class="{ green: valid, red: !valid }">Подтвердить</v-btn>
                    <v-btn class="form-button" @click="clear">Очистка</v-btn>
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
        {icon: 'desktop_windows', title: 'Майнинг', link: '/mining'}
      ],
      menu: false,
      modal: false,
      firebase: firebase,
      isOpen: false,
      showModal: false,
      active: null,
      customer: {
        accountNnumber: '',
        dateOfAccountOpening: '',
        email: '',
        firstName: '',
        middleName: '',
        surname: '',
        amountOfCommission: ''
      },
      headers: [
        { text: 'Номер', value: 'accountNnumber' },
        { text: 'Фамилия', value: 'surname' },
        { text: 'Имя', value: 'firstName' },
        { text: 'Отчество', value: 'middleName' },
        { text: 'Почта', value: 'email' },
        { text: 'Дата открытия', value: 'dateOfAccountOpening' },
        { text: 'Комиссия, %', value: 'amountOfCommission' },
        { text: 'Удалить', value: 'Remove' }
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
    },
    removeClient: function (key) {
      let db = this.firebase.database()
      db.ref('customer_registry').child(key).remove()
      console.log(this.items)
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
      // let clientsRef = db.ref("customer_registry");
      // clientsRef.child(entryId).set("30%");
      // this.$firebaseRefs.clientsRef.child(client['.key']).set(entry);
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
      console.log(this.$refs)
      console.log(this.$refs.formachka)
      this.$refs.formachka.reset()
    }
  },
  created () {
    this.$http.get('https://vueti-5ed25.firebaseio.com/customer_registry.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      for (let key in data) {
        let elem = data[key]
        elem['superkey'] = key
        this.items.push(elem)
      }
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
</style>
