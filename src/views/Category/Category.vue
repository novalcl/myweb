<template>
  <div class="category">
    <!-- 搜索 -->
    <div class="search">
      <search placeholder="请输入关键词搜索" v-model="searchTitle" @on-submit="search"></search>
    </div>
    <!-- 左侧分类 -->
    <div class="category-left">
      <p
        class="category-item"
        :class="activeIndex === index ? 'active' : ''"
        v-for="(item,index) in categoryList"
        :key="index"
        @click="changeTab(item,index)"
      >{{item.title}}</p>
    </div>
    <!-- 分类右侧 -->
    <div class="category-right" v-if="categoryList.length">
      <!-- 商品列表 -->
      <div class="goods-list" v-if="!categoryList[activeIndex]['child'].length">
        <flexbox wrap="wrap">
          <flexbox-item
            class="good-item"
            :span="1/2"
            v-for="(item,index) in productList"
            :key="index"
          >
            <div class="good">
              <div class="good-img" :style="'height:' + goodsImgHeight + 'px'">
                <img :src="item.img" alt>
              </div>
              <p class="good-title">{{item.title}}</p>
            </div>
          </flexbox-item>
        </flexbox>
        <!-- 加载更多 -->
        <load-more @reachBottom="reachBottom" :visible="showLoadMore" :no-more-data="noMoreData"></load-more>
      </div>
      <!-- 分类 -->
      <div class="category-list" v-else>
        <flexbox wrap="wrap" :gutter="0">
          <flexbox-item
            class="category-item"
            :span="1/3"
            v-for="(item,index) in categoryList[activeIndex]['child']"
            :key="index"
          >
            <img :src="item.logo" alt>
            <p>{{item.name}}</p>
          </flexbox-item>
        </flexbox>
      </div>
      <!-- 为空展示 -->
      <empty :visible="showEmpty"></empty>
    </div>
    <!-- 底部导航 -->
    <bottom></bottom>
  </div>
</template>

<script>
import { Search, Flexbox, FlexboxItem, base64 } from "vux";
import Bottom from "../../components/Bottom.vue";
import Empty from "../../components/Empty.vue";
import LoadMore from "../../components/LoadMore.vue";
import { Promise } from 'q';
export default {
  name: "Category",
  props: {},
  data() {
    return {
      categoryList: [], // 分类列表
      activeIndex: 0, // 分类当前选中索引
      productList: [], // 商品列表
      showLoadMore: false, //是否显示加载更多组件
      noMoreData: false, // 是否有更多数据
      goodPage:2, //商品分页数据
      goodsAllowed: true, // 是否允许发送请求商品数据标识符
      searchTitle:'', // 搜索
    };
  },
  computed: {
    goodsImgHeight() {
      // 商品图片高度
      return (document.body.clientWidth - 130) / 2;
    },
    showEmpty() {
      return (
        this.productList.length == 0 &&
        !this.categoryList[this.activeIndex]["child"].length
      );
    }
  },
  components: {
    Search,
    Flexbox,
    FlexboxItem,
    Bottom,
    Empty,
    LoadMore
  },
  methods: {
    /**
     * @author: 魏冬冬 [1406282241@qq.com]
     * @description:商品搜索 
     * @param {type} 
     * @update: 
     * @Date: 2019-06-14 10:16:03
     */
    search(value){
      //链接跳转
      console.log(value)
    },
    reachBottom() {
      if(!this.goodsAllowed){
        return;
      }
      this.goodsAllowed = false;
      this.showLoadMore = true;
      // this.$axios
      //   .get(this.$apiUrl + "apps/product/index", {
      //     params: {
      //       cid: this.categoryList[this.activeIndex]["cid"],
      //       page: 2
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });
      this.getProductList(this.categoryList[this.activeIndex],this.goodPage).then(res=>{
        if(res.data.code === '40000'){
          let arr = this.$tool.handleData(
            res.data.list.product_list,
            {
              title: "short_title",
              img: "img",
              product_id: "product_id"
            }
          );
          if(arr.length < 10){
            this.noMoreData = true;
          }
          this.productList = this.productList.concat(arr)
          this.goodPage++;
        }
        this.showLoadMore = false;
        this.goodsAllowed = true;
      })
    },
    changeTab(item, index) {
      this.activeIndex = index;
      this.noMoreData = false;
      this.goodPage = 2;
      if (!item["child"].length) {
        this.getProductList(item).then(data => {
          if (data.data.code === "40000") {
            this.productList = this.$tool.handleData(
              data.data.list.product_list,
              {
                title: "short_title",
                img: "img",
                product_id: "product_id"
              }
            );
          }
        });
      }
      this.$router.push({
        path: "/category",
        query: {
          cid: item.cid
        }
      });
    },
    getProductList(item, page = 1) {
      return this.$axios.get(this.$apiUrl + "apps/product/index", {
        params: {
          cid: item["cid"],
          page: page
        }
      });
      // if (!item["child"].length) {
      //   return this.$axios.get(this.$apiUrl + "apps/product/index", {
      //     params: {
      //       cid: item["cid"],
      //       page: page
      //     }
      //   }).then(data => {
      //     if (data.data.code === "40000") {
      //       this.productList = this.$tool.handleData(
      //         data.data.list.product_list,
      //         {
      //           title: "short_title",
      //           img: "img",
      //           product_id: "product_id"
      //         }
      //       );
      //     }
      //   });
      // }
    }
  },
  created() {
    // console.log(this.$route)
    this.$axios.get(this.$apiUrl + "apps/product/category").then(res => {
      if (res.data.code === "40000") {
        let cid = this.$route.query.cid;
        let currentItem = "";
        let that = this;
        this.categoryList = this.$tool.handleData(
          res.data.list.category,
          {
            title: "name",
            cid: "cid"
          },
          function(map, ele, key) {
            map["child"] = ele.child;
            if (cid == ele.cid) {
              currentItem = map;
              that.activeIndex = key;
            }
          }
        );
        currentItem = currentItem || this.categoryList[0];
        // 初始化右侧数据
        this.getProductList(currentItem).then(data => {
          if (data.data.code === "40000") {
            this.productList = this.$tool.handleData(
              data.data.list.product_list,
              {
                title: "short_title",
                img: "img",
                product_id: "product_id"
              }
            );
          }
        });
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.search {
  position: fixed;
  top: 0;
  width: 100%;
}
.category-left {
  position: fixed;
  left: 0;
  top: 44px;
  width: 100px;
  background-color: #f2f2f2;
  /* background:#000; */
  height: calc(100% - 97px);
  .category-item {
    padding: 11px 0;
    text-align: center;
    border-bottom: 1px solid #e2e2e2;
    &.active {
      background: #fff;
      border-left: 2px solid #6596ed;
      color: #6596ed;
    }
  }
}
.category-right {
  padding: 49px 5px 53px 105px;
  .good-item {
    box-sizing: border-box;
    margin: 0 !important;
    &:nth-of-type(odd) {
      border-right: 5px solid #fff;
    }
    &:nth-of-type(even) {
      border-left: 5px solid #fff;
    }
    .good-img {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    .good-title {
      color: #666;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
      word-wrap: break-word;
      -webkit-box-pack: center;
    }
  }
  .category-list {
    .category-item {
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
        max-width: 75px;
        margin: 0 auto;
      }
      p {
        padding-top: 5px;
        color: #666;
      }
    }
  }
}
</style>
