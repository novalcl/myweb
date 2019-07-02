<template>
  <div class="company">
    <!-- 搜索 -->
    <div class="search">
      <search placeholder="请输入关键词搜索" v-model="searchTitle" @on-submit="search"></search>
    </div>
    <!-- 企业列表 -->
    <panel @on-click-item="goCompanyDetail" class="news-list" :list="list" :type="type"></panel>
    <!-- 加载更多 -->
    <load-more @reachBottom="reachBottom" :visible="showLoadMore" :no-more-data="noMoreData"></load-more>
    <!-- 底部导航 -->
    <bottom></bottom>
  </div>
</template>

<script>

import { Search, Panel } from "vux";
import Bottom from "../../components/Bottom.vue";
import LoadMore from "../../components/LoadMore.vue";
export default {
  name: "Company",
  props: {},
  data() {                     
    return {
      type: "1",
      list: [], // 企业列表
      searchTitle: "", // 搜索关键字
      showLoadMore: false, //是否显示加载更多组件
      noMoreData: false, // 是否有更多数据
      companyAllowed: true, // 是否允许发送请求商品数据标识符
      page: 2 // 分页数据
    };
  },
  computed: {},
  components: {
    Search,
    Panel,
    Bottom,
    LoadMore
  },
  methods: {
    goCompanyDetail(item){
      console.log(item.id)
      this.$router.push({
        path:"/companydetail",
        query:{
         id:item.company_id
        }
      })
    },
    reachBottom() {
      if (!this.companyAllowed) {
        return;
      }
      this.companyAllowed = false;
      this.showLoadMore = true;
      this.getCompanyList(this.page, this.searchTitle).then(res => {
        if(res.data.code === '40000'){
            let arr = this.$tool.handleData(res.data.list["company_list"], {
                title: "name",
                desc: "business",
                src: "logo",
                company_id:"company_id"
            });
            if(arr.length < 10){
                this.noMoreData = true;
            }
            this.list = this.list.concat(arr);
            this.page++;
        }
        this.showLoadMore = false;
        this.companyAllowed = true;
      });
    },
    search(value) {
      this.noMoreData = false;
      this.page = 2;
      this.getCompanyList(1, value).then(res => {
        this.list = this.$tool.handleData(res.data.list["company_list"], {
          title: "name",
          desc: "business",
          src: "logo",
          company_id:"company_id"
        });
      });
    },
    getCompanyList(page = 1, title = "") {
      return this.$axios.get(this.$apiUrl + "/apps/company/index", {
        params: {
          page: page,
          title: title,
        }
      });
    }
  },
  created() {
    this.getCompanyList().then(res => {
      this.list = this.$tool.handleData(res.data.list["company_list"], {
        title: "name",
        desc: "business",
        src: "logo",
        company_id:"company_id"
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.company {
  padding-top: 33px;
  padding-bottom: 53px;
}
</style>
