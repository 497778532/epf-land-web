<template>
  <div class="customTable">
    <el-row>
      <el-col v-for="(item, index) in config" :span="item.span" :key="index">
        <h4 class="title">
          {{ item.title }}
        </h4>
      </el-col>
    </el-row>

    <el-row v-for="(item, key) in data" :key="key" class="content">
      <el-col :span="24" class="time" v-if="tableTpe === 'plain'">
        <span v-if="item.insertTime">{{ item.insertTime }}</span>
        <span v-else>{{item.updateTime}}</span>
          <!-- item.delegationStatus ==  'draft3'&& -->
          <!-- v-show="
              item.publishStatus != 'audit' &&
              item.publishStatus != 'published2' &&
              item.publishStatus != 'down_mytsell' 
              
          " -->
        <i
          v-show="item.publishStatus=='draft2'|| item.publishStatus == 'audit_failure'||
          item.status=='draft'||
          item.delegationStatus ==  'draft3'"
          class="tools_handle ediotrHover el-icon-edit-outline"
          v-if="url == '/PersonalCenter/provideMate' ? false : true"
          @click="ediot(item)"
        >
        </i>
          <!-- item.delegationStatus ==  'draft3'&&  -->
          <!-- v-show="
          item.publishStatus != 'audit'" -->
        <i
          v-show="item.publishStatus=='draft2'||item.publishStatus == 'down_mytsell'|| item.publishStatus == 'audit_failure'|| item.contractNetSignStatus == '1'|| item.isEntrustStatus == '1' ||
          item.status=='draft'||
          item.delegationStatus ==  'draft3'"
          class="tools_handle deleteHover el-icon-delete"
          @click="dele(item)"
        >
        </i>
      </el-col>

      <el-col :span="24" class="time" v-if="tableTpe === 'money' || tableTpe === 'bond'">
        <el-col class="epf_row_l" :span="12">
          <span v-if="tableTpe === 'money'">竞买号：{{ item.licenseNo }}</span>
          <span v-if="tableTpe === 'bond'">委托编号：<em style="color:#333;font-weight:bold;">{{ item.transactionNo }}</em></span>
        </el-col>
        <el-col class="epf_row_r" :span="12">
          <span v-if="item.submitTime">到账日期：{{ item.submitTime }}</span>
          <span v-else>申请日期：{{ item.applyDate }}</span>
        </el-col>
      </el-col>

       <el-col :span="24" class="time" v-if="tableTpe === 'order'">
        <el-col class="epf_row_l" :span="12">
          <span>竞买号：<em style="color:#333;font-weight:bold;">{{ item.licenseNo }}</em></span>
        </el-col>
        <el-col class="epf_row_r" :span="12">
         <span v-if="item.transType == 'baee14bf-95cd-42df-aa50-0c3ce01adf58'">挂牌截止日期：{{item.endFocusTime}}</span>
         <span v-else>拍卖开始时间：{{item.beginApplyTime}}</span>
        </el-col>
      </el-col>

      <el-col :span="24" class="time" v-if="tableTpe === 'contract'">
        <el-col class="epf_row_l" :span="12">
          <span>合同编号:{{ item.code }}</span>
        </el-col>
        <el-col class="epf_row_r" :span="12">
          <span>{{ item.insertTime }}</span>
        </el-col>
      </el-col>

      <el-col
        :span="value.span"
        v-for="(value, index) in config"
        :key="index"
        class="col"
       >
        <div class="box">
          <slot :row="data[key]" :_index="key" :name="value.fie"> </slot>
        </div>
      </el-col>
      <!-- 需求/供给匹配信息 状态为已发布或者已登记显示匹配信息-->
      <div class="match"  v-show="item.publishStatus == 'published2' || item.publishStatus == '	publishe'">
        <div>
          <span :class="!matchFlag ? '' : 'active'">
            <em @click="matchList(key)">为您匹配到以下地块</em>
            <i v-if="!matchFlag" class="el-icon-caret-bottom" @click="matchList(key)"></i>
            <i v-else   class="el-icon-caret-top" @click="matchList(key)"></i>
            <strong v-show="item.tag"><i class="el-icon-refresh"></i>换一批</strong>
          </span>
          <ul v-show="item.tag">
            <li v-for="(items, ind) in matchListData" :key="ind">
              <div class="content_top clearfix">
                <em v-if="url == '/PersonalCenter/myProvide'" class="left_match">需求匹配</em>
                <em v-if="url == '/PersonalCenter/demandRegister'" class="left_match">供给匹配</em>
                <em class="right_type">{{ items.type }}</em>
              </div>
              <h6>
                {{ items.type }}{{ items.provice }}{{ items.city }}{{ items.useType
                }}{{ items.ateaTotal }}平方米
              </h6>
              <p>
                <img src="../../../assets/image/icon-map.png" alt="" />
                <em>{{ items.provice }}-{{ items.city }}-{{ items.area }}</em>
              </p>
              <p>
                <img src="../../../assets/image/icon-area.png" alt="" />
                <em>{{ items.ateaTotal }}平方米</em>
              </p>
              <div class="content_bottom">
                <em class="price">￥{{ items.price }}万</em>
                <em class="detail">查看详情</em>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "customTable",
  props: {
    data: {
      type: Array || Object,
      default: () => []
    },
    config: {
      type: Array,
      default: () => []
    },
    tableTpe: {
      type: String,
      default: "plain"
    }
  }, 
  // props:['data','config','tableTpe'],
  data() {
    return {
      url: "",
      matchFlag: false,
      matchIndex:-1,
      matchListData: [
        {
          type: "转让",
          title: "山东省山东省历下区锦绣路中南华夏丰台科技园6号",
          provice: "山东省",
          city: "山东省",
          area: "历下区",
          ateaTotal: 10,
          price: "3000,000",
          useType: "工业用地",
        },
        {
          type: "出租",
          title: "北京市丰台区丰台科技园6号",
          provice: "北京市",
          city: "丰台区",
          area: "丰台区",
          ateaTotal: 500,
          price: "600000,000",
          useType: "商业用地",
        },
        {
          type: "抵押",
          title: "山西省太原市小店区科技园6号",
          provice: "山西省",
          city: "太原市",
          area: "小店区",
          ateaTotal: 320,
          price: "50000,000",
          useType: "个人用地",
        }
      ]
    };
  },
  created() {
    this.url = this.$router.currentRoute.path;
    console.log(this.url)
  },
  methods: {
    ediot(data) {
      this.$emit("edioBtn", data);
    },
    dele(data) {
      this.$confirm("确认要删除该条信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("deleBtn", data);
        })
        .catch(() => {});
    },
    matchList(index) {
     this.data[index].tag =  !this.data[index].tag
    }
  }
};
</script>
<style lang="scss" scoped>
.customTable {
  .title {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    text-align: center;
    background-color: #f1f6f7;
    color: #333330;
  }
  .content {
    margin: 15px 0;
    border-left: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    .time {
      background-color: #f8f8f8;
      color: #a7a7a7;
      font-size: 14px;
      padding: 15px;
      text-align: right;
      border: 1px solid #e2e2e2;
      border-left: none;
    }
    .box{
      min-height: 125px;
      width: 100%;
      text-align: center;
      border-right: 1px solid #e2e2e2;
    }
  }
  .match {
    background: #f8f8f8;
    span {
      font-size: 12px;
      color: #666666;
      display: inline-block;
      width: 100%;
      line-height: 34px;
      padding-left: 20px;
      border-top: 1px solid #e2e2e2;
      .el-icon-caret-top {
        color: var(--lightColor);
      }
      .el-icon-caret-bottom {
        color: #666666;
      }
    }
    .active {
      color: var(--lightColor);
    }
    strong {
      float: right;
      padding-right: 40px;
      font-weight: normal;
      i {
        margin-right: 5px;
      }
    }
    ul {
      padding: 0 18px 17px 20px;
      display: flex;
      justify-content: space-between;
      li {
        width: 255px;
        background: #fff;
        padding-right: 17px;
        padding-left: 19px;
        border-bottom: 1px solid #e2e2e2;
        border-left: 1px solid #e2e2e2;
        border-right: 1px solid #e2e2e2;
        border-top: 3px solid #ffe2b2;
        .content_top {
          position: relative;
          font-size: 12px;
          .left_match {
            background: url("../../../assets/image/match_bg.png");
            width: 78px;
            height: 34px;
            text-align: center;
            line-height: 29px;
            position: absolute;
            top: -3px;
            left: -23px;
            float: left;
            color: #fff;
          }
          .right_type {
            float: right;
            background: #fdf5ec;
            color: var(--priceColor);
            font-weight: bold;
            border-radius: 0 10px 0 10px;
            padding: 5px 14px 4px 11px;
            margin-top: 8px;
          }
        }
        h6 {
          color: #333;
          font-weight: bold;
          font-size: 13px;
          line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          line-height: 32px;
          font-size: 12px;
          color: #333;
          img {
            vertical-align: middle;
          }
        }
        .content_bottom {
          line-height: 32px;
          .price {
            float: left;
            color: var(--Colors);
            font-weight: bold;
          }
          .detail {
            float: right;
            padding: 9px 15px 9px 17px;
            font-size: 12px;
            line-height: 12px;
            border: 1px solid var(--Colors);
            color: var(--Colors);
            margin-bottom: 11px;
          }
        }
      }
    }
  }
}
</style>
