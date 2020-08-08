<template>
  <div v-if="dataList">
    <div v-for="(item,index) in dataList" :key="index">
      <!-- 多图文章 -->
      <div class="multiImg" v-if=" item.images.length>=3">
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <h4>{{item.title}}</h4>
          <div class="text" v-html="item.summary">{{item.summary}}</div>
          <div class="img">
            <img :src="item.images[0]" alt />
            <img :src="item.images[1]" alt />
            <img :src="item.images[2]" alt />
          </div>
        </nuxt-link>
        <div class="footer">
          <div>
            <span class="el-icon-location-information"></span>
            <span>{{item.city.name}}&nbsp;&nbsp;by</span>
            <img class="cover" :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
            <span>{{item.account.nickname}}</span>
            <span class="el-icon-view"></span>
            <span>{{item.watch}}</span>
          </div>
          <span class="like">{{item.like}} 赞</span>
        </div>
      </div>
      <!-- 单图文章 -->
      <div class="singleImg" v-if="item.images.length = 1">
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <div class="content">
            <div class="img">
              <img :src="item.images[0]" alt />
            </div>
            <div class="contentRight">
              <h4>{{item.title}}</h4>
              <div class="text" v-html="item.summary">{{item.summary}}</div>
            </div>
          </div>
        </nuxt-link>
        <div class="footer">
          <div>
            <span class="el-icon-location-information"></span>
            <span>{{item.city.name}}&nbsp;&nbsp;by</span>
            <img class="cover" :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
            <span>{{item.account.nickname}}</span>
            <span class="el-icon-view"></span>
            <span>{{item.watch}}</span>
          </div>
          <span class="like">{{item.like}} 赞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataList"],
  mounted() {
    console.log("dataList", this.dataList);
  },
};
</script>

<style lang="less" scoped>
// 多图
.multiImg {
  margin-top: 30px;
  border-bottom: 2px solid #eee;
  .text {
    margin: 20px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .img {
    display: flex;
    img {
      width: 220px;
      height: 150px;
      display: block;
      object-fit: cover;
    }
  }
  .footer {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
  }
}
//   单图
.singleImg {
  margin-top: 30px;
  border-bottom: 2px solid #eee;
  position: relative;
  .footer {
    position: absolute;
    top: 133px;
    right: 0;
    width: 470px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
  }
  .content {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    .img {
      img {
        width: 220px;
        height: 150px;
        object-fit: cover;
      }
    }
  }
  .contentRight {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    .text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin-top: 16px;
    }
  }
}
.cover {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  margin: 0 6px 0 0;
}
span {
  font-size: 12px;
  color: #999;
  margin-right: 6px;
  &:nth-child(4) {
    color: #ffa500;
  }
}
.like {
  color: #ffa500;
  font-size: 16px;
  cursor: pointer;
}
</style>