<template>
  <div class="wrapper">
    <!-- 头部 -->
    <div class="head-div">
      <div class="msg-icon" @click="mineMessage">
        <img src="https://ios.m.huisou.com/Public/Apps/images/mine_message.png" alt>
      </div>
      <div class="msg-Div" @click="editUser">
        <img class="head-img" :src="userMsg.head_pic" alt>
        <p>{{ userMsg.username }}</p>
      </div>
    </div>

    <div v-for="(item,index) in content" :key="index">
      <!-- 我的店铺 -->
      <div class="mine-shop" v-if="item.section_type == 'row_three'">
        <div class="title">{{ item.section_title }}</div>
        <div class="shopDiv">
          <div 
          v-for="(childItem,childIndex) in item.section_items" 
          :key="childIndex"
           @click="clickShop(childItem)">
            <img :src="childItem.icon" alt>
            <p>{{ childItem.title }}</p>
          </div>
        </div>
      </div>

      <!-- 常用工具 -->
      <div class="mine-Box" v-if="item.section_type == 'row_four'">
        <div class="title">{{ item.section_title }}</div>
        <div class="shopBox">
          <div
            v-for="(childItem,childIndex) in item.section_items"
            @click="clickCollect(childItem)"
            :key="childIndex"
            
          >
            <img :src="childItem.icon" alt>
            <p>{{ childItem.title }}</p>
          </div>
        </div>
      </div>

      <!-- 我的服务 -->
      <!-- <div class="mine-shop">
      <div class="title">我的服务</div>
      <div class="shopDiv">
        <div>
          <img src="../../assets/images/mine/shop.png" alt="">
          <p>关于APP</p>
        </div>
        <div>
           <img src="../../assets/images/mine/shop.png" alt="">
            <p>下载二维码</p>
        </div>
        <div>
           <img src="../../assets/images/mine/shop.png" alt="">
            <p>意见反馈</p>
        </div>
      </div>
      </div>-->
    </div>

    <!-- 底部导航 -->
    <bottom></bottom>
  </div>
</template>

<script>
import { XInput, Group, XButton, trim } from "vux";
import Bottom from "../../components/Bottom.vue";

export default {
  data() {
    return {
      userMsg: "", // 用户信息值
      content: [] // 内容值
    };
  },
  computed: {},
  components: {
    Bottom
  },
  methods: {
    clickShop(item){
console.log(item);
      if (item.href == "company_apply" || item.href == "weburl") {
        this.$router.push({
          path: "/mineshop"
        });
      }else if(item.href == "company_collect"){
        this.$router.push({
          paht:"/collectmerchant"
        });
      }
    },
    clickCollect(item) {
      console.log(item);
      if (item.href == "product_collect") {
        this.$router.push({
          path: "/collectmessage"
        });
      }else if(item.href == "company_collect"){
        this.$router.push({
          path:"/collectmerchant"
        })
      }else if(item.href == "new_collect"){
        this.$router.push({
          path:"/collectnews"
        })
      }else if(item.href == "about"){
        this.$router.push({
          path:"/aboutapp"
        })
      }
    },
    // clickServe(item) {
    //   console.log(item);
    //   if (item.href == "weburl") {
    //     this.$router.push({
    //       path: "/mineshop"
    //     });
    //   }
    // },
    editUser() {
      this.$router.push({
        path: "/edituser"
      });
    },
    mineMessage() {
      this.$router.push({
        path: "/minemessage"
      });
    }
  },
  created() {},
  mounted() {
    // this.$store.commit('setCount',2)
    // this.$store.dispatch('setAddCount',88)

    // console.log(this.$store.state.count)
    // console.log(this.$store.getters.doneTodosCount)
    // console.log(888,this.$store.state.count)
    console.log(8888, this.$store.state.token);

    this.$axios
      .get(this.$apiUrl + "/apps/member/index", {
        params: {}
      })
      .then(res => {
        if (res.data.code == "40000") {
          this.userMsg = res.data.list.member_info;
          this.content = res.data.list.section;
        } else if (res.data.code == "40004") {
          this.$router.push({
            path: "/login"
          });
        } else {
          this.$vux.toast.show({
            text: res.data.hint,
            type: "warn"
          });
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.wrapper {
  width: 100%;
  background: #f5f5f5;
  padding-bottom: 63px;
  overflow: hidden;
}
.head-div {
  height: 120px;
  background: #ccc;
  padding: 10px;
  .msg-icon {
    width: 100%;
    img {
      width: 20px;
      height: 20px;
      float: right;
    }
  }
  .msg-Div {
    width: 100%;
    text-align: center;
    margin-top: 15px;
    img {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      border-radius: 50%;
    }
    p {
      font-size: 16px;
      color: #fff;
    }
  }
}
.mine-shop {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
  .title {
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
  }
  .shopDiv {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      flex: 1;
      text-align: center;
      border-right: 1px solid #d9d9d9;
      // border-bottom: 1px solid #ccc;
      padding: 20px 0;
      img {
        width: 28px;
        height: 28px;
        margin: 0 auto;
      }
      p {
        margin-top: 5px;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
.mine-Box {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
  .title {
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
  }
  .shopBox {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    div {
      width: 25%;
      text-align: center;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #ccc;
      padding: 20px 0;
      margin-right: -1px;
      img {
        width: 28px;
        height: 28px;
        margin: 0 auto;
      }
      p {
        margin-top: 5px;
      }
    }
  }
}
</style>
