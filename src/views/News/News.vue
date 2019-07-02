<template>
  <div class="news">
    <tab bar-active-color="#6596ed" active-color="#6596ed" :line-width="2">
      <tab-item
        :selected="navSelected == item ? true : false"
        v-for="(item,index) in categoryList"
        :key="index"
        @on-item-click="changeTab(item)"
      >{{item.cname}}</tab-item>
    </tab>
    <!-- 幻灯片 -->
    <slide :list="swiperList"></slide>
    <!-- 资讯列表 -->
    <panel class="news-list" @on-click-item="goDetail" :list="list" :type="type"></panel>
    <!-- 加载更多 -->
    <load-more @reachBottom="reachBottom" :visible="showLoadMore" :no-more-data="noMoreData"></load-more>
    <!-- 底部导航 -->
    <bottom></bottom>
  </div>
</template>

<script>
import { Tab, TabItem, Panel } from "vux";
import Slide from "../../components/Slide.vue";
import Bottom from "../../components/Bottom.vue";
import LoadMore from "../../components/LoadMore.vue";
export default {
  name: "News",
  props: {},
  data() {
    return {
      type: "5",
      list: [],
      footer: {
        title: "more",
        url: "http://vux.li"
      },
      categoryList: [], // 分类
      navSelected: {}, // 记录当前选中分类
      swiperList: [], // 幻灯片
      showLoadMore: false, //是否显示加载更多组件
      noMoreData:false, // 是否有更多数据
      newsPage:1, //分页
      newsAllowed:true // 是否允许请求
    };
  },
  components: {
    Tab,
    TabItem,
    Slide,
    Panel,
    Bottom,
    LoadMore
  },
  methods: {
    goDetail(item){
      console.log(item.id)
      this.$router.push({
        path:"/newsdetail",
        query:{
          id:item.id
        }
      })
    },
    reachBottom() {
      if(!this.newsAllowed){
        return;
      }
      this.newsAllowed = false;
      this.showLoadMore = true;
      this.getList(this.navSelected,this.newsPage);
    },
    changeTab(item){
      this.navSelected = item; // 记录当前分类
      this.newsPage = 1;
      this.noMoreData = false;
      this.getList(item);
    },
    onImgError(item, $event) {
      console.log(item, $event);
    },
    getList(item,page=1) {
      this.$axios
        .get(this.$apiUrl + "apps/news/index", {
          params: {
            categoryid: item.cid,
            type: item.type,
            flags: item.flags,
            page: page
          }
        })
        .then(res => {
          if(res.data.code === "40000"){
            //幻灯片赋值
            this.swiperList = this.$tool.handleData(res.data.list["carousel"], {
              img: "thumbnail"
            });
            // 资讯列表赋值
            let arr = this.$tool.handleData(res.data.list["newslist"], {
              title: "short_title",
              desc: 'title',
              id:'id'
            },function(meta,ele){
              meta['src'] = ele['image'][0];
              meta['meta'] = {};
              meta['meta']['source'] = ele['source'];
              meta['meta']['date'] = ele['addtime'];
              meta['meta']['other'] = "<span>评论:" + ele['comment_count'] + '</span><span style="margin-left:15px">收藏:' + ele['collect_count'] + "</span>"
            });
            if(arr.length < 10){
              this.noMoreData = true;
            }
            this.list = page == 1 ? arr : this.list.concat(arr);
            this.newsPage++;
            this.newsAllowed = true;
            this.showLoadMore = false;
          }
          // 隐藏loading
          // this.$vux.loading.hide();
        });
    }
  },
  created() {
    this.axios.get(this.$apiUrl + "/apps/news/category",{hideLoading:true}
    ).then(response => {
      this.categoryList = response.data.list;
      //   console.log(this.categoryList)
      this.navSelected = this.categoryList[0];
      //   // 获取资讯列表，并渲染轮播图
      this.getList(this.categoryList[0]);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.news {
  padding-bottom:53px;
  .news-list {
    margin-top: 0;
  }
}
</style>
