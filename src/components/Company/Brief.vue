<template>
    <div class="brief">
     {{compro1.introduction}}
      </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
     props:{
        compro1:{
            type:Object
        }
    },
    components: {
    Flexbox,
    FlexboxItem
  }
}
</script>
<style lang="less">
.brief{
    padding:10px;
    background-color:#fff;
}
</style>
