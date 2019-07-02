<template>
    <div class="album">
           <div v-for="(item, index) in compro2" :key="index">
            <img class="previewer-demo-img" :src="item" width="100" @click="show(index)">
           </div>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem,Previewer } from 'vux'
export default {
    props:{
        compro2:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{

        }
    },
     components: {
    Flexbox,
    FlexboxItem,
    Previewer
  },
//  mounted(){
//      console.log(2222,this.compro2);
//  },

  methods:{
      show (index) {
      this.$refs.previewer.show(index)
    }
  }
}
</script>
<style lang="less">
.album{
   background-color:#ccc;
    margin-left: 0 !important;
    width: 100%;
     box-sizing: border-box;
     display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    div{
        width:48%;
        height: 150px;
        margin-bottom:10px;
        background-color: #fff;
        margin-left: 2px;
        margin-top:4px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
