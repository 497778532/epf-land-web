<template>
<!--  wwtotijn-->
  <div style="background: #f2f1f9;">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="EntrustTra_wrap">
        <div v-if="!detail" class="epf_proess">
            <span class="epf_proess_title">申请委托交易</span>
            <div class="epf_proess_cont">
              <epf-step :active="3" :data="['委托机构及土地基本信息','申请人基本信息','附件清单']"></epf-step>
            </div>
        </div>
        <!-- 土地附件清单 -->
        <div class="EntrustTra_main">
          <epf-switchTitle titles_h='土地附件清单'
            padding='0px'
            background='#fff'
            height='80px'
            :shutOff='false'>
          </epf-switchTitle>
          <div class="EntrustTra_main_cont" style="padding-bottom:0px;">
            <epf-annexList
              v-if="belong"
              :tableType='detail'
              @isAux='isAuxFun'
              :tableNmae='tableNmae'
              :belong='belong'
              :areaCode='areaCode'
              :fileSize='6'
              :fileType='fileType'
              :annexType='landType'>
            </epf-annexList>
          </div>
          <!-- 委托附件清单 -->
          <epf-switchTitle titles_h='委托附件清单'
            padding='0px'
            background='#fff'
            height='80px'
            :shutOff='false'>
          </epf-switchTitle>
          <div class="EntrustTra_main_cont">
            <epf-annexList
              v-if="belong"
              :tableType='detail'
              @isAux='isAuxFun2'
              :tableNmae='tableNmae'
              :belong='belong'
              :areaCode='areaCode'
              :fileSize='6'
              :fileType='fileType'
              :annexType='entrustType'>
            </epf-annexList>
            <div v-if="!detail">
              <div v-show="!isLoading" class="epf_btn epf_btn_bg" style="width:82px;" @click="submitLand('submit')">提交</div>
              <div v-show="isLoading" class="epf_btn epf_btn_bg" style="width:82px;"><i class="el-icon-loading"></i></div>
              
              <div class="epf_btn epf_btn_def" style="width:82px;" @click="submitLand('save')">保存</div>
              <div class="epf_btn epf_btn_def" style="width:82px;" @click="back">{{detail?'上一页':'上一步'}}</div>
            </div>
            <div v-else>
              <div class="epf_btn epf_btn_def" style="width:82px;" @click="back">{{detail?'上一页':'上一步'}}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import baseURL1 from "@/util/config.js";
import qs from 'qs';
export default {
  data() {
    return {
      tableNmae:['序号','文件名','文件','操作'],
      belong:'',
      areaCode:'',
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      landType:'LAND',
      entrustType:'TRANS',

      disabledType:0, //附件显示状态
      detail:false,
      doUpload:'/api/up/file'
        ,pppss:{
            srid:''
        },fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      ,
      active:0,
      ruleForm:{
        pId:'0',
        photoFirstUpload:true,
        additional:[],
        entrustFirstUpload:true,
        entrustAdditional:[],
        id: ""
      },
      location:[
        {path:'/',name:'首页'},
        {path:null,name:'委托交易'},
      ],
      // 土地附件清单
      tableData: [],
      // 交易附件清单
      transTableData: [],
      fileList:[],
      tid:'',
      eid:'',
      fileIndex:'',
      entrustFileIndex:'',
      additionalId:[],
      entrustAdditionalId:[],
      fileListName:'',
      trustFileCode:"",//委托附件清单标识
      disabled:false,//
      isAuxFlag: false,
      isAuxFlag2:false,
        isLoading:false,
    };
  },
  created(){
      /**
       * 	this.$store.state.transGoodsJson

       cantonArea: "370102"
       cantonAreaName: "历下区"
       cantonCity: "370100"
       cantonCityName: "济南市"
       cantonProvince: "370000"
       cantonProvinceName: "山东省"
       */
          //获取交易物信息
      let transGoodsJson = this.$store.state.transGoodsJson;
      //赋值地区字符
      let areaCode = '';
      //根据条件拼接
      if(transGoodsJson.cantonArea){
          areaCode = areaCode+transGoodsJson.cantonArea+','
      }
      if(transGoodsJson.cantonCity){
          areaCode = areaCode+transGoodsJson.cantonCity+','
      }
      if(transGoodsJson.cantonProvince){
          areaCode = areaCode+transGoodsJson.cantonProvince+','
      }
      this.areaCode = areaCode;


    window.scrollTo(0,120);
    this.disabledType = this.$route.query.disabledType
    this.ruleForm = this.$store.state.entrustland;
    if(this.$route.query.detail){
      this.location[1].name="委托交易详情"
      this.detail = true;
    }else{
      this.location[1].name="委托交易"
    }
    if(this.$route.query.id){
      //如果是关联查询来的，新创建附件列表ID
      this.belong = this.$store.state.entrustland.tSellId;

    }else if(this.$route.query.tgId){
      // this.belong = this.$route.query.tgId;
      //调用接口通过tgId 查询该表的数据
      var that = this
      that.$axios.get("/epf-landweb/landweb/transgoods/queryByID", {id : this.$route.query.tgId}, res => {
        if (res.code != "0") {
          that.$message.error(res.map.error); //失败
          return;
        }
        //获取附件的存储ID来进行储存
        if(res.transGoodsEntity){
          this.belong = res.transGoodsEntity.enclosureId
        }
      });

    }else{
    //新增进来的，重新创建附件列表ID
    this.belong = this.$store.state.entrustland.tgId;
    }
  },
  methods: {
    // 获取附件清单数据检验结果
    isAuxFun(value){
      this.isAuxFlag = value;
    },
    isAuxFun2(value){
      this.isAuxFlag2 = value;
    },
    beforeAvatarUploadImg(file) {  //上传验证
      this.disabled = true
      const isJpg = file.name.split('.').slice(-1)[0] === 'jpg'
      const isJPG = file.name.split('.').slice(-1)[0] === 'JPG'
      const isRar = file.name.split('.').slice(-1)[0] === 'rar'
      const isRAR = file.name.split('.').slice(-1)[0] === 'RAR'
      const isZIP = file.type === "application/x-zip-compressed";
      const isPDF= file.type === "application/pdf";
      const isDOC = file.name.split('.').slice(-1)[0] === "doc";
      const isDOCX = file.name.split('.').slice(-1)[0] === "docx";
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (file.size === 0) {
        this.$message.error("上传附件大小不能为0");
        this.disabled = false
        return false;
      }
      if (!isJpg && !isJPG && !isRar && !isRAR && !isZIP && !isPDF && !isDOCX && !isDOC) {
        this.$message.error("上传附件只能是 rar zip doc docx pdf jpg 格式!");
        this.disabled = false
        return false;
      }
      if (!isLt20M) {
        this.$message.error("上传土地照片大小不能超过 20MB!");
        this.disabled = false
        return false;
      }
    },
    entrustUploadFile(files){//委托上传方法
      const file = files.file;
      const formData = new FormData();
      formData.append("files",file);
      formData.append("belong",this.belong);

      if(this.eid){
        formData.append("pId",this.eid);
        this.entrustUpload(formData,files,file);
        return
      }
      if(!this.ruleForm.pId && this.ruleForm.entrustFirstUpload){
          console.log('第一张图片上传');
          formData.append("pId",this.eid);
          this.ruleForm.entrustFirstUpload = false;
          this.entrustUpload(formData,files,file,'first');
          return
      }
      if(this.ruleForm.pId && !this.ruleForm.entrustFirstUpload){
          console.log('之后的图片上传携带id');
          this.entrustUpload(formData,files,file);
          return
      }
    },
    entrustUpload(formData,files,file,count){ //委托上传
      //文件上传
      this.$axios.post('/epf-document/document/upload',formData,
        res => {

          if(res.state != 'SUCCESS'){
            if(count == 'first'){
              this.ruleForm.entrustFirstUpload = true;
              return null
            }
            this.$message.error('上传失败，请重新上传！')
            return null
          }
          if(!this.ruleForm.pId){
            console.log('上传成功n+',res)
            this.ruleForm.pId = res.data[0].pId;
            // this.ruleForm.additional = res.data.data[0].id;
          }
          console.log('上传成功No;1',res)
          if(this.ruleForm.pId && !this.ruleForm.entrustFirstUpload){
            // this.$refs.additionalRef.submit();
          }
          this.entrustAdditionalId.push(res.data[0].id);
          files.onSuccess(res);
        },
      )
    },
    entrustUploadSuccess(res,file,fileList){ //委托上传成功
      this.disabled = false;
      let fileObject = {
        fname:res.data[0].name,
        fid:res.data[0].id,
        fsize:res.data[0].docSize,
        ftype:res.data[0].extName
      }
      if(this.transTableData[this.entrustFileIndex].files.length == 0){
        this.transTableData[this.entrustFileIndex].files.push(fileObject)
      }else{
        this.transTableData[this.entrustFileIndex].files[0] = fileObject;
      }
      this.ruleForm[this.fileListName] = fileList;
      for(let i=0;i< this.ruleForm[this.fileListName].length;i++){
        this.ruleForm[this.fileListName][i].url = this.baseUrl + this.entrustAdditionalId[i];
      }
    },
    entrustHandleRemove(file, fileList) { //委托移除
      console.log('委托移除',file, fileList);
    },
    photoUploadError() {
      //上传失败钩子
      this.disabled = false;
    },
    handlePictureCardPreview(file) {  //上传ing...
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    entrustDelFile(index, tid, id){ //委托删除
      let that = this;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = '/epf-document/document/deleteByFolder?id='+id+'&fdId='+tid;
          this.$axios.post(url,{},res => {
            if(res.state == 'SUCCESS'){
              this.transTableData[index].files = [];
              this.transTableData[index].tsize = 0;
              this.$message({
                type: 'success',
                message: '文件删除成功!'
              })
            }else{
              this.$message({
                type: 'error',
                message: '文件删除失败!'
              })
            }
          })
        }).catch(() => {});
    },
    entrustUpLoadClick(index,fileListName){ //委托上传点击按钮
      this.eid = "";
      this.eid = this.transTableData[index].tid
      this.entrustFileIndex = index
      this.fileListName = fileListName
    },

    upLoadClick(index,fileListName){ //土地上传点击按钮
      this.tid = "";
      this.tid = this.tableData[index].tid
      this.fileIndex =index
      this.fileListName = fileListName
      console.log('下标',index,'fileListName',fileListName)
    },
    photoUploadFile(files){//土地上传方法
      const file = files.file;
      const formData = new FormData();
      formData.append("files",file);
      formData.append("belong",this.belong);
      if(this.ruleForm.pId){
        formData.append("pId",this.tid);
        this.upload(formData,files,file);
        return
      }
      if(!this.ruleForm.pId && this.ruleForm.photoFirstUpload){
        console.log('第一张图片上传，表单对象：',this.ruleForm);
        formData.append("pId",this.tid);
        this.ruleForm.photoFirstUpload = false;
        this.upload(formData,files,file,'first');
        return
      }
      if(this.ruleForm.pId && !this.ruleForm.photoFirstUpload){
        console.log('之后的图片上传携带id');
        this.upload(formData,files,file);
        return
      }
    },
    upload(formData,files,file,count){ //土地上传
      //文件上传
      this.$axios.post('/epf-document/document/upload',formData,
        res => {
          console.log('上传后的返回：',res)
          if(res.state != 'SUCCESS'){
            if(count == 'first'){
              this.ruleForm.photoFirstUpload = true;
              return null
            }
            this.$message.error('上传失败，请重新上传！')
            return null
          }
          if(!this.ruleForm.pId){
            this.ruleForm.pId = res.data[0].pId;
            // this.ruleForm['img'] = res.data.data[0].id
            // this.ruleForm.additional = res.data.data[0].id;
          }
          if(this.ruleForm.pId && !this.ruleForm.photoFirstUpload){
            // this.$refs.additionalRef.submit();
          }
          this.additionalId.push(res.data[0].id);
          files.onSuccess(res);
        },
      );
    },
    photoUploadSuccess(res,file,fileList){ //土地上传成功
      this.disabled = false;
      let fileObject = {
        fname:res.data[0].name,
        fid:res.data[0].id,
        fsize:res.data[0].docSize,
        ftype:res.data[0].extName
      }
      if(this.tableData[this.fileIndex].files.length == 0){
        this.tableData[this.fileIndex].files.push(fileObject)
      }else{
        this.tableData[this.fileIndex].files[0] = fileObject;
      }
      this.ruleForm[this.fileListName] = fileList;
      for(let i=0;i< this.ruleForm[this.fileListName].length;i++){
        this.ruleForm[this.fileListName][i].url = this.baseUrl + this.additionalId[i];
      }
    },
    handleRemove(file, fileList) { //土地移除
      console.log('土地移除',file, fileList);
    },
    delFile(index, tid, id){  //土地删除
      console.log('土地附件文件删除:：',index,tid,id)
      let that = this;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/epf-document/document/deleteByFolder?id='+id+'&fdId='+tid;
        this.$axios.post(url,{},res => {
          if(res.state == 'SUCCESS'){
            this.tableData[index].files = [];
            this.tableData[index].tsize = 0;
            this.$message({
              type: 'success',
              message: '文件删除成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: '文件删除失败!'
            })
          }
        })
      }).catch(() => {});
    },
    submitLand: function (type) { //保存&提交
        //警用按钮
        this.isLoading = true;

        //提交成功、保存成功
        var message = '';
        if(type == 'submit'){
          message = '提交成功'
        }else{
          message = '保存成功';
        }

      var jsonVars = "";
      if (!this.isAuxFlag || !this.isAuxFlag2) {
        this.$message.error('请检查您的附件清单信息是否上传完整！');
        //启用按钮
        this.isLoading = false;
        return;
      }
      //现在把附件ID存起来
      this.$store.state.transGoodsJson.enclosureId = this.belong;
      //其他处理
      this.$store.state.transTrustInfo['trustFileCode'] = this.trustFileCode;
      this.$store.state.transTrustInfo['delegationStatus'] = type == 'submit' ? 'accepting' : 'draft3';
      console.log(this.$store.state.transGoodsJson, this.$store.state.transTrustInfo);

        //执行自己的方法，后台判断启动与否
        // 提交表单
        if (this.$route.query.id) {
            ///epf-supply/admin/tsellentrust/addTransGoods
          this.$axios.post('/epf-landweb/admin/addTransGoods', {
            'transTargetJson': {
              'transGoods': this.$store.state.transGoodsJson,
              'transTrustInfo': this.$store.state.transTrustInfo
            }
          }, res => {
            console.log(res);
            if (res.code == 0) {
                //启用按钮
                this.isLoading = false;
              this.$store.state.entrustland = {};
              this.$message({
                message: message,
                type: 'success'
              });
              this.$router.push({path: '/PersonalCenter/entrustDeal'})
              return
            }
            this.$message.error(res.msg);
              //启用按钮
              this.isLoading = false;
          });
        } else if (this.$route.query.tgId) {
          let transGoods = this.$store.state.transGoodsJson;
          let transTrustInfo = this.$store.state.transTrustInfo;
          let tgId = this.$route.query.tgId;

          //判断是否重新提交进来的
          var isReapply = ""
          if(!isReapply){
            isReapply = localStorage.getItem("isReapply");
          }

          if(isReapply && isReapply == 'reapply'){
            //清空一些数据，重新提交操作
            transGoods["isReapply"] = 'reapply'
          }
          this.$axios.post('/epf-landweb/admin/addTransGoods', {
            'transTargetJson': {
              'transGoods': transGoods,
              'transTrustInfo': transTrustInfo,
              'jsonVars': jsonVars,
            }
          }, res => {
            console.log(res);
            if (res.code == 0) {
                //启用按钮
                this.isLoading = false;

              this.$store.state.entrustland = {};
              this.$message({
                message: message,
                type: 'success'
              });

              if(isReapply && isReapply == 'reapply'){
                //清空状态
                localStorage.removeItem("isReapply");
              }

              this.$router.push({path: '/PersonalCenter/entrustDeal'})
              return
            }
            this.$message.error(res.msg);
              //启用按钮
              this.isLoading = false;
          });
        } else {
          this.$axios.post('/epf-landweb/admin/addTransGoods', {
            'transTargetJson': {
              'transGoods': this.$store.state.transGoodsJson,
              'transTrustInfo': this.$store.state.transTrustInfo
            }
          }, res => {
            console.log(res);
            if (res.code == 0) {
                //启用按钮
                this.isLoading = false;
              this.$store.state.entrustland = {};
              this.$message({
                message: message,
                type: 'success'
              });
              this.$router.push({path: '/PersonalCenter/entrustDeal'})
              return
            }
            this.$message.error(res.msg);
              //启用按钮
              this.isLoading = false;
          });
        }
    },
    back(){ //上一步
       window.history.back(-1);
    },
    // 下载文件
    downFile(id){
      window.open(baseURL1.baseURL1 +'/epf-document/document/downloadById?id='+id, '_self');
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.EntrustTra_main {
  @include size(1200px, auto);
  margin-bottom: 25px;
  background: #fff;
  &_cont {
    padding-bottom: 50px;
    box-sizing: border-box;
    @include size(1104px,auto);
    margin:0 auto;
    p{
        margin:18px 0 18px 24px;
        color: #999999;
    }
  }
}
.EntrustTra_main_cont .el-upload-list{
  display: none !important;
}
.el-upload-list{
  display: none !important;
}
</style>
<style>
.upLoadHidden .el-upload-list{
  display: none !important;
}
</style>
