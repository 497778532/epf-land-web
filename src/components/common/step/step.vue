<template>
  <div class="step">
    <el-row class="ul">
      <el-col class="li" :key="index" v-for="(item,index) in data" :span="24/data.length">
        <!-- <span v-if="active==data.length">
          <span class="icon gree">
            <span class="el-icon-check"></span>
          </span>
          <span class="line gree"></span>
          <span class="text isGree"
          >{{item}}</span>
        </span>
        <span v-else>
          <span class="icon" :class="active==index+1?'isActive':''||index+1<active?'gree':''">
            <span v-show="index+1>=active">{{index+1}}</span>
            <span class="el-icon-check" v-show="index+1<active"></span>
          </span>
          <span class="line" :class="active==index+1?'isActive':''||index+1<active?'gree':''"></span>
          <span
            class="text"
            :class="active==index+1?'isText':''||index+1<active?'isGree':''"
          >{{item}}</span>
        </span> -->
        <!-- 此处注释不要删除 -->
        <span>
          <span class="icon" :class="active>=index+1?'isActive':''">
            {{index+1}}
            <!-- <span v-show="index+1>=active">{{index+1}}</span> -->
            <!-- <span v-show="index+1<=active">{{index+1}}</span> -->
            <!-- <span class="el-icon-check" v-show="index+1<active"></span> -->
          </span>
          <span class="line" :class="active>=index+1?'isActive':''"></span>
          <span
            class="text"
            :class="active>=index+1?'isText':''"
          >{{item}}</span>
        </span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "step",
  props: {
    data: {
      type: Array,
      default: () => ["这是", "默认的", "步骤条"]
    },
    active: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.step {
  height:100%;
  // height: 120px;
  // padding: 0 132px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  .ul {
    .isActive {
      background-color: var(--lightColor) !important;
    }
    .isText {
      color: var(--lightColor) !important;
    }
    .gree {
      background-color: #8ac007 !important;
    }
    .isGree {
      color: #8ac007 !important;
    }
    .li {
      // height: 120px;
      height:100%;
      text-align: center;
      position: relative;
      .icon {
        display: inline-block;
        width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 100%;
        background-color: #d8d8d8;
        font-size: 18px;
        font-weight: 600;
        color: white;
        position: absolute;
        top: 37%;
        left: 43%;
        z-index: 999;
      }
      .line {
        display: inline-block;
        width: 100%;
        height: 6px;
        background-color: #d8d8d8;
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 998;
        // border-radius: 3px;
      }
      .text {
        display: inline-block;
        font-size: 15px;
        font-weight: 600;
        color: #d8d8d8;
        margin-top:30%;
        // margin-top: 150px;
      }
    }
  }
}
</style>