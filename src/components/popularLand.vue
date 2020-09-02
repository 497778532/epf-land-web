<template>
  <div class="tdzr_right_bot">
    <div class="tdzr_right_bot_tit">
      <span>热门推荐</span>
    </div>
    <div
      class="tdzr_right_list"
      style="min-height:170px;"
      v-loading="loading"
      element-loading-text="拼命加载中..."
      element-loading-background="rgba(251, 251, 251, 0.9)"
    >
      <div
        class="right_list"
        v-for="(item,index) in popularData"
        :key="index"
        @click="openDetail(item.id)"
      >
        <div class="right_list_img">
          <img :src="baseUrl + item.img" alt :onerror="defaultImg" />
          <div
            class="mainlist_cont_top_personal"
            v-if="item.landTypeName"
          >{{item.landTypeName?item.landTypeName:''}}</div>
          <div v-else></div>
        </div>
        <div class="mainlist_cont_bot">
          <h4>{{item.title}}</h4>
          <span class="mainlist_cont_bot_active">{{item.price?Division(item.price) + ' 万元':'面议'}}</span>
          <h5>
            <span>
              <img src="../../../assets/image/icon-area.png" alt style="margin-left:-2px;" />
              {{item.area}}平方米
            </span>
            <span class="fr">
              <img src="../../../assets/image/icon-time.png" alt />
              {{item.years}}年
            </span>
          </h5>
          <p v-if="item.cantonProvinceName||item.cantonCityName||item.cantonAreaName">
            <img src="../../../assets/image/icon-map.png" alt style="margin-left:-5px;" />
            {{item.cantonProvinceName}}-{{item.cantonCityName}}-{{item.cantonAreaName}}
          </p>
          <p v-else></p>
        </div>
      </div>
      <div v-if="popularData == [] || popularData == ''" style="text-align:center;">
        <img
          style="margin-top:10px;margin-bottom:10px;height:190px;"
          src="../../../assets/image/dataNone.png"
        />
      </div>
    </div>
  </div>
</template>