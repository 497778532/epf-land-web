<template>
  <!-- 委托交易弹框模块1 -->
    <div class="entrustTransPop_warp" v-if="popup">
      <pop-up-widget title="申请委托交易" >
        <div class="contract_title">
          <!-- <div class="detectable" v-show="!getOrg">
            <div class="not_detectable">
              <img src="../../../../assets/image/entrust_org.png" alt="">
              <span>未检测到该行政区下可识别的交易系统！</span>
            </div>
            <div class="sure">
              <span @click="close('entrustTransInfo')">确认</span>
            </div>
          </div> -->
          <div class="contractype">
            <label class="type_lable" :disabled="disabled"><span>*</span>土地流转方式：</label>
            <el-radio-group v-model="ruleForm.circulation"  :disabled="disabled">
              <el-radio v-for="item in dictionary.flow_mode.slice(0,2)" :label="item.dictKey" :value="item.zhCn" :key="item.zhCn">
                {{item.zhCn}}
              </el-radio>
            </el-radio-group>
          </div>
          <!-- <div class="contractype">
            <label class="type_lable"  :disabled="disabled"><span>*</span>土地所属行政区：</label>
              <el-select clearable :disabled="disabled" v-model="ruleForm.cantonProvinceName" placeholder="请选择土地所在省" @change="provinceSelect(dictionary.administrative_regions,ruleForm.cantonProvinceName,$event)" size="small" >
                  <el-option v-for="item in dictionary.administrative_regions" :ref="item.regionName" 
                  :id="item.id" :dictKey="item.regionCode" :label="item.regionName" :value="item.regionName" :key="item.regionCode"></el-option>
              </el-select>
              <el-select clearable :disabled="disabled" v-model="ruleForm.cantonCityName" placeholder="请选择土地所在市" @change="citySelect(dictionary.cantonCity,ruleForm.cantonCityName,$event)" size="small" >
                  <el-option v-for="item in dictionary.cantonCity" :ref="item.regionName"  
                  :id="item.id" :dictKey="item.regionCode" :label="item.regionName"  :value="item.regionName" :key="item.regionCode"></el-option>
              </el-select>
              <el-select clearable :disabled="disabled" v-model="ruleForm.cantonAreaName" placeholder="请选择土地所在区/县"  @change="areaSelect(dictionary.cantonAreaName,ruleForm.cantonAreaName,$event)" size="small" >
                  <el-option v-for="item in dictionary.cantonArea" :ref="item.regionName"
                  :id="item.id" :dictKey="item.regionCode" :label="item.regionName"  :value="item.regionName" :key="item.regionCode" ></el-option>
              </el-select>
          </div> -->
        </div>
        <div class="contract_content">
          <div class="manageinfo">
            <label class="type_lable" :disabled="disabled">选择关联信息：</label>
            <el-radio label="是"  :disabled="disabled" v-model="ruleForm.contracmanageinfo"></el-radio>
            <el-radio label="否"  :disabled="disabled" v-model="ruleForm.contracmanageinfo"></el-radio>
            <span class="careful">
              <img src="../../../../assets/image/careful.png" alt="">
              提示：选择否则无需关联！
            </span>
          </div>
          <div class="contract_content_table" v-show="ruleForm.contracmanageinfo == '是'">
            <table
              width="957" 
              cellpadding="0" 
            
              cellspacing="0" 
              v-loading="loading"
              element-loading-text="拼命加载中..."
              element-loading-background="rgba(251, 251, 251, 0.9)">
              <tr>
                <td class="td1">
                </td>
                <td class="td2">土地基本信息</td>
                <td>金额/万元</td>
                <td>流转方式</td>
                <td>时间</td>
                <td>状态 </td>
              </tr>
              <tr v-for="(item,index) in tabledata" :key="index">
                <td class="td1">
                  <input type="radio"  :disabled="disabled"  name='checkboxinput' class='input-checkbox' v-model='checkboxModel' :value='item.id'>
                </td>
                <td class="td2">
                  <p style="color:#3c8cdc;">{{item.title}}</p>
                  <p>
                    <span style="display:inline-block;width:210px;">{{item.cantonProvinceName}} - {{item.cantonCityName}} - {{item.cantonAreaName}}</span>
                    <span>{{item.area}}平方米</span>
                  </p>
                </td>
                <td>{{item.price?item.price:'面议'}}</td>
                <td>{{item.circulationName}}</td>
                <td>{{item.insertTime}}</td>
                <td>{{item.publishStatusName}}</td>
              </tr>
            </table>
            <div style="text-align:right;">
              <el-pagination
                background
                layout="prev, pager, next,sizes,jumper"
                :page-sizes="[5,10, 15, 20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="totalRecord"
                :page-size="pageSize"
                style="margin-top:10px;">
              </el-pagination>
            </div>
            <div v-if="tabledata == [] || tabledata == ''" style="text-align:center;">
              <img style="margin-top:10px;margin-bottom:10px;height:190px;" src="../../../../assets/image/dataNone.png">
            </div>
            <div style="clear: both;"></div>
          </div>
          <div class="operate">
            <div class="epf_btn epf_btn_bg" :class="disabled ? 'endisabledSure' : 'sure'" :disabled="disabled" @click="sureSign()">确定</div>
            <div class="epf_btn epf_btn_def" @click="close('entrustTransInfo')">取消</div>
          </div>
        </div>
      </pop-up-widget>
    </div>
</template>
<script>
import PopUpWidget from '@/components/PopUpWidget'
import { mapState , mapMutations, mapActions } from 'vuex';
export default {
  components: {PopUpWidget},
  data() {
    return {
      ruleForm:{
        circulation: "transfer",
        contracmanageinfo:"是",
        //省
        cantonProvince:"",
        cantonProvinceName:"",
        //市
        cantonCity:"",
        cantonCityName:"",
        //区
        cantonArea:"",
        cantonAreaName:"",
      },
      isShowProvince:true,
      disabled: false,
      temp: {
        address__province: '',
        address__city: '',
        address__dist: '',
      },
      tabledata:[],
      checkboxModel:'',
      checked:false,
      dicRequest:['flow_mode','administrative_regions'],//字典码请求
      dictionary:{//字典码结果
          flow_mode:"",
          administrative_regions:"",
          cantonCity:"",
          cantonArea:"",
      },
      dicNum:0,//字典循环下标
      dicFinsh:false,//接口请求完成
      //分页
      pageNo:1,
      pageSize:5,
      totalPage:1,
      totalRecord:0,
      loading:true,
      orgs: [], // 交易中心
      // getOrg:true, //提示有无交易系统
      popup:true //弹窗显示隐藏
    }
  },
  created(){
    let that = this;
    
    this.$bus.$off("reqDialogData");
    this.$bus.$on('reqDialogData',(val)=>{
      console.log(333);
      //调用土地列表查询接口方法
      that.ruleForm['page'] = that.pageNo;
      that.ruleForm['rows'] = that.pageSize;
      //省
      that.ruleForm.cantonProvince=""
      that.ruleForm.cantonProvinceName=""
      //市
      that.ruleForm.cantonCity=""
      that.ruleForm.cantonCityName=""
      //区
      that.ruleForm.cantonArea=""
      that.ruleForm.cantonAreaName=""
      that.disabled = false
      that.getLandTable(that.ruleForm);
      this.getOrg = true;
    })
 //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "administrative_regions") {
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
          // console.log("item", item);
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
  },
  methods:{
    ...mapMutations('homeland', ['close']),
    ...mapActions('homePop',['getTSellByContract']),
    getLandTable(params){
      console.log("====params=====",params)
      this.checkboxModel = ""
      this.loading = true;
      this.$axios.get('/epf-landweb/admin/tsell/getPublishedTsell',params,res=>{
        if(res.code == 0){
          console.log('列表结果',res);
          this.tabledata  = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }else{
          this.$message.error(res.msg)
        }
        this.loading = false;
      })
    },
    //获取所属行政区域有无交易系统，目前没有对应接口，统一提示未检测到该行政区域有交易系统，关闭委托交易
    // sureSign(){
    //   var cantonProvince = this.ruleForm.cantonProvince;
    //   var cantonCity = this.ruleForm.cantonCity;
    //   var cantonArea = this.ruleForm.cantonArea;
    //   if(this.ruleForm.cantonProvince == ""){
    //     this.$message.error('请选择所属省 - 市 - 区');
    //     return
    //   }
    //   if (this.ruleForm.cantonCity == "") {
    //     this.$message.error('请选择所属市 - 区');
    //     return
    //   }
    //   if (this.ruleForm.cantonArea == "") {
    //     this.$message.error('请选择所属区/县');
    //     return
    //   }
    //   let circulationName = '转让'
    //   for(let index = 0;index < this.dictionary.flow_mode.length;index++){
    //     if (this.dictionary.flow_mode[index].dictKey == this.ruleForm.circulation) {
    //       circulationName = this.dictionary.flow_mode[index].zhCn
    //     }
    //   }
    //   this.$store.state.entrustland = null;

    //   if(this.ruleForm.contracmanageinfo == '是'){
    //     this.getOrg = false;
    //     this.disabled = true;
    //     this.$axios.get(
    //       `/epf-cms/admin/org/getOrgsByareas`,
    //       {
    //         cantonProvince: cantonProvince,
    //         cantonCity: cantonCity,
    //         cantonArea: cantonArea
    //       },
    //       res => {
    //         console.log(res)
    //         if(res.orgs.length == 0){
    //           this.getOrg = false;
    //           this.disabled = true;
    //         }else{
    //           this.getOrg = true;
    //         }
    //       }
    //     )
    //     if(this.checkboxModel !== ""){
    //       this.getOrg = false;
    //       this.disabled = true;
    //     } else if(this.checkboxModel == ''){
    //       this.$store.state.entrustland = null;
    //       if(!this.getOrg){
    //           this.$message.error('请选择关联地块信息');
    //       }
    //     }
    //     return ;
    //   }else{
    //     this.getOrg = false;
    //     this.disabled = true;
    //     this.$axios.get(
    //       `/epf-cms/admin/org/getOrgsByareas`,
    //       {
    //         cantonProvince: cantonProvince,
    //         cantonCity: cantonCity,
    //         cantonArea: cantonArea
    //       },
    //       res => {
    //         if(res.orgs.length == 0){
    //           this.getOrg = false;
    //           this.disabled = true;
    //         }
    //       }
    //     )
    //   }
    // }, 
    //放开委托交易
    sureSign(){
      let circulationName = '转让'
      for(let index = 0;index < this.dictionary.flow_mode.length;index++){
        if (this.dictionary.flow_mode[index].dictKey == this.ruleForm.circulation) {
          circulationName = this.dictionary.flow_mode[index].zhCn
        }
      }
      this.$store.state.entrustland = null;

      if(this.ruleForm.contracmanageinfo == '是'){
        if(this.checkboxModel !== ""){
          this.$store.state.entrustland = null;
          this.$router.push({path:'/EntrustTransHome',query:{id:this.checkboxModel,publishLandtype:circulationName}})
        } else if(this.checkboxModel == ''){
          this.$store.state.entrustland = null;
          this.$message.error('请选择关联地块信息');
        }
        return ;
      }else{
        this.$store.state.entrustland = null//选择不关联点击确定跳转页面
        this.$router.push({path:'/EntrustTransHome',query:{publishLandtype:circulationName}})
      }
      // this.$router.push({path:'/EntrustTransHome',query:{entrustRecord:1}})
      // this.$router.push({path:'/EntrustTransHome',query:{entrustRecord:2}})
    },
    checkedAll() {
      var _this = this;
      if (this.checked) {
        _this.checkboxModel = [];
      }else{//实现全选
        _this.checkboxModel = [];
        _this.tabledata.forEach(function(item) {
          _this.checkboxModel.push(item.id);
        });
      }
    },
    provinceSelect(dic,cantonCode,event){
        this.ruleForm.cantonAreaName='';
        this.ruleForm.cantonArea='';
        this.cantonArea = ''
        this.ruleForm.cantonCityName='';
        this.ruleForm.cantonCity='';
        this.cantonCity = '';
        let pId= this.$refs[cantonCode][0].$attrs.id;
        this.ruleForm.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;
        this.dictionary.cantonArea = [];
        this.$axios.get(`/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,{},res => {
            console.log(res);
            if(res.dictionariesList.length != 0){
            this.dictionary.cantonCity = res.dictionariesList
            return
            }
            this.dictionary.cantonCity = ''
        })
        // this.getTransOrgCenters()
    },
    citySelect(dic,cantonCity,event){
      console.log(this.$refs[cantonCity][0])
        this.ruleForm.cantonArea='';
        this.ruleForm.cantonAreaName='';
        this.cantonArea = ''
        let pId= this.$refs[cantonCity][0].$attrs.id;
        this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
        this.$axios.get(`/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,{},res => {
            console.log(res);
            if(res.dictionariesList.length != 0){
            this.dictionary.cantonArea = res.dictionariesList
            return
            }
            this.dictionary.cantonArea = ''
        })
    },
    areaSelect(dic,cantonCity,event){
        this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },
    //获取交易中心，如果没有则提示
     getTransOrgCenters(){
      var cantonProvince = this.ruleForm.cantonProvince;
      var cantonCity = this.ruleForm.cantonCity;
      var cantonArea = this.ruleForm.cantonArea;
    
      this.$axios.get(
        // `/epf-cms/admin/org/getOrgsByareas`,
        `/epf-landweb/landweb/sysenterprise/listSysEnterpriseByArea`,
        {
          cantonProvince: cantonProvince,
          cantonCity: cantonCity,
          cantonArea: cantonArea
        },
        res => {
          // if(res.orgs == ""){
          if(res.enterprises == ""){
             this.getOrg = false;
             this.disabled = true;
          }else{
            this.getOrg = true;
          }
        }
      )
     },
    //分页
    handleSizeChange(val){
      //每页条数改变时触发
      this.pageSize = val;
      this.ruleForm['page'] = this.pageNo;
      this.ruleForm['rows'] = val;
      this.getMyProvide(this.ruleForm)
    },
    handleCurrentChange(val){
      //获取当前页
      console.log(val);
      this.ruleForm['page'] = val;
      this.ruleForm['rows'] = this.pageSize;
      this.getMyProvide(this.ruleForm)
    },
  },
  mounted(){
   
  },
  watch: {
    'checkboxModel': {
      handler: function (val, oldVal) { 
        console.log(val+"456789"+oldVal)
        if (this.checkboxModel.length === this.tabledata.length) {
          this.checked = true;
        }else{
          this.checked = false;
        }
      },
      deep: true
    },
    'ruleForm':{
      handler: function (val, oldVal) {
        this.getLandTable(val);
      },
      deep: true
    },
  },
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.entrustTransPop_warp{
  @include size(1000px,auto);
  padding-bottom: 30px;
  .contract_title{
    @include size(950px,auto);
    margin:0 auto;
    box-sizing: border-box;
    border-bottom: solid 1px #f3f3f3;
    padding:12px 0;
    .detectable{
      padding:0 10px 0 12px;
      height: 40px;
      background: #fffbe4;
      .not_detectable{
        padding:15px 0 0 11px;
        font-size:14px;
        color:#ff6635;
        line-height: 14px;
        float: left;
        img{
          width: 14px;
          height: 14px;
        }
      }
      .sure{
        float:right;
        span{
          display: inline-block;
          width: 44px;
          height: 24px;
          text-align: center;
          background: var(--Colors);
          color:#fff;
          border-radius: 3px;
          line-height: 24px;
          margin-top:8px;
        }
       
      }
    }
    .contractype{
      @include size(100%,auto);
      line-height: 40px;
      font-size: 14px;
      color: #666666;
      .type_lable{
        display: inline-block;
        color: #333333;
        width:130px;
        text-align: right;
        span{
          color:red;
          margin-right:10px;
        }
      }
    }
  }
  .contract_content{
    @include size(950px,auto);
    margin:0 auto;
    .manageinfo{
      margin:26px 0;
      // padding-left:30px;
      .type_lable{
        display: inline-block;
        color: #333333;
        width:130px;
        text-align: right;
      }
      .careful{
        font-size: 12px;
        color: #999999;
      }
    }
    .contract_content_table{
      @include size(950px,auto);
      table{
        tr{
          height:64px;
          text-align: center;
          line-height: 64px;
          border-bottom: solid 1px #f3f3f3;
          color:#666666;
          &:nth-child(1){
            background-color: #f6f9fe;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            height:50px;
          }
          td{
            text-align: left;
          }
          .td1{
            width:50px;
            input{
              @include size(16px,16px);
              background-image: linear-gradient(0deg, #f2f4f8 1%, #ffffff 100%);
              border-radius: 4px;
              border: solid 1px #ced0da;
              margin-left: 15px;
            }
          }
          .td2{
            @include size(320px,auto);
            text-align: left;
          }
          p{
            line-height: 25px;
          }
        }
      }
      .block{
        margin:20px;
        float: right;
        ul{
          li{
            border: solid 1px #e0dfdf;
            border-radius: 3px;
            text-align: center;
            line-height: 28px;
            font-size: 12px;
            display: inline-block;
            margin-right:5px;
            cursor: pointer;
            padding: 0 10px;
          }
          span{
            margin-right:8px;
          }
          input{
            @include size(35px,28px);
            border: solid 1px #e0dfdf;
            text-align: center;
            line-height: 28px;
            margin-right:8px;
            border-radius: 3px;
          }
          .liActive{
            background-color: var(--Colors);
            border:none;
            color:#fff;
          }
        }
      }
    }
    .operate{
      @include size(200px,36px);
      margin:0 auto;
      .endisabledSure{
        margin-right:30px;
        background: #f6f6f6;
        color:#666666;
        cursor:default;
      }
    }
  }
}
.distpicker-address-wrapper {
  select{
    width: 177px!important;
  }
}
</style>
