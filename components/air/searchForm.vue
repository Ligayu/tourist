<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form :model="form" class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="defaultdepCity"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <!-- :trigger-on-focus="false"当输入时才显示下拉选择框 -->
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          @blur="defaultdesCity"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      currentCity: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index;
    },

    getCityList(value) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value
        },
        method: "get"
      }).then(res => {
        // console.log(res.data);
        let cityList = res.data.data.map(city => {
          return {
            value: city.name,
            code: city.sort
          };
        });
        return cityList.filter(item => {
          return item.code; //过滤code:city.sort为null的城市
        });
      });
      //   this.currentCity = cityList;
    },
    //失去焦点时默认出发城市
    defaultdepCity() {
      //   console.log(this.currentCity[0]);
      this.form.departCity = this.currentCity[0].value;
      this.form.departCode = this.currentCity[0].code;
    },
    //失去焦点时默认目的城市
    defaultdesCity() {
      this.form.destCity = this.currentCity[0].value;
      this.form.destCode = this.currentCity[0].code;
      //   console.log(this.currentCity[0]);
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, showCity) {
      this.getCityList(value).then(cityList => {
        showCity(cityList);
        this.currentCity = cityList; //将出发城市的信息存好，供输入框失去焦点时使用
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, showCity) {
      this.getCityList(value).then(cityList => {
        showCity(cityList);
        this.currentCity = cityList; //将目标城市的信息存好，供输入框失去焦点时使用
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.code;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.code;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      let tempCity = this.form.departCity;
      this.form.departCity = this.form.destCity;
      this.form.destCity = tempCity;

      let tempCode = this.form.departCode;
      this.form.departCode = this.form.destCode;
      this.form.destCode = tempCode;
    },

    // 提交表单是触发
    handleSubmit() {
      const form = {
        departCity: this.form.departCity.replace(/市$/, ""),
        departCode: this.form.departCode,
        destCity: this.form.destCity.replace(/市$/, ""),
        destCode: this.form.destCode,
        departDate: this.form.departDate
      };
      this.$router.push({
        path: "/air/flights",
        query: form
      });
      console.log(form);
      this.$store.commit("history/setHistory", form);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>