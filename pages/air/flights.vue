<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content" v-if="flightsData.options">
        <!-- 过滤条件 -->
        <FlightsFilters
          :options="flightsData.options"
          :info="flightsData.info"
          :tranFlights="cacheFlightsList"
          @transFilter="filterList"
        />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div v-if="dataList.length==0">没有航班信息!</div>
        <FlightsItem v-for="item in dataList" :key="item.id" :data="item" />
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.flights.length"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 航班总数据
      cacheFlightsList: [],
      // dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1, // 当前页数
      pageSize: 10 // 显示条数
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    this.getData();
  },
  computed: {
    dataList() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.flightsData.flights.slice(start, end);
    }
  },
  watch: {
    $route() {
      //从历史页传过来的？后的数据
      this.getData();
    }
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query //nuxt-link的跳转方式也是使用this.$route.query或this.$route.params获取
      }).then(res => {
        this.flightsData = res.data;
        this.cacheFlightsList = res.data.flights;
        console.log(this.flightsData);
      });
    },
    filterList(newList) {
      this.flightsData.flights = newList;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      this.pageIndex = currentPage;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>