<template>
  <div id="app">
    <div class="publish_main_cont">
      <table
        v-loading="fliesUpload"
        element-loading-text="上传中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        cellpadding="0"
        cellspacing="0"
        style="width:100%;"
      >
        <tr>
          <!-- 表头 -->
          <td v-for="(item, index) in tableNmae" :key="index">{{ item }}</td>
        </tr>
        <tr
          class="upLoadHidden"
          v-for="(item, index) in tableData"
          :key="index"
        >
          <!-- 序号 -->
          <td width="100px">{{ index + 1 }}</td>
          <!-- 附件清单名 -->
          <td width="350px">
            <span class="text_red" v-if="item.isAux == 1">*</span>
            {{ item.tname }}
          </td>
          <!-- 文件回显-文件名 -->
          <td v-if="state">
            <span
              v-if="item.files.length !== 0"
              @click="preview(item.files[0])"
              >{{ item.files[0].fname }}</span
            >
            <el-button type="text" v-else style="color:#999" :disabled="true"
              >无数据</el-button
            >
          </td>
          <!-- 文件上传-文件名 -->
          <td width="350px" v-if="!state">
            <span @click="preview(item.files[0])">{{
              item.files.length == 0 ? '' : item.files[0].fname
            }}</span>
          </td>
          <!-- 文件回显-文件操作 -->
          <td width="200px" v-if="state">
            <span v-if="item.files.length !== 0">
              <!--               <span @click="seeFlie()">查看</span>-->
              <span @click="preview(item.files[0])">查看</span>
              <span>
                <a :href="baseUrl + item.files[0].fid">下载</a>
              </span>
            </span>
          </td>
          <!-- 文件上传-文件操作 -->
          <td width="200px" v-if="!state" class="filesUpload">
            <span
              v-if="item.files.length != 0"
              @click="deleteFile(index, item.tid, item.files[0].fid)"
              >删除</span
            >
            <el-upload
              :disabled="disabled"
              v-if="item.files.length == 0"
              class="upload-demo"
              ref="additionalRef"
              action="/epf-document/document/upload/"
              :before-upload="fileFormatChecking"
              :http-request="annexUpload"
              :on-success="uploadSuccess"
              :on-error="upLoadError"
            >
              <el-button
                :disabled="disabled"
                type="text"
                v-if="item.files.length == 0"
                @click="uploadeFile(index, item.tid)"
                >上传</el-button
              >
            </el-upload>
          </td>
        </tr>
      </table>

      <p>
        说明：支持
        <span v-for="(item, index) in fileTy" :key="index">.{{ item }}</span>
        格式
      </p>
      <p>
        提示：
        <span
          >权属人性质为个人时，权属人证件上传身份证；性质为企业时，权属人证件上传营业执照</span
        >
      </p>
      <p class="agree_msg" v-if="agreeMsg">
        <input type="radio" :checked="agree" @click="isAgree" id="item1" />
        <label for="item1">
          <span style="margin-left: 10px;margin-right:0;">同意并接受</span>
        </label>
        <span style="color:var(--lightColor)" v-if="InformationList" @click="centerDialogVisible = true"
          >《{{InformationList.information.name}}{{title}}》</span
        >
      </p>
    </div>
    <transition name="el-fade-in">
      <div v-show="dialogVisible" class="frameBox">
        <el-row class="trameTitle">
          <el-col :span="12">
            <h2>附件预览</h2>
          </el-col>
          <el-col :span="12">
            <el-button @click="handleClose" :disabled="false">
              关闭
              <i class="el-icon-close"></i>
            </el-button>
          </el-col>
        </el-row>
        <iframe
          :src="src"
          :style="{ width: '100%', height: '100%', boder: 'none' }"
        ></iframe>
      </div>
    </transition>
    <!-- 全国土地二级市场交易服务平台发布信息承诺说明 -->
    <el-dialog :visible.sync="centerDialogVisible" width="994px" class="dialog">
      <div class="borderAll">
        <div class="title_box">
          <h4>{{title}}</h4>
        </div>
        <div slot="footer" class="dialog-footer" id="dialog-footer">
          <div v-html="content">{{content}}</div>
          <!-- <h3 class="el-dialog__title" style="text-algin:center">
            发布信息承诺说明
          </h3>
          <h4>
            使用全国土地二级市场交易服务平台提供的发布信息承诺相关功能（以下简称“发布信息承诺”），您应当阅读并遵守《发布信息承诺说明》（下称“本说明”）。
          </h4>
          <h4>
            【审慎阅读】请在接受本说明前务必先审慎、充分理解本说明的相应条款，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。
          </h4>
          <h4>
            除非您已阅读并接受本说明的相关协议、规则等所有条款，否则您无权使用发布信息承诺功能。您使用发布信息功能，即视为您已阅读并同意上述协议、规则等的约束
          </h4>
          <h4>一、协议范围</h4>
          <p>
            1.本说明是用户与全国土地二级市场交易服务平台之间关于使用全国土地二级市场交易服务平台提供的供需信息发布相关功能所订立的协议。
          </p>
          <p>
            2.本说明内容同时包括全国土地二级市场交易服务平台在您同意本协议后不断发布的关于平台发布的相关协议、功能声明、使用须知、业务规则及公告指引等内容。上述内容一经正式发布，即为本说明不可分割的组成部分，所有用户应同样予以遵守。
          </p>
          <h4>二、关于发布信息承诺</h4>
          <p>
            1.发布信息承诺功能是全国土地二级市场交易服务平台作为网络服务提供者，允许土地使用权人自愿将其土地供给信息和土地需求信息发布在全国土地二级市场交易服务平台上。
          </p>
          <p>
            2.用户在发布土地信息前，应注册并进行实名认证，经全国土地二级市场交易服务平台确认后方可进行信息发布并认可本说明。
          </p>
          <p>
            3.发布信息承诺后，除了土地信息外，用户发布的其他信息的修改均须经过全国土地二级市场交易服务平台确认后，由全国土地二级市场交易服务平台进行修改。
          </p>
          <h4>三、发布信息承诺功能使用规则</h4>
          <p>
            1.您特此保证，您发布的任何信息，不存在以下任何一种违反法律法规规定的情形：
          </p>
          <p>
            <b>1)反对宪法所确定的基本原则；</b>
            <b>2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一；</b>
            <b>3)损害国家荣誉和利益；</b>
            <b>4)煽动民族仇恨、民族歧视、破坏民族团结；</b>
            <b>5)破坏国家宗教政策，宣扬邪教和封建迷信；</b>
            <b>6)散布谣言，扰乱社会秩序，破坏社会稳定；</b>
            <b>7)宣扬淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪；</b>
            <b>8)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</b>
            <b>9)诽谤他人，泄露他人隐私，侵害他人合法权益；</b>
            <b
              >10)任何违反《中华人民共和国广告法》（包括但不限于使用极限用语等）及相关规定；</b
            >
            <b>11)含有法律、行政法规、政策禁止的其他内容的信息。</b>
            <b>12)您特此保证，您发布的任何信息，不存在以下任一不友善的行为：</b>
            <b>13)轻蔑：贬低、轻视他人及其项目或劳动成果；</b>
            <b>14)诽谤：捏造、散布虚假事实，损害他人名誉；</b>
            <b
              >15)嘲讽：以比喻、夸张、侮辱性的手法对他人或其行为进行揭露或描述；</b
            >
            <b
              >16)挑衅：以不友好的方式激怒他人，意图使对方对自己的言论作出回应，蓄意制造事端；</b
            >
            <b>17)羞辱：贬低他人的能力、行为、生理或身份特征，让对方难堪；</b>
            <b>18)谩骂：以不文明的语言对他人进行负面评价；</b>
            <b
              >19)歧视：针对他人的民族、种族、宗教、性取向、性别、年龄、地域、生理特征等身份或者归类的攻击；</b
            >
            <b>20)威胁：许诺以不良的后果来迫使他人服从自己的意志。</b>
          </p>
          <p>2.您特此保证，您发布的任何信息，不存在以下任一内容：</p>
          <p>
            <b>1)发布包含售卖产品、提供服务、宣传推广内容的垃圾广告；</b>
            <b>2)不规范转载他人内容同时加入推广营销内容；</b>
            <b
              >3)发布包含欺骗性的恶意营销内容，如通过伪造经理、冒充他人等方式进行恶意扰乱土地交易市场的行为；</b
            >
            <b>4)使用特殊符号、图片等方式规避垃圾广告内容审核的广告内容；</b>
            <b>5)重复发布干扰正常用户的体验的内容；</b>
            <b>6)发布链接，诱导投票或关注；</b>
            <b>7)制作及传播外挂或者用于操作账户功能的恶意程序或相关教程；</b>
            <b>8)发布含有潜在危险的内容，如钓鱼网站、木马、病毒网站等。</b>
          </p>
          <p>
            3.您特此保证，您发布的任何信息，不存在以下任一侵犯第三方权益的情形：
          </p>
          <p>
            <b
              >1)任何侵害他人土地使用权、名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</b
            >
            <b>2)任何涉及他人隐私、个人信息或资料的内容；</b>
            <b
              >3)任何混淆行为，擅自使用包括但不限于商品名称、包装、装潢等相同或者近似的标识、企业名称（包括简称、字号等）、社会组织名称（包括简称等）、姓名（保留笔名、艺名、译名等）、域名主体部分、网站名称、网页等引人误认为是他人商品或者与他人存在特定联系的内容。</b
            >
            <b>4)任何虚假的土地信息。</b>
          </p>
          <p>
            4.您特此保证，除上述所述禁止或限制行为外，您保证所发布的全部信息均为真实、有效的，没有任何虚假信息，且不违反任何与您发布的信息相关的、与任何第三方（包括但不限于与投资者）之间的约定或承诺，不违反您所在公司或机构的规章制度。您有权通过全国土地二级市场交易服务平台进行信息的发布。
          </p>
          <p>
            5.您理解并同意，全国土地二级市场交易服务平台仅为网络服务提供者，为您提供的是全国土地信息集聚、土地交易的平台，您必须为自己注册账户下的一切行为负责，包括您所发布的任何内容及由此产生的任何后果。
          </p>
          <p>
            6.您理解并同意，若您出现任何违反本说明的行为，全国土地二级市场交易服务平台有权自行删除您发布的全部信息，无需另行事先通知，并有权采取冻结账户，要求您赔偿损失等措施。
          </p>
          <h4>四、知识产权</h4>
          <p>
            1.全国土地二级市场交易服务平台在提供发布信息承诺服务过程提供的内容（包括但不限于软件界面、文字、图片、音频、视频、图表等）的知识产权归全国土地二级市场交易服务平台所有。未经全国土地二级市场交易服务平台书面许可，任何用户均不得以任何形式进行使用或创作相关衍生作品。
          </p>
          <p>
            2.您理解并同意，对您上传的任何信息，全国土地二级市场交易服务平台无法确认信息的真实性、可靠性、产权所有权等属性，您需要对上传该信息的结果承担可能的风险或损失。同时，全国土地二级市场交易服务平台有权依照独立判断对任何违反本说明约定或涉嫌违法、违规的内容实施删除。全国土地二级市场交易服务平台对于删除用户上传的信息引起的任何后果或导致用户的任何损失不负任何责任。
          </p>
          <p>
            3.您理解并同意，您通过发布信息承诺功能上传的信息资料，一经上传即视为授予非独家的、全球通用的、永久的、免费的许可使用权利（并有权在多个层面对该权利进行再授权）。此外，全国土地二级市场交易服务平台有权（全部或部分地）使用、复制、修订、改写、发布、翻译、分发、执行和展示您发布的信息资料。
          </p>
          <h4>五、其他</h4>
          <p>
            1.本说明的订立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。
          </p>
          <p>
            2.本说明所有条款的标题仅为方便阅读，本身并无实际涵义，不能作为本说明涵义解释的依据。
          </p>
          <p>
            3.全国土地二级市场交易服务平台有权随时根据法律、法规的变化以及公司经营策略的调整等修改本说明。修改后的规则将会通过适当的方式将进行公示。如您在本说明后修订后仍继续使用本说明的，则视为您接收本说明的修订。
          </p> -->
          <el-button @click="contniue" style="text-align: center;"
            >同意并继续</el-button
          >
        </div> 
        
      </div>
    </el-dialog>
  </div>
</template>
<script>
import baseURL1 from '../../../util/config'
import { mapActions, mapState } from "vuex";
// import configApi from '../../../config/index'
export default {
  name: 'app',
  props: {
    tableType: Boolean, //table类型，上传||回显 --true:回显 & false:上传
    tableNmae: Array, //表头文字
    belong: String, //请求参数 - 附件所属标识（必传）
    areaCode: String, //请求参数 - 区域标识（必传）
    fileSize: Number, //上传文件大小限制，单位 MB
    fileType: Array, //上传文件格式类型限制
    annexType: String //模板类型
  },
  data() {
    return {
      content:"",
      centerDialogVisible: false, //承诺数弹框
      agree: false, //是否选中按钮,
      agreeMsg: '', //只有在发布地源时显示是否同意信息发布承诺说明
      baseUrl: '', //地址前缀
      state: this.tableType, //表格类型 - 回显表格||上传表格
      tableData: [], //table数据
      belongId: this.belong, //附件所属标识
      areaCodeId: this.areaCode, //区域标识
      fileSz: this.fileSize, //自定义上传文件大小限制，单位 MB
      fileTy: this.fileType, //自定义上传文件格式类型限制
      annexTy: this.annexType, //模板类型
      transGoods: {
        fileTemplateId: '',
        pId: ''
      },
      //* 上传控制数据 */
      transForm: {
        entrustFirstUpload: true,
        pId: null
      },
      fileIndex: 0, //
      href: '', //预览地址
      disabled: false, //禁用变量
      TidParameters: '',
      src: '',
      dialogVisible: false,
      fliesUpload: false,
      title:"",
    }
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"]),
  },
  mounted() {
    this.getInformationList();
    //信息发布协议
    this.$axios.get(
      "/epf-cms/admin/info/getInfo?id=f65f489c-caf4-4ea8-99ba-8467b5e2bdb5",
      {},
      res => {
        this.content = res.info.content
        this.title = res.info.title
      }
    )
  },
  created() {
    if (this.$router.currentRoute.name == 'AttachmentInfoList') {
      this.agreeMsg = true
    }
    //请求附件组
    this.baseUrl = baseURL1.baseURL1 + '/epf-document/document/downloadById?id='
    this.$axios.get(
      `/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${this.belongId}&areaCode=${this.areaCodeId}`,
      {},
      res => {
        let resData = JSON.parse(res.ztreeJson)
        console.log('附件清单', resData)
        for (let i = 0; i < resData.length; i++) {
          if (resData[i].code.indexOf(this.annexTy) != -1) {
            //附件清单
            this.tableData = resData[i].childData
            this.validiteUpload(this.tableData)
          }
        }
        this.seeFlie()
      }
    )
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"]),
    //点击同意并继续
    contniue() {
      this.centerDialogVisible = false
      this.agree = true
      this.$emit('commit', this.agree)
    },
    //是否同意承诺信息按钮
    isAgree() {
      this.agree = !this.agree
      this.$emit('commit', this.agree)
    },
    seeFlie() {
      //查看按钮回调
      this.$emit('seeFlie', this.tableData)
    },
    deleteFile(index, tid, fid) {
      //删除按钮
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteFunction(index, tid, fid)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteFunction(index, tid, fid) {
      let url = `/epf-document/document/deleteByFolder?id=${fid}&fdId=${tid}`
      this.$axios.post(url, {}, res => {
        if (res.state == 'SUCCESS') {
          this.tableData[index].files = []
          this.tableData[index].tsize = 0
          this.validiteUpload(this.tableData)
        }
      })
      this.tableData[index].files = []
      this.tableData[index].tsize = 0
      this.validiteUpload(this.tableData)
    },
    uploadeFile(index, tid) {
      //上传按钮
      this.fileIndex = index
      this.TidParameters = tid
      if (state == 0) {
        this.TemplateCodes = this.fileTemplateId //土地code
        this.TidParameters = tid
      } else if (state == 1) {
        this.TemplateCodes = this.trustFileCode //委托code
        this.TidParameters = tid
      }
    },
    fileFormatChecking(file) {
      //附件上传格式验证
      this.disabled = true
      this.fliesUpload = true
      let fileType = file.name.split('.').slice(-1)[0]
      if( file.size == '0'){
        this.$message.error(`文件大小不允许${file.size}KB，请重新选择!`)
        this.fliesUpload = false
        this.disabled = false
        return false
      }
      let fileSize = file.size / 1024 / 1024 < this.fileSz
      const fileTyState = this.fileTy.indexOf(fileType.toLowerCase())
      if (fileTyState == -1) {
        this.$message.error(`上传附件不能是 ${fileType} 格式!`)
        this.fliesUpload = false
        this.disabled = false
        return false
      }
    },
    uploadeFile(index, tid) {
      //上传按钮
      this.fileIndex = index
      this.TidParameters = tid
      // if(state==0){
      //   this.TemplateCodes = this.fileTemplateId //土地code
      //   this.TidParameters = tid
      // }else if(state==1){
      //   this.TemplateCodes = this.trustFileCode //委托code
      //   this.TidParameters = tid
      // }
    },
    fileFormatChecking(file) {
      //附件上传格式验证
      this.disabled = true
      this.fliesUpload = true
      let fileType = file.name.split('.').slice(-1)[0]
      if( file.size == 0){
        this.$message.error(`文件大小不允许${file.size}KB，请重新选择!`)
        this.fliesUpload = false
        this.disabled = false
        return false
      }
      let fileSize = file.size / 1024 / 1024 < this.fileSz
      console.log(fileSize)
      console.log(file.size)
      const fileTyState = this.fileTy.indexOf(fileType)
      if (fileTyState == -1) {
        this.$message.error(`上传附件不能是 ${fileType} 格式!`)
        this.fliesUpload = false
        this.disabled = false
        return false
      }
      if (!fileSize) {
        this.$message.error(`上传附件大小不能超过 ${this.fileSz} MB!`)
        this.fliesUpload = false
        this.disabled = false
        return false
      }
    },
    annexUpload(files) {
      //附件上传
      const file = files.file
      const formData = new FormData()
      formData.append('files', file)
      formData.append('belong', this.belongId)

      if (this.transForm.pId) {
        formData.append('pId', this.TidParameters) //tid赋值
        this.uploadFunction(formData, files, file)
        return
      }
      if (!this.transForm.pId && this.transForm.entrustFirstUpload) {
        formData.append('pId', this.TidParameters) //tid赋值
        this.transForm.entrustFirstUpload = false
        this.uploadFunction(formData, files, file, 'first')
        return
      }
      if (this.transForm.pId && !this.transForm.entrustFirstUpload) {
        this.uploadFunction(formData, files, file)
        return
      }
    },
    uploadFunction(formData, files, file, count) {
      //上传方法
      this.$axios.post('/epf-document/document/upload', formData, res => {
        if (res.state != 'SUCCESS') {
          if (count == 'first') {
            this.transForm.entrustFirstUpload = true
            return null
          }
          return null
        }
        if (!this.transForm.pId) {
          this.transForm.pId = res.data[0].pId
          this.transGoods.fileTemplateId = this.fileTemplateId
          this.transGoods.pId = res.data[0].pId
        }
        files.onSuccess(res)
      })
    },
    uploadSuccess(res, file, fileList) {
      //上传成功回调
      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }
      if (this.tableData[this.fileIndex].files.length == 0) {
        this.fliesUpload = false
        this.tableData[this.fileIndex].files.push(fileObject)
      } else {
        this.fliesUpload = false
        this.tableData[this.fileIndex].files[0] = fileObject
      }
      this.validiteUpload(this.tableData)
      this.seeFlie() //传递表单数据至父组件
      this.disabled = false
    },
    // 校验是否必传
    validiteUpload(datas) {
      let isAux = true
      for (let i = 0; i < datas.length; i++) {
        let fileGroup = datas[i]
        if (fileGroup.isAux == 1) {
          // 必传标识
          if (fileGroup.files.length == 0) {
            isAux = false
            break
          }
        }
      }
      this.$emit('isAux', isAux)
    },
    upLoadError() {
      //上传失败回调
      this.$message.error('文件上传失败啦')
      this.disabled = false
    },
    preview(data) {
      var fileType = data.fname.toString().split(".")[1]
      var api = "http://epf666.com";  //这个api现在已经无意义了，只要保持http：// 这样的一个格式就可以了
      const url = `/api/epf-document/onlinePreview?url=${api},${data.fid}.${fileType}`
      // window.open(url)
      this.src = url
      this.backTop()
      this.dialogVisible = true
    },
    handleClose() {
      //关闭弹窗回调
      this.src = ''
      this.dialogVisible = false
    },
    backTop() {
      let that = this
      // let timer = setInterval(() => {
      // let ispeed = Math.floor(-that.scrollTop / 5)
      document.documentElement.scrollTop = 0 //document.body.scrollTop = that.scrollTop + ispeed
      // if (that.scrollTop === 0) {
      //   clearInterval(timer)
      // }
      // }, 16)
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
/deep/.dialog {
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    padding: 0;
  }
  .borderAll {
    border: 4px solid #cdd3dc;
    border-radius: 5px;
  }
}
.agree_msg {
  position: relative;
  line-height: 30px;
}
input[type='radio'] {
  opacity: 0;
}
input[type='radio'] + label::before {
  content: '\a0'; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid var(--Colors);
  padding: 4px;
  margin-left: -10px;
}
input[type='radio']:checked + label::before {
  background-color: var(--Colors);
  background-clip: content-box;
  padding: 4px;
}
table {
  border: 1px solid #f3f3f3;
}
.publish_main_cont p {
  line-height: 50px;
  margin: 0;
  color: #999999;
  font-size: 14px;
}
.publish_main_cont p span {
  margin: 0 6px 0 0;
  color: #999999;
  font-size: 14px;
  line-height: 50px;
}
table tr {
  width: 100%;
  height: 50px;
}
.upLoadHidden {
  border-bottom: 1px solid #f3f3f3;
}
table tr:nth-child(1) {
  background: #f2f5f7;
}
table tr:nth-child(1) td {
  font-weight: bold;
}
td {
  text-align: center;
  color: #333333;
  font-size: 14px;
}
table tr td:nth-child(3) span {
  color: var(--lightColor);
}
table tr td:nth-child(4) span,
a {
  text-decoration: none;
  color: var(--lightColor);
  cursor: pointer;
  display: inline-block;
}
table tr td:nth-child(4) span:active {
  transform: translateY(1px);
  color: #55aff8;
}
span {
  cursor: pointer;
}
.text_red {
  color: red;
  margin-right: 5px;
  cursor: auto;
}
.el-dialog {
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
  border: 4px solid #cdd3dc;
  margin-top: 100px;
}
.el-dialog__body,
.el-dialog__header {
  padding: 0 !important;
}
.borderAll {
  border: 4px solid #cdd3dc;
  border-radius: 4px;
}
.title_box {
  border: 1px solid #f3f3f3;
}
.title_box h4 {
  padding-top: 10px;
  margin: 0px 0 0px 20px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.el-dialog__title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
.dialog-footer {
  padding: 0 25px;
  font-size: 12px;
  text-indent: 2em;
  line-height: 24px;
  height: 550px;
  overflow-y: scroll;
}
.dialog-footer::-webkit-scrollbar {
  height: 5px !important;
  width: 10px !important;
}
.dialog-footer::-webkit-scrollbar-thumb {
  border-radius: 5px;
  border-style: dashed;
  background-color: rgba(157, 165, 183, 0.4);
  border-color: #e2242400;
  border-width: 1.5px;
  background-clip: padding-box;
}
.dialog-footer::-webkit-scrollbar-thumb:hover {
  background: rgba(157, 165, 183, 0.7);
}
.dialog-footer .el-button {
  width: 404px;
  background: var(--Colors);
  color: #fff;
  font-weight: bold;
  outline: none;
  border: none;
  margin: 50px auto 100px;
  display: block;
}
.dialog-footer h3 {
  line-height: 50px;
}
.dialog-footer p,
.dialog-footer h4 {
  font-size: 12px;
  text-align: left;
}
#dialog-footer h4 {
  color: #333;
}
.dialog-footer p {
  color: #666666;
}
b {
  display: block;
  color: #666666;
  font-weight: normal;
}
</style>
<style>
.filesUpload .el-upload-list {
  display: none !important;
}
.filesUpload .el-upload-list--text {
  display: none !important;
}
.filesUpload .el-upload-list__item-name {
  display: none !important;
}
.frameBox {
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3000;
}
.trameTitle {
  padding: 10px 125px;
  text-align: right;
}
.trameTitle h2 {
  display: inherit;
  font-size: 20px;
  font-weight: 600px;
  line-height: 40px;
  margin-right: -40px;
}
</style>
