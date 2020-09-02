<template>
  <div class="ApplyInfo_warp">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div
        class="ApplyInfo_Pro"
        v-loading="loading"
        element-loading-text="订单提交中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <epf-switchTitle
          titles_h="申请竞买"
          padding="0px"
          background="#fff"
          height="80px"
          ref="one"
          :shutOff="false"
          class="scroll-item"
        ></epf-switchTitle>
        <div class="ApplyInfo_Pro_cont">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
           >
            <el-form-item label="竞买方式：" required>
              <el-radio-group
                v-model="ruleForm.applyType"
                v-if="type != 1 || type != 8"
              >
                <el-radio
                  v-for="(item, index) in applyTypeoption"
                  :label="item"
                  :value="item"
                  :key="index"
                  >{{ item }}</el-radio
                >
              </el-radio-group>
              <span style="color: #4b6fd8" v-else>{{
                ruleForm.applyType
              }}</span>
            </el-form-item>
            <arrowDialogBox
              title="联合竞买"
              v-if="ruleForm.applyType !== '独立竞买'"
             >
              <div class="applyType_warp">
                <div
                  class="button"
                  style="float:right;"
                  @click="addRow()"
                  v-if="type != 1 || type != 8"
                >
                  新增
                </div>
                <el-table ref="multipleTable" :data="BondInfo" border>
                  <el-table-column
                    type="index"
                    width="55"
                    prop="id"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="bidderContact" label="*联合竞买人">
                    <template slot-scope="scope">
                      <span v-show="typeof scope.row.property !== 'number'">{{
                        scope.row.bidderContact
                      }}</span>
                      <el-input
                        size="mini"
                        v-model="scope.row.bidderContact"
                        v-show="typeof scope.row.property == 'number'"
                        >{{ scope.row.bidderContact }}</el-input
                      >
                    </template>
                  </el-table-column>
                  <el-table-column prop="bidderIdno" label="*联合竞买人证件号">
                    <template slot-scope="scope">
                      <span v-show="typeof scope.row.property !== 'number'">{{
                        scope.row.bidderIdno
                      }}</span>
                      <el-input
                        size="mini"
                        v-model="scope.row.bidderIdno"
                        v-show="typeof scope.row.property == 'number'"
                        >{{ scope.row.bidderIdno }}</el-input
                      >
                    </template>
                  </el-table-column>
                  <el-table-column label="*交易份额%" prop="tradeshare">
                    <template slot-scope="scope">
                      <span v-show="typeof scope.row.property !== 'number'">{{
                        scope.row.percent
                      }}</span>
                      <el-input
                        type="number"
                        size="mini"
                        v-model="scope.row.percent"
                        v-show="typeof scope.row.property == 'number'"
                        >{{ scope.row.percent }}</el-input
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100"
                    v-if="type != 1 || type != 8"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="danger"
                        style="color:#4970d7;"
                        @click.native.prevent="
                          deleteRow(scope.$index, BondInfo)
                        "
                        v-if="type != 1"
                        >删除</el-button
                      >
                      <el-button
                        type="text"
                        size="danger"
                        @click="handleSave(scope.$index, scope.row)"
                        style="color:#4970d7;"
                        v-if="type != 1"
                        >确认</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <p
                  style="font-size:14px;color:#999999;margin-left:0;margin-top:20px;"
                >
                  <img
                    src="../../../../assets/image/careful.png"
                    alt=""
                    style=""
                  />
                  温馨提示：联合竞买人为个人时，请填写身份证号，联合竞买人为公司时，请填写公司统一社会信用代码
                </p>
              </div>
            </arrowDialogBox>
            <el-form-item label="成立全资子公司：" required>
              <el-radio-group
                v-model="ruleForm.applycompany"
                v-if="type != 1 || type != 8"
              >
                <el-radio
                  v-for="(item, index) in applycompanyoption"
                  :label="item"
                  :value="item"
                  :key="index"
                ></el-radio>
              </el-radio-group>
              <span style="color: #4b6fd8" v-else>{{
                ruleForm.applycompany
              }}</span>
            </el-form-item>
            <arrowDialogBox
              title="成立全资子公司"
              v-if="ruleForm.applycompany === '成立全资子公司'"
             >
              <div class="applyType_warp">
                <el-form
                  :model="applycompanyDataFirst"
                  :rules="applycompanyrules"
                  ref="applycompanyDataFirst"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <div class="applyType_ul">
                    <ul>
                      <li style="width:100%;">
                        <div class="contractype">
                          <span>企业类型：</span>
                          <el-radio-group
                            v-model="applycompanyDataFirst.companytype"
                          >
                            <el-radio label="内资公司">内资公司</el-radio>
                            <el-radio label="外资公司">外资公司</el-radio>
                          </el-radio-group>
                        </div>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>公司名称：</span>
                          <el-input
                            v-model="applycompanyDataFirst.name"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                      <li>
                        <el-form-item label="联系人：" prop="contact">
                          <el-input
                            v-model="applycompanyDataFirst.contact"
                            style="width:400px;"
                          ></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>传真：</span>
                          <el-input
                            v-model="applycompanyDataFirst.fax"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                      <li>
                        <el-form-item label="联系电话：" prop="contactTel">
                          <el-input
                            v-model="applycompanyDataFirst.contactTel"
                            style="width:400px;"
                          ></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>公司电话：</span>
                          <el-input
                            v-model="applycompanyDataFirst.tel"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>联系人职务：</span>
                          <el-input
                            v-model="applycompanyDataFirst.contactOffice"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>委托人：</span>
                          <el-input
                            v-model="applycompanyDataFirst.trustName"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>法人代表：</span>
                          <el-input
                            v-model="applycompanyDataFirst.corporation"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>注册资金：</span>
                          <el-input
                            v-model="applycompanyDataFirst.regCapital"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                      <li>
                        <div class="contractype">
                          <span>备注：</span>
                          <el-input
                            v-model="applycompanyDataFirst.reamrk"
                            style="width:400px;"
                          ></el-input>
                        </div>
                      </li>
                    </ul>
                  </div>
                </el-form>
                <div
                  class="button"
                  @click="addRowApp()"
                  v-if="type != 1 || type != 8"
                >
                  新增
                </div>
                <el-table ref="multipleTable" :data="applycompanyData" border>
                  <el-table-column
                    type="index"
                    width="55"
                    prop="id"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="name" label="*股东名称">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="name">
                          <span
                            v-show="typeof scope.row.property !== 'number'"
                            >{{ scope.row.name }}</span
                          >
                          <el-input
                            size="mini"
                            v-model="scope.row.name"
                            v-show="typeof scope.row.property == 'number'"
                            >{{ scope.row.name }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="*证件号码" prop="idno">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="idno">
                          <span
                            v-show="typeof scope.row.property !== 'number'"
                            >{{ scope.row.idno }}</span
                          >
                          <el-input
                            size="mini"
                            v-model="scope.row.idno"
                            v-show="typeof scope.row.property == 'number'"
                            >{{ scope.row.idno }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="*电话" prop="tel">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="tel">
                          <span
                            v-show="typeof scope.row.property !== 'number'"
                            >{{ scope.row.tel }}</span
                          >
                          <el-input
                            size="mini"
                            v-model="scope.row.tel"
                            v-show="typeof scope.row.property == 'number'"
                            >{{ scope.row.tel }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="地址" prop="address">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item>
                          <span
                            v-show="typeof scope.row.property !== 'number'"
                            >{{ scope.row.address }}</span
                          >
                          <el-input
                            size="mini"
                            v-model="scope.row.address"
                            v-show="typeof scope.row.property == 'number'"
                            >{{ scope.row.address }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="电子邮箱" prop="email">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item>
                          <span
                            v-show="typeof scope.row.property !== 'number'"
                            >{{ scope.row.email }}</span
                          >
                          <el-input
                            size="mini"
                            v-model="scope.row.email"
                            v-show="typeof scope.row.property == 'number'"
                            >{{ scope.row.email }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" prop="reamrk">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item>
                          <span
                            v-show="typeof scope.row.property !== 'number'"
                            >{{ scope.row.reamrk }}</span
                          >
                          <el-input
                            size="mini"
                            v-model="scope.row.reamrk"
                            v-show="typeof scope.row.property == 'number'"
                            >{{ scope.row.reamrk }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="*投资比例%" prop="percent">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="percent">
                          <span
                            v-show="typeof scope.row.property !== 'number'"
                            >{{ scope.row.percent }}</span
                          >
                          <el-input
                            size="mini"
                            v-model="scope.row.percent"
                            v-show="typeof scope.row.property == 'number'"
                            >{{ scope.row.percent }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item>
                          <el-button
                            type="text"
                            size="danger"
                            style="color:#4970d7;"
                            @click.native.prevent="
                              deleteRow(scope.$index, applycompanyData)
                            "
                            v-if="type != 1 || type != 8"
                            >删除</el-button
                          >
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </arrowDialogBox>
            <el-form-item label="选择银行：" required>
              <el-radio-group v-model="ruleForm.applybank">
                <el-radio
                  v-for="(item, index) in applybankoption"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                  @change.native="getBank(item)"
                ></el-radio>
              </el-radio-group>
              <p style="font-size:14px;color:#999999;margin-left:100px;">
                <img
                  src="../../../../assets/image/careful.png"
                  alt=""
                  style="margin-top:10px;"
                />
                币种：{{ this.$store.state.currencyName }}
              </p>
              <p>
                <span>提示：</span
                >根据中国人民银行的相关文件规定及支付结算流程，银行间大额支付系统运行时间为法定工作日。
                同时，银行间大额支付结算需经过人民银行清算，故各竞买人汇报时间与保证金账户资金到账存在时差，建议各竞买人在工作日并适当提前缴存竞买保证金。
              </p>
            </el-form-item>
            <!--继续竞买-->
            <div class="opertion" v-if="type == '0'">
              <div class="submit_input save_input" @click="back()">上一步</div>
              <div class="submit_input" ref="notclick" @click="saveApply('submit')">提交</div>
              <div class="submit_input save_input" @click="saveApply('save')">保存</div>
            </div>
            <!--重新申请-->
            <div class="opertion" v-if="type == '2'">
              <div class="submit_input save_input" @click="back()">上一步</div>
              <div class="submit_input" ref="notclick" @click="reSave('submit')">提交</div>
              <div class="submit_input save_input" @click="reSave('save')">保存</div>
            </div>
            <!-- 初次申请触发 -->
            <div class="opertion" v-else-if="type == '3'">
              <div class="submit_input save_input" @click="back()">上一步</div>
              <div class="submit_input" ref="notclick" @click="reSave('submit')">提交</div>
              <div class="submit_input save_input" @click="reSave('save')">保存</div>
            </div>
            <!--拒绝竞买/联合竞买 操作-->
            <div class="opertion" v-else-if="type == '8'">
              <div class="submit_input save_input" @click="back()">上一步</div>
              <div class="submit_input" @click="mybid">取消</div>
              <div class="submit_input" @click="relation(2)">拒绝竞买</div>
              <div class="submit_input save_input" @click="relation(1)">联合竞买</div>
            </div>
            <!--查看详情操作-->
            <div class="opertion" v-else-if="type == '1'">
              <div class="submit_input save_input" @click="back()">上一步</div>
              <div class="submit_input" @click="mybid">取消</div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import arrowDialogBox from "@/components/arrowDialogBox";
import qs from "qs";
export default {
  components: { arrowDialogBox },
  data() {
    return {
      BondInfo1: [
        {
          id: 0,
          currency: "",
          amount: ""
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入联系人姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        idno: [
          { required: true, message: "证件号不能为空" },
          {
            pattern: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,
            message: "您输入的证件号有误"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            message: "您输入的格式有误，例：18569693322或0351-6336221"
          }
        ],
        percent: { required: true, message: "投资比例%不能为空" }
      },
      disabled: true,
      disabled1: true,
      disabled2: true,
      BondInfo: [],
      applycompanyData: [
        // {name:'深圳市壹平台',idno:'140114196805222526',tel:'15136623620',address:'山西省太原市小店区',emali:'123456@163.com',remark:'无',percent:50}
        // {name:'深圳市壹平台',idno:'140114196805222526',tel:'15136623620',address:'山西省太原市小店区',emali:'123456@163.com',remark:'无',percent:50},
      ],
      // applycompanyDataFirstTitle:[{title:}]
      applycompanyDataFirst: {
        companytype: "内资公司",
        companyname: "",
        contact: "",
        fax: "",
        tell: "",
        companyTell: "",
        contactjob: "",
        client: "",
        legalrep: "",
        registeredfunds: "",
        remarks: ""
      },
      applycompanyrules: {
        contact: [
          { required: true, message: "请输入联系人姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        contactTel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            message: "您输入的格式有误，例：18569693322或0351-6336221"
          }
        ]
      },
      location: [
        { path: "/", name: "首页" },
        { path: "/TradingHall", name: "交易大厅" },
        { path: null, name: "申请竞买" }
      ],
      applyTypeoption: ["独立竞买", "联合竞买"],
      applycompanyoption: ["成立全资子公司", "不成立全资子公司"],
      applyPriceoption: ["是", "否"],
      applybankoption: [],
      active: 0,
      state: 4,
      isShowProvince: true,
      ruleForm: {
        applyType: "独立竞买",
        applycompany: "不成立全资子公司",
        applyPrice: "否",
        applybank: "中国工商银行"
      },
      license: { status: "", buyType: "1", targetId: this.id },
      tableBondData: {},
      type: "",
      tradingCenter: "", //交易中心机构id
      id: "",
      loading: false,
      isAfterCheck:''
    };
  },
  created() {
    this.type = this.$route.query.type;
    //重新提交
    if (this.type == 2) {
      this.init2();
      this.getTradingCenterOrgId(localStorage.getItem("targetId"));
    } else if (this.type != "3") {
      this.id = localStorage.getItem("linceId");
      this.getTradingCenterOrgId(localStorage.getItem("targetId"));
      this.init(this.id);
    } else if (this.type == 3) {
      //初次申请
      this.id = this.$route.query.id;
      this.getTradingCenterOrgId(this.id);
      this.getBankList();
    }
  },
  methods: {
    back() {
      window.history.back(-1);
    },
    //确定-拒绝联合竞买
    relation(status) {
      //获取 targetId
      let id = localStorage.getItem("targetId");
      //获取主竞买ID
      let linceId = localStorage.getItem("linceId");

      let jsonVars = {};

      if (status == 1) {
        //点击通过，收集工作流启动需要参数
        //状态 status 1-确认 2-拒绝
        this.$axios.post(
          "/epf-landweb/admin/changeStatus",
          qs.stringify({
            targetId: id,
            status: status,
            linceId: linceId
          }),
          res => {
            this.$message.success("已经通过该邀请！！");
            this.mybid();
          }
        );
      } else {
        //点击了拒绝
        //状态 status 1-确认 2-拒绝
        this.$axios.post(
          "/epf-landweb/admin/changeStatus",
          qs.stringify({
            targetId: id,
            status: status,
            linceId: linceId
          }),
          res => {
            this.$message.success("已经拒绝该邀请！！");
            this.mybid();
          }
        );
      }
    },
    init(id) {
      this.getBankList();
      this.$axios.get(
        "/epf-landweb/admin/getTransLicense?id=" + id,
        {},
        res => {
          this.license = res.applyBidderDetails.applyInfo; // 申请基本信息
          this.isAfterCheck = res.applyBidderDetails.transTargetEntity.isAfterCheck; // 申请基本信息
          this.ruleForm.applyType =
            res.applyBidderDetails.applyInfo.buyType == "1"
              ? "独立竞买"
              : "联合竞买";
          this.ruleForm.applycompany =
            res.applyBidderDetails.applyInfo.isNewCompany == "0"
              ? "成立全资子公司"
              : "不成立全资子公司";
          this.BondInfo = res.applyBidderDetails.biddersInfo ? res.applyBidderDetails.biddersInfo : [] ; // 联合竞买信息
          this.applycompanyDataFirst = res.applyBidderDetails.childDealer ? res.applyBidderDetails.childDealer : {}; // 子公司信息
          this.applycompanyData = res.applyBidderDetails.childDealeList ? res.applyBidderDetails.childDealeList : []; // 子公司股东信息列表
        }
      );
    },
    init2() {
      this.getBankList();
      let res = this.$store.state.rest;
      this.license = res.applyBidderDetails.applyInfo; // 申请基本信息
      this.isAfterCheck = res.applyBidderDetails.transTargetEntity.isAfterCheck; // 申请基本信息
      this.ruleForm.applyType =
        res.applyBidderDetails.applyInfo.buyType == "1"
          ? "独立竞买"
          : "联合竞买";
      this.ruleForm.applycompany =
        res.applyBidderDetails.applyInfo.isNewCompany == "0"
          ? "成立全资子公司"
          : "不成立全资子公司";
      this.BondInfo = res.applyBidderDetails.biddersInfo ? res.applyBidderDetails.biddersInfo : [] ; // 联合竞买信息
      this.applycompanyDataFirst = res.applyBidderDetails.childDealer ? res.applyBidderDetails.childDealer : {}; // 子公司信息
      this.applycompanyData = res.applyBidderDetails.childDealeList ? res.applyBidderDetails.childDealeList : []; // 子公司股东信息列表
    },
    /**
     * 获取tradingCenterId
     * @param id
     */
    getTradingCenterOrgId: function(id) {
      let that = this;
      this.$axios.get(
        "/epf-landweb/landweb/translicense/getTradingCenterOrgId?id=" + id,
        {},
        res => {
          this.tradingCenter = res.tradingCenter; // 交易中心机构id
        }
      );
    },
    // 根据币种及标的委托机构获取银行列表
    getBankList() {
      let targetId = this.$store.state.targetId; // 标的id
      let currency = this.$store.state.currency; // 币种
      console.log("targetId", targetId);
      console.log("currency", currency);
      this.$axios.get(
        "/epf-landweb/landweb/transbank/getBankForNotice",
        { targetId: targetId, currency: currency },
        res => {
          if (res.code === 0) {
            this.applybankoption = res.list;
            if (res.list[0].id && res.list[0].name)
              this.ruleForm.applybank = res.list[0].name;
            this.license.choiseBank = res.list[0].id;
          }
        }
      );
    },
    // 选中银行
    getBank(row) {
      this.ruleForm.applybank = row.name;
      this.license.choiseBank = row.id;
    },
    addRowApp() {
      let newId =
        this.applycompanyData.length == 0
          ? 0
          : this.applycompanyData[this.applycompanyData.length - 1].id + 1;
      let newValue = {
        id: newId,
        name: "",
        idno: "",
        tel: "",
        address: "",
        email: "",
        remark: "",
        percent: 1,
        property: 1
      };
      if (!this.applycompanyData) {
        this.applycompanyData = [];
      }
      this.applycompanyData.push(newValue);
    },
    handleSave(index, rows) {
      if (!this.BondInfo[index].bidderContact) {
        this.$message.error("联合竞买人姓名为必填项");
        return;
      }
      if (!this.BondInfo[index].bidderIdno) {
        this.$message.error("证件号为必填项");
        return;
      }
      if (!this.BondInfo[index].percent) {
        this.$message.error("请输入正确的交易份额");
        return;
      }
      let param = {
        idNumber: this.BondInfo[index].bidderIdno,
        name: this.BondInfo[index].bidderContact
      };
      this.$axios.get("/epf-cms/admin/user/getUserByIdNo", param, res => {
        if (res.user && res.code === 0) {
          this.BondInfo[index].property = "1";
          this.BondInfo[index].bidderId = res.user.id;
          this.BondInfo[index].bidderAddress = res.user.address;
          this.BondInfo[index].bidderTel = res.user.telPhone;
          this.BondInfo[index].bidderContact = res.user.realname;
        } else {
          this.$message.error("该用户未在平台注册或未完成实名认证");
        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addRow() {
      let newId =
        this.BondInfo.length == 0
          ? 0
          : this.BondInfo[this.BondInfo.length - 1].id + 1;
      let newValue = {
        id: newId,
        bidderId: "",
        bidderAddress: "",
        bidderTel: "",
        bidderContact: "",
        bidderIdno: "",
        percent: "",
        property: 1
      };
      if (!this.BondInfo) {
        this.BondInfo = [];
      }
      this.BondInfo.push(newValue);
    },
    //重新提交或新增竞买申请
    reSave(type) {
      if (
        (this.license && this.license.buyType == 0) ||
        this.ruleForm.applyType == "联合竞买"
       ) {
        //联合竞买
        let list = this.BondInfo;
        let percent = 0;
        if (list.length == 0) {
          this.$message.error("联合竞买人不能为空");
          return;
        }
        for (let i = 0; i < list.length; i++) {
          let bidderId = list[i].bidderId;
          if (!bidderId) {
            this.$message.error("联合竞买人信息不正确，请点击确认进行验证");
            return;
          }
        }

        for (let i = 0; i < list.length; i++) {
          percent = Number(list[i].percent) + Number(percent);
        }
        if (Number(percent) > 100) {
          this.$message.error("联合竞买人所占比例之和不能大于100%");
          return;
        } else if (Number(percent) < 100) {
          this.license.percent = 100 - Number(percent); // 主竞买人所占比例
        }
      } else {
        //独立竞买
        this.license.percent = 100; // 主竞买人所占比例
      }
      if (
        this.applycompanyDataFirst.applycompany == "成立全资子公司" ||
        this.ruleForm.applycompany == "成立全资子公司"
       ) {
        let list1 = this.applycompanyData;
        let percent1 = 0;

        // 联系人： applycompanyDataFirst.contact
        if (!this.applycompanyDataFirst.contact) {
          this.$message.error("联系人不能为空");
          return;
        }
        // 联系电话：contactTel
        if (!this.applycompanyDataFirst.contactTel) {
          this.$message.error("联系电话不能为空");
          return;
        }
        if (list1.length == 0) {
          this.$message.error("股东信息不能为空");
          return;
        }

        for (let i = 0; i < list1.length; i++) {
          //股东名称
          let name = list1[i].name;
          if (!name) {
            this.$message.error("股东名称为必填选项");
            return;
          }
          //证件号
          let idno = list1[i].idno;
          if (!idno) {
            this.$message.error("证件号为必填选项");
            return;
          }
          //电话
          let tel = list1[i].tel;
          if (!tel) {
            this.$message.error("股东电话为必填选项");
            return;
          }
          //投资比例
          let percent = list1[i].percent;
          if (!percent) {
            this.$message.error("投资比例为必填选项");
            return;
          }
        }

        for (let i = 0; i < list1.length; i++) {
          percent1 = Number(list1[i].percent) + Number(percent1);
        }
        if (Number(percent1) > 100) {
          this.$message.error("股东所占比例之和不能大于100%");
          return;
        } else if (Number(percent1) < 100) {
          this.$message.error("股东所占比例之和不能小于100%");
          return;
        }
      }
      console.log("bankId", this.license.choiseBank);
      if (typeof this.license.choiseBank == "undefined") {
        this.$message.error("请选择银行！");
        return;
      }

      console.log("获取到的竞买方式：" + this.ruleForm.applyType);
      this.license.status = type;

      //把类型设置进去
      this.license.type = this.type;
      //原本的linceId
      this.license.linceId = localStorage.getItem("linceId");
      this.license.targetId = this.$store.state.targetId;

      //--------------------------------2019-6-11 16:27:33新增开始【贺久彦】{根据状态启动前置审核/后置审核}--------------------------------//
      this.loading = true;
      let that = this;
      let jsonVars = {};

      //执行自己的方法，后台判断启动与否
      that.tableBondData.currency = that.$store.state.currency;
      console.log("币种", that.$store.state.currency);
      that.license.isNewCompany =
        that.ruleForm.applycompany == "成立全资子公司" ? "0" : "1";
      that.license.buyType = that.ruleForm.applyType == "独立竞买" ? "1" : "0";
      let params = {
        transLicense: that.license,
        transLicenseUnion: that.BondInfo,
        transProjectDealer: that.applycompanyDataFirst,
        transProjectDeale: that.applycompanyData,
        transAccountBillApply: that.tableBondData
      };
      params.jsonVars = jsonVars;
      params.type = type;
      that.$axios.post(
        "/epf-landweb/admin/addTransLicenseAll",
        { transLicenseAll: params },
        res => {
          if (res.code != "0") {
            this.loading = false;
            that.$message.error(res.msg); //失败

            return;
          }
          if (type == "submit") {
            if(that.isAfterCheck=='0'){
              // that.$message({
              //   showClose: true,
              //   message: '请携带资料到交易中心进行资格审核'
              // });
            }
            that.$router.push({
              path: "/applyBiddingSavesuccess",
              query: { id: this.id }
            });
          } else {
            that.$router.push({
              path: "/applyBiddingSavedraft",
              query: { id: this.id }
            });
          }
          this.loading = false;
        }
      );
      // });
      //--------------------------------2019-6-11 16:27:33新增结束【贺久彦】{根据状态启动前置审核/后置审核}--------------------------------//
    },
    //修改或继续提交
    saveApply(type) {
      console.log(this.$refs.notclick);

      if (
        (this.license && this.license.buyType == 0) ||
        this.ruleForm.applyType == "联合竞买"
      ) {
        //联合竞买
        let list = this.BondInfo;
        let percent = 0;
        if (list.length == 0) {
          this.$message.error("联合竞买人不能为空");
          return;
        }
        for (let i = 0; i < list.length; i++) {
          let bidderId = list[i].bidderId;
          if (!bidderId) {
            this.$message.error("联合竞买人信息不正确，请点击确认进行验证");
            return;
          }
        }

        for (let i = 0; i < list.length; i++) {
          percent = Number(list[i].percent) + Number(percent);
        }
        if (Number(percent) > 100) {
          this.$message.error("联合竞买人所占比例之和不能大于100%");
          return;
        } else if (Number(percent) < 100) {
          this.license.percent = 100 - Number(percent); // 主竞买人所占比例
        }
      } else {
        //独立竞买
        this.license.percent = 100; // 主竞买人所占比例
      }
      if (
        this.applycompanyDataFirst.applycompany == "成立全资子公司" ||
        this.ruleForm.applycompany == "成立全资子公司"
      ) {
        let list1 = this.applycompanyData;
        let percent1 = 0;
        // 联系人： applycompanyDataFirst.contact
        if (!this.applycompanyDataFirst.contact) {
          this.$message.error("联系人不能为空");
          return;
        }
        // 联系电话：contactTel
        if (!this.applycompanyDataFirst.contactTel) {
          this.$message.error("联系电话不能为空");
          return;
        }
        if (list1.length == 0) {
          this.$message.error("股东信息不能为空");
          return;
        }
        for (let i = 0; i < list1.length; i++) {
          //股东名称
          let name = list1[i].name;
          if (!name) {
            this.$message.error("股东名称为必填选项");
            return;
          }
          //证件号
          let idno = list1[i].idno;
          if (!idno) {
            this.$message.error("证件号为必填选项");
            return;
          }
          //电话
          let tel = list1[i].tel;
          if (!tel) {
            this.$message.error("股东电话为必填选项");
            return;
          }
          //投资比例
          let percent = list1[i].percent;
          if (!percent) {
            this.$message.error("投资比例为必填选项");
            return;
          }
        }

        for (let i = 0; i < list1.length; i++) {
          percent1 = Number(list1[i].percent) + Number(percent1);
        }
        if (Number(percent1) > 100) {
          this.$message.error("股东所占比例之和不能大于100%");
          return;
        } else if (Number(percent1) < 100) {
          this.$message.error("股东所占比例之和不能小于100%");
          return;
        }
      }
      console.log("bankId", this.license.choiseBank);
      if (typeof this.license.choiseBank == "undefined") {
        this.$message.error("请选择银行！");
        return;
      }

      this.license.status = type;

      this.loading = true;
      let that = this;
      let procDefKey = "transaction_filing"; //启动流程类型
      let businessType = "former_trial";

      let jsonVars = {};
      //执行自己的方法，后台判断启动与否
      that.tableBondData.currency = that.$store.state.currency;
      console.log("币种", that.$store.state.currency);

      that.license.isNewCompany =
        that.ruleForm.applycompany == "成立全资子公司" ? "0" : "1";
      that.license.buyType = that.ruleForm.applyType == "独立竞买" ? "1" : "0";
      let params = {
        transLicense: that.license,
        transLicenseUnion: that.BondInfo,
        transProjectDealer: that.applycompanyDataFirst,
        transProjectDeale: that.applycompanyData,
        transAccountBillApply: that.tableBondData
      };
      params.jsonVars = jsonVars;
      params.type = type;
      this.$axios.post(
        "/epf-landweb/admin/editTransLicenseAll",
        { transLicenseAll: params },
        res => {
          if (res.code != "0") {
            this.loading = false;
            that.$message.error(res.msg); //失败
            return;
          }
          if (type == "submit") {
            // bug3497
            if(that.isAfterCheck==0){
              // that.$message({
              //   showClose: true,
              //   message: '请携带资料到交易中心进行资格审核'
              // });
            }
            that.$router.push({
              path: "/applyBiddingSavesuccess",
              query: { id: this.id }
            });
          } else {
            that.$router.push({
              path: "/applyBiddingSavedraft",
              query: { id: this.id }
            });
          }
          this.loading = false;
        }
      );
    },

    editapplyType(item, index) {
      if (index === 0) {
        this.disabled1 = false;
      }
      if (index === 1) {
        this.disabled2 = false;
      }
      this.disabled = false;
      console.log();
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    save() {
      this.$router.push({
        path: "/Savedraft",
        query: { signRecord: this.$route.query.signRecord }
      });
    },
    mybid() {
      this.$router.push("/PersonalCenter/myOrder");
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.ApplyInfo_warp {
  @include size(100%, 100%);
  background: #f2f1f9;
}
.ApplyInfo_Pro {
  @include size(100%, auto);
  background: #fff;
  box-sizing: border-box;
  &_cont {
    box-sizing: border-box;
    @include size(1200px, auto);
    padding: 0 50px;
    margin: 0 auto;
    padding-bottom: 30px;
    border-bottom: solid 1px #f3f3f3;
    .cont {
      color: #999999;
    }
    .contactive {
      color: var(--lightColor);
    }
    // .applycompany{
    //   tr{
    //     td{
    //       width:20px;
    //       border:1px solid red;
    //     }
    //   }
    // }
    table {
      border: 1px solid #f3f3f3;
      thead {
        tr {
          @include size(100%, 50px);
          border-bottom: 1px solid #f3f3f3;
          &:nth-child(1) {
            background: #f2f5f7;
            td {
              font-weight: bold;
            }
          }
        }
      }
      tr {
        @include size(100%, 50px);
        border-bottom: 1px solid #f3f3f3;
        td {
          text-align: left;
          color: #666666;
          font-size: 14px;
          &:nth-child(1) {
            width: 150px;
            text-align: center;
          }
          .text_red {
            color: red;
            margin-right: 5px;
            cursor: auto;
          }
          span {
            margin-right: 10px;
            cursor: pointer;
          }
          input {
            @include size(320px, 36px);
            color: #666666;
            background-color: #ffffff;
            border-radius: 2px;
            box-sizing: border-box;
            border: solid 1px #e0dfdf;
            text-indent: 1rem;
          }
          input:disabled {
            border: none;
            text-indent: 0rem;
          }
        }
      }
      .oper {
        span {
          margin-right: 10px;
          cursor: pointer;
          color: var(--lightColor);
        }
      }
    }
    .careful {
      color: #999999;
      display: inline-block;
    }
    p {
      font-size: 14px;
      color: #999999;
      margin-left: 100px;
      span {
        color: var(--Colors);
      }
    }
    .opertion {
      @include size(30%, 50px);
      margin: 0 auto;
      .submit_input {
        @include size(82px, 36px);
        background-color: var(--Colors);
        border-radius: 3px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        margin-right: 24px;
        display: inline-block;
      }
      .save_input {
        background: #fff;
        border: solid 1px var(--Colors);
        color: var(--Colors);
      }
    }
    .applyType_warp {
      box-sizing: border-box;
      padding: 30px 32px;
      overflow: hidden;
      .applyType_ul {
        @include size(100%, auto);
        margin-bottom: 40px;
        ul {
          @include size(100%, auto);
          line-height: 50px;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 50px;
          border-bottom: 1px solid #f3f3f3;
          li {
            @include size(50%, 50px);
            margin-bottom: 10px;
            .contractype {
              span {
                display: inline-block;
                width: 100px;
                text-align: right;
              }
            }
          }
        }
      }
      .button {
        @include size(82px, 36px);
        background-color: var(--Colors);
        border-radius: 3px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        margin-bottom: 15px;
        margin-top: -15px;
        float: right;
      }
      .button_delete {
        float: right;
        background: #fff;
        color: #666;
        border: solid 1px #e0dfdf;
        margin-left: 20px;
      }
    }
  }
}
.notclick {
  pointer-events: none;
}
</style>
<style>
.has-gutter tr {
  background-color: #f2f5f7 !important;
}
</style>
