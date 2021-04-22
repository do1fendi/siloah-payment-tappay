<template>
  <b-container class="text-center mt-3">
    <div v-if="GET_PAYMENTSTATUS == 0" class="thank">
      <b-alert variant="success" show>
        <h1>Payment Success / 成功</h1>
      </b-alert>
      <div class="detail mt-5 text-left w-50">
        <h4 class="mb-4">Detail Transaction</h4>
        <p>Order Number: {{ GET_ORDERNUMBER }}</p>
        <p>Adult: {{ JSON.parse(GET_APIDATA).adultNum }}</p>
        <p>Kid: {{ JSON.parse(GET_APIDATA).kidNum }}</p>
        <p>Total Price: {{ JSON.parse(GET_APIDATA).totalPrice }} TWD</p>
      </div>
      <h3 class="mt-5">
        Check another Itinerary. at
        <a href="https://www.taiwanviptravel.com">here</a>
      </h3>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'GET_PAYMENTSTATUS',
      'GET_ORDERNUMBER',
      'GET_APIDATA',
      'GET_RECORDID',
      'GET_TOKEN',
    ]),
  },
  mounted() {
    if (this.GET_PAYMENTSTATUS === 0) {
      const query = JSON.stringify({
        query: [
          {
            RS_salesNumber: this.GET_ORDERNUMBER,
          },
        ],
        script: 'update_payment',
        'script.param': this.GET_ORDERNUMBER,
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
        const data = await res.data.response
        console.log(data)
      }
      apiGetPackage()
    } else {
      window.location.href = 'https://www.taiwanviptravel.com'
    }
  },
}
</script>

<style scoped>
.detail {
  margin-left: auto;
  margin-right: auto;
}
p {
  font-size: 18px;
  font-weight: 600;
}
</style>