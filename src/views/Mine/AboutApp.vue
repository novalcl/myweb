<template>
  <div class="about-app">
    <!-- 头部 -->
    <top-header title="关于App" :left-options="{backText: '',backGround:'#fff',color:'#333'}"></top-header>
    <div class="container">
      <div class="logo">
        <img class="logo" :src="goList.logo" alt>
      </div>
      <div class="more-tel">
        <group class="more">
          <cell class="tel-cell" title="客服电话">
            <span class="tel">{{goList.telephone}}</span>
          </cell>
          <cell @click.native="AboutWe" title="关于我们" is-link></cell>
          <cell @click.native="FeedBack" title="意见反馈" is-link></cell>
        </group>
      </div>
      <div class="footer">
        <div class="logout">
          <x-button type="warn" @click.native="logOut">退出登录</x-button>
          
        </div>
<div class="copyright">{{goList.copyright}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XButton } from "vux";

import TopHeader from "../../components/TopHeader.vue";

export default {
  data() {
    return {
      goList: ""
    };
  },
  components: {
    TopHeader,
    Group,
    Cell,
    XButton
  },
  methods: {
    AboutWe(){
      this.$router.push({
        path:"/aboutwe"
      })
    },
    FeedBack(){
      this.$router.push({
        path:"/feedback"
      })
    },
      logOut(){
          // 显示
          
            this.$vux.confirm.show({
            // 组件除show外的属性
            title:"退出登录提示",
            content:"确定要退出登录吗？",
            onCancel : () => {
                console.log(this) //当前 vm
            },
                onConfirm : () => {
                     this.$router.push({
              path:"/login"
          })
                }
                })
         
      }
  },
  created() {
    this.$axios
      .get(this.$apiUrl + "/apps/member/about", {
        params: {
          
        }
      })
      .then(res => {
        if (res.data.code == "40000") {
          this.goList = res.data.list;
        } else {
          this.$vux.toast.show({
            text: res.data.hing,
            type: "wran"
          });
        }
      });
  }
};
</script>
<style lang="less">
.container {
  background-color: #eee;
  border-top: 1px solid #ccc;
  padding-top: 46px;
  .logo {
    background-color: #fff;
    padding: 20px 0px;
    img {
      margin: 0px auto;
      width: 100px;
      height: 100px;
    }
  }
  .more-tel {
    .more {
      .tel-cell {
        border-bottom: 20px solid #eee;
      }
      .tel {
        color: #f15252;
      }
    }
  }
  .footer {
    background-color: #eee;
    .logout {
      width: 90%;
      margin: 0px auto;
      margin-top: 30px;
    }
    .copyright {
      padding: 30px 10px;
      text-align: center;
    }
  }
}
</style>
