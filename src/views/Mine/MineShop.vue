<template>
    <div class="myshop">
        <top-header
             title="下载二维码"
            :left-options="{backText: '',backGround:'#fff',color:'#333'}"
            ></top-header>
                <div class="container">
                    <p class="title">觉得这款产品不错,下载APP可以体验更多哦!</p>
                    <img src="data:image/png;base64,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" alt="">
                    <p class="desc">识别二维码，无限精彩等着你</p>
                     <x-button class="share" type="warn" @click.native="goShare">分享</x-button>
                        <share ref="share"></share>
                </div>
    </div>
</template>
<script>
import { XButton } from 'vux'
import TopHeader from "../../components/TopHeader.vue";
import share from "../../components/share.vue";

export default {
    components: {
        TopHeader,
        XButton,
        share
    },
    methods:{
        goShare(){
            console.log("分享");
            
            this.$refs.share.show()
        }
    },
    mounted(){
    }
}
</script>
<style lang="less">
    .container{
        margin-top:46px;
        .title{
           
            text-align: center;
            font-size: 16px;
        }
            img{
            margin:0 auto;
            display: block;
            border: none;
            vertical-align: middle;
            width: 230px;
            }
            .desc{
            margin: 40px 0;
            text-align: center;
            font-size: 16px;
            }
            .share{
                width: 80%;
            }
}
</style>
