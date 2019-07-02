<template>
  <div class="station-wrapper">
    <!-- 头部 -->
    <top-header
      title="站内信"
      :left-options="{backText: '',backGround:'#fff',color:'#333'}"
      :editShow="true"
       @clickEdit="clickEdit"
    ></top-header>
    <div class="content-box">
      <div class="content-div" v-for="(item,index) in contentList" :key="index">
        <div class="msg-left">
           <img v-if="showBottom" :src="item.selected==0? require('../../assets/images/unselected@2x.png') : require('../../assets/images/selected@2x.png')" alt>
       
          <div class="msg-div">
            <p class="msg-title">
              {{item.title}}
              <span class="msg-span">{{item.addtime}}</span>
            </p>
            <p>{{item.message}}</p>
          </div>
        </div>
        <div class="msg-right">
          <img src="../../assets/images/more_icon.png" alt>
        </div>
      </div>
    </div>
    <div class="footer" v-if="showBottom">
      <div class="footer-title">
        <img src="../../assets/images/unselected@2x.png" alt>
        <span>全选</span>
      </div>
      <div class="del">删除</div>
    </div>
  </div>
</template>
<script>
import TopHeader from "../../components/TopHeader.vue";

export default {
  data() {
    return {
      contentList: [],
       showBottom: false,
    };
  },
  components: {
    TopHeader
  },
  methods: {
     clickEdit() {
      
      this.showBottom = this.showBottom == false ? true : false;
    },
    getList() {
      this.$axios
        .get(this.$apiUrl + "/apps/member/siteMessage", {
          params: {}
        })
        .then(res => {
          if (res.data.code == "40000") {
            for(let i in res.data.list.site_message){
              console.log(res.data.list.site_message[i])
            }
            this.contentList = res.data.list.site_message;
          } else {
            this.$vux.toast.show({
              text: res.data.hint,
              type: "warn"
            });
          }
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="less">
.content-box {
  padding-top: 46px;
  .content-div {
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-bottom: 1px solid white;
    line-height: 25px;
    .msg-left {
      flex: 1;
        display: flex;
        display: -webkit-flex;
        align-items: center;
      img {
         width: 25px;
          height: 25px;
          margin-right: 5px;
      }
    }
   
    .msg-right {
      position: absolute;
      right: 10px;
      img {
        width: 10px;
        height: 13px;
      }
    }
  }
}
.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #f5f5f5;
  .footer-title {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 2px;
      margin-left: 5px;
    }
  }
  .del {
    width: 60px;
    height: 50px;
    background: #ff5622;
    color: #ffffff;
    line-height: 50px;
    text-align: center;
  }
}
</style>
