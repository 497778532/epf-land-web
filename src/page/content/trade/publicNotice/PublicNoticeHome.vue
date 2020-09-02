<template>
<div>
    <epf-lePage :location="location"></epf-lePage>
    <div class="win1200" style="background:#fff;">
      <!-- <el-container>
        <el-aside width="200px">
          左侧导航
          <el-menu
            :default-active="$route.path"
            router
          >
            <div v-for="(item,index) in menuData" :key="index">
              <el-submenu :index="'/PublicNoticeHome/'+item.router" v-if="item.child">
                <template slot="title">
                  {{item.title}}
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="'/PublicNoticeHome/'+child.router" v-for="(child,childIndex) in item.child" :key="childIndex" @click="clickMenu(child.title)">{{child.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item :index="'/PublicNoticeHome/'+item.router" v-if="!item.child">
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container> -->
      <div class="notice_top" v-for="(item,index) in menuData" :key="index">
        <span :class="ind == activeIndex ? 'active':''" v-for="(items,ind) in item.child"  @click="changeIndex(ind,items.title)" :key="ind">
          {{items.title}}</span>
      </div>
      <TradePublic v-if="activeIndex == 0"></TradePublic>
      <ResultsPublicity  v-if="activeIndex == 1"></ResultsPublicity>
    </div>
</div>
</template>

<script>
import TradePublic from "./TradePublic.vue"
import ResultsPublicity from "./ResultsPublicity.vue"

export default {
  components:{TradePublic,ResultsPublicity},
  data() {
    return {
      activeIndex:0,
      location:[
        {path:'/',name:'首页'},
        {path:'/TradingHall',name:'交易大厅'},
        {path:null,name:'公告公示'},
        {path:null,name:this.$route.path == '/PublicNoticeHome/ResultsPublicity'?'成交公示':'交易公告'}
      ],
      menuData:[
        {
          title:'公告公示',
          router:'/TradePublic',
          child:[
            {
              title:'交易公告',
              router:'TradePublic'
            },
            {
              title:'成交公示',
              router:'ResultsPublicity'
            },
          ]
        },
      ]
    };
  },// 交易公告  TradePublic  结果公示   ResultsPublicity
  created(){
    this.activeIndex = this.$route.path == '/PublicNoticeHome/ResultsPublicity' ? 1:0
  },

  methods:{
   changeIndex(index,obj){
      this.activeIndex = index
      this.$router.push(this.activeIndex == 0?'/PublicNoticeHome/TradePublic':'/PublicNoticeHome/ResultsPublicity')
      this.location = [
        {path:'/',name:'首页'},
        {path:'/TradingHall',name:'交易大厅'},
        {path:null,name:'公告公示'},
        {path:null,name:obj}
      ]
    }
  }
};
</script>
<style lang="scss" scoped>
.notice_top{
  height:40px;
  border-bottom:2px solid var(--Colors);
  margin-bottom: 10px;
  span{
    display: inline-block;
    line-height: 40px;
    font-size:12px;
    width: 130px;
    text-align: center;
    font-weight: bold;
    color:#666666;
  }
  .active{
    background: var(--Colors);
    color:#fff;
  }
}

</style>
