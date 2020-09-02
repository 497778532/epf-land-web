<template>
  <!-- 发布地源弹框模块 -->
  <div class="landpop_warp">
    <pop-up-widget title="请选择土地的流转方式">
      <div class="landpop">
        <ul>
          <li @click="landpopData(index+1)" v-for="(item,index) in publistData" :key="index">
            <div class="landpop_top" align="center">
              <img :src="require('@/assets/image/pubpop0'+(index+1)+'.png')" alt />
            </div>
            <p>{{item}}</p>
          </li>
        </ul>
      </div>
    </pop-up-widget>
  </div>
</template>
<script>
import PopUpWidget from "@/components/PopUpWidget";
export default {
  components: { PopUpWidget },
  data() {
    return {
      publistData: ["转让", "出租", "抵押"]
    };
  },
  methods: {
    landpopData(landKey) {
      this.$store.state.landpop = null;
      this.$router.push({ path: "/PublishLandHome", query: { landtype: landKey } });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.landpop_warp {
  @include size(584px, 282px);
  .landpop {
    @include size(100%, 232px);
    box-sizing: border-box;
    padding: 25px 40px;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: inline-block;
        padding: 10px 15px ;
        cursor: pointer;
        transition: 0.4s;
        .landpop_top {
          @include size(109px, 109px);
          border-radius: 50%;
          box-sizing: border-box;
          padding: 5px;
          background: rgba(225, 239, 254, 0.7);
          text-align: center;
          vertical-align: middle;
          display: table-cell;
          img {
            vertical-align: middle;
          }
        }
        p {
          font-size: 14px;
          color: #333;
          text-align: center;
          line-height: 40px;
        }
      }
      li:hover p {
        color: var(--lightColor);
        font-weight: bold;
      }
      li:hover{
        box-shadow: rgba(101,103,144,0.15) 0px 0px 15px 5px;
        -webkit-box-shadow: rgba(101,103,144,0.15) 0px 0px 15px 5px;
        -ms-box-shadow: rgba(101,103,144,0.15) 0px 0px 15px 5px;
        -o-box-shadow: rgba(101,103,144,0.15) 0px 0px 15px 5px;
        -moz--shadow: rgba(101,103,144,0.15) 0px 0px 15px 5px;
        transform:translate3d(0px,0px,0px);
        -ms-transform:translate3d(0px,0px,0px); 	/* IE 9 */
        -moz-transform:translate3d(0px,0px,0px); 	/* Firefox */
        -webkit-transform:translate3d(0px,0px,0px); /* Safari 和 Chrome */
        -o-transform:translate3d(0px,0px,0px); 
      }
    }
  }
}
</style>
