<template>
  <div class="landDetails_warp" ref="box">
    <epf-lePage :location="location"></epf-lePage>
  </div>
</template>
<script>

import baseURL1 from "@/util/config.js";
import qs from 'qs';
export default {
  data() {
    return {
      isLogin: false,
      flag: false,
      baseUrl: "",
      location:[
        {path:'/',name:'首页'},
        {path:null,name:'委托交易详情'},
      ],
    }
  },
  created() {

  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
@import url("../../../../assets/css/centerTable.css");
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.landDetails_warp {
  // border-top: 2px solid var(--Colors);
  .isFixed {
    position: fixed;
    background-color: #fff;
    top: 0;
    z-index: 999;
    display: block !important;
  }
  .pro-detail-hd-fixed-div {
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
    // position: fixed;
    // top: 0;
    // z-index: 30;
    display: none;
    background: #fff;
    border: 1px solid red;
    @include size(100%, 50px);
    border-bottom: 1px solid #eeeded;
    span {
      line-height: 50px;
      padding-bottom: 16px;
      margin-left: 50px;
      cursor: pointer;
    }
    .spanActive {
      box-sizing: border-box;
      border-bottom: 2px solidvar(--Colors);
      color: var(--Colors);
      font-weight: bold;
    }
  }
  .landmain {
    @include size(100%, auto);
    background: #fff;
    .landshow_top {
      @include size(1200px, 506px);
      margin: 0 auto;
      clear: both;
      box-sizing: border-box;
      padding-top: 24px;
      .landshow_huandeng {
        @include size(525px, 447px);
        float: left;
        // position: relative;
        // .collect{
        //   @include size(28px,28px);
        //   background: rgba(255,255,255,0.5);
        //   border-radius: 50%;
        //   position: absolute;
        //   right:8px;
        //   top:8px;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   cursor: pointer;
        //   z-index: 9;
        // }
        // .landshow720{
        //   @include size(54px,54px);
        //   background: rgba(0,0,0,0.5);
        //   border-radius: 50%;
        //   position: absolute;
        //   top:150px;
        //   left:236px;
        //   z-index: 9;
        //   color:#fff;
        //   font-size: 20px;
        //   text-align: center;
        //   line-height: 54px;
        // }
        .bigImg {
          @include size(525px, 354px);
          .pic-box {
            @include size(525px, 354px);
            overflow: hidden;
            .magnifier-box {
              img {
                width: 100% !important;
                height: 100% !important;
                display: block;
                border: 1px solid red;
              }
            }
          }
        }
        .smallImg {
          margin-top: 15px;
          @include size(100%, 50px);
          #imageMenu {
            @include size(100%, 50px);
            overflow: hidden;
            box-sizing: border-box;
            margin-top: 15px;
            clear: both;
            .onlickImg {
              @include size(20px, 50px);
              margin-right: 10px;
              text-align: center;
              line-height: 50px;
              font-size: 20px;
              color: #fff;
              cursor: pointer;
              float: left;
              img {
                margin-top: 8px;
              }
            }
            .onlickImg1 {
              margin-left: 0px;
              margin-right: 0px;
            }
            ul {
              @include size(475px, 50px);
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: flex-start;
              float: left;
              .list-img {
                @include size(475px, 50px);
                position: relative; //最外层的宽度，父级定位
                overflow: hidden;
                .list-img-wrap {
                  position: absolute; //子级定位，dom操作偏移
                  left: 0;
                  top: 0;
                  .single-img {
                    @include size(70px, 50px);
                    float: left;
                    margin-right: 8px;
                    text-align: center;
                    line-height: 50px;
                    font-size: 20px;
                    color: #fff;
                    cursor: pointer;
                    img {
                      display: block;
                      width: 70px;
                      height: 50px;
                    }
                  }
                  .img-activce {
                    border: 1px solid #c12022;
                  }
                }
              }
            }
          }
        }
      }
      .landshow_topcent {
        @include size(640px, 354px);
        box-sizing: border-box;
        float: left;
        margin-left: 35px;
        .landshow_title {
          line-height: 35px;
          color: #333333;
          font-size: 18px;
          font-weight: bold;
        }
        .landshow_titlebot {
          line-height: 14px;
          color: #999999;
          font-size: 14px;
          margin: 20px 0;
          span {
            padding-right: 40px;
            img {
              margin-right: 5px;
            }
          }
        }
        .landshow_pice {
          @include size(100%, 72px);
          line-height: 72px;
          color: #999;
          font-size: 14px;
          background: #f5f5f5;
          box-sizing: border-box;
          padding-left: 13px;
          margin-bottom: 15px;
          span {
            font-weight: bold;
            color: var(--Colors);
            font-size: 20px;
            font-weight: 500;
          }
          .landshow_sc {
            display: inline;
            font-size: 14px;
            padding: 6px 15px;
            border-radius: 0px 8px 0px 8px;
            margin-left: 11px;
          }
          .landshow_rz {
            color: var(--Colors);
            border: solid 1px var(--Colors);
            margin-left: 20px;
          }
          .landshow_type {
            color: #4875cf;
            border: solid 1px #4875cf;
          }
        }
        .landshow_p {
          line-height: 30px;
          color: #333333;
          font-size: 14px;
          display: inline-block;
          width: 49%;
          span {
            color: #999999;
          }
        }
        .landshow_topcent_bot {
          @include size(460px, auto);
          background: #ffffff;
          border: solid 1px #eeeeee;
          line-height: 48px;
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
          .input_text {
            @include size(320px, 48px);
            font-size: 18px;
            color: #999999;
            border: none;
            text-indent: 15px;
          }
          .input_sub {
            @include size(128px, 40px);
            background-color: var(--Colors);
            border-radius: 2px;
            background: var(--Colors);
            line-height: 40px;
            font-size: 14px;
            color: #fff;
            border: none;
            text-align: center;
            margin-right: 16px;
            cursor: pointer;
          }
          .input_sub_active {
            border: solid 1px var(--Colors);
            background: #fff;
            color: var(--Colors);
          }
        }
        .landshow_topbot {
          @include size(100%, 48px);
          display: flex;
          justify-content: space-around;
          color: #999;
          border: solid 1px #eeeeee;
          line-height: 48px;
          font-size: 14px;
          margin-top: 26px;
          span {
            color: var(--Colors);
            cursor: pointer;
          }
        }
      }
    }
    .landshow_main {
      background: #f2f1f9;
      .landshow_main_con {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        padding-bottom: 35px;
        .landshow_main_left {
          @include size(894px, auto);
          margin-top: 24px;
          background: #fff;
          float: left;
          .landshow_main_listtop {
            @include size(100%, 50px);
            border-bottom: 1px solid #eeeded;
            span {
              line-height: 50px;
              padding-bottom: 16px;
              margin-left: 50px;
              cursor: pointer;
              font-size: 16px;
            }
            .spanActive {
              box-sizing: border-box;
              border-bottom: 2px solidvar(--Colors);
              color: var(--Colors);
              font-weight: bold;
            }
          }
          .landshow_main_listtop_con {
            padding-bottom: 40px;
            .landshow_lefttop {
              @include size(850px, 36px);
              box-sizing: border-box;
              margin: 24px auto;
              background: url("../../../../assets/image/icon-bg.png") no-repeat
                center bottom;
              font-size: 18px;
              color: #333333;
              img {
                margin-top: 4px;
                margin-right: 10px;
              }
            }
            .landshow_table {
              width: 846px;
              border-top: 1px solid #f2f2f2;
              border-left: 1px solid #f2f2f2;
              // margin-top:55px ;
              clear: both;
              margin-left: 24px;

              td {
                line-height: 25px;
                color: #333333;
                font-size: 14px;
                padding: 10px 15px;
                border-right: 1px solid #f2f2f2;
                border-bottom: 1px solid #f2f2f2;
                text-align: center;
              }
              .td1 {
                width: 99px;
                background: #f2f5f7;
                color: #999999;
                text-align: right;
              }
              .td2 {
                width: 323px;
                background: #fff;
                text-align: left;
              }
            }
            .landshow_leftpic {
              display: flex;
              flex-wrap: wrap;
              padding-left: 10px;
              div {
                @include size(420px, 284px);
                margin: 10px;
                img {
                  width: 100%;
                  height: 100%;
                }
                video{
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .landshow_leftmap {
              @include size(847px, 408px);
              margin-left: 23px;
              .amap-page-container {
                height: 100% !important;
              }
            }
            .landshow_leftrank {
              @include size(847px, auto);
              margin-left: 23px;
              margin-top: 24px;
              table {
                border: solid 1px #f3f3f3;
                tr {
                  text-align: center;
                  height: 50px;
                  border: solid 1px #f3f3f3;
                  color: #666666;
                }
              }
              thead {
                tr {
                  background-color: #f2f5f7;
                  font-size: 14px;
                  color: #333333;
                  font-weight: bold;
                }
              }
            }
          }
        }
        .landshow_main_right {
          @include size(289px, auto);
          margin-left: 13px;
          background: skyblue;
          float: left;
          margin-top: 24px;
        }
      }
    }
  }
}
</style>
<style>
.magnifier-box img {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
.subscribe-ruleForm .el-form-item__label{
  width: 80px !important;
}
.subscribe-ruleForm .el-form-item__content{
  text-align: right;
}
.subscribe-ruleForm .el-form-item__error{
  width: 130px;
}
.subscribe-ruleForm .el-date-editor.el-input{
  width: 230px;
}
</style>
