<template>
    <div class="company_warpper">
        <!-- 头部标题 -->
        <top-header title="商品详情" :left-options="{backText: '',backGround:'#fff',color:'#333'}" :right-options="{showMore:true}"></top-header>
        <!-- 轮播图 -->
        <div class="company-item-top">
            <img width="70px" height="70px" :src="comInfo.logo" alt="">
            <p class="title">
                {{comInfo.name}}
            </p>
        </div>
        <!-- 企业收藏 -->
        <div class="company-flexbox">
            <div class="vux-flexbox-item-left">{{comInfo.business}}</div>
            <div class="vux-flexbox-item-right">
                <button @click="clickCollect">{{ comInfo.collect_code == "40006" ? "已收藏" :"+收藏" }}</button>
            </div>
        </div>
        <div class="company-tab">
        <tab>
            <tab-item selected active-color="#6596ed" @on-item-click="onItemClick">全部宝贝</tab-item>
            <tab-item @on-item-click="onItemClick">企业简介</tab-item>
            <tab-item @on-item-click="onItemClick">企业相册</tab-item>
            <tab-item @on-item-click="onItemClick">联系我们</tab-item>
        </tab>
            <div v-show="navSelect == 0" >
                <all-select :compro="comInfo1"></all-select>
            </div>
            <div v-show="navSelect == 1">
                <brief :compro1="comInfo2"></brief>
            </div>
            <div v-show="navSelect == 2">
                <album :compro2="comInfo3"></album>
            </div>
            <div v-show="navSelect == 3"></div>
        </div>
    </div>
</template>
<script>
import TopHeader from "../../components/TopHeader.vue";
import AllSelect from "../../components/Company/AllSelect.vue";
import Brief from "../../components/Company/Brief.vue";
import Album from "../../components/Company/Album.vue";
import { Tab, TabItem } from 'vux'
export default {
    data(){
        return{
            navSelect:0,
            comInfo:"",
            comInfo1:[],
            comInfo2:"",
            comInfo3:[],
        }
    },
     components: {
    TopHeader,
    Tab,
    TabItem,
    AllSelect,
    Brief,
    Album
  },
  methods:{
      onItemClick(index){
          console.log(index)
          this.navSelect = index;
      },
        clickCollect(){
        if(this.comInfo.collect_code == "40006"){
            var url = "apps/general/collectDel"
        }else{
            var url = "apps/general/collectAdd"
        }
        this.$axios
            .post(this.$apiUrl + url, {
                aid: this.$route.query.id,
                favorite_category:3,
                title:this.comInfo.name,
                token:localStorage.token
            })
            .then(res => {
                if(res.data.code == "40000"){
                    this.$vux.toast.show({
                        text:res.data.hint,
                        type:"success"
                    })
                    this.comInfo.collect_code = this.comInfo.collect_code == "40006" ? "40005" : "40006"
                }else{
                    this.$vux.toast.show({
                        text:res.data.hint,
                        type:"warn"
                    })
                }
            })
    },
      goList(){
          this.$axios.get(this.$apiUrl+"/apps/company/detail",{
            params:{
                id:this.$route.query.id
            
            }
          })
          .then(res => {
              console.log(111,res)
              if(res.data.code == "40000"){
                  console.log(res.data.list.company_info)
                  this.comInfo = res.data.list.company_info
              }
          })
      },
      List(){
          this.$axios.get(this.$apiUrl+"/apps/product/index",{
            params:{
                company_id:this.$route.query.id
            
            }
          })
          .then(res => {
              console.log(111,res)
              if(res.data.code == "40000"){
                  console.log(res.data.list.product_list)
                  this.comInfo1 = res.data.list.product_list
                  console.log(5555,this.comInfo1)
              }
          })
      },
       BriefList(){
          this.$axios.get(this.$apiUrl+"/apps/company/introduction",{
            params:{
                id:this.$route.query.id
            
            }
          })
          .then(res => {
              console.log(343,res)
              if(res.data.code == "40000"){
                  console.log(res.data.list)
                  this.comInfo2 = res.data.list
                  console.log(5555,this.comInfo2)
              }
          })
      },
       AlbumList(){
          this.$axios.get(this.$apiUrl+"/apps/company/album",{
            params:{
                id:this.$route.query.id
            
            }
          })
          .then(res => {
              console.log(1111,res)
              if(res.data.code == "40000"){
                  console.log(res.data.list.album)
                  this.comInfo3 = res.data.list.album
                  console.log(24234,this.comInfo3)
              }
          })
      }
  },
  mounted(){
      this.goList();
      this.List();
      this.BriefList();
      this.AlbumList();
  }
}
</script>
<style lang="less">
.company_warpper{
    background-color:#ccc;
}
.company-item-top{
    margin-top:46px;
    width: 100%;
    height: 185px;
    background:url("https://dqpj.m.huisou.com/Uploads/Admin/image/20190501/5cc8756ae100c.png")  no-repeat;
    background-size: 100% 100%;
    position: relative;
    img{
    position: absolute;
    top: 30px;
    left: calc(50% - 35px);
    }
    p{
        position: absolute;
    top: 120px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size:16px;
    color:#fff;
    text-shadow: 0 0 2px #000;

    }
}
.company-flexbox{
    background-color:#fff;
    display: flex;
    line-height: 50px;
.vux-flexbox-item-left{
    width:70%;
    text-align: center;
}
.vux-flexbox-item-right{
    button{
        background-color:#6596ed;
        color:#fff;
        padding:8px 24px;
        border-radius:15px;
       outline: none;
       border:none;
    }
}
}
.company-tab{
    padding-top:10px;
    ul{
        display: flex;
    justify-content: center;
    align-items: center;
    }
}
</style>
