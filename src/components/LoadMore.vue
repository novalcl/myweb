<template>
  <div class="load-more">
    <load-more :tip="'正在加载'" v-show="visible && !noMoreData"></load-more>
    <divider v-if="noMoreData">暂无数据</divider>
  </div>
</template>

<script>
import { LoadMore,Divider } from "vux";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // 距离底部多少距离时触发加载更多
    bottomDistance: {
      default: 60
    },
    noMoreData:{
      type: Boolean,
      default: false
    }
  },
  beforeDestroy() {
    window.removeEventListener('touchmove', this.touchmove);
  },
  created() {
    window.addEventListener("touchmove", this.touchMove, {
      passive: false
    });
  },
  methods: {
    touchMove() {
    //   console.log('我执行了滚动操作')
      // 可滚动容器的高度
      let innerHeight = document.querySelector("#app").clientHeight;
      // 可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      // 屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      if ((innerHeight - scrollTop - outerHeight) <= this.bottomDistance) {
        if(this.noMoreData){
          return;
        }
        this.$emit('reachBottom')
      }
    }
  },
  components: {
    LoadMore,
    Divider
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
