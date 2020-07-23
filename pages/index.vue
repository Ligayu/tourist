<template>
  <div class="container">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in coverImg" :key="index">
        <div
          class="banner-image"
          :style="`
            background:url(${item.url}) center center no-repeat;
            background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索栏 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in options"
            :key="index"
            :class="{active: index === currentOption}"
            @click="handleOption(index)"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input
            :placeholder="options[currentOption].placeholder"
            v-model="searchValue"
            @keyup.enter="handleSearch"
          />
          <!-- keyup.enter监听的是键盘回车事件 -->
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverImg: [
        {
          url:
            "https://images.pexels.com/photos/161889/mill-car-flour-history-161889.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          url:
            "https://images.pexels.com/photos/4338284/pexels-photo-4338284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          url:
            "https://images.pexels.com/photos/4338092/pexels-photo-4338092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          url:
            "https://images.pexels.com/photos/4450085/pexels-photo-4450085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          url:
            "https://images.pexels.com/photos/3610765/pexels-photo-3610765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
      ],
      options: [
        // 搜索框tab选项
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      searchValue: "", // 搜索框的值
      currentOption: 0 // 当前选中的选项
    };
  },
  mounted() {
    // this.$axios({
    //   url: "/scenics/banners",
    //   method: "get"
    // }).then(res => {
    //   console.log(res.data);
    //   this.coverImg = res.data.data.map(item => {
    //     return {
    //       url: this.$axios.defaults.baseURL + item.url
    //     };
    //   });
    // });
  },
  methods: {
    handleOption(index) {
      this.currentOption = index;
      const category = this.options[index];
      if (category.name === "机票") {
        return this.$router.push(category.pageUrl);
      }
    },
    handleSearch() {
      const category = this.options[this.currentOption];
      this.$router.push(category.pageUrl + this.searchValue);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>