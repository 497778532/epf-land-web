<template>
  <el-breadcrumb
    separator-class="el-icon-arrow-right"
    class="breadcrumbtitle oflow-hd box-shadow-com win1200">
    <span data-v-51a6da80 class="el-breadcrumb__item">
      <span role="link" class="el-breadcrumb__inner is-link local">当前位置：</span>
    </span>
    <el-breadcrumb-item
      v-for="(path,index) in location"
      :to="{ path: path.path }"
      :key="index">
      {{path.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  components: {},
  props: ["location"],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.breadcrumbtitle {
  @include size(1200px, 40px);
  line-height: 40px;
  margin: 0 auto;
  span{
    font-size: 12px;
  }
  li {
    display: inline-block;
    font-size: 12px;
    color: #999;
    &:nth-child(2) {
      cursor: pointer;
    }
    span {
      padding: 0 5px;
    }
  }
}
</style>
<style>
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #999999;
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link:hover {
  color: var(--Colors);
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.local:hover {
  color: #999999;
  cursor: auto;
}
</style>