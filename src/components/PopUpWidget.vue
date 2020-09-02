<template>
  <div class="PopUpWidget">
    <!-- 标题及border Line -->
    <div class="title">{{title}}</div>
    <!-- 插入内容 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['title'],
  methods: {
  },
}
</script>
<style lang="scss" scope>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.PopUpWidget {
  .title {
    width:100%;
    line-height: 46px;
    border-bottom:1px solid #f3f3f3;
    font-size: 16px;
    color:#333;
    box-sizing: border-box;
    padding-left:14px; 
    font-weight: bold;
  }
}
</style>
