<template>
  <div class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: $route.path }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: $route.query.cityName+'酒店预订' }"
        >{{$route.query.cityName+'酒店预订'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form v-model="selectData">
      <div class="select">
        <!-- <el-input class="input" v-model="selectData.input" placeholder="切换城市"></el-input> -->
        <el-autocomplete
          class="input"
          v-model="selectData.input"
          :fetch-suggestions="queryCitySearch"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          placeholder="切换城市"
          @select="citySelect"
        ></el-autocomplete>
        <el-date-picker
          class="date"
          v-model="selectData.date"
          type="daterange"
          range-separator="~~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-popover placement="bottom" width="360" trigger="click" v-model="visible">
          <el-input
            placeholder="人数未定"
            v-model="selectData.persons"
            :readonly="true"
            highlight-first-item="true"
            slot="reference"
          >
            <i slot="suffix" class="iconfont icon-ren1"></i>
          </el-input>
          <div class="show">
            <div style="display:flex">
              <div style="width:60px;line-height:40px;height:40px;margin-right:80px">每间</div>
              <el-select v-model="selectData.adults" placeholder="请选择" @change="selectAdult">
                <el-option
                  v-for="item in selectData.adultList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="selectData.childs" placeholder="请选择" @change="selectChild">
                <el-option
                  v-for="item in selectData.childList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="showBottom">
              <el-button type="primary" size="mini" @click="setPerson">确定</el-button>
            </div>
          </div>
        </el-popover>
        <el-button type="primary" class="checkPriceBtn" @click="checkPrice">查看价格</el-button>
      </div>
    </el-form>
    <div class="con">
      <div class="con_left">
        <el-row class="area">
          <el-row class="areaLeft">区域：</el-row>
          <div class="areaRight" ref="heightStyle">
            <ul v-if="areaList">
              <li v-for="item in areaList" :key="item.id">{{item.name}}</li>
            </ul>
          </div>
        </el-row>
        <div class="areaDrapdown" @click="changArea">
          <i v-if="up" class="iconfont icon-xiangxiazhishijiantou"></i>
          <i v-else class="iconfont icon-xiangshangzhishijiantou"></i>
          <span>等32个区域</span>
        </div>
        <div class="averagePrice">
          <div class="averageLeft">均价：</div>
          <div class="averageRight">
            <div class="score">
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <span>￥322</span>
            </div>
            <div class="score">
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <span>￥322</span>
            </div>
            <div class="score">
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <span>￥322</span>
            </div>
            <div class="score">
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <i class="iconfont icon-huangguang1"></i>
              <span>￥322</span>
            </div>
          </div>
        </div>
      </div>
      <div class="con_right">
        <div id="container" style="width:386px; height:300px;"></div>
      </div>
    </div>

    <!-- 酒店条件筛选栏 -->
    <el-form class="selectBar">
      <div class="priceSlider">
        <span class="demonstration">价格</span>
        <el-slider :max="2000" v-model="hotelData.price"></el-slider>
      </div>
      <div class="level" v-if="hotelOptions">
        <div class="levelTip">住宿等级</div>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link dropDownHeigh">
            不限
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="levels" @change="changeSelect">
              <el-dropdown-item v-for="(item,index) in hotelOptions.levels" :key="index">
                <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="level" v-if="hotelOptions">
        <div class="levelTip">住宿类型</div>
        <el-dropdown>
          <span class="el-dropdown-link dropDownHeigh">
            不限
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="hotelType" @change="changeSelect">
              <el-dropdown-item v-for="(item,index) in hotelOptions.types" :key="index">
                <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="level" v-if="hotelOptions">
        <div class="levelTip">酒店设施</div>
        <el-dropdown>
          <span class="el-dropdown-link dropDownHeigh">
            不限
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="hotelasset" @change="changeSelect">
              <el-dropdown-item v-for="(item,index) in hotelOptions.assets" :key="index">
                <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="level" v-if="hotelOptions">
        <div class="levelTip">酒店品牌</div>
        <el-dropdown :hide-on-click="false" trigger="hover">
          <span class="el-dropdown-link dropDownHeigh">
            不限
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="brand" @change="changeSelect">
              <el-dropdown-item v-for="(item,index) in hotelOptions.brands" :key="index">
                <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="hotelSelectBtn">
        <el-button type="primary">撤销条件</el-button>
      </div>
    </el-form>

    <!-- 酒店详情内容 -->
    <div
      class="hotelContent"
      v-for="(item,index) in hotelsChange"
      :key="index"
      @click="$router.push('/hotel/'+item.id)"
    >
      <div class="hotelImg" :style="`background:url(${item.photos})`"></div>
      <div class="hotelDetail">
        <div class="hotelTitle">
          <h2>{{item.name}}</h2>
          <span>{{item.alias}}</span>
        </div>
        <div class="scoreContent">
          <div class="score">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="`${item.stars}`"
            ></el-rate>
          </div>
          <div class="comment">
            <span>{{item.all_remarks}}</span> 条评价
          </div>
          <div class="travels">
            <span>{{item.visits_total}}</span>篇游记
          </div>
        </div>
        <div class="hotelPosition">
          <i class="iconfont iconlocation"></i>
          <span>位于: {{item.address}}</span>
        </div>
      </div>
      <div class="hotelPrice">
        <div class="priceLink">
          携程
          <span>
            <i>￥482</i>起
          </span>
          <i class="iconfont icon-youjianhao"></i>
        </div>
        <div class="priceLink">
          去哪儿
          <span>
            <i>￥472</i>起
          </span>
          <i class="iconfont icon-youjianhao"></i>
        </div>
        <div class="priceLink">
          <i class="linkTitle">途游</i>
          <span>
            <i>￥490</i>起
          </span>
          <i class="iconfont icon-youjianhao"></i>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin-top:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="hotels.length"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      cityId: 0,
      key: "61924875e77a856007797dfeeed32c09",
      selected: false,
      cityList: [],
      center: [],
      areaList: [],
      isShowTip: false, //切换地图点标的提示显示
      up: true,
      isShowperson: false,
      hotelData: {
        price: 0,
        level: 0,
        rate: 3.5,
      },
      selectData: {
        input: "",
        date: "",
        persons: "",
        adults: "成人",
        childs: "儿童",
        adultList: [
          {
            value: "2",
            label: 2,
          },
          {
            value: "3",
            label: 3,
          },
          {
            value: "4",
            label: 4,
          },
        ],
        childList: [
          {
            value: "2",
            label: 2,
          },
          {
            value: "3",
            label: 3,
          },
          {
            value: "4",
            label: 4,
          },
        ],
      },
      hotelOptions: {}, //酒店筛选项
      levels: [], //酒店等级
      hotelType: [], //酒店类型
      hotelasset: [], //酒店设施
      brand: [], //酒店品牌
      hotels: [],
      hotelsChange: [],
      pageIndex: 1, // 当前页数
      pageSize: 5, // 显示条数
      selectStr: "",
    };
  },
  methods: {
    showDate() {
      console.log("date");
    },
    selectAdult(value) {
      this.selectData.adults = value + "成人";
    },
    selectChild(value) {
      this.selectData.childs = value + "儿童";
    },
    changArea() {
      console.log("click");
      this.up = !this.up;
      this.$nextTick(() => {
        if (this.up) {
          this.$refs.heightStyle.style = "height:52px";
        } else {
          this.$refs.heightStyle.style = "height:162px";
        }
      });
    },
    getCityList(value) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value,
        },
        method: "get",
      }).then((res) => {
        // console.log(res.data);
        let cityList = res.data.data.map((city) => {
          return {
            value: city.name,
            code: city.sort,
          };
        });
        return cityList.filter((item) => {
          return item.code; //过滤code:city.sort为null的城市
        });
      });
      //   this.currentCity = cityList;
    },
    queryCitySearch(value, showCity) {
      this.getCityList(value).then((cityList) => {
        showCity(cityList);
      });
    },
    citySelect(item) {
      this.selectData.input = item.value;
      this.$router.push("/hotel/?cityName=" + item.value);
      console.log(this.$route.query);
    },
    getCityInfo() {
      if (this.$route.query.cityName) {
        return this.$axios({
          url: "/cities",
          params: {
            name: this.$route.query.cityName,
          },
        }).then((res) => {
          console.log(res.data);

          var map = new AMap.Map("container", {
            zoom: 11, //放大级别
          });
          this.cityId = res.data.data[0].id;
          map.setCity(this.$route.query.cityName);
          this.areaList = res.data.data[0].scenics;
        });
      }
    },
    setPerson() {
      this.visible = false;
      this.selectData.persons =
        this.selectData.adults + "" + this.selectData.childs;
    },
    checkPrice() {
      this.visible = !this.visible;
      // this.$axios({
      //   url: "https://restapi.amap.com/v3/config/district",
      //   params: {
      //     key: this.key,
      //     keywords: this.selectData.input,
      //   },
      // }).then((res) => {
      //   this.center = res.data.districts[0].center.split(",");
      //   console.log(this.center);
      //   this.showMap();
      //   this.getCityInfo();
      // });
    },
    getCurrentcity() {
      //请求高德api获取用户此时所在地
      this.$axios({
        url: "https://restapi.amap.com/v3/ip",
        params: {
          key: this.key,
        },
      }).then((res) => {
        // console.log(res.data);
        console.log("city");
        this.center = res.data.rectangle.split(";")[0].split(",");
        console.log(this.center);
      });
    },
    getHotelOptions() {
      return this.$axios({
        url: "/hotels/options",
      }).then((res) => {
        this.hotelOptions = res.data.data;
      });
    },
    handleClick() {
      // if(this.command)
      this.selected = !this.selected;
    },
    getHotels() {
      this.$axios({
        url:
          "/hotels?" +
          this.selectStr +
          "&city=" +
          this.cityId +
          "&_limit=100" +
          "&_start=" +
          (this.pageIndex - 1) * this.pageSize,
      }).then((res) => {
        console.log("酒店", res.data);
        this.hotels = res.data.data;

        // this.hotels = [...this.hotels, ...res.data.data];
        console.log("hotelList", this.hotels);
        console.log("cityId", this.cityId);

        let start = (this.pageIndex - 1) * this.pageSize;
        let end = start + this.pageSize;
        this.hotelsChange = this.hotels.slice(start, end);
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getHotels();
      console.log("page", this.pageSize);
    },
    handleCurrentChange(currentPage) {
      this.pageIndex = currentPage;
      this.getHotels();
      console.log("index", this.pageIndex);
    },
    changeSelect() {
      var str = "";
      if (this.levels) {
        this.levels.forEach((e, index) => {
          str += "hotellevel_in=" + e + "&";
        });
      }
      if (this.hotelType) {
        this.hotelType.forEach((e, index) => {
          str += "hoteltype_in=" + e + "&";
        });
      }
      if (this.brand) {
        this.brand.forEach((e, index) => {
          str += "hotelbrand_in=" + e + "&";
        });
      }
      if (this.hotelasset) {
        this.hotelasset.forEach((e, index) => {
          str += "hotelasset_in=" + e + "&";
        });
      }
      this.selectStr = str;
      this.$router.push("/hotel?" + str);
    },
  },
  async mounted() {
    var map = new AMap.Map("container", {
      zoom: 11, //放大级别
      // center: [116.397428, 39.90923], //中心点坐标
    });
    map.getCity((res) => {
      //请求所在地周边信息
      this.$router.push("/hotel/?cityName=" + res.city);
    });

    await this.getCityInfo();

    await this.getHotelOptions();

    this.getHotels();
  },
  watch: {
    async $route() {
      //获取城市周边地区
      await this.getCityInfo();
      //获取酒店筛选项
      await this.getHotelOptions();
      //获取酒店信息
      this.getHotels();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    font-size: 16px;
    margin: 18px 10px;
  }
  .select {
    display: flex;
    margin-bottom: 18px;
    .input {
      width: 230px;
      margin-right: 14px;
    }
    .date {
      width: 330px;
      margin-right: 14px;
    }
    .iconfont {
      font-size: 26px;
      display: block;
      margin-top: 5 px;
    }
    .checkPriceBtn {
      margin-left: 20px;
    }
  }
  .con {
    display: flex;
    .con_left {
      .area {
        display: flex;
        font-size: 14px;
        .areaRight {
          margin-left: 52px;
          width: 520px;
          height: 52px;
          overflow: hidden;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              margin-right: 16px;
              margin-bottom: 8px;
            }
          }
        }
      }
      .areaDrapdown {
        margin-left: 92px;
      }
      .averagePrice {
        display: flex;
        font-size: 14px;
        margin-top: 24px;
        .averageRight {
          margin-left: 52px;
          display: flex;
          .score {
            margin-right: 20px;
            i {
              color: #ff9900;
            }
          }
        }
      }
    }
    .con_right {
      /deep/ .amap-maps {
        .markerIcon {
          color: aliceblue;
          text-align: center;
          width: 19px;
          height: 30px;
          background: url("https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png");
        }
        .amap-marker-label {
          z-index: 99;
        }
      }
    }
  }

  .selectBar {
    display: flex;
    margin-top: 22px;
    border: 1px solid #ccc;
    padding: 10px 14px;
    font-size: 14px;
    .priceSlider {
      width: 160px;
      border-right: 1px solid #cccccc;
      padding: 6px 18px;
    }
    .level {
      padding: 6px 18px;
      border-right: 1px solid #cccccc;
      .levelTip {
        margin-bottom: 10px;
      }
      .dropDownHeigh {
        display: flex;
        /deep/ .icon {
          margin-left: 82px;
        }
      }
      /deep/ el-dropdown-menu {
        height: 160px;
        overflow: auto;
      }
    }
    .hotelSelectBtn {
      padding: 22px 10px 0 20px;
    }
  }
  .hotelContent {
    margin-top: 20px;
    display: flex;
    .hotelImg {
      width: 320px;
      height: 200px;
      margin-right: 18px;
      background-size: 100% 100%;
    }
    .hotelDetail {
      .scoreContent {
        width: 420px;
        display: flex;
        .score {
          margin-top: 12px;
        }
        .comment {
          margin-left: 26px;
          line-height: 42px;
          font-size: 16px;
          span {
            color: #ff9900;
          }
        }
        .travels {
          margin-left: 40px;
          line-height: 42px;
          font-size: 16px;
          span {
            color: #ff9900;
          }
        }
      }
      .hotelPosition {
        span {
          font-size: 13px;
        }
      }
    }
    .hotelPrice {
      margin-left: 58px;
      font-size: 15px;
      .priceLink {
        padding: 18px 5px 18px 10px;
        border-bottom: 1px solid #ccc;
        display: flex;

        span {
          flex: 2;
          margin-left: 98px;
          width: 58px;
          text-align: right;
          i {
            color: #ff9900;
          }
        }
        .iconfont {
          font-size: 14px;
          margin-left: 12px;
          line-height: 21px;
        }
      }
    }
  }
}
.show {
  .showBottom {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 30px;
  }
}
</style>