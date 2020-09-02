<template>
  <div class="Entrustland_warp">
    <div v-if="!detail" class="epf_proess">
      <span class="epf_proess_title">申请委托交易</span>
      <div class="epf_proess_cont">
        <epf-step :active="1" :data="['委托机构及土地基本信息','申请人基本信息','附件清单']"></epf-step>
      </div>
    </div>
    <div class="Entrustland_main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="204px"
        class="demo-ruleForm"
      >
        <epf-switchTitle
          titles_h="土地基本信息"
          padding="0px"
          background="#fff"
          height="80px"
          :shutOff="false"
        >
        </epf-switchTitle>
        <div class="Entrustland_main_cont">
          <el-form-item label="流转方式：" required>
            <!-- :disabled="true" -->
            <el-select
              v-model="ruleForm.circulationName"
              :disabled="disabledTypeyear ? true : false"
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
                v-for="item in dictionary.flow_mode.slice(0, 2)"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="item.dictKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="土地性质：" prop="landChar">
            <el-radio-group v-model="ruleForm.landChar">
              <el-radio
                :disabled="disabledType == 1 ? true : false"
                v-for="item in dictionary.land_nature"
                :label="item.dictKey"
                :key="item.zhCn"
                >{{ item.zhCn }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <span v-show="false">{{ dictionary.administrative_regions }}</span>
          <div
            style="display: flex;flex-direction: row; "
            class="cantonProvinceNactive"
          >
            <el-form-item
              label="所属行政区："
              prop="cantonProvince"
              style="width:421px;"
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
                :disabled="disabledType == 1 ? true : false"
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
                placeholder="请选择土地所在市"
                @change="
                  citySelect(
                    dictionary.cantonCity,
                    ruleForm.cantonCityName,
                    $event
                  )
                "
                :disabled="disabledType == 1 ? true : false"
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
                placeholder="请选择土地所在区/县"
                @change="
                  areaSelect(
                    dictionary.cantonAreaName,
                    ruleForm.cantonAreaName,
                    $event
                  )
                "
                :disabled="disabledType == 1 ? true : false"
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
          <el-form-item label="使用权类型：" prop="useType">
            <el-radio-group v-model="ruleForm.useType">
              <el-radio
                :disabled="disabledType == 1 ? true : false"
                v-for="item in dictionary.use_type"
                :label="item.dictKey"
                :key="item.zhCn"
                >{{ item.zhCn }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
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
              :disabled="detail==1 || disabledType == 1?true:false"
            ></el-input>
            <el-input
              v-if="ruleForm.useType == 'tosell'"
              v-model="ruleForm.decisionNum"
              placeholder="请输入建设用地使用权出让合同号"
              :disabled="detail==1 || disabledType == 1?true:false"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="土地类型：" prop="landType">
            <el-radio-group v-model="ruleForm.landType">
              <el-radio
                :disabled="disabledType == 1 ? true : false"
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
              style="width:421px;"
            >
              <el-select
                :disabled="disabledType == 1 ? true : false"
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
                :disabled="disabledType == 1 ? true : false"
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
                  :dictKey="item.dictKey"
                  :value="item.zhCn"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item
            :label="ruleForm.circulationName  + '面积：'"
            prop="area"
          >
            <el-input
              :disabled="disabledType == 1 ? true : false"
              style="width:491px;"
              v-model="ruleForm.area"
              :placeholder="
                '请输入' + ruleForm.circulationName  + '面积，例如：1000.02'
              "
            ></el-input>
            <span style="margin-left:20px;">平方米</span>
          </el-form-item>
          <el-form-item label="使用权截止日期：" prop="endDate">
            <el-col :span="11" style="width:491px;">
              <el-date-picker
                :disabled="disabledType == 1 ? true : false"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="ruleForm.endDate"
                style="width: 100%;"
                @change="selectDatarange"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item
            :label="publishLandtype + '年限：'"
            prop="years"
          >
            <el-input
              v-model="ruleForm.years"
              :placeholder="
                '请输入' + publishLandtype + '年限，例如：2.5'
              "
              style="width:491px;"
              :disabled="(disabledType == 1||publishLandtype=='剩余使用') ? true : false"
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

          <el-form-item label="土地坐落：" prop="location">
            <el-input
              :disabled="disabledType == 1 ? true : false"
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
            <!-- <el-dialog
                id="publishLandMapDialog"
                :visible.sync="dialogVisibleMap"
                @close="dialogVisibleMap = false"
                title="地图找地">
                    <v-Map style="height:500px" @coordinateMap="coordinateMap"></v-Map>
            </el-dialog>-->
            <el-dialog
              id="publishLandMapDialog"
              :visible.sync="dialogVisibleMap"
              @close="dialogVisibleMap = false"
              top="1%"
            >
              <h2 class="MapTitle">地块地理位置标注</h2>
              <div style="width:95%;height:500px;margin:10px auto;">
                <!-- <v-Map @coordinateMap="coordinateMap"></v-Map> -->
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
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.east"
              placeholder="东至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="南至：" prop="west">
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.west"
              placeholder="南至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="西至：" prop="south">
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.south"
              placeholder="西至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="北至：" prop="north">
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.north"
              placeholder="北至***路"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="'拟' + ruleForm.circulationName + '总价：'"
            prop="price"
           >
            <el-input :value="ruleForm.price ? ruleForm.price : ''"  style="width:491px;"  :disabled="detail == 1 ? true : false" v-if="detail==1"></el-input>
            <el-input
              v-else
              :disabled="detail == 1 ? true : false"
              v-model="ruleForm.price"
              :placeholder="
                '请输入拟' +
                  ruleForm.circulationName +
                  ',例如输入10000'
              "
              style="width:491px;"
            ></el-input>
            <span style="margin-left:20px;" >{{detail==1?'万元':'元'}}</span>
          </el-form-item>
          <el-form-item label="权证号类型：" prop="warrantNumType">
            <el-radio-group v-model="ruleForm.warrantNumType">
              <el-radio
                :disabled="disabledType == 1 ? true : false"
                v-for="item in dictionary.own_no_type"
                :label="item.dictKey"
                :key="item.zhCn"
                >{{ item.zhCn }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权证号：" prop="warrantNum">
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.warrantNum"
              placeholder="例如：浙（2017)德清县不动产第0018185号"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="登记机构：" prop="registration">
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.registration"
              placeholder="请输入登记机构"
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="不动产单元号：" prop="unitNum">
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.unitNum"
              placeholder="请输入不动产单元号 "
              style="width:491px;"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否连同地上建筑物、其他附着物："
            required
            label-width="320px"
           >
            <el-radio-group v-model="ruleForm.adjunct">
              <el-radio :disabled="disabledType == 1 ? true : false" label="0"
                >是</el-radio
              >
              <el-radio :disabled="disabledType == 1 ? true : false" label="1"
                >否</el-radio
              >
            </el-radio-group>
          </el-form-item>
            <!-- v-show="ruleForm.adjunct == '0'" -->
          <el-form-item
            label="房屋建设工程是否完成投资总额的25%以上："
            prop="isPercent"
            label-width="300px!important"
            style="margin-left:85px;"
           >
            <el-radio-group v-model="ruleForm.isPercent">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
            <!-- v-show="ruleForm.adjunct == '0'" -->
          <!-- <el-form-item
            label="土地成片开发是否形成工业用地或其他建设用地条件："
            prop="isDevelope"
            label-width="355px!important"
            style="margin-left:85px;"
          >
            <el-radio-group v-model="ruleForm.isDevelope">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item
            v-show="ruleForm.adjunct == '0'"
            label="建筑面积："
            prop="buildArea"
          >
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.buildArea"
              placeholder="例如：3000.11"
              style="width:491px;"
            ></el-input>
            <span style="margin-left:20px;">平方米</span>
          </el-form-item>
          <el-form-item v-show="ruleForm.adjunct == '0'" label="建筑结构：">
            <el-select
              :disabled="disabledType == 1 ? true : false"
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
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.heightLimit"
              placeholder="例如：20"
              style="width:300px;"
            ></el-input>
            <span style="margin-left:20px;">米</span>
          </el-form-item>
          <div
            v-show="ruleForm.adjunct == '0'"
            style="display: flex;flex-direction: row;"
          >
            <el-form-item
              label="绿地率%："
              style="width:345px;"
              prop="greenSpaceRate"
            >
              <el-input
                :disabled="disabledType == 1 ? true : false"
                v-model="ruleForm.greenSpaceRate"
                placeholder="绿地率下限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="canton_Regions">
              <el-select
                :disabled="disabledType == 1 ? true : false"
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
                :disabled="disabledType == 1 ? true : false"
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
                :disabled="disabledType == 1 ? true : false"
                v-model="ruleForm.greenSpaceRate2"
                placeholder="绿地率上限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
          </div>
          <div
            v-show="ruleForm.adjunct == '0'"
            style="display: flex;flex-direction: row;"
          >
            <el-form-item
              label="建筑密度%："
              style="width:345px;"
              prop="buildingDensity"
            >
              <el-input
                :disabled="disabledType == 1 ? true : false"
                v-model="ruleForm.buildingDensity"
                placeholder="建筑密度下限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="canton_Regions">
              <el-select
                :disabled="disabledType == 1 ? true : false"
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
                :disabled="disabledType == 1 ? true : false"
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
            <el-form-item class="canton_Regions" prop="buildingDensity2">
              <el-input
                :disabled="disabledType == 1 ? true : false"
                v-model="ruleForm.buildingDensity2"
                placeholder="建筑密度上限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
          </div>
            <!-- v-show="ruleForm.adjunct == '0'" -->
          <div
            style="display: flex;flex-direction: row;"
          >
            <el-form-item
              label="容积率："
              style="width:345px;"
              prop="plotRatio"
            >
              <el-input
                :disabled="disabledType == 1 ? true : false"
                v-model="ruleForm.plotRatio"
                placeholder="容积率下限"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="canton_Regions">
              <el-select
                :disabled="disabledType == 1 ? true : false"
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
                :disabled="disabledType == 1 ? true : false"
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
                :disabled="disabledType == 1 ? true : false"
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
              :disabled="disabledType == 1 ? true : false"
              :limit="5"
              :http-request="photoUploadFile"
              :on-preview="handlePictureCardPreview"
              :on-remove="photoHandleRemove"
              :before-upload="beforeAvatarUploadImg"
              :on-success="photoUploadSuccess"
              :on-error="upLoadError"
              :on-exceed="photoExceed"
              :file-list="ruleForm.fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <p class="explain">
            <img src="../../../../../assets/image/careful.png" alt />
            说明：支持JPG.PNG.GIF格式，最多可上传5张照片，图片每张最大6M
          </p>

          <el-form-item label="土地视频：">
            <div style="position:relative;" class="el_videoBox">
              <div class="videoList">
                <div
                  v-for="(item, index) in ruleForm.fileListVideo"
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
                :on-success="videoUploadSuccess"
                :on-error="upLoadError"
                :on-exceed="videoExceed"
                :file-list="ruleForm.fileListVideo"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>

          <p class="explain">
            <img src="../../../../../assets/image/careful.png" alt />
            说明：请保证视频格式正确，且不超过20M
          </p>
          <el-form-item label="其他说明：" prop="remark">
            <el-input
              :disabled="disabledType == 1 ? true : false"
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
        </div>
        <epf-switchTitle
          titles_h="选择委托机构"
          padding="0px"
          background="#fff"
          height="80px"
          :shutOff="false"
        >
        </epf-switchTitle>
        <div class="Entrustland_main_cont">
          <el-form-item label="委托申请标题：" prop="title">
            <el-input
              :disabled="disabledType == 1 ? true : false"
              v-model="ruleForm.title"
              style="width:491px;"
              placeholder="请输入委托申请标题，30字以内..."
            ></el-input>
          </el-form-item>

          <el-form-item label="选择交易中心：" prop="trustOrgId">
            <el-select
              style="width: 20em;"
              v-model="ruleForm.trustOrgId"
              @change="entrustAgencySelect(orgs, ruleForm.trustOrgId, $event)"
              placeholder="请选择地块所属行政区的交易中心"
              @focus="getOrgs()"
              @visible-change="$forceUpdate()"
              :disabled="detail==1?true:false"
            >
              <el-option
                v-for="item in orgs"
                :ref="item.enterpriseName"
                :id="item.id"
                :label="item.enterpriseName"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label-width="315px">
          <div class="epf_btn epf_btn_bg" @click="submitForm('ruleForm')">
            {{ detail ? "下一页" : "下一步" }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Map from "@/components/common/tianditu/tianditu";
import baseURL1 from "@/util/config.js";
export default {
  components: {},
  data() {
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
    //绿地率校验
    const greenSpaceRateVa = (rule, value, callback) => {
      // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
      if (
        this.ruleForm.greenSpaceRate == "" ||
        this.ruleForm.greenSpaceRate == null ||
        this.ruleForm.greenSpaceRate2 == "" ||
        this.ruleForm.greenSpaceRate2 == null
      ) {
        callback();
      } else {
        if (Number(this.ruleForm.greenSpaceRate) > Number(this.ruleForm.greenSpaceRate2)) {
          callback(new Error("最大值不能小于最小值!"));
        } else {
          callback();
        }
      }
    };
    //建筑密度校验
    const buildingDensityVa = (rule, value, callback) => {
      // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
      if (
        this.ruleForm.buildingDensity == "" ||
        this.ruleForm.buildingDensity == null ||
        this.ruleForm.buildingDensity2 == "" ||
        this.ruleForm.buildingDensity2 == null
      ) {
        callback();
      } else {
        if (
          Number(this.ruleForm.buildingDensity) >  Number(this.ruleForm.buildingDensity2)
        ) {
          callback(new Error("最大值不能小于最小值!"));
        } else {
          callback();
        }
      }
    };
    //容积率校验
    const plotRatioVa = (rule, value, callback) => {
      // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
      if (
        this.ruleForm.plotRatio == "" ||
        this.ruleForm.plotRatio == null ||
        this.ruleForm.plotRatio2 == "" ||
        this.ruleForm.plotRatio2 == null
      ) {
        callback();
      } else {
        if (this.ruleForm.plotRatio > this.ruleForm.plotRatio2) {
          callback(new Error("最大值不能小于最小值!"));
        } else {
          callback();
        }
      }
    };
    return {
      detail: false,
      // videoFlag: false,
      baseUrl: "",
      videoFlag: true,
      publishLandtype: "转让",
      disabledType: 0, //禁用状态
      disabledTypeyear:true,//剩余使用年限是否禁用
      uploadUrl: "https://jsonplaceholder.typicode.com/posts/",
      videoUploadPercent: "",
      isShowUploadVideo: true,
      videoForm: {
        videoUploadId: "",
        Video: "../../../../../assets/video/a.mp4"
      },
      // videoFlag:true,
      txtVal: 0,
      Landtype: "",
      active: 0,
      isShowProvince: true,
      dialogImageUrl: "",
      dialogVisible: false,
      greenSpaceRateSymbolSelect1: [
        { lable: "<", value: "<" },
        { lable: "<=", value: "<=" },
        { lable: "=", value: "=" }
      ],
      greenSpaceRateSymbolSelect2: [],
      buildingDensitySymbolSelect1: [
        { lable: "<", value: "<" },
        { lable: "<=", value: "<=" },
        { lable: "=", value: "=" }
      ],
      buildingDensitySymbolSelect2: [],
      plotRatioSymbolSelect1: [
        { lable: "<", value: "<" },
        { lable: "<=", value: "<=" },
        { lable: "=", value: "=" }
      ],
      plotRatioSymbolSelect2: [],

      ruleForm: {
        // 委托机构
        trustOrgId: "",
        trustOrgName: "",
        //流转方式：
        circulation: "transfer",
        circulationName: "转让",
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
        // 使用权截止日期
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
        isPercent: 0,
        isDevelope: 0,
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
        disabledType1: false
      },
      rules: {
        trustOrgId: [
          {
            required: true,
            message: "请选择地块所属行政区的交易中心",
            trigger: "change"
          }
        ],
        circulation: [{ required: true, message: "请选择流转方式" }],
        title: [
          { required: true, message: "请输入标题" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,15,60,'15到60个字符之间')} },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5\.\,，\-\—\、\]\[\【】（）()]+$/,
            message:
              "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        landChar: [
          { required: true, message: "请选择土地性质", trigger: "change" }
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
        useType: [
          { required: true, message: "请选择使用权类型", trigger: "change" }
        ],
        landType: [
          { required: true, message: "请选择土地类型", trigger: "change" }
        ],
        firstClassUse: [
          { required: true, message: "请选择一级土地用途", trigger: "change" }
        ],
        secondClassUse: [
          { required: true, message: "请选择二级土地用途", trigger: "change" }
        ],
        area: [
          { required: true, message: "请输入面积" },
          { pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/, message: "面积必须是大于等于1的数" }
        ],
        endDate: [
          { required: true, message: "请输入使用权截止日期：", trigger: "change" }
        ],
        years: [
          { required: true, message: "请输入使用年限" },
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
            message: "请输入土地详细地址"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
          // pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\、\,\，\-\———\【】()（）]+$/,
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
        // price: [
        //   {
        //     // pattern: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
        //     pattern: /^(([1-9]\d{1,9})|([1-9])|(([1-9]\.\d{1,2}|[0]\.\d{1,2}|[1-9]\d{1,10}\.\d{1,2})))$/,
        //     message: "允许输入小数点后2位，小数点前不超过10位"
        //     // message: "拟转让总价有误,必须是大于0的数."
        //   }
        // ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "价格有误,请输入整数"
          },
        ],
        warrantNumType: [
          { required: true, message: "请选择权证号类型", trigger: "change" }
        ],
        warrantNum: [
          { required: true, message: "请输入权证号", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
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
          { required: true, message: "请输入不动产单元号", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "不动产单元号由英文和数字组成."
          },
          { min: 28, max: 28, message: "不动产单元号为28位，长度有误" },
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
        buildArea: [
          {
            pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "建筑面积输入数字超出最长限度"
          }
        ],
        heightLimit: [
          { max: 10, message: "长度在10个字符以内" },
          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: "请输入正确的建筑限高."
          }
        ],
        greenSpaceRate: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: greenSpaceRateVa
          }
        ],
        greenSpaceRate2: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: greenSpaceRateVa
          }
        ],
        buildingDensity: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: buildingDensityVa
          }
        ],
        buildingDensity2: [
          {
            pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
            validator: buildingDensityVa
          }
        ],
        plotRatio: [
          {
            pattern: /^(\d|[1-9]|10.00)(\.\d{1,2})?$/,
            message: "0-10的值,最多两位小数"
          },
          {
            validator: plotRatioVa
          }
        ],
        plotRatio2: [
          {
            pattern: /^(\d|[1-9]|10.00)(\.\d{1,2})?$/,
            message: "0-10的值,最多两位小数"
          },
          {
            validator: plotRatioVa
          }
        ],
        remark:[
          // { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,2000,'长度在2000字符以内（注意若是汉字，1个汉字是2个字符）')}  },
        ]
      },
      photoPId: "",
      photoFirstUpload: true,
      dialogVisibleMap: false, //地图找地对话框
      dicRequest: [
        "building_structure",
        "flow_mode",
        "land_nature",
        "use_type",
        "land_type",
        "land_use",
        "own_no_type",
        "administrative_regions"
      ], //字典码请求

      dictionary: {
        //字典码结果
        building_structure: "",
        flow_mode: "",
        land_nature: "",
        use_type: "",
        land_type: "",
        land_use: "",
        own_no_type: "",
        administrative_regions: "",
        land_use_second: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      imgUrlId: [], //图片上传成功返回的图片Id
      videoUrlId: [], //视频上传成功返回的视频Id
      orgs: [], // 交易中心
      MPID: ""
    };
  },
  mounted() {
    if (window.history && window.history.pushState) {
      //this.getOrgs();
    }
  },
  created() {
    window.scrollTo(0, 120);
    if (this.$route.query.detail) {
      this.detail = this.$route.query.detail;
    }
    console.info("测试" + this.ruleForm);
    if (this.$route.query.publishLandtype == "转让" || this.$route.query.publishLandtype == "transfer") {
      this.ruleForm.circulation = "transfer";
      this.publishLandtype = "剩余使用";
      this.ruleForm.circulationName  = "转让"
    }else{
      this.ruleForm.circulation = "rent";
      this.publishLandtype = "出租";
      this.ruleForm.circulationName  = "出租"
  }
    // this.publishLandtype = this.$route.query.publishLandtype;
    if (this.$store.state.entrustland && this.$store.state.entrustland != {}) {
      this.ruleForm = this.$store.state.entrustland;
      // this.orgselect();
      if (this.ruleForm.isUnion == 0 && this.ruleForm.tSellId) {
        this.disabledType = 1;
        this.disabledType1 = true;
      } else {
        this.disabledType = 0;
        this.disabledType1 = false;
      }
      if (this.$route.query.detail) {
        this.disabledType = 1;
        this.disabledType1 = true;
      }
    } else if (this.$route.query.id) {
      debugger
      //选择了关联的地块
      this.disabledType = 1;
      this.disabledType1 = true;
      this.$axios.get(
        "/epf-supply/tsell/getTSellById",
        { id: this.$route.query.id },
        res => {
          console.log("携带ID请求数据", res);
          res.tSell["pId"] = res.tSell.img;
          res.tSell["fileList"] = [];
          res.tSell["fileListVideo"] = [];
          res.tSell.price = res.tSell.price ? res.tSell.price.toString() : null;
          res.tSell.buildArea = res.tSell.buildArea
            ? res.tSell.buildArea.toString()
            : null;
          res.tSell.heightLimit = res.tSell.heightLimit
            ? res.tSell.heightLimit.toString()
            : null;
          // this.orgselect();
          //请求附件组
          if (res.tSell.pId) {
            this.$axios.get(
              "/epf-document/document/getOneGroupFilsById",
              { id: res.tSell.pId },
              files => {
                let filesData = files.fileList;
                for (let index = 0; index < filesData.length; index++) {
                  this.MPID = filesData[index].pId;
                  if (
                    filesData[index].extName == "png" ||
                    filesData[index].extName == "PNG" ||
                    filesData[index].extName == "jpg" ||
                    filesData[index].extName == "JPG" ||
                    filesData[index].extName == "gif"
                  ) {
                    console.log("图片附件", res.tSell.fileList);
                    res.tSell.fileList.push({
                      url: this.baseUrl + filesData[index].id,
                      status: "success",
                      name: filesData[index].name
                    });
                    this.imgUrlId.push(filesData[index].id);
                  }
                  if (filesData[index].extName == "mp4") {
                    res.tSell.fileListVideo.push({
                      url: this.baseUrl + filesData[index].id,
                      status: "success",
                      name: filesData[index].name
                    });
                    this.videoUrlId.push(filesData[index].id);
                  }
                }
                this.ruleForm["id"] = this.$route.query.id;
                res.tSell["photoFirstUpload"] = false;
                this.$store.state.entrustland = res.tSell;
                this.ruleForm = res.tSell;
                console.log(this.ruleForm);
              }
            );
          } else {
            this.ruleForm["id"] = this.$route.query.id;
            res.tSell["photoFirstUpload"] = true;
            this.$store.state.entrustland = res.tSell;
            this.ruleForm = res.tSell;
          }
          if (res.tSell.trustOrgId) {
            this.orgs = [];
            this.orgs.push({ id: res.tSell.trustOrgId, enterpriseName: res.tSell.trustOrgName })
            this.ruleForm['trustOrgName'] = res.tSell.trustOrgName;
            this.ruleForm['trustOrgId'] = res.tSell.trustOrgId;
          } else {
            this.orgselect();
          }
        }
      );
    } else if (this.$route.query.tgId) {
      //修改
      this.ruleForm = {};
      this.$store.state.transGoodsJson = {};
      this.$store.state.transTrustInfo = {};
      this.$store.state.transGoodsJson["id"] = this.$route.query.tgId;
      this.$axios.get(
        "/epf-landweb/landweb/transgoods/getTransGoods",
        { id: this.$route.query.tgId },
        res => {
          console.log("详情数据", res);
          if (res.code == 0) {
            if (res.map.transGoods.isUnion == 0 && res.map.transGoods.tsellId) {
              this.disabledType = 1;
              this.disabledType1 = true;
            } else {
              this.disabledType = 0;
              this.disabledType1 = false;
            }
            if (this.$route.query.detail) {
              this.disabledType = 1;
              this.disabledType1 = true;
            }
            // this.$store.state.transGoodsJson = res.transGoods;
            // this.$store.state.transTrustInfo = res.transTrustInfo;
            res.map.transGoods["pId"] = res.map.transGoods.img;
            res.map.transTrustInfo["title"] = res.map.transTrustInfo.trustTitle;
            res.map.transGoods["adjunct"] = res.map.transGoods.isAdjunct;
            res.map.transTrustInfo["trustOrgId"] =
              res.map.transTrustInfo.trustOrgId;
            res.map.transTrustInfo["trustOrgName"] =
              res.map.transTrustInfo.trustOrgName;
            res.map.transTrustInfo["transTrustInfoId"] =
              res.map.transTrustInfo.id;
            res.map.transGoods.price = res.map.transGoods.price
              ? res.map.transGoods.price.toString()
              : null;
            res.map.transGoods.buildArea = res.map.transGoods.buildArea
              ? res.map.transGoods.buildArea.toString()
              : null;
            res.map.transGoods.heightLimit = res.map.transGoods.heightLimit
              ? res.map.transGoods.heightLimit.toString()
              : null;

            res.map.transGoods.fileList = [];
            res.map.transGoods.fileListVideo = [];
            if (res.map.transGoods.pId) {
              this.$axios.get(
                "/epf-document/document/getOneGroupFilsById",
                { id: res.map.transGoods.img },
                files => {
                  let filesData = files.fileList;
                  console.log("图片附件", files);
                  for (let index = 0; index < filesData.length; index++) {
                    this.MPID = filesData[index].pId;
                    // alert(this.MPID);
                    if (
                      filesData[index].extName == "png" ||
                      filesData[index].extName == "PNG" ||
                      filesData[index].extName == "jpg" ||
                      filesData[index].extName == "JPG" ||
                      filesData[index].extName == "gif" ||
                      filesData[index].extName == "GIF"
                    ) {
                      res.map.transGoods.fileList.push({
                        url: this.baseUrl + filesData[index].id,
                        status: "success",
                        name: filesData[index].name
                      });
                      this.imgUrlId.push(filesData[index].id);
                    }
                    if (filesData[index].extName == "mp4") {
                      res.map.transGoods.fileListVideo.push({
                        url: this.baseUrl + filesData[index].id,
                        status: "success",
                        name: filesData[index].name
                      });
                      this.videoUrlId.push(filesData[index].id);
                    }
                  }
                  this.ruleForm.trustOrgId = res.map.transTrustInfo.trustOrgId;
                  this.ruleForm.trustOrgName =
                    res.map.transTrustInfo.trustOrgName;
                  res.map.transGoods["photoFirstUpload"] = false;
                  this.ruleForm = Object.assign(
                    res.map.transGoods,
                    res.map.transTrustInfo
                  );
                }
              );
            } else {
              res.map.transGoods["photoFirstUpload"] = true;
              this.ruleForm = Object.assign(
                res.map.transGoods,
                res.map.transTrustInfo
              );
            }
            this.ruleForm.cantonArea = res.map.transGoods.cantonArea;
            this.orgselect();
            this.$store.state.entrustland = this.ruleForm;
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    } else {
      //未选择关联的地块
      this.disabledType = 0;
      this.$axios.get("/epf-landweb/api/createId", {}, res => {
        this.ruleForm["id"] = res.id;
        this.ruleForm["tgId"] = res.id;
      });
    }
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-admin/dictionaries/getDictsByCodeOrParentId?code=${item}`,
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
          console.log("item", item);
          // @name: 行政区域
          // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
          // @author: gaojie
          // @chageTime:2020-2-27
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
      this.$route.query.disabledType1 == false ||
      this.$route.query.disabledType1 == "false"
    ) {
      //是否禁用流转方式下拉选择
      this.disabledType1 = this.$route.query.disabledType1;
    } else {
      this.disabledType1 = true;
    }

    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";

    let that = this;
    //
    setTimeout(function() {
      if (that.ruleForm.cantonArea) {
        that.orgselect();
      }
    }, 1000);
    setTimeout(function() {
      if (that.ruleForm.cantonArea) {
        that.orgselect();
      }
    }, 2000);
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
    coordinateMap(val) {
      console.log("地图标注的坐标：", val);
      this.ruleForm.coordinate = `${val.lng} ${val.lat}`;
    },
    change(params, val, key) {
      this.comGreenSpaceRateSymbol();
      if (params == "null" && val != "") {
        console.log("ddddd", key);
        if (key === "greenSpaceRateSymbol1") {
          this.ruleForm.greenSpaceRateSymbol1 = "";
        }
        if (key === "greenSpaceRateSymbol2") {
          this.ruleForm.greenSpaceRateSymbol2 = "";
        }
        if (key === "buildingDensitySymbol1") {
          this.ruleForm.buildingDensitySymbol1 = "";
        }
        if (key === "buildingDensitySymbol2") {
          this.ruleForm.buildingDensitySymbol2 = "";
        }
        if (key === "plotRatioSymbol1") {
          this.ruleForm.plotRatioSymbol1 = "";
        }
        if (key === "plotRatioSymbol2") {
          this.ruleForm.plotRatioSymbol2 = "";
        }
      }
    },
    comGreenSpaceRateSymbol() {
      if (this.ruleForm.greenSpaceRateSymbol1 === "<") {
        this.greenSpaceRateSymbolSelect2 = [
          { lable: "<", value: "<" },
          { lable: "<=", value: "<=" },
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }
      if (this.ruleForm.greenSpaceRateSymbol1 === "=") {
        this.ruleForm.greenSpaceRateSymbol2 = null;
        this.greenSpaceRateSymbolSelect2 = [
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }
      if (this.ruleForm.greenSpaceRateSymbol1 === "<=") {
        this.greenSpaceRateSymbolSelect2 = [
          { lable: "<", value: "<" },
          { lable: "<=", value: "<=" },
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }

      if (this.ruleForm.buildingDensitySymbol1 === "<") {
        this.buildingDensitySymbolSelect2 = [
          { lable: "<", value: "<" },
          { lable: "<=", value: "<=" },
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }
      if (this.ruleForm.buildingDensitySymbol1 === "=") {
        this.ruleForm.buildingDensitySymbol2 = null;
        this.buildingDensitySymbolSelect2 = [
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }
      if (this.ruleForm.buildingDensitySymbol1 === "<=") {
        this.buildingDensitySymbolSelect2 = [
          { lable: "<", value: "<" },
          { lable: "<=", value: "<=" },
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }

      if (this.ruleForm.plotRatioSymbol1 === "<") {
        this.plotRatioSymbolSelect2 = [
          { lable: "<", value: "<" },
          { lable: "<=", value: "<=" },
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }
      if (this.ruleForm.plotRatioSymbol1 === "=") {
        this.ruleForm.plotRatioSymbol2 = null;
        this.plotRatioSymbolSelect2 = [
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }
      if (this.ruleForm.plotRatioSymbol1 === "<=") {
        this.plotRatioSymbolSelect2 = [
          { lable: "<", value: "<" },
          { lable: "<=", value: "<=" },
          { lable: "请选择符号", value: "请选择符号" }
        ];
      }
    },
    beforeAvatarUploadVideo(file) {
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (["video/mp4"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt300M) {
        this.$message.error("上传视频大小不能超过300MB哦!");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    beforeUploadVideo(file) {
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (["video/mp4"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt300M) {
        this.$message.error("上传视频大小不能超过300MB哦!");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    uploadVideoProcess(event, file, fileList) {
      console.log("dddddddddd", event);
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleVideoSuccess(res, file) {
      //获取上传图片地址
      // this.videoFlag = false;
      // this.videoUploadPercent = 0;
      // if(res.status == 200){
      //     this.videoForm.videoUploadId = res.data.uploadId;
      //     this.videoForm.Video = res.data.uploadUrl;
      // }else{
      //     this.$message.error('视频上传失败，请重新上传！');
      // }
      console.log(res, file);
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },

    //上传成功回调
    // handleVideoSuccess (res, file) {
    //     this.isShowUploadVideo = true;
    //     this.videoFlag = false;
    //     this.videoUploadPercent = 0;
    //     if (res.errorCode == "00") {
    //         this.global.company.showVideoPath = res.sprbody.urlAddress;
    //         // this.videoForm.showVideoPath = res.data.uploadUrl;
    //     } else {
    //         this.$message.error('视频上传失败，请重新上传！');
    //     }
    // },

    beforeAvatarUploadImg(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error("上传土地照片只能是 PNG 格式!");
        return false;
      }
      if (!isLt6M) {
        this.$message.error("上传土地照片大小不能超过 6MB!");
        return false;
      }
    },
    videoUploadFile(files) {
      if (this.MPID) {
        this.ruleForm.pId = this.MPID;
        // alert("即将要使用的pId:"+this.ruleForm.pId);
      }

      //上传方法
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      if (this.ruleForm.pId) {
        console.log("1");
        formData.append("pId", this.ruleForm.pId);
        this.videoUpload(formData, files, file);
        return;
      }

      if (!this.ruleForm.pId && this.ruleForm.photoFirstUpload) {
        console.log("2");
        //第一张图片上传
        console.log("第一张图片上传");
        this.ruleForm.photoFirstUpload = false;
        this.videoUpload(formData, files, file, "first");
        return;
      }

      if (this.ruleForm.pId && !this.ruleForm.photoFirstUpload) {
        console.log("3");
        //之后的图片上传携带id
        console.log("之后的图片上传携带id");
        this.videoUpload(formData, files, file);
        return;
      }
    },
    photoUploadFile(files) {
      if (this.MPID) {
        this.ruleForm.pId = this.MPID;
        // alert("即将要使用的pId:"+this.ruleForm.pId);
      }
      //上传方法
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      console.log(this.ruleForm.pId);

      if (this.ruleForm.pId) {
        console.log(1111);
        formData.append("pId", this.ruleForm.pId);
        this.photoUpload(formData, files, file);
        return;
      }

      if (!this.ruleForm.pId && this.ruleForm.photoFirstUpload) {
        //第一张图片上传
        console.log("第一张图片上传");
        this.ruleForm.photoFirstUpload = false;
        this.photoUpload(formData, files, file, "first");
        return;
      }

      if (this.ruleForm.pId && !this.ruleForm.photoFirstUpload) {
        //之后的图片上传携带id
        console.log("之后的图片上传携带id");
        this.photoUpload(formData, files, file);
        return;
      }
    },
    photoUpload(formData, files, file, count) {      var self = this;
      //修改初始化图片数组
      if (!self.imgUrlId && self.ruleForm.fileList) {
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
            self.imgUrlId.push(id);
          }
        }
      }
      //图片上传
      this.$axios.post(
        //todo
        "/epf-document/document/upload",
        formData,
        res => {
          console.log("图片上传成功");
          if (res.data.state != "SUCCESS") {
            if (count == "first") {
              // 第一张上传出错
              this.ruleForm.photoFirstUpload = true;
              // this.$refs.photoUploader.submit();
              return null;
            }
            console.log("错误了");
            // this.$refs.photoUploader.submit();
            return null;
          }
          if (!this.ruleForm.pId) {
            this.ruleForm.pId = res.data.data[0].pId;
            this.ruleForm.img = res.data.data[0].id;
          }
          if (this.ruleForm.pId && !this.ruleForm.photoFirstUpload) {
            this.$refs.photoUploader.submit();
          }
          this.imgUrlId.push(res.data.data[0].id);
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
    videoUpload(formData, files, file, count) {
      //视频上传
      this.$axios.post(
        "/epf-document/document/upload",
        formData,
        res => {
          console.log("调用了视频上传方法");
          if (res != "error") {
            if (res.data.state != "SUCCESS") {
              if (count == "first") {
                // 第一张上传出错
                this.ruleForm.photoFirstUpload = true;
                this.$refs.videoUploader.submit();
                return null;
              }
              console.log("错误了");
              this.$refs.videoUploader.submit();
              return null;
            }
            if (!this.ruleForm.pId) {
              this.ruleForm.pId = res.data.data[0].pId;
              this.ruleForm.img = res.data.data[0].id;
            }
            // this.ruleForm.videoUrlId.push(res.data.data[0].id);
            files.onSuccess(res);
          }
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
    //图片超出5张
    photoExceed(files, fileList) {
      this.$message.error("最多上传5张土地照片");
    },
    videoExceed(files, fileList) {
      this.$message.error("最多上传5个土地视频");
    },
    photoUploadSuccess(res, file, fileList) {
      if (!this.ruleForm.pId) {
        this.ruleForm.pId = res.data.data[0].pId;
      }
      this.ruleForm.fileList = fileList;
      // for (let i = 0; i < this.ruleForm.fileList.length; i++) {
      //   this.ruleForm.fileList[i].url = this.baseUrl + this.imgUrlId[i];
      //   console.log(this.ruleForm.fileList[i].url);
      // }
      // for (let i = 0; i < this.ruleForm.fileList.length; i++) {
      //   if (this.imgUrlId[i] === undefined) {
      //     break;
      //   }
      //   this.ruleForm.fileList[i].url = this.baseUrl + this.imgUrlId[i];
      // }
      // console.log(this.ruleForm);
    },
    videoUploadSuccess(res, file, fileList) {
      if (!this.ruleForm.fileId) {
        this.ruleForm.pId = res.data.data[0].pId;
      }
      this.ruleForm.fileListVideo = fileList;
      for (let i = 0; i < this.ruleForm.fileListVideo.length; i++) {
        if (this.ruleForm.videoUrlId[i] === undefined) {
          break;
        }
        this.ruleForm.fileListVideo[i].url =
          this.baseUrl + this.ruleForm.videoUrlId[i];
      }
    },
    photoHandleRemove(file, fileList) {
      // if (this.MPID) {
      //   this.ruleForm.pId = this.MPID;
      //   // alert("即将要使用的pId:"+this.ruleForm.pId);
      // }
      ///////////////////////////////////////////////////////
      //移除土地图片
      let that = this;
      let self = this;
      console.log('file',file,self.imgUrlId);
      //修改初始化图片数组
      if (self.imgUrlId.length == 0) {
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
            self.imgUrlId.push(id);
          }
        }
      }
      console.log('==========file==========',file);
      // let id = file.url.substring(file.url.length - 36, file.url.length);
      // console.log(id);
      let id = file.id
      if (!id) {
        id = file.response?file.response.data.data[0].id:file.url.substring(file.url.length - 36, file.url.length);
      }
      let para = { id: id, fdId: "1" };
      let url = "/epf-document/document/deleteByFolder?id=" + id + "&fdId=1";
      this.$axios.post(url, {}, res => {
        if (res.state == "SUCCESS") {
          this.ruleForm.fileList = fileList;
          for (let i = 0; i < this.imgUrlId.length; i++) {
            if (this.imgUrlId[i] == id) {
              this.imgUrlId.splice(i, 1);
            }
          }
          console.log(file, fileList, this.imgUrlId);
        }
      });

      ///////////////////////////////////////////////////////
    },
    handleRemove(file, fileList) {
      // if (this.MPID) {
      //   this.ruleForm.pId = this.MPID;
      //   // alert("即将要使用的pId:"+this.ruleForm.pId);
      // }
      // for (let i = 0; i < this.imgUrlId; i++) {
      //   if (this.imgUrlId[i] == file.response.data.data[0].id) {
      //     this.imgUrlId.splice(i, 1);
      //   }
      // }
      let self = this;
      console.log('file',file,self.videoUrlId);
      //修改时初始化视频数组
      if (self.videoUrlId.length == 0) {
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
            self.videoUrlId.push(id);
          }
        }
      }
      //移除土地视频
      let that = this;
      console.log("文件列表：", fileList);
      let id = file.id
      if (!id) {
        id = file.response?file.response.data.data[0].id:file.url.substring(file.url.length - 36, file.url.length);
      }
      let url = "/epf-document/document/deleteByFolder?id=" + id + "&fdId=1";
      let para = { id: id, fdId: "1" };
      this.$axios.post(url, {}, res => {
        if (res.state == "SUCCESS") {
          that.ruleForm.fileListVideo = fileList;
          for (let i = 0; i < that.videoUrlId.length; i++) {
            if (that.videoUrlId[i] == id) {
              that.videoUrlId.splice(i, 1);
            }
          }
      //   if (this.imgUrlId[i] == file.response.data.data[0].id) {
      //     this.imgUrlId.splice(i, 1);
          that.$message.success(res.msg);
        }
      });
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
    submitForm(formName) {
      //todo
      this.ruleForm["trustTitle"] = this.ruleForm.title;
      for (let i = 0; i < this.orgs.length; i++) {
        if (this.orgs[i].id == this.ruleForm.trustOrgId) {
          this.ruleForm["trustOrgName"] = this.orgs[i].enterpriseName;
        }
      }
      let entrustland = this.ruleForm;
      if (this.$route.query.id) {
        entrustland["isUnion"] = 0;
        entrustland["goodsNo"] = entrustland.publishNo;
        entrustland["tSellId"] = this.$route.query.id;
        entrustland["channel"] = "supply_and_demand";
      } else if (this.$route.query.tgId) {
      } else {
        entrustland["isUnion"] = 1;
        entrustland["channel"] = "deal";
      }
      entrustland["isAdjunct"] = entrustland["adjunct"];
      if (this.imgUrlId.length > 0) {
        // alert("进来该图片啦！！")
        entrustland["img"] = this.imgUrlId[0];
        entrustland["fileId"] = this.imgUrlId[0];
      }
      this.$store.state.transGoodsJson = entrustland;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.entrustland = this.ruleForm;
          // this.ruleForm发送给后台
          if (this.$route.query.id) {
            this.$router.push({
              path: "/EntrustApplicantInfo",
              query: {
                id: this.$route.query.id,
                publishLandtype: this.$route.query.publishLandtype
              }
            });
          } else if (this.$route.query.tgId) {
            if (this.$route.query.detail) {
              this.$router.push({
                path: "/EntrustApplicantInfo",
                query: {
                  tgId: this.$route.query.tgId,
                  publishLandtype: this.$route.query.publishLandtype,
                  detail: this.detail
                }
              });
            } else {
              this.$router.push({
                path: "/EntrustApplicantInfo",
                query: {
                  tgId: this.$route.query.tgId,
                  publishLandtype: this.$route.query.publishLandtype
                }
              });
            }
          } else {
            this.$router.push({
              path: "/EntrustApplicantInfo",
              query: { publishLandtype: this.$route.query.publishLandtype }
            });
          }
        } else {
          document.documentElement.scrollTop = 300;
          this.$message.error("请检查您的信息是否填写完整");
          return false;
        }
      });

      // this.orgselect();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
        this.publishLandtype = "剩余使用";
        this.disabledTypeyear = true;
      } else if (this.ruleForm.circulation == "rent") {
        this.publishLandtype = "出租";
      } else if (this.ruleForm.circulation == "mortgage") {
        this.publishLandtype = "抵押";
      }
    },
    getOrgs() {
      this.orgselect();
    },
    entrustAgencySelect(dic, trustOrgId, event) {
      this.ruleForm.trustOrgId = trustOrgId;
      for (let o = 0; o < dic.length; o++) {
        if (dic[o].id == trustOrgId) {
          this.ruleForm.trustOrgName = dic[o].enterpriseName;
        }
      }
    },
    firstClassUseSelect(dic, firstClassUse, event) {
      this.ruleForm.secondClassUse = "";
      this.ruleForm.secondClassUseName = "";
      this.dictionary.land_use_second = "";
      let pId = this.$refs[firstClassUse][0].$attrs.id;
      this.ruleForm.firstClassUse = this.$refs[firstClassUse][0].$attrs.dictKey;
      this.$axios.get(
        `/epf-cms/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
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
    },
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.ruleForm.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;
      this.dictionary.cantonArea = [];
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        // `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
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
      this.orgselect();
    },
    citySelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonAreaName = "";
      this.cantonArea = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        // `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
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
    areaSelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
      if(this.ruleForm.cantonArea != this.ruleForm.cantonCity){
        this.orgselect();
      }
    },
    orgselect() {
      var cantonProvince = this.ruleForm.cantonProvince;
      var cantonCity = this.ruleForm.cantonCity;
      var cantonArea = this.ruleForm.cantonArea;
      this.ruleForm.trustOrgName = "";
      this.$axios.get(
        `/epf-landweb/landweb/sysenterprise/listSysEnterpriseByArea`,
        {
          cantonProvince: cantonProvince,
          cantonCity: cantonCity,
          cantonArea: cantonArea
        },
        res => {
          if (res.code == 0) {
            sessionStorage.setItem(
              "orgsDataList",
              JSON.stringify(res.enterprises)
            );
            if (this.ruleForm.cantonAreaName !== "") {
              this.getSessionOrgs();
            } else {
              this.orgs = res.enterprises;
              return;
            }
          }
        }
      );
    },
    getSessionOrgs() {
      this.orgs = JSON.parse(sessionStorage.getItem("orgsDataList"));
    },
    registrationeSelect(dic, registrationeName, event) {
      this.ruleForm.registration = this.$refs[
        registrationeName
      ][0].$attrs.dictKey;
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
  }
  //   watch:{
  //     ruleForm(newB,old){
  //         console.log("====newB===",newB.entrustAgencyName)
  //         console.log("====old===",old.entrustAgencyName)
  //     }
  //   }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.Entrustland_main {
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
.videoBox {
  float: left;
  margin-right: 8px;
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
.MapTitle {
  text-align: left;
  font-weight: 700;
  font-size: 20px;
  color: #333;
  padding: 8px 30px;
  border-bottom: solid 2px #f3f3f3;
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

.cantonProvinceNactive
  .el-form-item:not(:nth-child(1))
  .el-form-item__content
  .el-form-item__error {
  left: 0 !important;
}
.trustOrgIdNactive .el-form-item__content .el-form-item__error {
  left: 197px !important;
}
.videoList {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
}
</style>
