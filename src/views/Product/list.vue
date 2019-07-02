
<template>
  <div class="list-wrapper">
    <!-- 头部 -->
    <top-header title="商品列表" 
        :left-options="{backText: '',backGround:'#fff',color:'#333'}"
        :showSearch="true" v-if="searchShow == false"
        @clickSearch="clickSearch">
    </top-header>
    <!-- 搜索 -->
     <search v-show="searchShow" 
        v-model="searchTitle" 
        placeholder="请输入关键词搜索" 
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        @on-clear="onClear"
        ref="search">
    </search>
    <!-- 导航 -->
    <div class="nav-box">
        <flexbox :gutter="0">
            <flexbox-item @click.native="changeNav(0)">
                <div class="flex-demo">
                    <span :class="firstNav == 1 || firstNav == 2 ? 'select-nav' : ''">综合</span>
                </div>
            </flexbox-item>
            <flexbox-item @click.native="changeNav(1)">
                <div class="flex-demo">
                    <span :class="secondNav == 1 || secondNav == 2 ? 'select-nav' : ''">价格</span>
                    <x-icon type="ios-arrow-up" :class="secondNav == 1 ?'iconSelect':''"></x-icon>
                    <x-icon type="ios-arrow-down" :class="secondNav == 2 ?'iconSelect':''"></x-icon>
                </div>
            </flexbox-item>
            <flexbox-item @click.native="changeNav(2)">
                <div class="flex-demo">
                    <span :class="threeNav == 1||threeNav == 2 ? 'select-nav' : ''">销量</span>
                    <x-icon type="ios-arrow-up" :class="threeNav == 1 ?'iconSelect':''"></x-icon>
                    <x-icon type="ios-arrow-down" :class="threeNav == 2 ?'iconSelect':''"></x-icon>
                </div>
            </flexbox-item>
            <flexbox-item @click.native="changeNav(3)">
                <div class="flex-demo">
                    <span :class="fourNav == 1||fourNav == 2 ? 'select-nav' : ''">最新</span>
                    <x-icon type="ios-arrow-up" :class="fourNav == 1 ?'iconSelect':''"></x-icon>
                    <x-icon type="ios-arrow-down" :class="fourNav == 2 ?'iconSelect':''"></x-icon>
                </div>
            </flexbox-item>
            <flexbox-item @click.native="changeNav(4)">
                <div class="flex-demo">
                    <img class="change-img" 
                        :src="fifthNav == 1 ? require('../../assets/images/goods_list_icon.png') :
                         require('../../assets/images/goods_row_icon.png')" alt="">
                </div>
            </flexbox-item>
        </flexbox>
    </div>
    <!-- 内容区 -->
    <div class="content-box" v-show="showEmpty == false">
        <!-- content-div two-content_div-->
        <div :class="this.fifthNav == 1 ? 'two-content_div' : 'content-div'">
            <div class="sideways-Div" v-for="(item,index) in dataList" :key="index">
                <div class="img-box">
                    <img :src="item.img" alt="">
                </div>
                <div class="right-div">
                    <h5 class="title">{{ item.title }}</h5>
                    <p class="price">
                        <span class="num">¥{{ item.price }}0</span>
                        <span>{{ item.sale_num }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- 为空展示 -->
    <empty :visible="showEmpty"></empty>
    <!-- 加载更多 -->
    <load-more  v-if="showEmpty==false" @reachBottom="reachBottom" :visible="showLoadMore" :no-more-data="noMoreData"></load-more>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Search   } from "vux";
import TopHeader from "../../components/TopHeader.vue";
import LoadMore from "../../components/LoadMore.vue";
import Empty from "../../components/Empty.vue";

export default {
  data() {
    return {
        clientHeight: "",   // 高度
        firstNav:1,         // 综合
        secondNav:0,        // 价格
        threeNav:0,         // 销量
        fourNav:0,          // 最新
        fifthNav:0,         // 布局
        searchTitle:"",     // 搜索框
        searchShow:false,   // 搜索框显示
        page:1,             // 分页
        dataList:[],        // 存放返回商品
        showEmpty:false,     // 为空展示
        showLoadMore: false, // 是否显示加载更多组件
        noMoreData: false,   // 是否有更多数据
        isLoad:false,         // 是否继续加载
        selectNavId:0,       // 选中nav 
    }
  },
  components: {
    TopHeader,
    Flexbox, 
    FlexboxItem,
    Search,
    LoadMore,
    Empty
  },
  methods:{
    /**
     * @author:  李常亮 [810326280@qq.com]
     * @description:下拉加载更多 
     * @param {type} 
     * @update: 
     * @Date: 2019-06-14 16:34:03
     */
    reachBottom(){
        console.log(8888)
        if(!this.isLoad){
            return false;
        }
        this.isLoad = false;
        this.showLoadMore = true;
        this.page ++;
        this.getList();
    },
    
    onClear(){
        this.searchTitle = "";
        this.page = 1;
        this.getList();
    },
    
    onSubmit(){
        this.searchShow = false;
        this.page = 1;
        this.getList(1);
    },
    /**
     * @author:  李常亮 [810326280@qq.com]
     * @description:搜索取消事件 
     * @param {type} 
     * @update: 
     * @Date: 2019-06-14 15:28:03
     */
    onCancel(){
        this.searchShow = false;
    },
    
    onFocus(){
        console.log(1111)
    },
    
    clickSearch(){
        this.searchShow = true;
        this.$refs.search.onFocus();

    },
    
    changeNav(index){
        this.page = 1;
        this.showLoadMore = false; // 是否显示加载更多组件
        this.noMoreData = false;   // 是否有更多数据
        this.isLoad = false;         // 是否继续加载
        switch (index){
            case 0:
                this.firstNav = 1;
                this.secondNav = 0;
                this.threeNav = 0;
                this.fourNav = 0;
                this.selectNavId = 0;
                this.getList();
                break;
            case 1:
                this.secondNav == 1 ? this.secondNav = 2 : this.secondNav = 1;
                this.firstNav = 0;
                this.threeNav = 0;
                this.fourNav = 0;
                this.selectNavId = this.secondNav == 1 ? 1 : 2;
                this.getList();
                break;
            case 2:
                this.threeNav == 1 ? this.threeNav = 2 : this.threeNav = 1;
                this.firstNav = 0;
                this.secondNav = 0;
                this.fourNav = 0;
                this.selectNavId = this.threeNav == 1 ? 3 : 4;
                this.getList();
                break;
            case 3:
                this.fourNav == 1 ? this.fourNav = 2 : this.fourNav = 1;
                this.firstNav = 0;
                this.secondNav = 0;
                this.threeNav = 0;
                this.selectNavId = this.fourNav == 1 ? 5 : 6
                this.getList();
                break;
            case 4:
                this.fifthNav == 1 ? this.fifthNav = 2 : this.fifthNav = 1;
                break;
            default:
                break;
        }
    },
    /**
     * @author: 李娇娇[1428307972@qq.com]
     * @description:获取商品列表 
     * @param [type] Number 判断哪里调用
     * @update: 
     * @Date: 2019-06-14 15:28:03
     */
    getList(type){
        this.$axios.get(this.$apiUrl + "/apps/product/index",{
            params: {
                cid:'',
                title:this.searchTitle,
                page:this.page,
                company_id:"",
                nav_id:this.selectNavId
            }
        })
         .then((res) => {
            this.showLoadMore = false;
            this.isLoad = true;
            if(res.data.code == "40000"){
                if(res.data.list.product_list.length < 10  && type != 1){
                    this.noMoreData = true;
                }
                if(this.page == 1){
                    if(res.data.list.product_list.length == 0){
                        this.showEmpty = true;
                    }else{
                        this.showEmpty = false;
                    }
                    this.dataList = res.data.list.product_list;
                }else{
                    this.dataList = this.dataList.concat(res.data.list.product_list);
                }
                
            }
         })
    }
  },
  mounted(){
    this.clientHeight =
        document.documentElement.clientHeight -
        document.getElementsByClassName("top-header")[0].clientHeight;
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.list-wrapper{
    padding-top: 46px;
    .flex-demo{
        text-align: center;
        position: relative;
        .vux-x-icon-ios-arrow-up{
            position: absolute;
            top:0px;  
            width: 14px;
            height: 14px;
        }
        .vux-x-icon-ios-arrow-down{
            position: absolute;
            top:8px;  
            width: 14px;
            height: 14px;
        }
        .change-img{
            width: 25px;
            height: 25px;
            margin: 0 auto;
        }
        .select-nav{
            color: #6596ed;
        }
        .iconSelect{
            fill: #6596ed;
        }
    }
}
.nav-box{
    padding: 8px 0;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    height:100%;
}
// 内容
.content-box{
    background: #f5f5f5;
    /*第一种样式*/
    .content-div{
        padding: 10px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .sideways-Div{
            width: 49%;
            height: 260px;
            background: #fff;
            margin-bottom: 10px;
            .img-box{
                width: 100%;
                height: 185px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .title{
                height: 40px;
                display: -webkit-box;
                padding: 0 5px;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-all;
                word-wrap: break-word;
                margin-top: 5px;
            }
            .price{
                padding: 0 5px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                color: #999;
                .num{
                    color: #f15252;
                }
            }
        }
    }
    /*第二种样式*/
    .two-content_div{
        padding: 10px;
        .sideways-Div{
            padding: 10px;
            display: flex;
            -webkit-display:flex;
            background: #fff;
            margin: 10px 0;
            .img-box{
                width: 100px;
                height: 100px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right-div{
                margin-left: 10px;
                flex: 1;
                .title{
                    margin-top: 10px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                    word-wrap: break-word;
                    -webkit-box-pack: center;
                }
                .price{
                    width: 100%;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    margin-top: 30px;
                    color: #999;
                    span:first-child{
                        color: #f15252;
                    }
                }

            }
        }
    }
}
</style>
