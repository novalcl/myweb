<template>
    <div class="news-detial-box">
        <top-header title="商品列表" 
            :left-options="{backText: '',backGround:'#fff',color:'#333'}"
            :showShare="true"
            @clickShare="share">
        </top-header>
        <Share ref="share"></Share>
        <div class="container">
            <div class="title">
                <div>{{ newsContent.title }}</div>
                <div class="desc">
                    <span>{{newsContent.source}}</span>
                    <span>{{newsContent.addtime}}</span>
                    <span>
                        <img width="90px" height="30px" :src="newsContent.collect_code == '40006' ? 
                    require('../../assets/images/news_collected.png') :
                    require('../../assets/images/news_collect.png')" 
                    @click="collectNews" alt="">
                    </span>
                </div>

            </div>
            <div class="main">
                <div class="content">
                    {{newsContent.content}}
                </div>
                <div class="demo">
                    <div class="demo1"></div>
                    <div class="demo2">评论(15)</div>
                    <div class="demo3"></div>
                </div>
         <div class="comment-msg">

            <div class="comment-box" v-for="(item,index) in commentList" :key="index">
                <div class="comment-user">
                    <div class="user-msg">
                        <img :src="item.head_pic" alt="">
                        <p>{{item.username}}</p>
                    </div>
                    <p>{{item.ctime}}</p>
                </div>
                <div class="comment-content">{{item.content}}</div>
                <div class="comment-replay">
                    <div class="replay-div" >
                        <p class="first-replay">
                            <span @click="clickReply">回复</span>
                            <span v-if="item.reply.length" @click="seeReplay(item)">
                                · {{ item.reply_count }}条回复
                                <x-icon v-if="item.isReplay == false" type="ios-arrow-down"></x-icon>
                                <x-icon v-if="item.isReplay" type="ios-arrow-up"></x-icon>
                            </span>
                        </p>
                        
                    </div>
                    <!-- 需要回復的內容 -->
                     <div class="replay-box" v-if="item.reply.length && item.isReplay">
                        <div class="replkay-msgDiv" 
                            v-for="(reItem,reIndex) in item.reply" 
                            :key="reIndex"> 
                            <div class="comment-user">
                                <div class="user-msg">
                                    <img :src="reItem.head_pic" alt="">
                                    <p>{{ reItem.username }}</p>
                                </div>
                                <p>{{ reItem.ctime }}</p>
                            </div>
                            <div class="comment-content">{{ reItem.content }}</div>
                        </div>
                    </div>

                </div>
            </div>

            
        </div>
            </div>
        </div>
  
   
   
    </div>
</template>
<script>
import TopHeader from "../../components/TopHeader.vue";
import Share from "../../components/share.vue";
export default {
    data(){
        return {
            isReplay:true,
             page:1,     // 分页
           newsContent:"",
           commentList:[],
        }
    },
    components:{
        TopHeader,
        Share
    },
    methods:{
        
        clickReply(){
            this.$vux.confirm.show({
                title:"操作提示",
                content:"更多操作請下載app",
                confirmText:"去下載",
                // 组件除show外的属性
                onCancel : () => {
                    console.log(this) //当前 vm
                },
                onConfirm : () => {
                    console.log(5555)
                }
            })
        },
        seeReplay(item){
        item.isReplay = item.isReplay == false ? true : false;
    },
    collectNews(){
        if(this.newsContent.collect_code == "40006"){
            var url = "apps/general/collectDel"
        }else{
            var url = "apps/general/collectAdd"
        }
        this.$axios.post(this.$apiUrl +url, {
            aid: this.$route.query.id,
            favorite_category:1,
            title:this.newsContent.title,
            token:localStorage.token
        })
        .then(res => {
            if(res.data.code == "40000"){
                this.newsContent.collect_code == "40006" ? this.newsContent.collect_code = "40005" : this.newsContent.collect_code = "40006";
                console.log(888,this.newsContent.collect_code)
                this.$vux.toast.show({
                    text: res.data.hint,
                    type: "success"
                });
            }else{
                this.$vux.toast.show({
                    text: res.data.hint,
                    type: "warn"
                });
            }
        })
    },
        share(){
            this.$refs.share.show();
        },
       getList(){
        this.$axios
        .get(this.$apiUrl + "apps/news/news_detail", {
          params: {
            id: this.$route.query.id,
            page: this.page
          }
        })
        .then(res => {
            if(res.data.code == "40000"){
                res.data.list.news.collect_code = res.data.list.news.collect_code || '40005'
                this.newsContent = res.data.list.news;
                this.commentList = res.data.list.comment;
            }
        })
    }
    },
    
  created(){
      this.getList();
  }
}
</script>
<style lang="less">
.container{
    padding-top:46px;

    .title{
        div:first-child{
            font-size:16px;
            padding:15px;
        }
        .desc{
            display: flex;
            justify-content: space-around;
            color: #8a8a8a;
        }
    }
    
}
.content{
    padding:15px;
}
.demo{
         display: flex;
         justify-content: space-around;
       align-items: center;
       width: 100%;
    .demo1{
        height: 1px;
        width:35%;
        border-bottom:1px solid #666;
    }
     .demo2{
         width:30%;
       text-align: center;
    }
     .demo3{
         height: 1px;
         width:35%;
        border-bottom:1px solid #666;
    }
}
.view{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    


}
.comment-msg{
    padding:10px;
        margin-top: 8px;
        .comment-user{
            width: 100%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-between;
            .user-msg{
                flex: 1;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                p{
                    margin-left: 10px;
                    font-size: 14px;
                }
            }
        }
        .comment-content{
            padding: 10px 0;
        }
        .comment-replay{
            width: 100%;
            .replay-div{
                width: 100%;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                justify-content: space-between;
                .first-replay{
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    span{
                        display: flex;
                        display: -webkit-flex;
                        align-items: center;
                        .vux-x-icon{
                            width: 14px;
                            height: 14px;
                        }
                    }
                }
                .delete-replay{
                    color: #f15252;
                }
                .fabulous-box{
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    img{
                        width: 19px;
                        height: 19px;
                    }
                }
            }
            .replay-box{
                background: #ececec;
                position: relative;
                margin-top: 8px;
                &:after{
                    content: "";
                    position: absolute;
                    height: 10px;
                    width: 10px;
                    top: -5px;
                    left: 62px;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                    border: 1px solid #ececec;
                    border-bottom-color: transparent;
                    border-right-color: transparent;
                    background: #ececec;
                }
                .replkay-msgDiv{
                    padding: 10px;
                    border-bottom: 1px solid #fff;
                }
                .comment-user{
                    width: 100%;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    justify-content: space-between;
                    .user-msg{
                        flex: 1;
                        display: flex;
                        display: -webkit-flex;
                        align-items: center;
                        img{
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                        }
                        p{
                            margin-left: 10px;
                            font-size: 14px;
                        }
                    }
                }
                .comment-content{
                    padding: 10px 0;
                }
            }
        }
    }
</style>
