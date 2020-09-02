<template>
  <div class="bidding">
    <div class="bidding_title">
      <p>交易信息播报</p>
    </div>
    <div class="bidding_contact">
      <div class="bidding_contact_tabletitle">
        <ul>
          <li
            v-for="(item,index) in bidTitle"
            :key="index" 
            :class="selectedkey == index?'active':''"
            @mouseenter="selectedLi(index),selectedkey = index"
            @mouseleave="startTimer(selectedkey)"
            >{{item}}
            <el-tooltip v-if="index == '1'" class="item"  :class="selectedkey == index?'active':''" effect="dark" content="将在今天结束交易的标的!" placement="top">
              <li>即将截止</li>
            </el-tooltip>
          </li>
          <li>
            <div class="bid_top" :page="page" @click="changePage(-1)"></div>
            <div class="bid_bottom" :page="page" @click="changePage(1)"></div>
          </li>
        </ul>
      </div>
      <div class="table-head">
        <table width="1130" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <td v-for="(info,index) in tableTitle" :key="index">{{info}}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-foot"  @mouseenter="clearTimer" @mouseleave="startTimer(selectedkey)">
        <table
          width="1130"
          cellpadding="0"
          cellspacing="0"
        >
          <tbody>
            <tr
              v-for="(item,index) in biddingStateData"
              :key="index"
              @click="toTradeDetail(item.id,item.status)"
            >

              <td>
                <el-tooltip class="item" effect="dark" :content="item.targetNo" placement="left">
                  <div style="width:160px;margin:0 auto;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.targetNo}}</div>
                </el-tooltip>
              </td>
              <td>{{item.cantonProvinceName}}-{{item.cantonCityName}}-{{item.cantonAreaName}}</td>
              <td v-if="selectedkey==0||selectedkey==2||selectedkey==4">{{item.beginPrice}}</td>
              <td v-if="selectedkey==1">{{item.currentPrice}}</td>
              <td v-if="selectedkey==3">{{item.transPrice}}</td>


              <td v-if="selectedkey==0||selectedkey==4">{{item.transTypeName}}</td>
              <td v-if="selectedkey==0||selectedkey==4">{{item.beginFocusTime == null ? item.beginLimitTime : item.beginFocusTime}}</td>
              
              <td v-if="selectedkey==1">{{item.peopleNum}}</td>
              <td v-if="selectedkey==1">{{item.endFocusTime}}</td>

              <td v-if="selectedkey==2">{{item.beginNoticeTime}}</td>
              <td v-if="selectedkey==2">{{item.beginApplyTime}}</td>

              <td v-if="selectedkey==3">{{item.winnerId}}</td>
              <td v-if="selectedkey==3">{{item.endTransTime}}</td>

              <td v-if="selectedkey==0||selectedkey==4">{{item.statusName}}</td>
              <td v-if="selectedkey==1||selectedkey==2||selectedkey==3">{{item.transTypeName}}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="biddingStateData == [] || biddingStateData == ''" class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img"/>
          <p v-if="selectedkey==0" style="color:#fff;">暂无今日交易内容</p>
          <p v-if="selectedkey==1" style="color:#fff;">暂无即将截止内容</p>
          <p v-if="selectedkey==2" style="color:#fff;">暂无今日公告内容</p>
          <p v-if="selectedkey==3" style="color:#fff;">暂无今日成交内容</p>
          <p v-if="selectedkey==4" style="color:#fff;">暂无明日交易内容</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bidTitle: ["今日交易", "", "今日公告", "今日成交", "明日交易"],
      tableTitle: ["标的编号","行政区域","起始价（万元）","交易方式","挂牌/拍卖开始时间","交易状态"],
      tableTitle0: ["标的编号","行政区域","起始价（万元）","交易方式","挂牌/拍卖开始时间","交易状态"],
      tableTitle1: ["标的编号","行政区域","当前价格（万元）","当前报价人数","挂牌截止时间","交易方式",],
      tableTitle2: ["标的编号","行政区域","起始价/万元","公告开始时间","竞买申请开始时间","交易方式",],
      tableTitle3: ["标的编号","行政区域","成交价（万元）","成交人","成交时间","交易方式",],
      tableTitle4: ["标的编号","行政区域","起始价（万元）","交易方式","挂牌/拍卖开始时间","交易状态"],
      biddingStateData: [],
      selectedkey: 0,
      type: "TodayDeal",
      page: {
        page: 1,
        rows: 6,
        totalRecord: 1,
        totalPage: 1,
        type: "TodayDeal"
      },
      timer:null
    };
  },
  created() {
    this.init(this.page);
  },
  mounted(){
    this.clearTimer()
    this.startTimer(this.selectedkey)
  },
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.page.totalRecord / this.page.rows);
    },
    top() {
      let start = 0;
      let tdWidth = 48;
      return (
        start + (this.page.page - 1) * tdWidth * (this.page.rows - 1)
      );
    }
  },
  methods: {
    clearTimer(){
      clearInterval(this.timer)
    },
    startTimer(selectedkey){
      let that = this
      let num = 0
      if(selectedkey == 0){
        that.timer = setInterval(()=>{
          that.page.page = ++num
          that.init(this.page);
          if(num  == that.page.totalPage){
            num = 0
          }
          if(this.page.totalPage == 1){
            clearInterval(that.timer)
          }
        },2000)
      }else{
         clearInterval(that.timer)
         return;
      }
    },
    toTradeDetail(id, status) {
      this.$router.push({
        path: "/TradingDetails",
        query: { id: id, selectedTraState: status }
      });
    },
    changePage(num) {
      this.clearTimer()
      if (this.page.page + num <= this.page.totalPage && this.page.page + num > 0) {
        if (num > 0 && this.page.totalPage > this.page.page) {
          this.page.page += num;
          this.init(this.page);
        } else if (num > 0 && this.page.totalPage < this.page.page) {
          this.page.page = this.page.totalPage;
          this.init(this.page);
        } else if (num < 0) {
          if (this.page.page <= 1) {
            this.page.page = 1;
          } else {
            this.page.page = this.page.page + num;
          }
          this.init(this.page);
        }
      }
    }, //翻页的方法
    init(params) {
      this.biddingStateData = []
      let that = this;
      this.$axios.get(
        this.$API.EPF_TRADE.LADNWEB.BROAD,
        params,
        res => {
          if (res.code != 0) {
            that.$message.error(res.msg);
            return;
          }
          that.biddingStateData = res.pager.results;
          //分页属性设置
          that.page.page = res.pager.pageNo;
          that.page.rows = res.pager.pageSize;
          that.page.totalRecord = res.pager.totalRecord;
          that.page.totalPage = res.pager.totalPage;
        }
      );
    },
    selectedLi(index) {
      this.clearTimer()
      if (index == 0) {
        this.tableTitle = this.tableTitle0;
        this.type="TodayDeal"
      }else if (index == 1) {
        this.tableTitle = this.tableTitle1;
        this.type="Closing"
      }else if (index == 2) {
        this.tableTitle = this.tableTitle2;
        this.type="TodayNotice"
      }else if (index == 3) {
        this.tableTitle = this.tableTitle3;
        this.type="TodayEnd"
      }else if (index == 4) {
        this.tableTitle = this.tableTitle4;
        this.type="TomorrowNotice"
      }
      this.page = {page: 1,rows: 6,totalRecord: 1,totalPage: 1,type: this.type};
      this.init(this.page);
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
    this.timer = null;
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.bidding {
  @include size(100%, auto);
  &_title {
    p {
      @include size(180px, 22px);
      margin: 0 auto;
      border-left: 7px solid #2049a3;
      border-right: 7px solid #2049a3;
      color: #ffffff;
      font-size: 24px;
      text-align: center;
      line-height: 20px;
    }
  }
  &_contact {
    @include size(100%, 470px);
    box-sizing: border-box;
    padding: 45px 0 0 35px;
    background: url("../../../../assets/image//icon-24.png") no-repeat top
      center;
    background-size: 99%;
    margin-top: -10px;
    &_tabletitle {
      @include size(1130px, auto);
      margin-bottom: 9px;
      ul {
        line-height: 40px;
        font-size: 16px;
        color: #969696;
        li {
          display: inline-block;
          vertical-align: middle;
          width: 241px;
          text-align: center;
          color: #96b4f6;
          font-size: 16px;
          cursor: pointer;
          background: url("../../../../assets/image/icon-25.png") no-repeat
            center center;
          background-size: 98% 100%;
          margin-left: -40px;
        }
        li:nth-child(1) {
          margin-left: 0;
        }
        li:nth-last-child(1) {
          @include size(78px, auto);
          background: none;
          margin-left: 0;
          .bid_top {
            @include size(100%, 22px);
            background: url("../../../../assets/image/icon-28-top.png")
              no-repeat center center;
          }
          .bid_bottom {
            @include size(100%, 22px);
            background: url("../../../../assets/image/icon-28-bot.png")
              no-repeat center center;
          }
        }
        li:hover,
        li.active {
          color: #ffffff;
          font-weight: bold;
          background: url("../../../../assets/image//icon-26.png") no-repeat
            center center;
          background-size: 98% 100%;
        }
      }
    }
    .table-head {
      table {
        border: solid 1px #1c3a7c;
        background: url("../../../../assets/image/icon-27.png") no-repeat center
          center;
        td {
          box-sizing: border-box;
          line-height: 54px;
          color: #d9def2;
          font-size: 14px;
          text-align: center;
          width: 200px;
        }
      }
    }
    .table-foot {
      @include size(1130px, 288px);
      text-align: center;
      overflow: hidden;
      table {
        border: solid 1px #1c3a7c;
        td {
          width: 200px;
          box-sizing: border-box;
          line-height: 47px;
          color: #d9def2;
          font-size: 14px;
          border: solid 1px #0e1c3e;
        }
        tr {
          background-color: #2f305f;
          cursor: pointer;
        }
        tr:nth-child(3n) {
          background-color: #112e5b;
        }
        tr:nth-child(3n + 1) {
          background-color: #0c4063;
        }
        tr:hover {
          background: #316e9a;
        }
      }
    }
  }
}
</style>
