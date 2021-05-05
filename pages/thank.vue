<template>
  <b-container class="text-center mt-3">
    <div v-if="GET_PAYMENTSTATUS == 0" class="thank">
      <b-alert variant="success" show>
        <h1>Payment Success / 成功</h1>
      </b-alert>
      <div class="detail mt-5 text-left w-75">
        <h4 class="mb-4">Detail / 訂單資訊</h4>
        <hr>
        <p>Order / 訂單編號: {{ GET_ORDERNUMBER }}</p>
        <p>Adult / 成人: {{ JSON.parse(GET_APIDATA).adultNum }}</p>
        <p>Kid / 小孩: {{ JSON.parse(GET_APIDATA).kidNum }}</p>
        <p>
          Total Price / 總額:
          {{
            JSON.parse(GET_APIDATA)
              .totalPrice.toString()
              .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,')
          }}
          TWD
        </p>
      </div>
      <b-alert variant="danger" show class="text-left mt-5">
        <p>※訂購郵輪費用與機票銷售模式相同為浮動價格※</p>
        <p>※下訂付款後，將有專員與您聯絡需補之訂房差額※</p>
        <p>※如訂房差額無法接受，將全額退款※</p>
        <p>
          ※此為特殊航次，一旦訂位完成，則為保證住房，若取消須收取消費用100%※
        </p>
      </b-alert>
      <h3 class="mt-5">       
        <a href="https://www.taiwanviptravel.com"><b-button variant="primary">回首頁看其它商品</b-button></a>
      </h3>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: {
    adultNum: 0,
    kidNum: 0,
  },
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
    // if (this.GET_PAYMENTSTATUS === 0) {
    //   const query = JSON.stringify({
    //     query: [
    //       {
    //         RS_salesNumber: this.GET_ORDERNUMBER,
    //       },
    //     ],
    //     script: 'update_payment',
    //     'script.param': this.GET_ORDERNUMBER,
    //   })
    //   const config = {
    //     method: 'POST',
    //     url:
    //       'https://ofc.taiwanviptravel.com/fmi/data/v1/databases/TVT/layouts/DATA_API_SALESORDER/_find',
    //     headers: {
    //       Authorization: `Bearer ${this.GET_TOKEN}`,
    //       'Content-Type': 'application/json',
    //     },
    //     data: query,
    //   }
    //   const apiGetPackage = async () => {
    //     const res = await this.$axios(config)
    //     const data = await res.data.response
    //     console.log(data)
    //   }
    //   apiGetPackage()
    // } else {
    //   window.location.href = 'https://www.taiwanviptravel.com'
    // }
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