<template>
  <div class="bottom">
    <tabbar>

      <tabbar-item :selected="activeIndex == 0 ? true : false" link="/index">
        <img slot="icon" src="../assets/images/bottombar/index-normal@2x.png">
        <img slot="icon-active" src="../assets/images/bottombar/index-Selected@2x.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="activeIndex == 1 ? true : false" link="/news">
        <img slot="icon" src="../assets/images/bottombar/news-normal@2x.png">
        <img slot="icon-active" src="../assets/images/bottombar/news-Selected@2x.png">
        <span slot="label">资讯test</span>
      </tabbar-item>
      <tabbar-item :selected="activeIndex == 2 ? true : false" link="/category">
        <img slot="icon" src="../assets/images/bottombar/nav-normal@2x.png">
        <img slot="icon-active" src="../assets/images/bottombar/nav-Selected@2x.png">
        <span slot="label">分 类</span>
      </tabbar-item>
      <tabbar-item :selected="activeIndex == 3 ? true : false" link="/company">
        <img slot="icon" src="../assets/images/bottombar/company-normal@2x.png">
        <img slot="icon-active" src="../assets/images/bottombar/company-Selected@2x.png">
        <span slot="label">企业</span>
      </tabbar-item>
      <tabbar-item :selected="activeIndex == 4 ? true : false" link="/mine">
        <img slot="icon" src="../assets/images/bottombar/my-normal@2x.png">
        <img slot="icon-active" src="../assets/images/bottombar/my-Selected@2x.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  name: "Bottom",
  props: {},
  data() {
    return {};
  },
  computed: {
    activeIndex() {
      if (this.$route.path == "/index") {
        return 0;
      } else if (this.$route.path == "/news") {
        return 1;
      } else if (this.$route.path == "/category") {
        return 2;
      } else if (this.$route.path == "/company") {
        return 3;
      } else if (this.$route.path == "/mine") {
        return 4;
      }
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  created() {
    // console.log(this.$route)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
