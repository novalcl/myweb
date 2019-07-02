<template>
    <div class="all-select">
        <flexbox :gutter="0" wrap="wrap" justify="space-between">
             <flexbox-item :span="1/2" v-for="(item,index) in compro" :key="index">
                 <div class="flex-demo">
                    <img width="100%" height="150px"  :src="item.img" alt="">
                    <p>{{item.title}}</p>
                    <div>
                        <span class="price">{{item.price}}</span>
                        <span>{{item.sale_num}}</span>
                    </div>
                 </div>
             </flexbox-item>
            
             
             
         </flexbox>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
    props:{
        compro:{
            type:Array
        }
    },
    data(){
      return{
          
      }
    },
     components: {
    Flexbox,
    FlexboxItem
  },
  methods:{
     
      
  },
  mounted(){

  }
}
</script>
<style lang="less">
.all-select{
box-sizing: border-box;
}
.flex-demo{
    background-color:#fff;
    margin-left: 0 !important;
    width: 92%;
     padding-left:10px;
    margin-bottom: 10px;
    div{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    p{
        overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
   -webkit-line-clamp:2;
    }
    img{
        width:100%;
        height: 150px;
        display: flex;
         justify-content: center;
         align-items: center;
        
    }
    span:last-child{

         overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }
}
.price{
    color:red;
}
</style>
