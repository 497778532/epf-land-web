<template>
  <!-- 发布需求弹框模块 -->
  <div class="demandPop_warp_pop">
    <pop-up-widget title="请选择您的需求类型">
      <div class="demandPop">
        <ul>
          <li @click="seekDemand(index+1)" v-for="(item,index) in demandData" :key="index">
            <div class="demandPop_top" align="center">
              <img :src="require('@/assets/image/demandpop0'+(index+1)+'.png')" alt />
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
      demandData: ["求购", "求租"]
    };
  },
  methods: {
    seekDemand(demandKey) {
      this.$router.push({
        path: "/demandForm",
        query: { demandtype: demandKey }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.demandPop_warp_pop {
  @include size(584px, 281px);
  .demandPop {
    @include size(100%, 232px);
    box-sizing: border-box;
    padding: 20px 100px 0 100px;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: inline-block;
        cursor: pointer;
        padding: 10px 15px ;
        .demandPop_top {
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
          color: #333333;
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
