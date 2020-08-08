<template>
  <div class="main" v-if="postDetail[0]">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1>{{postDetail[0].title}}</h1>
    <div class="post-info">
      <span>时间：2020-07-29 7:34</span>
      <span>阅读:{{postDetail[0].watch}}</span>
    </div>

    <div class="post-content" v-html="postDetail[0].content"></div>

    <div class="post-ctrl">
      <el-row class="postTip">
        <div class="ctrl-item">
          <i class="iconfont iconpinglun"></i>
          <p>评论（{{postDetail[0].comments.length}}）</p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
      </el-row>
    </div>
    <div class="cmt-wrapper">
      <h4 class="cmt-title">评论</h4>
      <el-tag
        class="replayTag"
        v-if="showTag"
        @close="showTag=false"
        closable
      >{{'@'+transData.nickname}}</el-tag>
      <div class="cmt-input">
        <el-input
          resize="none"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          ref="controlInput"
        ></el-input>
      </div>
      <div class="inputContral">
        <!-- 上传图片组件 -->
        <div class="contralPic">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" class="uploadImg">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <!-- 提交按钮 -->
        <div class="sureBtn">
          <el-button type="primary" size="mini" @click="submitComment">提交</el-button>
        </div>
      </div>
      <div class="cmt-list">
        <div class="cmt-item" v-for="(item,index) in commentsData" :key="index">
          <div class="cmt-info">
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
            <i>{{item.account.nickname}}</i>
            <i>2020-07-29 10:46</i>
            <span>{{index+1}}</span>
          </div>
          <div class="cmt-content">
            <comment :commentData="item" @ToReplay="Reply" />
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
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
    {{textarea}}
  </div>
</template>

<script>
import comment from "@/components/post/comment.vue";
export default {
  components: {
    comment,
  },
  data() {
    return {
      postDetail: [],
      tagContent: "",
      showTag: false,
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false,
      commentsData: [],
      transData: {},
      pageIndex: 1, // 当前页数
      pageSize: 5, // 显示条数
      total: 0,
    };
  },
  mounted() {
    this.getComment();
    this.getContent();
  },
  methods: {
    //图片问题
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 获取评论
    getComment() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _limit: 5,
          _start: (this.pageIndex - 1) * this.pageSize,
        },
      }).then((res) => {
        console.log("评论", res.data);
        this.commentsData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 获取文章内容
    getContent() {
      this.$axios({
        url: "/posts",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        console.log("文章详情", res.data);
        this.postDetail = res.data.data;
      });
    },
    Reply(userInfo) {
      this.transData = userInfo;
      console.log("这里是传回来的数据", this.transData);
      this.showTag = true;
      this.$nextTick(() => {
        this.$refs.controlInput.focus();
      });
      // this.toSendcomment();
    },
    toSendcomment() {},
    submitComment() {
      this.$axios({
        url: "/comments",
        method: "post",
        data: {
          content: this.textarea,
          post: this.$route.query.id,
          follow: this.transData.parent_id,
        },
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token,
        },
      }).then((res) => {
        console.log(111, res.data);
        console.log("route", this.$route);
        // this.$router.push("/post/detail?id=" + this.postId);
      });
    },
    //分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getComment();
      console.log("page", this.pageSize);
    },
    handleCurrentChange(currentPage) {
      this.pageIndex = currentPage;
      this.getComment();
      console.log("index", this.pageIndex);
    },
  },
  watch: {
    $route() {},
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 700px;
  margin-right: 10px;
  .breadcrumb {
    font-size: 14px;
    line-height: 1;
  }
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .post-info {
    color: #999;
    padding: 20px;
    text-align: right;
  }
  .post-content {
    /deep/ p {
      img {
        width: 700px;
      }
    }
  }
  .post-ctrl {
    padding: 50px 0 30px;
    .postTip {
      justify-content: center;
      display: flex;
      .ctrl-item {
        margin: 0 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        i {
          display: block;
          font-size: 28px;
          color: orange;
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .cmt-wrapper {
    margin-bottom: 20px;
    h4 {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .replayTag {
      margin-bottom: 10px;
    }
    .cmt-title {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .cmt-input {
      margin-bottom: 10px;
    }
    .inputContral {
      margin-bottom: 30px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      .contralPic {
        margin: 10px 0;
        .uploadImg {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
      }
    }
    .cmt-list {
      border: 1px solid #ddd;
      .cmt-item {
        border-bottom: 1px dashed #ddd;
        padding: 20px 20px 5px;
        .cmt-info {
          margin-bottom: 10px;
          font-size: 12px;
          color: #666;
          display: flex;
          img {
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }
          i {
            color: #999;
          }
          span {
            flex: 1;
            text-align: right;
          }
        }
        .cmt-content {
          padding: 0 0 0 30px;
        }
      }
    }
  }
}
</style>