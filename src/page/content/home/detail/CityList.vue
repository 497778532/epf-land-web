<template>
  <div class="cityHome_wrap">
    <div id="mapDiv" style="display:none" ref="mapDiv"></div>
    <epf-lePage :location="location"></epf-lePage>
    <div class="citylist_pro">
      <div class="hostCity">
        <ul>
          <li class="activeCity" @click="nationwide">全国</li>
          <li>热门城市：</li>
          <li v-for="(item,index) in Hot_address" 
              :key="index"
              :label="item.regionName"
              :value="index"
              class="activeCity"
              @click="selecAddress(item.regionName,item.parentId,item.regionCode,item.key)">
            {{item.regionName}}
          </li>
        </ul>
      </div>
      <div class="citytype">
        <el-row>
          <el-col :span="2">
            <label class="type_lable" style="line-height: 40px;">城市选择：</label>
          </el-col>
          <el-col :span="5">
            <el-select 
              v-model="modelData.capitalValue"
              placeholder="省份" 
              clearable
              @change="capitalChoice()">
              <el-option 
              :label="item.regionName"
              :value="index"
              v-for="(item,index) in capitalContainer"
              :key='index'
              >{{item.regionName}}
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" v-if="ordinaryCity">
            <el-select 
              v-model="modelData.cityValue"
              @change="cityChoice()"
              clearable
              placeholder="城市 / 市辖市">
              <el-option 
              :ref="value.regionName"
              :label="value.regionName"
              :value="value.regionName"
              :regionCode="value.regionCode"
              :parentId="value.parentId"
              v-for="(value,index) in cityContainer"
              :key='index'
              >{{value.regionName}}
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" v-if="specialCity">
            <el-select 
              v-model="modelData.cityValue"
              @change="cityChoice()"
              clearable
              placeholder="城市 / 市辖市">
              <el-option 
              :label="cityContainer"
              :value="cityContainer"
              >{{cityContainer}}
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="float:right">
            <div class="epf_btn epf_btn_bg" @click="citySearch">搜索</div>
          </el-col>
          <el-col :span="5" style="float:right">
            <el-autocomplete
              prefix-icon="el-icon-search"
              class="inline-input"
              v-model="searchText"
              :maxlength='12'
              :debounce='500'
              clearable
              @clear='cancel'
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入行政区域"
              :trigger-on-focus='false'
              @select="handleSelect"
              :highlight-first-item='true'
            ></el-autocomplete>
          </el-col>
          <el-col :span="2" style="float:right">
            <label class="type_lable" style="margin-right:20px;line-height: 40px;">直接搜索：</label>
          </el-col>
        </el-row>
      </div>
      
      <div class="cityList" v-loading="loading">
        <table width="100%" border v-if="tabelOne">
          <tr>
            <td style="width:150px">搜索结果</td>
            <td>
              <span v-for="(item,index) in searchContent" :key="index" @click="selecAddress(item.regionName,item.parentId,item.regionCode,item.key)">
                {{item.regionName}}
              </span>
            </td>
          </tr>
        </table>
        <table width="100%" border v-show="tabelTow">
          <tr>
            <td>直辖市</td>
            <td>
              <span v-for="(value,index) in fataCityData" :key="index" @click="selecAddress(value.regionName,value.regionCode,'',index)">
                {{value.regionName}}
              </span>
            </td>
          </tr>
          <tr v-for="(item,index) in ordinaryCityData" :key="index">
            <td class="province" @click="selecAddress(item.regionName,item.regionCode,'')">{{item.regionName}}</td>
            <td>
              <span v-for="(value,index) in item.children" :key="index" @click="selecAddress(value.regionName,value.parentId,value.regionCode,index)">
                {{value.regionName}}
              </span>
            </td>
          </tr>
          <tr>
            <td>其他</td>
            <td>
              <span v-for="(value,index) in otherCityData" :key="index" @click="selecAddress(value.regionName,value.regionCode,'',index)">
                {{value.regionName}}
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import TMap from "@/components/common/tianditu/init"; 
import { mapState, mapMutations,mapActions } from "vuex";
export default {
  data() {
    return {
      cityContainerParentId:'',
      location:[
        {path:'/',name:'首页'},
        {path:'/CityList',name:'城市列表'},
      ],
      capitalContainer:'',//省份数据
      cityContainer:[],//城市数据
      province:'',
      city:'',
      Hot_address:[
        {regionName: '北京市', parentId:'110000', regionCode: ''},
        {regionName: '天津市', parentId:'120000', regionCode: ''},
        {regionName: '上海市', parentId:'310000', regionCode: ''},
        {regionName: '广州市', parentId:'440000', regionCode: '440100'},
        {regionName: '深圳市', parentId:'440000', regionCode: '440300'},
        {regionName: '成都市', parentId:'510000', regionCode: '510100'},
        {regionName: '杭州市', parentId:'330000', regionCode: '330100'},
        {regionName: '南京市', parentId:'320000', regionCode: '320100'},
        {regionName: '武汉市', parentId:'420000', regionCode: '420100'},
      ],
      searchText:'', //搜索内容
      map:'',//地图对象
      geocoder:'',//地理编码对象
      T:'',
      geocoderData:'',//地理编码返回对象
      modelData:{
        capitalValue:'',//选择的省
        cityValue:'',//选择的市
      },
      ordinaryCity:true,// 普通城市
      specialCity:false,//  特殊城市
      specialCityArray:[0,1,8,21,31,32,33], //特殊城市index
      tableOrdinaryCity:[], //普通城市临时盒子
      fataCityData:[],//直辖市table数据
      otherCityData:[],//其他市table数据
      ordinaryCityData:[],//普通城市table数据
      restaurants:[], // 搜索返回的内容
      searchContent:'',//搜索返回内容
      tabelOne:false, //搜索内容table控制变量
      tabelTow:false, //城市列表table控制变量
      loading:true,// 城市列表Loading
      cityReturn:[],// 推荐词数组
      addressName:'全国',//用户选择的城市
      filterActive: {
        cantonProvince: '',
        firstClassUse: '',
        secondClassUse: '',
        circulation: '',
        area: '',
        years: '',
        landType: '',
        landChar: ''
      },
      selected: {
        cantonProvince: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: ""
      },
      searchInfo: {},
      filterActiveKey:0,
    }
  },
  created(){ //获取select数据 1
    this.$axios.get('/epf-cms/regionals/getRegionalTree',{},res=>{
      if(res.code==0){
        this.capitalContainer = res.dataTree
      }
    })
    if(JSON.parse(sessionStorage.getItem('Address'))==null){
      this.addressName = '全国'
    }else{
      this.addressName = JSON.parse(sessionStorage.getItem('Address')).creditCity
    }
		this.getSearchDicRegion("0");
  },
  computed: {
    ...mapState("index", ["regionInfo"]),
		...mapState("region", ['filterActiveS'])
  },
  mounted(){
    setTimeout(this.getPosition(),100)//自动执行
    this.queryAddress() //调用城市列表请求
    this.restaurants = this.loadAll(); //搜索返回的内容
  },
  methods:{
    ...mapActions("index", ["getSearchDicRegion",]),
		...mapMutations("region", ['regionChage']),
    matchProvince(regionCode){
      this.regionInfo.dictionariesList.map((e,index) => {
        if(regionCode == e.id){
          this.filterActiveKey = index + 1
          return index
        }
      })
    },
    queryAddress(){ //获取城市列表数据
      this.$axios.get('/epf-cms/regionals/getRegionalTree',{},res=>{
        let fataArray = []
        let otherArray = []
        if(res.code==0){
          this.tableOrdinaryCity = res.dataTree
          for(let i = 0;i<this.specialCityArray.length;i++){
            delete this.tableOrdinaryCity[this.specialCityArray[i]]
            fataArray.push(this.capitalContainer[this.specialCityArray[i]])
            otherArray.push(this.capitalContainer[this.specialCityArray[i]])
          }
          for(let j = 0;j<this.tableOrdinaryCity.length;j++){
            if(this.tableOrdinaryCity[j]!=undefined){
              this.ordinaryCityData.push(this.tableOrdinaryCity[j])
            }
          }
          this.fataCityData = fataArray.splice(0,4)
          this.otherCityData = otherArray.splice(4,3)
          this.loading = false
          this.tabelTow = true
        }
      })
    },
    capitalChoice(){ //省份选择
      this.modelData.cityValue = '' //城市选择初始化
      this.cityContainer = []   //城市选择初始化
      let num = this.modelData.capitalValue
      if(num!==''&&num!==0&&num!==1&&num!==8&&num!==21&&num!==31&&num!==32&&num!==33){ //排除直辖市&特别行政区
        this.ordinaryCity = true
        this.specialCity = false
        this.cityContainer = this.capitalContainer[num].children
      }else if(num!==''&&num==0||num==1||num==8||num==21||num==31||num==32||num==33){ //直辖市&特别行政权
        this.ordinaryCity = false
        this.specialCity = true
        this.cityContainer =this.capitalContainer[num].regionName
        this.cityContainerParentId =this.capitalContainer[num].regionCode
      }
    },
    cityChoice(){ //城市选择
      let address = this.modelData.cityValue
      let parentId = ''
      let id = ''
      //判断是否是直辖市等特殊城市
      if(this.specialCity){
        parentId = this.cityContainerParentId
      }else{
        parentId =  this.$refs[address][0].$attrs.parentId;
        id =  this.$refs[address][0].$attrs.regionCode;
      }
      
      if(address!==''){
        this.selecAddress(address,parentId,id)
      }
    },
    selecAddress(address,parentId,id){ //点击列表城市
      if(this.addressName!=address&&address!=='没有搜索到该城市'){
        this.$confirm(`确定切换至 <span style='color:#ffa000;'>${address}</span> ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.search(address,parentId,id)
          this.matchProvince(parentId)
          this.localSet(item.regionName,item.regionCode)
        }).catch(() => {
          this.modelData.cityValue = ''
          this.modelData.specialCity = ''
        })
      }else if(this.addressName==address&&address!=='没有搜索到该城市'){
        this.$router.push({path:`${sessionStorage.getItem('cacheRoute')}`})
      }else if(address==='没有搜索到该城市'){
        this.$message({
          showClose: true,
          message: '没有搜索到该城市',
          type: 'warning'
        })
      }
    },
    getPosition() { //地理编码
      TMap.init().then(T => {
        this.T = T
        this.geocoder = new T.Geocoder(); //实例地理编码对象
        }).catch(error => {
          this.$message({
            center:true,
            message: error,
            type: 'error'
          })
        })
    },
    search(cityName,parentId,id){ //点击城市触发方法
      const tant = this
      this.geocoder.getPoint(cityName,searchResult)
      function searchResult(result){ //获取返回方法
        if(result.getStatus() == 0){
          tant.geocoderData = result.getLocationPoint()
          const addObj = { //创建返回地理信息对象
            // creditArea:'',
            creditCity:cityName, //城市名
            creditLatitude:tant.geocoderData.lng, //经度
            creditLongitude:tant.geocoderData.lat, //纬度
            // creditProvince:'',
            // creditStreet:''
            //添加省和市的cityCode
            cantonProvince:parentId,
            cantonCity:id,
          }
          console.log(sessionStorage.getItem('cacheRoute'))
          sessionStorage.setItem('Address',JSON.stringify(addObj)) //保存
          tant.$router.push({path:sessionStorage.getItem('cacheRoute')}).catch(data => {  })
        }else{
          this.$message({
            center: true,
            message: '地理编码接口错误',
            type: 'error'
          })
        }
      }
      this.matchProvince(parentId)
      this.localSet(cityName,parentId)
    },
    localSet(cityName,parentId){
      this.filterActive.cantonProvince = this.filterActiveKey;
      this.selected.cantonProvince = cityName;
      this.searchInfo.cantonProvince = parentId;
      // this.regionChage(JSON.stringify(this.filterActive))
      let i=0,j=i+1
      if(j=1){
        j++
      }
			this.regionChage(j)
      this.$store.searchInfo = this.searchInfo;
      this.$store.selected = this.selected;
      this.$store.filterActive = this.filterActive;
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));

    },
    nationwide(){ //点击全国
      this.$confirm("确定切换至 <span style='color:#ffa000;'>全国</span> ?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        const addObj = { //创建返回地理信息对象
          creditCity:'全国', //城市名
          creditLatitude:109.59960, //经度
          creditLongitude:33.50475, //纬度
          //全国的话cityCode置空
          cantonProvince: '',
          cantonCity: '',
        }
        sessionStorage.setItem('Address',JSON.stringify(addObj)) //保存
        this.$router.push({path:`${sessionStorage.getItem('cacheRoute')}`})
      }).catch(() => {})
    },
    citySearch(){  //点击搜索按钮触发
      if(this.searchText!==''){
        this.tabelOne = false
        this.tabelTow = false
        this.loading = true
        this.$axios.get(`/epf-cms/regionals/searchcitys?zhCn=${this.searchText}`,{},res=>{
          if(res.code==0&&res.cityList.length!==0){
            this.searchContent = res.cityList
            this.loading = false
            this.tabelOne = true
            this.tabelTow = false
          }
          else if(res.code==0&&res.cityList.length===0){
            this.searchContent = [{zhCn:'没有搜索到该城市'}]
            this.loading = false
            this.tabelOne = true
            this.tabelTow = false
          }
        })
      }else{
        this.$message({
          showClose: true,
          message: '搜索内容不能为空',
          type: 'warning'
        })
      }
    },
    loadAll(){
      return []
    },
    querySearchAsync(queryString,cb) { //autocomplete内容改变触发
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      this.$axios.get(`/epf-cms/regionals/searchcitys?zhCn=${this.searchText}`,{},res=>{ //搜索请求
        if(res.code==0&&res.cityList!==[]){
          this.cityReturn = []
          for(let i = 0;i<res.cityList.length;i++){
            let data = {}
            data.value = res.cityList[i].regionName
            //精确查询的省市的cityCode
            data.parentId = res.cityList[i].parentId
            data.regionCode = res.cityList[i].regionCode
            this.cityReturn.push(data)
          }
          if(res.cityList.length!==0){
            cb(this.cityReturn)
          }else if(res.cityList.length===0){
            cb([{value:'没有搜索到该城市'}])
          }
        }
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) { //选中触发
      let address = item.value
      if(address!=='没有搜索到该城市'){
        this.selecAddress(address,item.parentId,item.regionCode,item.key)
      }else{
        this.searchText = ''
      }
    },
    cancel(){ //取消按钮
      this.tabelOne = false
      this.tabelTow = true
    },
  },
  watch:{
    $route: "getPosition",
  },
 beforeRouteEnter(to,from,next){
   if(to.path == "/CityList"){
     sessionStorage.setItem("cacheRoute",from.path)
     next()
   }
 }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.cityHome_wrap{
  padding-bottom: 40px;
  @include size(1200px,auto);
  margin:0 auto;
  .citylist_pro{
    @include size(100%,auto);
    box-sizing: border-box;
    padding: 24px;
    background: #ffffff;
    .hostCity{
      @include size(100%,50px);
      font-size: 14px;
      color: #666666;
      li{
        display: inline-block;
        margin-right: 20px;
        
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        &:nth-child(2){
          color: var(--Colors);
        }
      }
      .activeCity{
        cursor: pointer;
      }
      .activeCity:hover{
        color: var(--Colors);
      }
      .activeCity:active{
        transform: translateY(1px);
      }
    }
    .citytype{
      color:#666666;
    }
    .cityList{
      margin-top: 40px;
      min-height: 400px;
      table{
      color: #666;
      border: 1px solid #eee;
      .province{
        cursor: pointer;
      }
      .province:hover{
        color: var(--Colors);
      }
      td{
        padding: 10px;
        span{
          text-align: center;
          display: inline-block;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          -khtml-user-select: none;
          user-select: none;
          margin: 5px 10px;
          cursor: pointer;
          transition: all .1s;
        }
        span:hover{
          color: var(--Colors);
        }
        span:active{
          transform: translateY(1px);
        }
      }
      td:nth-child(1){
        font-weight: 600;
        text-align: center;
        background-color: #f3f3f3;
        padding: 0 20px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        white-space:nowrap;
      }
    }
    }
    
  }
}
</style>
