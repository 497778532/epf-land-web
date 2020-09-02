<template>
  <!-- eslint-disable -->
  <div class="BasiclandInfo_warp">
    <div class="epf_proess">
      <span class="epf_proess_title">发布{{ ruleForm.circulationName }}地源</span>
      <div class="epf_proess_cont">
        <epf-step :active="1" :data="['土地基本信息','申请人基本信息','附件清单']"></epf-step>
      </div>
    </div>
    <ul class="steps" id="steps">
      <li
        class="step"
        v-for="(item, index) in scrollData"
        :key="index"
        @click="jump(index)"
      >
        <img
          :src="
            (isActive == 0 && index == 0) ||
            (isActive == 1 && index == 1) ||
            (isActive == 2 && index == 2)
              ? item.leftImgUrlFull
              : item.leftImgUrl
          "
          alt
        />
        <span
          :class="
            (isActive == 0 && index == 0) ||
            (isActive == 1 && index == 1) ||
            (isActive == 2 && index == 2)
              ? 'active'
              : ''
          "
          >{{ item.msg }}</span
        >
        <img
          :src="
            (isWrite == 1 && index == 0) ||
            (isWrite == 2 && index == 1) ||
            (isWrite == 3 && index == 2)
              ? item.rightImgUrl
              : item.rightImgUrlFull
          "
          alt
        />
        <div
          class="gap"
          v-if="index != 2"
          style="width:1px;height:30px;background:#dddddd;margin-left:5px;"
        ></div>
      </li>
    </ul>
    <div class="publishTra_main">
      <epf-switchTitle
        titles_h="流转信息"
        padding="0px"
        background="#fff"
        height="80px"
        ref="one"
        :shutOff="false"
        class="scroll-item"
      ></epf-switchTitle>
      <div
        class="publishTra_main_cont"
        style="border-bottom:1px solid #e6e6e6"
        v-if="publishLandtype !== null"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormOne"
          label-width="180px"
          class="demo-ruleForm"
          v-if="dicFinsh"
        >
          <el-form-item label="流转方式：" prop="circulation">
            <el-select
              :disabled="disabledType == 'true' ? true : false"
              v-model="ruleForm.circulationName"
              placeholder="请选择流转方式"
              @change="
                circulatemodeSelect(
                  dictionary.flow_mode,
                  ruleForm.circulationName,
                  $event
                )
              "
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
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input
              v-model="ruleForm.title"
              style="width:491px;"
              placeholder="请输入标题，30字以内..."
            ></el-input>
          </el-form-item>
          <el-form-item label="土地性质：" prop="landChar">
            <el-radio-group v-model="ruleForm.landChar">
              <el-radio
                v-for="item in dictionary.land_nature"
                :label="item.dictKey"
                :key="item.zhCn"
                >{{ item.zhCn }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <div
            style="display: flex;flex-direction: row;"
            class="cantonProvinceNactive"
          >
            <el-form-item
              label="所属行政区："
              prop="cantonProvince"
              style="width:435px;"
            >
              <el-select
                v-model="ruleForm.cantonProvinceName"
                placeholder="请选择所在省"
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
            <el-form-item prop="cantonCity" class="canton_Regions">
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
            <el-form-item prop="cantonArea" class="canton_Regions">
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
          <el-form-item prop="trustOrgId" label="交易中心：">
            <el-select
              v-model="ruleForm.trustOrgId"
              placeholder="请选择地块所属行政区的交易中心"
            >
              <el-option
                v-for="item in orgList"
                :ref="item.enterpriseName"
                :id="item.id"
                :label="item.enterpriseName"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用权类型：" prop="useType">
            <el-radio-group v-model="ruleForm.useType" @change="useTypeSelect">
              <el-radio
                v-for="item in dictionary.use_type"
                :label="item.dictKey"
                :key="item.zhCn"
                >{{ item.zhCn }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="土地证号" prop="unitNum">
                        <el-input v-model="ruleForm.unitNum"  placeholder="请输入不动产单元号 " style="width:491px;"></el-input>
          </el-form-item>-->
          <el-form-item
            v-if="
              ruleForm.useType == 'transfer2' || ruleForm.useType == 'tosell'
            "
            ref="decisionNum"
            :label="
              ruleForm.useType == 'transfer2'
                ? '划拨决定书号：'
                : '建设用地使用权出让合同号：'
            "
            prop="decisionNum"
          >
            <el-input
              v-if="ruleForm.useType == 'transfer2'"
              v-model="ruleForm.decisionNum"
              placeholder="请输入划拨决定书号"
              style="width:491px;"
            ></el-input>
            <el-input
              v-if="ruleForm.useType == 'tosell'"
              v-model="ruleForm.decisionNum"
              placeholder="请输入建设用地使用权出让合同号"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            v-if="ruleForm.useType == 'transfer2'"
            ref="decisionNum"
            label="划拨决定书号："
            prop="decisionNum"
            >
            <el-input v-model="ruleForm.decisionNum" placeholder="请输入划拨决定书号" style="width:491px;"></el-input>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.useType == 'tosell'"
            ref="decisionNum"
            label="合同鉴证号："
            prop="decisionNum"
            >
            <el-input v-model="ruleForm.decisionNum" placeholder="请输入合同鉴证号" style="width:491px;"></el-input>
          </el-form-item>-->
          <el-form-item label="土地类型：" prop="landType">
            <el-radio-group v-model="ruleForm.landType">
              <el-radio
                v-for="item in dictionary.land_type"
                :label="item.dictKey"
                :key="item.zhCn"
                >{{ item.zhCn }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <div
            style="display: flex;flex-direction: row;"
            class="cantonProvinceNactive"
          >
            <el-form-item
              label="土地用途："
              prop="firstClassUse"
              style="width:435px;"
            >
              <el-select
                v-model="ruleForm.firstClassUseName"
                placeholder="请选择土地一级用途"
                @change="
                  firstClassUseSelect(
                    dictionary,
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
            <el-form-item prop="secondClassUse" class="canton_Regions">
              <el-select
                v-model="ruleForm.secondClassUseName"
                placeholder="请选择土地二级用途"
                @change="
                  secondClassUseSelect(
                    dictionary,
                    ruleForm.secondClassUseName,
                    $event
                  )
                "
              >
                <el-option
                  v-for="(item, index) in dictionary.land_use_second"
                  :ref="item.zhCn"
                  :label="item.zhCn"
                  :secondClassUseName="item.zhCn"
                  :dictKey="item.dictKey"
                  :value="item.zhCn"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item :label="ruleForm.circulationName + '面积：'" prop="area">
            <el-input
              style="width:491px;"
              v-model="ruleForm.area"
              :placeholder="'请输入' + ruleForm.circulationName + '面积，例如：1000.02'"
            ></el-input>
            <span style="margin-left:20px;">平方米</span>
          </el-form-item>
          <el-form-item label="使用权截止日期：" prop="endDate">
            <el-col :span="11" style="width:491px;">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="ruleForm.endDate"
                style="width: 100%;"
                :picker-options="pickerOptions0"
                @change="selectDatarange"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item :label="publishLandtype + '年限：'" prop="years">
            <el-input
              v-model="ruleForm.years"
              :disabled="disabledTypeyear ? true:false"
              :placeholder="'请输入' + publishLandtype + '年限，例如：2.5'"
              style="width:491px;"
            ></el-input>
            <span style="margin-left:20px;">年</span>
          </el-form-item>
           <el-popover
               v-if="ruleForm.circulationName == '转让'"       
              placement="bottom"
              width="300"
              trigger="hover">
              <div solt="content" style="padding:15px;line-height:20px;color:#666">
                  <p>例如：使用权截止日期为2020年4月15日，当前日期为2000年1月1，那么剩余使用年限为：20年3月15天，直接取整数20年。</p>
              </div>
              <p class="explain" slot="reference">
                  <img src="../../../../../assets/image/careful.png" alt /> 
                  剩余使用年限计算方法：取“截止日期-当前信息填写日期”的年度整数。<i class="question"></i>
              </p>
            </el-popover>
        </el-form>
      </div>

      <epf-switchTitle
        titles_h="地块信息"
        padding="0px"
        background="#fff"
        height="80px"
        ref="two"
        :shutOff="false"
        class="scroll-item"
      ></epf-switchTitle>
      <div
        class="publishTra_main_cont"
        style="border-bottom:1px solid #e6e6e6"
        v-if="publishLandtype !== null"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormTwo"
          label-width="180px"
          class="demo-ruleForm"
          v-if="dicFinsh"
        >
          <el-form-item label="土地坐落：" prop="location">
            <el-input
              v-model="ruleForm.location"
              placeholder="请输入土地详细信息，例如：山西省太原市小店区荣军街112号"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="坐标：">
            <el-input
              :disabled="true"
              v-model="ruleForm.coordinate"
              placeholder="地图标注以后，自动获取坐标"
              style="width:491px;"
            ></el-input>
            <div class="findland_input epf_btn epf_btn_bg" @click="dialogVisibleMap = true">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAADGUlEQVRIS5WWacjmYxTGf78s2Wps0yBZyjaYMj5MRsYQGTTNt5Hl01CMD0pqRrZCyBIlu2TIUlIKEYoMsmQtsswgQraSyVqWo2u6n7f/+3+f5XXqqadz3+e+znXd55z7LxOsquYDxwML2+8AYAPwLvAO8Lz60bhjHLVYVVsCFwOXAfkf+wP4GDgI2Lb5/gauBK5R/xl23lCQqtofeKRl/jVwI/BKss9BLYHDgCXABcCewJvAqernfaAZIFW1MxD6uwK3ho362xjGOwBXA+cBPwLz1Z+6+4eBPAScDixTn5t0Z4P1qloGPAM8rJ4xEqSqTgKeBu5Uz50tQAfoLuBsYLn61MA/jUlVvQjsAxzSl6iq9gNOARYD3wD3q691E6mqSPcJsFE9ZgZIu8xfgOvUy3vBxwJPAFsBHwIHAlsD56j39vZeAawB5qh/ZW2KSVUtAt4AVqhPdiTYqWUelqepm1rGjwFLgYPVzzr7VwCPA4vUVNw0kJRiSnUP9dtO0CXAVcA89YeOf3fgK+Ba9dKOP+Uc//nqzX2Qm3JpanSdsqq6BVjV92dDVf0L3K2u7sWkae9Qk/g0JquA6LtLt86r6sJkCxytvtzJ+ATgWWCtekPHvxsQJc5U1/VBDgfeBk5UE7zZqmrHRv9n4Dh1Q1WdDDwAbAfspaYJB/sHbbBQfa8PkmoJzYvU63v0lwP3hWXHn65Ow77V25t5l+rcfkZ1tazvAVLfh6p/9oIzbtLJAfodWNdl0OK3AT4A1qtnDeL7zZh5tRF4UM0s+l9WVbe1kbSvGnk327DZlXFye9P/hdmiVFUaNvtXqxkvUzYMJL7onMdpqZqHaaxVVYpmfZsGR6g1FqRpOxd4CUjDLVHfH4VSVQuAlHbKNmU+VWkj5RosVNUAaB5wpJoXcZpVVV7IV4HvRwEMvZNeRQUoh8xpQJ92kshUztqmtjaDwUQmncPSwZEj42ax+kVV5TnImP+1yfnduEsb+SHRYxSg14EtgJXAo0A+GnLJYwEmytUDynTNx8TewJfAUWo+MibarJh0pAtQWKycLUBi/wOldEAphxvUzAAAAABJRU5ErkJggg=="
                alt
              />
              <span>地图找地</span>
            </div>
            <el-dialog
              id="publishLandMapDialog"
              :visible.sync="dialogVisibleMap"
              @close="dialogVisibleMap = false"
              top="1%"
             >
              <h2 class="MapTitle">地块地理位置标注</h2>
              <div style="width:95%;height:500px;margin:10px auto;">
                <v-Map
                  v-if="dialogVisibleMap"
                  @coordinateMap="coordinateMap"
                  :coordinate="ruleForm.coordinate?ruleForm.coordinate:'0,0'"
                >
                </v-Map>
              </div>
              <el-row style="padding-bottom:20px;margin-top:20px;">
                <el-col :span="12" style="padding-right:16px;">
                  <div
                    class="epf_btn epf_btn_bg"
                    style="width:70px;float:right"
                    @click="markerDown"
                  >
                    确定
                  </div>
                </el-col>
                <el-col :span="12" style="padding-left:16px;">
                  <div
                    class="epf_btn epf_btn_bg"
                    style="background-color:#fff;color:#adadad;border:solid 1px #dfdfdf;width:70px;"
                    @click="dialogVisibleMap = false"
                  >
                    关闭
                  </div>
                </el-col>
              </el-row>
            </el-dialog>
          </el-form-item>
          <el-form-item label="东至：" prop="east">
            <el-input
              v-model="ruleForm.east"
              placeholder="东至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="南至：" prop="west">
            <el-input
              v-model="ruleForm.west"
              placeholder="南至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="西至：" prop="south">
            <el-input
              v-model="ruleForm.south"
              placeholder="西至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="北至：" prop="north">
            <el-input
              v-model="ruleForm.north"
              placeholder="北至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item :label="'拟' + ruleForm.circulationName + '总价：'" prop="price">
            <el-input
              v-model="ruleForm.price"
              :placeholder="
                '请输入拟' + ruleForm.circulationName + '总价：例如输入10000'
              "
              style="width:491px;"
            ></el-input>
            <span style="margin-left:20px;">元</span>
          </el-form-item>
          <el-form-item label="权证号类型：" prop="warrantNumType">
            <el-radio-group v-model="ruleForm.warrantNumType">
              <el-radio
                v-for="item in dictionary.own_no_type"
                :label="item.dictKey"
                :key="item.zhCn"
                >{{ item.zhCn }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权证号：" prop="warrantNum">
            <el-input
              v-model="ruleForm.warrantNum"
              placeholder="例如：浙（2017)德清县不动产第0018185号"
              style="width:491px;"
              @change="stateChange(ruleForm.warrantNum)"
            ></el-input>
            <div
              style="display:inline-block;vertical-align: middle;"
              v-if="visible"
            >
              <div style="margin: 0" class="speech">
                <p style="line-height:20px;">{{ msg }}</p>
                <el-button
                  type="primary"
                  size="mini"
                  @click="sureMsg()"
                  v-if="sureShow"
                  >确定</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="visible = false"
                  v-if="sureShow"
                  >取消</el-button
                >
              </div>
            </div>
          </el-form-item>
          <el-form-item label="登记机构：" prop="registration">
            <el-input
              v-model="ruleForm.registration"
              placeholder="该行政区域的不动产登记机构"
              style="width:491px;"
              @change="
                registrationeSelect(
                  dictionary.register_organization,
                  ruleForm.registrationeName,
                  $event
                )
              "
            ></el-input>
            <!-- <el-select
              v-model="ruleForm.registrationeName"
              @change="registrationeSelect(dictionary.register_organization,ruleForm.registrationeName,$event)"
              placeholder="该行政区域的不动产登记机构"
              style="width:491px;"
            >
              <el-option
                v-for="item in dictionary.register_organization"
                :id="item.id"
                :dictKey="item.dictKey"
                :ref="item.zhCn"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="item.dictKey"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="不动产单元号：" prop="unitNum">
            <el-input
              v-model="ruleForm.unitNum"
              placeholder="请输入不动产单元号 "
              style="width:491px;"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <epf-switchTitle
        titles_h="附属物及建筑信息"
        padding="0px"
        background="#fff"
        height="80px"
        :shutOff="false"
        ref="three"
        class="scroll-item"
      ></epf-switchTitle>

      <div class="publishTra_main_cont" v-if="publishLandtype !== null">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormThree"
          label-width="180px"
          class="demo-ruleForm"
          v-if="dicFinsh"
        >
          <el-form-item
            label="是否连同地上建筑物、其他附着物："
            required
            prop="adjunct"
            label-width="335px"
          >
            <el-radio-group
              v-model="ruleForm.adjunct"
              v-if="this.$route.query.id"
            >
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
            <el-radio-group v-model="ruleForm.adjunct" v-else>
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="房屋建设工程是否完成投资总额的25%以上："
            prop="resource1"
            label-width="300px!important"
            style="margin-left:85px;"
          >
            <el-radio-group
              v-model="ruleForm.isPercent"
              v-if="this.$route.query.id"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
            <el-radio-group v-model="ruleForm.isPercent" v-else>
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item
            label="土地成片开发是否形成工业用地或其他建设用地条件："
            prop="resource2"
            label-width="350px!important"
            style="margin-left:85px;"
          >
            <el-radio-group
              v-model="ruleForm.isDevelope"
              v-if="this.$route.query.id"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
            <el-radio-group v-model="ruleForm.isDevelope" v-else>
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item
            v-show="ruleForm.adjunct == '0'"
            label="建筑面积："
            prop="buildArea"
          >
            <el-input
              v-model="ruleForm.buildArea"
              placeholder="例如：3000.11"
              style="width:491px;"
            ></el-input>
            <span style="margin-left:20px;">平方米</span>
          </el-form-item>
          <el-form-item v-show="ruleForm.adjunct == '0'" label="建筑结构：">
            <el-select
              v-model="ruleForm.buildingStructure"
              placeholder="请选择建筑结构"
              style="width:187px;"
            >
              <el-option
                v-for="item in dictionary.building_structure"
                :label="item.zhCn"
                :value="item.dictKey"
                :key="item.zhCn"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="ruleForm.adjunct == '0'"
            label="建筑限高："
            prop="heightLimit"
          >
            <el-input
              v-model="ruleForm.heightLimit"
              placeholder="例如：20"
              style="width:300px;"
            ></el-input>
            <span style="margin-left:20px;">米</span>
          </el-form-item>
          <div
            class="twoInput"
            v-show="ruleForm.adjunct == '0'"
            style="display: flex;flex-direction: row;"
          >
            <el-form-item
              label="绿地率%："
              style="width:345px;"
              prop="greenSpaceRate"
            >
              <el-input
                ref="greenSpaceRate"
                v-model="ruleForm.greenSpaceRate"
                placeholder="绿地率下限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="canton_Regions">
              <el-select
                v-model="ruleForm.greenSpaceRateSymbol1"
                placeholder="请选择符号"
                style="width:157px;"
                @change="
                  change(
                    $event,
                    ruleForm.greenSpaceRateSymbol1,
                    'greenSpaceRateSymbol1'
                  )
                "
              >
                <el-option
                  v-for="(item, index) in greenSpaceRateSymbolSelect1"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <span
              style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;"
              >绿地率</span
            >
            <el-form-item class="canton_Regions">
              <el-select
                v-model="ruleForm.greenSpaceRateSymbol2"
                placeholder="请选择符号"
                style="width:157px;"
                @change="
                  change(
                    $event,
                    ruleForm.greenSpaceRateSymbol2,
                    'greenSpaceRateSymbol2'
                  )
                "
              >
                <el-option
                  v-for="(item, index) in greenSpaceRateSymbolSelect2"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="canton_Regions" prop="greenSpaceRate2">
              <el-input
                v-if="
                  ruleForm.greenSpaceRateSymbol2 != '' &&
                    ruleForm.greenSpaceRateSymbol2 != null
                "
                ref="greenSpaceRate2"
                v-model="ruleForm.greenSpaceRate2"
                placeholder="绿地率上限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
          </div>
          <div
            class="twoInput"
            v-show="ruleForm.adjunct == '0'"
            style="display: flex;flex-direction: row;"
          >
            <el-form-item
              label="建筑密度%："
              style="width:345px;"
              prop="buildingDensity"
            >
              <el-input
                v-model="ruleForm.buildingDensity"
                placeholder="建筑密度下限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="canton_Regions">
              <el-select
                v-model="ruleForm.buildingDensitySymbol1"
                placeholder="请选择符号"
                style="width:157px;"
                @change="
                  change(
                    $event,
                    ruleForm.buildingDensitySymbol1,
                    'buildingDensitySymbol1'
                  )
                "
              >
                <el-option
                  v-for="(item, index) in buildingDensitySymbolSelect1"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <span style="margin:0 17px;color:#606266;line-height:38px;"
              >建筑密度</span
            >
            <el-form-item class="canton_Regions">
              <el-select
                v-model="ruleForm.buildingDensitySymbol2"
                placeholder="请选择符号"
                style="width:157px;"
                @change="
                  change(
                    $event,
                    ruleForm.buildingDensitySymbol2,
                    'buildingDensitySymbol2'
                  )
                "
              >
                <el-option
                  v-for="(item, index) in buildingDensitySymbolSelect2"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item class="canton_Regions" prop="buildingDensity2">
              <el-input
                :disabled="disabledType==1?true:false"
                v-model="ruleForm.buildingDensity2"
                placeholder="建筑密度上限"
                style="width:140px;"
              ></el-input>
            </el-form-item>-->
            <el-form-item class="canton_Regions" prop="buildingDensity2">
              <el-input
                v-show="
                  ruleForm.buildingDensitySymbol2 != '' &&
                    ruleForm.buildingDensitySymbol2 != null
                "
                v-model="ruleForm.buildingDensity2"
                placeholder="建筑密度上限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
          </div>
          <div class="twoInput" style="display: flex;flex-direction: row;">
            <el-form-item
              label="容积率："
              style="width:345px;"
              prop="plotRatio"
            >
              <el-input
                v-model="ruleForm.plotRatio"
                placeholder="容积率下限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="canton_Regions">
              <el-select
                v-model="ruleForm.plotRatioSymbol1"
                placeholder="请选择符号"
                style="width:157px;"
                @change="
                  change($event, ruleForm.plotRatioSymbol1, 'plotRatioSymbol1')
                "
              >
                <el-option
                  v-for="(item, index) in plotRatioSymbolSelect1"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <span
              style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;"
              >容积率</span
            >
            <el-form-item class="canton_Regions">
              <el-select
                v-model="ruleForm.plotRatioSymbol2"
                placeholder="请选择符号"
                style="width:157px;"
                @change="
                  change($event, ruleForm.plotRatioSymbol2, 'plotRatioSymbol2')
                "
              >
                <el-option
                  v-for="(item, index) in plotRatioSymbolSelect2"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="canton_Regions" prop="plotRatio2">
              <el-input
                v-show="
                  ruleForm.plotRatioSymbol2 != '' &&
                    ruleForm.plotRatioSymbol2 != null
                "
                v-model="ruleForm.plotRatio2"
                placeholder="容积率上限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="土地照片：">
            <el-upload
              class="avatar-uploader"
              action="http://192.168.1.200:8081/epf-document/document/upload/"
              ref="photoUploader"
              list-type="picture-card"
              multiple
              :limit="5"
              :on-change="fileChange"
              :http-request="photoUploadFile"
              :on-preview="handlePictureCardPreview"
              :on-remove="photoHandleRemove"
              :before-upload="beforeAvatarUploadImg"
              :on-success="photoUploadSuccess"
              :on-error="upLoadError"
              :on-exceed="photoExceed"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <p class="explain">
            <img src="@/assets/image/careful.png" alt /> 说明：支持
            JPG , PNG , GIF 格式 , 最多可上传5张照片 , 图片每张最大6M
          </p>

          <el-form-item label="土地视频：">
            <div style="position:relative;" class="el_videoBox">
              <div class="videoList">
                <div
                  v-for="(item, index) in fileListVideo"
                  :key="index"
                  class="videoBox"
                >
                  <video
                    loop
                    width="146px"
                    height="146px"
                    :src="item.url"
                    controls="controls"
                    style="outline:none;border-radius: 8px;background-color: #000;padding:1px;"
                  >
                    您的浏览器不支持 video 标签。
                  </video>
                </div>
              </div>
              <el-upload
                class="avatar-uploader"
                action="http://192.168.1.200:8081/epf-document/document/upload/"
                list-type="picture-card"
                ref="videoUploader"
                multiple
                :limit="5"
                :disabled="disabledType == 1 ? true : false"
                :http-request="videoUploadFile"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUploadVideo"
                :on-progress="videoProgress"
                :on-success="videoUploadSuccess"
                :on-error="upLoadError"
                :on-exceed="videoExceed"
                :file-list="fileListVideo"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>

          <p class="explain">
            <img src="@/assets/image/careful.png" alt /> 说明：支持
            MP4 , FLV , AVI 格式 , 最多可上传5个视频 , 视频每个最大300M
          </p>
          <el-form-item label="其他说明：" prop="remark">
            <el-input
              type="textarea"
              maxlength="2000"
              minlength="0"
              show-word-limit
              autosize
              v-model="ruleForm.remark"
              placeholder="可针对土地的其他信息进行补充说明"
              style="width:720px;height:108px;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="epf_btn epf_btn_bg" style="width:82px;" @click="submitForm('ruleFormOne', 'ruleFormTwo', 'ruleFormThree')" v-if="isSub == 0">
              下一步
            </div>
            <div class="epf_btn epf_btn_bg" style="width:82px;" v-else-if="isSub == 1">
              下一步
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Map from "@/components/common/tianditu/tianditu";
import baseURL1 from "@/util/config.js";
export default {
  data() {
    let greenSpaceRate = (rule, value, callback) => {
      if (
        this.ruleForm.greenSpaceRate &&
        this.ruleForm.greenSpaceRate2 &&
        this.ruleForm.greenSpaceRateSymbol1 &&
        this.ruleForm.greenSpaceRateSymbol2
      ) {
        this.$refs["ruleForm"].validateField("greenSpaceRate2");
      }
      callback();
    };
    let greenSpaceRate2 = (rule, value, callback) => {
      if (
        this.ruleForm.greenSpaceRate2 &&
        this.ruleForm.greenSpaceRate - this.ruleForm.greenSpaceRate2 > 0
      ) {
        console.log(
          "==this.ruleForm.greenSpaceRate==",
          this.ruleForm.greenSpaceRate
        );
        console.log(
          "==this.ruleForm.greenSpaceRate2==",
          this.ruleForm.greenSpaceRate2
        );
        callback(new Error("最大值不能小于最小值!"));
      } else {
        callback();
      }
    };
    let plotRatio = (rule, value, callback) => {
      if (
        this.ruleForm.plotRatio &&
        this.ruleForm.plotRatio2 &&
        this.ruleForm.plotRatioSymbol1 &&
        this.ruleForm.plotRatioSymbol2
      ) {
        this.$refs.ruleForm.validateField("plotRatio2");
      }
      callback();
    };
    let plotRatio2 = (rule, value, callback) => {
      if (
        this.ruleForm.plotRatio2 &&
        this.ruleForm.plotRatio - this.ruleForm.plotRatio2 > 0
      ) {
        callback(new Error("最大值不能小于最小值!"));
      } else {
        callback();
      }
    };

    let buildingDensity = (rule, value, callback) => {
      if (
        this.ruleForm.buildingDensity &&
        this.ruleForm.buildingDensity2 &&
        this.ruleForm.buildingDensitySymbol1 &&
        this.ruleForm.buildingDensitySymbol2
      ) {
        this.$refs.ruleForm.validateField("buildingDensity2");
      }
      callback();
    };

    let buildingDensity2 = (rule, value, callback) => {
      if (
        this.ruleForm.buildingDensity2 &&
        this.ruleForm.buildingDensity - this.ruleForm.buildingDensity2 > 0
      ) {
        callback(new Error("最大值不能小于最小值!"));
      } else {
        callback();
      }
    };

    const numberDator = (rule, value, callback) => {
      if (this.ruleForm.circulationName == "出租") {
        if (value < 0 || value > 20) {
          callback(new Error("数值在 0 至 20 之间"));
        } else {
          callback();
        }
      } else {
        if (value < 0 || value > 100) {
          callback(new Error("数值在 0 至 100 之间"));
        } else {
          callback();
        }
      }
    };
    return {
      landtype:"",
      msgCode: null,
      sureShow: true,
      visible: false,
      isActive: "",
      isWrite: "",
      msg: "",
      scrollData: [
        {
          msg: "流转信息",
          leftImgUrlFull: require("../../../../../assets/image/circulation_full.png"),
          leftImgUrl: require("../../../../../assets/image/circulation.png"),
          rightImgUrl: require("../../../../../assets/image/success.png"),
          rightImgUrlFull: require("../../../../../assets/image/notwrite.png")
        },
        {
          msg: "地块信息",
          leftImgUrl: require("../../../../../assets/image/plot.png"),
          leftImgUrlFull: require("../../../../../assets/image/plot_full.png"),
          rightImgUrl: require("../../../../../assets/image/success.png"),
          rightImgUrlFull: require("../../../../../assets/image/notwrite.png")
        },
        {
          msg: "附属物及建筑信息",
          leftImgUrl: require("../../../../../assets/image/appurtenances.png"),
          leftImgUrlFull: require("../../../../../assets/image/appurtenances_full.png"),
          rightImgUrl: require("../../../../../assets/image/success.png"),
          rightImgUrlFull: require("../../../../../assets/image/notwrite.png")
        }
      ],
      fileList: [],
      fileListVideo: [],
      //				视频上传
      isSub: 0,
      //				videoFlag: false,
      disabledType: true, //流转方式是否禁用
      disabledTypeyear:false,//剩余使用年限是否禁用
      pmKey: "",
      videoFlag: true,
      uploadUrl: "https://jsonplaceholder.typicode.com/posts/",
      videoUploadPercent: "",
      isShowUploadVideo: true,
      videoForm: {
        videoUploadId: "",
        Video: "../../../../../assets/video/a.mp4"
      },
      greenSpaceRateSymbolSelect1: [
        {
          lable: "请选择符号",
          value: "请选择符号"
        },
        {
          lable: "<",
          value: "<"
        },
        {
          lable: "<=",
          value: "<="
        },
        {
          lable: "=",
          value: "="
        }
      ],
      greenSpaceRateSymbolSelect2: [],
      buildingDensitySymbolSelect1: [
        {
          lable: "请选择符号",
          value: "请选择符号"
        },
        {
          lable: "<",
          value: "<"
        },
        {
          lable: "<=",
          value: "<="
        },
        {
          lable: "=",
          value: "="
        }
      ],
      buildingDensitySymbolSelect2: [],
      plotRatioSymbolSelect1: [
        {
          lable: "请选择符号",
          value: "请选择符号"
        },
        {
          lable: "<",
          value: "<"
        },
        {
          lable: "<=",
          value: "<="
        },
        {
          lable: "=",
          value: "="
        }
      ],
      plotRatioSymbolSelect2: [],
      // plotRatioSymbol
      // videoFlag:true,
      publishLandtype: "",
      active: 0,
      isShowProvince: true,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        //流转方式：
        circulation: "",
        circulationName: "",
        //标题：
        title: "",
        // 土地性质
        landChar: "",
        //省
        cantonProvince: "",
        cantonProvinceName: "",
        //市
        cantonCity: "",
        cantonCityName: "",
        //区
        cantonArea: "",
        cantonAreaName: "",
        // 使用权类型：
        useType: "",
        // 划拨决定书号
        decisionNum: "",
        // 土地类型
        landType: "",
        // 土地一级用途
        firstClassUse: "",
        firstClassUseName: "",
        // 土地二级用途
        secondClassUse: "",
        secondClassUseName: "",
        // 转让、出租、抵押面积
        area: "",
        // 使用权截止日期：
        endDate: "",
        // 转让、出租、抵押年限
        years: "",
        // 土地坐落
        location: "",
        // 坐标
        coordinate: "",
        east: "",
        west: "",
        south: "",
        north: "",
        // 拟转让、出租、抵押价格
        price: "",
        // 权证号类型
        warrantNumType: "",
        // 权证号
        warrantNum: "",
        // 登录机构
        registration: "",
        registrationeName: "",
        // 不动产单元号
        unitNum: "",
        // 是否连同地上建筑物、其他附着物
        adjunct: "0",
        isPercent: "0",
        isDevelope: "0",
        // 建筑面积
        buildArea: "",
        // 建筑结构
        buildingStructure: "",
        //绿地率
        greenSpaceRate: "",
        greenSpaceRate2: "",
        greenSpaceRateSymbol1: "",
        greenSpaceRateSymbol2: "",
        //建筑密度
        buildingDensity: "",
        buildingDensity2: "",
        buildingDensitySymbol1: "",
        buildingDensitySymbol2: "",
        //建筑限高
        heightLimit: "",
        //容积率
        plotRatio: "",
        plotRatio2: "",
        plotRatioSymbol1: "",
        plotRatioSymbol2: "",
        // 其他说明
        remark: "",
        //图片
        img: "",
        fileList: [],
        fileListVideo: [],
        pId: null,
        photoFirstUpload: true,
        id: "",
        fileId: "",
        imgUrlId: [], //图片上传成功返回的图片Id
        videoUrlId: [], //视频上传成功返回的视频Id
        entrustAgencyName: "",
        entrustAgency: "",
        entrustAgencyId: "",
        trustOrgId: "",
        trustOrgName: "",
        orgs: [] // 交易中心
      },
      rules: {
        entrustAgency: [
          {
            required: true,
            message: "请选择委托机构"
          }
        ],
        circulation: [
          {
            required: true,
            message: "请选择流转方式"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,15,60,'15到60个字符之间')} },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5\,，\-\—\、\]\[\【】（）()]+$/,
            message:
              "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
            // pattern: /^[\u4E00-\u9FA5][A-Za-z0-9\u4e00-\u9fa5\.\,，\-\—\、\]\[\【】（）()]+$/,
          }
        ],
        landChar: [
          {
            required: true,
            message: "请选择土地性质",
            trigger: "change"
          }
        ],
        cantonProvince: [
          {
            required: true,
            message: "请选择土地所在省",
            trigger: "change"
          }
        ],
        cantonCity: [
          {
            required: true,
            message: "请选择土地所在市",
            trigger: "change"
          }
        ],
        cantonArea: [
          {
            required: true,
            message: "请选择土地所在区",
            trigger: "change"
          }
        ],
        trustOrgId: [
          {
            required: true,
            message: "请选择土地所在交易中心",
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
        landType: [
          {
            required: true,
            message: "请选择土地类型",
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
        area: [
          {
            required: true,
            message: "请输入面积"
          },
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "土地面积输入位字数超出最长限度"
          }
        ],
        endDate: [
          {
            required: true,
            message: "请输入使用权截止日期",
            trigger: "change"
          }
        ],
        years: [
          {
            required: true,
            message: "请输入使用年限"
          },
          {
            pattern: /^[1-9]\d*(\.\d{1})?$/,
            message: "转让年限最小为1,且最多一位小数"
          },
          {
            validator: numberDator // 自定义验证数值大小 大于等于0,小于等于100;
          }
        ],
        location: [
          {
            required: true,
            message: "请输入土地详细地址",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        east: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        west: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        south: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        north: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        price: [
          {
            pattern: /^[1-9]\d*$/,
            message: "价格有误,请输入整数"
          },
          // {
          //   // pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
          //   pattern: /^(([1-9]\d{1,9})|([1-9])|(([1-9]\.\d{1,2}|[0]\.\d{1,2}|[1-9]\d{1,10}\.\d{1,2})))$/,
          //   message: "允许输入小数点后2位，小数点前不超过10位"
          // }
        ],
        warrantNumType: [
          {
            required: true,
            message: "请选择权证号类型",
            trigger: "change"
          }
        ],
        warrantNum: [
          {
            required: true,
            message: "请输入权证号",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
          // pattern: /^[\u4E00-\u9FA5][A-Za-z0-9\u4e00-\u9fa5\.\,，\-\—\、\【】()（）]+$/,
        ],
        registration: [
          { required: true, message: "请输入登记机构", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        unitNum: [
          {
            required: true,
            message: "请输入不动产单元号"
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "不动产单元号由英文和数字组成."
          },
          {
            min: 28,
            max: 28,
            message: "不动产单元号为28位，长度有误"
          },
        ],
        // 划拨决定书号
        decisionNum: [
          {
            required: true,
            message: "请填写该信息",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
          // pattern: /^[\u4E00-\u9FA5][\u4E00-\u9FA5A-Za-z0-9_()【】-（）——]+$/,
          // pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][A-Za-z0-9\u4e00-\u9fa5\.\,，\-\—\、\【】()（）]+$/,
        ],
        adjunct: [{ required: true }],
        buildArea: [
          {
           pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
          message: "建筑面积输入数字超出最长限度"
          }
        ],
        heightLimit: [
          {
            pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
            message: "请输入正确的建筑限高,最多两位小数."
          }
        ],
        greenSpaceRate: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: greenSpaceRate,
            trigger: "blur"
          }
        ],
        greenSpaceRate2: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: greenSpaceRate2,
            trigger: "blur"
          }
        ],
        buildingDensity: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: buildingDensity,
            trigger: "blur"
          }
        ],
        buildingDensity2: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: buildingDensity2,
            trigger: "blur"
          }
        ],
        plotRatio: [
          {
            // pattern: /^(\d(\.\d)?|9)(\.\d{1,2})$|^10(\.0{1,2}){0,1}$/,
            pattern: /^(\d|[1-9]|10)(\.\d{1,2})?$/,
            message: "0-10的值,最多两位小数"
          },
          {
            validator: plotRatio,
            trigger: "blur"
          }
        ],
        plotRatio2: [
          {
            // pattern: /^(\d(\.\d)?|9)(\.\d{1,2})$|^10(\.0{1,2}){0,1}$/,
            pattern: /^(\d|[1-9]|10)(\.\d{1,2})?$/,
            message: "0-10的值,最多两位小数"
          },
          {
            validator: plotRatio2,
            trigger: "blur"
          }
        ],
        remark:[
          // { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,2000,'长度在2000字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          
        ]
      },
      photoPId: "",
      photoUploadError: false,
      dialogVisibleMap: false, //地图找地对话框
      dicRequest: [
        "flow_mode",
        "land_nature",
        "use_type",
        "land_type",
        "land_use",
        "own_no_type",
        "register_organization",
        "building_structure",
        "administrative_regions"
      ], //字典码请求
      orgList: "",
      dictionary: {
        //字典码结果
        flow_mode: "",
        land_nature: "",
        use_type: "",
        land_type: "",
        land_use: "",
        own_no_type: "",
        register_organization: "",
        building_structure: "",
        administrative_regions: "",
        land_use_second: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      baseUrl: "",
      addressLagLng: null,
      MapContent: "", //地块搜索信息
      longitude: "", // 经度
      latitude: "", // 纬度
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      }
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    console.log("点击编辑图片和视频回显的路径", this.baseUrl);
    this.getSessionOrgs();
    var self = this;
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-admin/dictionaries/getDictsByCodeOrParentId?code=${item}`,
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
            `/epf-admin/dictionaries/getDictEbyDictGroup/${item}`,
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
    console.log("this.$store.state.publishLand", this.$store.state.publishLand);
    if (this.$store.state.publishLand) {
      this.ruleForm = this.$store.state.publishLand;
      this.setSelectData(this.dictionary.administrative_regions);
      this.ruleForm.useType =
        this.ruleForm.useType == "" ? "" : this.ruleForm.useType;

      this.fileList = this.ruleForm.fileList;
      this.fileListVideo = this.ruleForm.fileListVideo;
      this.comGreenSpaceRateSymbol("greenSpaceRateSymbol1");
      this.comGreenSpaceRateSymbol("buildingDensitySymbol1");
      this.comGreenSpaceRateSymbol("plotRatioSymbol1");
    } else if (this.$route.query.id) {
      // this.$store.state.publishLand
      //从个人中心携带Id进入
      // this.ruleForm.id = this.$route.query.id;
      this.$store.state.publishLand = {};
      this.$store.state.publishLand["id"] = this.$route.query.id;
      this.$axios.get(
        "/epf-landweb/tsell/getTSellById",
        {
          id: this.$route.query.id
        },
        res => {
          console.log(res);
          //工作流更改后新增字段在编辑时候的赋值
          this.$axios.get("/epf-landweb/api/createId", {}, res1 => {
            res.tSell["applyId"] = res1.id;

            console.log("携带ID请求数据", res);
            this.ruleForm = res.tSell;

            this.comGreenSpaceRateSymbol("greenSpaceRateSymbol1");
            this.comGreenSpaceRateSymbol("buildingDensitySymbol1");
            this.comGreenSpaceRateSymbol("plotRatioSymbol1");

            function getChangeDate(date) {
              return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
                ? /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)[0]
                : "";
            }

            res.tSell.endDate = getChangeDate(res.tSell.endDate);

            res.tSell["pId"] = res.tSell.img;
            res.tSell["fileList"] = [];
            res.tSell["fileListVideo"] = [];
            res.tSell["imgUrlId"] = [];
            res.tSell["videoUrlId"] = [];

            res.tSell.price = res.tSell.price
              ? res.tSell.price.toString()
              : null;
            res.tSell.buildArea = res.tSell.buildArea
              ? res.tSell.buildArea.toString()
              : null;
            res.tSell.heightLimit = res.tSell.heightLimit
              ? res.tSell.heightLimit.toString()
              : null;
            this.pulishName(res.tSell.circulation);
            this.ruleForm.cantonArea = res.tSell.cantonArea;
            this.orgselect();

            //请求附件组
            if (res.tSell.id) {
              self.ruleForm.fileId = res.tSell.fileId; //todo
              this.$axios.get(
                "/epf-document/document/getOneGroupFilsById",
                {
                  id: res.tSell.pId
                },
                files => {
                  let filesData = files.fileList;
                  console.log("附件数据", files);
                  for (let index = 0; index < filesData.length; index++) {
                    console.log(filesData[index].name.split(".").slice(-1)[0]);
                    if (
                      // filesData[index].extName == "png" ||
                      // filesData[index].extName == "PNG" ||
                      // filesData[index].extName == "jpg" ||
                      // filesData[index].extName == "JPG"
                      filesData[index].name.split(".").slice(-1)[0] == "png" ||
                      filesData[index].name.split(".").slice(-1)[0] == "PNG" ||
                      filesData[index].name.split(".").slice(-1)[0] == "jpg" ||
                      filesData[index].name.split(".").slice(-1)[0] == "JPG" ||
                      filesData[index].name.split(".").slice(-1)[0] == "gif" ||
                      filesData[index].name.split(".").slice(-1)[0] == "GIF"
                    ) {
                      //更新封面图
                      if (index == 0) {
                        this.ruleForm.img = filesData[index].id;
                      }
                      let fileimg = {
                        url: this.baseUrl + filesData[index].id,
                        status: "success",
                        name: filesData[index].name,
                        id: filesData[index].id
                      };
                      res.tSell.fileList.push(fileimg);

                      // this.ruleForm.imgUrlId.push(filesData[index].id);
                      console.log(fileimg);
                      this.ruleForm.imgUrlId.push(filesData[index].id);
                    }
                    // if (filesData[index].extName == "mp4") {
                    if (
                      filesData[index].name.split(".").slice(-1)[0] == "mp4"
                    ) {
                      res.tSell.fileListVideo.push({
                        url: this.baseUrl + filesData[index].id,
                        status: "success",
                        name: filesData[index].name,
                        id: filesData[index].id
                      });
                      this.ruleForm.videoUrlId.push(filesData[index].id);
                    }
                  }
                  this.ruleForm["id"] = this.$route.query.id;
                  res.tSell["photoFirstUpload"] = false;
                  this.$store.state.publishLand = res.tSell;
                  this.ruleForm = res.tSell;
                  console.log(this.ruleForm);
                  this.fileList = this.ruleForm.fileList;
                  this.fileListVideo = this.ruleForm.fileListVideo;
                  this.setSelectData(this.dictionary.administrative_regions);
                }
              );
            } else {
              this.ruleForm["id"] = this.$route.query.id;
              res.tSell["photoFirstUpload"] = true;
              this.$store.state.publishLand = res.tSell;
              this.ruleForm = res.tSell;
              this.setSelectData(this.dictionary.administrative_regions);
            }
          });
        }
      );
    } else {
      this.$axios.get("/epf-landweb/api/createId", {}, res => {
        this.ruleForm["id"] = res.id;
        //工作流更改后新增字段的赋值
        this.$axios.get("/epf-landweb/api/createId", {}, res1 => {
          this.ruleForm["applyId"] = res1.id;
          console.log(this.ruleForm);
        });
      });
    }

    if (this.$route.query.landtype) {
      this.pulishType(Number(this.$route.query.landtype));
    } else {
      this.pulishName(this.ruleForm.circulation);
    }
  },
  computed: {
    dicChange() {
      return this.dictionary.administrative_regions;
    }
  },
  methods: {
     p(s) {
      return s < 10 ? '0' + s : s
    },
     selectDatarange() {
      //使用权截止
      let nowDate = new Date(this.ruleForm.endDate)
      let today_y  = nowDate.getFullYear()
      let today_m  = this.p((nowDate.getMonth() + 1))
      let today_d =  this.p(nowDate.getDate())
      //获取今日日期
      let dateBegin = new Date()
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
        
      if (this.ruleForm.circulation == "transfer" ||  this.ruleForm.circulationName == "转让") {
        this.ruleForm.years = years;
      }
    },
    sureMsg() {
      this.visible = true;
      this.$router.push({
        path: "/PublishLandHome",
        query: { id: this.WarrantNumId }
      });
    },
    stateChange(warrantNum) {
      this.$axios.get(
        `/epf-landweb/admin/tsell/checkWarrantNum`,
        { warrantNum: warrantNum },
        res => {
          this.visible = true;
          this.msg = res.date.err;
          this.msgCode = res.date.code;
          if (res.date.code == 0) {
            this.visible = false;
            this.sureShow = false;
          } else if (res.date.code == 1) {
            this.visible = true;
            this.sureShow = false;
          } else if (res.date.code == 2) {
            this.visible = true;
            this.WarrantNumId = res.date.id;
            this.sureShow = true;
          } else {
            this.visible = false;
            this.sureShow = false;
          }
        }
      );
    },
    //滚动事件
    handleScroll() {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (
        this.$refs.one &&
        this.$refs.one.$el.offsetTop &&
        this.$refs.three &&
        this.$refs.two.$el.offsetTop &&
        this.$refs.two &&
        this.$refs.three.$el.offsetTop
      ) {
        if (
          scrollTop >=
          this.$refs.two.$el.offsetTop - this.$refs.one.$el.offsetTop
        ) {
          this.isActive = 0;
          // 判断是否有内容且为必填
          this.$refs.ruleFormOne.fields.map((item, index) => {
            if (
              (item.fieldValue == "" && item.isRequired) ||
              item.validateMessage != ""
            ) {
              this.isWrite = "";
            } else if (item.fieldValue != "" && item.isRequired) {
              this.isWrite = 1;
            }
          });
        }
        if (
          scrollTop >= this.$refs.two.$el.offsetTop - 100 &&
          scrollTop <= this.$refs.three.$el.offsetTop - 100
        ) {
          this.isActive = 1;
          // 判断是否有内容且为必填
          this.$refs.ruleFormTwo.fields.map((item, index) => {
            if (
              (item.fieldValue == "" && item.isRequired) ||
              item.validateMessage != ""
            ) {
              this.isWrite = "";
            } else if (item.fieldValue != "" && item.isRequired) {
              this.isWrite = 2;
            }
          });
        }
        if (scrollTop >= this.$refs.three.$el.offsetTop - 100) {
          this.isActive = 2;
          // 判断是否有内容且为必填
          if (
            this.$refs.ruleFormThree.fields[0].fieldValue != "" &&
            this.$refs.ruleFormThree.fields[0].isRequired
          ) {
            this.isWrite = 3;
          }
        }
      }
    },
    // 楼层跳转
    jump(index) {
      var items = document.querySelectorAll(".scroll-item");
      for (var i = 0; i < items.length; i++) {
        if (index === i) {
          this.isActive = i;
          items[i].scrollIntoView({
            block: "start", //默认跳转到顶部
            behavior: "smooth" //滚动的速度
          });
        }
      }
    },
    // 获取交易中心机构
    getTransOrgCenters(area) {
      this.$axios.get(
        `/epf-cms/admin/org/getChildOrgList`,
        {
          id: "",
          area: area
        },
        res => {
          console.log("获取交易中心机构----", res);
          if (res.code == 0) {
            this.orgs = res.orgs;
          }
        }
      );
    },
    entrustAgencySelect(dic, entrustAgency, event) {
      this.ruleForm.entrustAgency = this.$refs[entrustAgency][0].$attrs.id;
      this.ruleForm.entrustAgencyId = this.$refs[entrustAgency][0].$attrs.id;
      this.ruleForm.trustOrgId = this.$refs[entrustAgency][0].$attrs.id;
    },

    headCall(msg, add) {
      //点击地图方法
      console.log("这是返回经纬度：", msg);
      this.ruleForm.coordinate = msg;
    },
    change(params, val, key) {
      this.comGreenSpaceRateSymbol(key);
      if (params == "请选择符号" && val != "") {
        if (key === "greenSpaceRateSymbol1") {
          this.ruleForm.greenSpaceRateSymbol1 = "";
          this.ruleForm.greenSpaceRate = "";
        }
        if (key === "greenSpaceRateSymbol2") {
          this.ruleForm.greenSpaceRateSymbol2 = "";
          this.ruleForm.greenSpaceRate2 = "";
        }
        if (key === "buildingDensitySymbol1") {
          this.ruleForm.buildingDensitySymbol1 = "";
          this.ruleForm.buildingDensity = "";
        }
        if (key === "buildingDensitySymbol2") {
          this.ruleForm.buildingDensitySymbol2 = "";
          this.ruleForm.buildingDensity2 = "";
        }
        if (key === "plotRatioSymbol1") {
          this.ruleForm.plotRatioSymbol1 = "";
          this.ruleForm.plotRatio = "";
        }
        if (key === "plotRatioSymbol2") {
          this.ruleForm.plotRatioSymbol2 = "";
          this.ruleForm.plotRatio2 = "";
        }
      }
    },
    comGreenSpaceRateSymbol(key) {
      if (
        key === "greenSpaceRateSymbol1" &&
        this.ruleForm.greenSpaceRateSymbol1 === "<"
      ) {
        this.greenSpaceRateSymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          },
          {
            lable: "<",
            value: "<"
          },
          {
            lable: "<=",
            value: "<="
          }
        ];
      }
      if (
        key === "greenSpaceRateSymbol1" &&
        this.ruleForm.greenSpaceRateSymbol1 === "="
      ) {
        this.ruleForm.greenSpaceRateSymbol2 = "";
        this.greenSpaceRateSymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          }
        ];
      }
      if (
        key === "greenSpaceRateSymbol1" &&
        this.ruleForm.greenSpaceRateSymbol1 === "<="
      ) {
        this.greenSpaceRateSymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          },
          {
            lable: "<",
            value: "<"
          },
          {
            lable: "<=",
            value: "<="
          }
        ];
      }

      if (
        key === "buildingDensitySymbol1" &&
        this.ruleForm.buildingDensitySymbol1 === "<"
      ) {
        this.buildingDensitySymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          },
          {
            lable: "<",
            value: "<"
          },
          {
            lable: "<=",
            value: "<="
          }
        ];
      }
      if (
        key === "buildingDensitySymbol1" &&
        this.ruleForm.buildingDensitySymbol1 === "="
      ) {
        this.ruleForm.buildingDensitySymbol2 = "";
        this.buildingDensitySymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          }
        ];
      }
      if (
        key === "buildingDensitySymbol1" &&
        this.ruleForm.buildingDensitySymbol1 === "<="
      ) {
        this.buildingDensitySymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          },
          {
            lable: "<",
            value: "<"
          },
          {
            lable: "<=",
            value: "<="
          }
        ];
      }

      if (
        key === "plotRatioSymbol1" &&
        this.ruleForm.plotRatioSymbol1 === "<"
      ) {
        this.plotRatioSymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          },
          {
            lable: "<",
            value: "<"
          },
          {
            lable: "<=",
            value: "<="
          }
        ];
      }
      if (
        key === "plotRatioSymbol1" &&
        this.ruleForm.plotRatioSymbol1 === "="
      ) {
        this.ruleForm.plotRatioSymbol2 = "";
        this.plotRatioSymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          }
        ];
      }
      if (
        key === "plotRatioSymbol1" &&
        this.ruleForm.plotRatioSymbol1 === "<="
      ) {
        this.plotRatioSymbolSelect2 = [
          {
            lable: "请选择符号",
            value: "请选择符号"
          },
          {
            lable: "<",
            value: "<"
          },
          {
            lable: "<=",
            value: "<="
          }
        ];
      }
    },
    pulishName(name) {
      if (name == "transfer") {
        this.pulishType(1);
      } else if (name == "rent") {
        this.pulishType(2);
      } else if (name == "mortgage") {
        this.pulishType(3);
      }
    },
    pulishType(typeName) {
      this.landtype = typeName
      if (typeName === 1) {
        this.publishLandtype = "剩余使用";
        this.disabledTypeyear = true;
        this.ruleForm.circulation = "transfer";
        this.ruleForm.circulationName = "转让";
      } else if (typeName === 2) {
        this.publishLandtype = "出租";
        this.ruleForm.circulation = "rent";
        this.ruleForm.circulationName = "出租";
      } else if (typeName === 3) {
        this.publishLandtype = "抵押";
        this.ruleForm.circulation = "mortgage";
        this.ruleForm.circulationName = "抵押";
      }
    },
    //上传图片验证
    beforeAvatarUploadImg(file) {
      const isJPG = file.name.split(".").slice(-1)[0] === "jpg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (file.size === 0) {
        this.$message.error("上传土地照片大小不能为0");
        return false;
      }
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error("上传土地照片只能是 jpg , png , gif 格式!");
        return false;
      }
      if (!isLt6M) {
        this.$message.error("上传土地照片大小不能超过 6MB!");
        return false;
      }
    },
    //上传视频验证
    beforeAvatarUploadVideo(file) {
      const isMP4 = file.type === "video/mp4";
      const isFLV = file.name.split(".").slice(-1)[0] === "flv";
      const isAVI = file.type === "video/avi";
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (file.size === 0) {
        this.$message.error("上传土地视频大小不能为0");
        return false;
      }
      if (!isMP4 && !isFLV && !isAVI) {
        this.$message.error("上传土地照片只能是 mp4 , flv , avi 格式!");
        return false;
      }
      if (!isLt300M) {
        this.$message.error("上传视频大小不能超过300MB哦!");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    fileChange(file) {},
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.errorCode == "00") {
        this.global.company.showVideoPath = res.sprbody.urlAddress;
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
    videoUploadFile(files) {
      //上传方法
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      if (this.ruleForm.fileId) {
        formData.append("pId", this.ruleForm.fileId);
        this.videoUpload(formData, files, file);
        return;
      }
      if (!this.ruleForm.fileId) {
        //第一张图片上传
        console.log("第一个视频上传");
        this.ruleForm.photoFirstUpload = false;
        this.videoUpload(formData, files, file, "first");
        return;
      }
    },
    photoUploadFile(files) {
      //土地图片上传
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      if (this.ruleForm.fileId) {
        formData.append("pId", this.ruleForm.fileId);
        this.photoUpload(formData, files, file);
        return;
      }

      if (!this.ruleForm.fileId) {
        //第一张图片上传
        console.log("第一张图片上传");
        this.ruleForm.photoFirstUpload = false;
        this.photoUpload(formData, files, file, "first");
        return;
      }
    },
    photoUpload(formData, files, file, count) {
      var self = this;

      //修改初始化图片数组
      if (!self.ruleForm.imgUrlId && self.ruleForm.fileList) {
        for (let j = 0; j < self.ruleForm.fileList.length; j++) {
          let item = self.ruleForm.fileList[j];
          let name = item.name;
          // JPG , PNG , GIF
          //1、获取文件名的后三位，看看是否是图片文件
          let type = name.substring(name.length - 3, name.length);
          type = type.toLocaleLowerCase();
          //2、获取文件的ID，储存到imgUrlId中去
          let url = item.url;
          let id = url.substring(url.length - 36, url.length);
          if (
            type == "jpg" ||
            type == "png" ||
            type == "gif" ||
            type == "JPG" ||
            type == "PNG" ||
            type == "GIF"
          ) {
            self.ruleForm.imgUrlId.push(id);
          }
        }
      }

      //添加
      //图片上传
      this.$axios.post(
        "/epf-document/document/upload",
        formData,
        res => {
          if (res.data.state != "SUCCESS") {
            if (count == "first") {
              // 第一张上传出错
              self.ruleForm.photoFirstUpload = true;
              return null;
            }
            return null;
          }

          if (!self.ruleForm.fileId || count == "first") {
            self.ruleForm.fileId = res.data.data[0].pId;
            self.ruleForm.img = res.data.data[0].id;
          }
          if (self.ruleForm.fileId && !self.ruleForm.photoFirstUpload) {
            self.$refs.photoUploader.submit();
          }
          self.ruleForm["imgUrlId"].push(res.data.data[0].id);
          files.onSuccess(res);
          console.log("this.ruleForm", self.ruleForm);
        },
        function(event) {
          //进度条
          file.percent = (event.loaded / event.total) * 100;
          files.onProgress(file);
        },
        "upload"
      );
    },
    videoUpload(formData, files, file, count) {
      let self = this;

      //修改时初始化视频数组
      if (!self.ruleForm.videoUrlId && self.ruleForm.fileList) {
        for (let j = 0; j < self.ruleForm.fileList.length; j++) {
          let item = self.ruleForm.fileList[j];
          let name = item.name;
          // MP4 , FLV , AVI
          //1、获取文件名的后三位，看看是否是视频文件
          let type = name.substring(name.length - 3, name.length);
          type = type.toLocaleLowerCase();
          //2、获取文件的ID，储存到imgUrlId中去
          let url = item.url;
          let id = url.substring(url.length - 36, url.length);
          if (type == "mp4" || type == "flv" || type == "avi") {
            self.ruleForm.videoUrlId.push(id);
          }
        }
      }
      //视频上传
      this.$axios.post(
        "/epf-document/document/upload",
        formData,
        res => {
          console.log("上传文件返回", res.data.msg);
          if (res.data.state != "SUCCESS") {
            if (count == "first") {
              // 第一张上传出错
              self.ruleForm.photoFirstUpload = true;
              return null;
            }
            return null;
          }
          if (!self.ruleForm.fileId || count == "first") {
            self.ruleForm.fileId = res.data.data[0].pId;
            self.ruleForm.img = res.data.data[0].id;
          }
          self.ruleForm.videoUrlId.push(res.data.data[0].id);
          files.onSuccess(res);
        },
        function(event) {
          //进度条
          file.percent = (event.loaded / event.total) * 100;
          files.onProgress(file);
        },
        "upload"
      );
    },
    upLoadError(err, file, fileList) {},
    photoUploadSuccess(res, file, fileList) {
      if (!this.ruleForm.fileId) {
        this.ruleForm.fileId = res.data.data[0].pId;
      }
    },
    videoProgress() {
      //视频上传
      this.isSub = 1;
    },
    videoUploadSuccess(res, file, fileList) {
      //视频上传
      this.isSub = 0;

      if (!this.ruleForm.fileId) {
        this.ruleForm.fileId = res.data.data[0].pId;
      }
      this.ruleForm.fileListVideo = fileList;
      this.fileListVideo = fileList;
      for (let i = 0; i < this.ruleForm.fileListVideo.length; i++) {
        if (this.ruleForm.videoUrlId[i] === undefined) {
          break;
        }
        console.log(this.baseUrl);
        this.ruleForm.fileListVideo[i].url =
          this.baseUrl + this.ruleForm.videoUrlId[i];
        this.fileListVideo[i].url = this.baseUrl + this.ruleForm.videoUrlId[i];
      }
      this.$message.success("视频上传成功！");
    },
    //图片超出5张
    photoExceed(files, fileList) {
      this.$message.error("最多上传5张土地照片");
    },
    videoExceed(files, fileList) {
      this.$message.error("最多上传5个土地视频");
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
    setPhoto() {
      if (this.ruleForm.imgUrlId) {
        var UfileList = [];
        for (let i = 0; i < this.ruleForm.imgUrlId.length; i++) {
          UfileList.push({
            url: this.baseUrl + this.ruleForm.imgUrlId[i],
            status: "success",
            name: "",
            id: this.ruleForm.imgUrlId[i]
          });
          // this.fileList[i]['url'] = this.baseUrl + this.ruleForm.imgUrlId[i];
        }
        this.ruleForm.fileList = UfileList;
        this.fileList = UfileList;
        console.log("成功便利了所有的url", this.ruleForm);
      }
    },
    submitForm(formName, formNameT, formNameTh) {
      if (this.msgCode == 1 || this.msgCode == 2) {
        this.$message.error(this.msg);
      } else {
        //把图片的对象赋值
        this.setPhoto();
        //无附属物清空相应值
        if (this.ruleForm.adjunct == "1") {
          this.ruleForm.buildingDensity2 = "";
          this.ruleForm.buildingDensitySymbol2 = "";
          this.ruleForm.buildingDensitySymbol1 = "";
          this.ruleForm.buildingDensity = "";
          this.ruleForm.greenSpaceRate2 = "";
          this.ruleForm.greenSpaceRateSymbol2 = "";
          this.ruleForm.greenSpaceRateSymbol1 = "";
          this.ruleForm.greenSpaceRate = "";
          this.ruleForm.heightLimit = "";
          this.ruleForm.buildingStructure = "";
          this.ruleForm.resource1 = "";
          this.ruleForm.resource2 = "";
          this.ruleForm.buildArea = "";

          // this.ruleForm.plotRatio = "";
          // this.ruleForm.plotRatioSymbol1 = "";
          // this.ruleForm.plotRatioSymbol2 = "";
          // this.ruleForm.plotRatio2 = "";
          this.ruleForm.uPlotRatio = "";
          this.ruleForm.uPlotRatioSymbol1 = "";
          this.ruleForm.uPlotRatioSymbol2 = "";
          this.ruleForm.uPlotRatio2 = "";
        }
        if (this.ruleForm.fileList) {
        }
        // this.ruleForm.greenSpaceRate = this.ruleForm.greenSpaceRate == null ? '':this.ruleForm.greenSpaceRate;
        // this.ruleForm.greenSpaceRate2 = this.ruleForm.greenSpaceRate2 == null ? '':this.ruleForm.greenSpaceRate2;
        // this.ruleForm.buildingDensity = this.ruleForm.buildingDensity == null ? '':this.ruleForm.buildingDensity;
        // this.ruleForm.buildingDensity2 = this.ruleForm.buildingDensity2 == null ? '':this.ruleForm.buildingDensity2;
        // this.ruleForm.plotRatio = this.ruleForm.plotRatio == null ? '':this.ruleForm.plotRatio;
        // this.ruleForm.plotRatio2 = this.ruleForm.plotRatio2 == null ? '':this.ruleForm.plotRatio2;

        this.ruleForm.greenSpaceRateSymbol1 =
          this.ruleForm.greenSpaceRateSymbol1 == null
            ? ""
            : this.ruleForm.greenSpaceRateSymbol1;
        this.ruleForm.greenSpaceRateSymbol2 =
          this.ruleForm.greenSpaceRateSymbol2 == null
            ? ""
            : this.ruleForm.greenSpaceRateSymbol2;
        this.ruleForm.buildingDensitySymbol1 =
          this.ruleForm.buildingDensitySymbol1 == null
            ? ""
            : this.ruleForm.buildingDensitySymbol1;
        this.ruleForm.buildingDensitySymbol2 =
          this.ruleForm.buildingDensitySymbol2 == null
            ? ""
            : this.ruleForm.buildingDensitySymbol2;
        this.ruleForm.plotRatioSymbol1 =
          this.ruleForm.plotRatioSymbol1 == null
            ? ""
            : this.ruleForm.plotRatioSymbol1;
        this.ruleForm.plotRatioSymbol2 =
          this.ruleForm.plotRatioSymbol2 == null
            ? ""
            : this.ruleForm.plotRatioSymbol2;

        this.$refs[formName].validate(valid => {
          if (valid) {
            if (
              this.ruleForm.greenSpaceRateSymbol1 != "" &&
              (this.ruleForm.greenSpaceRate == "" ||
                this.ruleForm.greenSpaceRate == null)
            ) {
              this.$message.error("请输入绿地率下限");
              return;
            } else if (
              this.ruleForm.greenSpaceRateSymbol2 != "" &&
              (this.ruleForm.greenSpaceRate2 == "" ||
                this.ruleForm.greenSpaceRate2 == null)
            ) {
              this.$message.error("请输入绿地率上限");
              return;
            } else if (
              this.ruleForm.buildingDensitySymbol1 != "" &&
              (this.ruleForm.buildingDensity == "" ||
                this.ruleForm.buildingDensity == null)
            ) {
              this.$message.error("请输入建筑密度下限");
              return;
            } else if (
              this.ruleForm.buildingDensitySymbol2 != "" &&
              (this.ruleForm.buildingDensity2 == "" ||
                this.ruleForm.buildingDensity2 == null)
            ) {
              this.$message.error("请输入建筑密度上限");
              return;
            } else if (
              this.ruleForm.plotRatioSymbol1 != "" &&
              (this.ruleForm.plotRatio == "" || this.ruleForm.plotRatio == null)
            ) {
              this.$message.error("请输入容积率下限");
              return;
            } else if (
              this.ruleForm.plotRatioSymbol2 != "" &&
              (this.ruleForm.plotRatio2 == "" ||
                this.ruleForm.plotRatio2 == null)
            ) {
              this.$message.error("请输入容积率上限");
              return;
            }
            if (
              this.ruleForm.greenSpaceRateSymbol1 == "" &&
              this.ruleForm.greenSpaceRate != "" &&
              this.ruleForm.greenSpaceRate != null
            ) {
              this.$message.error("请选择绿地率下限符号");
              return;
            } else if (
              this.ruleForm.buildingDensitySymbol1 == "" &&
              this.ruleForm.buildingDensity != "" &&
              this.ruleForm.buildingDensity != null
            ) {
              this.$message.error("请选择建筑密度下限符号");
              return;
            } else if (
              this.ruleForm.plotRatioSymbol1 == "" &&
              this.ruleForm.plotRatio != "" &&
              this.ruleForm.plotRatio != null
            ) {
              this.$message.error("请选择容积率下限符号");
              return;
            }

            // if(this.ruleForm.greenSpaceRateSymbol2 == '' && this.ruleForm.greenSpaceRate2 != '' && this.ruleForm.greenSpaceRate2 != null){
            //   this.$message.error('请选择绿地率上限符号')
            //   return
            // }else if(this.ruleForm.buildingDensitySymbol2 == '' && this.ruleForm.buildingDensity2 != '' && this.ruleForm.buildingDensity2 != null){
            //   this.$message.error('请选择建筑密度上限符号')
            //   return
            // }else if(this.ruleForm.plotRatioSymbol2 == '' && this.ruleForm.plotRatio2 != '' && this.ruleForm.plotRatio2 != null){
            //   this.$message.error('请选择容积率上限符号')
            //   return
            // }
            // if(this.ruleForm.decisionNum){
            //   this.ruleForm.decisionNum=this.ruleForm.decisionNum
            // }else{
            //   this.ruleForm.decisionNum=""
            // }

            // this.$store.state.publishLand = this.ruleForm;
            // // this.ruleForm发送给后台h
            // if (this.$route.query.id) {
            //   this.$router.push({
            //     path: "/ApplicantInfo",
            //     query: {
            //       id: this.$route.query.id
            //     }
            //   });
            // } else {
            //   this.$router.push({
            //     path: "/ApplicantInfo",
            //     query: {
            //       landtype: this.$route.query.landtype
            //     }
            //   });
            // }

            this.$refs[formNameT].validate(valid => {
              if (!valid) {
                document.documentElement.scrollTop = 300;
                this.$message.error("请检查您的信息是否填写完整");
                return false;
              } else {
                this.$store.state.publishLand = this.ruleForm;
                // this.ruleForm发送给后台h
                if (this.$route.query.id) {
                  this.$router.push({
                    path: "/ApplicantInfo",
                    query: {
                      id: this.$route.query.id
                    }
                  });
                } else if(this.$route.query.landtype){
                  this.$router.push({
                    path: "/ApplicantInfo",
                    query: {
                      landtype: this.$route.query.landtype
                    }
                  });
                }else{
                   this.$router.push({
                    path: "/ApplicantInfo",
                    query: {
                      landtype: this.landtype
                    }
                  });

                }
              }
            });
          } else {
            document.documentElement.scrollTop = 300;
            this.$message.error("请检查您的信息是否填写完整");
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    photoHandleRemove(file, fileList) {
      //移除土地图片
      let that = this;
      let self = this;

      //修改初始化图片数组
      if (self.ruleForm.imgUrlId.length == 0) {
        for (let j = 0; j < self.ruleForm.fileList.length; j++) {
          let item = self.ruleForm.fileList[j];
          let name = item.name;
          // JPG , PNG , GIF
          //1、获取文件名的后三位，看看是否是图片文件
          let type = name.substring(name.length - 3, name.length);
          type = type.toLocaleLowerCase();
          //2、获取文件的ID，储存到imgUrlId中去
          let url = item.url;
          let id = url.substring(url.length - 36, url.length);
          if (type == "jpg" || type == "png" || type == "gif") {
            self.ruleForm.imgUrlId.push(id);
          }
        }
      }

      let id = file.id;
      // console.log("图片删除前id"+id);
      if (!id) {
        id = file.response.data.data[0].id;
      }
      let para = { id: id, fdId: "1" };
      let url = "/epf-document/document/deleteByFolder?id=" + id + "&fdId=1";
      this.$axios.post(url, {}, res => {
        if (res.state == "SUCCESS") {
          that.fileList = fileList;
          that.ruleForm.fileList = fileList;
          for (let i = 0; i < that.ruleForm.imgUrlId.length; i++) {
            if (that.ruleForm.imgUrlId[i] == id) {
              that.ruleForm.imgUrlId.splice(i, 1);
            }
            // console.log(that.ruleForm.imgUrlId[i]);
          }
          that.$message.success(res.msg);
        }
      });
    },
    handleRemove(file, fileList) {
      let self = this;

      //修改时初始化视频数组
      if (self.ruleForm.videoUrlId.length == 0) {
        for (let j = 0; j < self.ruleForm.fileList.length; j++) {
          let item = self.ruleForm.fileList[j];
          let name = item.name;
          // MP4 , FLV , AVI
          //1、获取文件名的后三位，看看是否是视频文件
          let type = name.substring(name.length - 3, name.length);
          type = type.toLocaleLowerCase();
          //2、获取文件的ID，储存到imgUrlId中去
          let url = item.url;
          let id = url.substring(url.length - 36, url.length);
          if (type == "mp4" || type == "flv" || type == "avi") {
            self.ruleForm.videoUrlId.push(id);
          }
        }
      }

      //移除土地视频
      let that = this;
      console.log("文件列表：", fileList);
      let id = file.id;
      if (!id) {
        id = file.response.data.data[0].id;
      }
      let url = "/epf-document/document/deleteByFolder?id=" + id + "&fdId=1";
      let para = { id: id, fdId: "1" };
      this.$axios.post(url, {}, res => {
        if (res.state == "SUCCESS") {
          that.fileListVideo = fileList;
          that.ruleForm.fileListVideo = fileList;
          for (let i = 0; i < that.ruleForm.videoUrlId.length; i++) {
            if (that.ruleForm.videoUrlId[i] == id) {
              that.ruleForm.videoUrlId.splice(i, 1);
            }
          }
          that.$message.success(res.msg);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleClose(done) {
      //关闭地图对话框
      done();
    },
    circulatemodeSelect(dic, circulationName, event) {
      this.ruleForm.circulation = this.$refs[circulationName][0].$attrs.dictKey;
      if (this.ruleForm.circulation == "transfer") {
        this.pulishType(1);
      } else if (this.ruleForm.circulation == "rent") {
        this.pulishType(2);
      } else if (this.ruleForm.circulation == "mortgage") {
        this.pulishType(3);
      }
    },
    firstClassUseSelect(dic, firstClassUse, event) {
      this.ruleForm.secondClassUse = "";
      this.ruleForm.secondClassUseName = "";
      this.dictionary.land_use_second = "";
      let pId = this.$refs[firstClassUse][0].$attrs.id;
      this.ruleForm.firstClassUse = this.$refs[firstClassUse][0].$attrs.dictKey;
      console.log(pId);

      this.$axios.get(
        `/epf-admin/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
        {},
        res => {
          console.log(res);
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
      console.log(this.ruleForm);
    },
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.trustOrgName = "";
      this.ruleForm.trustOrgId = "";
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      this.cantonCity = "";
      this.ruleForm.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.dictionary.cantonArea = [];
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        }
      );
      console.log("=======", this.$refs[cantonCode][0].$attrs);
      this.orgselect();
    },
    citySelect(dic, cantonCity, event) {
      this.ruleForm.trustOrgName = "";
      this.ruleForm.trustOrgId = "";
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonAreaName = "";
      this.cantonArea = "";

      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonArea = res.dictionariesList;
            return;
          }
          this.dictionary.cantonArea = "";
        }
      );
      this.orgselect();
    },
    orgselect() {
      var cantonProvince = this.ruleForm.cantonProvince;
      var cantonCity = this.ruleForm.cantonCity;
      var cantonArea = this.ruleForm.cantonArea;
      // this.ruleForm.trustOrgName = "";
      // this.ruleForm.trustOrgId = "";
      this.$axios.get(
        // `/epf-admin/admin/org/getOrgsByareas`,
        `/epf-landweb/landweb/sysenterprise/listSysEnterpriseByArea`,
        {
          cantonProvince: cantonProvince,
          cantonCity: cantonCity,
          cantonArea: cantonArea
        },
        res => {
          if (res.code == 0) {
            console.log(res);
            // sessionStorage.setItem("orgsDataList", JSON.stringify(res.orgs));
            sessionStorage.setItem(
              "orgsDataList",
              JSON.stringify(res.enterprises)
            );
            if (this.ruleForm.cantonAreaName !== "") {
              this.getSessionOrgs();
            } else {
              // this.orgList = res.orgs;
              this.orgList = res.enterprises;
              return;
            }
          }
        }
      );
    },
    getSessionOrgs() {
      this.orgList = JSON.parse(sessionStorage.getItem("orgsDataList"));
    },
    areaSelect(dic, cantonCity, event) {
      this.ruleForm.trustOrgName = "";
      this.ruleForm.trustOrgId = "";
      this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
      if(this.ruleForm.cantonArea != this.ruleForm.cantonCity){
        this.orgselect();
      }
    },
    registrationeSelect(dic, registration, event) {
      this.ruleForm.registration = event;
      // this.ruleForm.registration = this.$refs[registration][0].$attrs.dictKey;
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
              `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${this.dictionary.administrative_regions[i].id}`,
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
                        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${res.dictionariesList[i].id}`,
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
              `/epf-admin/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${this.dictionary.land_use[i].id}`,
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
    },

    useTypeSelect() {
      if (this.ruleForm.useType === "other2") {
        if (this.ruleForm.decisionNum == "") {
          return;
        } else {
          this.ruleForm.decisionNum = "";
        }
      }
      // if(this.ruleForm.useType != 'other2'){
      //   // this.$refs.decisionNum.clearValidate();
      //   this.ruleForm.decisionNum!=""
      // }
    },
    coordinateMap(val) {
      //地图调用父组件方法经纬度赋值
      console.log("地图标注的经纬度", val);
      this.longitude = val.lng;
      this.latitude = val.lat;
    },
    // 确定标注
    markerDown() {
      if (
        this.longitude &&
        this.longitude != "" &&
        this.latitude &&
        this.latitude != ""
      ) {
        this.ruleForm.coordinate = this.longitude + "," + this.latitude;
      }
      this.dialogVisibleMap = false;
    }
  },
  components: {
    "v-Map": Map
  },
  mounted() {
    const returnValue = "Are you sure you want to lose unsaved changes?";
    (window.onbeforeunload = e => {
      if (!this.changedFiles.length) return undefined;

      Object.assign(e, {
        returnValue
      });
      return returnValue;
    }),
      // 监听（绑定）滚轮滚动事件
      window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
    // 'onbeforeunload'
    dicChange(newValue, oldValue) {
      if (newValue != "") {
        this.setSelectData(this.dictionary.administrative_regions);
      }
    },
    greenSpaceRate(newValue, oldValue) {
      console.log("dfffffffffffe", newValue);
    },
    decisionNum(newValue, oldValue) {
      console.log("dfsss===", newValue);
      console.log("aa===", newValue);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.speech {
  position: relative;
  width: 270px;
  min-height: 40px;
  text-align: center;
  // line-height: 47px;
  background: #ffffff;
  border: 1px solid #f56c6c;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  margin-left: 15px;
  font-size: 14px;
  color: #f56c6c;
  padding: 8px 10px;
}
.speech::before {
  content: " ";
  position: absolute;
  @include size(0px, 0px);
  left: -16px;
  top: 11px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 16px solid #f56c6c;
}
.speech::after {
  content: " ";
  position: absolute;
  @include size(0px, 0px);
  left: -14px;
  top: 12px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 14px solid #fff;
}
.publishTra_main {
  @include size(1200px, auto);
  margin-bottom: 25px;
  background: #fff;
  /deep/ .el-popover__reference .question{
    width:18px;
    height:18px;
    display: inline-block;
    vertical-align: bottom;
    background:url("../../../../../assets/image/question-01.png") no-repeat
  }
  /deep/ .el-popover__reference:hover .question{
    background:url("../../../../../assets/image/question-02.png") no-repeat
  }
  &_cont {
    box-sizing: border-box;
    padding: 0px 80px 30px 120px;
    .findland_input {
      line-height: 38px;
      height: 38px;
      vertical-align: middle;
      cursor: pointer;
      img {
        vertical-align: middle;
      }
    }
  }
}

.explain {
  font-size: 14px;
  color: #999999;
  margin: 20px 0 20px 200px;
}
.steps {
  position: fixed;
  right: 25px;
  top: 220px;
  width: 184px;
  height: 138px;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 32px 0 32px 15px;
  .step {
    font-size: 14px;
    color: #666666;
    line-height: 14px;
    cursor: pointer;
    img {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
    .gap {
      width: 1px;
      height: 34px;
      background: #dddddd;
      margin: 7px 0 7px 5px;
    }
  }
}
.active {
  color: var(--lightColor);
  font-size: 16px;
  font-weight: bold;
}
</style>
<style>
#publishLandMapDialog .el-dialog {
  border-radius: 10px;
  border: solid 4px #ccd3dc;
}

#publishLandMapDialog .el-vue-search-box-container {
  margin-bottom: 20px;
  box-shadow: none;
  width: 560px;
}

#publishLandMapDialog .search-box-wrapper input {
  height: 40px;
  width: 500px;
  color: #979a9a;
  background-color: #f1f6f7;
}

#publishLandMapDialog .search-btn {
  cursor: pointer;
  border-radius: 3px;
  width: 120px;
  background-color: #ffa100;
  color: white;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  float: left;
}

#publishLandMapDialog .el-dialog .el-dialog__body {
  padding: 0px;
}

#publishLandMapDialog .el-dialog .el-dialog__header {
  padding: 0px;
}

#publishLandMapDialog .amap-page-container {
  padding: 20px;
}

.twoInput .el-form-item__error {
  left: 0 !important;
}

.canton_Regions > .el-form-item__content {
  margin-left: 5px !important;
}

.MapTitle {
  text-align: left;
  font-weight: 700;
  font-size: 20px;
  color: #333;
  padding: 8px 30px;
  border-bottom: solid 2px #f3f3f3;
}

.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus {
  border-color: #dcdfe6;
}
</style>
<style>
.canton_Regions > .el-form-item__content {
  margin-left: 5px !important;
}

.videoObj {
  float: left;
  margin-right: 10px;
  border-radius: 8px;
  background-color: #000;
  outline-style: none;
}

.videoObj:focus {
  border: solid 0px rgba(0, 0, 0, 0);
}

.videoBox {
  float: left;
  margin-right: 8px;
}

.videoList {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
}
</style>
