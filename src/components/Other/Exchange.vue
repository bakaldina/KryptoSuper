<template>
    <section id="exchange">
        <h1>Обмен</h1>
        <table cellspacing="0" cellpadding="0" border="1" width="100%">
            <tr>
                <th>Дата</th>
                <th>BTC</th>
                <th>USD</th>
            </tr>
            <tr align="center">
                <td>{{ items[0].DATE }}</td>
                <td>{{ items[0].BTC }}</td>
                <td>{{ items[0].USD }}</td>
            </tr>
        </table>

        
    </section>
</template>

<script>
// Imports

export default {
  data () {
    return {
      items: [{
        DATE: '',
        BTC: '',
        USD: ''
      }]
    }
  },
  created () {
    this.$http.get('https://crypto-managment.firebaseio.com/currency.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      this.items[0].DATE = data.DATE
      this.items[0].BTC = data.BTC
      this.items[0].USD = data.USD
    })
  }
}
</script>

<style scoped>
td {
    padding: 20px;
    font-size: 20px;
}
th {
    font-size: 25px;
}
</style>
