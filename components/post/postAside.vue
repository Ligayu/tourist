<template>
  <div>
    <div class="aside" v-for="item in recommendList" :key="item.id">
      <h4 class="asideTitle">相关攻略</h4>
      <div class="recommendList">
        <div class="recommendItem">
          <div class="itemContent">
            <div class="contentLeft">
              <!-- 若数据无图像则给一个预定的图像 -->
              <img
                :src="item.images[0] ||'http://157.122.54.189:9095/uploads/ebd1baff1f444d92bdb0180e193b54fe.jpg'"
                alt
              />
            </div>
            <div class="contentRight">
              <div class="rightCon">{{item.title}}</div>
              <p>2020-07-30 10:16 {{item.watch}}阅读</p>
            </div>
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
      recommendList: [],
    };
  },
  mounted() {
    this.getRecomment();
  },
  methods: {
    // 获取推荐文章
    getRecomment() {
      this.$axios({
        url: "/posts/recommend",
        params: {
          id: this.postId,
        },
      }).then((res) => {
        console.log("推荐文章", res.data);
        this.recommendList = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  width: 280px;
  .asideTitle {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid;
  }
  .recommendList {
    .recommendItem {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
      .itemContent {
        height: 80px;
        display: flex;
        .contentLeft {
          width: 100px;
          height: 80px;
          flex-shrink: 0;
          background: #ddd;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .contentRight {
          flex: 1;
          position: relative;
          .rightCon {
            line-height: 1.4em;
            height: 2.8em;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          p {
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>