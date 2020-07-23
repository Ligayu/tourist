<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info" v-model="form">
        <div class="member-info-item" v-for="(item,index) in form" :key="index">
          <el-form-item label="乘机人">
            <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
              <!-- <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>-->
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" v-model="item.id" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <!-- <el-checkbox-group v-model="insurances">
        <div class="insurance-item" v-for="(item, index) in flightData.insurances" :key="index">-->
        <!-- 对于 checkbox 来说, label 是最终存放在数组中供接口使用的数据
        如果我们希望显示不一样的内容给用户, 就放在开闭标签之间-->
        <!-- <el-checkbox
              :label="item.id"
              border
              @change="handleInsurance(item.id)"
            >{{`${item.type}：￥${item.price}/份×${form.length} 最高赔付${item.compensation}`}}</el-checkbox>
          </div>
        </el-checkbox-group>-->
        <div class="insurance-item" v-for="(item,index) in flightData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1 最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 提交订单后显示提示框 -->
    <el-dialog :visible.sync="dialogFormVisible" width="30%">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active: currentTab === index}"
            v-for="(item, index) in [`登录`, `注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>

        <!-- 登录功能组件 -->
        <LoginForm v-if="currentTab == 0" @transDialog="hideDialog" />

        <!-- 注册功能组件 -->
        <RegisterForm v-if="currentTab == 1" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LoginForm from "@/components/user/loginForm";
import RegisterForm from "@/components/user/RegisterForm";
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      currentTab: 0,
      form: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], // 保险数据
      contactName: "", // 联系人名字
      contactPhone: "", // 联系人电话
      captcha: "000000", // 验证码
      invoice: false, // 发票
      dialogFormVisible: false
    };
  },
  props: {
    flightData: {
      //若dan'dan's
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    hideDialog() {
      this.dialogFormVisible = false;
    },
    handleChangeTab(index) {
      this.currentTab = index;
    },
    // 添加乘机人
    handleAddUsers() {
      this.form.push({
        username: "",
        id: ""
      });
      this.allPrice();
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.splice(index, 1);
      this.allPrice();
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$axios({
        url: "/captchas",
        method: "post",
        header: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: {
          tel: this.contactPhone
        }
      }).then(res => {
        console.log(res.data);
      });
    },
    //保险的勾选
    handleInsurance(id) {
      console.log("保险id", id);

      if (this.insurances.indexOf(id) > -1) {
        // let arr = this.insurances.slice(0); //获得数组中所有的元素
        this.insurances = this.insurances.splice(
          this.insurances.indexOf(id),
          1
        );
      } else {
        // this.insurances = [...new Set([...this.insurances, id])];
        this.insurances = [...this.insurances, id];
      }
      this.$emit("transInsurance", this.insurances);
    },
    // 提交订单
    handleSubmit() {
      if (!this.$store.state.user.userInfo.token) {
        this.dialogFormVisible = true;
      }
      const orderData = {
        users: this.form,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.flightData.seat_infos.seat_xid,
        air: this.flightData.id
      };
      this.$axios({
        url: "/airorders",
        method: "post",
        data: orderData,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res.data);
        const {
          data: { id }
        } = res.data;

        // 跳转到付款页
        this.$router.push({
          path: "/air/pay",
          query: {
            id
          }
        });
      });
    },
    allPrice() {
      console.log(123);
      let price = 0;
      let len = this.form.length;
      if (this.flightData) {
        console.log(this.flightData.seat_infos.org_settle_price);

        price += this.flightData.seat_infos.org_settle_price * len;
        this.flightData.insurances.forEach(element => {
          if (this.insurances.indexOf(element.id) > -1) {
            price += element.price * this.form.length;
          }
        });
      }

      price += this.flightData.airport_tax_audlet * len;
      console.log("price", price);

      // 触发设置总金额事件
      this.$emit("setAllPrice", price);
    }
  },
  // computed: {
  //   // 计算总价格
  //   allPrice() {
  //     console.log(123);
  //     let price = 0;
  //     let len = this.form.length;

  //     price += this.flightData.seat_infos.org_settle_price * len;

  //     // this.insurances.forEach(item => {
  //     //   price += this.flightData.insurances[item - 1].price * len;
  //     // });
  //     this.flightData.insurances.forEach(element => {
  //       if (this.insuranceList.indexOf(element.id) >= 0) {
  //         price += element.price * this.form.length;
  //       }
  //     });

  //     price += this.flightData.airport_tax_audlet * len;

  //     // 触发设置总金额事件
  //     this.$emit("setAllPrice", price);

  //     return price;
  //   }
  // },
  watch: {
    form: {
      handler() {
        console.log("人数发生了变化");
        this.allPrice();
      },
      immediate: true
    },
    insurances: {
      handler() {
        console.log("保险发生了变化");
        this.allPrice();
      },
      immediate: true
    }
  },
  mounted() {
    this.allPrice();
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
.tabs {
  span {
    display: block;
    width: 50%;
    height: 50px;
    box-sizing: border-box;
    border-top: 2px #eee solid;
    background: #eee;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
    color: #666;

    &.active {
      color: orange;
      border-top-color: orange;
      background: #fff;
      font-weight: bold;
    }
  }
}
</style>