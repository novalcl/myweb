<template>
    <div class="about-we">
            <!-- 头部 -->
            <top-header title="关于我们" :left-options="{backText: '',backGround:'#fff',color:'#333'}"></top-header>
        <div class="container" >
            <div class="title">
                <p>中国电器配件行业门户</p>
                <p>常熟市雪隆电器电热合金材料有限公司</p>
            </div>
            <div class="desc">
                <p class="brief">公司简介:</p>
            <p>
                
	    我司是国内专业生产电阻电热全合金的专业厂家。我厂主要生产铁铬铝，镍铬圆扁丝带，不绣钢，康铜，工业民用电炉条等。产品规格齐全，性能优良，是制造各种工业电炉，民用电器，电器设备最理想的电阻电热材料。
            </p>
            <p>
                    我司严格参照国际先进标准，严格执行国家标准，使我们的产品精益求精，严格的工艺纪律及质量管理体制确保了我司产品质量。
            </p>
            <p>
                    我司宗旨：“质量第一,信誉至上”。我司愿为新老用户提供最理想的材料，为你们在市场竞争中提供最有效的服务。
            </p>
            </div>
        </div>
    </div>
    
</template>
<script>
import TopHeader from "../../components/TopHeader.vue";

export default {
    components:{
        TopHeader,
       
    },
}
</script>
<style lang="less">
  

    .container{
        border-top:1px solid #eee;
        margin-top:46px;
       
        p{
                text-indent: 2em;
                line-height: 24px;
                
            }
       .title{
           font-weight: 600;
            margin-top:20px;
           
        }
        .desc{
           
           padding:23px;
           .brief{
               font-weight: 600;
           }
        }
    }
</style>
