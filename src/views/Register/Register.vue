<template>
  <div class="register" :style="'height:'+ clientHeight + 'px'">
    <!-- 头部 -->
    <top-header title="注册" :left-options="{backText: '',backGround:'#fff',color:'#333'}"></top-header>
    <!-- 表单 -->
    <div class="form">
      <group class="no-border">
        <x-input placeholder="请输入手机号" v-model="formData.mphone">
          <img class="left-icon" slot="label" src="../../assets/images/icon_username.png" alt>
        </x-input>
      </group>
      <group class="no-border">
        <x-input placeholder="请输入密码" :type="passType" v-model="formData.password">
          <img class="left-icon" slot="label" src="../../assets/images/icon_lock.png" alt>
          <img class="right-icon" v-if="seePassIcon" @click="seePassword(1)" slot="right" src="../../assets/images/icon_lock.png" alt>
          <img class="right-icon" v-if="seePassIcon == false" @click="seePassword(1)" slot="right" src="../../assets/images/icon_pwd_toggle.png" alt>
        </x-input>
      </group>
      <group>
        <x-input placeholder="请输入确认密码" v-model="formData.repassword">
          <img class="left-icon" slot="label" src="../../assets/images/icon_lock.png" alt>
          <img class="right-icon" v-if="seePassIcon1" @click="seePassword(2)" slot="right" src="../../assets/images/icon_lock.png" alt>          
          <img class="right-icon" v-if="seePassIcon1 == false" slot="right" @click="seePassword(2)" src="../../assets/images/icon_pwd_toggle.png" alt>
        </x-input>
      </group>
    </div>
    <!-- 提交按钮 -->
    <div class="register-btn">
      <x-button type="warn" action-type="reset" @click.native="register">注册</x-button>
    </div>
    <!-- 协议 -->
    <div class="deal">
      注册即可表示同意
      <router-link to="/service" class="fc">《服务协议》</router-link>
    </div>
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
        repassword: "" // 重复密码
      },
      passType:"password",  // 密码框类型值
      seePassIcon:false,    // 密码icon显示
      seePassIcon1:false,
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
    //服务协议
    service(){
      this.$router.push({
        path:"/service"
      })
    },
    // 密码框类型切换 2 text 1 password
    seePassword(type){
      if(type == 1){
        this.seePassIcon = !this.seePassIcon; // 判断图标
      }else{
        this.seePassIcon1 = !this.seePassIcon1; // 判断图标
      }
      if(this.passType == "password"){
        this.passType = "text";
      }else{
        this.passType = "password";
      }
      
    },
    validate(formData, fields, success) {
      console.log(this.formData)
      // fields.forEeach(val=>{
      //   console.log(val)
      // })
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
        } else if (fields[i]["type"] == "repassword") {
          // 密码不一致
          if (formData.password != formData.repassword) {
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
    register() {
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
          }
          ,
          repassword: {
            type: "repassword",
            msg: "密码输入不一致"
          }
        },
        () => {
          console.log(this);
          this.$axios
            .post(this.$apiUrl + "/apps/register/register", this.formData)
            .then(res => {
              if(res.data.code == "40000"){
                localStorage.setItem('userToken',res.data.list.token);
              }else{
                this.$vux.toast.show({
                  text: res.data.hint,
                  type: "warn"
                });
              }
            });
        }
      );

      // if(!(/^1[3456789]\d{9}$/.test(this.formData.mphone))){
      //   // alert('手机号有误!')
      //   // 显示
      //   this.$vux.toast.show({
      //     text: '手机号有误!',
      //     type:'warn'
      //   })
      //   return
      // }
      // if(trim(this.formData.password) == ''){
      //   this.$vux.toast.show({
      //     text: '密码不能为空!',
      //     type:'warn'
      //   })
      //   return;
      // }
      // if(trim(this.formData.password) != this.formData.repassword){
      //   this.$vux.toast.show({
      //     text: '密码和重复密码必须要相等',
      //     type:'warn'
      //   })
      //   return;
      // }
    }
  },
  created() {
    //   document.body.style.background = 'rgb(242, 242, 242)'
    // console.log(this.$route)
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
.deal {
  text-align: center;
  .fc {
    color: #6596ed;
    text-decoration: underline;
  }
}
</style>
