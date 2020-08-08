<template>
  <!-- 发表文章页 -->
  <section class="article">
    <div class="articleLeft">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>发表评论</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>发表新攻略</h2>
      <p>分享你的个人游戏,让更多的人看到哦</p>
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="title">
          <el-input placeholder="请输入标题" class="title" v-model="form.title"></el-input>
        </el-form-item>
        <!-- 富文本框 -->
        <el-form-item prop="content">
          <VueEditor v-model="form.content" :useCustomImageHandler="true" @image-added="imgUpload" />
        </el-form-item>

        <el-form-item class="selectCity" prop="city">
          <span>选择城市</span>
          <!-- @select="handleSelect" -->
          <!-- :fetch-suggestions="querySearch" -->
          <el-autocomplete
            placeholder="请搜索游玩城市"
            class="city"
            v-model="form.city"
            @select="handleSelect"
            :fetch-suggestions="querySearch"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">发布</el-button>&nbsp;&nbsp;&nbsp;&nbsp;或者
          <span class="draft" @click="setDraftBox">保存到草稿</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="articleRight">
      <div class="draftBox" ref="setDraftBoxList">
        <span>草稿箱</span>
        <span>({{$store.state.draft.dataDraft.length}})</span>

        <div
          class="draftBoxList"
          v-for="(item,index) in $store.state.draft.dataDraft"
          :key="index"
          :v-if="$store.state.draft.dataDraft"
        >
          <span class="title">{{item.title}}</span>
          <div class="time">
            <span>{{item.gettime}}</span>
            <span class="el-icon-edit" @click="editDraft(item,index)"></span>
            <span class="el-icon-delete" @click="deleDraft(index)"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      dataCity: [
        { value: "北京市" },
        { value: "上海市" },
        { value: "广州市" },
        { value: "深圳市" },
        { value: "大连市" },
        { value: "天津市" },
        { value: "重庆市" },
        { value: "武汉市" },
        { value: "南京市" },
        { value: "苏州市" },
        { value: "杭州市" },
        { value: "长沙市" },
        { value: "成都市" },
        { value: "西安市" },
        { value: "郑州市" },
        { value: "温州市" },
        { value: "福州市" },
        { value: "贵阳市" },
        { value: "南宁市" },
        { value: "昆明市" },
        { value: "兰州市" },
        { value: "合肥市" },
        { value: "青岛市" },
        { value: "厦门市" },
      ],
      form: {
        title: "",
        content: "",
        city: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    // 富文本文件上传
    imgUpload(file, Editor, currsorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("files", file);
      this.$axios({
        url: "/upload",

        data: formData,
        method: "post",
      })
        .then((res) => {
          // console.log(res.data);
          Editor.insertEmbed(
            currsorLocation,
            "image",
            this.$axios.defaults.baseURL + res.data[0].url
          );
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交
    submit() {
      // console.log(this.form);
      if (this.form.title.length == 0) {
        this.$message.warning("请填写攻略标题");
        return;
      }
      if (this.form.content.length == 0) {
        this.$message.warning("请填写攻略内容");
        return;
      }
      if (this.form.city.length == 0) {
        this.$message.warning("请选择城市");
        return;
      }
      this.$axios({
        url: "/posts",
        method: "post",
        data: this.form,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token,
        },
      }).then((res) => {
        // console.log(res.data);
        if (res.data.message == "新增成功") {
          this.$message.success("旅游攻略发布成功");
          this.loadPost();
        }
      });
    },
    // 刷新页面
    loadPost() {
      this.$axios({
        url: "/posts",
      }).then((res) => {
        (this.form.title = ""), (this.form.content = ""), (this.form.city = "");
      });
    },
    // 获取时间
    getTime() {
      let yy = new Date().getFullYear();
      var mm =
        new Date().getMonth() < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      var dd =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      return (this.gettime =
        yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss);
      // setInterval(this.getTime, 1000);
      // console.log(this.gettime);
    },

    // 草稿箱
    setDraftBox() {
      if (this.form.title.length == 0) {
        this.$message.warning("请填写攻略标题");
        return;
      }
      const dataDraft = {
        title: this.form.title,
        content: this.form.content,
        city: this.form.city,
        gettime: this.getTime(),
      };

      this.$store.commit("draft/addDraft", dataDraft);

      if (this.form.title.length > 0) {
        this.$message.success("草稿保存成功");
        // 刷新页面
        this.loadPost();
      }
      console.log("vuex数据", this.$store.state.draft.dataDraft);
    },
    // 草稿箱删除`
    deleDraft(index) {
      const dele = index;
      this.$store.commit("draft/remove", dele);
    },
    // 草稿箱编辑
    editDraft(item, index) {
      this.form = item;
    },
    handleSelect(index) {
      console.log(index);
    },
    querySearch(queryString, cb) {
      var restaurants = this.dataCity;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
  },
};
</script>

<style lang="less" scoped>
.article {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .articleLeft {
    width: 750px;
    h2 {
      font-weight: 400;
      margin-top: 24px;
    }
    p {
      font-size: 14px;
      color: #999;
      margin: 10px 0;
    }

    .selectCity {
      span {
        margin-right: 8px;
      }

      .city {
        width: 180px;
        margin-top: 14px;
      }
    }

    .draft {
      color: #ffa552;
      cursor: pointer;
    }
  }
  .articleRight {
    width: 225px;
    .draftBox {
      border: 1px solid #dddddd;
      padding: 16px 10px;
      color: #777;
      .draftBoxList {
        margin-top: 10px;
        .title {
          color: #333;
          font-size: 14px;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
            color: #ffb900;
          }
        }
        .time {
          margin-top: 3px;
          font-size: 12px;
          display: flex;
          align-items: center;
          span {
            &:nth-child(1) {
              flex: 1;
              color: #999;
            }
            &:nth-child(2),
            &:nth-child(3) {
              margin-right: 8px;
              font-size: 16px;
              color: #333;
            }
            &:nth-child(2):hover,
            &:nth-child(3):hover {
              cursor: pointer;
              color: #ffb900;
            }
          }
        }
      }
    }
  }
}
</style>
