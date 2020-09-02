<template>
  <div id="app" style="height:100%;">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/font/DS-DIGI.TTF';
// @import "../node_modules/normalize-scss/sass/normalize/";
// @include normalize();
router-view {
  font-family: "Microsoft YaHei";
  color: #89dddf;
  font-size: 16px;
}
</style>

