<template>
  <div class="good-wrapper">
    <!-- 头部 -->
    <top-header
      title="商品详情"
      :left-options="{backText: '',backGround:'#fff',color:'#333'}"
      :right-options="{showMore:true}"
      @clickMore="clickMore"
    ></top-header>
    <!-- 轮播图 -->
    <slide :list="swiperList"></slide>
    <!-- 商品信息 -->
    <div class="good-msg">
      <div class="first-good">
        <div class="good-box">
          <h5 class="name">{{ goodDetail.title }}</h5>
          <p class="price">
            <span class="cprice">¥{{ goodDetail.price }}</span>
            <span class="oprice">¥{{ goodDetail.oprice }}</span>
          </p>
        </div>
        <div class="share-box" @click="clickShare">
          <img src="../../assets/images/goods_share.png" alt>
          <p>分享</p>
        </div>
      </div>
      <div class="product-num">
        <div>{{ goodDetail.sale_num }}</div>
        <div>{{ goodDetail.num }}</div>
      </div>
    </div>
    <!-- 规格属性 -->
    <div class="goos-commis" @click="goProperty">
      <div>规格属性</div>
      <div class="commis-box" >
        <img src="../../assets/images/more_icon.png" alt="">
      </div>
    </div>
   
    <!-- 商品评价-->
    
    <div class="goos-commis">
      
      <div>宝贝评价</div>
      <div class="commis-box" @click="seeRecommd">
        <span>{{ goodDetail.product_comment }}</span>
        <img src="../../assets/images/more_icon.png" alt>
      </div>
    </div>

    <!-- 企业信息 -->
    <div class="company-box">
      <div class="img-box">
        <img :src="goodDetail.logo" alt>
      </div>
      <div class="company-msg">
        <p class="company-name">{{ goodDetail.company_name }}</p>
        <p class="company-content">{{ goodDetail.business }}</p>
      </div>
      <div class="more">
        <img src="../../assets/images/more_icon.png" alt>
      </div>
    </div>

    <!-- 图文详情 -->
    <div class="textimg-detail">
      <div class="title">图文详情</div>
      <div class="content" v-html="goodDetail.summary"></div>
    </div>

    <!-- 推荐商品 -->
    <div class="recommed-box">
      <div class="title">为你推荐</div>
      <div class="recommed-div">
        <div class="good-div" v-for="(item,index) in goodRecommd" :key="index">
          <div class="img-div">
            <img :src="item.img" alt>
          </div>
          <h5 class="good-title">{{ item.title }}</h5>
          <p class="good-sub_title">{{ item.short_title }}</p>
          <p class="good-price">¥{{item.price}}</p>
        </div>
      </div>
    </div>

    <div class="collect-div">
      <x-button
        type="warn"
        @click.native="collect"
      >{{ goodDetail.collect_code == "40006" ? "已收藏" : "收藏" }}</x-button>
    </div>

    <!-- 加载更多 -->
    <load-more @reachBottom="reachBottom" :visible="showLoadMore" :no-more-data="noMoreData"></load-more>
    <!-- 分享 -->
    <Share ref="share"></Share>
     <!-- 规格属性触发的事件 -->
     <div >
      <popup v-model="goShow" position="bottom">
        <div class="position-vertical-demo">
          <div class="header">
            <div class="logo">
              <img src="http://image.huisou.com/image/Enterprise/6921/243812/201101131314072504.jpg-middle" alt="">
            </div>
            <div class="desc">
              <div class="price-stock">
              <span class="goods-price">￥1.00</span>
              <span class="goods-stock">库存:9999999</span>
              
                </div>
                <p class="size-flow">
               请选择
              <span class="goods-size">尺码</span>
              <span class="goods-flow">物流</span>  
            </p> 
            </div>
          </div>
          <div class="container">
             
            <div class="box">
              <span>颜色</span>
                <checker  default-item-class="demo5-item"
                    selected-item-class="demo5-item-selected">
                  <!-- <checker-item class="oneitem" :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item> -->
                  <checker-item class="oneitem" :value="item" v-for="(item, index) in items1" :key="index">{{item}}</checker-item>
                </checker>
                
                <br>
          </div>
         <div class="box">
           <span>尺寸</span>
                <checker  default-item-class="demo5-item"
                    selected-item-class="demo5-item-selected">
                  <checker-item class="oneitem" :value="item" v-for="(item, index) in items2" :key="index">{{item}}</checker-item>
                </checker>
                
                <br>
          </div>
         <div class="box">
              <span>物流</span>
                <checker default-item-class="demo5-item"
                    selected-item-class="demo5-item-selected">
                  <checker-item class="oneitem" :value="item" v-for="(item, index) in items3" :key="index">{{item}}</checker-item>
                </checker>
                
                <br>
          </div>
        
          </div>
          <div class="footer">
            <x-button type="warn" @click.native="goClose">关闭</x-button>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import TopHeader from "../../components/TopHeader.vue";
import { XInput, Group, XButton, trim, Toast,Popup,Checker, CheckerItem } from "vux";
import Slide from "../../components/Slide.vue";
import LoadMore from "../../components/LoadMore.vue";
import Share from "../../components/share.vue";

export default {
  name: "Bottom",
  props: {},
  data() {
    return {
      clientHeight: "",
      swiperList: [], // 轮播图
      goodId: this.$route.query.gid, // 获取商品id
      goodDetail: "", // 商品详情
      goodRecommd: [], // 推荐商品
      showLoadMore: false, // 是否显示加载更多组件
      noMoreData: false, // 是否有更多数据
      goodAllowed: true, // 是否允许发送请求商品数据标识符
      page: 1, // 分页数据
      shareShow: false,
      goShow:false,
     
      items1:[],
      items2:[],
      items3:[],
      title1:"",
      title2:"",
      title3:"",
     
    };
  },
  computed: {},
  components: {
    TopHeader,
    XInput,
    Group,
    XButton,
    Toast,
    Slide,
    LoadMore,
    Share,
    Popup,
    Checker,
    CheckerItem
  },
  methods: {
    goClose(){
      this.$router.push({
        path:"index"
      })
    },
    goProperty(){
      console.log(111);
      this.goShow = true;
    
    },
    // 商品收藏
    collect() {
      if (this.goodDetail.collect_code == "40006") {
        var api = "/apps/general/collectDel";
      } else {
        var api = "/apps/general/collectAdd";
      }
      this.$axios
        .post(this.$apiUrl + api, {
          aid: this.goodId,
          favorite_category: 2,
          title: this.goodDetail.title,
          token: localStorage.token
        })
        .then(res => {
          if (res.data.code == "40000") {
            this.$vux.toast.show({
              text: res.data.hint
            });
            this.goodDetail.collect_code == "40006"
              ? (this.goodDetail.collect_code = "40005")
              : (this.goodDetail.collect_code = "40006");
          } else {
            this.$vux.toast.show({
              text: res.data.hint,
              type: "warn"
            });
          }
        });
    },
    // 查看评价
    seeRecommd() {
      this.$router.push({
        path: "/recomd",
        query: {
          gid: this.goodId
        }
      });
    },
    // 分享点击事件
    clickShare() {
      this.$refs.share.show(); // 调用子组件show方法
    },
    // 子组件触发的事件
    clickMore() {
      alert(5455);
    },
    // 加载更多出发
    reachBottom() {
      this.page++;
      this.getList();
    },
    getList() {
      if (!this.goodAllowed) {
        return false;
      }
      this.goodAllowed = false;
      this.showLoadMore = true;
      this.noMoreData = true;
      this.$axios
        .get(this.$apiUrl + "/apps/product/detail", {
          params: {
            id: this.goodId,
            page: this.page
          }
        })
        .then(res => {
          console.log(res);
          
          if (res.data.code == "40000") {
            this.title1=res.data.list.spec.title1
            this.title2=res.data.list.title2
            this.title3=res.data.list.title3
            this.items1=res.data.list.spec1
            this.items2=res.data.list.spec2
            this.items3=res.data.list.spec3
            for (var i in res.data.list.carousel) {
              let img = {
                img: res.data.list.carousel[i]
              };
              this.swiperList.push(img);
            }
            this.goodDetail = res.data.list.detail;
            if (res.data.list.recommend.length < 10) {
              this.noMoreData = true;
              this.goodAllowed = false;
            } else {
              this.noMoreData = false;
              this.goodAllowed = true;
            }
            let goodRecommd = this.$tool.handleData(res.data.list.recommend, {
              title: "title",
              img: "img",
              url: "href",
              product_id: "product_id",
              price: "price"
            });
            if (this.page == 1) {
              this.goodRecommd = goodRecommd;
            } else {
              this.goodRecommd = this.goodRecommd.concat(goodRecommd);
            }
          } else {
            this.$vux.toast.show({
              text: res.data.hint,
              type: "warn"
            });
          }
        });
    }
  },
  created() {},
  mounted() {
    this.clientHeight =
      document.documentElement.clientHeight -
      document.getElementsByClassName("top-header")[0].clientHeight;
    console.log(this.goodId);

    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.content img {
  width: 100%;
  height: 100%;
}
.vux-popup-dialog{
  overflow-y: inherit !important;
}
</style>

<style lang="less" scoped>
.good-wrapper {
  padding-top: 46px;
  background: #f2f2f2;
  padding-bottom: 50px;
}
.good-msg {
  padding: 10px 15px 10px 15px;
  background: #fff;
  .first-good {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .good-box {
      flex: 1;
      .name {
        font-size: 14px;
        margin-bottom: 2px;
        font-weight: normal;
      }
      .price {
        .cprice {
          font-size: 16px;
          color: #f15252;
          margin-right: 10px;
        }
        .oprice {
          color: #ccc;
          font-size: 14px;
          text-decoration: line-through;
        }
      }
    }
    .share-box {
      border-left: 1px solid #cccccc;
      padding: 0 0 0 10px;
      img {
        width: 20px;
        height: 20px;
        margin: 0 auto;
      }
      p {
        color: #666;
        margin-top: 5px;
      }
    }
  }
  .product-num {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    color: #999;
    margin-top: 5px;
  }
}
.goos-commis {
  padding: 10px 15px 10px 15px;
  background: #ffffff;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  margin-top: 20px;
  .commis-box {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    img {
      width: 6px;
      height: 8px;
      margin-left: 5px;
    }
  }
}
.company-box {
  padding: 10px 15px 10px 15px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  background: #ffffff;
  margin-top: 20px;
  .img-box {
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
  .company-msg {
    flex: 1;
    .company-name {
      font-size: 14px;
      color: #333;
      margin-bottom: 4px;
    }
    .company-content {
      font-size: 12px;
      line-height: 25px;
      color: #666;
    }
  }
  .more {
    width: 8px;
    height: 11px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.textimg-detail {
  background: #fff;
  margin-top: 20px;
  .title {
    padding: 10px 15px;
    border-bottom: 1px solid #f5f5f5;
  }
  .content {
    padding: 10px 15px;
  }
}
.recommed-box {
  margin-top: 20px;
  .title {
    padding: 10px 15px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
  }
  .recommed-div {
    padding: 10px 15px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .good-div {
      width: 49%;
      background: #fff;
      margin-bottom: 15px;
      .img-div {
        width: 100%;
        height: 177px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .good-title {
        padding: 0 5px;
        font-size: 14px;
        color: #666;
        margin-top: 5px;
      }
      .good-sub_title {
        height: 44px;
        padding: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 5px;
      }
      .good-price {
        padding: 0 5px;
        color: #f15252;
      }
    }
  }
}
.collect-div {
  position: fixed;
  bottom: 10px;
  width: 100%;
  z-index: 55;
}
.position-vertical-demo{
  position: relative;
  background-color:#fff;
  height: 400px;
  .header{
      display: flex;
      justify-content: space-around;
      align-items: center;
      line-height: 25px;
      position: relative;
       .desc{
         margin-right:20px;
         
       }
    .logo{
      margin-left:-10px;
     
          img{
             width:100px;
             height: 100px;  
             position: absolute;
             top:-50px;
            left: 18px;
          }
    }
      .price-stock{
        .goods-price{
          font-size:16px;
          color: red;
        }
        .goods-stock{
          font-size:12px;
          color:#999;
        }
      }
   
  
  }
}
.container{
  .box{
    border-top:1px solid #eee;
    margin-top:10px;
    padding-top:10px;

  }
  .box:last-child{
    border-bottom: 1px solid #eee;
  }
  .oneitem{
    // padding: 0 10px;
   
    text-align: center;
    border-radius: 3px;
   
    background-color: #fff;
    margin: 0 6px 6px 0;
  }
}
.footer{
  position: absolute;
  bottom:0px;
  left:15px;
  width: 90%;
  margin:0px auto;
}
.demo5-item {
  padding: 0 10px;  
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  background: #ffffff url(../../assets/images/checked_bottom.png) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>
