<template>
  <div class="service_wrapper" :style="'height:'+ clientHeight + 'px'">
    <!-- 头部 -->
    <top-header title="注册" :left-options="{backText: '',backGround:'#fff',color:'#333'}"></top-header>
    <!-- 内容 -->
    <div class="content" v-html="contentVal"></div>
  </div>
</template>

<script>
import TopHeader from "../../components/TopHeader.vue";

export default {
  components: {
    TopHeader
  },
  data() {
    return {
      clientHeight: "",
      contentVal:"",    // 页面内容
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  mounted() {
    this.clientHeight =
      document.documentElement.clientHeight -
      document.getElementsByClassName("top-header")[0].clientHeight;
    this.$axios
        .get(this.$apiUrl + "/apps/register/serviceAgreement","")
        .then(res => {
            console.log(res.data)
            if(res.data.code == "40000"){
                console.log(res.data.list.content)
                this.contentVal = res.data.list.content
            }else{
                this.$vux.toast.show({
                    text: res.data.hint,
                    type: "warn"
                });
            }
        });
  },
}
</script>

<style lang="less" scoped>
  .content{
      padding: 46px 15px 0 15px;
  }
</style>
