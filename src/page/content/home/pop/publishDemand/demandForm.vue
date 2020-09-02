<template>
  <div class="PublishTransfer_wrap">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="publishTra_wrap">
        <div class="publishTra_main">
          <epf-switchTitle
            :titles_h="title"
            padding="0px"
            background="#fff"
            height="80px"
            :shutOff="false"
          ></epf-switchTitle>
          <div class="publishTra_main_cont">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="204px"
              class="demo-ruleForm"
              v-if="dicFinsh"
            >
              <el-form-item label="需求类型：" prop="demand">
                <el-select
                  :disabled="disabledType == 'true' ? true : false"
                  v-model="ruleForm.demand"
                  placeholder="请选择需求类型"
                >
                  <el-option label="求租" value="need_rent"></el-option>
                  <el-option label="求购" value="need_buy"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标题：" prop="title">
                <el-input
                  v-model="ruleForm.title"
                  style="width:491px;"
                  placeholder="请输入标题，30字以内..."
                ></el-input>
              </el-form-item>
              <div style="display: flex;flex-direction: row;">
                <el-form-item
                  label="所属行政区："
                  prop="cantonProvince"
                  style="width:432px;display: inline-block"
                >
                  <el-select
                    v-model="ruleForm.cantonProvinceName"
                    placeholder="请选择土地所在省"
                    @change="
                      provinceSelect(
                        dictionary.administrative_regions,
                        ruleForm.cantonProvinceName,
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
                  prop="cantonCity"
                  class="canton_Regions"
                  style="display: inline-block"
                >
                  <el-select
                    v-model="ruleForm.cantonCityName"
                    placeholder="请选择所在市"
                    @change="
                      citySelect(
                        dictionary.cantonCity,
                        ruleForm.cantonCityName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.cantonCity"
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
                  prop="cantonArea"
                  class="canton_Regions"
                  style="display: inline-block"
                >
                  <el-select
                    v-model="ruleForm.cantonAreaName"
                    placeholder="请选择所在区/县"
                    @change="
                      areaSelect(
                        dictionary.cantonAreaName,
                        ruleForm.cantonAreaName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.cantonArea"
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
              <div style="display: flex;flex-direction: row;">
                <el-form-item
                  label="土地用途："
                  prop="firstClassUse"
                  style="width:432px;display: inline-block"
                >
                  <el-select
                    v-model="ruleForm.firstClassUseName"
                    placeholder="请选择土地一级用途"
                    @change="
                      firstClassUseSelect(
                        dictionary.land_use,
                        ruleForm.firstClassUseName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.land_use"
                      :ref="item.zhCn"
                      :dictKey="item.dictKey"
                      :id="item.id"
                      :label="item.zhCn"
                      :value="item.zhCn"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  prop="secondClassUse"
                  class="canton_Regions"
                  style="display: inline-block"
                >
                  <el-select
                    v-model="ruleForm.secondClassUseName"
                    placeholder="请选择土地二级用途"
                    @change="
                      secondClassUseSelect(
                        dictionary.land_use_second,
                        ruleForm.secondClassUseName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="(item, index) in dictionary.land_use_second"
                      :ref="item.zhCn"
                      :label="item.zhCn"
                      :dictKey="item.dictKey"
                      :value="item.zhCn"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="土地位置：" prop="location">
                <el-input
                  v-model="ruleForm.location"
                  placeholder="请输入土地位置，例如：山西省太原市小店区荣军街112号"
                  style="width:491px;"
                ></el-input>
              </el-form-item>
              <div style="display: flex;flex-direction: row;">
                <el-form-item label="土地面积：" prop="area" style="width:482px;display: inline-block">
                  <el-input
                    v-model="ruleForm.area"
                    placeholder="请输入需求面积最小值，例如：1000.02"
                  ></el-input>
                </el-form-item>
                <span style="line-height:40px;margin:0 20px;">--</span>
                <el-form-item prop="areaMax" label-width="0"  style="display: inline-block">
                  <el-input
                    v-model="ruleForm.areaMax"
                    style="width:300px;"
                    placeholder="请输入需求面积最大值，例如：1000.02"
                  ></el-input>
                </el-form-item>
                <span style="line-height:40px;margin:0 20px;">平方米</span>
              </div>

              <el-form-item label="使用时间：">
                <!-- <el-col :span="11"  style="width: 226px;">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择起始日期" v-model="ruleForm.useBeginDate"></el-date-picker>
                </el-col>
                  <el-col class="line" :span="2"   style="width: 45px;text-align: center;">-</el-col>
                <el-col :span="11"  style="width: 226px;">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择截止日期" v-model="ruleForm.useEndDate"></el-date-picker>
                </el-col>-->
                <el-date-picker
                  v-model="useDate"
                  type="datetimerange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="起始日期"
                  end-placeholder="截止日期"
                  @change="selectDatarange"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="使用年限：" prop="years">
                <el-input
                  v-model="ruleForm.years"
                  placeholder="请输入土地剩余使用年限，例如：2.5"
                  style="width:491px;"
                ></el-input>
                <span style="margin-left:30px;">年</span>
              </el-form-item>
              <el-form-item label="意向价格：" prop="price">
                <el-input
                  v-model="ruleForm.price"
                  placeholder="请输入意向价格，例如输入10000"
                  style="width:491px;"
                ></el-input>
                <span style="margin-left:30px;">元</span>
              </el-form-item>
              <el-form-item label="联系人：" prop="contact">
                <el-input
                  v-model="ruleForm.contact"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系手机：" prop="phone">
                <el-input
                  v-model="ruleForm.phone"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人联系电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系地址：" prop="address">
                <el-input
                  v-model="ruleForm.address"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人联系地址"
                ></el-input>
              </el-form-item>
              <el-form-item label="需求说明：" prop="remark">
                <el-input
                  type="textarea"
                  v-model="ruleForm.remark"
                  placeholder="可针对土地的其他信息进行补充说明"
                  style="width:700px;height:108px;"
                  maxlength="2000"
                  minlength="0"
                  show-word-limit
                  autosize
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div
                  v-show="!subLoading"
                  class="epf_btn epf_btn_bg"
                  style="width:82px;"
                  @click="submitLand('ruleForm', 'submit')"
                >
                  提交
                </div>
                <div
                  v-show="subLoading"
                  class="epf_btn epf_btn_bg"
                  style="width:82px;"
                >
                  <i class="el-icon-loading"></i>
                </div>
                <div
                  v-show="!subLoading2"
                  class="epf_btn epf_btn_def"
                  style="width:82px;"
                  @click="submitLand('ruleForm', 'save')"
                >
                  保存
                </div>
                <div
                  v-show="subLoading2"
                  class="epf_btn epf_btn_def"
                  style="width:82px;"
                >
                  <i class="el-icon-loading"></i>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  data() {
    let area = (rule, value, callback) => {
      if (this.ruleForm.area && this.ruleForm.areaMax) {
        this.$refs["ruleForm"].validateField("areaMax");
      }
      callback();
    };
    let areaMax = (rule, value, callback) => {
      if (
        this.ruleForm.areaMax &&
        Number(this.ruleForm.area) - Number(this.ruleForm.areaMax) > 0
      ) {
        callback(new Error("最大值不能小于最小值!"));
      } else {
        callback();
      }
    };
    return {
      location: [
        { path: "/", name: "首页" },
        { path: null, name: "发布需求" }
      ],
      disabledType: true, //流转方式是否禁用
      demandtype: null,
      active: 0,
      isShowProvince: true,
      dialogImageUrl: "",
      dialogVisible: false,
      pickerOptions: {
        //日期范围快速选择配置
        shortcuts: [
          {
            text: "三 年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              //end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 3);
              end.setMonth(start.getMonth() + 36);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "五 年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 5);
              end.setMonth(start.getMonth() + 60);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "十 年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              //end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 10);
              end.setMonth(start.getMonth() + 120);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        //   需求类型：
        demand: "",
        //标题：
        title: "",
        //省
        cantonProvince: "",
        cantonProvinceName: "",
        //市
        cantonCity: "",
        cantonCityName: "",
        //区
        cantonArea: "",
        cantonAreaName: "",
        // 土地一级用途
        firstClassUse: "",
        firstClassUseName: "",
        // 土地二级用途
        secondClassUse: "",
        secondClassUseName: "",
        location: "",
        area: "", //最小
        areaMax: "", //最大
        useBeginDate: "",
        useEndDate: "",
        years: "",
        price: "",
        contact: "",
        phone: "",
        address: "",
        remark: "",
        status: ""
      },
      useDate: [], //日期范围
      goodsData: {},
      rules: {
        demand: [
          {
            required: true,
            message: "",
            trigger: "blur",
            message: "请选择需求类型"
          }
        ],
        title: [
          { required: true, message: "请输入标题" },
          {
            validator: (rule, value, callback) => {
              this.validateNum(
                rule,
                value,
                callback,
                15,
                60,
                "15到60个字符之间"
              );
            }
          },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5\,，\-\—\、\]\[\【】()（）]+$/,
            message:
              "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        cantonProvince: [
          { required: true, message: "请选择土地所在省", trigger: "change" }
        ],
        cantonCity: [
          { required: true, message: "请选择土地所在市", trigger: "change" }
        ],
        cantonArea: [
          { required: true, message: "请选择土地所在区", trigger: "change" }
        ],
        firstClassUse: [
          { required: true, message: "请选择一级土地用途", trigger: "change" }
        ],
        secondClassUse: [
          { required: true, message: "请选择二级土地用途", trigger: "change" }
        ],
        location: [
          { required: true, message: "请输入土地位置" },
          {
            validator: (rule, value, callback) => {
              this.validateNum(
                rule,
                value,
                callback,
                0,
                100,
                "长度在100字符以内（注意若是汉字，1个汉字是2个字符）"
              );
            }
          },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        area: [
          { required: true, message: "请输入面积" },
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "面积输入数字超出最长限度"
          }
        ],
        areaMax: [
          { required: true, message: "请输入面积" },
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "面积输入数字超出最长限度"
          },
          {
            validator: areaMax,
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入电话号码" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            message: "您输入的格式有误，例：18569693322或0351-6336221"
          }
        ],
        contact: [
          { required: true, message: "请输入联系人姓名" },
          {
            validator: (rule, value, callback) => {
              this.validateNum(
                rule,
                value,
                callback,
                0,
                100,
                "长度在100字符以内（注意若是汉字，1个汉字是2个字符）"
              );
            }
          },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        years: [
          { min: 1, max: 15, message: "长度在 1 到 15个字符" },
          {
            pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
            message: "使用年限年限必须是大于0的数,且最多两位小数"
          }
        ],
        // price: [
        //   {
        //     pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
        //     message: "意向价格有误,必须是大于0的数,最多两位小数."
        //   }
        // ],
        price: [
          {
            pattern: /^[1-9]\d*$/,
            message: "意向价格有误,请输入整数"
          }
        ],
        address: [
          {
            validator: (rule, value, callback) => {
              this.validateNum(
                rule,
                value,
                callback,
                0,
                100,
                "长度在100字符以内（注意若是汉字，1个汉字是2个字符）"
              );
            }
          },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        remark: [
          // { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,2000,'长度在2000字符以内（注意若是汉字，1个汉字是2个字符）')}  },
        ]
      },
      landUse1Data: [],
      landUse2Data: [],
      province: [],
      city: [],
      area: [],
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
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      subLoading: false,
      subLoading2: false,
      title: "发布需求"
    };
  },
  created() {
    if (this.$route.query.demandType) {
      this.location[1].name = "变更需求";
    }
    if (this.$route.query.demandChage) {
      this.title = "变更需求";
    }
    window.scrollTo(0, 120);
    if (
      this.$route.query.disabledType == false ||
      this.$route.query.disabledType == "false"
    ) {
      //是否禁用流转方式下拉选择
      this.disabledType = this.$route.query.disabledType;
    } else {
      this.disabledType = "true";
    }
    console.log(this.disabledType == "true");
    this._resetGoodsData();
    if (this.$route.query.demand) {
      // function getChangeDate(date) {
      // 	return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date) ?
      // 		/\d{4}-\d{1,2}-\d{1,2}/g.exec(date)[0] :
      // 		"";
      // }
      function getChangeDate(date) {
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()
        );
      }
      this.$axios.get(
        "/epf-landweb/tpurchase/getTPurchase",
        { id: this.$route.query.demand },
        res => {
          if (
            res.tPurchase.useBeginDate == null &&
            res.tPurchase.useEndDate == null
          ) {
            this.useDate[0] == "";
            this.useDate[1] == "";
          } else {
            res.tPurchase.useBeginDate = getChangeDate(
              new Date(res.tPurchase.useBeginDate)
            );
            res.tPurchase.useEndDate = getChangeDate(
              new Date(res.tPurchase.useEndDate)
            );
            console.log(
              "ffffff烦烦烦烦烦烦乏味威风威风",
              res.tPurchase.useBeginDate
            );
            this.useDate[0] = res.tPurchase.useBeginDate;
            this.useDate[1] = res.tPurchase.useEndDate;
            this.$nextTick(() => {
              this.$set(this.useDate, "time", [
                res.tPurchase.useBeginDate,
                res.tPurchase.useEndDate
              ]);
            });
          }

          res.tPurchase.years = res.tPurchase.years
            ? res.tPurchase.years.toString()
            : null;
          res.tPurchase.price = res.tPurchase.price
            ? res.tPurchase.price.toString()
            : null;
          res.tPurchase.area = res.tPurchase.area
            ? res.tPurchase.area.toString()
            : null;
          this.ruleForm = res.tPurchase;
          if (res.tPurchase.insertTime) {
            delete res.tPurchase.insertTime;
          }
          if (res.tPurchase.insertUser) {
            delete res.tPurchase.insertUser;
          }
          console.log(
            "表单回显",
            this.ruleForm,
            this.useDate,
            typeof this.useDate[0]
          );
        }
      );
    }

    if (Number(this.$route.query.demandtype) === 1) {
      this.ruleForm.demand = "need_buy";
    } else if (Number(this.$route.query.demandtype) === 2) {
      this.ruleForm.demand = "need_rent";
    }

    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: "0" },
            res => {
              resolve(res);
            }
          );
        } else if (item == "administrative_regions") {
          this.$axios.get(
            `/epf-cms/regionals/getAreaByCodeOrParentId`,
            { parentId: "000000" },
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
        // console.log(item);
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
  },
  methods: {
    firstClassUseSelect(dic, firstClassUse, event) {
      this.ruleForm.secondClassUse = "";
      this.ruleForm.secondClassUseName = "";
      this.dictionary.land_use_second = "";
      let pId = this.$refs[firstClassUse][0].$attrs.id;
      this.ruleForm.firstClassUse = this.$refs[firstClassUse][0].$attrs.dictKey;
      this.$axios.get(
        `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
        {},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.land_use_second = res.dictionariesList;
            return;
          }
          this.dictionary.land_use_second = "";
        }
      );
    },
    secondClassUseSelect(dic, firstClassUse, event) {
      this.ruleForm.secondClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;
    },
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      this.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.ruleForm.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;
      this.dictionary.cantonArea = [];
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        }
      );
    },
    citySelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonAreaName = "";
      this.cantonArea = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonArea = res.dictionariesList;
            return;
          }
          this.dictionary.cantonArea = "";
        }
      );
    },
    areaSelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },
    _resetGoodsData() {
      this.goodsData = Object.assign({}, this.ruleForm);
    },
    onSelected(data) {
      this.ruleForm.cantonProvince = data.province.value;
      this.ruleForm.cantonCity = data.city.value;
      this.ruleForm.cantonArea = data.area.value;
    },
    toAddress() {
      this.mask = true;

      this.addInp = true;
    },
    selected(data) {
      this.mask = false;

      this.addInp = false;

      this.city =
        data.province.value + " " + data.city.value + " " + data.area.value;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    submitLand(formName, name) {
      console.log(formName, name);
      console.log(this.ruleForm);
      // if(this.subLoading || this.subLoading2){return}
      if (name == "submit") {
        this.subLoading = true;
        this.ruleForm["status"] = "published";
      } else if (name == "save") {
        this.subLoading2 = true;
        this.ruleForm["status"] = "draft";
      }
      this.ruleForm["updateTime"] = "";
      const publishLand = this.ruleForm;
      console.log(publishLand);
      //提交表单
      console.log(this.$refs[formName].validate);

      this.$refs[formName].validate(valid => {
        console.log(valid);
        
        if (valid) {
            this.subLoading1 = true;
          let url = "/epf-landweb/admin/tpurchase/addTPurchase";
          if (this.$route.query.demand) {
            this.subLoading2 = true;
            url = "/epf-landweb/admin/tpurchase/editTPurchase";
          }
          this.$axios.post(url, qs.stringify(publishLand), res => {
            if (res.code == "0") {
              
              this.$store.state.publishLand = {};
              if (name == "submit") {
                this.subLoading = false;
                this.$message({ message: "提交成功", type: "success" });
              } else if (name == "save") {
                this.subLoading2 = true;
                this.$message({ message: "保存成功", type: "success" });
              }
              this.$router.push({ path: "/PersonalCenter/demandRegister" });
              return;
            }
            this.$message.error(res.msg);
          });
        } else {
          window.scrollTo(0, 120);
          this.$message.error("请确保信息填写正确");
          this.subLoading = false;
          this.subLoading2 = true;
          return;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    selectDatarange() {
      //选择日期范围后的回调
      if (this.useDate == null) {
        this.useDate = [];
      }
      this.ruleForm.useBeginDate = this.useDate[0];
      this.ruleForm.useEndDate = this.useDate[1];
    },
    setSelectData(provinceData) {
      //确保市选项不为空
      if (this.ruleForm.cantonProvinceName) {
        for (
          let i = 0;
          i < this.dictionary.administrative_regions.length;
          i++
        ) {
          if (
            this.dictionary.administrative_regions[i].zhCn ==
            this.ruleForm.cantonProvinceName
          ) {
            this.$axios.get(
              `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${this.dictionary.administrative_regions[i].id}`,
              {},
              res => {
                if (res.dictionariesList.length != 0) {
                  this.dictionary.cantonCity = res.dictionariesList;
                  //确保区不为空
                  for (let i = 0; i < res.dictionariesList.length; i++) {
                    if (
                      res.dictionariesList[i].zhCn ==
                      this.ruleForm.cantonCityName
                    ) {
                      this.$axios.get(
                        `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${res.dictionariesList[i].id}`,
                        {},
                        res => {
                          console.log(res);
                          if (res.dictionariesList.length != 0) {
                            this.dictionary.cantonArea = res.dictionariesList;
                          }
                        }
                      );
                    }
                  }
                }
              }
            );
          }
        }
      }

      if (this.ruleForm.firstClassUseName) {
        console.log(this.ruleForm.firstClassUseName);
        for (let i = 0; i < this.dictionary.land_use.length; i++) {
          console.log(this.dictionary.land_use[i]);
          if (
            this.dictionary.land_use[i].zhCn == this.ruleForm.firstClassUseName
          ) {
            this.$axios.get(
              `/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${this.dictionary.land_use[i].id}`,
              {},
              res => {
                console.log("结果", res);
                if (res.dictionariesList.length != 0) {
                  this.dictionary.land_use_second = res.dictionariesList;
                }
              }
            );
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.PublishTransfer_wrap {
  @include size(100%, auto);
  background: #f2f1f9;
  .publishTra_wrap {
    @include size(100%, auto);
    .publishTra_main {
      @include size(1200px, auto);
      margin-bottom: 25px;
      background: #fff;
      &_cont {
        box-sizing: border-box;
        padding: 0px 120px 30px 120px;
      }
    }
  }
}
</style>
<style>
.canton_Regions > .el-form-item__content {
  margin-left: 5px !important;
}
</style>
