<template>
  <div class="recommd-wrapper">
    <!-- 头部 -->
    <top-header title="商品评价" :left-options="{backText: '',backGround:'#fff',color:'#333'}" :right-options="{showMore:true}"></top-header>
    
    <div class="content">
        <div class="recommd-div" v-for="(item,index) in dataList" :key="index">
            <div class="recommd-box">
                <div class="left-div">
                    <img :src="item.head_pic" alt="">   
                    <div>
                        <p>{{ item.name }}</p>
                        <p>{{ item.time_spec_info }}</p>
                    </div>
                </div>
                <div class="start-div">
                    <rater v-model="item.praise" active-color="rgb(255, 161, 27)" :disabled="true"></rater>
                </div>
            </div>
            <div class="text-Box">
                <p>{{ item.content }}</p>
                <div class="text-img">
                    <img class="previewer-demo-img" v-for="(item, listindex) in item.listImg" :key="listindex" :src="item.src" width="100" @click="show(listindex,index)">
                </div>
            </div>
        </div>
    </div>

    <div v-transfer-dom>
        <previewer :list="list" ref="previewer" @on-index-change="logIndexChange"></previewer>
    </div>

  </div>
</template>

<script>
import { Popup, Grid, GridItem,Rater,Previewer,TransferDom   } from "vux";
import TopHeader from "../../components/TopHeader.vue";

export default {
   directives: {
    TransferDom
  },
  data() {
    return {
        data6: 3,
        list: [],
        dataList:[],    // 评价数据
    }
  },
  components: {
    TopHeader,
    Rater,
    Previewer 
  },
  methods:{
    logIndexChange (arg) {
      console.log(88,arg)
    },
    show (listindex,index) {
      this.list = this.dataList[index].listImg;
      console.log(999,this.dataList[index].listImg)
      var that = this;
      setTimeout(function () {
        that.$refs.previewer.show(listindex)
      }, 100)
    }
  },
  created(){
      this.$axios
        .get(this.$apiUrl + "/apps/product/comment", {
            params:{
                id:this.$route.query.gid,   // 获取商品id
            }
        })
        .then(res => {
            if(res.data.code == "40000"){
                for(let i in res.data.list.comment_list){
                    res.data.list.comment_list[i].listImg = [];     // 新添加对象值存放生成数据
                    for(let j in res.data.list.comment_list[i].img){
                        let obj = {
                            src:res.data.list.comment_list[i].img[j],
                            msrc:res.data.list.comment_list[i].img[j],
                        }
                        res.data.list.comment_list[i].listImg.push(obj)
                    }
                }
                this.dataList = res.data.list.comment_list;
            }else{
                this.$vux.toast.show({
                    text: res.data.hint,
                    type: "warn"
                });
            }
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content{
    padding: 50px 0 0 0;
    .recommd-div{
        padding: 10px 0;
        border-bottom: 1px solid #f5f5f5;
    }
    .recommd-box{
        padding: 0 10px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        .left-div{
            flex: 1;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            img{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                margin-right:10px;
            }
        }
    }
    .text-Box{
        padding: 0 10px;
        p{
            margin: 10px 0;
        }
        .text-img{
            width: 100%;
            display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
            img{
                width: 112px;
                height: 112px;
                margin: 5px 5px 0 0;
            }
        }
    }
}
</style>
