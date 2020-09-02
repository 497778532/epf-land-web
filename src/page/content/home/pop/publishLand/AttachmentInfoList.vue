<template>
  <div style="background: #f2f1f9;">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="publishTra_wrap">
        <div class="epf_proess">
          <span class="epf_proess_title">发布{{publishLandtype }}地源</span>
          <div class="epf_proess_cont">
            <epf-step :active="3" :data="['土地基本信息','申请人基本信息','附件清单']"></epf-step>
          </div>
        </div>
        <div class="publishTra_main">
          <epf-switchTitle titles_h='附件清单'
            padding='0px'
            background='#fff'
            height='80px'
            :shutOff='false'>
          </epf-switchTitle>
          <div class="publishTra_main_cont">

            <epf-annexList
              v-if="belong"
              @seeFlie='tableDataFun'
              @isAux='isAuxFun'
              @commit="isAgreeFun"
              :tableType='false'
              :tableNmae='tableNmae'
              :belong='belong'
              :areaCode='areaCode'
              :fileSize='6'
              :fileType='fileType'
              :annexType='landType'>
            </epf-annexList>

              <!-- style="background:#fff;color:#555;border:1px solid #c9c9c9;margin-left:0px !important;" -->
            <div v-show="!subLoading" class="epf_btn epf_btn_bg" style="width:82px;" @click="submitLand('submit')">提交</div>
            <div v-show="subLoading" class="epf_btn epf_btn_bg" style="width:82px;"><i class="el-icon-loading"></i></div>
            <div v-show="!subLoading2" class="epf_btn epf_btn_def" style="width:82px;" @click="submitLand('save')">保存</div>
            <div v-show="subLoading2" class="epf_btn epf_btn_def" style="width:82px;"><i class="el-icon-loading"></i></div>
            <div class="epf_btn epf_btn_def" style="width:82px;" @click="back">上一步</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import baseURL1 from "@/util/config.js";
import qs from "qs";
export default {
  data() {
    return {
      tableNmae:['序号','文件名','文件','操作'],
      belong:'',
      areaCode:'',
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      landType:'LAND',

      baseUrl: "",
      disabled: false,
      doUpload: "/api/up/file",
      pppss: {
        srid: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      ruleForm: {
        pId: null,
        photoFirstUpload: true,
        additional: []
      },
      active: 0,
      location: [{ path: "/", name: "首页" }, { path: null, name: "发布地源" }],
      tableData: [],
      fileList: [],
      tid: "",
      fileIndex: "",
      additionalId: [],
      fileListName: "",
      publishLandtype: "",
      subLoading: false,
      subLoading2: false,
      inspectList:'', //验证数据源
      isAuxFlag: false,
      isAgreeFlage:null,
      title:"",
    };
  },
  created() {
      //获取地块的信息
      let transGoodsJson = this.$store.state.publishLand;
      console.log(transGoodsJson)
      if(!transGoodsJson){
        console.log(JSON.parse(localStorage.getItem('transGoodsJson')))
        transGoodsJson = JSON.parse(localStorage.getItem('transGoodsJson'))
        this.$store.state.publishLand = transGoodsJson

      }
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
      console.log(this.areaCode)

      this.ruleForm = Object.assign(transGoodsJson, this.ruleForm);
      localStorage.setItem('transGoodsJson',JSON.stringify(this.ruleForm))


      window.scrollTo(0, 120);
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/docTemplete/getDocTempleteTree";
    if (this.$route.query.landtype) {
      this.pulishType(Number(this.$route.query.landtype));
    } else {
      if (this.$store.state.publishLand.circulation == "transfer") {
        this.pulishType(1);
      } else if (this.$store.state.publishLand.circulation == "rent") {
        this.pulishType(2);
      } else if (this.$store.state.publishLand.circulation == "mortgage") {
        this.pulishType(3);
      }
    }
    if (this.$route.query.id) {
      this.belong = this.$route.query.id;
    } else {
      this.belong = this.$store.state.publishLand.id;
    }
  },
  mounted() {
    this.getInformationList();
    //信息发布协议
    this.$axios.get(
      "/epf-cms/admin/info/getInfo?id=f65f489c-caf4-4ea8-99ba-8467b5e2bdb5",
      {},
      res => {
        this.title = res.info.title
      }
    )
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"]),
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"]),
    pulishType(typeName) {
      if (typeName === 1) {
        this.publishLandtype = "转让";
      } else if (typeName === 2) {
        this.publishLandtype = "出租";
      } else if (typeName === 3) {
        this.publishLandtype = "抵押";
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    photoUploadFile(files) {
      //上传方法
      const file = files.file;

      const formData = new FormData();
      formData.append("files", file);

      formData.append("belong", this.belong);

      if (this.ruleForm.fileId) {
        // formData.append("pId",this.ruleForm.fileId);
        formData.append("pId", this.tid);
        this.upload(formData, files, file);
        return;
      }

      if (!this.ruleForm.fileId && this.ruleForm.photoFirstUpload) {
        console.log("第一张图片上传");
        formData.append("pId", this.tid);
        this.ruleForm.photoFirstUpload = false;
        this.upload(formData, files, file, "first");
        return;
      }

      if (this.ruleForm.fileId && !this.ruleForm.photoFirstUpload) {
        console.log("之后的图片上传携带id");
        this.upload(formData, files, file);
        return;
      }
    },
    upload(formData, files, file, count) {
      //文件上传
      this.$axios.post(
        "/epf-document/document/upload",
        formData,
        res => {
          if (res.state != "SUCCESS") {
            if (count == "first") {
              this.ruleForm.photoFirstUpload = true;
              // this.$refs.additionalRef.submit();
              return null;
            }
            return null;
          }
          if (!this.ruleForm.fileId) {
            this.ruleForm.fileId = res.data[0].pId;
            // this.ruleForm.additional = res.data.data[0].id;
          }
          if (this.ruleForm.fileId && !this.ruleForm.photoFirstUpload) {
            // this.$refs.additionalRef.submit();
          }
          this.additionalId.push(res.data[0].id);
          files.onSuccess(res);
        },
        function(event) {
          //进度条
          file.percent = (event.loaded / event.total) * 100;
          files.onProgress(file);
        }
      );
    },
    photoUploadError() {
      //上传失败钩子
      this.disabled = false;
    },
    photoUploadSuccess(res, file, fileList) {
      //上传成功钩子
      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      };
      if (this.tableData[this.fileIndex].files.length == 0) {
        this.tableData[this.fileIndex].files.push(fileObject);
      } else {
        this.tableData[this.fileIndex].files[0] = fileObject;
      }
      this.ruleForm[this.fileListName] = fileList;
      for (let i = 0; i < this.ruleForm[this.fileListName].length; i++) {
        this.ruleForm[this.fileListName][i].url =
          this.baseUrl + this.additionalId[i];
      }
      this.disabled = false;
    },
    handleRemove(file, fileList) {
      console.log("移除文件：", file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = false;
    },
    tableDataFun(value){
      this.inspectList = value
    },
    // 获取附件清单数据检验结果
    isAuxFun(value){
      this.isAuxFlag = value;
    },
    isAgreeFun(value){
      this.isAgreeFlage = value;
    },
    submitLand(name) {
      if(!this.isAuxFlag){
        this.$message.error('请检查您的附件清单信息是否上传完整！');
        return;
      }
     
      if (this.subLoading || this.subLoading2) {
        return;
      }
      //提交表单
      if (name == "submit") {
        this.subLoading = true;
         if(!this.isAgreeFlage){
          this.$message.error(`请先阅读并同意《${this.InformationList.information.name}${this.title}》`);
          this.subLoading = false;
          return;
        }
        this.$store.state.publishLand["insertTime"] = null;
        this.$store.state.publishLand["examineTime"] = null;
        this.$store.state.publishLand["publishStatus"] = "audit";
        this.$store.state.publishLand["tproserEntity"] = null;
        this.$store.state.publishLand["updateTime"] = null;
       
      } else if (name == "save") {
        this.subLoading2 = true;
        this.$store.state.publishLand["insertTime"] = null;
        this.$store.state.publishLand["examineTime"] = null;
        this.$store.state.publishLand["publishStatus"] = "draft2";
        this.$store.state.publishLand["tproserEntity"] = null;
        this.$store.state.publishLand["updateTime"] = null;

      }
      const publishLand = this.$store.state.publishLand;
      //更改封面图
      let imgUrlId =  publishLand.imgUrlId;
      if(imgUrlId && imgUrlId.length > 0){
        publishLand.img = imgUrlId[0];
      }

      // var procDefKey = "transaction_filing"; //启动流程类型
      var procDefKey = "InclusionTestModel"; //启动流程类型
      let businessType="sell";
      //获取启动节点信息
      // this.$axios.post("/epf-activiti/act/task/getPvmNextNodeId",qs.stringify({nodeId: "start",procDefKey: procDefKey,orgId: publishLand.trustOrgId,businessType:businessType}),res => {
      //     if (res == "error") {
      //       this.$message.error(res.msg);
      //       this.subLoading = false;
      //       this.subLoading2 = false;
      //       return;
      //     }
      //     if (res.code != "0") {
      //       this.$message.error(res.msg);
      //       this.subLoading = false;
      //       this.subLoading2 = false;
      //     }
      //     var jsonVars =
      //       "{NAME_" +
      //       res.nodes[0].nodeId +
      //       ":'" +
      //       res.nodes[0].excutionUser +
      //       "',procDefKey:'" +procDefKey +
      //       "',businessType:'" +businessType +
      //       "'}";
      //     publishLand["jsonVars"] = jsonVars;
          this.$axios.post(
            "/epf-landweb/admin/tsell/addTSell",
            qs.stringify(publishLand),
            res => {
              console.log("内嵌请求返回", res);
              if (res.code == "0") {
                this.subLoading = false;
                this.subLoading2 = false;
                this.$store.state.publishLand = {};
                if (name == "submit") {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                } else if (name == "save") {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                }
                this.subLoading = false;
                this.subLoading2 = false;
                this.$router.push({ path: "/PersonalCenter/myProvide" });
                localStorage.removeItem('transGoodsJson')
                return;
              } else {
                this.$message.error(`是错误返回,${res.msg}`);
                this.subLoading = false;
                this.subLoading2 = false;
              }
            }
          );
        // }
      // );
    },
    beforeAvatarUploadImg(file) {
      this.disabled = true;
      const isJpg = file.name.split(".").slice(-1)[0] === "jpg";
      const isJPG = file.name.split(".").slice(-1)[0] === "JPG";
      const isRar = file.name.split(".").slice(-1)[0] === "rar";
      const isRAR = file.name.split(".").slice(-1)[0] === "RAR";
      const isZIP = file.type === "application/x-zip-compressed";
      const isPDF = file.type === "application/pdf";
      const isDOC = file.name.split(".").slice(-1)[0] === "doc";
      const isDOCD = file.name.split(".").slice(-1)[0] === "DOC";
      const isDOCX = file.name.split(".").slice(-1)[0] === "docx";
      const isDOCXD = file.name.split(".").slice(-1)[0] === "DOCX";
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (file.size === 0) {
        this.$message.error("上传附件大小不能为0");
        this.disabled = false;
        return false;
      }
      if (
        !isJpg &&
        !isJPG &&
        !isRar &&
        !isRAR &&
        !isZIP &&
        !isPDF &&
        !isDOCX &&
        !isDOC &&
        !isDOCD &&
        !isDOCXD
      ) {
        this.$message.error("上传附件只能是 rar zip doc docx pdf jpg 格式!");
        this.disabled = false;
        return false;
      }
      if (!isLt20M) {
        this.$message.error("上传土地照片大小不能超过 20MB!");
        this.disabled = false;
        return false;
      }
    },
    addMoreFile() {
      let tid = this.tableData[this.tableData.length - 1].tid;
      this.tableData.push({
        isAux: "0",
        tid: tid + this.tableData.length,
        tname: "其他",
        files: [],
        tsize: 0
      });
      this.tableData.length = this.tableData.length;
    },
    upLoadClick(index, fileListName) {
      this.tid = "";
      this.tid = this.tableData[index].tid;
      this.fileIndex = index;
      this.fileListName = fileListName;
      console.log('文件数据',this.tableData)
    },
    back() {
      // window.history.back(-1);
      if(this.$route.query.landtype){
        this.$router.push({path:"/ApplicantInfo",query:{landType:this.$route.query.landtype}})
      }else{
        this.$router.push({path:"/ApplicantInfo",query:{id:this.$route.query.id}})
      }
    },
    delFile(index, tid, id) {
      let that = this;
      let url =
        "/epf-document/document/deleteByFolder?id=" + id + "&fdId=" + tid;
      this.$axios.post(url, {}, res => {
        if (res.state == "SUCCESS") {
          this.tableData[index].files = [];
          this.tableData[index].tsize = 0;
        }
      });
      this.tableData[index].files = [];
      this.tableData[index].tsize = 0;
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
.publishTra_main {
  @include size(1200px, auto);
  margin-bottom: 25px;
  background: #fff;
  &_cont {
    box-sizing: border-box;
    @include size(1104px, auto);
    margin: 0 auto;
    padding-bottom: 20px;
    p {
      margin: 18px 0 18px 24px;
      color: #999999;
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
.upLoadHidden .el-upload-list {
  display: none !important;
}
</style>

