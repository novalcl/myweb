<template>
    <!-- 意见反馈 -->
    <div class="feed-back">
         <!-- 头部 -->
    <top-header title="意见反馈" :left-options="{backText: '',backGround:'#fff',color:'#333'}"></top-header>
    <div class="container">
        <group>
              <x-textarea @on-change="ChangeOn" v-model="opinion" :rows="10" :cols="30" :max="200" name="description" placeholder="请尽量详细描述反馈，我们会第一时间帮您解决"></x-textarea>
        </group>
        <group>
              <x-textarea   placeholder="请填写您的手机号码，方便我们给您回复"  :rows="1" autosize></x-textarea>
      </group>
        <x-button class="button" :disabled="abc"  type="warn" action-type="submit">提交</x-button>

        </div>
    </div>
</template>
<script>
import { XTextarea,Group,XButton } from 'vux'
import TopHeader from "../../components/TopHeader.vue";

export default {
    data(){
        return {
           opinion:"",
           abc:true
        }
    },
    components:{
        TopHeader,
        XTextarea,
        Group,
        XButton
    },
    methods:{
        ChangeOn(){
           if( this.opinion.length>0){
               this.abc=false
           }
            
        },
    }
}
</script>
<style>

</style>

<style lang="less" >
body{
background-color:#eee;
}
.feed-back{
    
    height: 100%;
}
    .container{
        padding-top:46px;
       .button{
           margin:30px auto;
           width: 90%;
       }
    }
</style>
