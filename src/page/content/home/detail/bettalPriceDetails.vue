<template>
    <div class="bettalPrice_warp">
        <div class="win1200">
            <epf-lePage :location="location"></epf-lePage>
            <div class="bettal_main">
                <div class="bettal_box" >
                    <!-- 顶部 -->
                    <div class="bettal_top">
                        <b>地块属性对比</b>
                        <el-popover
                            placement="bottom-end"
                            width="249"
                            trigger="click">
                            <div solt="content" style="padding:27px 20px 26px;line-height:20px;color:#666">
                                <h5 style="color:#333;font-weight: bold">步骤一：</h5>
                                <p>选择意向的供给地块，点击土地供给详情页的<em style="font-weight: bold;">"加入对比"</em>按钮把地块加入对比池（最多加入五块）；</p>
                                <h5 style="margin-top:22px;color:#333;font-weight: bold;">步骤二：</h5>
                                <p>点击右侧导航栏的<em style="font-weight: bold;">“地块对比”</em>， 点击<em style="font-weight: bold;">“开始对比”</em>按钮，进入地块对比页面对地块进行对比；</p>
                                <h5 style="margin-top:22px;color:#333;font-weight: bold;">步骤三：</h5>
                                <p>页面展示流转方式、价格、平米单价、最高意向报价等信息，希望对您提供帮助。谢谢。</p>
                            </div>
                            <p slot="reference"> <i class="question"></i>如何使用地块对比</p>
                        </el-popover>
                    </div>
                    <!-- 内容 -->
                    <div class="bettal_content">
                        <!-- 左侧 -->
                        <div class="left_table">
                            <table width="100% " cellspacing="0" cellpadding="0">
                                <tr><td class="black_title">地块信息</td></tr>
                                <tr><td class="left_title bottom_border">流转方式</td></tr>
                                <tr><td class="left_title bottom_border">价格</td></tr>
                                <tr><td class="left_title bottom_border">平米单价</td></tr>
                                <tr><td class="left_title bottom_border">最高意向报价</td></tr>
                                <tr><td class="left_title bottom_border left_land">地源热度</td></tr>
                                <tr><td class="left_title bottom_border">认证方式</td></tr>
                                <tr><td class="left_title bottom_border">行政区域</td></tr>
                                <tr><td class="left_title bottom_border left_area"> 
                                    <p>转让/出租/抵押</p>
                                    <el-popover
                                        placement="bottom"
                                        width="220"
                                        trigger="hover">
                                        <div solt="content" style="padding:15px 20px 10px;line-height:20px;color:#666">
                                            <p>当流转方式为转让时为转让面积;</p>
                                            <p>当流转方式为出租时为出租面积;</p>
                                            <p>当流转方式为抵押时为抵押面积。</p>
                                        </div>
                                        <p slot="reference" style="text-align:left;padding-left:33%;"><span style="margin-right:5px">面积</span><i  class="question"></i></p>
                                    </el-popover>
                                </td></tr>
                                <tr><td class="left_title bottom_border left_years"> 
                                    <p>剩余使用期限</p>
                                    <p style="text-align:left;padding-left:37%;">/出租期限</p>
                                    <el-popover
                                        placement="bottom"
                                        width="220"
                                        trigger="hover">
                                        <div solt="content" style="padding:15px 20px 10px;line-height:20px;color:#666">
                                            <p>当流转方式为转让时为剩余使用期限;</p>
                                            <p>当流转方式为出租时为出租期限;</p>
                                            <p>当流转方式为抵押时为抵押期限。</p>
                                        </div>
                                        <p slot="reference" style="text-align:left;padding-left:37%;"><span style="margin-right:5px">/抵押期限</span><i  class="question"></i></p>
                                    </el-popover>
                                </td></tr>
                                <tr><td class="left_title bottom_border">建筑面积</td></tr>
                                <tr><td class="left_title bottom_border">土地坐落</td></tr>
                            </table>    
                        </div>
                        <!-- 右侧内容 -->
                        <div class="main_table" v-for="(item,index) in bettalData" :key="index">
                            <div class="liclose" v-if="item.id" @click="delBettal(index)"></div>
                            <table width="100%" v-if="item.id" @click="openDetail(item.id,item.useType)">
                                <tr><td class="black_title td_title">
                                    <div>
                                        <img   :src="baseUrl + item.img" alt="">
                                        <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom">
                                            <p>{{item.title}}</p>
                                        </el-tooltip>
                                    </div>
                                </td></tr>
                                <tr><td class="left_title bottom_border td_type">{{item.circulationName}}</td></tr>
                                <tr><td class="left_title bottom_border td_red">￥{{Division(item.price)}}万</td></tr>
                                <tr><td class="left_title bottom_border td_red">￥{{Division(item.price/item.area)}}万/平方米</td></tr>
                                <tr><td class="left_title bottom_border td_red">{{item.maxPrice}}万</td></tr>
                                <tr><td class="left_title bottom_border left_land">
                                    <p>浏览次数&nbsp;&nbsp;<span class="td_type">{{item.viewsNum}}</span></p>
                                    <p>收藏次数&nbsp;&nbsp;<span class="td_type">{{item.collectionNum}}</span></p>
                                    <p>报价次数&nbsp;&nbsp;<span class="td_type">{{item.priceNum}}</span></p>
                                    <p>预约看地次数&nbsp;&nbsp;<span class="td_type">{{item.lookNum}}</span></p>
                                </td></tr>
                                <tr v-if="item.publishStatus == 'audit'"><td class="left_title bottom_border td_red">未经属地认证</td></tr>
                                <tr v-else><td class="left_title bottom_border td_red">属地认证</td></tr>
                                <tr><td class="left_title bottom_border"> {{item.cantonProvinceName}} / {{item.cantonCityName}} / {{item.cantonAreaName}}</td></tr>
                                <tr><td class="left_title bottom_border left_area">{{item.area}}平米</td></tr>
                                <tr><td class="left_title bottom_border left_years">{{item.years}}年</td></tr>
                                <tr><td class="left_title bottom_border">{{item.buildArea}}</td></tr>
                                <tr><td class="left_title bottom_border">{{item.location}}</td></tr>
                            </table>
                            <table width="100%" v-else>
                                <tr><td class="black_title td_title">
                                    <div>
                                        <img src="../../../../assets/image/bettalNo.jpg" alt="">
                                        <p style="color:#999;font-weight:normal">暂时没有地块，赶紧去添加吧~</p>
                                    </div>
                                </td></tr>
                                <tr><td class="left_title bottom_border td_type">--</td></tr>
                                <tr><td class="left_title bottom_border td_red">--</td></tr>
                                <tr><td class="left_title bottom_border td_red">--</td></tr>
                                <tr><td class="left_title bottom_border td_red">--</td></tr>
                                <tr><td class="left_title bottom_border left_land td_type"></td></tr>
                                <tr><td class="left_title bottom_border td_red">--</td></tr>
                                <tr><td class="left_title bottom_border">--</td></tr>
                                <tr><td class="left_title bottom_border left_area">--</td></tr>
                                <tr><td class="left_title bottom_border left_years">--</td></tr>
                                <tr><td class="left_title bottom_border">--</td></tr>
                                <tr><td class="left_title bottom_border">--</td></tr>
                            </table>
                        </div>
                    </div>
                     <div class="bettal_foot">
                        <span>提示：以上地源参数仅供参考，实际参数配置以实际土地信息为准。</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
        location:[
            {path:'/',name:'首页'},
            {path:null,name:'地块比价'},
        ],
        bettalData:[],
        baseUrl:"",
    };
  },
  created(){
      this.baseUrl = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
      this.getBettalPriceList()
  },
  watch:{
      '$route':'getBettalPriceList'
  },
  methods:{
    // 比价列表
    getBettalPriceList(){
        this.$axios.get(
        "/epf-landweb/tsell/getCompareSell?ids="+this.$route.query.ids,{},
            res => {
                console.log(res)
                if (res.code == 0) {
                    this.bettalData = res.sellList;
                    if( this.bettalData.length<3 && this.bettalData.length){
                        let obj = {}
                        let j = 3-this.bettalData.length
                        for(var i = 0;i<j;i++){
                            this.bettalData.push(obj)
                            if( i == j){
                                return;
                            }
                        }
                    }
                }else if(res.code == 500){
                    this.bettalData = []
                    let obj = {}
                    let j = 3-this.bettalData.length
                    for(var i = 0;i<j;i++){
                        this.bettalData.push(obj)
                        if( i == j){
                            return;
                        }
                    }
                }
            }
        )
    },
    // 关闭一个
    delBettal(index){
       let arr = this.$route.query.ids.split(',')
       arr.splice(index,1)
      this.$router.push({path:this.$route.path,query:{ids:arr.toString()}})
      this.getBettalPriceList()
    },
    // 跳转详情
    openDetail(id,useType) {
        let routeUrl = ""
        // if(useType == "transfer2" || useType == "rent" || useType == "mortgage"){
            routeUrl = this.$router.resolve({
                path: "/demandDetails",
                query: { demand: id }
            });
        // }else{
        //     routeUrl = this.$router.resolve({
        //         path: "/supplyDetails",
        //         query: { supply: id }
        //     });
        // }
        window.open(routeUrl.href, "_blank");
    },
  },
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.bettalPrice_warp {
  @include size(100%, auto);
  background: #edf6fc;
  .bettal_main {
    @include size(100%, auto);
    .bettal_box{
        background:url("../../../../assets/image/bettal_bg.jpg");
        padding:0 24px 6px;
        .bettal_top{
            display: flex;
            justify-content: space-between;
            height: 50px;
            border-bottom:1px solid #e6e6e6;
            margin-bottom: 16px;
            b{
                display: inline-block;
                color:var(--lightColor);
                font-size:18px;
                width:110px;
                border-bottom:2px solid var(--lightColor);
                line-height: 38px;
                font-weight: bold;
                margin-top:12px;
            }
             /deep/ .el-popover__reference .question{
                margin-right:5px;
                width:18px;
                height:18px;
                display: inline-block;
                vertical-align: bottom;
                background:url("../../../../assets/image/question-01.png") no-repeat
              }
              /deep/ .el-popover__reference:hover .question{
                background:url("../../../../assets/image/question-02.png") no-repeat
              }
              /deep/ .el-popover{
                div{
                    padding-top:20px;
                }
              }
              /deep/ .el-popover__reference{
                padding-top:20px;
                color:#666;
              }
        }
        .bettal_content{
            display: flex;
            justify-content: flex-start;
            font-weight: normal;
            font-size: 16px;
            tr{
                border-bottom:1px solid #e6e6e6;
                border-right:1px solid #e6e6e6;
            }
            table{
                tr:nth-child(even) > td {background-color: #f7f7fa;} 
                .black_title{
                    height:230px;
                }
                .left_title{
                    height: 45px;
                }
                .left_area{
                    height:72px;
                }
                .left_years{
                    height:96px;
                }
                .left_land{
                    height:133px;
                    p{color:#999999;line-height: 28px}
                }
            }
            .left_table{
                border-top:1px solid #e6e6e6;
                border-left:1px solid #e6e6e6;
                width:16%;
                color:#999999;
                text-align: right;
                td{
                    padding-right:25px;
                }
                 /deep/ .el-popover__reference .question{
                    width:18px;
                    height:18px;
                    display: inline-block;
                    vertical-align: bottom;
                    background:url("../../../../assets/image/question-01.png") no-repeat
                }
                /deep/ .el-popover__reference:hover .question{
                    background:url("../../../../assets/image/question-02.png") no-repeat
                 }
            }  
            .main_table{
                width:28%;
                border-top:1px solid #e6e6e6;
                position:relative;
                .liclose{
                    position:absolute;
                    top:10px;
                    right:10px;
                    width: 23px;
                    height: 23px;
                    background: url("../../../../assets/image/close.png") no-repeat ;
                }
                .liclose:hover{
                    background: url("../../../../assets/image/icon-circle-close.jpg") no-repeat ;
                }
                td{
                    padding-left:20px;
                }
                .td_title{
                    padding:0;
                    div{
                        margin:0 auto;
                        text-align: center;
                        img{
                            width:233px;
                            height:157px;
                        }
                        p{
                            margin:0 auto;
                            width:233px;
                            line-height: 40px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow:ellipsis;
                            font-size: 16px;
                            color:#333;
                            font-weight: bold;
                        }
                       
                    }
                }
                .td_type{
                    color:#333
                }
                .td_red{
                    color:var(--priceColor)
                }
            }
        }
        .bettal_foot{
            span{
                color:var(--priceColor);
                line-height: 54px;
            }
        }
    }

  }
}
</style>