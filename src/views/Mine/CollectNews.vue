<template>
  <div class="collect-wrapper">
    <!-- 头部 -->
    <top-header
      title="咨询收藏"
      :left-options="{backText: '',backGround:'#fff',color:'#333'}"
      :editShow="true"
      @clickEdit="clickEdit"
    ></top-header>
    <div class="container">
      <group class="collect">
        <cell is-link v-for="(item,index) in userMsg" :key="index">
          <img
            class="additem"
            v-if="showBottom"
            @click="change(item)"
            :src="item.selected==0? require('../../assets/images/unselected@2x.png') : require('../../assets/images/selected@2x.png')"
            alt
          >
            <div class="title">
                        <p>{{item.title}}</p>
                        
                    </div>
         
          <img
            slot="icon"
            class="collect-img"
            style="display:block;margin-right:5px;"
            :src="item.img"
          >
          <div></div>
        </cell>
      </group>

      <div class="footer" v-if="showBottom">
        <div class="footer-title">
          <img
            @click="AllSelect"
            :src="allshow==0? require('../../assets/images/unselected@2x.png') : require('../../assets/images/selected@2x.png')"
            alt
          >
          <span>全选</span>
        </div>
        <div class="del" @click="deleteCollect">删除</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import TopHeader from "../../components/TopHeader.vue";

export default {
  data() {
    return {
      userMsg: [],
      showBottom: false,
      allshow: 0,
      curenArr: [] // 存放选择的数据
    };
  },
  components: {
    TopHeader,
    Group,
    Cell
  },
  methods: {
    deleteCollect() {
      this.$vux.confirm.show({
        content: "确认删除吗？",
        // 组件除show外的属性
        onCancel: () => {
          console.log(this); //当前 vm
        },
        onConfirm: () => {
          this.$axios
            .post(this.$apiUrl + "/apps/member/collectDel", {
              id: this.curenArr.join(","),
              token: localStorage.token
            })
            .then(res => {
              if (res.data.code == "40000") {
                // this.userMsg.forEach(element=>{
                //   if(element.selected==1)
                // })
                var abc=[]
                for(let i in this.userMsg){
                  if(this.userMsg[i].selected==0){
                    //  this.curenArr.splice(i, 1);
                    // this.userMsg.splice(i,1)
                    abc.push(this.userMsg[i])
                  }
                }
                this.userMsg=abc
                console.log(2122);
              } else {
                this.$vux.toast.show({
                  text: res.data.hint,
                  type: "warn"
                });
              }
            });
        }
      });
    },
    AllSelect() {
      this.allshow = this.allshow == 0 ? 1 : 0;
      for (let i in this.userMsg) {
        this.userMsg[i].selected = this.allshow;
        if (this.allshow == 1) {
          this.curenArr[i] = this.userMsg[i].collect_id;
        } else {
          this.curenArr = [];
        }
      }
      console.log(8888, this.curenArr.join(","));
    },
    change(item) {
      item.selected = item.selected == 1 ? 0 : 1;
      if (item.selected == 1) {
        this.curenArr.push(item.collect_id);
      } else {
        for (let i in this.curenArr) {
          if (this.curenArr[i] == item.collect_id) {
            this.curenArr.splice(i, 1);
          }
        }
      }

      if (this.curenArr.length == this.userMsg.length) {
        this.AllSelect();
      } else {
        this.allshow = 0;
      }
    },
    clickEdit() {
      this.showBottom = this.showBottom == false ? true : false;
    },
    getList() {
      this.$axios
        .get(this.$apiUrl + "/apps/member/collect", {
          params: {
            favorite_category: 1,
            token: localStorage.token
          }
        })
        .then(res => {
          if (res.data.code == "40000") {
            console.log(4545, res);
            for (let i in res.data.list.collect) {
              res.data.list.collect[i].selected = 0;
            }
            this.userMsg = res.data.list.collect;
            console.log(this.userMsg);
          } else {
            this.$vux.toast.show({
              text: res.data.hint,
              type: "warn"
            });
          }
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="less">
.collect {
  padding-top: 46px;
  position: relative;
  margin-left: 30px;
  .additem {
    position: fixed;
    left: 10px;
    margin-top:30px;
    width: 25px;
    height: 25px;
  }
  
  .collect-img {
    width: 80px;
    height: 80px;
  }
}

.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #f5f5f5;
  .footer-title {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 2px;
      margin-left: 5px;
    }
  }
  .del {
    width: 60px;
    height: 50px;
    background: #ff5622;
    color: #ffffff;
    line-height: 50px;
    text-align: center;
  }
}
</style>
