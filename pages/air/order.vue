<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm
          v-if="infoData"
          :flightData="infoData"
          @transInsurance="getInsurance"
          @setAllPrice="setAllPrice "
        />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside
          v-if="infoData"
          :data="infoData"
          :InsuranceList="InsuranceList"
          :allPrice="allPrice"
        />
      </div>
    </el-row>
    <span>{{allPrice}}</span>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      // 机票信息
      // infoData: {
      //   insurances: [], // 初始化保险数据
      //   seat_infos: {}
      // },
      infoData: null, //改为null后，右侧的总价可以刚进页面就显示
      InsuranceList: [],
      allPrice: 0
    };
  },
  created() {
    const { query } = this.$route;
    this.$axios({
      url: "airs/" + query.id,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(res => {
      console.log(res.data);
      this.infoData = res.data;
      // this.setAllPrice();
    });
  },
  methods: {
    getInsurance(data) {
      this.InsuranceList = data;
      console.log(this.InsuranceList);
    },
    setAllPrice(price) {
      this.allPrice = price;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>