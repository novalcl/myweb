<template>
  <div class="top-header">
    <x-header
      :left-options="leftOptions"
      :style="'background:' + leftOptions.backGround +';'"
      :right-options="rightOptions" 
      @on-click-more="showMore"
    >
    <span :style="'color:' + leftOptions.color + ';'">{{title}}</span>
    <span v-if="editShow" @click="clickEdit" slot="right">{{editName}}</span>
    <img v-if="showSearch" @click="clickSearch" slot="right" class="search" src="../assets/images/search.png" alt="">
    <img v-if="showShare" @click="clickShare" slot="right" class="share" src="http://dqpj.m.huisou.com/Public/App/images/share_icon.png" width="18px" height="18px" alt="">
    </x-header>

    <!-- 更多 -->
    <div>
      <actionsheet v-model="moreOpen" :menus="moreMenue" show-cancel @on-click-menu="clickMenu" cancel-text="关闭"></actionsheet>
    </div>
    <!-- 更多联系客服 -->
    <confirm v-model="phoneShow"
      title="提示"
      @on-confirm="phoneConfirm"
      >
        <p style="text-align:center;">确认拨打电话吗?</p>
      </confirm>

  </div>
</template>

<script>
import { XHeader,Actionsheet,Confirm  } from "vux";
export default {
  name: "TopHeader",
  props: {
    leftOptions: {
      type: Object,
      default: function() {
        return {
          showBack: false,
          backGround: "#6596ed",
          color: "#fff"
        };
      }
    },
    title:{
      type: String,
      default:'首页'
    },
    rightOptions:{
      type: Object,
      default: function() {
        return {
          showMore: false,
        };
      }
    },
    showSearch:{
      type: Boolean,
      default:false
    },
    showShare:{
      type: Boolean,
      default:false
    },
    editShow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      moreOpen:false,
      moreMenue:[
        {
          label: "返回首页",
          type: 1
        }, 
        {
          label: "我的消息",
          type: 2
        },
        {
          label: "联系客服",
          type: 3
        }
      ],
      phoneShow:false, // 联系客服的确认框
       editName:"编辑"
    }
  },
  components: {
    XHeader,
    Actionsheet,
    Confirm
  },
  methods:{
   //点击编辑
   clickEdit(){
     this.editName= this.editName=="编辑"? "完成" : "编辑"
     this.$emit('clickEdit',true)
      
   },
    // 点击搜索
    clickSearch(){
      console.log(444)
      this.$emit('clickSearch',true);
    },
    clickShare(){
      console.log(444)
      this.$emit('clickShare',true);
    },
    showMore(){
      // this.$emit("clickMore",true)
      this.moreOpen = true;
    },
    // 点击更多触发
    clickMenu(menuKey, menuItem){
      if(!menuItem){
        return false;
      }
      if(menuItem.type == 1){
        this.$router.push({
          path:"/index"
        })
      }else if(menuItem.type == 2){

      }else if(menuItem.type == 3){
        this.phoneShow = true;
      }
    },
    //联系客服确定
    phoneConfirm(){
      window.location.href = "tel://10086";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.search{
  width: 18px;
  height: 18px;
}
</style>
