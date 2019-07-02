<template>
  <div class="edit-wrapper" :style="'height:'+ clientHeight + 'px'">
    <!-- 头部 -->
    <top-header title="编辑个人信息" :left-options="{backText: '',backGround:'#fff',color:'#333'}"></top-header>
    <!-- 编辑头像 -->
    <div class="edit-head">
        <div class="head-div">
            <img :src="imgHead" alt="">
            <p>编辑头像</p>
        </div>
        <input type="file" class="upload_btn" @change="uploadImg" accept="image/png, image/jpeg">
    </div>
    <div class="inputDiv">
      <div class="inputBox">
          <group>
            <x-input title="姓名" type="number" v-model="formData.name"></x-input>
          </group>
          <group>
            <x-input title="手机" readonly="readonly" type="number" v-model="formData.mobile"></x-input>
          </group>
          <group>
            <x-input title="公司" readonly="readonly" type="number" v-model="formData.company"></x-input>
          </group>
      </div>
    </div>

    <div class="submit-btn">
      <x-button type="warn" @click.native="submit">提交</x-button>
    </div>

  </div>
</template>

<script>
import { XInput, Group, XButton, trim } from "vux";
import TopHeader from "../../components/TopHeader.vue";

export default {
  name: "Bottom",
  props: {},
  data() {
    return {
      clientHeight: "",
      formData:{
        name:"",
        mobile:"",
        company:""
      },
      imgHead:"", // 头像路径
      userMsg:"", // 用户信息
    };
  },
  computed: {
    
  },
  components: {
    TopHeader,
    XInput,
    Group, 
    XButton, 
    trim
  },
  methods: {
    // 提交
    submit(){
      this.$axios
        .post(this.$apiUrl + "/apps/member/memberInfoEdit", {
          name:this.formData.name,
          head_pic:this.imgHead,
          token:this.$store.state.token || localStorage.token
        })
        .then((res) => {
            if(res.data.code == "40000"){
              this.$router.push({
                path:"/mine"
              })
            }
        })
    },
    // 图片上传
    uploadImg(e){
      console.log(e)
      var that = this;
      // files 存放的图片信息
      let files = e.target.files[0];
      let suffix = "";
      if(files.type == "image/png"){
        suffix = ".png"
      } else if(files.type == "image/jpeg"){
        suffix = ".jpg"
      }else{
        this.$vux.toast.show({
          text: "请选择png/jpg格式的图片",
          type: "warn"
        });
        return false
      }

      if(files.size > 2048*1024){
        this.$vux.toast.show({
          text: "请选择小于2M的图片",
          type: "warn"
        });
        return false
      }
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = function(){
        let sigImg = this.result.split(",")
        sigImg = sigImg[1];
        that.$axios
          .post(that.$apiUrl + "/apps/general/uploadImg", {
            img_stream:sigImg,
            suffix:suffix
          })
          .then((res) => {
              if(res.data.code == "40000"){
                console.log(res.data.list)
                that.imgHead = res.data.list
              }
          })
      
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.clientHeight =
      document.documentElement.clientHeight -
      document.getElementsByClassName("top-header")[0].clientHeight;
    this.$axios.get(this.$apiUrl + "/apps/member/index",{
      params: {
      }
    })
    .then((res) => {
      if(res.data.code=="40000"){
        this.userMsg = res.data.list.member_info;
        console.log(this.userMsg)
        this.imgHead = res.data.list.member_info.head_pic;
        this.formData.name = res.data.list.member_info.username;
        this.formData.mobile = res.data.list.member_info.mobile;
        this.formData.company = res.data.list.member_info.company_name;
      } else{
          this.$vux.toast.show({
            text: res.data.hint,
            type: "warn"
          });
      }

    })

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.edit-wrapper{
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    overflow: auto;
    padding-bottom: 46px;
}
.edit-head{
    width: 100%;
    background: #ffffff;
    margin:56px 0 10px 0;
    position: relative;
    .head-div{
        padding:10px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
    }
    img{
        width: 60px;
        height: 60px;
        border-radius: 50%
    }
    p{
        margin-left: 10px;
    }
}
.upload_btn{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.inputDiv{
  width: 100%;
  background: #ffffff;
  .inputBox{
    padding: 0 10px;
  }
}
.submit-btn{
  width: 345px;
  height: 42px;
  margin: 20px auto;
}
</style>
<style>
.edit-wrapper .weui-cells{
  margin-top: 0;
}
</style>

