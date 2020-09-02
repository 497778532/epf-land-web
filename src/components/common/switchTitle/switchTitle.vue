<template>
  <div id="switch">
    <div class="switch_title" 
      :style="{background:background,padding:`0 ${padding}`,height:height,lineHeight:height}">
      <span class="title_content" :style="{color:color}">{{titles_h}}</span>
      <div class="btn_switch" 
      :style="{color:switchColor}"
        @click="switchClick()" v-if="shutOff">
        <div v-show="!shwoHide">
          <span>展开</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div v-show="shwoHide">
          <span>收起</span>
          <i class="el-icon-arrow-up"></i>
        </div>
      </div>
    </div>
    <el-collapse-transition>
       <div v-if="shwoHide">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
  export default {
    props: {
      titles_h:String, //自定义的标题名
      switchData:{ //父组件传递的v-if参数-默认打开
        type:Boolean,
        default:true
      },
      shutOff:{ //切换功能-默认开启
        type:Boolean,
        default:true
      },
      height:{
        type:String,
        default:'56px'
      },
      background:{
        type:String,
        default:'#f5f7fa'
      },
      padding:{
        type:String,
        default:'0'
      },
      color:{
        type:String,
        default:'#333'
      },
      switchColor:{
        type:String,
        default:'#999'
      },
    },
    data(){
      return{
        shwoHide:this.switchData
      }
    },
    methods:{
      switchClick(){
        this.shwoHide = !this.shwoHide
      }
    }
  }
</script>
<style scoped>
.switch_title{
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
.title_content{
    font-size: 16px;
    font-weight: bold;
    padding: 0 0 0 20px;
    position: relative;
}
.title_content::after{
  content: '';
  width: 6px;
  height: 21px;
  background: var(--lightColor);
  border-radius: 3px;
  position: absolute;
  top:0;
  left: 0;
}
.btn_switch{
    font-size: 14px;
    cursor: pointer;
    float: right;
}
</style>