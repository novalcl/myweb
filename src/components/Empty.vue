<template>
  <div class="empty" v-show="visible">
    <img :src="img" width="120" height="120" alt="">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    visible:{
        type:Boolean,
        default:false,
    },
    title:{
        type:String,
        default:'暂无数据'
    },
    img:{
        type:String,
        default:require('../assets/images/common_empty.png') 
    }
  },
  beforeDestroy() {
  },
  created() {
    
  },
  methods: {
    
  },
  components: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.empty{
    padding-top:50px;
    img{
        margin:0 auto;
    }
    p{
        text-align:center;
        margin:20px 0;
    }
}
</style>
