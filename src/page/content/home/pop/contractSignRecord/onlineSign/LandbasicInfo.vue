<template>
  <div class="LandbasicInfo_warp">
    <div class="win1200">
      <div class="SignRecord_wrap">
        <div class="epf_proess">
          <span class="epf_proess_title">{{ signRecordtype }}合同服务</span>
          <div class="epf_proess_cont">
            <epf-step :active="2" :data="['甲乙双方基本信息','地块基本信息','完成']"></epf-step>
          </div>
        </div>
        <div class="publishTra_main">
          <!-- 地块基本情况 -->
          <el-form
            :model="landBasicInfoForm"
            :rules="landBasicInforules"
            ref="landBasicInfoForm"
            label-width="200px"
            class="demo-ruleForm"
          >
            <epf-switchTitle
              titles_h="地块基本情况"
              padding="0px"
              background="#fff"
              height="80px"
              :shutOff="false"
            ></epf-switchTitle>
            <div class="publishTra_main_cont">
              <el-form-item label="宗地位置：" prop="landLocation">
                <el-input
                  v-model="landBasicInfoForm.landLocation"
                  style="width:491px;"
                  placeholder="请输入宗地位置"
                ></el-input>
              </el-form-item>
              <div style="display: flex;flex-direction: row;">
                <el-form-item
                  label="所属行政区："
                  prop="provincialCode"
                  style="width:433px;"
                >
                  <el-select
                    v-model="landBasicInfoForm.cantonProvinceName"
                    placeholder="请选择土地所在省"
                    @change="
                      provinceSelect(
                        dictionary.administrative_regions,
                        landBasicInfoForm.cantonProvinceName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.administrative_regions"
                      :ref="item.regionName"
                      :id="item.id"
                      :regionCode="item.regionCode"
                      :label="item.regionName"
                      :value="item.regionName"
                      :key="item.regionCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  prop="cityCode"
                  class="canton_Regions clearMargin"
                >
                  <el-select
                    v-model="landBasicInfoForm.cantonCityName"
                    placeholder="请选择土地所在市"
                    @change="
                      citySelect(
                        dictionary.cantonCity,
                        landBasicInfoForm.cantonCityName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.cityCode"
                      :ref="item.regionName"
                      :id="item.id"
                      :regionCode="item.regionCode"
                      :label="item.regionName"
                      :value="item.regionName"
                      :key="item.regionCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  prop="cantonCode"
                  class="canton_Regions clearMargin"
                >
                  <el-select
                    v-model="landBasicInfoForm.cantonAreaName"
                    placeholder="请选择土地所在区/县"
                    @change="
                      areaSelect(
                        dictionary.cantonAreaName,
                        landBasicInfoForm.cantonAreaName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.cantonCode"
                      :ref="item.regionName"
                      :id="item.id"
                      :regionCode="item.regionCode"
                      :label="item.regionName"
                      :value="item.regionName"
                      :key="item.regionCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="交易中心：" prop="tradingInstitutionsName">
                <el-select
                  style="width:491px;"
                  v-model="landBasicInfoForm.tradingInstitutionsName"
                  @focus="getOrgTreeForTree()"
                  @visible-change="$forceUpdate()"
                  @change="
                    tradGetId(
                      orgs,
                      landBasicInfoForm.tradingInstitutionsName,
                      $event
                    )
                  "
                  placeholder="请选择地块所属行政区的交易中心"
                >
                  <el-option
                    v-for="item in orgs"
                    :ref="item.enterpriseName"
                    :id="item.id"
                    :dictKey="item.enterpriseName"
                    :label="item.enterpriseName"
                    :value="item.enterpriseName"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用权类型：" prop="useType">
                <el-radio-group v-model="landBasicInfoForm.useType">
                  <el-radio
                    v-for="item in dictionary.use_type"
                    :label="item.dictKey"
                    :key="item.zhCn"
                    >{{ item.zhCn }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="
                  landBasicInfoForm.useType == 'transfer2' ||
                    landBasicInfoForm.useType == 'tosell'
                "
                ref="contractNum"
                :label="
                  landBasicInfoForm.useType == 'transfer2'
                    ? '划拨决定书号：'
                    : '建设用地使用权出让合同号'
                "
                prop="contractNum"
              >
                <el-input
                  v-if="landBasicInfoForm.useType == 'transfer2'"
                  v-model="landBasicInfoForm.contractNum"
                  placeholder="请输入划拨决定书号"
                  style="width:491px;"
                ></el-input>
                <el-input
                  v-if="landBasicInfoForm.useType == 'tosell'"
                  style="width:491px;"
                  v-model="landBasicInfoForm.contractNum"
                  placeholder="请输入建设用地使用权出让合同号"
                ></el-input>
              </el-form-item>
              <div style="display: flex;flex-direction: row;">
                <el-form-item
                  label="土地用途："
                  prop="firstClassUse"
                  style="width:436px;"
                >
                  <el-select
                    v-model="landBasicInfoForm.firstClassUseName"
                    placeholder="请选择土地一级用途"
                    @change="
                      firstClassUseSelect(
                        dictionary.land_use,
                        landBasicInfoForm.firstClassUseName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.land_use"
                      :ref="item.zhCn"
                      :id="item.id"
                      :dictKey="item.dictKey"
                      :label="item.zhCn"
                      :value="item.zhCn"
                      :key="item.dictKey"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  prop="secondClassUse"
                  class="canton_Regions clearMargin"
                >
                  <el-select
                    v-model="landBasicInfoForm.secondClassUseName"
                    placeholder="请选择土地二级用途"
                    @change="
                      secondClassUseSelect(
                        dictionary.land_use_second,
                        landBasicInfoForm.secondClassUseName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.land_use_second"
                      :ref="item.zhCn"
                      :id="item.id"
                      :dictKey="item.dictKey"
                      :label="item.zhCn"
                      :value="item.zhCn"
                      :key="item.dictKey"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="土地性质：" prop="landChar">
                <el-radio-group v-model="landBasicInfoForm.landChar">
                  <el-radio
                    v-for="item in dictionary.land_nature"
                    :label="item.dictKey"
                    :key="item.zhCn"
                    >{{ item.zhCn }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="不动产权证号/土地证号：" prop="warrantNum">
                <el-input
                  style="width:491px;"
                  v-model="landBasicInfoForm.warrantNum"
                  placeholder="请输入不动产权证号/土地证号"
                  :disabled="
                    disabledType == 1 && landBasicInfoForm.warrantNum !== ''
                      ? true
                      : false
                  "
                ></el-input>
              </el-form-item>
              <el-form-item label="房产证号：" prop="houseNum">
                <el-input
                  style="width:491px;"
                  v-model="landBasicInfoForm.houseNum"
                  placeholder="若无房产证则填无"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="权属总面积："
                prop="overshipArea"
                v-if="signRecordtype === '抵押'"
              >
                <el-input
                  style="width:491px;"
                  v-model="landBasicInfoForm.overshipArea"
                  placeholder="请输入面积数，例如：1000.02"
                ></el-input>
                <span style="margin-left:20px;">平方米</span>
              </el-form-item>
              <el-form-item :label="signRecordtype + '土地面积：'" prop="area">
                <el-input
                  style="width:491px;"
                  v-model="landBasicInfoForm.area"
                  placeholder="请输入面积数，例如：1000.02"
                ></el-input>
                <span style="margin-left:20px;">平方米</span>
              </el-form-item>
              <el-form-item
                label="建筑面积："
                prop="buildArea"
              >
                <el-input
                  style="width:491px;"
                  v-model="landBasicInfoForm.buildArea"
                  placeholder="请输入面积数，例如：1000.02"
                ></el-input>
                <span style="margin-left:20px;">平方米</span>
              </el-form-item>
              <el-form-item
                label="出租土地/建筑物抵押情况："
                prop="rentMort"
                v-if="signRecordtype == '出租'"
              >
                <!-- :disabled="disabled" -->
                <el-input
                  type="textarea"
                  maxlength="2000"
                  show-word-limit
                  autosize
                  v-model="landBasicInfoForm.rentMort"
                  placeholder="出租土地/建筑物抵押情况"
                  style="width:720px;height:108px;"
                ></el-input>
              </el-form-item>
            </div>

            <!-- 转让期限、转让费用开始 -->
            <div v-if="signRecordtype === '转让'">
              <epf-switchTitle
                titles_h="剩余使用年限"
                padding="0px"
                background="#fff"
                height="80px"
                :shutOff="false"
              ></epf-switchTitle>
              <div class="publishTra_main_cont">
                <el-form-item label="剩余使用年限" prop="term">
                  <el-input
                    v-model="landBasicInfoForm.term"
                    style="width:491px;"
                    placeholder="请输入剩余使用年限"
                    :disabled="true"
                  ></el-input>
                  <span style="margin-left:20px;">年</span>
                </el-form-item>
                <el-popover 
                  placement="bottom"
                  width="300"
                  trigger="hover">
                  <div solt="content" style="padding:15px;line-height:20px;color:#666">
                      <p>例如：使用权截止日期为2020年4月15日，当前日期为2000年1月1，那么剩余使用年限为：20年3月15天，直接取整数20年。</p>
                  </div>
                  <p class="explain" slot="reference" style="margin: 20px 0 20px 200px;">
                      <img src="../../../../../../assets/image/careful.png" alt /> 
                      剩余使用年限计算方法：取“截止日期-当前信息填写日期”的年度整数。<i class="question"></i>
                  </p>
                </el-popover>
                <el-form-item label="日期：" required>
                  <el-date-picker
                    :editable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="landBasicInfoForm.beginDate"
                    placeholder="起始日期"
                    @change="changeEnd"
                    :picker-options="pickerOptionsStart"
                  ></el-date-picker>
                  <span>---</span>
                  <el-date-picker
                    :editable="false"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    v-model="landBasicInfoForm.endDate"
                    placeholder="截止日期"
                    @change="changeStart"
                    :picker-options="pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <epf-switchTitle
                titles_h="转让费用"
                padding="0px"
                background="#fff"
                height="80px"
                :shutOff="false"
              ></epf-switchTitle>
              <div class="publishTra_main_cont">
                <el-form-item label="土地转让费：" prop="landTransfer">
                  <el-input
                    @input="landTransferFun(landBasicInfoForm.landTransfer)"
                    v-model="landBasicInfoForm.landTransfer"
                    style="width:491px;"
                    placeholder="请输入土地转让费,例如输入10000"
                  ></el-input>
                  <span style="margin-left:20px;">元</span>
                </el-form-item>
                <el-form-item label="附着物转让费：" prop="attachTransfer">
                  <el-input
                    @input="attachTransferFun(landBasicInfoForm.attachTransfer)"
                    v-model="landBasicInfoForm.attachTransfer"
                    style="width:491px;"
                    placeholder="请输入附着物转让费,例如输入10000"
                  ></el-input>
                  <span style="margin-left:20px;">元</span>
                </el-form-item>
                <el-form-item label="合计：" prop="total">
                  <el-input
                    v-model="landBasicInfoForm.total"
                    :disabled="true"
                    style="width:491px;"
                  ></el-input>
                  <span style="margin-left:20px;">万元</span>
                </el-form-item>
                <el-form-item label="付款方式：" prop="payment">
                  <el-input
                    type="textarea"
                    maxlength="1000"
                    minlength="0"
                    show-word-limit
                    autosize
                    v-model="landBasicInfoForm.payment"
                    placeholder="请输入付款方式，并做详细说明"
                    style="width:720px;height:108px;"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <!-- 转让期限、转让费用结束 -->

            <!-- 出租期限、租金缴纳开始 -->
            <div v-if="signRecordtype === '出租'">
              <epf-switchTitle
                titles_h="出租期限"
                padding="0px"
                background="#fff"
                height="80px"
                :shutOff="false"
              ></epf-switchTitle>

              <div class="publishTra_main_cont">
                <el-form-item label="日期：" required>
                  <el-date-picker
                    v-model="landBasicInfoForm.beginDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="起始日期"
                    @change="dateChangeTime"
                    :picker-options="startDatePicker"
                  ></el-date-picker>
                  <!-- @change="changeEnd"
                  :picker-options="pickerOptionsStart"-->
                  <span>---</span>
                  <el-date-picker
                    v-model="landBasicInfoForm.endDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="截止日期"
                    :picker-options="endDatePicker"
                    @change="dateChangeTime"
                  ></el-date-picker>
                  <!-- @change="changeStart"
                  :picker-options="pickerOptionsEnd"-->
                </el-form-item>
                <el-form-item label="出租期限：" required>
                  <el-input
                    v-model="landBasicInfoForm.term"
                    style="width:491px;"
                    :disabled="true"
                  ></el-input>
                  <span style="margin-left:20px;">月</span>
                </el-form-item>
              </div>
              <epf-switchTitle
                titles_h="租金缴纳"
                padding="0px"
                background="#fff"
                height="80px"
                :shutOff="false"
              ></epf-switchTitle>
              <div class="publishTra_main_cont">
                <el-form-item label="租金：" prop="rent">
                  <el-input
                    @input="rentFun(landBasicInfoForm.rent)"
                    v-model="landBasicInfoForm.rent"
                    style="width:491px;"
                    placeholder="请输入租金，例如输入10000"
                  ></el-input>
                  <span style="margin-left:20px;">元/月</span>
                </el-form-item>
                <el-form-item label="合计：" prop="total">
                  <el-input
                    @input="rentTotleFun(landBasicInfoForm.total)"
                    v-model="landBasicInfoForm.total"
                    style="width:491px;"
                    placeholder="请输入合计"
                  ></el-input>
                  <span style="margin-left:20px;">万元</span>
                </el-form-item>
                <el-form-item label="付款方式：" prop="payment">
                  <el-input
                    type="textarea"
                    maxlength="1000"
                    minlength="0"
                    show-word-limit
                    autosize
                    v-model="landBasicInfoForm.payment"
                    placeholder="请输入付款方式，并做详细说明"
                    style="width:720px;height:108px;"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <!-- 出租期限、租金缴纳结束 -->

            <!-- 抵押合同担保的主债权开始 -->
            <div v-if="signRecordtype === '抵押'">
              <epf-switchTitle
                titles_h="本合同担保的主债权"
                padding="0px"
                background="#fff"
                height="80px"
                :shutOff="false"
              ></epf-switchTitle>
              <div class="publishTra_main_cont">
                <el-form-item label="债权人：" prop="creditor">
                  <el-input
                    v-model="landBasicInfoForm.creditor"
                    style="width:491px;"
                    placeholder="请输入债权人"
                  ></el-input>
                </el-form-item>
                <el-form-item label="债务人：" prop="obligor">
                  <el-input
                    v-model="landBasicInfoForm.obligor"
                    style="width:491px;"
                    placeholder="请输入债务人"
                  ></el-input>
                </el-form-item>
                <el-form-item label="其他当事人：" prop="otherParties">
                  <el-input
                    v-model="landBasicInfoForm.otherParties"
                    style="width:491px;"
                    placeholder="请输入其他当事人"
                  ></el-input>
                </el-form-item>
                <el-form-item label="主债权数额：" prop="amountOfPrincipal">
                  <el-input
                    v-model="landBasicInfoForm.amountOfPrincipal"
                    style="width:491px;"
                    placeholder="请输入主债权数额，例如输入10000"
                  ></el-input>
                  <span style="margin-left:20px;">元</span>
                </el-form-item>
                <el-form-item label="债务期限：" required>
                  <el-date-picker
                    v-model="landBasicInfoForm.beginDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="债务履行开始日期"
                  ></el-date-picker>
                  <span>---</span>
                  <el-date-picker
                    v-model="landBasicInfoForm.endDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="债务履行截止日期"
                  ></el-date-picker>
                </el-form-item>
                <!--<el-form-item label="抵押期限：" prop="term">
                  <el-input v-model="landBasicInfoForm.term" style="width:491px;" placeholder="请输入"></el-input>
                  <span style="margin-left:20px;">年</span>
                </el-form-item>-->
                <el-form-item label="抵押期限：" required>
                  <el-date-picker
                    v-model="landBasicInfoForm.mortgageBeginDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="抵押期限开始日期"
                  ></el-date-picker>
                  <span>---</span>
                  <el-date-picker
                    v-model="landBasicInfoForm.mortgageEndDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="抵押期限截止日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="本合同抵押担保范围：" prop="scope">
                  <el-input
                    type="textarea"
                    maxlength="2000"
                    minlength="0"
                    show-word-limit
                    autosize
                    v-model="landBasicInfoForm.scope"
                    placeholder="请输入担保范围"
                    style="width:720px;height:108px;"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <!-- 抵押合同担保的主债权结束 -->

            <!-- 其他开始 -->
            <epf-switchTitle
              titles_h="其它"
              padding="0px"
              background="#fff"
              height="80px"
              :shutOff="false"
            ></epf-switchTitle>
            <div class="publishTra_main_cont">
              <el-form-item label="其它：" prop="remark">
                <el-input
                  type="textarea"
                  maxlength="2000"
                  minlength="0"
                  show-word-limit
                  autosize
                  v-model="landBasicInfoForm.remark"
                  placeholder="请输入其他说明"
                  style="width:720px;height:108px;"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 其他结束 -->
            <epf-switchTitle
              titles_h="附件清单"
              padding="0px"
              background="#fff"
              height="80px"
              :shutOff="false"
            ></epf-switchTitle>
            <div class="publishTra_main_cont publishTra_main_cont_last">
              <epf-annexList
                :tableType="tableType"
                @isAux="isAuxFun"
                :tableNmae="tableNmae"
                :belong="belong"
                :areaCode="areaCode"
                :fileSize="6"
                :fileType="fileType"
                :annexType="landType"
                v-if="belong !== ''"
              ></epf-annexList>
              <div style="clear: both;"></div>
            </div>
            <el-form-item>
              <div class="operation">
                <div
                  class="epf_btn epf_btn_bg" style="width:82px;"
                  @click="submitForm('landBasicInfoForm', 'submit')"
                  :disabled="getShow"
                  >提交</div
                >
                <div
                  class="epf_btn epf_btn_def" style="width:82px;"
                  @click="saveForm('landBasicInfoForm', 'save')"
                  :disabled="saveShow"
                  >保存</div
                >
                <div
                  class="epf_btn epf_btn_def"
                  style="width:82px;background:#fff;color:#555;border:1px solid #c9c9c9;"
                  @click="back"
                >
                  上一步
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import baseURL1 from "@/util/config.js";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    const numberDator = (rule, value, callback) => {
      if (value < 0 || value > 100) {
        callback(new Error("数值在 0 至 100 之间"));
      } else {
        callback();
      }
    };
    return {
      getShow: false,
      saveShow: false,
      // 限制开始时间
      pickerOptionsStart: {},
      pickerOptionsEnd: {},
      // 文件
      tableNmae: ["序号", "文件名", "文件", "操作"],
      belong: "",
      areaCode: "",
      // @name: 修改bug3025
      // @author: gaojie
      // @chageTime:2020-3-23
      fileType: ["rar", "zip", "doc", "docx", "pdf", "jpg"],
      landType: "CONTRACT",
      tableType: false,
      date1: "",
      baseUrl: "",
      disabled: false,
      active: 0,
      disabledType: 0, //禁用状态
      orgs: [], // 交易中心
      // 地块基本情况
      landBasicInfoForm: {
        secondClassUse: null,
        tradingInstitutionsName: null,
        tradingInstitutionsID: null,
        jsonVars: null,
        id: null,
        // 宗地位置
        landLocation: null,
        cityLevel: null,
        // 使用权类型：
        useType: "划拨",
        // 省
        provincialCode: null,
        cantonProvinceName: null,
        //市
        cityCode: null,
        cantonCityName: null,
        //区
        cantonCode: null,
        cantonAreaName: null,
        // 土地类型
        landType: null,
        //使用权类型
        useType: null,
        // 土地一级用途
        firstClassUse: null,
        firstClassUseName: null,
        // 土地二级用途
        secondClassUseName: null,
        // 土地性质：
        landChar: null,
        // 不动产权证号/土地证号
        warrantNum: null,
        // 房产证号：
        houseNum: null,
        // 出租土地面积：
        area: null,
        // 出租建筑面积
        rentalbuildingarea: null,
        // 期限
        term: null,
        // 日期
        beginDate: null,
        endDate: null,
        // 租金
        rent: 0,
        // 合计
        total: 0,
        // 付款方式
        payment: null,
        // 其他
        remark: null,
        // 土地转让费
        landTransfer: null,
        // 附着物转让费
        attachTransfer: null,
        // 债权人
        creditor: null,
        // 债务人：
        obligor: null,
        // 其他当事人
        otherParties: null,
        // 主债权数额
        amountOfPrincipal: null,
        // 本合同抵押担保范围
        scope: null,
        // 建筑面积
        buildArea: null,
        // 权属总面积
        overshipArea: null,
        // 出租土地/建筑物抵押情况
        rentMort: null,
        // 建筑用地使用权合同编号
        contractNum: null,
        pId: null,
        //				关联信息Id （关联供给，交易得时候必填 地块id）
        relevanceId: null,
        mortgageBeginDate: null,
        mortgageEndDate: null
      },
      landBasicInforules: {
        /**
         * 地块基本情况
         */
        // 宗地位置
        landLocation: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')} },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          },
          {
            required: true,
            message: "请填写宗地位置"
          }
        ],
        provincialCode: [
          {
            required: true,
            message: "请选择所在省",
            trigger: "change"
          }
        ],
        cityCode: [
          {
            required: true,
            message: "请选择所在市",
            trigger: "change"
          }
        ],
        cantonCode: [
          {
            required: true,
            message: "请选择所在区",
            trigger: "change"
          }
        ],
        useType: [
          {
            required: true,
            message: "请选择使用权类型",
            trigger: "change"
          }
        ],
        // 划拨决定书号
        decisionNum: [
          {
            required: true,
            message: "请填写该信息"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        tradingInstitutionsName: [
          {
            required: true,
            message: "请选择交易中心",
            trigger: "change"
          }
        ],
        firstClassUse: [
          {
            required: true,
            message: "请选择一级土地用途",
            trigger: "change"
          }
        ],
        secondClassUse: [
          {
            required: true,
            message: "请选择二级土地用途",
            trigger: "change"
          }
        ],
        // 土地性质：
        landChar: [
          {
            required: true,
            message: "请选择土地性质",
            trigger: "change"
          }
        ],
        // 不动产权证号/土地证号
        warrantNum: [
          {
            required: true,
            message: "请输入不动产权证号/土地证号"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        // 土地面积：
        area: [
          {
            required: true,
            message: "请输入土地面积"
          },
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "请输入正确的土地面积，仅输入数字，首位数字不可为0"
          }
        ],
        // 建筑面积：
        rentalbuildingarea: [
          {
            required: true,
            message: "请输入建筑面积"
          },
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "请输入正确的建筑面积，仅输入数字，首位数字不可为0"
          }
        ],
        // 建筑用地使用权合同编号
        contractNum: [
          {
            required: true,
            message: "请填写此信息"
          },
          // {
          //   pattern: /^[\u4E00-\u9FA5A-Za-z0-9、,，_()-（）———【】]+$/,
          //   message:
          //     "可以输入文字、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          // }
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        // 出租、转让、抵押期限
        term: [
          {
            required: true,
            message: "请输入期限",
            trigger: "change"
          },
          {
            pattern: /^[0-9]\d*(\.\d{1})?$/,
            message: "期限最小为0,且最多一位小数"
          },
          {
            validator: numberDator // 自定义验证数值大小 大于等于0,小于等于100;
          }
        ],
        // 租金
        rent: [
          {
            required: true,
            message: "请输入租金",
            trigger: "blur"
          },
          // {
          //   pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/,
          //   message: "租金有误,必须是大于0的数.最多两位小数"
          // }
          {
            pattern: /^[1-9]\d*$/,
            message: "租金有误,请输入整数"
          }
        ],
        total: [
          {
            required: true,
            message: "请输入合计",
            trigger: "blur"
          },
          {
            pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/,
            message: "合计有误,必须是大于0的数.最多四位小数"
          }
          // {
          //   pattern:/^[1-9]\d*$/,
          //   message: '合计有误,请输入整数'
          // }
        ],
        // 土地转让费
        landTransfer: [
          {
            required: true,
            message: "请输入土地转让费",
            trigger: "blur"
          },
          // {
          //   // pattern: /^(([1-9][0-9]\d{1,8})|(([0]\.\d{1,2}|[1-9][0-9]\d{1,10}\.\d{1,2})))$/,
          //   pattern: /^(([0-9]\d{1,9})|([1-9])|(([1-9]\.\d{1,2}|[0]\.\d{1,2}|[1-9]\d{1,10}\.\d{1,2})))$/,
          //   message:
          //     "土地转让费有误,必须是大于0的数.最多两位小数,小数点前最多10位;整数不超10位"
          // }
          {
            pattern: /^[1-9]\d*$/,
            message: "土地转让费有误,请输入整数"
          }
        ],
        // 附着物转让费
        attachTransfer: [
          {
            required: true,
            message: "请输入附着物转让费",
            trigger: "blur"
          },
          // {
          //   // pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
          //   pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
          //   message: "附着物转让费有误,必须是大于0的数.最多两位小数"
          // }
          {
            pattern: /^[1-9]\d*$/,
            message: "附着物转让费有误,请输入整数"
          }
        ],
        // 债权人
        creditor: [
          {
            required: true,
            message: "请输入债权人"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        // 债务人：
        obligor: [
          {
            required: true,
            message: "请输入债务人"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        // 本合同抵押担保范围
        scope: [
          {
            required: true,
            message: "请输入担保范围"
          },
          //        {
          //          pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
          //          message: "只能输入中文、英文、数字."
          //        }
          // { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,2000,'长度在2000字符以内（注意若是汉字，1个汉字是2个字符）')}  },
        ],
        // 付款方式
        payment: [
          {
            required: true,
            message: "请输入付款方式",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,1000,'长度在1000字符以内（注意若是汉字，1个汉字是2个字符）')}  },
        ],
        // 房产证号
        houseNum: [
          {
            required: true,
            message: "请输入房产证号",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        // 建筑面积
        buildArea: [
          {
            required: true,
            trigger: "blur",
            message: "请输入建筑面积"
          },
          // {
          //   pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
          //   message: "建筑面积输入数字超出最长限度"
          // }
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "请输入正确的建筑面积，仅输入数字，首位数字不可为0"
          }
        ],
        // 权属总面积
        overshipArea: [
          {
            required: true,
            message: "请输入权属总面积"
          },
          // {
          //   pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
          //   message: "权属总面积输入位字数超出最长限度"
          // }
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "请输入正确的权属总面积，仅输入数字，首位数字不可为0"
          }
        ],
        // 出租土地/建筑物抵押情况
        rentMort: [
          {
            required: true,
            message: "请输入出租土地/建筑物抵押情况",
            trigger: "blur"
          },
          // { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,2000,'长度在2000字符以内（注意若是汉字，1个汉字是2个字符）')}  },
        ],
        // 其他当事人
        otherParties: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        // 主债权数额
        amountOfPrincipal: [
          // {
          //   pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
          //   message: "主债权数额有误,必须是大于0的数.最多两位小数"
          // }
          {
            pattern: /^[1-9]\d*$/,
            message: "主债权数额有误,请输入整数"
          }
        ],
        remark:[
          // { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,2000,'长度在2000字符以内（注意若是汉字，1个汉字是2个字符）')}  },
        ]
      },
      dicRequest: [
        "flow_mode",
        "land_nature",
        "use_type",
        "land_type",
        "land_use",
        "own_no_type",
        "register_organization",
        "administrative_regions",
        "building_structure"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        land_nature: "",
        use_type: "",
        land_type: "",
        land_use: "",
        own_no_type: "",
        register_organization: "",
        administrative_regions: "",
        building_structure: "",
        land_use_second: "",
        cityCode: "",
        cantonCode: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      signRecordtype: null,
      isAuxFlag: false,
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate()
    };
  },
  created() {
    this.belong = this.$route.query.fileId;
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            {
              parentId: "0"
            },
            res => {
              resolve(res);
            }
          );
        } else if (item == "administrative_regions") {
          this.$axios.get(
            `/epf-cms/regionals/getAreaByCodeOrParentId`,
            {
              parentId: "000000"
            },
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
          if (item.regionName) {
            return {
              regionCode: item.regionCode,
              regionName: item.regionName,
              id: item.id
            };
          } else {
            return {
              dictKey: item.dictKey,
              zhCn: item.zhCn,
              id: item.id
            };
          }
        });
        return dicArr;
      });

      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }

      this.dicFinsh = true;
    });
    this.signRecordtype = this.$route.query.signRecordtype;
    this.contractType = this.$route.query.signRecord;
    let token = localStorage.getItem("token");
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/docTemplete/getDocTempleteTree";
    if (this.$store.state.LandbasicInfo) {
      this.landBasicInfoForm = this.$store.state.contract;
      //				this.belong = this.$route.query.fileId;
      //   if (
      //     this.landBasicInfoForm.cantonCode ||
      //     this.landBasicInfoForm.cantonArea
      //   ) {
      this.areaCode = this.landBasicInfoForm.cantonCode
        ? this.landBasicInfoForm.cantonCode
        : this.landBasicInfoForm.cantonArea;
      //   }
      console.log("已填", this.landBasicInfoForm);
      this.selectOne(token);
    } else if (this.$route.query.contractId) {
      this.selectOne(token);
    } else if (this.$route.query.landId) {
      this.disabledType = 1;
      let parmas = {
        token: token,
        id: this.$route.query.landId
      };
      if (this.$route.query.transactype == "自行交易") {
        this.getTSellByContractAndById(parmas);
      }
      if (this.$route.query.transactype == "委托交易") {
        this.getTransGoodsByCirculationAndById(parmas);
      }
    }
    this.getOrgTreeForTree();
  },
  methods: {
    landTransferFun(value) {
      this.landBasicInfoForm.landTransfer = value;
      if (this.landBasicInfoForm.attachTransfer == undefined) {
        // this.landBasicInfoForm.total = (this.landBasicInfoForm.landTransfer * 1)
        this.landBasicInfoForm.total = (this.landBasicInfoForm.landTransfer * 1/10000)
          .toFixed(4)
          .toString();
      } else {
        this.landBasicInfoForm.total = (
          (this.landBasicInfoForm.landTransfer * 1 +
          // this.landBasicInfoForm.attachTransfer * 1)
          this.landBasicInfoForm.attachTransfer * 1)/10000
        )
          .toFixed(4)
          .toString();
      }
    },
    attachTransferFun(value) {
      this.landBasicInfoForm.attachTransfer = value;
      this.landBasicInfoForm.total = (
        (this.landBasicInfoForm.landTransfer * 1 + this.landBasicInfoForm.attachTransfer * 1)/10000
      )
        .toFixed(4)
        .toString();
    },
    rentFun(value) {
      this.landBasicInfoForm.rent = value;
      this.landBasicInfoForm.total = ((Number(this.landBasicInfoForm.term) * Number(this.landBasicInfoForm.rent))/10000)
        .toFixed(4)
        .toString();
      console.log(this.landBasicInfoForm.term);
    },
    rentTotleFun(value) {
      // console.log("this.landBasicInfoForm.total",value);

      this.landBasicInfoForm.total = value;
      console.log("this.landBasicInfoForm.rent",this.landBasicInfoForm.rent);
      this.landBasicInfoForm.rent = parseInt(Number(value*10000) / Number(this.landBasicInfoForm.term))
      console.log("this.landBasicInfoForm.rent",parseInt(Number(value*10000) / Number(this.landBasicInfoForm.term)));
    },
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.landBasicInfoForm.endDate) {
            //如果结束时间不为空，则小于结束时间
            return (
              new Date(self.landBasicInfoForm.endDate).getTime() <
                time.getTime() ||
              new Date(self.landBasicInfoForm.endDate).getTime() >
                new Date(self.formatDate(time)).getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.landBasicInfoForm.beginDate) {
            //如果开始时间不为空，则结束时间大于开始时间
            return (
              new Date(self.landBasicInfoForm.beginDate).getTime() >
                time.getTime() ||
              new Date(
                self.formatDate(self.landBasicInfoForm.beginDate)
              ).getTime() < time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    dateChangeTime() {
      if (
        this.landBasicInfoForm.endDate &&
        this.landBasicInfoForm.beginDate &&
        this.landBasicInfoForm.endDate != null &&
        this.landBasicInfoForm.beginDate != null
      ) {
        this.landBasicInfoForm.term = this.datemonth(
          this.landBasicInfoForm.beginDate,
          this.landBasicInfoForm.endDate
        );
      }
    },
    formatDate(time) {
      return (
        new Date(time).getFullYear() +
        20 +
        "-" +
        (new Date(time).getMonth() + 1 < 10
          ? "0" + (new Date(time).getMonth() + 1)
          : new Date(time).getMonth() + 1) +
        "-" +
        (new Date(time).getDate() < 10
          ? "0" + new Date(time).getDate()
          : new Date(time).getDate())
      );
    },
    datemonth(date1, date2) {
      // 拆分年月日
      date1 = date1.split("-");
      // 拆分年月日
      date2 = date2.split("-");
      let date3 =
        Number(date2[1]) - Number(date1[1]) == 0
          ? Number(date2[2]) - Number(date1[2]) > 15
            ? 1
            : 0
          : 0;
      // 得到月数
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
      // 得到月数
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      return Math.abs(date2 - date1) + date3;
    },
    // 获取附件清单数据检验结果
    isAuxFun(value) {
      this.isAuxFlag = value;
    },
    // 结束时间限制开始时间
    changeStart() {
      if (!this.landBasicInfoForm.endDate) {
        this.pickerOptionsStart = {
          disabledDate: {}
        };
        return;
      }
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        // 可通过箭头函数的方式访问到this
        disabledDate: time => {
          return (
            time.getTime() > new Date(this.landBasicInfoForm.endDate).getTime()
          );
        }
      });
      //使用权截止
      let nowDate = new Date(this.landBasicInfoForm.endDate)
      let today_y  = nowDate.getFullYear()
      let today_m  = this.p((nowDate.getMonth() + 1))
      let today_d =  this.p(nowDate.getDate())
      //开始日期
      let dateBegin = new Date();
      let dateBegin_y = dateBegin.getFullYear()
      let dateBegin_m = this.p((dateBegin.getMonth() + 1))
      let dateBegin_d = this.p(dateBegin.getDate())
      let years = 0;
      let months = today_m - dateBegin_m + (today_y - dateBegin_y) * 12;
      if (today_m * 100 + today_d < dateBegin_m * 100 + dateBegin_d) {
          months--;//
        }
        years = Math.floor(months / 12);
        months = months % 12;
        let middleDate = new Date(dateBegin);
        middleDate.setFullYear(dateBegin_y + years);
        middleDate.setMonth(dateBegin.getMonth() + months);
        let days =  Math.floor( ( nowDate.getTime()- middleDate.getTime()) / 24 / 60/ 60 / 1000);
        console.log('已经过去了'+years+'年'+months+'月'+days+'天');
        if(days >= 31){
          months = months+1
          if(months >= 12){
            years = years +1
          }
        }
        if (this.$route.query.signRecordtype == "转让") {
          this.landBasicInfoForm.term = years;
        }
    },
     p(s) {
      return s < 10 ? '0' + s : s
    },
    // 开始时间 控制结束时间
    changeEnd() {
      if (!this.landBasicInfoForm.beginDate) {
        this.pickerOptionsEnd = {
          disabledDate: {}
        };
        return;
      }
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: time => {
          return (
            time.getTime() <
            new Date(this.landBasicInfoForm.beginDate).getTime()
          );
        }
      });
    },
    // 获取编辑信息
    selectOne(token) {
      axios
        .post(
          // "/api/epf-contract/transContract/selectOne",
          "/api/epf-landweb/transContract/selectOne",
          qs.stringify({
            token: token,
            contractId: this.$route.query.contractId
          })
        )
        .then(res => {
          console.log(res)
          if (res.data.code == "0000") {
            //          for (let item in this.landBasicInfoForm) {
            //            this.landBasicInfoForm[item] = res.data.data.list[0][item];
            //          }
            if (res.data.data.list[0].attachTransfer == "0") {
              res.data.data.list[0].attachTransfer = "0.00";
            }
            this.landBasicInfoForm = res.data.data.list[0];
            this.$store.state.LandbasicInfo = this.landBasicInfoForm;

            this.landBasicInfoForm.insertTime = this.getChangeDate(
              res.data.data.list[0].insertTime
            );
            this.landBasicInfoForm.beginDate = this.getChangeDate(
              res.data.data.list[0].beginDate
            );
            this.landBasicInfoForm.endDate = this.getChangeDate(
              res.data.data.list[0].endDate
            );
            this.landBasicInfoForm.mortgageBeginDate = this.getChangeDate(
              res.data.data.list[0].mortgageBeginDate
            );
            this.landBasicInfoForm.mortgageEndDate = this.getChangeDate(
              res.data.data.list[0].mortgageEndDate
            );
            this.landBasicInfoForm.cantonProvinceName =
              res.data.data.list[0].provincialCodeName;
            this.landBasicInfoForm.cantonCityName =
              res.data.data.list[0].cityCodeName;
            this.landBasicInfoForm.cantonAreaName =
              res.data.data.list[0].cantonCodeName;
            this.landBasicInfoForm.tradingInstitutionsName =
              res.data.data.list[0].tradingInstitutionsName;
            this.landBasicInfoForm.total = res.data.data.list[0].total3/10000;
            // if(res.data.data.list[0].contractTypeName=='转让'){
            //   this.landBasicInfoForm.total = (((res.data.data.list[0].landTransfer?res.data.data.list[0].landTransfer * 1:1) + (res.data.data.list[0].attachTransfer?res.data.data.list[0].attachTransfer:1) * 1)/10000).toFixed(4).toString();
            // }else if(res.data.data.list[0].contractTypeName=='出租'){
            //   this.landBasicInfoForm.total = res.data.data.list[0].total3/100000000
            //   // this.landBasicInfoForm.total =((res.data.data.list[0].term *1 *(res.data.data.list[0].rent * 1))/10000).toFixed(2).toString();
            // }else if(res.data.data.list[0].contractTypeName=='抵押'){

            // }
            // this.landBasicInfoForm.total = res.data.data.list[0].total3/10000;
            // this.landBasicInfoForm.tradingInstitutionsID = res.data.data.list[0].trustOrgId
            //         	判断是否为关联委托交易出租类型（租金=合计/年限）

            if (
              this.$route.query.signRecordtype == "出租" &&
              this.$route.query.transactype == "委托交易" &&
              this.$route.query.landId
            ) {
              this.landBasicInfoForm.rent = this.landBasicInfoForm.total / this.landBasicInfoForm.trem;
            }

            //					判断省是否存在,请求市区
            if (this.landBasicInfoForm.cantonProvinceName) {
              let pId = this.$refs[this.landBasicInfoForm.cantonProvinceName][0]
                .$attrs.id;
              this.$axios.get(
                `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
                {},
                res => {
                  if (res.dictionariesList.length != 0) {
                    this.dictionary.cityCode = res.dictionariesList;
                    let pId2 = res.dictionariesList[0].parentId;
                    this.$axios.get(
                      `/epf-admin/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId2}`,
                      {},
                      res => {
                        if (res.dictionariesList.length != 0) {
                          this.dictionary.cantonCode = res.dictionariesList;
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        })
        .catch(data => {
          this.$message.error(data);
        });
    },
    // 自行交易
    getTSellByContractAndById(parmas) {
      this.$axios.get(
        "/epf-landweb/admin/tsell/getTSellByContractAndById",
        parmas,
        res => {
          console.log("自行交易", res);
          if (res.code == 0) {            
            res.data.overshipArea = null
            res.data.creditor = null
            res.data.obligor = null
            res.data.scope = null
            this.landBasicInfoForm = res.data;
            this.landBasicInfoForm.tradingInstitutionsName = res.data.trustOrgName;
            this.landBasicInfoForm.tradingInstitutionsID = res.data.trustOrgId;
            //							判断上一步是否选择营业执照
            if (
              this.$route.query.firstIdentificationType == "business_license"
            ) {
              this.landBasicInfoForm.firstIdentificationType =
                "business_license";
              this.landBasicInfoForm.firstIdentificationTypeName = "营业执照";
              this.landBasicInfoForm.firstLegalPerson = this.$route.query.firstLegalPerson;
              this.landBasicInfoForm.firstLegalPersonIdNum = this.$route.query.firstLegalPersonIdNum;
              this.landBasicInfoForm.firstAgentPersonIdNum = this.$route.query.firstAgentPersonIdNum;
            }
            this.landBasicInfoForm.provincialCode = res.data.cantonProvince;
            this.landBasicInfoForm.cityCode = res.data.cantonCity;
            this.landBasicInfoForm.cantonCode = res.data.cantonArea;

            if (this.$route.query.signRecord == "rent") {
              this.landBasicInfoForm.term = res.data.term * 12;
            }
            if (this.landBasicInfoForm.beginDate) {
              this.landBasicInfoForm.beginDate = this.getChangeDate(
                res.data.beginDate
              );
            }
            if (this.landBasicInfoForm.endDate) {
              this.landBasicInfoForm.endDate = this.getChangeDate(
                res.data.endDate
              );
            }
            if (this.landBasicInfoForm.mortgageBeginDate) {
              this.landBasicInfoForm.mortgageBeginDate = this.getChangeDate(
                res.data.mortgageBeginDate
              );
            }
            if (this.landBasicInfoForm.mortgageEndDate) {
              this.landBasicInfoForm.mortgageEndDate = this.getChangeDate(
                res.data.mortgageEndDate
              );
            }
            this.$store.state.LandbasicInfo = this.landBasicInfoForm;
            this.getOrgTreeForTree();
            this.disabled = true;
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    // 委托交易
    getTransGoodsByCirculationAndById(parmas) {
      this.$axios.get(
        "/epf-landweb/landweb/transgoods/getTransGoodsByCirculationAndById",
        parmas,
        res => {
          console.log("委托交易", res);
          //						判断上一步是否选择营业执照
          if (this.$route.query.firstIdentificationType == "business_license") {
            this.landBasicInfoForm.firstIdentificationType = "business_license";
            this.landBasicInfoForm.firstIdentificationTypeName = "营业执照";
            this.landBasicInfoForm.firstLegalPerson = this.$route.query.firstLegalPerson;
            this.landBasicInfoForm.firstLegalPersonIdNum = this.$route.query.firstLegalPersonIdNum;
            this.landBasicInfoForm.firstAgentPersonIdNum = this.$route.query.firstAgentPersonIdNum;
          }
          this.landBasicInfoForm = res.data;
          this.landBasicInfoForm.tradingInstitutionsID = res.data.tradingInstitutionsID;
          this.landBasicInfoForm.provincialCode = res.data.cantonProvince;
          this.landBasicInfoForm.cityCode = res.data.cantonCity;
          this.landBasicInfoForm.cantonCode = res.data.cantonArea;
          if (this.$route.query.signRecord == "rent") {
            this.landBasicInfoForm.term = res.data.term * 12;
          }
          if (this.landBasicInfoForm.beginDate) {
            this.landBasicInfoForm.beginDate = this.getChangeDate(
              res.data.beginDate
            );
          }
          if (this.landBasicInfoForm.endDate) {
            this.landBasicInfoForm.endDate = this.getChangeDate(
              res.data.endDate
            );
          }
          if (this.landBasicInfoForm.mortgageBeginDate) {
            this.landBasicInfoForm.mortgageBeginDate = this.getChangeDate(
              res.data.mortgageBeginDate
            );
          }
          if (this.landBasicInfoForm.mortgageEndDate) {
            this.landBasicInfoForm.mortgageEndDate = this.getChangeDate(
              res.data.mortgageEndDate
            );
          }
          this.$store.state.LandbasicInfo = this.landBasicInfoForm;
          this.getOrgTreeForTree();
        }
      );
    },
    getDay(a, b) {
      a = new Date(a.replace(/-/g, "/"));
      b = new Date(b.replace(/-/g, "/"));
      let d = Math.abs(a.getTime() - b.getTime()) / 1000 / 24 / 60 / 60;
      let year = Math.round((d / 365) * 10) / 10; //不整除取最小的年数或者直接进位（Math.ceil），或者四舍五入Math.round，自己改这个罗
      return year;
      console.log(year);
    },
    // 正则验证去除时间(yyyy-mm-dd hh:mm:ss  -->  yyyy-mm-dd)  2019-09-08 14:20:20  -->  2019-09-08
    getChangeDate(date) {
      return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
        ? /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)[0]
        : "";
    },
    // 提交
    submitForm(formName, namestate) {
      if (!this.isAuxFlag) {
        this.$message.error("请检查您的附件清单信息是否上传完整！");
        return;
      }
      let LandbasicInfo = this.$store.state.LandbasicInfo;
      for (let item in LandbasicInfo) {
        LandbasicInfo[item] = this.landBasicInfoForm[item];
      }
      this.landBasicInfoForm.cityLevel =
        this.landBasicInfoForm.cantonProvinceName +
        ">" +
        this.landBasicInfoForm.cantonCityName +
        ">" +
        this.landBasicInfoForm.cantonAreaName;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let entrustland = Object.assign(
            this.$store.state.contract,
            this.landBasicInfoForm
          );
          //						this.$axios.get((token = localStorage.getItem("token")));
          let token = localStorage.getItem("token");
          var procDefKey = "transaction_filing"; //启动流程类型
          let businessType = "contract";
          var jsonVar = "";
          let that = this;
          //获取启动节点信息
          // this.$axios.post(
          // 	"/epf-activiti/act/task/getPvmNextNodeId",
          // 	qs.stringify({
          // 		token: token,
          // 		nodeId: "start",
          // 		procDefKey: procDefKey,
          // 		orgId: this.landBasicInfoForm.tradingInstitutionsID,
          // 		businessType: businessType
          // 	}),
          // 	res => {
          // 		if(res.code != "0") {
          // 			this.$message.error(res.msg);
          // 		}
          // 		jsonVar =
          // 			"{NAME_" +
          // 			res.nodes[0].nodeId +
          // 			":'" +
          // 			res.nodes[0].excutionUser +
          // 			"',procDefKey:'" +
          // 			procDefKey +
          // 			"',businessType:'" +
          // 			businessType +
          // 			"'}";
          // 		that.landBasicInfoForm.jsonVars = jsonVar;

          // 		//								添加关联信息Id
          // 		this.landBasicInfoForm.relevanceId = this.$route.query.landId;

          // 		let objFile = Object.assign(
          // 			this.$store.state.contract,
          // 			this.$store.state.LandbasicInfo ?
          // 			this.$store.state.LandbasicInfo :
          // 			this.landBasicInfoForm
          // 		);

          // 		this.init(objFile);
          // 	}
          // );
          that.landBasicInfoForm.jsonVars = jsonVar;
          //添加关联信息Id
          this.landBasicInfoForm.relevanceId = this.$route.query.landId;

          let objFile = Object.assign(
            this.$store.state.contract,
            this.$store.state.LandbasicInfo
              ? this.$store.state.LandbasicInfo
              : this.landBasicInfoForm
          );
          console.log(objFile)
          this.init(objFile);
        } else {
          window.scrollTo(0, 120);
          console.log("error submit!!");
          this.$message.error("请检查您的信息是否填写完整");
          return false;
        }
      });
    },
    init(obj) {
      var jCode;
      axios
        .post("/api/epf-landweb/transContract/checkContract", qs.stringify(obj))
        .then(res => {
          this.saveShow = false;
          jCode = res.data.code;
          if (res.data.code == "0") {
            this.$store.state.LandbasicInfo = null;
            this.$message.success(res.data.msg);
            this.$router.push({
              path: "/OnlineContractHome/Savesuccess",
              query: {
                signRecordtype: this.$route.query.signRecordtype
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      if (jCode == "0") {
        //					判断是否需要修改地块合同网签状态
        if (
          this.$route.query.transactype == "自行交易" &&
          this.$route.query.landId
        ) {
          console.log("自行交易-是");
          axios
            .post(
              "/api/epf-landweb/admin/tsell/updateContractNetSignStatusByTsellId",
              qs.stringify({
                id: this.$route.query.landId,
                status: 1
              })
            )
            .then(res => {
              if (res.data.code == "0") {
                //            this.$message.success(res.data.msg);
              }
            });
        } else if (
          this.$route.query.transactype == "委托交易" &&
          this.$route.query.landId
        ) {
          console.log("委托交易-是");
          axios
            .post(
              "/api/epf-landweb/landweb/transgoods/updateContractNetSignStatusByGoodsId",
              qs.stringify({
                id: this.$route.query.landId,
                status: 1
              })
            )
            .then(res => {
              if (res.data.code == "0") {
                //            this.$message.success(res.data.msg);
              }
            });
        }
      }
      obj.contractStatus = this.$route.query.contractStatus;
      this.getShow = true;
      this.saveShow = true;
    },
    // 保存
    saveForm(formName) {
      //				判断上一步甲方是否选择营业执照
      if (this.$route.query.firstIdentificationType == "business_license") {
        this.landBasicInfoForm.firstIdentificationType = "business_license";
        this.landBasicInfoForm.firstIdentificationTypeName = "营业执照";
      } else {
        this.landBasicInfoForm.firstIdentificationType = "card_id";
        this.landBasicInfoForm.firstIdentificationTypeName = "身份证";
      }
      this.landBasicInfoForm.firstParty = this.$route.query.firstParty;
      this.landBasicInfoForm.firstIdentificationNum = this.$route.query.firstIdentificationNum;
      this.landBasicInfoForm.firstLegalPerson = this.$route.query.firstLegalPerson;
      this.landBasicInfoForm.firstLegalPersonIdNum = this.$route.query.firstLegalPersonIdNum;
      this.landBasicInfoForm.firstAgentPerson = this.$route.query.firstAgentPerson;
      this.landBasicInfoForm.firstAgentPersonIdNum = this.$route.query.firstAgentPersonIdNum;
      this.landBasicInfoForm.firstPhone = this.$route.query.firstPhone;
      this.landBasicInfoForm.firstAddress = this.$route.query.firstAddress;

      //				判断上一步乙方是否选择营业执照
      if (this.$route.query.secondIdentificationType == "business_license") {
        this.landBasicInfoForm.secondIdentificationType = "business_license";
        this.landBasicInfoForm.secondIdentificationTypeName = "营业执照";
      } else {
        this.landBasicInfoForm.secondIdentificationType = "card_id";
        this.landBasicInfoForm.secondIdentificationTypeName = "身份证";
      }
      this.landBasicInfoForm.secondParty = this.$route.query.secondParty;
      this.landBasicInfoForm.secondIdentificationNum = this.$route.query.secondIdentificationNum;
      this.landBasicInfoForm.secondLegalPerson = this.$route.query.secondLegalPerson;
      this.landBasicInfoForm.secondLegalPersonIdNum = this.$route.query.secondLegalPersonIdNum;
      this.landBasicInfoForm.secondAgentPerson = this.$route.query.secondAgentPerson;
      this.landBasicInfoForm.secondAgentPersonIdNum = this.$route.query.secondAgentPersonIdNum;
      this.landBasicInfoForm.secondPhone = this.$route.query.secondPhone;
      this.landBasicInfoForm.secondAddress = this.$route.query.secondAddress;

      let objFile = Object.assign(this.$store.state.contract,this.$store.state.LandbasicInfo? this.$store.state.LandbasicInfo: this.landBasicInfoForm);
      if (!this.isAuxFlag) {
        this.$message.error("请检查您的附件清单信息是否上传完整！");
        return;
      }
      let LandbasicInfo = this.$store.state.LandbasicInfo;
      for (let item in LandbasicInfo) {
        LandbasicInfo[item] = this.landBasicInfoForm[item];
      }
      this.landBasicInfoForm.cityLevel = this.landBasicInfoForm.cantonProvinceName + ">" + this.landBasicInfoForm.cantonCityName + ">" + this.landBasicInfoForm.cantonAreaName;
      //				添加关联信息Id
      this.landBasicInfoForm.relevanceId = this.$route.query.landId;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //执行自己的方法，后台判断启动与否
          let objFile = Object.assign(this.$store.state.contract,this.$store.state.LandbasicInfo? this.$store.state.LandbasicInfo: this.landBasicInfoForm);
          objFile.contractStatus = this.$route.query.contractStatus;
          this.init1(objFile);
          console.log("===========objFile============",objFile)
        } else {
          window.scrollTo(0, 120);
          console.log("error submit!!");
          this.$message.error("请检查您的信息是否填写完整");
          return false;
        }
      });
    },
    init1(obj) {
      console.log("===========obj============",obj)
      var jCode;
      axios
        .post("/api/epf-landweb/transContract/save", qs.stringify(obj))
        .then(res => {
          jCode = res.data.code;
          if (res.data.code == "0") {
            this.$store.state.LandbasicInfo = null;
            this.$message.success(res.data.msg);
            this.$router.push({
              path: "/OnlineContractHome/Savedraft",
              query: {
                signRecordtype: this.$route.query.signRecordtype
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      if (jCode == "0") {
        //判断是否需要修改地块合同网签状态
        if (
          this.$route.query.transactype == "自行交易" &&
          this.$route.query.landId
        ) {
          console.log("自行交易-是");
          axios
            .post(
              "/api/epf-landweb/admin/tsell/updateContractNetSignStatusByTsellId",
              qs.stringify({
                token: localStorage.getItem("token"),
                id: this.$route.query.landId,
                status: 1
              })
            )
            .then(res => {
              if (res.data.code == "0") {
                //            this.$message.success(res.data.msg);
              }
            });
        } else if (
          this.$route.query.transactype == "委托交易" &&
          this.$route.query.landId
        ) {
          console.log("委托交易-是");
          axios
            .post(
              "/api/epf-landweb/landweb/transgoods/updateContractNetSignStatusByGoodsId",
              qs.stringify({
                id: this.$route.query.landId,
                status: 1
              })
            )
            .then(res => {
              if (res.data.code == "0") {
              }
            });
        }
      }
      this.getShow = true;
      this.saveShow = true;
    },
    // 查询交易中心
    getOrgTreeForTree() {
      var cantonProvince = this.landBasicInfoForm.provincialCode ? this.landBasicInfoForm.provincialCode : this.landBasicInfoForm.cantonProvince;
      var cantonCity = this.landBasicInfoForm.cityCode ? this.landBasicInfoForm.cityCode : this.landBasicInfoForm.cantonCity;
      var cantonArea = this.landBasicInfoForm.cantonCode ? this.landBasicInfoForm.cantonCode : this.landBasicInfoForm.cantonArea;
      this.areaCode = cantonArea;
      this.$axios.get(
        "/epf-landweb/landweb/sysenterprise/listSysEnterpriseByArea",
        {
          cantonProvince: cantonProvince,
          cantonCity: cantonCity,
          cantonArea: cantonArea
        },
        res => {
          if (res.code == 0) {
            this.orgs = res.enterprises;
            if(this.landBasicInfoForm.tradingInstitutionsID){
              this.orgs.map((item,index)=>{
                if(item.id == this.landBasicInfoForm.tradingInstitutionsID ){
                  this.landBasicInfoForm.tradingInstitutionsName = item.enterpriseName
                }
              })
            }
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    // 请选择地块所属行政区的交易中心
    tradGetId(dic, tradCode, event) {
      this.getOrgTreeForTree();
      this.landBasicInfoForm.tradingInstitutionsID = this.$refs[
        tradCode
      ][0].$attrs.id;
      this.landBasicInfoForm.tradingInstitutionsName = tradCode;
    },
    // 选择对应的省
    provinceSelect(dic, cantonCode, event) {
      this.landBasicInfoForm.cantonAreaName = "";
      this.landBasicInfoForm.cantonCode = "";
      this.landBasicInfoForm.cantonCityName = "";
      this.landBasicInfoForm.cityCode = "";
      this.landBasicInfoForm.provincialCode = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.dictionary.cantonCode = [];
      this.$axios.get(
        // `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`, {},
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.cityCode = res.dictionariesList;
            return;
          }
          this.dictionary.cityCode = "";
        }
      );
      this.belong = this.landBasicInfoForm.fileId;
      this.areaCode =
        this.landBasicInfoForm.provincialCode ||
        this.landBasicInfoForm.cantonProvince;
    },
    // 选择对应的市
    citySelect(dic, cityCode, event) {
      this.landBasicInfoForm.cantonCode = "";
      this.landBasicInfoForm.cantonAreaName = "";
      this.cantonCode = "";
      let pId = this.$refs[cityCode][0].$attrs.id;
      this.landBasicInfoForm.cityCode = this.$refs[
        cityCode
      ][0].$attrs.regionCode;
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        // `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`, {},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCode = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCode = "";
        }
      );
    },
    // 选择对应的区
    areaSelect(dic, cityCode, event) {
      this.landBasicInfoForm.cantonCode = this.$refs[
        cityCode
      ][0].$attrs.regionCode;
      this.getOrgTreeForTree();
    },
    // 选择对应的一级土地用途
    firstClassUseSelect(dic, firstClassUse, event) {
      this.landBasicInfoForm.secondClassUse = null;
      this.landBasicInfoForm.secondClassUseName = null;
      this.dictionary.land_use_second = null;
      let pId = this.$refs[firstClassUse][0].$attrs.id;
      this.landBasicInfoForm.firstClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;

      this.$axios.get(
        `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
        {},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.land_use_second = res.dictionariesList;
            return;
          }
          this.dictionary.land_use_second = null;
        }
      );
    },
    // 选择对应的二级土地用途
    secondClassUseSelect(dic, firstClassUse, event) {
      this.landBasicInfoForm.secondClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;
    },
    // 上一步
    back() {
      window.history.back(-1);
      this.$store.state.LandbasicInfo = this.landBasicInfoForm;
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.LandbasicInfo_warp {
  @include size(100%, 100%);
  background: #f2f1f9;
  .publishTra_main {
    @include size(1200px, auto);
    margin-bottom: 35px;
    background: #fff;
    padding-bottom: 50px;
    &_cont {
      // box-sizing: border-box;
      // @include size(1200px, auto);
      // padding: 0 50px;
      // margin: 0 auto;
      // border-bottom: solid 1px #f3f3f3;
    /deep/ .el-popover__reference .question{
      width:18px;
      height:18px;
      display: inline-block;
      vertical-align: bottom;
      background:url("../../../../../../assets/image/question-01.png") no-repeat
    }
    /deep/ .el-popover__reference:hover .question{
      background:url("../../../../../../assets/image/question-02.png") no-repeat
    }
      box-sizing: border-box;
      @include size(1104px, auto);
      margin: 0 auto;
      p {
        margin: 18px 0 18px 24px;
        color: #999999;
      }
    }
    &_cont_last {
      border: none;
    }
    .operation {
      @include size(50%, auto);
      margin-left: -50px;
    }
  }
}

.publishTra_main_cont .el-upload-list {
  display: none !important;
}

.el-upload-list {
  display: none !important;
}
</style>
<style>
.clearMargin .el-form-item__content {
  margin-left: 10px !important;
}

.upLoadHidden .el-upload-list {
  display: none !important;
}
</style>
