<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{info.departCity}} - {{info.destCity}}
        /
        {{info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="filterMachine">
          <!-- value 选项的值 -->
          <!-- label 选项的标签 -->
          <!-- el-option中选中的值会赋值给el-select 中v-model的data变量 -->
          <el-option
            v-for="(item,index) in options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="filterMachine">
          <el-option
            v-for="(item,index) in options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="filterMachine">
          <el-option
            v-for="(item,index) in options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="filterMachine">
          <el-option
            v-for="(item,index) in sizeList"
            :key="index"
            :label="item.name"
            :value="item.En"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Object,
    tranFlights: Array,
    info: Object,
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      sizeList: [
        {
          name: "大",
          En: "L",
        },
        {
          name: "中",
          En: "M",
        },
        {
          name: "小",
          En: "S",
        },
      ],
    };
  },
  methods: {
    //筛选航班信息
    filterMachine() {
      let newList = this.tranFlights;
      if (this.airport) {
        newList = newList.filter((item) => {
          return item.org_airport_name == this.airport;
        });
      }
      if (this.flightTimes) {
        newList = newList.filter((item) => {
          let depTime = item.dep_time.split(":")[0];
          let startHour = this.flightTimes.split(",")[0];
          let endHour = this.flightTimes.split(",")[1];
          return +depTime > +startHour && depTime < +endHour;
        });
      }
      if (this.company) {
        newList = newList.filter((item) => {
          return item.airline_name == this.company;
        });
      }
      if (this.airSize) {
        newList = newList.filter((item) => {
          return item.plane_size == this.airSize;
        });
      }

      this.$emit("transFilter", newList);
      console.log(newList);
    },
    handleFiltersCancel() {
      console.log(d);
    },
  },
  // 选择机场时候触发
  // handleAirport(value) {
  //   //   this.$emit("transFilter", value);
  //   console.log(this.airport);
  // },

  // // 选择出发时间时候触发
  // handleFlightTimes(value) {},

  // // 选择航空公司时候触发
  // handleCompany(value) {},

  // // 选择机型时候触发
  // handleAirSize(value) {},

  // 撤销条件时候触发
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>