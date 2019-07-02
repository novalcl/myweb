<template>
    <div class="listtest">
        <!-- 头部 -->
    <top-header title="商品评价" :left-options="{backText: '',backGround:'#fff',color:'#333'}" :showSearch="true">
        
    </top-header>
   <div>
        
    <search
      class="search-s"
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
     @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
      placeholder="请输入关键词搜索"></search>
   </div>
    <div class="list-nav">
    <flexbox>
      <flexbox-item><div class="flex-demo">
          综合
      
          </div>
        </flexbox-item>
      <flexbox-item><div class="flex-demo">价格
          <x-icon type="ios-arrow-up" ></x-icon>
        <x-icon type="ios-arrow-down"></x-icon>
          </div></flexbox-item>
      <flexbox-item><div class="flex-demo">售量
          <x-icon type="ios-arrow-up"></x-icon>
        <x-icon type="ios-arrow-down"></x-icon>
          </div></flexbox-item>
      <flexbox-item><div class="flex-demo">最新
          <x-icon type="ios-arrow-up"></x-icon>
        <x-icon type="ios-arrow-down"></x-icon>
          </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
            <img v-show="iSflex == true" src="../../assets/images/goods_row_icon.png" alt="">
            <img v-show="iSflex == false" src="../../assets/images/goods_list_icon.png"  alt="">
          </div></flexbox-item>
    </flexbox>
    </div>
    <div class="container">
        <div class=""></div>
        <div class=""></div>
    </div>
    </div>
</template>
<script>
import TopHeader from "../../components/TopHeader.vue";
import { Flexbox, FlexboxItem,Search } from 'vux'

export default {
    name:"listtest",
    components: {
    TopHeader,
    Flexbox,
    FlexboxItem,
    Search
  },
  data(){
      return{
          iSflex:true
      }
  }
}
</script>
<style lang="less">
.listtest{
    background-color:#ddd; 
}
.list-nav{
    background-color:#fff; 
    margin-top:46px;
    padding-top:13px;
    padding-bottom:13px;
    border-top:1px solid #ddd;
    .flex-demo{
      display: flex;
      justify-content: space-around;
      align-items: center;
        font-size: 16px;
        text-align: center;
        position: relative;
        img{
           width: 25px;
           height: 25px; 
        }
        .vux-x-icon-ios-arrow-up{
            position:absolute;
            top:1px;
            right: 2px;
        }
.vux-x-icon-ios-arrow-down{
      position:absolute;
            bottom:1px;
            right: 2px;
}
    }
    .vux-x-icon{
        width: 12px;
        height: 12px;
    }
}
.search-s{
    margin-top:46px;
    display: none;
}
</style>
