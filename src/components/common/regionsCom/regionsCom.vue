<template>
  <!-- <el-form :model="ruleForm" ref="ruleForm" :rules="addRules"> -->
    <!-- prop="cantonProvinceName"
   prop="cantonCityName"
   prop="cantonAreaName" -->
   <div style="display: flex;flex-direction: row;">
      {{disabledType}}{{ruleForm}}
      <el-form>
        <el-form-item label="身份证住址："  style="width:310px;">
          <el-select
            :disabled="disabledType==1?true:false"
            placeholder="请选择所在省"
            style="width:157px;"
            v-model="ruleForm.cantonProvinceName"
            @change="provinceSelect(dictionary.administrative_regions,ruleForm.cantonProvinceName,$event)"
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
      </el-form>
      <!-- <el-form-item  class="canton_Regions">
        <el-select
          :disabled="disabledType==1?true:false"
          v-model="ruleForm.cantonCityName"
          placeholder="请选择所在市"
          @change="citySelect(dictionary.cantonCity,ruleForm.cantonCityName,$event)"
          style="width:157px;"
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
      <el-form-item  class="canton_Regions">
        <el-select
          :disabled="disabledType==1?true:false"
          v-model="ruleForm.cantonAreaName"
          placeholder="请选择所在区/县"
          style="width:157px;"
          @change="areaSelect(dictionary.cantonAreaName,ruleForm.cantonAreaName,$event)"
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
      </el-form-item> -->
      <el-input
        v-model="ruleForm.locationInfomation"
        style="width:500px;margin-left:5px;"
        placeholder="请输入详细地址"
      ></el-input>
    </div>
  <!-- </el-form> -->
</template>
<script>
export default {
  name: "comRegions",
  props:['disabledType','ruleForm'],
  data() {
    return {
      dictionary: {
        //字典码结果
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicRequest: [
        //字典码请求
        "administrative_regions"
      ],
      // disabledType: 0,
      // ruleForm: {
      //   cantonAreaName: "",
      //   cantonArea: "",
      //   cantonCityName: "",
      //   cantonCity: "",
      //   cantonProvince: "",
      //   cantonProvinceName: ""
      // },
      addRules: {
        cantonProvinceName: [{ required: true, message: "请选择所在省" }],
        cantonCityName: [{ required: true, message: "请选择所在市" }],
        cantonAreaName: [{ required: true, message: "请选择所在区" }]
      }
    };
  },
  methods: {
    getProvinceData() {
      let that = this;
      that.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId`,
        { parentId: "000000" },
        res => {
          that.dictionary.administrative_regions = res.dictionariesList;
        }
      );
    },
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      this.ruleForm.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;
      let pId = this.$refs[cantonCode][0].$attrs.id;
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
    }
  },
  mounted() {
    this.getProvinceData();
  }
};
</script>