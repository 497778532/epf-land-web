<template>
  <div>
    <div class="zh_30"></div>
    <div class="publishLand_warp_pop">
      <div class="padd">
        <!-- <el-form :model="tableData" align="left">
          <el-form-item>
            <h2>{{InformationList.information.name}}用户服务协议</h2>
            <h2>(试用版)</h2>
            <h3>{{tableData.rentTwo}}</h3>
            <p>{{tableData.rentThree}}</p>
            <p>{{tableData.rentFour}}</p>
            <p>{{tableData.rentFive}}</p>
            <p>{{tableData.rentSix}}</p>
            <p>{{tableData.rentSeven}}</p>
            <h3>{{tableData.rentEight}}</h3>
            <p>{{tableData.rentNine}}</p>
            <p>{{tableData.rentTen}}</p>
            <p>{{tableData.rentEleven}}</p>
            <p>{{tableData.renTwelve}}</p>
            <p>{{tableData.renThirteen}}</p>
            <p>{{tableData.renFourteen}}</p>
            <p>{{tableData.renFifteen}}</p>
            <p>{{tableData.renSixteen}}</p>
            <h3>{{tableData.renThirtyfour}}</h3>
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
            <h3>{{tableData.renTwentyseven}}</h3>
            <p>{{tableData.renTwentyeight}}</p>
            <h3>{{tableData.renTwentynine}}</h3>
            <p>{{tableData.renThirty}}</p>
            <h3>{{tableData.renThirtyone}}</h3>
            <p>{{tableData.renThirtytwo}}</p>
            <h3>{{tableData.renThirtythree}}</h3>
            
            <p>{{tableData.renThirtyfive}}</p>
            <h3>{{tableData.renThirtysix}}</h3>
            <p>{{tableData.renThirtyseven}}</p>
            <p>{{tableData.renThirtyeight}}</p>
            <p>{{tableData.renThirtynine}}</p>
            <h3>{{tableData.renForty}}</h3>
            <p>{{tableData.renFortyone}}</p>
            <p>{{tableData.renFortytwo}}</p>
            <p>{{tableData.renFortythree}}</p>
            <p>{{tableData.renFortyfour}}</p>
            <p>{{tableData.renFortyfive}}</p>
            <p>{{tableData.renFortysix}}</p>
            <p>{{tableData.renFortyseven}}</p>
            <p>{{tableData.renFortyeight}}</p>
            <p>{{tableData.renFortynine}}</p>
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
            <h3>{{tableData.renSixtysix}}</h3>
            <p>{{tableData.renSixtyseven}}</p>
            <p>{{tableData.renSixtyeight}}</p>
            <h3>{{tableData.renSixtynine}}</h3>
            <p>{{tableData.renSeventy}}</p>
            <p>{{tableData.renSeventyone}}</p>
            <h3>{{tableData.renSeventytwo}}</h3>
            <p>{{tableData.renSeventythree}}</p>
            <h3>{{tableData.renSeventyfour}}</h3>
            <p>{{tableData.renSeventyfive}}</p>
            <p>{{tableData.renSeventysix}}</p>
            <p>{{tableData.renSeventyseven}}</p>
            <h3>{{tableData.renSeventyeight}}</h3>
            <p>{{tableData.renSeventynine}}</p>
            <p>{{tableData.renEighty}}</p>
            <p>{{tableData.renEightyone}}</p>
            <p>{{tableData.renEightytwo}}</p>
            <p>{{tableData.renEightythree}}</p>
            <p>{{tableData.renEightyfour}}</p>
            <p>{{tableData.renEightyfive}}</p>
            <p>{{tableData.renEightysix}}</p>
            <p>{{tableData.renEightyseven}}</p>
            <p>{{tableData.renEightyeight}}</p>
            <p>{{tableData.renEightynine}}</p>
            <p>{{tableData.renNinety}}</p>
            <p>{{tableData.renNinetyone}}</p>
            <p>{{tableData.renNinetytwo}}</p>
            <p>{{tableData.renNinetythree}}</p>
            <p>{{tableData.renNinetyfour}}</p>
            <p>{{tableData.renNinetyfive}}</p>
            <p>{{tableData.renNinetysix}}</p>
            <h3>{{tableData.renNinetyseven}}</h3>
            <p>{{tableData.renNinetyeight}}</p>
            <p>{{tableData.renNinetynine}}</p>
            <p>{{tableData.renOnehundred}}</p>
            <p>{{tableData.renOnehundredone}}</p>
            <p>{{tableData.renOnehundredtwo}}</p>
            <p>{{tableData.renOnehundredthree}}</p>
            <h3>{{tableData.renOnehundredfour}}</h3>
            <p>{{tableData.renOnehundredfive}}</p>
            <p>{{tableData.renOnehundredsix}}</p>
            <p>{{tableData.renOnehundredseven}}</p>
          </el-form-item>
        </el-form> -->
        <div v-html="content">{{content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "RegulatoryDocumenttwo",
  data() {
    return {
      content:"",
      // tableData: {
      //   rentOne: "土地二级市场信息系统服务协议",
      //   rentTwo: "一、协议生效条件",
      //   rentThree:
      //     " 全国土地二级市场交易服务平台由中华人民共和国自然资源部组织建设（以下简称:“本平台”），旨在通过本平台为全国土地二级市场土地流转提供一个专业、高效的供需、交易、合同网签服务平台，本协议在用户和本平台之间具有合同的法律效力。",
      //   rentFour:
      //     "以任何方式进入平台并使用服务即表示您已充分阅读、理解并同意接受本协议的条款和条件(以下合称“条款”)。您同意并点击确认本协议条款并完成注册程序后，才能成为本平台的正式注册用户并享受系统提供的各项服务。",
      //   rentFive:
      //     "本协议内容包括协议正文及所有本平台已经发布或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力。",
      //   rentSix:
      //     "本平台有权根据业务需要酌情修订“条款”，并以系统公告的形式进行更新，不再单独通知予您。经修订的“条款”一经在本平台公布，即产生效力。如您不同意相关修订，请您立即停止使用“服务”。如您继续使用“服务”，则将视为您已接受经修订的“条款”，当您与本平台发生争议时，应以最新的“条款”为准。",
      //   rentEight: "二、用户注册",
      //   rentNine:
      //     "1.为了保障您的权益，请在自愿注册前务必仔细阅读本服务协议的所有条款。如您同意并接受注册条款、完成注册程序的，视为您对本协议中相关条款和规则的认可和理解。请确保您本人具备前述行为应具备的民事行为能力，否则您的监护人应按照相关法律规定承担由此造成的一切后果。",
      //   rentTen:
      //     "2.您必须具备完全民事行为能力人，本平台有权要求您提供身份合法性必要证明，由于法律及条件限制原因，本平台不具备完全审查您合法身份的条件和权限，你注册使用本平台视为您已具备完全民事行为能力，您对您所做一切行为负责。",
      //   renEleven:
      //     "土地二级市场交易平台应汇集涉地司法处置和国有资产处置的相关信息。",
      //   renTwelve: "3.为了能使用本服务，您须同意以下事项：",
      //   renThirteen:
      //     "1)依本平台提示提供您本人真实、正确、最新及完整的资料；",
      //   renFourteen:
      //     "2)维持更新您个人用户信息，确保其真实、正确、最新及完整。若您提供任何错误、不实、过时或不完整的资料，并为平台所确知，或者平台有合理的理由怀疑前述资料为错误、不实、过时或不完整，平台有权暂停或终止您的帐号，并拒绝您于现在和未来使用本平台全部或部分的服务。",
      //   renFifteen: "3)您提供的注册信息不得冒用他人信息或侵犯他人合法权益。平台有权暂停或终止帐号，并有权追究相关责任人的法律责任。",
      //   renSixteen:
      //     "4)您注册的用户名不能侵犯他人合法权益，不能对他人名誉权造成侵犯。本平台有权收回对本平台或者他人合法权益有侵犯嫌疑的帐号。",
      //   renThirtyfour: "三、隐私制度",
      //   renSeventeen:
      //     "1.尊重和保护用户个人隐私是本平台的一项基本政策，本平台保证不对外公开或者向任何第三方提供单个用户的注册资料以及用户在使用网络服务时存储在本平台的非公开内容和信息，但下列情况除外：",
      //   renEighteen:
      //     "1)本平台事先获得用户明确授权；",
      //   renNineteen: "2)遵守有关法律法规的规定，向国家有关机关提供；",
      //   renTwenty: "3)保持维护本平台的知识产权和其他重要权利；",
      //   renTwentyone:
      //     "4)为维护社会公众利益、维护第三方合法权益；",
      //   renTwentytwo:
      //     "5)在紧急情况下维护用户个人和社会大众的隐私安全；",
      //   renTwentythree:
      //     "6)根据本条款相关规定或者土地平台认为必要的其他情况下。",
      //   renTwentyfour: "2.本平台可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本平台同等的保护用户隐私的责任，则本平台有权将用户的注册资料在平台的监管下提供给第三方。 在不透露单个用户隐私资料的前提下，平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。",
      //   renTwentyfive: "3.用户知悉并同意，为便于向用户提供更好的服务，平台将在用户自愿选择服务或者提供信息的情况下收集用户的个人信息，并将这些信息进行整合。",
      //   renTwentysix: "4.另外，平台会采取行业惯用措施保护用户信息的安全，但本平台不能确信或保证任何个人信息的安全性，用户须自己承担风险。比如用户联机公布可被公众访问的个人信息时，用户有可能会收到未经用户同意的信息；本平台的合作伙伴和可通过本平台访问的第三方服务；本平台对用户及其他任何第三方的上述行为，不承担任何责任。",
      //   renTwentyseven: "四、用户信息的存储与限制",
      //   renTwentyeight: "本平台不对用户所发布信息的删除或储存失败负责。本平台并不承诺对用户的存储信息进行无限期保留。除非本协议中另有规定，否则本平台不保证服务一定会满足用户的使用要求，也不保证服务不会受中断，对服务的及时性、安全性、准确性也不作担保。本平台有判定用户的行为是否符合系统服务条款的要求和精神的保留权利，如果用户违背了服务条款的规定，本平台有中断对其提供网络服务的权利。本平台运用自己的操作系统通过互联网向用户提供丰富的网上资源，包括各种信息工具、个性化内容等。除非另有明确规定，增强或强化目前服务的任何新功能，包括新产品、栏目，均无条件地适用本服务条款。",
      //   renTwentynine: "五、服务条款的修改",
      //   renThirty: "本平台有权在必要时修改服务条款。平台服务条款一旦发生变动，将会在重要页面上提示所修改的内容。如果不同意所改动的内容，用户可以主动取消获得的网络服务。如果用户继续享用网络服务，则视为接受服务条款的变动。本平台保留随时修改或中断服务而不需照知用户的权利。本平台行使修改或中断服务的权利，不需对用户或第三方负责。",
      //   renThirtyone:"六、拒绝提供担保",
      //   renThirtytwo: "用户对网络服务的使用承担风险。本平台对此不作任何类型的担保，不论是明确的或隐含的，但是不对商业性的隐含担保、特定目的和不违反规定的适当担保作限制。",
      //   renThirtythree:"七、有限责任",
      //   renThirtyfive:
      //     "本平台对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害可能来自：不正当使用网络服务，在在网上进行交易，非法使用网络服务或用户传送的信息有所变动。",
      //   renThirtysix:"八、服务的结束",
      //   renThirtyseven:
      //     "本平台可随时根据实际情况中断一项或多项网络服务。本平台不需对任何个人或第三方负责而随时中断服务。用户对后来的条款修改有异议，或对平台的服务不满，可以行使如下权利：",
      //   renThirtyeight: "1)停止使用本平台的网络服务；",
      //   renThirtynine:
      //     "2)通告本平台停止对该用户的服务。结束用户服务后，用户使用网络服务的权利马上中止。从那时起，用户没有权利，本平台也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。 ",
      //   renForty: "九、用户管理",
      //   renFortyone: "1.用户单独承担发布内容的责任。用户对服务的使用是根据所有适用于本平台的国家法律、地方法律和国际法律标准的。",
      //   renFortytwo:
      //     "2.用户必须遵循：",
      //   renFortythree:
      //     "1)使用网络服务不作非法用途；",
      //   renFortyfour:
      //     "2)不干扰或混乱网络服务；",
      //   renFortyfive:
      //     "3)遵守所有使用网络服务的网络协议、规定、程序和惯例。",
      //   renFortysix:
      //     "4)用户的密码和帐号遭到未授权的使用或发生其他任何安全问题，用户可以立即通知本平台，并且用户在每次连线结束，应结束帐号使用，否则用户可能得不到本平台的安全保护。",
      //   renFortyseven:
      //     "3.禁止用户从事以下行为：",
      //   renFortyeight:
      //     "1)上载、张贴、发送或传送任何非法、反动、淫秽、粗俗、猥亵的，胁迫、骚扰、中伤他人、诽谤、侵害他人隐私或诋毁他人名誉或商誉的，种族歧视、危害未成年人或其他不适当的信息或电子邮件，包括但不限于资讯、资料、文字、软件、音乐、照片、图形、信息或其他资料（以下简称内容）。",
      //   renFortynine: "2)未经本平台许可的广告行为。",
      //   renFifty: "3)冒充任何人或机构，或以虚伪不实的方式谎称或使人误认为与任何人或任何机构有关。",
      //   renFiftyone:"4)伪造标题或以其他方式操控识别资料，使人误认为该内容为本平台所传送。",
      //   renFiftytwo: "5)上载、张贴、发送电子邮件或以其它方式传送无权传送的内容（例如内部资料、机密资料）。",
      //   renFiftythree: "6)上载、张贴、发送电子邮件或以其它方式传送侵犯任何人的专利、商标、著作权、商业秘密或其他专属权利之内容。",
      //   renFiftyfour:"7)上载、张贴、发送电子邮件或以其他方式传送有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序之资料。",
      //   renFiftyfive:"8)干扰或破坏本服务或与本服务相连的服务器和网络，或不遵守本服务协议之规定。",
      //   renFiftysix:
      //     "9)故意或非故意违反任何相关的中国法律、法规、规章、条例等其他具有法律效力的规范。",
      //   renFiftyseven:
      //     "10)跟踪或以其他方式骚扰他人。",
      //   renFiftyeight: "11)其它被平台视为不适当的行为。",
      //   renFiftynine:
      //     "4.用户对经由本服务上载、张贴、发送电子邮件或传送的内容负全部责任；对于经由本服务而传送的内容，本平台不保证前述内容的正确性、完整性或品质。用户在接受本服务时，有可能会接触到令人不快、不适当或令人厌恶的内容。在任何情况下，本平台均不对任何内容负责，包括但不限于任何内容发生任何错误或纰漏以及衍生的任何损失或损害。平台有权（但无义务）自行拒绝或删除经由本服务提供的任何内容。用户使用上述内容，应自行承担风险。",
      //   renSixty:
      //     "5. 本平台有权利在下述情况下，对内容进行保存或披露：",
      //   renSixtyone: "1)法律程序所规定；",
      //   renSixtytwo:
      //     "2)本服务条款规定；",
      //   renSixtythree:
      //     "3)被侵害的第三人提出权利主张；",
      //   renSixtyfour:
      //     "4)为保护平台、使用者及社会公众的权利、财产或人身安全；",
      //   renSixtyfive: "5)其他本平台认为有必要的情况。",
      //   renSixtysix: "十、侵权责任",
      //   renSixtyseven:
      //     "1.网络用户利用网络侵害他人民事权益的，应当承担侵权责任。",
      //   renSixtyeight: "2.网络用户利用网络服务实施侵权行为的，在被侵权人以书面形式通知本平台相关侵权行为、并提供相关证据的情况下，本平台有权采取删除、屏蔽、断开链接等必要措施以防止侵权结果的扩大。",
      //   renSixtynine: "十一、用户的广告宣传",
      //   renSeventy:
      //     "1.用户在自己发表的信息中加入宣传资料或参与广告策划，在本平台的免费服务上展示他们的产品，任何这类促销方法，包括运输货物、付款、服务、商业条件、担保及与广告有关的描述都只是在相应的用户和广告销售商之间发生。",
      //   renSeventyone: "2.本平台不承担任何责任，本平台没有义务为这类广告销售负任何一部分的责任。同时，如果该行为未经本平台同意或者对本平台产生利益侵犯，平台有权利进行删除、屏蔽，以及采取相应的技术、法律手段阻止此类信息的发布。",
      //   renSeventytwo:"十二、关于链接",
      //   renSeventythree:
      //     "本服务可能会提供与其他互联网系统或资源进行链接。对于前述系统或资源是否可以利用，平台不予担保。因使用或依赖上述系统或资源所产生的损失或损害，平台也不承担任何责任。",
      //   renSeventyfour:
      //     "十三、知识产权条款",
      //   renSeventyfive:
      //     "1.本平台上的文字、图片、数据、编码、商标等出现在本平台上的信息都属于平台运营方及关联方财产，受中国和国际知识产权法的保护，未经许可，任何单位或个人不得使用、复制、逆向工程或采取其他损害本平台知识产权的行为。",
      //   renSeventysix: "2.本平台上载的图片、文字等信息属上传者所有，但一经上载则表明其同意将上载信息内容授权平台进行免费的使用。",
      //   renSeventyseven:
      //     "3.本平台尊重每位知识产权权利人的权利，如您发现本平台有可能存在侵权信息的，请及时联系本平台客服人员并提交相关证据材料，本平台会及时核实并依法处理。",
      //   renSeventyeight:
      //     "十四、免责声明",
      //   renSeventynine:
      //     "1.本平台对于本服务包含的或用户经由或从任何与本服务有关的途径所获得的任何内容、信息或广告，不声明或保证其正确性或可靠性；并且对于用户经本服务上的广告、展示而购买、取得的任何产品、信息或资料，本平台不负保证责任。用户自行承担担使用本服务的风险。",
      //   renEighty:
      //     "2.平台有权但无义务，改善或更正本服务任何部分之任何疏漏、错误。",
      //   renEightyone: "3.平台不保证以下事项（包括但不限于）：",
      //   renEightytwo: "1)本服务适合用户的使用要求；",
      //   renEightythree:
      //     "2)本服务不受干扰，及时、安全、可靠或不出现错误；",
      //   renEightyfour: "3)用户经由本服务取得的任何产品、服务或其他材料符合用户的期望；",
      //   renEightyfive: "4)用户使用经由本服务下载的或取得的任何资料，其风险自行负担；因该使用而导致用户电脑系统损坏或资料流失，用户应负完全责任；",
      //   renEightysix:
      //     "5)对基于以下原因而造成的利润、商业信誉、资料的损失或其他有形或无形损失，本平台不承担任何直接、间接、附带、衍生或惩罚性的赔偿；",
      //   renEightyseven: "6)服务使用或无法使用；",
      //   renEightyeight: "7)经由本服务购买或取得的任何产品、资料或服务；",
      //   renEightynine:
      //     "8)用户资料遭到未授权的使用或修改；",
      //   renNinety: "9)其他与本服务相关的事宜。",
      //   renNinetyone: "4.用户在浏览网际网路时自行判断使用本平台的检索目录。该检索目录可能会引导用户进入到被认为具有攻击性或不适当的系统，本平台没有义务查看检索目录所列系统的内容，因此，对其正确性、合法性、正当性不负任何责任。",
      //   renNinetytwo: "5.用户同意，对于系统向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本平台无需承担任何责任：",
      //   renNinetythree:
      //     "1)本平台向用户免费提供的各项网络服务；",
      //   renNinetyfour:
      //     "2)本平台向用户赠送的任何产品或者服务；",
      //   renNinetyfive: "3)本平台向收费网络服务用户附赠的各种产品或者服务。",
      //   renNinetysix:
      //     "6.不论在何种情况下，本平台对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务不承担责任。",
      //   renNinetyseven:
      //     "十五、法律适用及管辖",
      //   renNinetyeight:
      //     "1.履行本协议产生争议的适用中华人民共和国法律进行解决；",
      //   renOnehundred:
      //     "2.本协议规定与相关法律相抵触的，按照相关法律规定解释，其他条款按照本协议规定执行；用户应遵守以下法律及法规：",
      //   renOnehundredone:
      //     "1)用户同意遵守《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《中华人民共和国侵权责任法》、信息产业部2000年10月8日第4次部务会议通过的《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、以及《全国人大常委会关于加强网络信息保护的决定》等有关计算机及互联网规定的法律和法规、实施办法。在任何情况下，本平台合理的认为用户的行为可能违反上述法律、法规，本平台可以在任何时候，不经事先通知终止向该用户提供服务。",
      //   renOnehundredtwo:
      //     "2)用户应了解国际互联网的无国界性，应特别注意遵守当地所有有关的法律和法规。",
      //   renOnehundredthree:
      //     "3)因执行本协议产生纠纷的，双方应友好协商，协商不能的，任一方有权提交本平台所在地人民法院管辖。",
      //   renOnehundredfour: "十六、其他",
      //   renOnehundredfive: "1.本协议条款因与相关法律相抵触导致无效的，不影响其他条款的效力。",
      //   renOnehundredsix: "2.本协议同样适用本平台自由合伙人、分站、及其他类似身份性质的用户。",
      //   renOnehundredseven: "3.本平台保留对本协议的最终解释权。",
      // }
    };
  },
  mounted() {
    //用户协议
    this.$axios.get(
      "/epf-cms/admin/info/getInfo?id=fd0bd420-8a10-41e2-bb86-29d969dd087e",
      {},
      res => {
        console.log(res.info);
        this.content = res.info.content
      }
    )
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
  font-family: "宋体 Bold", "宋体 常规", "宋体";
  font-size: 16px;
  line-height: 30px;
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
  @include size(1200px, 100%);
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
