<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username" @focus="clearMsg('username')"></el-input>
    </el-form-item>

    <!-- 给表单项指定对应的规则属性, 以字符串的形式设置在 prop 属性上 -->
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "13800138000",
        password: "123456"
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请正确输入用户名/手机",
            trigger: "blur"
          },
          // 还可以使用正则表达式
          {
            pattern: /^\d+$/,
            message: "用户名只能输入数字",
            trigger: "blur"
          }
        ],
        password: [
          {
            //当输入为空时提示
            required: true,
            message: "请正确输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 10,
            message: "密码长度在6-15之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.form.validate((isTrue, failureData) => {
        if (isTrue) {
          // this.$axios({
          //   url: "/accounts/login",
          //   data: this.form,
          //   method: "POST"
          // }).then(res => {
          //   console.log(res.data);
          //   if (res.data.token) {
          //     console.log("sure");

          //     this.$store.commit("user/setUserInfo", res.data);
          //     //   console.log(this.$store.user.userInfo);
          //     //this.$store.仓库名.属性名
          //   }
          // });

          this.$store.dispatch("user/login", this.form);
          console.log(this.$route.path);

          if (this.$route.path.startsWith("/air")) {
            //若路由为订单页，则登陆后隐藏dialog框就行
            this.$store.dispatch("user/login", this.form);
            this.$emit("transDialog");
          } else {
            this.$store.dispatch("user/login", this.form);
            this.$router.push("/");
          }
        } else {
          console.log(failureData);
        }
      });
    },
    clearMsg(msg) {
      this.$refs.form.clearValidate(msg);
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>