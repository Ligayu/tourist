<template>
  <!-- 旅游攻略首页 -->
  <section class="tourism">
    <!-- 左侧 -->
    <div class="tourismLeft">
      <div class="list">
        <ul>
          <li class="listLfet">
            热门城市
            <i class="iconfont icon-youjianhao"></i>
            <div class="listRightHote">
              <ul>
                <li>
                  <a href="/post?city=北京">
                    <i>1</i>
                    <strong>北京</strong>
                    <span>世界著名古都和现代化国际城市</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=广州">
                    <i>2</i>
                    <strong>广州</strong>
                    <span>粤港澳大湾区、泛珠江三角洲经济区</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=上海">
                    <i>3</i>
                    <strong>上海</strong>
                    <span>长江入海口,东隔东中国海</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=成都">
                    <i>4</i>
                    <strong>成都</strong>
                    <span>国家历史文化名城</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=西安">
                    <i>5</i>
                    <strong>西安</strong>
                    <span>中国国际形象最佳城市之一</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="listLfet">
            推荐城市
            <i class="iconfont icon-youjianhao"></i>
            <div class="listRightHote">
              <ul>
                <li>
                  <a href="/post?city=青岛">
                    <i>1</i>
                    <strong>青岛</strong>
                    <span>滨海度假旅游城市</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=杭州">
                    <i>2</i>
                    <strong>杭州</strong>
                    <span>西湖十景</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=深圳">
                    <i>3</i>
                    <strong>深圳</strong>
                    <span>世界形象力的创新创意之都</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=广州">
                    <i>4</i>
                    <strong>广州</strong>
                    <span>粤港澳大湾区、泛珠江三角洲经济区</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=成都">
                    <i>5</i>
                    <strong>成都</strong>
                    <span>国家历史文化名城</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="listLfet">
            奔向海岛
            <i class="iconfont icon-youjianhao"></i>
            <div class="listRightHote">
              <ul>
                <li>
                  <a href="/post?city=秦皇岛">
                    <i>1</i>
                    <strong>秦皇岛</strong>
                    <span>驰名中外的旅游休闲胜地</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=青岛">
                    <i>2</i>
                    <strong>青岛</strong>
                    <span>滨海度假旅游城市</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=珠海">
                    <i>3</i>
                    <strong>珠海</strong>
                    <span>浪漫之城,百岛之市</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=深圳">
                    <i>4</i>
                    <strong>深圳</strong>
                    <span>世界影响力的创新创意之都</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=海口">
                    <i>5</i>
                    <strong>海口</strong>
                    <span>海滨自然旖旎风光</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="listLfet">
            主题推荐
            <i class="iconfont icon-youjianhao"></i>
            <div class="listRightHote">
              <ul>
                <li>
                  <a href="/post?city=海口">
                    <i>1</i>
                    <strong>海口</strong>
                    <span>海滨自然旖旎风光</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=广州">
                    <i>2</i>
                    <strong>广州</strong>
                    <span>粤港澳大湾区、泛珠江三角洲经济区</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=上海">
                    <i>3</i>
                    <strong>上海</strong>
                    <span>长江入海口,东隔东中国海</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=珠海">
                    <i>4</i>
                    <strong>珠海</strong>
                    <span>浪漫之城,百岛之市</span>
                  </a>
                </li>
                <li>
                  <a href="/post?city=西安">
                    <i>5</i>
                    <strong>西安</strong>
                    <span>中国国际形象最佳城市之一</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <h2 class="text">推荐城市</h2>

      <div class="img">
        <img
          src="https://n1-q.mafengwo.net/s16/M00/C7/70/CoUBUl7dlauAewRYAAES_JQKUYs44.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
          alt
        />
      </div>
    </div>
    <!-- 右侧 -->
    <div class="tourismRight">
      <!-- 搜索 -->
      <div class="search">
        <input
          type="text"
          placeholder="请输入想去的地方,比如:'广州'"
          v-model="searchValue"
          @keyup.enter="Search"
        />
        <span class="el-icon-search icon"></span>
        <div>
          <span>热门推荐:</span>
          <span>广州</span>
          <span>上海</span>
          <span>北京</span>
          <span>深圳</span>
        </div>
      </div>
      <!-- 文章列表头部 -->
      <div class="listHeaders">
        <h4>推荐攻略</h4>
        <nuxt-link to="/post/postArticle" class="btn">
          <span class="el-icon-edit"></span>
          写游记
        </nuxt-link>
      </div>
      <!--  文章列表 -->
      <postList :dataList="postData" />

      <!-- 底部分页 -->
      <div class="pagination" v-if="postData.length">
        <el-pagination
          @current-change="currentChange"
          @size-change="sizeChange"
          background
          layout="prev, pager, next ,total,jumper"
          :page-size="pageSize"
          :total="postData.length"
        ></el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import postList from "@/components/post/postList";
export default {
  components: {
    postList,
  },
  data() {
    return {
      searchValue: "",
      postData: [],
      // 文章列表总数据截取出来的分页数据
      dataList: [],
      // 页数
      pageIndex: 1,
      // 每页条数
      pageSize: 5,
    };
  },
  mounted() {
    this.$axios({
      url: "/posts",
      params: {
        start: (this.pageIndex - 1) * this.pageSize,
      },
    }).then((res) => {
      this.postData = res.data;
      console.log("游记总数居", this.postData);
      // this.loadPage();
    });
  },
  methods: {
    // loadPage() {
    //   const beginIndex = (this.pageIndex - 1) * this.pageSize;
    //   let endIndex = 0;
    //   if (this.postData.length < this.pageSize) {
    //     endIndex = beginIndex + this.postData.length;
    //   } else {
    //     endIndex = beginIndex + this.pageSize;
    //   }
    //   this.dataList = this.postData.slice(beginIndex, endIndex);
    //   console.log("slice postData", this.dataList);
    // },
    currentChange(newIndex) {
      this.pageIndex = newIndex;
      this.loadPage();
    },
    sizeChange(newSize) {
      this.pageSize = newSize;
      this.loadPage();
    },
    Search() {},
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.tourism {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  margin-top: 24px;

  //  左侧区域
  .tourismLeft {
    width: 260px;
    margin-right: 40px;
    box-sizing: border-box;
    position: relative;
    .listRightHote {
      position: absolute;
      top: -1px;
      left: 260px;
      border: 1px solid #ddd;
      z-index: 2;
      width: 350px;
      background-color: #fff;
      display: none;
      ul {
        padding: 0px 14px;
        line-height: 38px;
        li {
          i {
            font-size: 22px;
            color: #ffa600;
          }
          strong {
            font-size: 14px;
            color: #ffa600;
            font-weight: 400;
            margin: 0 8px;
          }
          span {
            font-size: 14px;
            color: #bfbfbf;
          }
        }
      }
    }
    .list {
      li.listLfet {
        background-color: #fff;
        padding: 10px 0;
        text-indent: 1em;
        font-size: 14px;
        border: 1px solid #ddd;
        border-top: none;
        position: relative;
        //margin负值解决边界重合变粗
        margin-right: -1px;
        z-index: 3;
        i {
          position: absolute;
          right: 6px;
        }
        &:nth-child(1) {
          border-top: 1px solid #ddd;
        }
        &:nth-child(1):hover,
        &:nth-child(2):hover,
        &:nth-child(3):hover,
        &:nth-child(4):hover {
          border-right: 1px solid #ffffff;
          color: #ffa600;
        }
        &:nth-child(1):hover .listRightHote {
          display: block;
        }
        &:nth-child(2):hover .listRightHote {
          display: block;
          position: absolute;
          top: -41px;
        }
        &:nth-child(3):hover .listRightHote {
          display: block;
          position: absolute;
          top: -81px;
        }
        &:nth-child(4):hover .listRightHote {
          display: block;
          position: absolute;
          top: -121px;
        }
      }
    }
    .text {
      font-weight: 400;
      font-size: 16px;
      margin: 24px 0 12px 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    .img {
      img {
        width: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
  // 右侧区域
  .tourismRight {
    width: 700px;
    // 搜索
    .search {
      position: relative;
      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-indent: 1.5em;
        border: 4px solid #ffa500;
        box-sizing: border-box;

        outline: none;
      }
      .icon {
        font-size: 24px;
        color: #ffa500;
        font-weight: 700;
        position: absolute;
        top: 8px;
        right: 16px;
        cursor: pointer;
      }
      div {
        margin: 10px 0;
        span {
          font-size: 12px;
          color: #666;
          padding: 0 6px;
          &:nth-child(1) {
            color: red;
            padding: 0;
          }
          &:nth-child(2):hover,
          &:nth-child(3):hover,
          &:nth-child(4):hover,
          &:nth-child(5):hover {
            text-decoration: underline;
            color: #ffa500;
            cursor: pointer;
          }
        }
      }
    }
    // 文章列表头部
    .listHeaders {
      height: 40px;
      line-height: 40px;
      padding: 0 0 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #eeeeee;
      h4 {
        font-size: 16px;
        color: #ffad00;
        font-weight: 400;
        position: relative;
        &::after {
          display: block;
          content: "";
          width: 72px;
          height: 2px;
          position: absolute;
          bottom: -11px;
          left: 0;
          background-color: #ffa500;
        }
      }
      .btn {
        background-color: #409eff;
        padding: 12px 18px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        color: white;
        cursor: pointer;

        span {
          font-size: 14px;
          margin-right: 6px;
        }
      }
    }

    // 底部分页
    .pagination {
      text-align: center;
      margin: 12px 0 22px 0;
    }
  }
}
</style>
