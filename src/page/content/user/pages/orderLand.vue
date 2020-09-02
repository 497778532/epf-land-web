<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="预约看地" name="first">
        <epf-filter class="epf_height_act">
          <el-row :gutter="2">
            <el-col :span="3">
              <span class="epf_form_title">信息标题 :</span>
            </el-col>
            <el-col :span="5">
              <el-input size="small"
                v-model="ruleForm.title"
                placeholder="请输入内容">
              </el-input>
            </el-col>
            <el-col :span="3">
              <span v-if="dicFinsh" class="epf_form_title">地块状态 :</span>
            </el-col>
            <el-col v-if="dicFinsh" :span="5">
              <el-select
                size="small"
                class="filterCirculatemode"
                v-model="ruleForm.typeName"
                placeholder="请选择地块状态"
                @change="circulatemodeSelect(dictionary.purchasr_status, ruleForm.typeName, $event)"
              >
                <el-option
                  v-for="item in dictionary.purchasr_status"
                  :ref="item.zhCn"
                  :id="item.id"
                  :dictKey="item.dictKey"
                  :label="item.zhCn"
                  :value="item.zhCn"
                  :key="item.dictKey"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :offset="2" :span="4">
              <div class="epf_btn epf_btn_bg epf_not_margin" @click="searchData">查询</div>
              <div class="epf_btn epf_btn_def" @click="resetFilterInfo">重置</div>
            </el-col>
          </el-row>
        </epf-filter>
        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中..."
        >
          <template v-slot:imgId="scope">
            <epf-column slot="imgId">
              <div class="tc_info">
                <img class="epf_land_img" v-lazy="baseUrl+scope.row.imgId" />
                <div class="tc_info_content"
                  style="margin-top:22px;"
                  @click="openDetail(scope.row.tSellId)">
                  <div class="tc_info_title hoverStyle" style="padding-top:30px">
                    {{scope.row.title}}
                  </div>
                </div>
              </div>
            </epf-column>
          </template>
          <template v-slot:title="scope">
            <epf-column slot="title">
              <div class="epf_btn_flex">
                <span style="color:#9a9a9a;">
                  <div>{{scope.row.name}}</div>
                  <div>{{scope.row.phone}}</div>
                </span>
              </div>
            </epf-column>
          </template>
           <template v-slot:time="scope">
            <epf-column slot="time">
              <div class="epf_btn_flex">
                <span style="color:#9a9a9a;">
                  <div>{{scope.row.seeDate}}</div>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:myName="scope">
            <epf-column slot="myName">
              <div class="epf_btn_flex">
                <span style="color:#9a9a9a;">
                  <div style="margin-bottom:3px;">{{scope.row.myName}}</div>
                  <div>{{scope.row.myPhone}}</div>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:myPhone="scope">
            <epf-column slot="myPhone">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  <span class="success"></span>
                  <span v-if="scope.row.publicStatus=='draft2'">草稿</span>
                  <span v-if="scope.row.publicStatus=='published2'">已发布</span>
                  <span v-if="scope.row.publicStatus=='audit'">审核中</span>
                  <span v-if="scope.row.publicStatus=='audit_failure'">审核失败</span>
                  <span v-if="scope.row.publicStatus=='down_mytsell'">下架</span>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:name="scope">
            <epf-column slot="name">
              <div class="epf_btn_flex">
                <el-switch
                  :disabled="scope.row.isSee=='1'?true:false"
                  v-model="scope.row.isSee"
                  class="switchStyle"
                  active-color="#8cc3f6"
                  active-text="已看地"
                  active-value="1"
                  inactive-color="#e0dfdf"
                  inactive-text="未看地"
                  inactive-value="0"
                  @change="changeSwitch(scope.row.isSee,scope.row.id)"
                ></el-switch>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div v-if="tableContentData == [] || tableContentData == ''" class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page.sync="pageNo"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
import qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      closeTypeIpt: true,
      baseUrl: "",
      config: [
        {
          span: 8,
          fie: "imgId",
          title: "供给基本信息"
        },
        {
          span: 3,
          fie: "title",
          title: "联系人信息"
        },
         {
          span: 4,
          fie: "time",
          title: "预约看地时间"
        },
        {
          span: 3,
          fie: "myName",
          title: "预留个人信息"
        },
        {
          span: 3,
          fie: "myPhone",
          title: "地块状态"
        },
        {
          span: 3,
          fie: "name",
          title: "操作"
        }
      ],
      tableContentData: [],
      ruleForm: {
        title: "",
        //地块状态
        typeName: ""
      },

      flexibleOpen: false,
      dicRequest: ["flow_mode","purchasr_status"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        purchasr_status:""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      loading: true
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-admin/admin/dict/getDictsByCodeOrParentId?code=${item}`,
            { parentId: "0" },
            res => {
              resolve(res);
            }
          );
        } else {
          this.$axios.get(
            `/epf-admin/admin/dict/getDictEbyDictGroup/${item}`,
            {},
            res => {
              let arr = []
              res.dictionariesList.map((item,index)=>{
                if(item.dictKey == 'down_mytpurchase' || item.dictKey == 'published'){
                  arr.push(item)
                }
              })
              res.dictionariesList = arr
              resolve(res);
            }
          );
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });

      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }

      this.dicFinsh = true;
    });
    let params = {
      page: this.pageNo,
      rows: this.pageSize
    };
    this.init(params);
  },
  methods: {
    fatch() {
      let params = {
        page: this.pageNo,
        rows: this.pageSize,
        title: this.ruleForm.title,
        type: this.ruleForm.circulation
      };
      this.init(params);
    },
    init(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/treservations/getTReservationsList",
        params,
        res => {
          console.log(res)
          if (res.code == 0) {
            this.loading = false;
            this.tableContentData = res.pager.results;
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
          }
        }
      );
    },
    //跳转详情
    openDetail(id) {
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    searchData() {
      this.pageNo = 1;
      let params = {
        page: this.pageNo,
        rows: this.pageSize,
        title: this.ruleForm.title,
        type: this.ruleForm.circulation
      };
      this.init(params);
    },
    // 重置
    resetFilterInfo() {
      for (let item in this.ruleForm) {
        this.ruleForm[item] = "";
        this.dictionary.cantonCity = "";
        this.dictionary.cantonArea = "";
      }
      this.pageNo = 1;
      let params = {
        page: this.pageNo,
        rows: this.pageSize,
        title: "",
        type: ""
      };
      this.init(params);
    },
    circulatemodeSelect(dic, circulatemodeName, event) {
      this.ruleForm.circulation = this.$refs[
        circulatemodeName
      ][0].$attrs.dictKey;
    },
    //   分页
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val;
      this.fatch();
    },
    handleCurrentChange(val) {
      //获取当前页
      this.pageNo = val;
      this.fatch();
    },
    changeSwitch(isSee,id) {
      let params = {
        id,
        isSee
      };
      this.$axios.post(
        "/epf-landweb/admin/treservations/editTReservations",
        qs.stringify(params),
        res => {
          if (res.code == 0) {
            this.$message.success("看地成功");
            // this.
            // this.fatch();
          }
        }
      );
    }
  }
};
</script>

<style scoped></style>
