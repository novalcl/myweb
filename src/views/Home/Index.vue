<template>
  <div class="home">
    <!-- 引入头部 -->
    <top-header></top-header>
    <!-- 幻灯片 -->
    <slide :list="swiperList"></slide>
    <!-- 分类 -->
    <div class="nav-list">
      <grid :show-lr-borders="false" :cols="5" :show-vertical-dividers="false">
        <grid-item
          :link="item.link"
          
          v-for="(item,index) in navList"
          :key="index"  
          @click.native="goCatery(item.data_id)"
        >
          <img slot="icon" :src="item.icon">
        </grid-item>
      </grid>
    </div>

    <!-- 公告 -->
    <div class="home-advs">
      <group :gutter="0">
        <cell class="home-advs-cell" value-align="left" primary="content" is-link>
          <marquee>
            <marquee-item v-for="(item,index) in advsList" @click.native="goNews" :key="index">{{item.title}}</marquee-item>
          </marquee>
          <p class="advs-title" slot="title">
            <span>|</span>
            <span>咨询头条</span>
          </p>
        </cell>
      </group>
    </div>

    <!-- 推荐商品 -->
    <div class="recommend-goods-title">
      <group gutter="0px">
        <cell class="recommend-goods-cell" value="更多" is-link @click.native="goMore">
          <p class="recommend-goods-cell-title" slot="title">
            <span>|</span>
            <span>推荐商品</span>
          </p>
        </cell>
      </group>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <flexbox wrap="wrap">
        <flexbox-item v-for="(item, index) in goodsList" @click.native="goProduct(item.data_id)" :key="index" class="good-item" :span="6">
          <div class="good">
            <div class="good-img" :style="'height:' + goodItemHeight + 'px'">
              <img :src="item.img" alt>
            </div>
            <p class="good-title">{{item.title}}</p>
            <flexbox>
              <flexbox-item class="good-price" :span="6">￥{{item.price}}</flexbox-item>
              <flexbox-item v-if="item.soldNum" class="sold-num" :span="6">{{item.soldNum}}</flexbox-item>
            </flexbox>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- 加载更多 -->
    <load-more @reachBottom="reachBottom" :visible="showLoadMore" :no-more-data="noMoreData"></load-more>
    <!-- 底部导航 -->
    <bottom></bottom>
  </div>
</template>

<script>
import Slide from "../../components/Slide.vue";
import TopHeader from "../../components/TopHeader.vue";
import Bottom from "../../components/Bottom.vue";
import LoadMore from "../../components/LoadMore.vue";
import {
 
  Group,
  Cell,
  Grid,
  GridItem,
  Marquee,
  MarqueeItem,
  Flexbox,
  FlexboxItem
} from "vux";
export default {
  name: "Index",
  /**
   * @author:  李常亮 [810326280@qq.com]
   * @description:
   * @param {type}
   * @update:
   * @Date: 2019-06-06 15:04:50
   */
  data() {
    return {
      swiperList: [],
      navList: [],
      advsList: [], // 公告数据
      goodsList: [], // 推荐商品数据
      showLoadMore: false, //是否显示加载更多组件
      goodsPage: 2, //商品分页
      goodsAllowed: true, // 是否允许发送请求商品数据标识符
      noMoreData:false, // 是否有更多数据
    };
  },
  computed: {
    /**
     * @author:  李常亮 [810326280@qq.com]
     * @description: 计算屏幕宽度的一半给商品图片
     * @param {type}
     * @return: 屏幕宽度的一半
     * @update:
     * @Date: 2019-06-08 16:22:28
     */
    goodItemHeight() {
      return document.body.clientWidth / 2;
    }
  },
  components: {
    Slide,
    Grid,
    GridItem,
    Marquee,
    Group,
    Cell,
    MarqueeItem,
    Flexbox,
    FlexboxItem,
    TopHeader,
    Bottom,
    LoadMore
  },
  methods: {
    // 点击更多跳转值商品里列表
    goMore(){
      this.$router.push({
        path:"/productlist",
      })
    },
    // 点击商品详情跳转
    goProduct(id){
      this.$router.push({
        path:"/product",
        query:{
          gid:id
        }
      })
    },
    // 点击咨询跳转
    goNews(){
      this.$router.push({
        path:"/news"
      })
    },
    // 点击分类跳转
    goCatery(id){
      console.log(id)
      this.$router.push({
        path:"/category",
        query:{
          cid:id
        }
      })
    },
    reachBottom() {
      if (!this.goodsAllowed) {
        return;
      }
      this.goodsAllowed = false;
      this.showLoadMore = true;
      this.$axios
        .get(this.$apiUrl + "apps/index/index", {
          params: {
            page: this.goodsPage
          }
        })
        .then(res => {
          if (res.data.code === "40000") {
            if(res.data.list["section"][0]["section_datas"].length < 10){
              this.noMoreData = true;
            }
            this.goodsPage++; //成功增加分页
            let goodArr = this.$tool.handleData(
              res.data.list["section"][0]["section_datas"],
              {
                title: "title",
                img: "img",
                price: "price",
                url: "",
                data_id:"data_id"
              }
            );
            this.goodsList = this.goodsList.concat(goodArr);
          }
          this.showLoadMore = false;
          this.goodsAllowed = true;
        });
    }
  },
  created() {
    this.$axios.get(`${this.$apiUrl}/apps/index/index`).then(res => {
      if (res.data.code === "40000") {
        // this.pageData = res.data.list.section;
        console.log(res.data.list.section[3]["section_datas"]);
        this.swiperList = this.$tool.handleData(
          res.data.list.section[0]["section_datas"],
          {
            title: "title",
            img: "img",
            link: "link"
          },
          function(map, ele) {
            map["ddd"] = ele.title + ele.img;
          }
        );
        console.log(this.swiperList);
        // 幻灯片数据处理
        // res.data.list.section[0]['section_datas'].forEach(element => {
        //   this.swiperList.push({
        //     title:element.title,
        //     img:element.img,
        //     link:element.href
        //   })
        // });
        // this.swiperList = this.$tool.handleData(res.data.list.section[0]['section_datas'],['title','img','link']);
        // 分类数据处理
        // res.data.list.section[1]['section_datas'].forEach(element => {
        //   this.navList.push({
        //     title:element.title,
        //     icon:element.img,
        //     url:element.href
        //   })
        // });
        this.navList = this.$tool.handleData(
          res.data.list.section[1]["section_datas"],
          {
            title: "title",
            icon: "img",
            url: "href",
            data_id:"data_id"
          }
        );
        // 公告数据处理
        // res.data.list.section[2]['section_datas'].forEach(element => {
        //   this.advsList.push({
        //     title:element.title,
        //     url:''
        //   })
        // });
        this.advsList = this.$tool.handleData(
          res.data.list.section[2]["section_datas"],
          {
            title: "title"
          }
        );
        //商品数据处理
        // res.data.list.section[3]['section_datas'].forEach(element => {
        //   this.goodsList.push({
        //     title:element.title,
        //     img:element.img,
        //     price:element.price,
        //     url:''
        //   })
        // });
        this.goodsList = this.$tool.handleData(
          res.data.list.section[3]["section_datas"],
          {
            title: "title",
            img: "img",
            price: "price",
            url: "",
            data_id:"data_id"
          }
        );
      }
    });
  }
};
</script>
<style lang="less">
.home-advs {
  .weui-cell__ft {
    overflow: hidden;
  }
  .vux-marquee-box {
    li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>

<style lang="less" scoped>
@color: #6596ed;
.cell(@color) {
  color: @color;
  margin-right: 15px;
}
.home {
  background-color: #f2f2f2;
  // .weui-cells:before{
  //   border-top:none;
  // }
  padding-top: 46px;
  padding-bottom: 53px;
}
.nav-list {
  margin-top: 15px;
  background: #fff;
}
.home-advs {
  // margin-top:10px;
  .home-advs-cell {
    background: #fff;
  }
}
.advs-title {
  .cell(#6596ed);
  span:first-child {
    position: relative;
    top: -1px;
  }
}
.recommend-goods-title {
  margin-top: 15px;
  .recommend-goods-cell-title {
    .cell(#6596ed);
  }
}
// 商品列表
.goods-list {
  .good-item {
    margin-left: 0 !important;
    border-bottom: 2px solid #f2f2f2;
    box-sizing: border-box;
    &:nth-of-type(even) {
      border-left: 2px solid #f2f2f2;
    }
    .good-img {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .good {
      background: #fff;
    }
    img {
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
    .good-title {
      height: 42px;
      display: -webkit-box;
      padding: 0 5px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      word-wrap: break-word;
      -webkit-box-pack: center;
    }
    .good-price {
      color: #f15252;
      padding-left: 5px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      word-wrap: break-word;
    }
    .sold-num {
      margin-left: 0 !important;
      text-align: right;
      padding-right: 5px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
}
</style>

