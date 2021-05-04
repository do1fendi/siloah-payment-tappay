<template>
  <b-container>
    <!-- {{ GET_APIDATA }} -->
    <Payment ref="paymentChild" />
  </b-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      dataPackage: {},
    }
  },
  computed: {
    ...mapGetters([
      'GET_USERNAME',
      'GET_PASSWORD',
      'GET_TOKEN',
      'GET_ORDERNUMBER',
      'GET_APIDATA',
    ]),
    ...mapMutations(['SET_TOKEN', 'SET_ORDERNUMBER', 'SET_APIDATA', 'SET_RECORDID']),
  },

  mounted() {
    this.$nextTick(() => {
      this.getToken()
      this.$store.commit('SET_ORDERNUMBER', this.$route.query.orderNumber)
    })
  },

  methods: {
    getToken() {
      const config = {
        method: 'POST',
        url:
          'https://ofc.taiwanviptravel.com/fmi/data/v1/databases/TVT/sessions',
        headers: {
          Authorization:
            `Basic ` + btoa(`${this.GET_USERNAME}:${this.GET_PASSWORD}`),
          'Content-Type': 'application/json',
        },
        data: {},
      }
      const apiGetToken = async () => {
        const res = await this.$axios(config)
        const data = await res.data.response
        // console.log(data)
        this.$store.commit('SET_TOKEN', data.token)
        this.getOrder()
      }
      apiGetToken()
    },
    getOrder() {
      const query = JSON.stringify({
        query: [
          {
            RS_salesNumber: this.$route.query.orderNumber,
          },
        ],
      })
      const config = {
        method: 'POST',
        url:
          'https://ofc.taiwanviptravel.com/fmi/data/v1/databases/TVT/layouts/DATA_API_SALESORDER/_find',
        headers: {
          Authorization: `Bearer ${this.GET_TOKEN}`,
          'Content-Type': 'application/json',
        },
        data: query,
      }
      const apiGetPackage = async () => {
        const res = await this.$axios(config)
        const data = await res.data.response.data[0].fieldData
        this.dataPackage = data
        // this.$store.commit('SET_APIDATA', JSON.stringify(data).toString().replace(/\\/g,''))
        this.$store.commit('SET_APIDATA', data.json_byNumber.replace(/\\/g, ''))
        // console.log(data)
        this.$store.commit('SET_RECORDID', res.data.response.data[0].recordId)
        this.$refs.paymentChild.setFields()
        this.$store.commit('SET_BUSY', false)
      }
      apiGetPackage()
    },
  },
}
</script>

<style>
</style>
