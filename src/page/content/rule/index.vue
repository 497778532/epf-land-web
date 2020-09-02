<template>
  <!-- 政策法规 -->
  <div class="rule">
    <epf-lePage :location="location"></epf-lePage>
    <div class="win1200" :style="{minHeight:boxHeight+'px'}">
      <el-container>
        <el-aside width="200px" class="leftBox">
          <!-- 左侧导航 -->
          <el-menu default-active="0010101"
            active-text-color="var(--lightColor)"
            background-color="#ebeef5" mode="vertical">
            <div v-for="(item,index) in menuData" :key="index">
              <div v-for="(item2,index2) in item.childInfoMenu" :key="index2">
                <el-submenu :index="item2.id" v-if="item2.childInfoMenu">
                  <template slot="title"  >
                    <span @click="postalmenuInfoClick(item2.childInfoMenu,item2)">{{item2.name}}</span>
                  </template>
                  <div
                    v-for="(childMenuitem,childInfoMenuIndex) in item2.childInfoMenu"
                    :key="childInfoMenuIndex">
                    <el-menu-item
                      @click="menuInfoClick(childMenuitem,item2)"
                      :index="childMenuitem.id"
                    >{{childMenuitem.name}}
                    </el-menu-item>
                  </div>
                </el-submenu>
              </div>
            </div>
          </el-menu>
        </el-aside>
        <el-main style="padding-top:0px;">
          <template>
            <div class="publicRegulate_warp">
              <div class="publicRegulate_title">
                <span>{{infoMenuName}}</span>
              </div>
              <div class="publicRegulate_cont">
                <ul>
                  <li
                    v-for="(item,index) in publicRegulateData"
                    :key="index"
                    @click="infoDetail(item,infoMenuName)">
                    <span class="dian">・</span>
                    {{item.title}}
                    <span class="time">{{item.createTime}}</span>
                    <div class="tiao" v-if="index%4===0&&index!==0"></div>
                  </li>
                </ul>
                <div class="block">
                    <el-pagination
                      background
                      layout="prev, pager, next,sizes,jumper"
                      :page-sizes="[5,10, 15, 20]"
                      :total="totalRecord"
                      :page-size="pageSize"
                      :current-page="pageNo"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    ></el-pagination>
                    <div class="pagS"></div>
                  </div>
              </div>
            </div>
          </template>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: [
        { path: "/", name: "首页" },
        { path: "/PoliciesRegulate", name: "政策法规" },
        { path: "/PoliciesRegulate", name: "国家法规" }
      ],
      infoMenuCode: "0010101",
      infoMenuName: "公开规定",
      infoMenuNamesub: "政策法规",
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      menuData: [],
      publicRegulateData: [],
      boxHeight:null
    };
  },
  created() {
    this.boxHeight = window.innerHeight - 469
    this.$axios.get(
      // "/epf-cms/infomenu/getInfoMenuList",
      this.$API.EPF_CMS.LIST,
      { code: "Policiesandregulations" },
      res => {
        if (res.code != "0") {
          this.$message.error(res.msg);
          return;
        }
        this.menuData = res.infoMenus;
      }
    );
    this.searchInfo["infoMenuCode"] = "0010101";
    this.getInfoList({ infoMenuCode: "0010101", page: 1, rows: 10 });
  },
  methods: {
    infoDetail(data, infoMenuName) {
      //弹新页面
      const { href } = this.$router.resolve({
        // path: "/policieRegulatedetails",
        path:"/ruleDetails",
        query: { id: data.id, infoMenuName: infoMenuName ,infoMenuNamesub:this.infoMenuNamesub}
      });
      window.open(href, "_blank");
    },
    postalmenuInfoClick(data,ket) {
      this.infoMenuName = ket.name;
      this.infoMenuNamesub = ket.name;
      this.$set(this.location[1],'name', ket.name);
      this.$set(this.location[2],'name', "");
      this.searchInfo["infoMenuCode"] = ket.id;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.getInfoList(this.searchInfo);
    },
    menuInfoClick(data,ket) {
      this.infoMenuName = data.name;
      this.infoMenuNamesub = ket.name;
      this.$set(this.location[1],'name', ket.name);
      this.$set(this.location[2],'name', data.name);
      this.searchInfo["infoMenuCode"] = data.id;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.getInfoList(this.searchInfo);
    },
    getInfoList(params) {
      this.$axios.get(
        // "/epf-cms/info/getInfoJson",
        this.$API.EPF_CMS.JSON,
        params, res => {
        if (res.code != "0") {
          this.$message.error(res.msg);
          return;
        }
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        //覆盖默认值
        this.publicRegulateData = res.pager.results;
      });
    },
    handleSizeChange(val) {
      this.pageNo = 1;
      //每页条数改变时触发
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getInfoList(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getInfoList(this.searchInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.publicRegulate_warp {
  @include size(100%, auto);
  box-sizing: border-box;
  background: #fff;
  padding: 0 20px 20px 20px;
  .publicRegulate_title {
    @include size(100%, 56px);
    border-bottom: 1px solid #f3f3f3;
    color: var(--lightColor);
    font-size: 16px;
    line-height: 56px;
    span {
      border-bottom: 1px solid var(--lightColor);
      height: 56px;
      display: inline-block;
      padding: 0 10px;
      font-weight: bold;
    }
  }
  .publicRegulate_cont {
    @include size(100%, auto);
    li {
      @include size(100%, auto);
      line-height: 50px;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
      .time {
        float: right;
      }
      .dian {
        color: var(--lightColor);
      }
      .tiao {
        @include size(100%, 1px);
        background: #f3f3f3;
        margin: 15px 0;
      }
    }
    li:hover {
      color: var(--lightColor);
    }
    .block {
      width: 100%;
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
<style>
.el-submenu.is-active .el-submenu__title{
 border-bottom:1px solid #e2e2e2;
}
</style>
