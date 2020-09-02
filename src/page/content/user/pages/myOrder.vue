<!--wodedkdj-->
<template>
  <!-- 我的订单 -->
  <div>
    <el-tabs class="tabBox" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="土地转让订单" name="first">
        <epf-filter>
          <div
            class="epf_height_act"
            :style="{ height: switchHeight + 'px', overflow: 'hidden' }"
          >
            <el-row :gutter="2">
              <el-col :span="3">
                <span class="epf_form_title">标的编号 :</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  size="small"
                  v-model="title"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">标的状态 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.transStatusName"
                  placeholder="请选择标地状态"
                  @change="
                    transStatusSelect(
                      dictionary.trans_status,
                      ruleForm.transStatusName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in dictionary.trans_status"
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
                <div
                  class="epf_btn epf_btn_bg epf_not_margin"
                  @click="searchData"
                >
                  查询
                </div>
                <div class="epf_btn epf_btn_def" @click="resetFilterInfo">
                  重置
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">申请状态 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.statusName"
                  placeholder="请选择申请状态"
                  @change="
                    statusSelect(
                      dictionary.license_status,
                      ruleForm.statusName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in dictionary.license_status"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.dictKey"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">交易方式 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.transType"
                  placeholder="请选择交易方式"
                >
                  <el-option
                    v-for="item in transTypeList"
                    :id="item.id"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="3">
                <span class="epf_form_title">申请时间 :</span>
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  class="filterDateSelecet"
                  v-model="ruleForm.beginDate"
                  clearable
                  size="small"
                  type="date"
                  placeholder="请选择开始时间"
                ></el-date-picker>
              </el-col>
              <el-col :span="1">
                <span
                  class="epf_form_title"
                  style="padding:0px;text-align:center;"
                  >--</span
                >
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  class="filterDateSelecet"
                  v-model="ruleForm.endDateStr"
                  clearable
                  size="small"
                  type="date"
                  placeholder="请选择结束时间"
                ></el-date-picker>
              </el-col>
            </el-row>
          </div>
          <div style="height:20px;">
            <span class="flexibleSwitch" @click="flexSwitch">
              {{ flexibleOpen ? "收起搜索" : "高级搜索" }}
              <i
                :class="
                  flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                "
              ></i>
            </span>
          </div>
        </epf-filter>
        <!-- 土地转让订单 -->
        <epf-customTable
          :data="tableContentData"
          :config="config"
          tableTpe="order"
          v-loading="loading"
          element-loading-text="拼命加载中..."
        >
          <template v-slot:img="scope">
            <epf-column slot="img">
              <div class="modeMsg">
                <el-row class="box">
                  <el-col :span="10">
                    <img
                      alt
                      v-lazy="baseUrl + scope.row.img"
                      class="defImage"
                    />
                  </el-col>
                  <el-col :span="14" class="content">
                    <div
                      @click="showDetail(scope.row)"
                      class="tc_info_title hoverStyle"
                      style="color:#4573d6"
                    >
                      {{ scope.row.targetNo }}
                    </div>
                    <div class="orderType" style="width:80px;">
                      <span>{{ scope.row.transStatusName }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </epf-column>
          </template>
          <template v-slot:licenseNo="scope">
            <epf-column slot="licenseNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{ scope.row.transTypeName }}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:transTypeName="scope">
            <epf-column slot="transTypeName">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{
                  scope.row.licenseStatusName
                }}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:isMainuser="scope">
            <epf-column slot="isMainuser">
              <div class="epf_btn_flex">
                <span>
                  <!-- 申请详情 -->
                  <p
                    @click="sureBid(scope.row, '1')"
                    v-if="
                      (scope.row.licenseStatus === 'license_status-002' &&
                        scope.row.isMainuser == 0) ||
                        scope.row.licenseStatus === 'license_status-003' ||
                        scope.row.licenseStatus === 'license_status-004' ||
                        scope.row.licenseStatus === 'license_status-005' ||
                        scope.row.licenseStatus === 'license_status-006' ||
                        scope.row.licenseStatus === 'license_status-013' ||
                        scope.row.licenseStatus === 'license_status-014'
                    "
                   >
                    <el-button size="small">申请详情</el-button>
                  </p>
                  <!-- 竞价记录 -->
                  <p  v-if="
                          scope.row.licenseStatus == 'license_status-008' ||
                          scope.row.licenseStatus == 'license_status-009' ||
                          scope.row.licenseStatus == 'license_status-010' ||
                          scope.row.licenseStatus == 'license_status-012'
                          "
                          @click="bidrecord(scope.row)">
                    <el-button size="small">竞价记录</el-button>
                  </p>
                  <!-- 流拍原因 -->
                  <p v-if="scope.row.transStatus == 'trans_status-006'">
                    <el-popover
                      placement="bottom"
                      width="300"
                      trigger="hover"
                    >
                      <el-container>
                        <el-header style="height:30px;font-weight: bold;">
                          <div class="headerpop">查看流拍原因</div>
                        </el-header>
                        <el-container
                          style="border-top:1px solid rgb(243,243,243); padding:20px;"
                        >
                          <el-aside
                            width="70px"
                            style="color:rgb(254,63,68);"
                            >流拍原因：</el-aside
                          >
                          <el-main style="padding:0;">{{
                            scope.row.flowPattingReason
                          }}</el-main>
                        </el-container>
                      </el-container>
                      <el-button slot="reference" type="text" size="small"
                        >查看流拍原因</el-button
                      >
                    </el-popover>
                  </p>
                  <!-- 成交确认书 -->
                  <p  v-if="scope.row.transCertificateInfo && scope.row.transCertificateInfo.isBargain==0 && scope.row.licenseStatus != 'license_status-011'" style="height:25px;color:#666">
                    <span class="hoverStyle"  @click="notice(scope.row)">成交确认书</span>
                  </p>

                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="margin-left:40px;">
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isBidder==0" @click="bidsBooks(scope.row)">竞买申请书</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isQualifuation==0 && scope.row.licenseStatus != 'license_status-011'" @click="qualificationsSure(scope.row)">资格确认书</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isResidue==0 && scope.row.licenseStatus != 'license_status-011'" @click="dealtradeServiceSure(scope.row)">成交款缴费通知书</p>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isGoverns==0 && scope.row.licenseStatus != 'license_status-011'" @click="showIncluded(scope.row)" >竞得入选通知书</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span v-if="scope.row.transCertificateInfo" v-for="(value, index) in scope.row.transCertificateInfo.transGoodsVoInfoList">
                          <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isFund==0 && scope.row.licenseStatus != 'license_status-011'" @click="toFundTrusteeship(scope.row,index)">资金托管协议{{index+1}}</p>
                        </span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.licenseStatus === 'license_status-001'"  @click="reapply(scope.row, '0')">继续申请</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.licenseStatus === 'license_status-001'"  @click="delOrder(scope.row)">删除</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                      <p style="margin-top:10px"
                          v-if="
                            scope.row.licenseStatus === 'license_status-002' &&
                              scope.row.isMainuser == 1
                          "
                          @click="sureBid(scope.row, '8')"
                      >竞买确认</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                            v-if="
                              scope.row.licenseStatus === 'license_status-005' ||
                              ( scope.row.licenseStatus =='license_status-003' &&
                                scope.row.isMainuser == 0)
                            "
                            @click="reapply(scope.row, '2')"
                        >重新申请</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                            v-if="
                              scope.row.licenseStatus === 'license_status-006' ||
                                scope.row.licenseStatus == 'license_status-014'
                            "
                            @click="viewpayInfo(scope.row)"
                        >查看保证金交款信息</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                            v-if="
                              scope.row.licenseStatus === 'license_status-008' &&
                                scope.row.isMainuser == 0
                            "
                            @click="centerPrice(scope.row)"
                        >我要报价</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                            v-if="
                              scope.row.licenseStatus == 'license_status-008' &&
                                scope.row.isMainuser == 1
                            "
                        >查看交易直播</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                            v-if="
                              (scope.row.licenseStatus == 'license_status-009' || scope.row.licenseStatus == 'license_status-010') &&
                                scope.row.transStatus == 'trans_status-008'
                            "
                            @click="publicnotice(scope.row)"
                        >查看公示</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span
                          v-if="scope.row.licenseStatus == 'license_status-005' || scope.row.auditFailure == 1"
                        >
                          <el-popover
                            placement="bottom"
                            width="540"
                            trigger="hover"
                          >
                            <el-container>
                              <el-header style="height:30px;font-weight: bold;">
                                <div class="headerpop">查看审核失败原因</div>
                              </el-header>
                              <el-container
                                style="border-top:1px solid rgb(243,243,243); padding:20px;"
                              >
                                <el-aside
                                  width="70px"
                                  style="color:rgb(254,63,68);"
                                  >失败原因：</el-aside
                                >
                                <el-main style="padding:0;">{{
                                  auditFailure
                                }}</el-main>
                              </el-container>
                            </el-container>
                            <el-button
                              slot="reference"
                              type="text"
                              size="small"
                              @mouseover.native="addComment(scope.row, index)"
                              >查看审核意见</el-button
                            >
                          </el-popover>
                        </span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div
          v-if="tableContentData == [] || tableContentData == ''"
          class="epf_page_sile"
        >
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>

        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="土地出租订单" name="second">
        <epf-filter>
          <div
            class="epf_height_act"
            :style="{ height: switchHeight + 'px', overflow: 'hidden' }"
          >
            <el-row :gutter="2">
              <el-col :span="3">
                <span class="epf_form_title">标的编号 :</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  size="small"
                  v-model="title"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">标的状态 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.transStatusName"
                  placeholder="请选择标地状态"
                  @change="
                    transStatusSelect(
                      dictionary.trans_status,
                      ruleForm.transStatusName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in dictionary.trans_status"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.dictKey"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :offset="3" :span="4">
                <div
                  class="epf_btn epf_btn_bg epf_not_margin"
                  @click="searchData"
                >
                  查询
                </div>
                <div class="epf_btn epf_btn_def" @click="resetFilterInfo">
                  重置
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">申请状态 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.statusName"
                  placeholder="请选择申请状态"
                  @change="
                    statusSelect(
                      dictionary.license_status,
                      ruleForm.statusName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in dictionary.license_status"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.dictKey"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">交易方式 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.transType"
                  placeholder="请选择交易方式"
                >
                  <el-option
                    v-for="item in transTypeList"
                    :id="item.id"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="3">
                <span class="epf_form_title">申请时间 :</span>
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  class="filterDateSelecet"
                  v-model="ruleForm.beginDate"
                  clearable
                  size="small"
                  type="date"
                  placeholder="请选择开始时间"
                ></el-date-picker>
              </el-col>
              <el-col :span="1">
                <span
                  class="epf_form_title"
                  style="padding:0px;text-align:center;"
                  >--</span
                >
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  class="filterDateSelecet"
                  v-model="ruleForm.endDateStr"
                  clearable
                  size="small"
                  type="date"
                  placeholder="请选择结束时间"
                ></el-date-picker>
              </el-col>
            </el-row>
          </div>
          <div style="height:20px;">
            <span class="flexibleSwitch" @click="flexSwitch">
              {{ flexibleOpen ? "收起搜索" : "高级搜索" }}
              <i
                :class="
                  flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                "
              ></i>
            </span>
          </div>
        </epf-filter>
        <!-- 土地出租订单 -->

        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          tableTpe="order"
          element-loading-text="拼命加载中..."
        >
          <template v-slot:img="scope">
            <div class="modeMsg">
              <epf-column slot="img">
                <el-row class="box">
                  <el-col :span="10">
                    <img
                      alt
                      v-lazy="baseUrl + scope.row.img"
                      class="defImage"
                    />
                  </el-col>
                  <el-col :span="14" class="content">
                    <div
                      @click="showDetail(scope.row)"
                      class="tc_info_title hoverStyle"
                      style="color:#4573d6"
                    >
                      {{ scope.row.targetNo }}
                    </div>
                    <div class="orderType" style="width:80px;">
                      <span>{{ scope.row.transStatusName }}</span>
                    </div>
                  </el-col>
                </el-row>
              </epf-column>
            </div>
          </template>
          <template v-slot:transStatusName="scope">
            <epf-column slot="transStatusName">
              <div class="epf_fie_box">
                <!-- <span v-if="!item.dealOrg" class="epf_fie_lihe">{{scope.row.licenseNo}}</span> -->
                <span v-if="!scope.row.dealOrg" class="epf_fie_lihe">{{
                  scope.row.licenseNo
                }}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:licenseNo="scope">
            <epf-column slot="licenseNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{ scope.row.transTypeName }}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:transTypeName="scope">
            <epf-column slot="transTypeName">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{
                  scope.row.licenseStatusName
                }}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:isMainuser="scope">
            <div v-show="false">{{ scope.row }}</div>
            <epf-column slot="isMainuser">
              <div class="epf_btn_flex">
                <span>
                    <!-- isBidder	---	  显示竞买申请书 0-是 1-否
                          isHonour	---	显示履约保证金入账申请单 0-是 1-否
                          isQualifuation	---	显示竞买资格确认书 0-是 1-否
                          isGoverns	---	显示竞得人入选通知书 0-是 1-否
                          isBargain	---	显示成交确认书 0-是 1-否
                          isResidue	---	显示剩余成交款缴费通知书 0-是 1-否
                          isServices	---	显示交易服务费缴费通知书 0-是 1-否
                          isFund	---	显示资金托管协议 0-是 1-否 -->
                  <!-- 申请详情 -->
                  <p
                    @click="sureBid(scope.row, '1')"
                    v-if="
                      (scope.row.licenseStatus === 'license_status-002' &&
                        scope.row.isMainuser == 0) ||
                        scope.row.licenseStatus === 'license_status-003' ||
                        scope.row.licenseStatus === 'license_status-004' ||
                        scope.row.licenseStatus === 'license_status-005' ||
                        scope.row.licenseStatus === 'license_status-006' ||
                        scope.row.licenseStatus === 'license_status-013' ||
                        scope.row.licenseStatus === 'license_status-014'
                    "
                  ><span>申请详情</span></p>
                  <!-- 竞价记录 -->
                  <p>
                    <span
                      v-if="
                        scope.row.licenseStatus == 'license_status-008' ||
                          scope.row.licenseStatus == 'license_status-009' ||
                          scope.row.licenseStatus == 'license_status-010' ||
                          scope.row.licenseStatus == 'license_status-012'
                      "
                      @click="bidrecord(scope.row)"
                      ><el-button size="small">竞价记录</el-button></span
                    >
                  </p>
                  <!-- 查看流拍原因 -->
                  <p  v-if="scope.row.transStatus == 'trans_status-006'">
                    <el-popover
                      placement="bottom"
                      width="300"
                      trigger="hover"
                    >
                      <el-container>
                        <el-header style="height:30px;font-weight: bold;">
                          <div class="headerpop">查看流拍原因</div>
                        </el-header>
                        <el-container
                          style="border-top:1px solid rgb(243,243,243); padding:20px;"
                        >
                          <el-aside
                            width="70px"
                            style="color:rgb(254,63,68);"
                            >流拍原因：</el-aside
                          >
                          <el-main style="padding:0;">{{
                            scope.row.flowPattingReason
                          }}</el-main>
                        </el-container>
                      </el-container>
                      <el-button slot="reference" type="text" size="small"
                        >查看流拍原因</el-button
                      >
                    </el-popover>
                  </p>
                  <!-- isBargain -->
                    <!-- 成交确认书 -->
                  <p  v-if="scope.row.transCertificateInfo && scope.row.transCertificateInfo.isBargain==0 && scope.row.licenseStatus != 'license_status-011'" style="height:25px;color:#666">
                    <span class="hoverStyle" @click="notice(scope.row)">成交确认书</span>
                  </p>

                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link hoverStyle">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="margin-left:40px;padding:10px 20px;">
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isBidder==0" @click="bidsBooks(scope.row)">竞买申请书</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isQualifuation==0 && scope.row.licenseStatus != 'license_status-011'" @click="qualificationsSure(scope.row)">资格确认书</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isResidue==0 && scope.row.licenseStatus != 'license_status-011'" @click="dealtradeServiceSure(scope.row)">成交款缴费通知书</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span v-if="scope.row.transCertificateInfo" v-for="(value, index) in scope.row.transCertificateInfo.transGoodsVoInfoList" :key="index">
                          <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isFund==0 && scope.row.licenseStatus != 'license_status-011'" @click="toFundTrusteeship(scope.row,index)">资金托管协议{{index+1}}</p>
                        </span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.licenseStatus === 'license_status-001'" @click="reapply(scope.row, '0')">继续申请</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.licenseStatus === 'license_status-001'" @click="delOrder(scope.row)">删除</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px" v-if="scope.row.transCertificateInfo  && scope.row.transCertificateInfo.isGoverns==0 && scope.row.licenseStatus != 'license_status-011'" @click="showIncluded(scope.row)">竞得入选通知书</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                         v-if="
                            scope.row.licenseStatus === 'license_status-002' &&
                              scope.row.isMainuser == 1
                          "
                          @click="sureBid(scope.row, '8')">
                        竞买确认</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                          v-if="
                            (scope.row.licenseStatus === 'license_status-003' &&
                              scope.row.isMainuser == 0) ||
                              scope.row.licenseStatus == 'license_status-005'
                          "
                          @click="reapply(scope.row, '2')">
                        重新申请</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                          v-if="
                            scope.row.licenseStatus === 'license_status-006' ||
                              scope.row.licenseStatus == 'license_status-014'
                          "
                          @click="viewpayInfo(scope.row)">
                        查看保证金交款信息</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                            v-if="
                              scope.row.licenseStatus === 'license_status-008' &&
                                scope.row.isMainuser == 0
                            "
                            @click="centerPrice(scope.row)">
                        我要报价</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                            v-if="
                              scope.row.licenseStatus == 'license_status-008' &&
                                scope.row.isMainuser == 1
                            ">
                        查看交易直播</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p style="margin-top:10px"
                          v-if="
                            (scope.row.licenseStatus == 'license_status-009' || scope.row.licenseStatus == 'license_status-010') &&
                              scope.row.transStatus == 'trans_status-008'
                          "
                          @click="publicnotice(scope.row)">
                         查看公示</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span
                          v-if="scope.row.licenseStatus == 'license_status-005'  || scope.row.auditFailure == 1"
                        >
                          <el-popover
                            placement="bottom"
                            width="540"
                            trigger="hover"
                          >
                            <el-container>
                              <el-header style="height:30px;font-weight: bold;">
                                <div class="headerpop">查看审核失败原因</div>
                              </el-header>
                              <el-container
                                style="border-top:1px solid rgb(243,243,243); padding:20px;"
                              >
                                <el-aside
                                  width="70px"
                                  style="color:rgb(254,63,68);"
                                  >失败原因：</el-aside
                                >
                                <el-main style="padding:0;">{{
                                  auditFailure
                                }}</el-main>
                              </el-container>
                            </el-container>
                            <el-button
                              slot="reference"
                              @mouseover.native="addComment(scope.row, index)"
                              >查看审核意见</el-button
                            >
                          </el-popover>
                        </span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div
          class="epf_row_c"
          v-if="tableContentData == [] || tableContentData == ''"
         >
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
            :current-page.sync="pageNo"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 竞得入选通知书 included\transEndDetail-->
    <el-dialog
      class="companyInfo includedBox"
      width="610px"
      :visible.sync="included"
      top="10px"
      :append-to-body="true"
      :show-close="false"
     >
      <div
        style="height:690px;box-sizing:border-box;padding:20px;position: relative;"
      >
        <div class="borderImg">
          <img
            src="@/assets/image/included_border.png"
            style="width:93%;height:95%"
          />
        </div>
        <div
          style="padding:38px;position:relative;z-index:10;"
          v-if="transEndDetail"
        >
          <div id="printWinner">
            <div
              style="width:330px;text-align:center;margin:0 auto;font-size:20px;font-weight:800;"
            >
              {{
                transEndDetail.cantonCityName
              }}国有建设用地使用权二级市场竞得入选人通知确认书
            </div>
            <table width="100%" class="includedTable">
              <tr>
                <td colspan="3">
                  标的编号：
                  <span style="font-weight:800;">{{
                    transEndDetail.targetNo
                  }}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  原使用权人：
                  <span style="font-weight:800;" v-if="transEndDetail.transGoodsVoInfo">{{transEndDetail.transGoodsVoInfo.ownerShip}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  竞得入选人名称：
                  <span style="font-weight:800;">{{transEndDetail.applyName}}</span>
                </td>
              </tr>
              <tr>
                <td rowspan="2" width="30px">
                  <span style="font-weight:800;">最高报价</span>
                </td>
                <td width="80px">单价（元/平方米）</td>
                <td>
                  <p>
                    大写：
                    <span style="color:#ffa000;font-weight:800;"
                      >￥{{transEndDetail.unitPriceUp}}</span
                    >
                  </p>
                  <p>
                    小写：
                    <span style="color:#ffa000;font-weight:800;"
                      >￥{{ transEndDetail.unitPrice }}</span
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td>总价（万元）</td>
                <td>
                  <p>
                    大写：
                    <span style="color:#ffa000;font-weight:800;"
                      >￥{{ transEndDetail.totalPriceUp }}</span
                    >
                  </p>
                  <p>
                    小写：
                    <span style="color:#ffa000;font-weight:800;"
                      >￥{{ transEndDetail.totalPrice  }}</span
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  竞价结束日期：
                  <span style="font-weight:800;">{{
                    transEndDetail.governsTime
                  }}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <span style="font-weight:800;">特别提示</span>
                  <br />
                  <p>
                    请您于网上交易结束后3个工作日内，携带相关资料到{{
                      transEndDetail.tradingCenterName
                    }}进行资格审查。
                  </p>
                </td>
              </tr>
            </table>

            <h5 style="text-align:right;margin-top:15px;font-weight:800;">
              {{ transEndDetail.tradingCenterName }}
            </h5>
            <p style="text-align:right;">{{transEndDetail.governsTime}}</p>
          </div>
          <div
            style="text-align:center;margin-top:15px;"
            class="applyBidde_oper"
          >
            <div @click="winnerIntoBook(transEndDetail.licenseId)">下载</div>
            <div v-print="'#printWinner'">打印</div>
            <div @click="closeIncluded">关闭</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 竞买申请书 bids_for_books\TransbidsInfo-->
    <el-dialog
      class="companyInfo includedBox bids_for_books"
      width="600px"
      :visible.sync="bids_for_books"
      top="10px"
      :append-to-body="true"
      :show-close="false"
     >
      <div
        style="height:820px;box-sizing:border-box;padding:20px;position: relative;"
      >
        <div class="borderImg">
          <img
            src="@/assets/image/included_border.png"
            style="width:95%;height:95%"
          />
        </div>
        <div style="padding:38px;position:relative;z-index:10;">
          <div id="printApplyBook" v-if="TransbidsInfo">
            <!--  打印申请书内容 -->
            <div
              style="text-align:center;margin:0 auto;font-size:20px;font-weight:800;"
            >
              {{ TransbidsInfo.cantonCityName }}国有建设用地使用权转让竞买申请书
            </div>
            <div>
              <p style="font-weight:700;margin:20px 0;">
                {{ TransbidsInfo.tradingCenterName }}：
              </p>
              <p style="text-indent: 2em;">
                经认真阅读
                <b>{{ TransbidsInfo.targetNo }}</b
                >标的物，即 <b>{{TransbidsInfo.targetNo}}{{TransbidsInfo.ransactionType}}{{TransbidsInfo.circulation}}</b
                >交易文件及相关资料，我方完全接受并愿意
                遵守该文件的规定和要求，且对该交易文件及相关资料均无异议。我方现在正式申请你参加你方组织的该标的网上交易活动。
              </p>
              <p style="text-indent: 2em;margin:20px 0;">
                我方愿意按{{TransbidsInfo.ransactionType}}{{TransbidsInfo.circulation}}文件规定，缴纳竞买保证金：
                <b>{{ TransbidsInfo.amount }}万元</b
                >。
              </p>
              <p style="text-indent: 2em;">
                若能竞得该标的物。我方保证按照本次{{TransbidsInfo.ransactionType}}{{TransbidsInfo.circulation}}交易文件的规定和要求提交所有资料，并对其真实性和完整性负责，履行全部
                义务。如未按规定要求提交资料或出现不能按期付款等违规违约行为，我方愿意按交易文件约定，承担全部责任，并赔偿由此产生的损失。
              </p>
              <p style="text-indent: 2em;margin:16px 0;">
                我方承诺在竞得该标的物使用权后，5个工作日内将成交额余款转入指定资金托管账户，全权委托并配合贵方办理不动产登记相关手续。
              </p>
              <p style="text-indent: 2em;margin:25px 0;">特此申请。</p>
              <p>
                申请人：
                <span>{{TransbidsInfo.applyName}}</span>
              </p>
              <p>
                法定代表人签字：
                <span></span>
              </p>
              <p>
                联系人：
                <span>{{TransbidsInfo.contactName}}</span>
              </p>
              <p>
                地址：
                <span>{{TransbidsInfo.applyAddress}}</span>
              </p>
              <p>
                电话：
                <span>{{TransbidsInfo.applyTel}}</span>
              </p>
              <p>
                邮政编码：
                <span>{{ TransbidsInfo.applyCode }}</span>
                <span style="float:right;">
                  申请日期：
                  <b style="color:#000;">{{ TransbidsInfo.bidderTime }}</b>
                </span>
              </p>
            </div>
          </div>
          <div
            class="applyBidde_oper"
            style="text-align:center;margin-top:30px;"
          >
            <div class="button_border" @click="downApplyBook(TransbidsInfo.licenseId)">下载</div>
            <div class="button_bg" v-print="'#printApplyBook'">打印</div>
            <div class="button_default" @click="bids_for_books = false">
              关闭
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 资格确认书 qualifications\TransCertificateInfo-->
    <el-dialog
      class="companyInfo includedBox"
      width="600px"
      :visible.sync="qualifications"
      top="14vh"
      :append-to-body="true"
      :show-close="false"
     >
      <div
        style="height:500px;box-sizing:border-box;padding:20px;position: relative;"
      >
        <div class="borderImg">
          <img
            src="@/assets/image/included_border.png"
            style="width:95%;height:90%"
          />
        </div>
        <div
          style="padding:38px;position:relative;z-index:10;"
          v-if="TransCertificateInfo"
        >
          <div id="printConfigBook">
            <div
              style="width:330px;text-align:center;margin:0 auto;font-size:20px;font-weight:800;"
            >
              {{ TransCertificateInfo.cantonCityName }}国有建设用地使用权{{
                TransCertificateInfo.transactionType
              }}竞买资格确认书
            </div>
            <div>
              <p style="margin-top:45px;">
                {{ TransCertificateInfo.applyName }}：
              </p>
              <p
                style="margin-top:25px;text-indent:2em;line-height:25px;"
                class="qualifications_content"
              >
                按照
                <b>{{TransCertificateInfo.targetNo}}</b>标的相关{{TransCertificateInfo.transactionType}}{{TransCertificateInfo.circulation}}文件的规定，经审查，你方已具备参与本次{{TransCertificateInfo.transactionType}}交易的
                条件，现确认：你方已取得
                <b>{{TransCertificateInfo.targetNo}}</b>标的国有建设用地使用权{{TransCertificateInfo.transactionType}}的竞买资格。请
                仔细阅读该地块{{TransCertificateInfo.circulation}}文件中有关{{TransCertificateInfo.transactionType}}的规则和程序，并按要求参与竞买。
              </p>
              <div style="margin-top:37px;text-align:right;">
                <p style="font-weight: 600;margin:5px 0;">
                  {{ TransCertificateInfo.tradingCenterName }}
                </p>
                <p>{{ TransCertificateInfo.qualifuationTime }}</p>
              </div>
            </div>
          </div>
          <div
            class="applyBidde_oper"
            style="text-align:center;margin-top:30px;"
          >
            <div class="button_border" @click="downConfigBook(TransCertificateInfo.licenseId)">下载</div>
            <div class="button_bg" v-print="'#printConfigBook'">打印</div>
            <div class="button_default" @click="qualifications = false">
              关闭
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 成交款缴费通知书 dealtradeService\TransdealInfo-->
    <el-dialog
      :title="title"
      class="companyInfo includedBox bids_for_books"
      width="60%"
      top="10px"
      :visible.sync="dealtradeService"
      :append-to-body="true"
     >
      <div
        style="box-sizing:border-box;padding:20px;position: relative;"
      >
        <div class="borderImg">
          <img
            src="@/assets/image/included_border.png"
            style="width:95%;height:95%"
          />
        </div>
        <div style="padding:38px;position:relative;z-index:10;">
          <div class="companyInfoBox" v-if="TransdealInfo">
            <div id="printTransBook">
              <h1 class="titleFont">{{TransdealInfo.cantonCityName}}国有建设用地使用权{{TransdealInfo.transactionType}}</h1>
              <h1 class="titleFont">剩余价款缴款通知书</h1>
              <div class="middleBox">
                <table border="1" width="100%" class="tradeServiceTable">
                  <tr>
                    <td width="120" class="headerBg">标的编号</td>
                    <td colspan="2" style="color:#4573d6;">
                      {{ TransdealInfo.targetNo }}
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="5" class="headerBg">付款人信息</td>
                    <td width="200" class="titleColor">付款人名称</td>
                    <td>{{ TransdealInfo.contributors }}</td>
                  </tr>
                  <tr>
                    <td class="titleColor">总金额（万元）</td>
                    <td>{{ TransdealInfo.totalPrice }}</td>
                  </tr>
                  <tr>
                    <td class="titleColor">保证金（万元）</td>
                    <td>{{ TransdealInfo.amount }}</td>
                  </tr>
                  <tr>
                    <td class="titleColor">剩余价款（万元）</td>
                    <td>
                      <p>大写：{{ TransdealInfo.remainingPriceUp }}</p>
                      <p>小写：{{ TransdealInfo.remainingPrice }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="titleColor">联系电话</td>
                    <td>{{ TransdealInfo.applyTel }}</td>
                  </tr>
                  <tr>
                    <td rowspan="4" class="headerBg">收款人信息</td>
                    <td class="titleColor">开户单位</td>
                    <td>{{ TransdealInfo.tradingCenterName }}</td>
                  </tr>
                  <tr>
                    <td class="titleColor">开户行</td>
                    <td>{{ TransdealInfo.tradingCenterOpeningBank }}</td>
                  </tr>
                  <tr>
                    <td class="titleColor">账户</td>
                    <td>{{ TransdealInfo.tradingCenterTrusteeAccount }}</td>
                  </tr>
                  <tr>
                    <td class="titleColor">联系电话</td>
                    <td>{{ TransdealInfo.tradingCenterTel }}</td>
                  </tr>
                </table>
              </div>
              <div class="middleBox">
                <p>
                  <span style="font-weight:800;">特别提示：</span
                  >本交易剩余价款应该网上交易结束后3个工作日内缴纳。
                </p>
                <h3 class="btnInfo">
                  {{ TransdealInfo.tradingCenterName }}
                </h3>
                <h3 class="btnInfo" style="margin-top:8px;">
                  {{ TransdealInfo.residueTime }}
                </h3>
              </div>
            </div>
            <div class="middleBox applyBidde_oper" style="text-align:center;">
              <div class="button_border" @click="dealFeeBook(TransdealInfo.licenseId)">下载</div>
              <div class="button_bg" v-print="'#printTransBook'">打印</div>
              <div class="button_default" @click="dealtradeService = false">
                关闭
              </div>
            </div>
          </div>

        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
import qs from "qs";
export default {
  data() {
    return {
      included: false,
      bids_for_books: false,
      qualifications: false,
      dealtradeService: false,
      tradeService: false,
      transEndDetail: null,
      TransbidsInfo: null,
      TransCertificateInfo: null,
      TransdealInfo: null,
      tradeServiceInfo: null,
      //成交 / 剩余缴费通知书数据
      clinchData: {
        landNum: "DAZ2018002",
        payName: "XX市大运发集团有限公司",
        buyPrice: "666",
        servicePriceBig: "壹万零伍佰元",
        servicePriceSmall: "10,500",
        phone: "12346789791",
        componyName: "XX市地产交易中心",
        bank: "济南银行",
        bankNum: "5623641257894521323672",
        phone2: "联系电话"
      },
      // 交易服务费缴费通知书
      tradeServiceData: {
        landNum: "DAZ2018002",
        payName: "XX市大运发集团有限公司",
        buyPrice: "666",
        servicePriceBig: "壹万零伍佰元",
        servicePriceSmall: "10,500",
        phone: "12346789791",
        componyName: "XX市地产交易中心",
        bank: "济南银行",
        bankNum: "5623641257894521323672",
        phone2: "联系电话"
      },
      included: false,
      activeName: "first",
      delShow: false,
      closeTypeIpt: true, //取消状态按钮
      config: [
        {
          span: 10,
          fie: "img",
          title: "标的编号"
        },
        // {
        //   span: 4,
        //   fie: "transStatusName",
        //   title: "竞买号"
        // },
        {
          span: 5,
          fie: "licenseNo",
          title: "交易方式"
        },
        {
          span: 4,
          fie: "transTypeName",
          title: "申请状态"
        },
        {
          span: 5,
          fie: "isMainuser",
          title: "操作"
        }
      ],
      tableContentData: [
        {
          img: "tupian001",
          licenseNo: "8456952",
          targetId: "9b28752d-115d-4886-bd15-716ab7d7a086",
          updateUser: null,
          updateTime: null,
          deleteFlag: 0,
          insertTime: "2019-05-09 18:34:27",
          insertUser: "07b0091a-6abd-40ee-b2ac-6a0387933696",
          transType: "listing_mode",
          statusName: "联合竞买确认中",
          bidderId: "07b0091a-6abd-40ee-b2ac-6a0387933696",
          actProiId: null,
          endFocusTime: "2019-05-08 11:00:00",
          targetNo: "dikuaibianhao003,dikuaibianhao004",
          id: "1",
          transStatusName: "受理中(录件)",
          transTypeName: "网上交易（挂牌）",
          isAfterCheck: 0,
          transStatus: "being_accepted",
          status: "license_status-002"
        },
        {
          img: "tupian001",
          licenseNo: "8456952",
          targetId: "9b28752d-115d-4886-bd15-716ab7d7a086",
          updateUser: null,
          updateTime: null,
          deleteFlag: 0,
          insertTime: "2019-05-09 18:34:27",
          insertUser: "07b0091a-6abd-40ee-b2ac-6a0387933696",
          transType: "listing_mode",
          transTypeName: "网上交易（挂牌）",
          statusName: "联合竞买被拒绝",
          bidderId: "07b0091a-6abd-40ee-b2ac-6a0387933696",
          actProiId: null,
          endFocusTime: "2019-05-08 11:00:00",
          targetNo: "dikuaibianhao003,dikuaibianhao004",
          id: "1",
          transStatusName: "受理中(录件)",
          isAfterCheck: 0,
          transStatus: "being_accepted",
          status: "license_status-003"
        },
        {
          img: "tupian001",
          licenseNo: "8456952",
          targetId: "9b28752d-115d-4886-bd15-716ab7d7a086",
          updateUser: null,
          updateTime: null,
          deleteFlag: 0,
          insertTime: "2019-05-09 18:34:27",
          insertUser: "07b0091a-6abd-40ee-b2ac-6a0387933696",
          transType: "listing_mode",
          statusName: "资格审核中",
          bidderId: "07b0091a-6abd-40ee-b2ac-6a0387933696",
          actProiId: null,
          endFocusTime: "2019-05-08 11:00:00",
          targetNo: "dikuaibianhao003,dikuaibianhao004",
          id: "1",
          transStatusName: "受理中(录件)",
          transTypeName: "网上交易（挂牌）",
          isAfterCheck: 0,
          transStatus: "being_accepted",
          status: "license_status-004"
        }
      ],
      ruleForm: {
        title: "",
        transStatus: "",
        transStatusName: "",
        status: "",
        statusName: "",
        transType: "",
        transTypeName: "",
        beginDate: "",
        endDate: ""
      },
      title: "",
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      flexibleOpen: false,
      switchHeight: 41,
      dicRequest: ["trans_status", "license_status"], //字典码请求
      dictionary: {
        //字典码结果
        trans_status: "",
        license_status: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      loading: true,
      circulation: "transfer",
      auditFailure: "",
      transEndDetail: {},
      targetId: "",
      userId: "",
      transTypeList: [], //交易方式
      differ:0,
      now:'',
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    // 初始化查询数据
    let params = {
      circulation: this.circulation,
      page: this.pageNo,
      rows: this.pageSize
    };
    this.init(params);
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-cms/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: "0" },
            res => {
              resolve(res);
            }
          );
        } else {
          this.$axios.get(
            `/epf-cms/dictionaries/getDictEbyDictGroup/${item}`,
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

    this.$axios.get(
      `/epf-landweb/landweb/transtarget/getTradeType`,
      {},
      res => {
        if (res.code == 0) {
          this.transTypeList = res.transTypeList;
        }
      }
    );
  },
  methods: {
    fatch() {
      let params = {
        circulation: this.circulation,
        page: this.pageNo,
        rows: this.pageSize,
        targetNo: encodeURIComponent(this.title),
        status: this.ruleForm.transStatus,
        applyStatus: this.ruleForm.status,
        transType: this.ruleForm.transType,
        beginDate: this.ruleForm.beginDate,
        endDate: this.ruleForm.endDate
      };
      this.init(params);
    },
    // 下载竞买申请书
    downApplyBook(licenseId) {
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/download?licenseId=" + licenseId
      window.open(url);
    },
    // 点击tab切换
    handleClick(tab, event) {
      this.activeName = tab.name;

      this.title = "";
      this.ruleForm.transStatus = "";
      this.ruleForm.transStatusName = "";
      this.ruleForm.status = "";
      this.ruleForm.statusName = "";
      this.ruleForm.transType = "";
      this.ruleForm.transTypeName = "";
      this.ruleForm.beginDate = "";
      this.ruleForm.endDate = "";

      if (this.activeName == "first") {
        this.circulation = "transfer";
        this.fatch();
      } else {
        this.circulation = "rent";
        this.fatch();
      }
    },
    // 查询列表数据
    init(val) {
      this.loading = true;
      this.tableContentData = [];
      this.$axios.get("/epf-landweb/admin/getMyOrderList", val, res => {
        if (res.code === 0) {
          this.loading = false;
          this.tableContentData = res.pager.results;
          this.tableContentData.forEach(e=>{
            this.targetId = e.targetId
            this.userId = localStorage.getItem("userId")
          })
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
        this.loading = false;
      });
    },
    // 查询
    searchData() {
      this.fatch();
    },
    // 重置
    resetFilterInfo() {
      for (let item in this.ruleForm) {
        this.ruleForm[item] = "";
        this.dictionary.cantonCity = "";
        this.dictionary.cantonArea = "";
      }
      this.title = "";
      this.ruleForm.transStatus = "";
      this.ruleForm.status = "";
      this.ruleForm.transType = "";
      this.ruleForm.beginDate = "";
      this.ruleForm.endDate = "";
      this.fatch();
    },
    // 联合竞买确认 type: 0 联合竞买确认/拒绝 type: 1 申请详情
    sureBid(item, type) {
      localStorage.setItem("linceId", item.id);
      localStorage.setItem("targetId", item.targetId);
      this.$router.push({
        path: "/applyBiddingBook",
        query: { id: item.id, type: type, tgId: item.targetId }
      });
    },
    //得到服务器时间的axios
    getServerDate: function() {
      let _this = this;
      this.$axios.get(
        "/epf-tradeengine/enginenode/getServiceTime",
        {},
        res => {
          if (res.code != 0) {
            return;
          }
          let locTime = new Date().getTime();
          let serviceTime =  new Date(res.time).getTime();
          //设置两个时间点相差值
          let differ = locTime-serviceTime;
          if(differ > 1000 || differ+1000<0){
            _this.differ = Math.round(differ/1000)*1000-900;
          }else{
            _this.differ = 0;
          }
        }
      );
    },
    //获取当前时间
    getNowTime(){
      let now =  new Date().getTime();
      now = now - this.differ;
      this.now = new Date(now);
      return this.now;
    },
    // 继续竞买 type: 0 草稿的修改提交； type: 1 审核不通过重新产生一条新数据的提交
    reapply(item, type) {
      console.log("====type====",type)
      localStorage.setItem("linceId", item.id);
      localStorage.setItem("targetId", item.targetId);
      if(type === '0'){
        // 继续申请判断标的是否在申请竞买期
        let url = "/epf-landweb/landweb/transtarget/getTargetById?targetId=";
        this.$axios.get(
          url +
            item.targetId,
          {},
          res => {
            let now = this.getNowTime(); // 当前时间
            let endApplyTime = new Date(res.transTarget.endApplyTime); //竞买申请截止时间
            if (now.getTime() > endApplyTime.getTime()) {
              this.$message.error("超出申请竞买截止时间，不能继续申请竞买！");
              return;
            }
            this.$router.push({
              path: "/applyBiddingBook",
              query: { id: item.id, type: type, tgId: item.targetId }
            });
          });
      }else{
        this.$router.push({
          path: "/applyBiddingBook",
          query: { id: item.id, type: type, tgId: item.targetId }
        });
      }
    },
    // 资金托管协议
    toFundTrusteeship(item,index) {
      this.$router.push({
        path: "/fundTrusteeship",
        query: { id: item.id,index:index }
      });
    },
    // 我要报价
    centerPrice(item) {
      this.$axios.get(
        "/epf-landweb/admin/getLicenseByTargetId?targetId=" + item.targetId,
        {},
        res => {
          if (res.code === 0) {
            this.$router.push({
              path: "/centerPrice",
              query: { userId: res.userId, targetId: item.targetId }
            });
          }
        }
      );
    },

    // 查看保证金交款信息
    viewpayInfo(item) {
      this.$router.push({
        path: "/PersonalCenter/payInfo",
        query: { id: item.apllyId, targetId: item.targetId }
      });
    },

    // 竞价记录
    bidrecord(item) {
      this.$router.push({
        path: "/PersonalCenter/auctionRecord",
        query: { id: item.targetId }
      });
    },

    // 查看公示
    publicnotice(item) {
      this.$router.push({path:'/ResultsPublicityDetails',query:{noticeId:item.id, targetId: item.targetId}})
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
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 161 : 41;
    },
    // 标的状态
    transStatusSelect(dic, transStatusName, event) {
      this.ruleForm.transStatus = this.$refs[transStatusName][0].$attrs.dictKey;
      // this.fatch()
    },
    statusSelect(dic, statusName, event) {
      // if(this.$refs[statusName]){
      this.ruleForm.status = this.$refs[statusName][0].$attrs.dictKey;
      // }
    },

    // 删除订单
    delOrder(item) {
      this.$axios.post(
        "/epf-landweb/admin/deleteTransLicense?id=" + item.id,
        {},
        res => {
          this.fatch();
        }
      );
    },
    // 查看审核失败原因  -- zhushaobing
    addComment(row, index) {
      this.auditFailure = "";
      //流程实例ID
      let param = { businessId: row.id };
      this.$axios.post(
        "/epf-activiti/act/task/queryFinishTasksInfoByBusinessId",
        qs.stringify(param),
        res => {
          //查询意见
          if (res.code != "0") {
            //失败
            this.$message.error(res.msg);
            return;
          }
          //循环拿到所有的意见，每次覆盖，最后赋值的就是，最后的审核人提的意见
          let comments = res.comments;
          let index = comments.length;
          let k = Number(index) - 1;
          this.auditFailure = comments[k].message;
        }
      );
    },
    showIncluded(row) {
      this.included = true;
      this.isCardInfo = row.transCertificateInfo;
      this.transEndDetail = row.transCertificateInfo;
      this.TransbidsInfo = row.transCertificateInfo;
      this.TransCertificateInfo = row.transCertificateInfo;
      this.TransdealInfo = row.transCertificateInfo;
    },
    closeIncluded() {
      this.included = false;
    },

    // 下载竞得入选通知书
    winnerIntoBook(licenseId) {
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/downloadWinnerIntoBook?licenseId=" + licenseId
      window.open(url);
    },
    // 竞买申请书
    bidsBooks(row) {
      this.bids_for_books = true;
      this.isCardInfo = row.transCertificateInfo;
      this.transEndDetail = row.transCertificateInfo;
      this.TransbidsInfo = row.transCertificateInfo;
      this.TransCertificateInfo = row.transCertificateInfo;
      this.TransdealInfo = row.transCertificateInfo;
    },
    dealtradeServiceSure(row) {
      this.dealtradeService = true;
      this.isCardInfo = row.transCertificateInfo;
      this.transEndDetail = row.transCertificateInfo;
      this.TransbidsInfo = row.transCertificateInfo;
      this.TransCertificateInfo = row.transCertificateInfo;
      this.TransdealInfo = row.transCertificateInfo;
    },
    qualificationsSure(row) {
      this.qualifications = true;
      this.isCardInfo = row.transCertificateInfo;
      this.transEndDetail = row.transCertificateInfo;
      this.TransbidsInfo = row.transCertificateInfo;
      this.TransCertificateInfo = row.transCertificateInfo;
      this.TransdealInfo = row.transCertificateInfo;
    },
    // 成交确认
    notice(row) {
      this.$router.push({
        path: "/notice",
        query: { id: row.id }
      });
    },
    // 查看标的详情
    showDetail(row) {
      this.$router.push({
        path: "/TradingDetails",
        query: { id: row.targetId, selectedTraState: row.transStatus }
      });
    },
    // 下载资格确认书
    downConfigBook(licenseId) {
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/downloadConfig?licenseId=" + licenseId
      window.open(url);
    },
    // 下载剩余价款缴费通知
    dealFeeBook(licenseId) {
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/downloadDealFeeBook?licenseId=" + licenseId
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.modeMsg {
  .box {
    width: 100%;
    height: 100%;
    padding: 15px;
    text-align: left;
    .defImage {
      display: block;
      height: 91px;
      width: 122px;
      float: left;
    }
    .content {
      height: 91px;
      padding-top: 20px;
      .orderType{
        border:none;
        background:#f2f5f7;
        color:#7698b8;
        font-weight: bold;
      }
      // h5 {
      //   width: 100%;
      //   height: 38px;
      //   line-height: 91px;
      //   cursor: pointer;
      // }
      // &:hover {
      //   color: #4472d4;
      // }
      // p {
      //   color: #999;
      //   font-size: 12px;
      //   margin-top: 10px;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   white-space: nowrap;
      // }
    }
  }
}
.epf_btn_flex{
  /deep/ .el-dropdown-menu__item{
    padding:0 10px 0 20px;
  }
}
.includedTable {
  margin-top: 20px;
}
.includedTable tr td {
  padding: 14px 12px;
  border: 1px solid rgb(224, 224, 224);
}
.applyBidde_oper {
  @include size(275px, 36px);
  margin: 0 auto;
  div {
    @include size(70px, 36px);
    background-color: var(--Colors);
    border-radius: 2px;
    text-align: center;
    line-height: 36px;
    display: inline-block;
    margin-right: 25px;
    color: #fff;
    cursor: pointer;
    &:nth-child(2) {
      border: solid 1px var(--Colors);
      background: #fff;
      color: var(--Colors);
    }
    &:nth-last-child(1) {
      margin-right: 0px;
      border: solid 1px #e0dfdf;
      background: #fff;
      color: #666666;
    }
  }
}.magnifier-box img {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
.subscribe-ruleForm .el-form-item__label {
  width: 80px !important;
}
.subscribe-ruleForm .el-form-item__content {
  text-align: right;
}
.subscribe-ruleForm .el-form-item__error {
  width: 130px;
}
.subscribe-ruleForm .el-date-editor.el-input {
  width: 230px;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.filter_wrap {
  box-sizing: border-box;
  padding: 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.titles {
  padding: 15px;
  font-size: 16px;
  overflow: auto;
  background-color: #f8f8f8;
}
.titles span {
  width: 5px;
  height: 20px;
  float: left;
  background-color: var(--Colors);
}
.titles b {
  margin-left: 10px;
}
.content_right {
  width: 45%;
  float: left;
}
.content_left {
  width: 45%;
  float: right;
}
.content_btns {
  width: 10%;
  padding-top: 3px;
  float: right;
  text-align: right;
}
.contents {
  margin-top: 25px;
  overflow: auto;
}
.content_bottom {
  float: left;
  width: 90%;
}
.text_domain {
  width: 100%;
  overflow: auto;
}
.text_domain span {
  float: right;
  margin: 180px 30px 0 0;
}

.peopleInfoBox {
  padding: 50px 40px;
}
.companyInfoBox {
  // padding: 30px 30px;
  // max-height: 600px;
  overflow-y: auto;
}
.peopleBorder {
  width: 100%;
  padding: 10px 10px;
  border: 1px solid rgb(206, 206, 206);
}
.companyInfoBorder {
  width: 100%;
  padding: 10px 10px;
  border: 1px solid rgb(206, 206, 206);
  border-top: none;
}
.holdersTop {
  margin: 15px 0px;
  height: 20px;
}
.holdersTop .leftDot {
  display: block;
  width: 5px;
  height: 22px;
  border-radius: 5px;
  background: #fea200;
  float: left;
}
.holdersTop .leftTitle {
  font-size: 16px;
  padding-left: 15px;
}
.bidder_information {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
}
.bidder_information li {
  color: var(--lightColor);
  cursor: pointer;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.tradeServiceTable {
  border-color: rgb(255, 255, 255);
}
.tradeServiceTable tr td {
  padding: 12px 8px;
  border-color: rgb(228, 228, 228);
}
.tradeServiceTable tr td:nth-child(2) {
  padding: 12px 8px;
  border-color: rgb(228, 228, 228);
}
.includedTable {
  margin-top: 20px;
}
.includedTable tr td {
  padding: 14px 12px;
  border: 1px solid rgb(224, 224, 224);
}
.headerBg {
  background: #f7f7f7;
  font-weight: 800;
  text-align: right;
  padding-right: 20px !important;
}
.titleColor {
  color: #9b9b9b;
}
.middleBox {
  width: 85%;
  margin: 30px auto;
}
.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}
.borderImg {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
}
.peopleInfo .el-dialog .el-dialog__body {
  padding: 0 !important;
  position: relative;
  top: -1px;
}
.companyInfo .el-dialog .el-dialog__body {
  padding: 0 !important;
  position: relative;
  top: -1px;
}
.includedBox .el-dialog .el-dialog__header {
  display: none;
}
.includedBox .el-dialog {
  border-radius: 10px;
  border: 3px solid #cdd3dc;
}
.qualifications_content b {
  color: #ffa100;
}
.account_entry {
  border-color: #dfdfdf;
}
.bids_for_books p {
  line-height: 24px;
}
.bids_for_books span,
.bids_for_books b {
  color: #fea100;
}
.title_h {
  text-align: center;
  font-size: 18px;
}
.surface {
  margin-top: 70px;
  padding: 5px 45px;
}
.btns_box {
  width: 300px;
  margin: 0 auto;
  margin-top: 45px;
}
.surface span {
  color: #205ee4;
}
.surface ul {
  display: flex;
  justify-content: space-around;
  margin-top: 45px;
}
.surface p {
  line-height: 24px;
  letter-spacing: 2px;
}
.hoverStyle:hover{color:#4573d6}
</style>
<style>
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background: none;
}
</style>
