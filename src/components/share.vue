<template>
  <div class="shareBox">
    <popup v-model="shareShow" position="bottom">
        <grid :show-lr-borders="false">
            <grid-item :label="item.name" v-for="(item,index) in shareList" :key="index">
                <img slot="icon" :src="item.img">
            </grid-item>
        </grid>
    </popup>
  </div>
</template>

<script>
import { Popup, Grid, GridItem  } from "vux";

export default {
  name: 'Slide',
  props: {

  },
  data() {
    return {
        shareShow:false,
        shareList:[
            {
                name:"QQ好友",
                img:require("../assets/images/share/sns_icon_24@2x_b.png")
            },
            {
                name:"微信朋友圈",
                img:require("../assets/images/share/sns_icon_23@2x_b.png")
            },
            {
                name:"微信好友",
                img:require("../assets/images/share/sns_icon_22@2x_b.png")
            },
            {
                name:"新浪微博",
                img:require("../assets/images/share/sns_icon_1@2x_b.png")
            }
        ]
    }
  },
  components: {
    Popup,
    Grid, 
    GridItem 
  },
  methods:{
    show(){
        this.shareShow = true;
    }
  },
  created(){
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .shareBox .vux-popup-dialog{
        background: #ffffff !important;
    }
</style>

<style lang="less" scoped>

</style>
