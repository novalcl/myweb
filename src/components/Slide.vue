<template>
  <div class="Swiper">
    <swiper :loop="true"  :auto="true" dots-position="center" :aspect-ratio="375/750">
        <swiper-item class="swiper-demo-img" v-for="(item,index) in list" :key="index">
          <img :src="item.img">
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper,SwiperItem } from "vux";
import { delimiter } from 'path';

export default {
  name: 'Slide',
  props: {
    list:{
        type:Array,
        default:function(){
            return [
              {
                img:'https://dqpj.m.huisou.com/data/upload/20130801/51fa567b9976d.jpg'
              }
            ]
        }
        
    } // 幻灯片列表
  },
  components: {
    Swiper,
    SwiperItem
  },
  created(){
      console.log(this.list)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.swiper-demo-img{
  img{
    max-height:100%;
  }
}
</style>
