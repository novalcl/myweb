<template>
  <div class="register" :style="'height:'+ clientHeight + 'px'">
    <!-- 头部 -->
    <top-header title="登录" :left-options="{backText: '',backGround:'#fff',color:'#333'}"></top-header>
    <!-- 表单 -->
    <div class="form">
      <group class="no-border">
        <x-input placeholder="请输入手机号" type="text" :max="11" v-model="formData.mphone">
          <img class="left-icon" slot="label" src="../../assets/images/icon_username.png" alt>
        </x-input>
      </group>
      <group class="no-border">
        <x-input placeholder="请输入密码" :type="changeType" v-model="formData.password">
          <img class="left-icon" slot="label" src="../../assets/images/icon_lock.png" alt>
          <img class="right-icon" slot="right" @click="seePass" src="../../assets/images/icon_pwd_toggle.png" alt>
        </x-input>
      </group>

    </div>
    <!-- 提交按钮 -->
    <div class="register-btn">
      <x-button type="warn" action-type="reset" @click.native="login">登录</x-button>
    </div>
    <p class="register-div" @click="register">注册账号</p>
  </div>
</template>

<script>
import TopHeader from "../../components/TopHeader.vue";
import { XInput, Group, XButton, trim,Toast  } from "vux";
export default {
  name: "Bottom",
  props: {},
  data() {
    return {
      clientHeight: "",
      formData: {
        mphone: "", //手机号
        password: "", // 密码
      },
      changeType:"password",
    };
  },
  computed: {},
  components: {
    TopHeader,
    XInput,
    Group,
    XButton,
    Toast 
  },
  methods: {
    register(){
        this.$router.push({
            path:"/register"
        })
    },
    // 更改密码类型框
    seePass(){
      if(this.changeType == "text"){
        this.changeType = "password";
      }else {
        this.changeType = "text"
      }
    },
    validate(formData, fields, success) {
      for (let i in fields) {
        if (fields[i]["type"] == "mobile") {
          //手机号验证
          if (!/^1[3456789]\d{9}$/.test(formData[i])) {
            this.$vux.toast.show({
              text: fields[i]["msg"],
              type: "warn"
            });
            return false;
          }
        } else if (fields[i]["type"] == "required") {
          //为空验证
          if (trim(formData[i]) == "") {
            this.$vux.toast.show({
              text: fields[i]["msg"],
              type: "warn"
            });
            return false;
          }
        }
      }
      success && success();
    },
    // 登录
    login(){
        let isValidate = this.validate(
          this.formData,
          {
            mphone: {
              type: "mobile",
              msg: "必须为正确的手机号"
            },
            password: {
              type: "required",
              msg: "密码不能为空"
            },
          },
          () => {
            console.log(189)
            this.$axios
              .post(this.$apiUrl + "/apps/login/login", this.formData)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.code == "40000"){
                      //localStorage.setItem('userToken',res.data.list.token);
                      this.$store.commit('setToken',res.data.list.token)
                      this.$router.push({
                        path:"/mine"
                      })
                    }else{
                      this.$vux.toast.show({
                        text: res.data.hint,
                        type: "warn"
                      });
                    }
                }).catch((err) => {
                  
                });
          }
        )
    }
  },
  created() {
   
  },
  mounted() {
    this.clientHeight =
      document.documentElement.clientHeight -
      document.getElementsByClassName("top-header")[0].clientHeight;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.register .weui-cells,
.register .vux-no-group-title {
  margin-top: 0;
}
.no-border .weui-cells:after {
  border-bottom: none !important;
}
</style>

<style lang="less" scoped>
.form {
  margin-top: 15px;
}
.register {
  background: rgb(242, 242, 242);
}
.register {
  padding-top: 46px;
}
.left-icon {
  height: 25px;
  width: 25px;
  display: inline-block;
  padding-right: 20px;
}
.right-icon {
  height: 25px;
  width: 25px;
  display: inline-block;
  padding-right: 10px;
}
.register-btn {
  padding: 15px;
}
.register-div{
    text-align: right;
    margin-right: 15px;
}
</style>
