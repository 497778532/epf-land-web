<template>
  <div class="noticepublic_wrap">
    <epf-tag
      name="公告公示"
      :data="DataTitle"
      @switch="selectTabTra"
      @more="selectTabMore">
    </epf-tag>
    <div class="noticepublic_cont">
      <!-- 交易公告 -->
      <div v-show="selectedTra===0">
        <table width="1150" cellpadding="0" cellspacing="0"
          v-if="noticepublic0 && (noticepublic0!==[]||noticepublic0 == '')"
          v-loading="loading"
          element-loading-text="拼命加载中...">
          <tr>
            <td>公告编号</td>
            <td>行政区域</td>
            <td>公告类型</td>
            <td>公告日期</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in noticepublic0" :key="index">
            <td class="td1">{{item.noticeNo}}</td>
            <td>{{item.cantonProvinceName}}-{{item.cantonCityName}}-{{item.cantonAreaName}}</td>
            <td>{{item.noticeTypeName}}</td>
            <td>{{item.noticeTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.noticeTime)[0]:''}}</td>
            <!-- <td>{{item.noticeTime?item.noticeTime:''}}</td> -->
            <td class="td1" v-if="item.noticeType=='common_notice'">
              <span @click="viewNoticedetail(item.id)">查看公告详情</span>
            </td>
            <td class="td1" v-if="item.noticeType=='change_notice'">
              <span @click="viewChangeNotic(item.id)">变更公告详情</span>
            </td>
          </tr>
        </table>
        <div v-if="noticepublic0==[]||noticepublic0 == ''" style="text-align: center;">
          <img src="@/assets/image/dataNone.png" alt="" style="margin-top:40px;">
        </div>
      </div>
      <!-- 成交公示 -->
      <div v-show="selectedTra===1">
        <table width="1150" cellpadding="0" cellspacing="0"
          v-if="noticepublic1 && (noticepublic1!==[]||noticepublic1 == '')"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          >
          <tr>
            <td>标的编号</td>
            <td>交易类型</td>
            <td>交易方式</td>
            <td>成交日期</td>
            <td>成交价/万元</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in noticepublic1" :key="index">
            <td class="td1">{{item.targetNo}}</td>
            <td>{{item.circulationName}}</td>
            <td>{{item.transTypeName}}</td>
            <td>{{item.endTransTime}}</td>
            <td>{{item.transPrice}}</td>
            <td class="td1" @click="viewresultdetail(item.id, item.targetId)">查看详情</td>
          </tr>
        </table>
        <div v-if="noticepublic1==[]||noticepublic1 == ''" style="text-align: center;">
          <img src="@/assets/image/dataNone.png" alt="" style="margin-top:40px;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return{
      loading:true,
      DataTitle:[
        { name: "交易公告", value: "trans_status-003" },
        { name: "成交公示", value: "trans_status-003" },
      ],
      selectedTra:0,
      landData:[
        {landType:"个人用地",title:"永州宁远县700亩水田转让",price:"面议",area:500,years:'挂牌交易',location:"永州市-宁远县"},
        {landType:"企业用地",title:"永州宁远县700亩水田转让",price:"面议",area:500,years:'挂牌交易',location:"永州市-宁远县"},
        {landType:"政府所属",title:"永州宁远县700亩水田转让",price:"面议",area:500,years:'挂牌交易',location:"永州市-宁远县"},
        {landType:"个人用地",title:"永州宁远县700亩水田转让",price:"面议",area:500,years:'挂牌交易',location:"永州市-宁远县"},
      ],

      noticepublic0:[],
      noticepublic1:[]
    }
  },
  created(){
    let param = {
      'page': 1,
      'rows': 4,
      'type': 'notice'
    }
    this.initNoticeData(param);
  },
  methods:{
    initNoticeData(param){ // 公示公告数据
      this.loading = true
      this.$axios.get(
        this.$API.EPF_TRADE.LADNWEB.RESULT,
        param,res => {
        if(res.code === 0){
          this.loading = false
          if(param.type=='notice'){
            this.noticepublic0 = res.pager.results;
          }else{
            this.noticepublic1 = res.pager.results;
          }
        }
      })
    },
    selectTabTra(item){
      let type = "";
      if(item.name == '成交公示'){
        type = "results"
        this.selectedTra = 1
      }else{
        type = "notice"
        this.selectedTra = 0
      }

      let param = {
        'page': 1,
        'rows': 4,
        'type': type
      }
      this.initNoticeData(param);
    },
    selectTabMore(item){
      if(this.selectedTra == 0){
        this.$router.push('/PublicNoticeHome/TradePublic')
      }
      if(this.selectedTra == 1){
        this.$router.push('/PublicNoticeHome/ResultsPublicity')
      }
    },
    viewNoticedetail(id){
      this.$router.push({path:'/TradePublicDetails',query:{noticeId:id}})
    },
    viewChangeNotic(id){
      this.$router.push({path:'/TradeChangePublicDetails',query:{noticeId:id}})
    },
    viewresultdetail(id, targetId){
      this.$router.push({path:'/ResultsPublicityDetails',query:{noticeId:id, targetId: targetId}})
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;

}
.noticepublic_wrap{
  @include size(100%,auto);
  .noticepublic_cont{
    @include size(1150px,auto);
    margin:0 auto;
    table{
      border: solid 1px #f3f3f3;
      margin-top:24px;
      tr{
        height:50px;
        text-align: center;
        line-height: 50px;
        border-bottom: solid 1px #f3f3f3;
        color:#666666;
        font-size: 14px;
        &:nth-child(1){
          background-color: #f6f9fe;
          color: #333333;
          font-size: 14px;
          font-weight: bold;
        }
        .td1{
          color: var(--lightColor);
          cursor: pointer;
          span{
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
