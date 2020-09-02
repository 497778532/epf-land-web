import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import homeland from './modules/homeland'
import region from './modules/region'
// 首页index
import index from '@/page/content/home/store'
import webListMsg from '@/web/store'
import onlineSign from '@/page/content/home/pop/contractSignRecord/onlineSign/store'
// import underSign from '@/page/content/home/pop/contractSignRecord/underSign/store'
import homePop from '@/page/content/home/pop/store'
// import containerStore from '@/containers/store'
// 竞买
import competeBuy from '@/page/content/trade/competeBuy/store'

// import componentStore from '@/components/store'
// 交易大厅
// import TradingHall from '@/page/content/trade/detail/store'
import TradingHall from '@/page/content/trade/store.js'
// 公告公示
import publicNotice from '@/page/content/trade/publicNotice/store'
export default new Vuex.Store({
    modules: {
        webListMsg,
        index,
        // 首页
        homeland,
        // 行政区域
        region,
        // 线上网签备案
        onlineSign,
        // underSign,
        homePop,

        TradingHall,
        // containerStore,
        publicNotice,
        // componentStore
        // 竞买
        competeBuy,

    }
})