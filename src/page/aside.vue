<template>
  <!-- 公共侧边栏模块 -->
  <div class="aside_warp">
      <ul  ref="asideUl">
          <li @mouseenter="selectAside(index)"
           :class="activeFlag == index?'active':''" v-for="(item,index) in asideData" :key="index">
              <div @click="toPage(index)" class="asideD">
                <img v-lazy=" activeFlag == index ? require('../assets/image/aside0' + (index+1) + '-1.png') : require('../assets/image/aside0' + (index+1) + '-2.png')" alt="">
                <p v-if="index != 4 && index != 6" style="font-size:-1.8vh">{{item}}</p>
                <el-tooltip v-if="index == 6" class="item" effect="dark" content="客服电话:400-888-9315" placement="left">
                    <p style="font-size:-1.8vh">{{item}}</p>
                </el-tooltip>
                <!-- 地块对比弹框 -->
                <el-popover
                  ref="popover"
                  @show="showLogin"
                  v-if="index == 4"
                  placement="right"
                  title="地块对比"
                  width="315"
                  style="font-size:-1.8vh"
                  trigger="click">
                  <div class="checkB">
                    <div class="hidden" @click="$refs['popover'][0].doClose()"></div>
                    <ul style="max-height:400px;overflow-y:scroll;" v-if="pkData&&pkData!=null">
                      <el-checkbox-group v-model="checkedCities">
                        <el-checkbox v-for="(items, index) in pkData"
                          :key="index"
                          :label="items.id">
                          <li>
                            <div class="cont_bot">
                              <h4>{{items.title}}</h4>
                              <span class="price">
                                {{items.price?'￥ '+Division(items.price) +'万元':'面议'}}
                              </span>
                              <h5>
                                <span>
                                  <img src="@/assets/image/icon-area.png" alt />
                                  {{items.area}}平方米
                                </span>
                                <span class="fr">
                                  <img src="@/assets/image/icon-time.png" alt />
                                  {{items.years}}年
                                </span>
                              </h5>
                              <p>
                                <img src="@/assets/image/icon-map.png" alt />
                                {{items.cantonProvinceName}} /
                                {{items.cantonCityName}} /
                                {{items.cantonAreaName}}
                              </p>
                              <div class="liclose fr" v-for="(val,num) in checkedCities" :key="num" v-show="items.id == val" @click="delOne(items.id,index)"></div>
                            </div>
                            <div class="liclose fr" @click="delOne(items.id,index)"></div>
                          </li>
                        </el-checkbox>
                      
                      </el-checkbox-group>
                    </ul>
                    <ul  v-if="pkData == [] || pkData == ''"  style="height:300px;display:flex;align-items:center">
                      <li   style="margin:0 auto">
                        <img 
                        style="display:block;margin-top:10px;margin-bottom:10px;width:233px;height:162px"
                        src="../assets/image/bettalNoData.png" alt="">
                        <p style="color:#666;font-size:16px;text-align:center">暂时没有地块，赶快加入吧~</p>
                      </li>
                    </ul>
                    <div style="font-size:16px;padding:20px;border-bottom: 1px solid #e6e6e6;color:#333;">已勾选地块
                      <span style="color:var(--priceColor);font-weight: bold;">{{checkedCities || checkedCities!=0 ?checkedCities.length:0}}</span> 个
                      <span class="epf_btn epf_btn_def fr" @click="delAll">清空</span>
                    </div>
                    <div style="padding:20px;border-bottom: 1px solid #e6e6e6;">
                      <span style="color:var(--priceColor);">提示：</span>
                      <span>最多可加入5个地块，单次最多可3个地块进行对比。</span>
                    </div>
                    <!-- <router-link to="/bettalPriceDetails"> -->
                      <div class="epf_btn epf_btn_bg checkS" @click="bettal(checkedCities)">开始对比</div>
                    <!-- </router-link> -->
                  </div>
                  <p slot="reference">{{item}}</p>
              </el-popover>
              </div>
          </li>
          <div class="backTop" @mouseenter="selectAside('top')" :class="activeFlag == 'top'?'active':''">
        <div  @click="toPage('top')" :class="activeFlag == 'top'?'active':'activeF'">
          <img v-if="activeFlag == 'top'" src="../assets/image/backTop-01.jpg" alt="">
          <img v-if="activeFlag !== 'top'" src="../assets/image/backTop-02.jpg" alt="">
          <p style="font-size:-1.8vh">回到顶部</p>
        </div>
      </div>
      </ul>
      
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import baseURL1 from "@/util/config.js";
import qs from "qs";
export default {
  data() {
    return {
      activeFlag:"",
      pkData:[
        // {cantonAreaName: "朝阳区",cantonCityName: "朝阳区",cantonProvinceName: "北京市",area: 3253425,years: "31",secondClassUseName: "采矿用地",address: "分工会发给",title: "大分公司第三方第三方1",updateTime: "2020-04-23 10:13:45"},
        // {cantonAreaName: "朝阳区",cantonCityName: "朝阳区",cantonProvinceName: "北京市",area: 3253425,years: "31",secondClassUseName: "采矿用地",address: "分工会发给",title: "大分公司第三方第三方2",updateTime: "2020-04-23 10:13:45"},
        // {cantonAreaName: "朝阳区",cantonCityName: "朝阳区",cantonProvinceName: "北京市",area: 3253425,years: "31",secondClassUseName: "采矿用地",address: "分工会发给",title: "大分公司第三方第三方3",updateTime: "2020-04-23 10:13:45"},
        // {cantonAreaName: "朝阳区",cantonCityName: "朝阳区",cantonProvinceName: "北京市",area: 3253425,years: "31",secondClassUseName: "采矿用地",address: "分工会发给",title: "大分公司第三方第三方4",updateTime: "2020-04-23 10:13:45"},
        // {cantonAreaName: "朝阳区",cantonCityName: "朝阳区",cantonProvinceName: "北京市",area: 3253425,years: "31",secondClassUseName: "采矿用地",address: "分工会发给",title: "大分公司第三方第三方5",updateTime: "2020-04-23 10:13:45"},
      ],
      checkedCities: [],
      checkedData:[],
      asideData:["个人中心","收藏","消息","发布地源","地块对比","帮助中心","客服"]
    };
  },
  computed: {
    ...mapState("index", ["homelandTransferInfo","homelandRentalInfo","homelandMortgageInfo","landUseInfo"])  
  },
  mounted(){
    this.getPrice()
  },
  methods: {
    showLogin(){
       let token = localStorage.getItem("token");
       if(!token){
          this.$refs['popover'][0].doClose();
          this.$message.warning("您还未登录！请登录！")
          this.$router.push({ path: "/login" });
       }
    },
    // 删除侧边栏比价地块
    delOne(id,index){
      let para = { id: id };
      let that = this;
      this.$axios.post(
        "/epf-landweb/transwebcollect/deleteTransWebCollect",
        qs.stringify(para),
        res => {
            //取消收藏/比价
            if (res.code === 0) {
              this.pkData[index].scordbFlag = 0;
              this.$message.success("取消比价成功");
              this.getPrice()
            } else {
              this.$message.error("取消比价失败");
          }
         
        }
      );
    },
    delAll(){
      console.log(this.pkData)
      let arr = []
      this.pkData.map((item,index)=>{
        arr.push(item.scordbFlagId)
      })
      let ids = arr.toString()
      this.$axios.post(
        `/epf-landweb/transwebcollect/deleteTransWebCollect?ids=${ids}`,
        {},
        res => {
            //清空
            if (res.code === 0) {
              this.$message.success("已清空");
              this.getPrice()
            } else {
              this.$message.error("清空失败");
          }
        }
      );

    },
    selectAside(index){
      this.activeFlag = index
      if(index == 4){
        this.getPrice()
      }
    },
    // 获取比价地块列表
    getPrice(){
      this.$axios.get(
        '/epf-landweb/transwebcollect/myContrastList',
        {},
        res => {
          this.pkData = res.pager.results
      })
    },
    // 对比跳转详情
    bettal(data){
      if(data.length==0){
        this.$message.error("请选择要对比的地块！")
        return;
      }
      if(data.length > 3){
        this.$message.error("您选择的对比地块超过三个，请重新选择！")
        this.checkedCities = [];
        return;
      }
      let id = ""
      data.map((item,index)=>{
        this.pkData.map((items,ind)=>{
          if(item == items.id){
           id = ind
          }
        })
        this.checkedData.push(this.pkData[id].targetId)
      })
      this.$refs['popover'][0].doClose()
      this.$router.push({path:"/bettalPriceDetails",query:{ids:this.checkedData.toString()}})
      this.checkedCities = []
      this.checkedData= []
    },
    toPage(index){
        if(index == 0){
          this.$router.push('/PersonalCenter/myProvide')
        }else if(index == 1){
          this.$router.push('/PersonalCenter/myCollect')
        }else if(index == 2){
          this.$router.push('/PersonalCenter/myMessage')
        }else if(index == 3){
          this.$router.push({path:"/",query:{showland:"1"}})
        }else if(index == 5){
          this.$router.push('/HelpCenter')
        }else if(index == 'top'){
            window.scrollTo(0,0)
        }
    },
  },
  // watch:{
  //   checkedCities:{
  //     deep:true,
  //     handler(newV,oldV){
  //       // console.log(newV,oldV)
  //       if(newV.length > 3){
  //         this.$message.error("您选择的对比地块超过三个，请重新选择！")
  //         this.checkedCities = newV;
  //         return;
  //       }
  //     }
  //   }
  // }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.checkS{    
  width: 265px;
  height: 44px;
  background-color: var(--lightColor);
  line-height: 44px;
  font-size: 16px;
  margin: 20px 25px;
}
.aside_warp {
    display: table;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-top:3vh;
    position:fixed;
    right:0;
    top:0;
    z-index:99;
    width: 49px;
    background: #fff;
    border-left:1px solid #e5e5e5;
    li{
      padding:14% 10%;
      color:#666;
      text-align: center;
      cursor: pointer;
    }
    .backTop{
      position: absolute;
      bottom:0px;
      padding:3px 10px;
      color:#666;
      text-align: center;
      cursor: pointer;
    }
    .active{
        background:#b11b26;
        color:#fff;
    }
    .activeF{
      background:#fff;
      color:#666;
    }
}
.cont_bot {
  width: 240px;
  box-sizing: border-box;
  padding: 12px 0;
  line-height: 25px;
  font-size: 14px;
  color:#666;
  position: relative;
  h4 {
    line-height: 32px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    word-break: normal !important;
  }
  .price {
    color: var(--priceColor);
    font-size: 18px;
    font-weight: bolder;
  }
  h5 {
    font-size: 14px;
    color: #666;
    span {
      &:nth-child(1) {
        img {
          margin-top: 2px;
          margin-right: 3px;
          margin-left: -3px;
        }
      }
      &:nth-child(2) {
        img {
          margin-top: -1px;
          margin-right: 3px;
        }
      }
    }
  }
  p {
    color: #666;
    font-size: 14px;
    color: #666;
    white-space: nowrap;
    margin-left: -5px;
  }
  .liclose{
    position: absolute;
    right: 13px;
    top: 37px;
    display: none;
    width: 20px;
    height: 20px;
    background: url("../assets/image/icon-circle-close.jpg") no-repeat center;
  }
}
.checkB{
  background: url("../assets/image/bijia-icon.jpg") no-repeat bottom;
}
.cont_bot:hover .liclose{
  display: block;
}
</style>
<style>
.checkB .el-checkbox{
  padding-left: 16px;
  margin-right: 0;
}
.checkB .el-checkbox-group .el-checkbox{
  border-bottom: 1px solid #e6e6e6;
}
.checkB .el-checkbox__input{
  vertical-align: top;
  margin-top: 20px;
}
.checkB .hidden{
  background: url("../assets/image/icon-circle-close.jpg") no-repeat center;
  display: block;    
  width: 20px; 
  height: 20px;
  background-size: 20px;
  position:absolute;
  right:15px;
  top:14px;
  cursor: pointer;
}
.checkB .el-checkbox__input.is-checked .el-checkbox__inner,
.checkB .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: var(--priceColor);
    border-color: var(--priceColor);
}
/* .asideD  */
.el-popover .el-popover__title{
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
  line-height: 50px;
  padding: 0 20px;
}
/* .el-popover .el-popover__title::after{
  content: '';
  background: url("../assets/image/icon-circle-close.jpg") no-repeat center;
  display: block;    
  width: 20px; 
  height: 20px;
  background-size: 20px;
  position:absolute;
  right:15px;
  top:14px;
  cursor: pointer;
} */
/* .asideD  */
.el-popover{
  padding:0;
}
</style>
