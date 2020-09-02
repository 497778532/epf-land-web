<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName" @tab-click="selectTabs">
      <el-tab-pane label="业务消息" name="first">
        <span class="allLook" @click="allMark" style="cursor: pointer;">全部标记为已读</span>
        <div class="message-content" v-for="(item,index) in business" :key="index">
          <div style="margin-bottom:16px;">
            <img
              v-if="item.readed==0"
              alt
              src="@/assets/image/email_success.png"
              style="width:18px;height:18px;"
            />
            <img
              v-else-if="item.readed==1"
              src="@/assets/image/email_dis.png"
              alt
              style="width:18px;height:18px;"
            />
            <span class="message-content-title">{{item.title}}</span>
            <span style="color:#999;font-size: 14px;float:right">{{item.sendTime}}</span>
          </div>
          <div v-if="true">
            <span
              :class="item.flexibleOpen?'message-content-detail':'message-content-undetail'"
            >{{item.content}}</span>
            <span style="color: #4472d5;font-size:12px;cursor: pointer;" @click="flexSwitch(item)">
              {{item.flexibleOpen?'收起1':'展开2'}}
              <i
                :class="item.flexibleOpen?'el-icon-caret-top':'el-icon-caret-bottom'"
              ></i>
            </span>
          </div>
          <div v-if="false">
            <span class="message-content-detail">{{item.content}}</span>
            <span
              style="color: #4472d5;font-size:12px; cursor: pointer;"
              @click="sureBuy(item)"
            >点击确认</span>
          </div>
        </div>

        <div class="epf_page_sile" v-if="businessnew">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="un_handleSizeChange"
            @current-change="un_handleCurrentChange"
            :total="un_totalRecord"
            :page-size="un_pageSize"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
        <div style="text-align: center;color: #9a9a9a;margin-top: 10px;" v-if="!businessnew">暂无数据</div>
      </el-tab-pane>
      <el-tab-pane label="系统通知" name="second">
        <span class="allLook" @click="allMark" style="cursor: pointer;">全部标记为已读</span>

        <div class="message-content" v-for="(item,index) in notification" :key="index">
          <div style="margin-bottom:16px;">
            <img
              v-if="item.readed==0"
              src="@/assets/image/email_success.png"
              alt
              style="width:18px;height:18px;"
            />
            <img
              v-else-if="item.readed==1"
              src="@/assets/image/email_dis.png"
              alt
              style="width:18px;height:18px;"
            />
            <span class="message-content-title">{{item.title}}</span>
            <span style="color: #999;font-size: 14px;float:right">{{item.sendTime}}</span>
          </div>
          <div>
            <span
              :class="item.flexibleOpen?'message-content-detail':'message-content-undetail'"
            >{{item.content}}</span>
            <span style="color:#4472d5;font-size:12px;cursor: pointer;" @click="flexSwitch(item)">
              {{item.flexibleOpen?'收起':'展开'}}
              <i
                :class="item.flexibleOpen?'el-icon-caret-top':'el-icon-caret-bottom'"
              ></i>
            </span>
          </div>
        </div>
        <div class="epf_row_c" v-if="businesssystem">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="have_handleSizeChange"
            @current-change="have_handleCurrentChange"
            :total="have_totalRecord"
            :page-size="have_pageSize"
            style="margin-top:10px;"
          ></el-pagination>
          <div style="text-align: center;color: #9a9a9a;margin-top: 10px;" v-if="!businesssystem">暂无数据</div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 弹窗 -->
    <!-- 预约信息 -->
    <div class="delDialog_box">
      <div v-show="subscribeDialog" class="delDialog" @click.stop="subscribeDialog=false"></div>
      <transition name="el-fade-in">
        <div
          v-show="subscribeDialog"
          class="transition-box container_box"
          style="width:850px;height:auto;top: 50%;transform: translate(-50%,-50%);z-index:1000;"
        >
          <div class="title_box">
            <h4>确认竞买</h4>
            <span>
              <i class="el-icon-circle-close" @click="subscribeDialog=false"></i>
            </span>
          </div>

          <p
            style="color:#666;font-size:12px;text-align:left;margin-left:12px;margin-top:20px;margin-bottom:10px;"
          >
            您好，张三邀请您联合竞买：标的编号：
            <span style="color:#4472d5;font-size:12px;text-align:left;">DAZ2018003</span>
          </p>

          <div style="padding:10px;padding-bottom:80px;" class="content_box">
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column prop="name" label="预约人" width="110"></el-table-column>
              <el-table-column prop="targetNo" label="标的编号" width="150"></el-table-column>
              <el-table-column prop="insertTime" label="申请时间" width="200"></el-table-column>
              <el-table-column prop="statusName" label="状态">
                <template slot-scope="scope">
                  <span>{{scope.row.statusName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="handle" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleClickSure(scope.$index, scope.row)"
                    style="color: #4472d5；"
                  >确认</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleClickRefuse(scope.$index, scope.row)"
                    style="color: #4472d5；"
                  >拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      activeName: "first",
      isFlag: true,
      baseUrl: "",
      delShow: false,
      issusedSoltOut: false,
      applyTrading: false,
      intentionBuyDialog: false,
      subscribeDialog: false,
      flexibleOpen: false,
      un_pageNo: 1,
      un_pageSize: 5,
      un_totalPage: 1,
      un_totalRecord: 0,
      un_search: {},
      have_pageNo: 1,
      have_pageSize: 5,
      have_totalPage: 1,
      have_totalRecord: 0,
      have_search: {},
      id: "",
      loading: true,
      notification:[
        {readed:0,title:'',sendTime:'',flexibleOpen: false,content:''},
      ],
      business: [
        {readed:0,title:'',sendTime:'',flexibleOpen: false,content:''},
      ],
      tableData: [
        {
          name: "张涵予",
          targetNo: "DAZ2018002",
          insertTime: "2019-01-22 18:00:00",
          statusName: "申请中，被联合(未缴足保证金)"
        }
      ],
      currentab: "first",
      businessnew: false,
      businesssystem: false
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let params = {
      page: this.un_pageNo,
      rows: this.un_pageSize,
      issue: "1"
    };
    this.getMyProvide(params);
    this.getMySystemmsg(params);
  },
  methods: {
    checkDel(id) {
      this.id = id;
      this.delShow = true;
    },
    delSupply() {
      this.$axios.post(
        "/epf-landweb/admin/tsell/removeById",
        qs.stringify({ id: this.id }),
        res => {
          if (res.code != "0") {
            this.$message.error(res.msg);
            return;
          }
          this.delShow = false;
          this.$message.success(res.msg);
          var tab = { name: this.activeName };
          this.selectTabs(tab, event);
        }
      );
    },
    getFilterInfo_un(val) {
      this.un_search = val;
      this.un_search["page"] = 1;
      this.un_search["rows"] = this.un_pageSize;
      this.getMyProvide(this.un_search);
    },

    getFilterInfo_have(val) {
      this.have_search = val;
      this.have_search["page"] = 1;
      this.have_search["rows"] = this.have_pageSize;
      this.getMyProvide(this.have_search);
    },
    async  getMyProvide(params) {
      this.business = [];
      this.loading = true;
      this.$axios.get(
        "/epf-admin/admin/msgmessage/getOwnListbusiness",
        params,
        res => {
          if (res.code != 0) {
            this.loading = false;
            this.$message.error(res.msg);
            return;
          }
          let result = res.pager["results"];
          let getdata = [];
          if (result.length > 0) {
            for (var i=0;i<result.length;i++){
              let a = result[i];
              if (a.readed == 1) {
                a["flexibleOpen"] = false;
              }else{
                a["flexibleOpen"] = true;
              }
              getdata.push(a);
            }
          }
          this.business = getdata;
          this.un_pageNo = res.pager.pageNo;
          this.un_pageSize = res.pager.pageSize;
          this.un_totalPage = res.pager.totalPage;
          this.un_totalRecord = res.pager.totalRecord;

          this.loading = false;
          if (this.business.length>0) {
            this.businessnew = true;
          }
        }
      );
    },
    tryDeal(id, type) {
      this.applyTrading = true;
      this.currentId = id;
      this.currentName = type;
    },
    // 委托交易
    seekPurchase() {
      this.$store.state.entrustland = null;
      this.$router.push({
        path: "/EntrustTransHome",
        query: { id: this.currentId, publishLandtype: this.currentName }
      });
    },
    // 求租
    seekRent() {
      // this.$router.push({path:'/demandForm',query:{demandtype:2}})
    },
    have_handleSizeChange(val) {
      //每页条数改变时触发
      this.have_pageSize = val;
      this.have_search["page"] = this.have_pageNo;
      this.have_search["rows"] = val;
      this.getMySystemmsg(this.have_search);
    },
    have_handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 160);
      this.have_search["page"] = val;
      this.have_search["rows"] = this.have_pageSize;
      this.getMySystemmsg(this.have_search);
    },
    un_handleSizeChange(val) {
      //每页条数改变时触发
      this.un_pageSize = val;
      this.un_search["page"] = this.un_pageNo;
      this.un_search["rows"] = val;
      this.getMyProvide(this.un_search);
    },
    un_handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 160);
      this.un_search["page"] = val;
      this.un_search["rows"] = this.un_pageSize;
      this.getMyProvide(this.un_search);
    },
    ediotHandle(id) {
      this.$store.state.publishLand = null;
      this.$router.push({ path: "/PublishLandHome", query: { id: id } });
    },
    selectTabs(tab, event) {
      this.un_search = {};
      this.have_search = {};
      this.currentab = tab.name;
      if (tab.name == "first") {
        this.un_search["page"] = this.un_pageNo;
        this.un_search["rows"] = this.un_pageSize;
        if (this.business == null || this.business.length == 0) {
          this.getMyProvide(this.un_search);
        }
        this.isFlag = true;
      } else if (tab.name == "second") {
        this.have_search["page"] = this.have_pageNo;
        this.have_search["rows"] = this.have_pageSize;
        if (this.notification == null || this.notification.length == 0) {
          this.getMySystemmsg(this.have_search);
        }
        this.isFlag = false;
      }
    },
    // 点击确认业务消息
    sureBuy(item) {
      this.subscribeDialog = true;
      item.img = item.img2;
    },
    handleClickSure(item) {
      this.subscribeDialog = false;
    },
    handleClickRefuse(item) {
      this.subscribeDialog = false;
    },
    flexSwitch(item) {
      console.info("============000000=============");
      console.info(item);
      console.info(item.id);
      console.info(item.flexibleOpen);
      if (item.flexibleOpen == undefined) {
        item["flexibleOpen"] = false;
      } else if (item.flexibleOpen == true) {
        item.flexibleOpen = false;
      } else {
        item.flexibleOpen = true;
      }
      if (item.readed == 0) {
        //改变已读
        this.chanreaded(item.id);
        item.readed = 1;
      }
      console.info(item);
    },

    allMark() {
      if (this.currentab == "first") {
        this.business.map(item => {
          this.chanreaded("", "1");
          item.readed = 1;
        });
      } else if (this.currentab == "second") {
        this.notification.map(item => {
          this.chanreaded("", "0");
          item.readed = 1;
        });
      }
    },
    chanreaded(id, msgtype) {
      this.$axios.post(
        "/epf-admin/admin/msgmessage/msgToReaded",
        qs.stringify({ id: id, msgtype: msgtype }),
        res => {}
      );
    },
    async getMySystemmsg(params) {
      this.notification = [];
      this.loading = true;
      this.$axios.get(
        // "/epf-cms/admin/msgmessage/getOwnListSystem",
        "/epf-admin/admin/msgmessage/getOwnListSystem",
        params,
        res => {
          if (res.code != 0) {
            this.loading = false;
            this.$message.error(res.msg);
            return;
          }
          let result = res.pager["results"];
          let getdata = [];
          if (result.length > 0) {
              for (var i=0;i<result.length;i++){
                let a = result[i];
                if (a.readed == 1) {
                  a["flexibleOpen"] = false;
                }else{
                  a["flexibleOpen"] = true;
                }
                getdata.push(a);
              }
          }
          this.notification = getdata;
          this.have_pageNo = res.pager.pageNo;
          this.have_pageSize = res.pager.pageSize;
          this.have_totalPage = res.pager.totalPage;
          this.have_totalRecord = res.pager.totalRecord;
          this.loading = false;
          if (this.notification.length>0) {
            this.businesssystem = true;
          }
        }
      );
    }
  }
};
</script>

<style lang='scss' scoped>
@import url("../../../../assets/css/centerTable.css");
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.auditErrorPop {
  padding: 0;
}
.auditErrorPop .el-popover__title {
  border-bottom: 1px solid rgb(223, 223, 223);
  padding: 10px 10px;
  font-size: 14px;
  color: #000;
}
.auditErrorPop .remarkContent_box {
  padding: 0px 20px 15px 20px;
  float: left;
}

.message-content {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f2f9;
  padding: 24px 0 28px 0;
}
span.message-content-title {
  font-size: 14px;
  color: #333;

  font-weight: 400;
}
span.message-content-detail {
  font-size: 12px;
  color: #666;
  line-height: 20px;
}
span.message-content-undetail {
  font-size: 12px;
  color: #666;
  line-height: 20px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  width: 400px;
  float: left;
}
.allLook {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-60px);
  color: #4472d5;
}
.el-tabs__content {
  overflow: visible;
}
</style>
