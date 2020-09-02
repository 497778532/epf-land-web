<template>
  <div class="policeRegulateDetail_warp">
    <epf-lePage :location="location"></epf-lePage>
    <div class="policeRegulateDetail_cont">
      <div class="detail_cont_title">{{info.title}}</div>
       <div class="detail_cont_subtitle">
        <span>发布时间：{{info.pubTime}} </span>
        <span>作者： {{info.creatorName}}</span>
        <span>来源： {{info.fromWhere}}</span>
      </div>
      <div class="detail_cont"  v-html='info.content' >
        <!-- <p align="center">（中华人民共和国主席令第28号）</p>
        <p>（1986年6月25日第六届全国人民代表大会常务委员会第十六次会议通过 根据1988年12月29日第七届全国人民代表大会常务委员会第五次会议《关于修改〈中华人民共和国土地管理法〉的决定》第一次修正 1998年8月29日第九届全国人民代表大会常务委员会第四次会议修订 根据2004年8月28日第十届全国人民代表大会常务委员会第十一次会议《关于修改〈中华人民共和国土地管理法〉的决定》第二次修正）</p>
        <p align="center">第一章 总则</p>
        <p class="detail_cont1">第一条  为了加强土地管理，维护土地的社会主义公有制，保护、开发土地资源，合理利用土地，切实保护耕地，促进社会经济的可持续发展，根据宪法，制定本法。</p>
        <p class="detail_cont1">第二条  中华人民共和国实行土地的社会主义公有制，即全民所有制和劳动群众集体所有制。全民所有，即国家所有土地的所有权由国务院代表国家行使。任何单位和个人不得侵占、买卖或者以其他形式非法转让土地。土地使用权可以依法转让。国家为了公共利益需要，可以依法对土地实行征收或者征用并给予补偿。国家依法实行国有土地有偿使用制度。但是，国家在法律规定的范围内划拨国有土地使用权的除外。</p>
        <p class="detail_cont1">第三条  十分珍惜、合理利用土地和切实保护耕地是我国的基本国策。各级人民政府应当采取措施，全面规划，严格管理，保护、开发土地资源，制止非法占用土地的行为。</p>
        <p class="detail_cont1">第四条  国家实行土地用途管制制度。国家编制土地利用总体规划，规定土地用途，将土地分为农用地、建设用地和未利用地。严格限制农用地转为建设用地，控制建设用地总量，对耕地实行特殊保护。前款所称农用地是指直接用于农业生产的土地，包括耕地、林地、草地、农田水利用地、养殖水面等；建设用地是指建造建筑物、构筑物的土地，包括城乡住宅和公共设施用地、工矿用使用土地的单位和个人必须严格按照土地利用总体规划确定的用途使用土地。</p>
        <p class="detail_cont1">第五条  国务院土地行政主管部门统一负责全国土地的管理和监督工作。县级以上地方人民政府土地行政主管部门的设置及其职责，由省、自治区、直辖市人民政府根据国务院有关规定确定。</p>
        <p class="detail_cont1">第六条  任何单位和个人都有遵守土地管理法律、法规的义务，并有权对违反土地管理法律、法规的行为提出检举和控告。</p>
        <p class="detail_cont1">第七条  在保护和开发土地资源、合理利用土地以及进行有关的科学研究等方面成绩显著的单位和个人，由人民政府给予奖励。</p> -->
      </div>
      <!-- <div class="enclosure">
        <p>附件:</p>
        <p>关于规章制度的文件.doc</p>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info:{},
      location:[
        {path:'/',name:'首页'},
        {path:'/PoliciesRegulate',name:'政策法规'},
        {path:'/PoliciesRegulate',name:'国家法规'},
        {path:null,name:'政策法规详情'},
      ],
    }
  },
  created(){
    this.info.id=this.$route.query.id
    this.location[1].name=this.$route.query.infoMenuNamesub
    this.location[2].name=this.$route.query.infoMenuName
      this.$axios.get('/epf-cms/admin/info/getInfo',{id:this.info.id},res => {
        console.log('请求返回：',res)
        if(res.code != '0'){
            this.$message.error(res.msg);
            return
        }
        this.info=res.info
      })
  },
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.policeRegulateDetail_warp{
  @include size(1200px,auto);
  margin:0 auto;
  .policeRegulateDetail_cont{
    @include size(100%,auto);
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
    color:#666666;
    .detail_cont_title{
      @include size(100%,50px);
      border-bottom: solid 1px #eeeeee;
      font-size: 22px;
      text-align: center;
      font-weight: bold;
    }
    .detail_cont_subtitle{
      @include size(100%,50px);
      font-size: 14px;
      line-height: 50px;
      span{
        margin-right: 40px;
      }
    }
    .detail_cont{
      @include size(100%,auto);
      line-height: 40px;
      &1{
        text-indent: 2rem;
      }
    }
    .enclosure{
      margin-top:20px;
      p{
        line-height: 30px;
        &:nth-child(2){
          margin-left:30px;
          color: #517cd2;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
