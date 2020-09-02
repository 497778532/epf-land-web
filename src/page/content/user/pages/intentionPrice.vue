<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="意向报价" name="first">

        <epf-filter class="epf_height_act">
          <el-row :gutter="2">
            <el-col :span="3">
              <span class="epf_form_title">信息标题 :</span>
            </el-col>
            <el-col :span="5">
              <el-input
                size="small"
                v-model="ruleForm.title"
                placeholder="请输入信息标题">
              </el-input>
            </el-col>
            <el-col :span="3">
              <span v-if="dicFinsh" class="epf_form_title">地块状态 :</span>
            </el-col>
            <el-col v-if="dicFinsh" :span="5">
              <el-select
                size="small"
                class="filterCirculatemode"
                v-model="ruleForm.circulatemodeName"
                placeholder="请选择地块状态"
                @change="circulatemodeSelect(dictionary.flow_mode,ruleForm.circulatemodeName,$event)"
              >
                <el-option
                  v-for="item in dictionary.flow_mode"
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
              <div class="epf_btn epf_btn_bg epf_not_margin"
                @click="searchData">
                查询
              </div>
              <div class="epf_btn epf_btn_def"
                @click="resetFilterInfo">
                重置
              </div>
            </el-col>
          </el-row>
        </epf-filter>

        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中...">
          <template v-slot:title="scope">
            <epf-column slot="title">
              <epf-modeMsg
                @clickTitle="toDetial"
                :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div class="epf_fie_box">
                <span class="epf_money">
                  {{scope.row.price?'￥ '+ scope.row.price + '万元':'面议'}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:num="scope">
            <epf-column slot="num">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{scope.row.paiming}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:imgId="scope">
            <epf-column slot="imgId">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{scope.row.num}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:tsellId="scope">
            <epf-column slot="tsellId">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  <span class="success"></span>
                  <span>{{scope.row.publicStatusName}}</span>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:paiming="scope">
            <epf-column slot="paiming">
              <div class="epf_btn_flex">
                <span>
                  <el-button
                    size="small"
                    @click="toDetial(scope.row)">
                    查看详情
                  </el-button>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div v-if="tableContentData == [] || tableContentData == ''" class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <div class="epf_row_c">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      activeName: "first",
      closeTypeIpt: true,
      baseUrl: "",
      defult_pic: 'this.src="' + require("@/assets/image/icon-11.jpg") + '"', //图片加载失败时的默认图片
      config: [
        {
          span: 9,
          fie: "title",
          title: "供给基本信息"
        },
        {
          span: 4,
          fie: "price",
          title: "报价/万元"
        },
        {
          span: 2,
          fie: "num",
          title: "排名"
        },
        {
          span: 2,
          fie: "imgId",
          title: "报价次数"
        },
        {
          span: 3,
          fie: "tsellId",
          title: "地块状态"
        },
        {
          span: 4,
          fie: "paiming",
          title: "操作"
        }
      ],
      tableContentData: {},
      ruleForm: {
        title: "",
        //流转方式：
        circulation: ""
      },

      flexibleOpen: false,
      dicRequest: ["flow_mode"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 0,
      searchInfo: {},
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
        if (item == "purchasr_status") {
          //正确调用状态字典接口后删除此判断
          break;
        }
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }

      this.dicFinsh = true;
    });

    let params = { page: this.pageNo, rows: this.pageSize };
    this.init(params);
  },
  methods: {
    init(params) {
      this.loading = true;
      function getChangeDate(date) {
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          "  " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()
        );
      }
      this.$axios.get(
        // "/epf-supply/admin/tintentionoffer/getSellOfferList",
        "/epf-landweb/admin/tintentionoffer/getSellOfferList",
        
        params,
        res => {
          let result = res.pager["results"].map((item, index) => {
            item.insertTime = getChangeDate(new Date(item.insertTime));
            return item;
          });
          this.loading = false;
          this.tableContentData = result;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
      );
    },
    searchData() {
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["title"] = this.ruleForm.title;
      this.searchInfo["type"] = this.ruleForm.circulation;
      this.init(this.searchInfo);
    },
    toDetial(data) {
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: data.tsellId }
      });
      window.open(routeUrl.href, "_blank");
    },
    resetFilterInfo() {
      this.pageNo = 1;
      for (let item in this.ruleForm) {
        this.ruleForm[item] = "";
        this.dictionary.cantonCity = "";
        this.dictionary.cantonArea = "";
      }
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["title"] = "";
      this.searchInfo["type"] = "";
      this.init(this.searchInfo);
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
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.init(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 420);
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.init(this.searchInfo);
    }
  }
};
</script>

<style scoped></style>
