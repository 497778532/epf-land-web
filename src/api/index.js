import axios from "axios";
import apiConfig from "../util/config";
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("token")) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = localStorage.getItem("token");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
import qs from "qs";

const baseURL = apiConfig.baseURL1;

// 标题配置信息
export async function getInformationList() {
  return axios.get(baseURL + "/epf-cms/cms/basics/getInformationList");
}

export async function getBannerMsg() {
  return axios.get(baseURL + "/epf-cms/cmsAdvert/getCmsAdvertList");
}
// 交易大厅-自行交易列表-根据ids查询地块信息
export async function getTSellByIds(id) {
  return axios.get(baseURL + "/epf-landweb/tlandSearch/getTSellByIds", {
    params: {
      id: id
    }
  });
}

// 行政区域、土地用途、流转方式
export async function getSearchDic(code) {
  return axios.get(baseURL + "/epf-landweb/tsell/getSearchDic", {
    params: {
      code: code
    }
  });
}
// 行政区域
export async function getSearchArea(parentId) {
  return axios.get(baseURL + "/epf-cms/regionals/getAreaByCodeOrParentId", {
    params: {
      parentId: parentId
    }
  });
}
// 首页菜单列表接口
export async function getInfoMenuJson(code) {
  return axios.get(baseURL + "/epf-cms/infomenu/getInfoMenuJson", {
    params: {
      code: code
    }
  });
}
// 首页地块信息
export async function getTransfer(transfer) {
  return axios.get(baseURL + "/epf-landweb/tsell/getTransfer", {
    params: {
      circulation: transfer.circulation,
      firstClassUse: transfer.firstClassUse,
      cantonProvince:transfer.cantonProvince,
      cantonCity:transfer.cantonCity,
      // cantonArea:transfer.cantonCity
    }
  });
}

// 根据code获取字典
export async function getDict(code) {
  if ((code = "land_use")) {
    return axios.get(
      baseURL +
        "/epf-landweb/dictionaries/getDictsByCodeOrParentId?code=" +
        code +
        "&parentId=0"
    );
  }
  return axios.get(
    baseURL + "/epf-admin/admin/dict/getDictEbyDictGroup/" + code
  );
}

// 获取需求
export async function getTpurchase(tpurchase) {
  return axios.get(baseURL + "/epf-landweb/tpurchase/getTPurchaseinfo", {
    params: {}
  });
}
//上传组件
export async function upload(tpurchase) {
  return axios.get(baseURL + "/epf-document/document/upload", {
    params: {}
  });
}
// 土地用途
export async function getDictsByCodeOrParentId({ code, parentId }) {
  return axios.get(
    baseURL + "/epf-landweb/dictionaries/getDictsByCodeOrParentId",
    {
      params: {
        code: code,
        parentId: parentId
      }
    }
  );
}
// 合同网签弹框--合同网签遍历土地信息-自行交易列表
export async function getTSellByContract({ token, circulation, page, rows }) {
  return axios.get(baseURL + "/epf-landweb/admin/tsell/getTSellByContract", {
    params: {
      token: token,
      circulation: circulation,
      page: page,
      rows: rows
    }
  });
}
// 合同网签弹框--合同网签遍历土地信息-委托交易列表
export async function getTransGoodsByCirculation({
  token,
  circulation,
  page,
  rows
}) {
  return axios.get(
    baseURL + "/epf-landweb/landweb/transgoods/getTransGoodsByCirculation",
    {
      params: {
        token: token,
        circulation: circulation,
        page: page,
        rows: rows
      }
    }
  );
}
// 合同网签遍历土地信息-自行交易列表-点击确定数据回显
export async function getTSellByContractAndById({ token, id }) {
  return axios.get(
    baseURL + "/epf-landweb/admin/tsell/getTSellByContractAndById",
    {
      params: {
        token: token,
        id: id
      }
    }
  );
}
// 合同网签遍历土地信息-委托交易接口列表-点击确定数据回显
export async function getTransGoodsByCirculationAndById({ token, id }) {
  return axios.get(
    baseURL + "/epf-landweb/landweb/transgoods/getTransGoodsByCirculationAndById",
    {
      params: {
        token: token,
        id: id
      }
    }
  );
}
// 根据区域编号查询模板
export async function getTAreaDocumentRelByAreaCode(areaCode) {
  return axios.get(
    // baseURL + "/epf-contract/areaDocument/getTAreaDocumentRelByAreaCode",
    baseURL + "/epf-landweb/areaDocument/getTAreaDocumentRelByAreaCode",
    {
      params: {
        areaCode: areaCode
      }
    }
  );
}
// 根据币种列表/交易大厅-委托交易详情-申请竞买按钮-竞买申请书数据回显
export async function getApplicationForBidding(targetId) {
  return axios.get(
    baseURL + "/epf-landweb/landweb/transtarget/getApplicationForBidding",
    {
      params: {
        targetId: targetId
      }
    }
  );
}
// 根据币种选择银行
export async function getBankByCurrency({ token, currency, companyId }) {
  return axios.get(baseURL + "/epf-landweb/landweb/transbank/getBankByCurrency", {
    params: {
      token: token,
      currency: currency,
      companyId: companyId
    }
  });
}
// 查看申请详情
export async function getTransLicense({ token, id }) {
  return axios.get(baseURL + "/epf-landweb/admin/getTransLicense", {
    params: {
      token: token,
      id: id
    }
  });
}
// 公告公示列表接口
export async function getNoticeOrResultMoreList({ type, page, rows }) {
  return axios.get(
    // baseURL + "/epf-landweb/landweb/transnotice/getNoticeOrResultMoreList",
    baseURL + "/epf-landweb/landweb/transtarget/transNoticeOrResultList",
    {
      params: {
        type: type,
        page: page,
        rows: rows
      }
    }
  );
}
// 公告详情/变更公告详情接口
export async function getNoticeDetails(noticeId) {
  return axios.get(baseURL + "/epf-landweb/transtargetnotice/getNoticeDetails", {
    params: {
      noticeId: noticeId
    }
  });
}
// 交易大厅-详情页面-变更公告历史记录
export async function getChangeNoticeList(changeNoticeId) {
  return axios.get(baseURL + "/epf-landweb/transtargetnotice/getChangeNoticeList", {
    params: {
      changeNoticeId: changeNoticeId
    }
  });
}
// 成交结果公示详情接口
export async function getPublicity({ targetId }) {
  return axios.get(baseURL + "/epf-landweb/landweb/transtarget/getPublicity", {
    params: {
      targetId: targetId
    }
  });
}
// 地块信息接口
export async function getTransGoodsDetails({ targetId }) {
  return axios.get(baseURL + "/epf-landweb/landweb/transtarget/transGoodsDetails", {
    params: {
      targetId: targetId
    }
  });
}
// 提交线下备案数据
export async function getOfflineFilingcommit({
  landId,
  cantonCode,
  contractFileId,
  remark,
  areaDocRelId
}) {
  // return axios.get(baseURL + "/epf-contract/offlineFiling/commit", {
  return axios.get(baseURL + "/epf-landweb/offlineFiling/commit", {
    params: {
      landId: landId,
      cantonCode: cantonCode,
      contractFileId: contractFileId,
      remark: remark,
      areaDocRelId: areaDocRelId
    }
  });
}
// 线下备案数据保存接口
export async function getOfflineFilingsave({
  landId,
  cantonCode,
  contractFileId,
  remark,
  areaDocRelId
}) {
  // return axios.get(baseURL + "/epf-contract/offlineFiling/save", {
  return axios.get(baseURL + "/epf-landweb/offlineFiling/save", {
    params: {
      landId: landId,
      cantonCode: cantonCode,
      contractFileId: contractFileId,
      remark: remark,
      areaDocRelId: areaDocRelId
    }
  });
}
