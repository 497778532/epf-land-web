<template>
  <!-- 实名认证协议模块 -->
  <!-- 
    @name: 实名认证协议 
    @author: gaojie
  -->
    <span slot="footer" class="dialog-footer">
      <div class="publishLand_warp_pop">
        <div class="padd">
          <!-- <el-form :model="tableData" align="left">
            <el-form-item>
              <h2>{{InformationList.information.name}}实名认证协议</h2>
              <p>{{tableData.rentTwo}}</p>
              <p>{{tableData.rentThree}}</p>
              <p>{{tableData.rentFour}}</p>
              <p>{{tableData.rentFive}}</p>
              <p>{{tableData.rentSix}}</p>
              <p>{{tableData.rentSeven}}</p>
              <p>{{tableData.rentEight}}</p>
              <p>{{tableData.rentNine}}</p>
              <p>{{tableData.rentTen}}</p>
              <p>{{tableData.rentEleven}}</p>
              <p>{{tableData.renTwelve}}</p>
              <p>{{tableData.renThirteen}}</p>
              <p>{{tableData.renFourteen}}</p>
              <p>{{tableData.renFifteen}}</p>
              <p>{{tableData.renSixteen}}</p>
              <p>{{tableData.renSeventeen}}</p>
              <p>{{tableData.renEighteen}}</p>
              <p>{{tableData.renNineteen}}</p>
              <p>{{tableData.renTwenty}}</p>
              <p>{{tableData.renTwentyone}}</p>
              <p>{{tableData.renTwentytwo}}</p>
              <p>{{tableData.renTwentythree}}</p>
              <p>{{tableData.renTwentyfour}}</p>
              <p>{{tableData.renTwentyfive}}</p>
              <p>{{tableData.renTwentysix}}</p>
              <p>{{tableData.renTwentyseven}}</p>
              <p>{{tableData.renTwentyeight}}</p>
              <p>{{tableData.renTwentynine}}</p>
              <p>{{tableData.renThirty}}</p>
              <p>{{tableData.renThirtyone}}</p>
              <p>{{tableData.renThirtytwo}}</p>
              <p>{{tableData.renThirtythree}}</p>
              <h3>{{tableData.renThirtyfour}}</h3>
              <p>{{tableData.renThirtyfive}}</p>
              <p>{{tableData.renThirtysix}}</p>
              <p>{{tableData.renThirtyseven}}</p>
              <p>{{tableData.renThirtyeight}}</p>
              <p>{{tableData.renThirtynine}}</p>
              <p>{{tableData.renForty}}</p>
              <p>{{tableData.renFortyone}}</p>
              <p>{{tableData.renFortytwo}}</p>
              <p>{{tableData.renFortythree}}</p>
              <p>{{tableData.renFortyfour}}</p>
              <p>{{tableData.renFortyfive}}</p>
              <p>{{tableData.renFortysix}}</p>
              <p>{{tableData.renFortyseven}}</p>
              <p>{{tableData.renFortyeight}}</p>
              <p>{{tableData.renFifty}}</p>
              <p>{{tableData.renFiftyone}}</p>
              <p>{{tableData.renFiftytwo}}</p>
              <p>{{tableData.renFiftythree}}</p>
              <p>{{tableData.renFiftyfour}}</p>
              <p>{{tableData.renFiftyfive}}</p>
              <p>{{tableData.renFiftysix}}</p>
              <p>{{tableData.renFiftyseven}}</p>
              <p>{{tableData.renFiftyeight}}</p>
              <p>{{tableData.renFiftynine}}</p>
              <p>{{tableData.renSixty}}</p>
              <p>{{tableData.renSixtyone}}</p>
              <p>{{tableData.renSixtytwo}}</p>
              <p>{{tableData.renSixtythree}}</p>
              <p>{{tableData.renSixtyfour}}</p>
              <p>{{tableData.renSixtyfive}}</p>
              <p>{{tableData.renSixtysix}}</p>
              <p>{{tableData.renSixtyseven}}</p>
              <p>{{tableData.renSixtyeight}}</p>
              <p>{{tableData.renSixtynine}}</p>
              <p>{{tableData.renSeventy}}</p>
              <p>{{tableData.renSeventyone}}</p>
              <p>{{tableData.renSeventytwo}}</p>
              <p>{{tableData.renSeventythree}}</p>
              <p>{{tableData.renSeventyfour}}</p>
              <p>{{tableData.renSeventyfive}}</p>
              <p>{{tableData.renSeventysix}}</p>
              <p>{{tableData.renSeventyseven}}</p>
              <p>{{tableData.renSeventyeight}}</p>
              <p>{{tableData.renSeventynine}}</p>
              <p>{{tableData.renEighty}}</p>
              <p>{{tableData.renEightyone}}</p>
              <p>{{tableData.renEightytwo}}</p>
              <p>{{tableData.renEightythree}}</p>
              <p>{{tableData.renEightyfour}}</p>
              <p>{{tableData.renEightyfive}}</p>
              <p>{{tableData.renEightysix}}</p>
              <p>{{tableData.renEightyseven}}</p>
              <h2>{{tableData.renEightyeight}}</h2>
              <p>{{tableData.renEightynine}}</p>
              <p>{{tableData.renNinety}}</p>
              <p>{{tableData.renNinetyone}}</p>
              <p>{{tableData.renNinetytwo}}</p>
              <p>{{tableData.renNinetythree}}</p>
              <p>{{tableData.renNinetyfour}}</p>
              <p>{{tableData.renNinetyfive}}</p>
              <p>{{tableData.renNinetysix}}</p>
              <p>{{tableData.renNinetyseven}}</p>
              <p>{{tableData.renNinetyeight}}</p>
              <p>{{tableData.renNinetynine}}</p>
              <p>{{tableData.renOnehundred}}</p>
              <p>{{tableData.renOnehundredone}}</p>
              <p>{{tableData.renOnehundredtwo}}</p>
              <p>{{tableData.renOnehundredthree}}</p>
              <p>{{tableData.renOnehundredfour}}</p>
              <p>{{tableData.renOnehundredfive}}</p>
              <p>{{tableData.renOnehundredsix}}</p>
              <p>{{tableData.renOnehundredseven}}</p>
              <p>{{tableData.renOnehundredeight}}</p>
              <p>{{tableData.renOnehundrednine}}</p>
              <p>{{tableData.renOnehundredandten}}</p>
              <p>{{tableData.renOnehundredandeleven}}</p>
              <p>{{tableData.renOnehundredandtwelve}}</p>
              <p>{{tableData.renOnehundredandthirteen}}</p>
              <h2>{{tableData.renOnehundredandfourteen}}</h2>
              <p>{{tableData.renOnehundredandfifteen}}</p>
              <p>{{tableData.renOnehundredandsixteen}}</p>
              <p>{{tableData.renOnehundredandseventeen}}</p>
              <p>{{tableData.renOnehundredandeighteen}}</p>
              <p>{{tableData.renOnehundredandnineteen}}</p>
              <p>{{tableData.renOnehundredandtwenty}}</p>
              <p>{{tableData.renOnehundredandtwentyone}}</p>
              <p>{{tableData.renOnehundredandtwentytwo}}</p>
              <p>{{tableData.renOnehundredandtwentythree}}</p>
              <p>{{tableData.renOnehundredandtwentyfour}}</p>
              <p>{{tableData.renOnehundredandtwentyfive}}</p>
              <p>{{tableData.renOnehundredandtwentysix}}</p>
              <p>{{tableData.renOnehundredandtwentyseven}}</p>
              <p>{{tableData.renOnehundredandtwentyeight}}</p>
              <p>{{tableData.renOnehundredandtwentynine}}</p>
              <p>{{tableData.renOnehundredandthirty}}</p>
              <p>{{tableData.renOnehundredandthirtyone}}</p>
              <p>{{tableData.renOnehundredandthirtytwo}}</p>
              <h2>{{tableData.renOnehundredandthirtythree}}</h2>
              <p>{{tableData.renOnehundredandthirtyfour}}</p>
              <p>{{tableData.renOnehundredandthirtyfive}}</p>
              <p>{{tableData.renOnehundredandthirtysix}}</p>
              <p>{{tableData.renOnehundredandthirtyseven}}</p>
              <p>{{tableData.renOnehundredandthirtyeight}}</p>
              <p>{{tableData.renOnehundredandthirtynine}}</p>
              <p>{{tableData.renOnehundredandforty}}</p>
              <p>{{tableData.renOnehundredandfortyone}}</p>
              <p>{{tableData.renOnehundredandfortytwo}}</p>
              <h3>{{tableData.renOnehundredandfortythree}}</h3>
              <p>{{tableData.renOnehundredandfortyfour}}</p>
              <p>{{tableData.renOnehundredandfortyfive}}</p>
            </el-form-item>
          </el-form> -->
          <div v-html="content">{{content}}</div>
        </div>
      </div>
      <div style="margin:0 auto;width: 404px;">
        <div class="epf_btn epf_btn_bg" style="width: 404px;margin:0 auto;" @click="agree()">同意并继续</div>
      </div>
    </span>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      content:"",
      // tableData: {
      //   rentOne: "全国土地二级市场交易服务平台实名认证协议",
      //   rentTwo: "在申请实名认证服务（以下简称“认证”）前，请详细阅读本协议的所有内容。若您开始认证流程，即表示您充分理解并同意接受本协议的全部内容",
      //   rentThree:'为了提高全国土地二级市场交易服务平台的安全性和用户身份的可信性，向您提供认证服务。在您申请认证前，您必须先注册成为系统用户。本系统提供在线实名认证对用户身份进行识别，并有权记录并保存您完成以上程序提供的信息。因此，本系统对完成认证的用户身份的准确性和绝对真实性进行保证。',
      //   rentFour:"一、服务内容",
      //   rentFive:"本系统向您提供个人实名认证和企业实名认证服务。个人采用身份证实名认证进行认证，企业采用营业执照及法人身份信息进行认证。经信本系统核实有效后，给与个人用户个人实名认证标识和企业用户企业实名认证标识的服务。",
      //   rentSix:"二、适用范围",
      //   rentSeven:"实名认证服务适用于本系统的所有用户。",
      //   rentEight: "三、认证流程",
      //   rentNine:"1.身份证实名认证：",
      //   rentTen:"用户在实名认证申请页面填写真实姓名、证件号码，上传身份证照片。身份证照片要求为彩色、完整的原件(正面和反面)扫描或照片，能够清晰辨识证件图案和文字内容；本系统在收到认证申请后，7个工作日返回通过或未通过认证的结果。用户验证通过，系统自动获取用户的个人实名信息，并把用户标识为实名认证用户。不通过可以重新发起实名认证操作。",
      //   rentEleven:"2.通过实名认证的信用信息核查平台用户不能自行修改已经认证的信息，包括但不限于个人姓名以及身份证件号码等。",
      //   renTwelve:"四、隐私保护",
      //   renThirteen:"1.您在认证时提交给本系统的认证资料，即不可撤销的授权由本系统保留。本系统承诺除法定或约定的事由外，不公开或编辑或透露您的认证资料及保存在本系统的非公开内容用于商业目的，但下列情况除外：",
      //   renFourteen:"1) 您授权本系统透露的相关信息；",
      //   renFifteen:"2) 本系统向国家司法及行政机关提供；",
      //   renSixteen:"3) 第三方和本系统一起为用户提供服务时，该第三方向您提供服务所需的相关信息。",
      //   renSeventeen:"2.我们将采取合理的方式以保护您个人资料的安全。我们将使用必要的可以获得的安全技术和程序来保护您的个人资料不被未经授权的访问、使用或泄漏。",
      //   renEighteen:"五、免责条款",
      //   renNineteen:"下列情况时本系统无需承担任何责任：",
      //   renTwenty: "1.由于您将信用信息核查平台账户密码告知他人或未保管好自己的密码或与他人共享本系统账户或任何其他非本系统的过错，导致您的个人资料泄露。",
      //   renTwentyone:"2.由于不可抗力，例如出现故障、火灾、水灾、雷击、地震、洪水、台风、龙卷风、火山爆发、瘟疫和传染病流行、罢工、战争或暴力行为或类似事件等及其他非因本系统过错而造成的认证信息泄露、丢失、被盗用或被篡改等。",
      //   renTwentytwo:"3.任何信用信息核查平台用户（包括未成年人用户）向本系统提供错误、不完整、不实信息等造成不能通过认证或遭受任何其他损失。",
      //   renTwentythree:"六、修改和解释权",
      //   renTwentyfour: "1.本系统有权单方随时修改或变更本协议内容，并通过本系统公告变更后的协议文本，无需单独通知您。本协议进行任何修改或变更后，您还继续使用实名认证服务的，即代表您已阅读、了解并同意接受变更后的协议内容，且不得因此而要求任何补偿或赔偿；您如果不同意变更后的协议内容，可停止使用我们所提供的服务。",
      //   renTwentyfive: "2.我们保留对本协议条款、产品和服务以及我们所提供的产品和服务的最终解释权。",
      // },
    };
  },
  methods:{
    // ...mapActions("webListMsg", ["getInformationList"]),
    agree(){
      this.$emit('Ifagree',false,true)
    }
  },
  computed: {
    // ...mapState("webListMsg", ["InformationList"]),
  },
  mounted() {
    // this.getInformationList();
    //实名认证协议
    this.$axios.get(
      "/epf-cms/admin/info/getInfo?id=f22f78af-b7e9-4186-9144-986b085b7a65",
      {},
      res => {
        console.log(res.info);
        this.content = res.info.content
      }
    )
  },
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.zh_30 {
  width: 100%;
  height: 30px;
}
p {
  text-indent: 2em;
}
h2,
h3 {
  text-align: center;
  font-weight: 700;
  line-height: 50px;
}
h2 {
  font-size: 20px;
}
h3 {
  font-size: 18px;
}
.publishLand_warp_pop {
  @include size(auto, 100%);
  background: #fff;
  padding: 20px;
  margin: auto;
  .padd {
    width: 98%;
    margin: auto;
    word-break: normal;
  }
}
</style>