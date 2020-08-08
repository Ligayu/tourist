<template>
  <div class="box">
    <!-- 面包屑 -->
    <div class="heater" v-if="Hothdata.id">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{datacity}}{{Hothdata.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{Hothdata.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 头部标题 -->
    <div class="title" v-if="Hothdata.id">
      <h1>
        {{Hothdata.name}}
        <i class="iconfont icon-huangguang1"></i>
        <i class="iconfont icon-huangguang1"></i>
        <i class="iconfont icon-huangguang1"></i>
      </h1>
      <div>{{Hothdata.alias}}</div>
      <div>
        <span class="el-icon-map-location"></span>
        {{Hothdata.address}}
      </div>
    </div>

    <!-- 图片 -->
    <div class="images" v-if="Hothdata.id">
      <!-- 👈大图 -->
      <div class="bigimg">
        <img :src="`${Hothdata.photos}`" alt />
      </div>
      <!-- 👉小图 -->
      <div class="imgitem">
        <div>
          <img
            :src="item.url"
            alt
            v-for="(item, index) in images"
            :key="index"
            @click="chang(item.url)"
          />
        </div>
      </div>
    </div>

    <!-- 房间列表 -->
    <div class="roomlocat" v-if="Hothdata.id">
      <div class="table_head">
        <div>价格来源</div>
        <div class="two">低价房型</div>
        <div>最低价格/每晚</div>
      </div>
      <div class="table_body">
        <div class="table">
          <a href="https://hotels.ctrip.com/hotel/694679.html">
            <div class="tr" v-for="(item, index) in roomlocat" :key="index">
              <div>{{item.name}}</div>
              <div>{{item.bestType}}</div>
              <div class="atwo">
                <span class="yellow">￥{{item.price}}</span> 起
                <i class="yellow">></i>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="itemMap">
      <div id="container"></div>
      <div class="conter">
        <el-tabs v-model="activeName" @tab-click="handle()">
          <el-tab-pane label="风景" name="风景" class="MapNav">
            <div
              v-for="(item, index) in pois"
              :key="index"
              @mouseover="isshow(item.id)"
              class="disMap"
            >
              <div class="Mapcont">{{item.name}}</div>
              <div>
                <span>{{item.distance/100}}公里</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="交通" class="MapNav">
            <div
              v-for="(item, index) in pois"
              :key="index"
              @mouseover="isshow(item.id)"
              class="disMap"
            >
              <div class="Mapcont">{{item.name}}</div>
              <div>
                <span>{{item.distance/100}}公里</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 酒店的基本信息 -->
    <div class="basicinformation" v-if="Hothdata.id">
      <div class="tabhead">
        <div class="formation">
          <div>基本信息</div>
          <div>入住时间: 14:00之后</div>
          <div>离店时间: 12:00之前</div>
          <div>{{Hothdata.creation_time}} /{{Hothdata.renovat_time}}</div>
          <div>酒店规模: 153间客房</div>
        </div>
        <div class="hotelassetsData">
          <div class="formation" v-if="Hothdata.hotelassets.length>0">
            主要设施
            <span class="color" v-for="(item, index) in hotelassets" :key="index">{{item.name}}</span>
          </div>
          <div class="color" v-else>-</div>
          <div class="formation">
            停车服务
            <span v-if="Hothdata.parking!=null">{{Hothdata.parking}}</span>
            <span v-else>-</span>
          </div>
          <div class="formation">
            品牌信息
            <span v-if="Hothdata.hotelbrand==null">-</span>
            <span v-else>{{Hothdata.hotelbrand.name}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户评论 -->
    <h4 class="comments" v-if="Hothdata.id">0条真实用户品论</h4>
    <!-- 评分 -->
    <div class="score" v-if="Hothdata.id">
      <!-- 佐边评论数据 -->
      <div class="leftscore" v-if="Hothdata.id">
        <div>总评数：{{Hothdata.all_remarks}}</div>
        <div>好评数：{{Hothdata.good_remarks}}</div>
        <div>差评数：{{Hothdata.bad_remarks}}</div>
      </div>
      <!-- 右边评论数据 -->
      <div class="rightscore" v-if="Hothdata.id">
        <!-- 总评分 -->
        <div class="stars">
          <el-rate
            v-model=" Hothdata.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            void-color="red"
          ></el-rate>
        </div>

        <div class="recommendation">
          <el-progress
            type="circle"
            :percentage="100"
            color="#ff9900"
            :stroke-width="3"
            :width="80"
            :show-text="false"
          ></el-progress>
          <div class="text">
            <span>推荐</span>
          </div>
        </div>

        <!-- 各类评分 -->
        <div class="text_data">
          <el-progress
            :show-text="false"
            :width="70"
            :stroke-width="2"
            type="circle"
            :percentage="Hothdata.scores.environment*10"
            color="rgb(255,153,0)"
          ></el-progress>
          <div class="text">
            <span>环境</span>
            <br />
            <span class="value">{{Hothdata.scores.environment}}</span>
          </div>
        </div>
        <div class="text_data">
          <el-progress
            :show-text="false"
            :width="70"
            :stroke-width="2"
            type="circle"
            :percentage="Hothdata.scores.service*10"
            color="rgb(255,153,0)"
          ></el-progress>
          <div class="text">
            <span>环境</span>
            <br />
            <span class="value">{{Hothdata.scores.service}}</span>
          </div>
        </div>
        <div class="text_data">
          <el-progress
            :show-text="false"
            :width="70"
            :stroke-width="2"
            type="circle"
            :percentage="Hothdata.scores.product*10"
            color="rgb(255,153,0)"
          ></el-progress>
          <div class="text">
            <span>环境</span>
            <br />
            <span class="value">{{Hothdata.scores.product}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locationList: [],
      images: [
        {
          url: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
        },
        {
          url: "http://157.122.54.189:9093/images/hotel-pics/2.jpeg",
        },
        {
          url: "http://157.122.54.189:9093/images/hotel-pics/3.jpeg",
        },
        {
          url: "http://157.122.54.189:9093/images/hotel-pics/4.jpeg",
        },
        {
          url: "http://157.122.54.189:9093/images/hotel-pics/5.jpeg",
        },
        {
          url: "http://157.122.54.189:9093/images/hotel-pics/6.jpeg",
        },
      ], //图片数据
      value: 3.7, //打分数据
      pois: [], //周边信息数据
      activeName: "风景",
      map: {}, //地图数据
      markers: [], //标点数据
      Hothdata: {}, //酒店的全数据
      datacity: "", //定位的城市
      roomlocat: [], //房间列表数据
      hotelassets: [], //房间信息数据
      //HotelLocation: {}, //当前酒店的坐标
      location: [],
      //酒店定位
      hotelXY: "",
    };
  },

  async mounted() {
    await this.locationhote(); //获取酒店数据
    this.Promptbox(); //创建地图

    console.log("id", this.$route.params.id);
    // await this.Positioning(); //定位
    await this.Peripheralhandsearch(); //获取点数据

    this.handle(); //tab切换
  },

  methods: {
    //获取酒店详情数据
    locationhote() {
      return this.$axios({
        url: "/hotels?id=" + this.$route.params.id,
      }).then((res) => {
        this.Hothdata = res.data.data[0];
        this.roomlocat = res.data.data[0].products;
        this.hotelassets = res.data.data[0].hotelassets;
        console.log(this.hotelassets);
        this.hotelXY =
          this.Hothdata.location.longitude +
          "," +
          this.Hothdata.location.latitude;
      });
    },

    //图片切换
    chang(url) {
      this.Hothdata.photos = url;
    },

    //地图
    Promptbox() {
      // 创建地图
      this.map = new AMap.Map("container", {
        // center: [113.3245904, 23.1066805],
        zoom: 21,
      });
      this.setmarker();
    },
    //周边
    Peripheralhandsearch(activeNamev) {
      var type = activeNamev;
      return this.$axios({
        url: "https://restapi.amap.com/v3/place/around",
        params: {
          key: "e2ee7c0c1acd253af5a8b1227cff90fe",
          location: this.hotelXY,
          types: type,
          radius: "1500",
        },
      }).then((res) => {
        this.pois = res.data.pois;
        return this.pois;
      });
    },
    //放置标点
    setmarker() {
      this.markers = this.pois.map((pis, index) => {
        var marker = new AMap.Marker({
          title: pis.name,
          position: pis.location.split(","),
          extData: pis.id,
          content: `<div class="markerContent"> ${index + 1}</div>`,
        });
        marker.on("mouseover", () => {
          return this.isshow(pis.id);
        });
        return marker;
      });
      this.map.add(this.markers);
      this.map.setFitView();
      this.map.on("mouseover", onmouseover); // 绑定click事件
      this.map.on("mouseout", onmouseout);
    },
    // 定位
    // Positioning() {
    //   return this.$axios({
    //     url: "https://restapi.amap.com/v3/ip",
    //     params: {
    //       key: "e2ee7c0c1acd253af5a8b1227cff90fe"
    //     }
    //   }).then(res => {
    //     if (res.data.info == "OK") {
    //       this.datacity = res.data.city;
    //       console.log(res.data.rectangle);
    //       this.location = res.data.rectangle.split(";");
    //       console.log(this.location[0]);
    //     }
    //   });
    // },
    //弹窗
    isshow(pisId) {
      this.markers.forEach((el) => {
        if (el.getExtData() == pisId) {
          this.map.setCenter(el.getPosition());
          el.setTop(true);
          var infoWindow = new AMap.InfoWindow({
            //创建信息窗体
            // isCustom: true, //使用自定义窗体
            offset: new AMap.Pixel(0, -32),

            content: `<span style="font-size: 12px;color: #333">${el.getTitle()}</span>`,
          });
          infoWindow.open(this.map, el.getPosition());
          // 将点居中
        }
      });
    },

    //tab切换
    async handle() {
      var activeNamev = this.activeName;
      await this.Peripheralhandsearch(activeNamev);
      this.setmarker();
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 1000px;
  margin: 0 auto;
  .heater {
    overflow: hidden;
    padding: 20px 0;
  }
  .title {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    h1 {
      font-weight: 400;
      i {
        color: #ff9900;
      }
    }
  }
  .images {
    display: flex;
    .bigimg {
      width: 66.66667%;
      img {
        height: 340px;
        width: 640px;
        padding-right: 10px;
      }
    }
    .imgitem {
      img {
        width: 160px;
        margin: 0 5px 0 10px;
        cursor: pointer;
      }
    }
  }
  .roomlocat {
    margin-top: 40px;
    .table_head {
      height: 48px;
      line-height: 48px;
      display: flex;
      color: #909399;
      font-weight: 600;
      border-bottom: solid #ebeef5 1px;
      .two {
        margin: 0 auto;
      }
    }
    .table_body {
      color: #909399;
      .table {
        a :hover {
          width: 100%;
          background: #f5f7fa;
        }

        .tr {
          display: flex;
          div {
            display: block;
            flex: 1;
            line-height: 48px;
            border-bottom: solid #ebeef5 1px;
            .yellow {
              color: #ff9900;
            }
          }
          .atwo {
            flex: 0.2;
            padding-left: 35px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .itemMap {
    margin: 40px 0;
    display: flex;
    height: 360px;
    #container {
      height: 100%;
      width: 100%;
    }
    .conter {
      margin-left: 20px;
      width: 350px;
      height: 360px;
      .MapNav {
        width: 350px;
        height: 305px;
        overflow: auto;
        .disMap {
          padding: 0 30px 0 10px;
          display: flex;
          color: #666666;
          line-height: 35px;
          .Mapcont {
            flex: 1;
          }
        }
      }
    }

    /deep/ .amap-maps {
      .amap-markers {
        .markerContent {
          width: 22px;
          height: 36px;
          background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);
          background-size: 22px 36px;
          text-align: center;
          line-height: 24px;
          color: #fff;
        }
      }
    }
  }
  .basicinformation {
    margin: 40px 0;
    .tabhead {
      .formation {
        display: flex;
        border-bottom: 1px solid #eeeeee;
        padding: 20px 10px;
        color: #666;
        font-size: 14px;
        div {
          flex: 1;
        }
        span {
          margin-left: 80px;
        }
        .color {
          border: 1px solid #eee;
          padding: 4px 10px;
          margin-right: 10px;
          border-radius: 4px;
          background-color: #eee;
          color: #666;
        }
      }
    }
  }
  .score {
    display: flex;
    margin: 20px 0;
    .leftscore {
      color: #666;
    }
    .rightscore {
      display: flex;
      position: relative;
      .recommendation {
        position: absolute;
        left: 90px;
        top: 0px;
        opacity: 0.25;
        transform: rotate(-30deg);
        .text {
          position: absolute;
          font-size: 20px;
          top: 50%;
          left: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
          color: #ff9900;
        }
      }
      .stars {
        margin: 30px 70px 0 70px;
      }
      .text_data {
        margin-left: 50px;
        position: relative;
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
          span {
            color: #ff9900;
          }
          .value {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>