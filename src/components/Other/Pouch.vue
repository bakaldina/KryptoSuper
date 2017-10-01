<template>
    <section id="pouch">
        <h1>Кошелек</h1>
        <v-data-table v-bind:headers="headers" :items="items" hide-actions class="elevation-1">
            <template slot="items" scope="props">
                <td class="text-xs-right">
                    <img v-if="props.item.currency ==='BTC'" class="currency_icon" src="https://png.icons8.com/bitcoin/ultraviolet/20">
                    <img v-if="props.item.currency ==='USD'" class="currency_icon" src="https://png.icons8.com/us-dollar/ultraviolet/20">
                    <img v-if="props.item.currency ==='RUR'" class="currency_icon" src="https://png.icons8.com/ruble/ultraviolet/20">
                    {{ props.item.currency }}
                <!-- <svg v-if="props.item.currency ==='BTC'" style="width:24px;height:24px;vertical-align: bottom;" viewBox="0 0 24 24">
                    <path fill="#000000" d="M20,18H4V6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M11,17H13V16H14A1,1 0 0,0 15,15V12A1,1 0 0,0 14,11H11V10H15V8H13V7H11V8H10A1,1 0 0,0 9,9V12A1,1 0 0,0 10,13H13V14H9V16H11V17Z" />
                </svg> -->
                </td>
                <td class="text-xs-right">{{ props.item.available }}</td>
                <td class="text-xs-right">{{ props.item.total }}</td>
                <td class="text-xs-right">
                    <a class="btn wallet-operation deposit" href="#">&lt;&nbsp;Депозит</a>
                </td>
                <td class="text-xs-right">
                    <a class="btn wallet-operation withdraw" href="#">Вывод&nbsp;&gt;</a>
                </td>
            </template>
        </v-data-table>
        <!-- <div v-for="(pouch, index) in pouches" v-bind:key="pouch.index" class="hashrate">
            <p class="text">
                <img src="https://dn-bitmain.qbox.me/uploads/minner/currency/currency_image/1/bitcoin.png">
                {{ index }}
            </p>
            <p>{{pouch}}</p>
        </div> -->
    </section> 
</template>

<script>
// Imports

export default {
  data () {
    return {
      headers: [
        {text: 'Валюта', value: 'currency'},
        {text: 'Доступно', value: 'available'},
        {text: 'Итого', value: 'total'}
      ],
      items: []
      // pouches: {}
    }
  },
  created () {
    this.$http.get('https://vueti-5ed25.firebaseio.com/pouch.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      this.items = data
    })
  }
}
</script>

<style>
.currency_icon{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 10px;

}
.wallet-operation {
    background: #9ba1ab;
    color: #FFFFFF;
}
.btn {
    padding: 6px 10px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
}
</style>
