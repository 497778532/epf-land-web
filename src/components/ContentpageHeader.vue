<template>
  <div class="contpageHead_warp">
    <div class="contpageHead_title">
      <span class="title">{{contpageHeadTitle}}</span>
      <!-- <span class="more">更多></span> -->
    </div>
  </div>
</template>
<script>
export default {
  props:["contpageHeadTitle"],
  data() {
    return {
    };
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.contpageHead_title{
  height: 50px;
  font-size: 14px;
  color: #333333;
  border-bottom: 2px solid #eeeeee;
  box-sizing: border-box;
  padding-left: 17px;
  padding-top: 15px;
  font-size: 16px;
  .title{
    font-weight: bold;
    border-left:6px solid var(--lightColor);
    box-sizing: border-box;
    padding-left: 14px;
    margin-top:17px;
  }
  .more{
    float: right;
    padding-right: 14px;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
  }
}
</style>