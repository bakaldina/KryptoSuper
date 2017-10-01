<template>
    <section id="hashrate">
        <h1>Хэшрейт</h1>
        <v-tabs dark fixed centered>
                <v-tabs-bar class="cyan">
                <v-tabs-slider class="border"></v-tabs-slider>
                <v-tabs-item
                v-for="i in 2"
                :key="i"
                :href="'#tab-' + i"
            >
                {{ items[i-1] }} 
            </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-items>
            <v-tabs-content
                v-for="i in 2"
                :key="i"
                :id="'tab-' + i"
            >
                <v-card flat>
                <v-card-text>{{ text [i-1] }}</v-card-text>
                </v-card>
            </v-tabs-content>
            </v-tabs-items>
        </v-tabs>
    </section>
</template>

<script>

export default {
  name: 'hash',
  data () {
    return {
      // hashrates: {},
      items: ['Баланс счета', 'Статистика счета'],
      text: ['Раздел в разработке!', 'Раздел в разработке!']
    }
  },
  created () {
    this.$http.get('https://vueti-5ed25.firebaseio.com/hashrate.json').then(function (data) {
      return data.json()
    }).then(function (data) {
      this.hashrates = data
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
