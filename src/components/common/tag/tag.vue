<template>
  <div class="title epf_not_sele">
    <div class="icon epf_fl"></div>
    <h2 class="epf_fl">{{name}}</h2>
    <ul>
      <li @mouseenter="selectTabTra(items,index)"
        :class="{tabActive:num === index}"
        v-for="(items,index) in data"
        :key="index"
      >{{items.name}}</li>
      <li @click="more()" class="more">
        更多
        <span>></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "tag",
  props: {
    name: {
      type: String,
      default: "请填写name属性"
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      num: 0
    };
  },
  methods: {
    selectTabTra(item, index) {
      this.num = index;
      this.$emit('switch',item)
    },
    more(){
      this.$emit('more')
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.title {
  @include size(100%, 64px);
  border-bottom: 1px solid #eeeded;
  box-sizing: border-box;
  padding: 0 24px;
  line-height: 64px;
  .icon {
    @include size(6px, 21px);
    background: var(--lightColor);
    border-radius: 3px;
    display: inline-block;
    margin-top: 22px;
    margin-right: 12px;
  }
  h2 {
    font-size: 20px;
    color: #333333;
    font-weight: bold;
  }
  ul {
    float: right;
    li {
      display: inline-block;
      margin-right: 40px;
      height: 60px;
      cursor: pointer;
      color: #666666;
      font-size: 14px;
      &:last-child {
        margin-right: 0px;
        span {
          padding: 0 5px;
        }
      }
    }
    .more {
      &:active {
        color: var(--lightColor);
        transform: translateY(1px);
      }
      &:hover{
        color: var(--lightColor);
        transform: translateY(1px);
      }
    }
    .tabActive {
      color: var(--lightColor);
      margin-bottom: 3px;
      border-bottom: 3px solid var(--lightColor);
    }
  }
}
</style>