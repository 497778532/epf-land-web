<template>
  <div class="popUpBox clearfix">
    <!-- 插槽 -->
    <slot></slot>
    <!-- 关闭按钮 -->
    <div class="close" @click="close"></div>
  </div>
</template>
<script>
export default {
  methods: {
    close() {
      this.$emit('close')
      this.$router.push("/")
    },
  },
}
</script>
<style lang="scss" scope>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.clearfix {
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
    overflow: hidden;
  }
}
.popUpBox {
  width:100%;
  background: rgba(9, 10, 11, 0.9);
  box-sizing: border-box;
  position: relative;
  z-index:1000;
  min-height: 1px;
  border-radius: 6px;
	border: solid 4px #cdd3dc;
  background-color: #ffffff;
  .close {
    @include size(24px,24px);
    text-align: center;
    box-sizing: border-box;
    position: absolute;
    top: 13px;
    right: 13px;
    cursor: pointer;
    background: url('../assets/image/close.png')
  }
  .close:hover {
    color: rgba(5, 208, 235, 1);
  }
}
</style>
