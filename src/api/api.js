
const BASEURL =""
// const EPF_ADMIN_BASE = BASEURL+"/epf-admin"
const EPF_ADMIN_BASE = BASEURL+"/epf-cms"
const EPF_DOCUMENT_BASE = BASEURL+"/epf-document"
const EPF_AUTH_BASE = BASEURL+"/epf-auth"
const EPF_ACTIVITI_BASE = BASEURL+"/epf-activiti"
const EPF_CMS_BASE = BASEURL+"/epf-cms"
const EPF_GENERATOR_BASE = BASEURL+"/epf-generator"
const EPF_SEARCH_BASE = BASEURL+"/"
const EPF_SUPPLY_BASE = BASEURL+"/epf-landweb"
const EPF_TRANSFER_BASE = BASEURL+"/epf-transfer"
const EPF_TRADE_BASE = BASEURL+"/epf-trade"
const EPF_TRADEENGINE_BASE = BASEURL+"/epf-tradeengine"
const EPF_SUP_BASE = BASEURL+"/epf-monitor"
// const EPF_TRACT_BASE = BASEURL+"/epf-contract"
const EPF_TRACT_BASE = BASEURL+"/epf-landweb"
const EPF_LAND_BASE = BASEURL+"/epf-landweb"

const ADMIN = "/admin"
const DOCUMENT = "/document"
const EPFDOCUMENT = "/epf-document"
// const SUPPLY = "/epf-supply"
const CMS = "/cms"

// ADMIN
const EPF_ADMIN = {
  TSELL:{
    // /epf-supply/admin/tsell/getTSellForBack
    TSELL_FOR_BACK:EPF_SUPPLY_BASE+ADMIN+'/tsell/getTSellForBack',// 获取供给信息列表
  },

  CAPTCHE:EPF_ADMIN_BASE+'/captcha.jpg',
  LOGIN:EPF_ADMIN_BASE+'/login',
  LOG:EPF_ADMIN_BASE+'/log/getLog',
  GET_LOG_JSON:EPF_ADMIN_BASE+'/log/getLogJson',
  DELETE_LOG:EPF_ADMIN_BASE+'/log/deleteLog',
  LOG_SHOW:EPF_ADMIN_BASE+'/log/logShow',


  REGIONAL:{
    CODE:EPF_ADMIN_BASE+ADMIN+'/regionals/getAreasByCode',
    TREE:EPF_ADMIN_BASE+ADMIN+'/regionals/getRegionalTree',
    TREES:EPF_ADMIN_BASE+ADMIN+'/regionals/get-regional-trees',
    ADD:EPF_ADMIN_BASE+ADMIN+'/regionals/add',
    GET:EPF_ADMIN_BASE+'/regionals/get',
    EDIT:EPF_ADMIN_BASE+ADMIN+'/regionals/edit',
    GET_KEY:EPF_ADMIN_BASE+ADMIN+'/regionals/getDictKey',
    GET_TREE:EPF_ADMIN_BASE+ADMIN+'/regionals/queryTrees',
    DEL:EPF_ADMIN_BASE+ADMIN+'/regionals/delete',
  },
  ORG:{
    ADD:EPF_ADMIN_BASE+'/org/add',
    EDIT:EPF_ADMIN_BASE+'/org/edit',
    QUERY:EPF_ADMIN_BASE+'/org/get',
    INIT:EPF_ADMIN_BASE+'/org/initKey',
    TREE:EPF_ADMIN_BASE+'/org/queryTree',
    DELETE:EPF_ADMIN_BASE+'/org/delete',
    GET_ORG:EPF_ADMIN_BASE+'/org/getOrg?id=',
    SAVE:EPF_ADMIN_BASE+'/org/save',
    ALLORG:EPF_ADMIN_BASE+'/org/getallOrg',
    GET_ORG_TREE:EPF_ADMIN_BASE+'/org/getOrgTreeForTree',
    CASCADER:EPF_ADMIN_BASE+'/org/queryCascader',
    ORG_AREAS:EPF_ADMIN_BASE+'/org/getOrgsByareas',
    GET_ORGTREE_FORTREE:EPF_ADMIN_BASE+ADMIN+'/org/getOrgTreeForTree',
    GET_OTRGS:EPF_ADMIN_BASE+ADMIN+'/org/getOrgsByareas',
  },
  TENANTRY:{
    ITEMS:EPF_ADMIN_BASE+ADMIN+'/Tenantry/tenantItems',
    GET_JSON:EPF_ADMIN_BASE+ADMIN+'/Tenantry/getTenantryJson',
    DELETE:EPF_ADMIN_BASE+ADMIN+'/Tenantry/delete',
    ADD:EPF_ADMIN_BASE+ADMIN+'/Tenantry/add',
    GET_LIST:EPF_ADMIN_BASE+ADMIN+'/Tenantry/getOwnTenantryList',
  },
  USER:{
    GET_JSON:EPF_ADMIN_BASE+ADMIN+'/user/getAllUserJson',
    GET_USER:EPF_ADMIN_BASE+ADMIN+'/user/getUser',
    ADD:EPF_ADMIN_BASE+'/user/add',
    EDIT:EPF_ADMIN_BASE+'/user/edit',
    PWD:EPF_ADMIN_BASE+ADMIN+'/user/initPwd',
    DEL_JSON:EPF_ADMIN_BASE+ADMIN+'/user/deleteUserJson',
    MANAGE:EPF_ADMIN_BASE+ADMIN+'/user/getUserManage',
    TCODE:EPF_ADMIN_BASE+ADMIN+'/user/usertcode',
    GET_AND:EPF_ADMIN_BASE+'/user/getUserAndManages',
    INFO:EPF_ADMIN_BASE+ADMIN+'/user/geUserInfo',
    INIT:EPF_ADMIN_BASE+'/user/init',
    DELETES:EPF_ADMIN_BASE+'/user/deletes',
    QUERY_ALL:EPF_ADMIN_BASE+'/user/queryAll',
    ADD_USER:EPF_ADMIN_BASE+ADMIN+'/user/addUser',
    ADD_EDIT:EPF_ADMIN_BASE+ADMIN+'/user/editUser',
    USER:EPF_ADMIN_BASE+ADMIN+'/user/getUserByOrgId',
    ORG:EPF_ADMIN_BASE+ADMIN+'/user/getUserAndOrgByRoleid',
  },
  USER_AUTH:{
    GET_JSON:EPF_ADMIN_BASE+ADMIN+'/user-autheniton/getsysreuser-authenitonjson',
    GET_ID:EPF_ADMIN_BASE+ADMIN+'/user-autheniton/getAuthenticationByid',
    GET_CATION:EPF_ADMIN_BASE+ADMIN+'/user-autheniton/todoinguser-authentication',
  },
  // 权限模块
  PERMISSION:{
    ADD:EPF_ADMIN_BASE+'/permission/add',// 新增保存权限数据的接口
    EDIT:EPF_ADMIN_BASE+'/permission/edit',// 编辑权限数据的接口
    DELETE:EPF_ADMIN_BASE+'/permission/deletes',// 删除权限数据的接口
    GET_ALL:EPF_ADMIN_BASE+'/permission/getAll',// 删除权限数据的接口
    GET:EPF_ADMIN_BASE+'/permission/get',// 删除权限数据的接口
    INIT_PDATA:EPF_ADMIN_BASE+'/permission/initPageData',
    GET_TREE:EPF_ADMIN_BASE+'/permission/getTree',
    INIT_INDEX:EPF_ADMIN_BASE+'/permission/initIndex',
    CASCADER:EPF_ADMIN_BASE+'/permission/cascader',
  },
  // 资源管理模块
  RESOURCE:{
    ADD:EPF_ADMIN_BASE+'/resource/add',// 新增保存权限数据的接口
    EDIT:EPF_ADMIN_BASE+'/resource/edit',// 编辑权限数据的接口
    DELETE:EPF_ADMIN_BASE+'/resource/deletes',// 删除权限数据的接口
    GET_ALL:EPF_ADMIN_BASE+'/resource/getAll',// 删除权限数据的接口
    GET:EPF_ADMIN_BASE+'/resource/get',// 删除权限数据的接口
    INIT_PDATA:EPF_ADMIN_BASE+'/resource/initPageData',
    GET_TREE:EPF_ADMIN_BASE+'/resource/getTree',

  },
  MENU:{
    ALL_LIST:EPF_ADMIN_BASE+ADMIN+'/menu/getAllMenuList',
    SAVE:EPF_ADMIN_BASE+ADMIN+'/menu/save',
    DELETE:EPF_ADMIN_BASE+ADMIN+'/menu/delete',
    UPDATE:EPF_ADMIN_BASE+ADMIN+'/menu/update',
    LIST:EPF_ADMIN_BASE+ADMIN+'/menu/getMenuList',
  },
  DOCUMENT:{
    UPLOAD: EPFDOCUMENT+DOCUMENT+'/upload',
    QUERY: EPFDOCUMENT+DOCUMENT+'/queryById',
    DELETE: EPFDOCUMENT+DOCUMENT+'/deleteById',
    FOLDER: EPFDOCUMENT+DOCUMENT+'/deleteByFolder'
  },
  ROLE:{
    GET_ALL:EPF_ADMIN_BASE+'/role/getAll',
    ADD:EPF_ADMIN_BASE+'/role/add',
    GET:EPF_ADMIN_BASE+'/role/get',
    EDIT:EPF_ADMIN_BASE+'/role/edit',
    DELS:EPF_ADMIN_BASE+'/role/dels',
    POWER:EPF_ADMIN_BASE+'/role/setPower',
    PERS:EPF_ADMIN_BASE+'/role/getPers',
    LIST:EPF_ADMIN_BASE+ADMIN+'/role/getUserRoleList',
    MENU:EPF_ADMIN_BASE+'/role/setMenusByRoleId',
    CONFIG:EPF_ADMIN_BASE+'/role/getAuthorizationConfig',
    LOAD:EPF_ADMIN_BASE+'/role/roleLoadOrgUser',
    TION:EPF_ADMIN_BASE+'/role/authorization',
    JOSN:EPF_ADMIN_BASE+ADMIN+'/role/getRoleJson',
    GET_ROLE:EPF_ADMIN_BASE+ADMIN+'/role/getRole',
    ALL:EPF_ADMIN_BASE+ADMIN+'/role/getRoleAllList',
  },
  U_ROLE:{
    OWNER:EPF_ADMIN_BASE+ADMIN+'/userRole/queryOwnersByRoleId',
    ORG:EPF_ADMIN_BASE+ADMIN+'/userRole/editOrgUserByRole',
    FIT:EPF_ADMIN_BASE+ADMIN+'/userRole/setuserfitRoleByids',
    POLE:EPF_ADMIN_BASE+ADMIN+'/userRole/setRoleByOwner',
  },
  EDIT_SYS_USER_MANEGE:EPF_ADMIN_BASE+ADMIN+'/sysusermanage/editSysUserManage',
  UPDATE_ROLEMENU:EPF_ADMIN_BASE+ADMIN+'/relpermission/updateRolemenu',

  DICTION:{
    GET_DIC:EPF_ADMIN_BASE+ADMIN+'/dict/getDictEbyDictGroup/',
    SELECT:EPF_ADMIN_BASE+ADMIN+'/dict/selectGroup',
    GET_TREE:EPF_ADMIN_BASE+ADMIN+'/dict/getTreeTableDatas',
    CLEAN:EPF_ADMIN_BASE+ADMIN+'/dict/cleanRedis',
    ADD:EPF_ADMIN_BASE+ADMIN+'/dict/addDictionaries',
    DELT:EPF_ADMIN_BASE+ADMIN+'/dict/deleteDictionaries',
    EDIT:EPF_ADMIN_BASE+ADMIN+'/dict/editDictionaries',
    INFO:EPF_ADMIN_BASE+ADMIN+'/dict/info/',
    SYS_TYPE:EPF_ADMIN_BASE+ADMIN+'/dict/getDictEbyDictGroup/system_business_type',
  },
  DICT_GROUP:{
    DEL:EPF_ADMIN_BASE+ADMIN+'/dictGroup/deleteDictGroup',
    ADD:EPF_ADMIN_BASE+ADMIN+'/dictGroup/addDictGroup',
    EDI:EPF_ADMIN_BASE+ADMIN+'/dictGroup/editDictGroup',
    INOF:EPF_ADMIN_BASE+ADMIN+'/dictGroup/info/',
  },
  SYS_DATE:{
    QUERY:EPF_ADMIN_BASE+'/sysdatemanage/querySysdatemanagelist',
    ADD:EPF_ADMIN_BASE+'/sysdatemanage/addsysdatemanage',
    DEL_SYS:EPF_ADMIN_BASE+'/sysdatemanage/delsysdatemanagebyyearname',
    EDIT:EPF_ADMIN_BASE+'/sysdatemanage/editsysdatemanage',
    DELETE:EPF_ADMIN_BASE+'/sysdatemanage/deletesysdatemanage',
    JSON:EPF_ADMIN_BASE+'/sysdatemanage/getsysdatemanageJson',
    MANAGE:EPF_ADMIN_BASE+'/sysdatemanage/getsysdatemanage',
  },
  MSG:{
    REF:EPF_CMS_BASE+ADMIN+'/msgmessage/deleteMsgbyrefId',
    OWN:EPF_ADMIN_BASE+ADMIN+'/msgmessage/getOwnListSystem',
    ADD:EPF_ADMIN_BASE+ADMIN+'/msgmessage/addMsgMessage',
    EDIT:EPF_ADMIN_BASE+ADMIN+'/msgmessage/editMsgMessage',
    DEL:EPF_ADMIN_BASE+ADMIN+'/msgmessage/deleteMsgMessage',
    LIST:EPF_ADMIN_BASE+ADMIN+'/msgmessage/getMsgMessagelist',
    GET:EPF_ADMIN_BASE+ADMIN+'/msgmessage/getMsgMessage',
  },
  GET_CALL_INFO_BY_ID:EPF_ADMIN_BASE+'/microService/getCallInfoById',
  GET_ALL_MICRO_SERVICE:EPF_ADMIN_BASE+'/microService/getAllMicroService',
  DELETE_INFO:EPF_ADMIN_BASE+'/microService/deleteInfo',
  MODIFY_INFO:EPF_ADMIN_BASE+'/microService/modifyInfo',
  UPDATE_RELA:EPF_ADMIN_BASE+'/microService/updateRela',


  ADD_SYS_MSG_TEMPLATE:EPF_ADMIN_BASE+'/sysmsgtemplate/addSysMsgTemplate',
  EDIT_SYS_MSG_TEMPLATE:EPF_ADMIN_BASE+'/sysmsgtemplate/editSysMsgTemplate',
  DELETE_SYS_MSG_TEMPLATE:EPF_ADMIN_BASE+'/sysmsgtemplate/deleteSysMsgTemplate',
  GET_SYS_MSG_TEMPLATE_JSON:EPF_ADMIN_BASE+'/sysmsgtemplate/getSysMsgTemplateJson',
  GET_SYS_MSG_TEMPLATE:EPF_ADMIN_BASE+'/sysmsgtemplate/getSysMsgTemplate',
  TOKEN:EPF_ADMIN_BASE+'/jwt/token',
  GET_MOUTH_LIST:EPF_ADMIN_BASE+'/monthreport-message/message-sender',
  GET_DICTION:EPF_ADMIN_BASE+ADMIN+'/dict/getDictsByCodeOrParentId?code=account_monthy_report_status&parentId=0',
  SYS_CODE:EPF_ADMIN_BASE+ADMIN+'/dict/getsysdictionariesbycode',
  GET_LIST:EPF_ADMIN_BASE+'/userOrganizations/getList',
  //门户用户
  SYS_SEMBER:{
    QUERY:EPF_ADMIN_BASE+'/sysSember/querySysGatewayUserPage',
    REGIONALTREE:EPF_ADMIN_BASE+'/sysSember/getRegionalDateTree',
  },
}

// AUTH
const EPF_AUTH = {
  TOKEN:EPF_AUTH_BASE+'/jwt/token',
}

// DONCUMENT
const EPF_DOCUMENT = {
  IMAGESRC:EPF_DOCUMENT_BASE+DOCUMENT+'/downloadById?id=',
  UPLOAD:EPF_DOCUMENT_BASE+DOCUMENT+'/upload',
  DELETE_FOL:EPF_DOCUMENT_BASE+'/document/deleteByFolder',
  FOLDER:{
    TREE:EPF_DOCUMENT_BASE+ADMIN+'/docfolder/getAllFolderTree',
    DELE:EPF_DOCUMENT_BASE+ADMIN+'/docfolder/delete',
    SAVE:EPF_DOCUMENT_BASE+ADMIN+'/docfolder/save',
  },
  DOCINFO:{
    INFO:EPF_DOCUMENT_BASE+'/docdocumentinfo/getDocInfo',
    DEL_FOL:EPF_DOCUMENT_BASE+'/docdocumentinfo/deleteFolderDoc',
    MOVE:EPF_DOCUMENT_BASE+'/docdocumentinfo/moveFolderDoc',
    RENAMED:EPF_DOCUMENT_BASE+'/docdocumentinfo/renamedDoc',
    SORT:EPF_DOCUMENT_BASE+'/docdocumentinfo/sortDoc',
    DEL_ID:EPF_DOCUMENT_BASE+'/docdocumentinfo/deleteFolderDocByIds',
    SAVE_FOL:EPF_DOCUMENT_BASE+'/docdocumentinfo/saveFolderDoc',
  },
  DOCTL:{
    SAVE:EPF_DOCUMENT_BASE+'/docTemplete/save',
    GET_TEMPLETE_TREE:EPF_DOCUMENT_BASE+'/docTemplete/getTempleteTree',
    GET_INFO:EPF_DOCUMENT_BASE+'/docTemplete/getInfo',
    UPDATE:EPF_DOCUMENT_BASE+'/docTemplete/update',
    DELETE:EPF_DOCUMENT_BASE+'/docTemplete/delete',
    GET_FILES_BY_GROPU_ID:EPF_DOCUMENT_BASE+'/docTemplete/getFilesByGropuId',
    DOC_TEMPLETE:EPF_DOCUMENT_BASE+'/docTemplete/getTempleteTreeByArea'
  },
}

// ACTIVITI
const EPF_ACTIVITI = {
  GET_BPM_RE_PROCESS_JSON:EPF_ACTIVITI_BASE+'/admin/process/getBpmReProcessJson',
  WFB:{
    QUERY:EPF_ACTIVITI_BASE+'/wfbusproconf/queryProcessTree',
    ADD:EPF_ACTIVITI_BASE+'/wfbusproconf/addWfBusproConf',
    EDI:EPF_ACTIVITI_BASE+'/wfbusproconf/editWfBusproConf',
    DET:EPF_ACTIVITI_BASE+'/wfbusproconf/deleteWfBusproConf',
    JSON:EPF_ACTIVITI_BASE+'/wfbusproconf/getWfBusproConfJson',
    GET:EPF_ACTIVITI_BASE+'/wfbusproconf/getWfBusproConf',
  },
  MODEL:{
    DEPLOY:EPF_ACTIVITI_BASE+'/act/model/deployModel',
    LIST:EPF_ACTIVITI_BASE+'/act/model/list',
    CREATE_MODEL:EPF_ACTIVITI_BASE+'/act/model/createModel',
    DELETE_MODEL:EPF_ACTIVITI_BASE+'/act/model/deleteModel',
  },
  ADMIN:{
    ADD:EPF_ACTIVITI_BASE+ADMIN+'/taskevent/addTaskEvent',
    GET_JSON:EPF_ACTIVITI_BASE+ADMIN+'/taskevent/getTaskEventJson',
    DELETE:EPF_ACTIVITI_BASE+ADMIN+'/taskevent/deleteTaskEvent',
    PROCE:EPF_ACTIVITI_BASE+ADMIN+'/process/addProcess',
    DELE:EPF_ACTIVITI_BASE+ADMIN+'/process/deleteProcess',
  },
  TASK:{
    NODE:EPF_ACTIVITI_BASE+'/act/task/getTaskNodeByNodeId',
    LIST:EPF_ACTIVITI_BASE+'/act/task/getTaskNodeList',
    JSON:EPF_ACTIVITI_BASE+'/act/task/getTaskNodeJson',
    ADD:EPF_ACTIVITI_BASE+'/act/task/addTaskNode',
    QUERY:EPF_ACTIVITI_BASE+'/act/task/queryActWaitingTask',
    NEXT:EPF_ACTIVITI_BASE+'/act/task/getPvmNextNodeId',
    TASK_ID:EPF_ACTIVITI_BASE+'/act/task/queryActTaskByBusinessId',
    FINISH:EPF_ACTIVITI_BASE+'/act/task/queryFinishTasksByBusinessId',
    FLOW:EPF_ACTIVITI_BASE+'/act/task/histoicFlow',
    COMMENT:EPF_ACTIVITI_BASE+'/act/task/queryFinishTasksInfoByBusinessId',
    INFO:EPF_ACTIVITI_BASE+'/act/task/getNextTaskInfo',
    COMPLETE:EPF_ACTIVITI_BASE+'/act/task/complete'
  },

}

//CMS
const EPF_CMS = {
  GET_INFOR_MATION_LIST:EPF_CMS_BASE+CMS+'/basics/getInformationList',
  UP_DATA_INFOR_MATION:EPF_CMS_BASE+CMS+'/basics/updateInformation',
  GET_ADVERT:EPF_CMS_BASE+ADMIN+'/advert/getAdvert',
  LIST:EPF_CMS_BASE+'/infomenu/getInfoMenuList',
  CODE:EPF_CMS_BASE+'/info/getInfoBycode',
  USE:EPF_CMS_BASE+'/cmsAdvert/getCmsAdvertByTypeUse',
  INFO:EPF_CMS_BASE+'/info/getInfo',
  JSON:EPF_CMS_BASE+'/info/getInfoJson',
}

const EPF_SUP = {
  CLASS:EPF_SUP_BASE+'/monitor/moniSellPurchAnalyse/queryClassUseCompare',
  TRAST:EPF_SUP_BASE+'/monitor/trans/queryUseContrast',
  TIME:EPF_SUP_BASE+'/monitor/trans/queryGroupByTimeOfFirstClassUse',
}

//GENERATOR
const EPF_GENERATOR = {
  LIST_JSON:EPF_GENERATOR_BASE+'/sys/generator/listJson',

}

//SEARCH
const EPF_SEARCH = {
  SEARCH_INIT:EPF_SEARCH_BASE+'/es/esLand/searchInit?index=',
}

//SUPPLY
const EPF_SUPPLY = {
  DIC:{
    GET:EPF_SUPPLY_BASE+'/dictionaries/getDictsByCodeOrParentId',
  },
  INDEX:EPF_SUPPLY_BASE+'/tpurchase/getIndexTPurchaseList',
  TITU:EPF_SUPPLY_BASE+'/tserveinstitution/queryTServeInstitutionList',
  SELL:EPF_SUPPLY_BASE+ADMIN+'/tsell/getMatchTSell',
  GETTP:EPF_SUPPLY_BASE+ADMIN+'/tpurchase/getMyTPurchase',
  DELTP:EPF_SUPPLY_BASE+ADMIN+'/tpurchase/deleteTPurchase',
  GROUP:EPF_SUPPLY_BASE+'/dictionaries/getDictEbyDictGroup/',
}

//LEDGER
const EPF_LEDGER = {
  COMM:{
    SYS_CANTONS:EPF_TRANSFER_BASE+'/syscanton/getSysCantons',
  },
  SCHEME_IMP:{
    JSON:EPF_TRANSFER_BASE+'/bookschedulemanage/getBookScheduleManageJson',
    ADD:EPF_TRANSFER_BASE+'/bookschedulemanage/addBookScheduleManage',
    EDIT:EPF_TRANSFER_BASE+'/bookschedulemanage/editBookScheduleManage',
    DELETE:EPF_TRANSFER_BASE+'/bookschedulemanage/deleteBookScheduleManage',
    XMBS_JSON:EPF_TRANSFER_BASE+'/bookreclamationmanage/getBookReclamationManageJson',
    MANAGE:EPF_TRANSFER_BASE+'/bookschedulemanage/getBookScheduleManage',
  },
  SAVE_INDICATOR:{
    ADD:EPF_TRANSFER_BASE+'/booktargettransmanage/addBookTargetTransManage',
    EDIT:EPF_TRANSFER_BASE+'/booktargettransmanage/editBookTargetTransManage',
    DELETE:EPF_TRANSFER_BASE+'/booktargettransmanage/deleteBookTargetTransManage',
    JSON:EPF_TRANSFER_BASE+'/booktargettransmanage/getBookTargetTransManageJson',
    MANAGE:EPF_TRANSFER_BASE+'/booktargettransmanage/getBookTargetTransManage'
  }
}
//transfer
const EPF_TRANSFER = {
  POST_BOOK_NEW:EPF_TRANSFER_BASE+'/bookreporttotal/getBookReportTotalJsonNew',
  GRATER_ID:EPF_TRANSFER_BASE+BASEURL+'/createId',
  EDIT_BOOK:EPF_TRANSFER_BASE+'/bookreporttotal/editBookReportTotal',
  COPY_BOOK:EPF_TRANSFER_BASE+'/bookreporttotal/copyBookReportTotal',
  UPDATE_BOOK:EPF_TRANSFER_BASE+'/bookreporttotal/updateBookMonthyReportTotalById',
  DELETE_BOOK:EPF_TRANSFER_BASE+'/bookmonthyreport/deleteReportById',
  GET_BOOK_MONTHY:EPF_TRANSFER_BASE+'bookmonthyreport/getBookMonthyReport',
  EDIT_BOOK_MONTHY:EPF_TRANSFER_BASE+'/bookmonthyreport/editBookMonthyReport',
}

// SUPPLYDEMAND
const EPF_SUPPLYDEMAND = {
  COMM:{
    CREATE_ID:EPF_TRANSFER_BASE+BASEURL+'/createId',
    TREE:EPF_DOCUMENT_BASE+'/docTemplete/getTempleteTreeByArea',
    DELETE:EPF_TRANSFER_BASE+'/transkeeprecord/deletLicenseRecord',
    JSON:EPF_TRANSFER_BASE+'/transkeeprecord/getLicenseRecordJson',
    RECORD:EPF_TRANSFER_BASE+'/transkeeprecord/getTransKeepRecord',
    CHECK_NO:EPF_TRANSFER_BASE+'/transkeeprecord/checkNo',
  },
  DEMAND:{
    LICENSE:EPF_TRANSFER_BASE+ '/translicense/getTransLicense',
    ADD:EPF_TRANSFER_BASE+'/translicense/addTransLicense',
  },
  SUPPLY:{
    JSON:EPF_TRANSFER_BASE+'/bookreclamationmanage/getBookReclamationManageJson',
    ADD:EPF_TRANSFER_BASE+'/transkeeprecord/addTransKeepRecord',
  },
  TRANS_KEEP_RECORD:{
    JSON:EPF_TRANSFER_BASE+'/transkeeprecord/getTransKeepRecordJson',
    SAVE:EPF_TRANSFER_BASE+'/transkeeprecord/saveLicenseRecord',
  },
  TRANSLICENSE:{
    JSON:EPF_TRANSFER_BASE+'/translicense/getTransLicenseJson',
  },
  RECORD_MANAGE:{
    JSON:EPF_TRANSFER_BASE+'/bookreclamationmanage/getBookReclamationManageJson',
    MANAGE_XMBSM:EPF_TRANSFER_BASE+'/booktargettransmanage/getBookTargetTransManageByxmbsm',
    X_CODE:EPF_TRANSFER_BASE+'/bookotheradjust/getBookOtherAdjustByZcodeXcode',
    DONE_XMBSM:EPF_TRANSFER_BASE+'/transnoticedone/getTransNoticeDoneByXmbsm',
    PUB_NO:EPF_TRANSFER_BASE+'/bookotheradjust/transcontract/getTranscontractBypubNo',
    CONTRACT_NO:EPF_TRANSFER_BASE+'/transbillapply/getApplyBillByContractNo'
  }
}

const EPF_NOTICE = {
  COMM:{
    CANTONS:EPF_TRANSFER_BASE+'/syscanton/getSysCantons',
    GET_ORG:EPF_ADMIN_BASE+ADMIN+'/org/getOrg'
  },
  PRE_NOTICE:{
    MENU_LIST:EPF_CMS_BASE+ADMIN+'/infomenu/getInfoMenuList',
    GET_INFO:EPF_CMS_BASE+ADMIN+'/info/getInfo',
    GET_JSON:EPF_CMS_BASE+ADMIN+'/info/getInfoJson',
    DEL_INFO:EPF_CMS_BASE+ADMIN+'/info/deleteInfo',
    SEND_MSG:EPF_CMS_BASE+ADMIN+'/info/infosendmsg',
    EDIT_INFO2:EPF_CMS_BASE+ADMIN+'/info/editInfo2',

    EDIT_INFO:EPF_CMS_BASE+ADMIN+'/info/editInfo',

  },
  AGREEMENT:{
    STATUS_ID:EPF_TRANSFER_BASE+'/transnotice/editNoticeStatusById',
    AGREE_NOTICE:EPF_TRANSFER_BASE+'/transnotice/addDealAgreementNotice',
    DEL_NOTICE:EPF_TRANSFER_BASE+'/transnotice/deleteTransNotice',
    JSON:EPF_TRANSFER_BASE+'/transnotice/getDealAgreementNoticeJson',
    UPDATE:EPF_TRANSFER_BASE+'/transnotice/updateTerminationTransNotice',
  },
  SENIORTY:{
    NOTICE_LIST:EPF_TRANSFER_BASE+'/transnotice/getNoticeExamineList',
    AUDIT:{
      APPLY_ID:EPF_TRANSFER_BASE+'/transapplicationnotice/auditApplyStatusById',
      APPLY_LIST:EPF_TRANSFER_BASE+'/transapplicationnotice/getApplicationList',
      APPLY_NOTICE:EPF_TRANSFER_BASE+'/transapplicationnotice/getTransApplicationNotice'

    }
  },
  NOTICE:{
    PRICE:EPF_TRANSFER_BASE+'/dictionaries/getDictEbyDictGroup/county_base_price',
    GET_NOTICE:EPF_TRANSFER_BASE+'/transnotice/getTransNotice',
    MERGE:EPF_DOCUMENT_BASE+'/docTemplete/mergeTemplete',
    LIST:EPF_TRANSFER_BASE+'/transnotice/getGoodsOrLinceseList',
    ADD:EPF_TRANSFER_BASE+'/transnotice/addTransNotice',
    EDIT:EPF_TRANSFER_BASE+'/transnotice/editTransNotice',
    EDIT_ID:EPF_TRANSFER_BASE+'/transnotice/editNoticeStatusById',
    AUDIT_ID:EPF_TRANSFER_BASE+'/transnotice/auditNoticeStatusById',
    DELETE:EPF_TRANSFER_BASE+'/transnotice/deleteTransNotice',
    JSON:EPF_TRANSFER_BASE+'/transnotice/getTransNoticeJson',
  }
}

const EPF_TRACT = {
  AGRE:EPF_TRACT_BASE+'/transContract/agreementList',
}

//DEAL 公示管理
const EPF_DEAL = {
  STATUS:EPF_TRANSFER_BASE+'/transnoticedone/updateDataStatus',
  JSON:EPF_TRANSFER_BASE+'/transnoticedone/getTransNoticeDoneJson',
  DONE:EPF_TRANSFER_BASE+'/transnoticedone/getTransNoticeDone',
  FROZEN:EPF_TRANSFER_BASE+'/transnoticefrozen/deleteTransNoticeFrozen',
  FROZEN_JSON:EPF_TRANSFER_BASE+'/transnoticefrozen/getTransNoticeFrozenJson',
  NOTICE_FROZEN:EPF_TRANSFER_BASE+'/transnoticefrozen/getTransNoticeFrozen',
  ADD_NOTICE_FROZEN:EPF_TRANSFER_BASE+'/transnoticefrozen/addTransNoticeFrozen',
  FROZEN_STATUS:EPF_TRANSFER_BASE+'/transnoticefrozen/updateTransNoticeFrozentostatus',
  DONE_JSON:EPF_TRANSFER_BASE+'/transnoticedone/getdealtTransNoticeDoneJson',
  READY_JSON:EPF_TRANSFER_BASE+'/transnoticedone/getalreadyTransNoticeDoneJson',
  APPROVE_JSON:EPF_TRANSFER_BASE+'/transcontract/getTransContractApproveJson',
  COMMIT:EPF_TRANSFER_BASE+'/transcontract/runbackAuditCommit',
  USER_LEVEL:EPF_TRANSFER_BASE+'/syscanton/getUserLevel',
  CONTRACT_JSON:EPF_TRANSFER_BASE+'/transcontract/getTransContractJson',
  ADD:{
    ORG_ID:EPF_ADMIN_BASE+ADMIN+ '/user/getAllUserForOrgId',
    DONE:EPF_TRANSFER_BASE+'/transnoticedone/addTransNoticeDone',
    LIST:EPF_TRANSFER_BASE+'/transnoticedone/getTargetOverList',
    REG:EPF_ADMIN_BASE+ADMIN+'/regionals/getRegional',
    NUMBER:EPF_TRANSFER_BASE+'/translicense/getTransLicenseByentrustmentNumber',
    BY_NO:EPF_TRANSFER_BASE+'/transkeeprecord/getTransKeepRecTgByNo',
    CODE:EPF_TRANSFER_BASE+'/home/getsysdictionariesbycode'
  },
  DETAIL:{
    GEN_INFO:EPF_TRANSFER_BASE+'/transcontract/generatesInfo',
    GET_CONTRACT:EPF_TRANSFER_BASE+'/transcontract/getTransContract',
    EDIT_CONTRACT:EPF_TRANSFER_BASE+'/transcontract/editTransContract',
    CONTRACT_STATUS:EPF_TRANSFER_BASE+'/transcontract/upateTransContractStatus',
    CONTRACT_PASS:EPF_TRANSFER_BASE+'/transcontract/upateTransContractPass',
    NOTICE_NO:EPF_TRANSFER_BASE+'/transnoticedone/getNoticeDoneByNoticeNo'

  }

}
// CAPITAL  资金监管
const EPF_CAPITAL = {
  APPLY_JSON:EPF_TRANSFER_BASE+'/transbillapply/getTransBillApplyJson',
  APPLY_APPROPRE:EPF_TRANSFER_BASE+'/transbillapply/appropriationtransBillApply',
  APPLY_DEL:EPF_TRANSFER_BASE+'/transbillapply/deleteTransBillApply',
  APPLY_TASK:EPF_TRANSFER_BASE+'/transbillapply/getTransBillApplyTask',
  APPLY_ADD:EPF_TRANSFER_BASE+'/transcapitalsituation/addTransCapitalSituation',
  APPLY_LIST:EPF_TRANSFER_BASE+'/transcapitalsituation/queryprojectpricepaylist',
  APPLY_SITUATE:EPF_TRANSFER_BASE+'/transcapitalsituation/getTransCapitalSituation',
  PAY_JSON:EPF_TRANSFER_BASE+'/transcapitalpay/gettransbill_payListJSON',
  ADD_BILL:EPF_TRANSFER_BASE+'/transbill/addTransBill',
  EDIT_BILL:EPF_TRANSFER_BASE+'/transbill/editTransBill',
  del_BILL:EPF_TRANSFER_BASE+'/transbill/deleteTransBill',
  BILL_JSON:EPF_TRANSFER_BASE+'/transbill/getTransBillJson',
  BILL:EPF_TRANSFER_BASE+'/transbill/getTransBill',
  ADD_RECORD:EPF_TRANSFER_BASE+'/violaterecord/addViolateRecord',
  DEL_RECORD:EPF_TRANSFER_BASE+'/violaterecord/deleteViolateRecord',
  RECORD_JSON:EPF_TRANSFER_BASE+'/violaterecord/getViolateRecordJson',
  RECORD:EPF_TRANSFER_BASE+'/violaterecord/getViolateRecord',
  ADD_PROMIS:EPF_TRANSFER_BASE+'/brokenpromises/addBrokenPromises',
  DEL_PROMIS:EPF_TRANSFER_BASE+'/brokenpromises/deleteBrokenPromises',
  PROMIS_JSON:EPF_TRANSFER_BASE+'/brokenpromises/getBrokenPromisesJson',
  PROMIS:EPF_TRANSFER_BASE+'/brokenpromises/getBrokenPromises',
  REFUND_JSON:EPF_TRANSFER_BASE+'/transbillrefund/getTransBillRefundJson',
  BILL_REFUND:EPF_TRANSFER_BASE+'/transbillrefund/deleteTransBillRefund',
  REFUND_ID:EPF_TRANSFER_BASE+'/transbillrefund/submitTransBillRefundbyid',
  REFUND_TASK:EPF_TRANSFER_BASE+'/transbillrefund/getauthTransBillRefundTask',

  ADD:{
    APPLY_ADD:EPF_TRANSFER_BASE+'/transbillapply/addTransBillApply',
    APPLY_PUBLICITY:EPF_TRANSFER_BASE+'/transnoticedone/getFilpathByPublicityNo',
    APPLY_LIST:EPF_TRANSFER_BASE+'/transbillapply/getTransContractList',
    APPLY_NO:EPF_TRANSFER_BASE+'/transbillapply/getBillApplyByContractNo',
    APPLY_BILL:EPF_TRANSFER_BASE+'/transbillapply/getTransBillApply',
    ADD_REFUND:EPF_TRANSFER_BASE+'/transbillrefund/addTransBillRefund',
    GET_REFUND:EPF_TRANSFER_BASE+'/transbillrefund/getTransBillRefund',
    EDIT_REFUND:EPF_TRANSFER_BASE+'/transbillrefund/edittransBillRefund',
  },
  DETAIL:{
    APPLY_NO:EPF_TRANSFER_BASE+'/transcontract/getTransContractByContractNo',
    PPLY_EDIT:EPF_TRANSFER_BASE+'/transbillapply/editTransBillApply',
    REFUND_ID:EPF_TRANSFER_BASE+'/transbillrefund/auditTransBillRefundbyid'
  },

}
//TRADE 交易系统
const EPF_TRADE = {
  // LAND 地块信息
  LAND: {
    LAND_INFO: EPF_TRADE_BASE + '/admin/transtarget/getAddOrEditTargetGoodsList',
    LAND_DETAIL: EPF_TRADE_BASE + '/admin/transgoods/getTransGoods',
  },
  // PUBLICITY 公示信息
  PUBLICITY:{
    PUBLICITY_LIST: EPF_TRADE_BASE + '/admin/transtarget/getTransResultsPublicList',
    PUBLICITY_DETAIL: EPF_TRADE_BASE + '/admin/transtarget/getTransResultsPublic',
    PUBLICITY_INFO: EPF_TRADE_BASE + '/admin/transtarget/getAddTransResultsPublic',
    PUBLICITY_RELEASE: EPF_TRADE_BASE + '/admin/transtarget/addTransResultsPublic',
  },
  // TARGET 标的
  TARGET:{
    TARGET_INFO: EPF_TRADE_BASE + '/admin/transtarget/getTransTargetById',
    TARGET_ADD: EPF_TRADE_BASE + '/admin/transtarget/addTransTarget',
    TARGET_GOODS_LIST: EPF_TRADE_BASE + '/admin/transtarget/getAddOrEditTargetGoodsList',
    TARGET_EDIT: EPF_TRADE_BASE + '/admin/transtarget/editTransTarget',
    TARGET_LIST: EPF_TRADE_BASE + '/admin/transtarget/getTransTargetList',
    TARGET_DELETE: EPF_TRADE_BASE + '/admin/transtarget/deleteTransTarget',
    TARGET_ABORT_ADD: EPF_TRADE_BASE + '/transtransactionresul/addReasonByTargetId',
    TARGET_TRADE_RESULT: EPF_TRADE_BASE + '/admin/transtarget/getSuccessfulTradingResultsByTargetId',
  },
  // ENTRUST 委托交易
  ENTRUST:{
    GET_TRUST:EPF_TRADE_BASE+ADMIN+'/transtrustinfo/getAcceptingTrust',
    DEL_GOODS:EPF_TRADE_BASE+ADMIN+'/transgoods/deleteTransGoods',
    EDIT_STATE:EPF_TRADE_BASE+ADMIN+'/transtrustinfo/editTrustInfoState',
    EDIT_STATUS:EPF_SUPPLY_BASE+ADMIN+'/tsell/editTSellPublishStatus',
    RECOVER_STATUS:EPF_SUPPLY_BASE+ADMIN+'/tsell/recoveryEntrustStatus',
    CREATED_NO:EPF_TRADE_BASE+ADMIN+'/transtrustinfo/createChildNo',
    EDIT:{
      PARENT_ID:EPF_TRADE_BASE+'/dictionaries/getDictsByCodeOrParentId',
      AREA_ID:EPF_ADMIN_BASE+ADMIN+'/regionals/getAreaByCodeOrParentId',
      GET_GROUP:EPF_TRADE_BASE+'/dictionaries/getDictEbyDictGroup/',
      GET_GOODS:EPF_TRADE_BASE+ADMIN+'/transgoods/getTransGoods',
      GROUP_ID:EPF_DOCUMENT_BASE+DOCUMENT+'/getOneGroupFilsById',
      GROUP_CODE:EPF_TRADE_BASE+'/dicitonaries/getDictEbyDictGroup/code',
      EDIT_GOODS:EPF_TRADE_BASE+ADMIN+'/transgoods/editTransGoods',
    },
    DETAIL:{
      MONEY_INFO:EPF_TRADE_BASE+ADMIN+'/transgoodsearnestmoney/getEarnestMoneyInfo',
      APPLY_ID:EPF_TRADE_BASE+ADMIN+'/transaccountbill/getBillBYApplyId',
      CODE_ID:EPF_SUPPLY_BASE+'/dictionaries/getDictsByCodeOrParentId'
    },
    BANK_SEND:EPF_TRADE_BASE+'/bank/send10002',

  },
  // NOTICE 公告信息
  NOTICE:{
    RES_NOTICE:EPF_TRADE_BASE+ADMIN+'/transnotice/resubmitNotice',
    NOTICE_REVOKE:EPF_TRADE_BASE+ADMIN+'/transnotice/getNoticeRevoke',
    NOTICE_LIST:EPF_TRADE_BASE+ADMIN+'/transnotice/getTransNoticeList',
    ISSUE:EPF_TRADE_BASE+ADMIN+'/transnotice/revocationIssue',
    DEL_NOTICE:EPF_TRADE_BASE+ADMIN+'/transnotice/deleteTransNotice',
    CKECK_NOTICE:EPF_TRADE_BASE+ADMIN+'/transnotice/checkTransNoticeNo',
    USER_ORG:EPF_TRADE_BASE+ADMIN+'/transtarget/getCurrentUserOrgs',
    OR_ROL:EPF_ADMIN_BASE+ADMIN+'/user/getUsersByCurrentOrRol',
    BANK_LIST:EPF_TRADE_BASE+ADMIN+'/transbank/getBankList',
    TARGET_TIME:EPF_TRADE_BASE+ADMIN+'/transtarget/getTransTargetTime',
    GET_LIST:EPF_TRADE_BASE+ADMIN+'/transbank/getTransBankList',
    NOTICE_ID:EPF_TRADE_BASE+ADMIN+'/transtarget/getTransTargetListByNoticeId',
    LIST_ID:EPF_TRADE_BASE+ADMIN+'/transbank/getTransBankListByNoticeId',
    OR_ROLE:EPF_ADMIN_BASE+ADMIN+'/user/getUsersByCurrentOrRole',
    GET_NOTICE:EPF_TRADE_BASE+ADMIN+'/transnotice/getTransNotice',
    SET_REVOKE:EPF_TRADE_BASE+ADMIN+'/transnotice/setNoticeRevoke',
    SET_NOTICE:EPF_TRADE_BASE+ADMIN+'/transnotice/setResubmitNotice',
    EDIT_NOTICE:EPF_TRADE_BASE+ADMIN+'/transnotice/editTransNotice'

  },
  //BANK 银行管理
  BANK:{
    DICT_GROUP:EPF_SUPPLY_BASE+'/dictionaries/getDictEbyDictGroup/',
    EDIT_BANK:EPF_TRADE_BASE+ADMIN+'/transbank/editTransBank',
    ADD_BANK:EPF_TRADE_BASE+ADMIN+'/transbank/addTransBank',
    DEL_BANK:EPF_TRADE_BASE+ADMIN+'/transbank/deleteTransBank',
    GET_JSON:EPF_TRADE_BASE+'/transaccount/getTransAccountJson',
    EDIT_ACCOUNT:EPF_TRADE_BASE+'/transaccount/editTransAccount',
    ADD_ACCOUNT:EPF_TRADE_BASE+'/transaccount/addTransAccount',
    DEL_ACCOUNT:EPF_TRADE_BASE+'/transaccount/deleteTransAccount'
  },
  // TRADE 交易管理
  TRADE:{
    BEFORE_LIST:EPF_TRADE_BASE+ADMIN+'/translicense/beforeAuditList',
    GET_APPLY:EPF_TRADE_BASE+ADMIN+'/translicense/getFrantApplication',
    GET_PREAUDIT:EPF_TRADE_BASE+ADMIN+'/translicense/getPreaudit',
    UPDATE_STATE:EPF_TRADE_BASE+ADMIN+'/translicense/updateJudgeState',
    LATER_LIST:EPF_TRADE_BASE+ADMIN+'/translicense/getTransLaterlist',
    LATER_AUDIT:EPF_TRADE_BASE+ADMIN+'/translicense/getLaterAuditPage',
    TARGET_DETAILS:EPF_TRADE_BASE+'/index/trans/transTargetDetails',
    END_DETAIL:EPF_TRADE_BASE+'/index/trans/transEndDetail',
    END_BOOK:EPF_TRADE_BASE+'/index/trans/transEndBook',
    // TARNS:EPF_TRADE_BASE+'/index/trans/transTargetList',
    // RESULT:EPF_TRADE_BASE+'/index/trans/transNoticeOrResultList',
    // BROAD:EPF_TRADE_BASE+'/index/trans/getTransactionInformationBroadcasting',
    TRUSTEESHIP:EPF_TRADE_BASE+'/index/trans/transTrusteeshipDate',
    ADD_MESSAGE:EPF_ADMIN_BASE+ADMIN+'/usermessage/addUserMessage',
    EDIT_MESSAGE:EPF_ADMIN_BASE+ADMIN+'/usermessage/editUserMessage',
    DEL_MESSAGE:EPF_ADMIN_BASE+ADMIN+'/usermessage/deleteUserMessage',
    MESSAGE_LIST:EPF_TRADE_BASE+'/transtransactionresul/getMessageTransTransactionResulList',
    USER_LIST:EPF_ADMIN_BASE+ADMIN+'/usermessage/getUserMessageList',
    USER_MESSAGE:EPF_ADMIN_BASE+ADMIN+'/usermessage/getUserMessage',
  },
  // 门户端独立服务
  LADNWEB: {
    TARNS: EPF_LAND_BASE+'/landweb/transtarget/transTargetList',
    BROAD: EPF_LAND_BASE+'/landweb/transtarget/getTransactionInformationBroadcasting',
    RESULT:EPF_LAND_BASE+'/landweb/transtarget/transNoticeOrResultList',
  },
  // RULE 交易规则
  RULE:{
    ADD_STEP:EPF_TRADE_BASE+ADMIN+'/translicensestep/addTransLicenseStep',
    EDIT_STEP:EPF_TRADE_BASE+ADMIN+'/translicensestep/editTransLicenseStep',
    DEL_STEP:EPF_TRADE_BASE+ADMIN+'/translicensestep/deleteTransLicenseStep',
    DEL_MODEL:EPF_TRADE_BASE+ADMIN+'/transbusinessmodel/deleteTransBusinessModel',
    STEP_JSON:EPF_TRADE_BASE+ADMIN+'/translicensestep/getTransLicenseStepJson',
    GET_STEP:EPF_TRADE_BASE+ADMIN+'/translicensestep/getTransLicenseStep',
    GET_DEL_STEP:EPF_TRADE_BASE+ADMIN+'/translicensestep/getDeleteTransLicenseStep',
    FET_MODEL:EPF_TRADE_BASE+ADMIN+'/transbusinessmodel/getTransBusinessModel',
  },
  // FINANCE 财务管理
  FINANCE:{
    BOUND_LIST:EPF_TRADE_BASE+'/finance/boundManageList',
    MAIN_ACCOUNT:EPF_TRADE_BASE+'/finance/switchToMainAccount',
    MAIN_LIST:EPF_TRADE_BASE+'/finance/swithMainList',
    DEPOSIT_LIST:EPF_TRADE_BASE+'/finance/swithDepositList',
    DEPOSIT_ACCOUNT:EPF_TRADE_BASE+'/finance/switchToDepositAccount',
    DEST_ACCOUNT:EPF_TRADE_BASE+'/transaccountbillapply/destroyAccount',
    CANCEL_LIST:EPF_TRADE_BASE+'/finance/cancelAccountList',
    BACK_LIST:EPF_TRADE_BASE+'/finance/swithPayBackList',
    BACK_MONEY:EPF_TRADE_BASE+'/finance/switchToBackMoney',
    CREATE_ID:EPF_TRADE_BASE+BASEURL+'/createId',
    QUERY_MANAFE:EPF_TRADE_BASE+'/performance/queryTrustMarginManage',
    PER_ACCOUNT:EPF_TRADE_BASE+'/performance/switchToMainAccount',
    PER_LIST:EPF_TRADE_BASE+'/performance/swithMainList',
    PER_MONEY:EPF_TRADE_BASE+'/performance/switchToBackMoney',
    PER_BACK:EPF_TRADE_BASE+'/performance/swithPayBackList',
    TARGET_ID:EPF_TRADE_BASE+ADMIN+'/transaccountbill/findAccountListByTargetId',
    FIND_BILL:EPF_TRADE_BASE+ADMIN+'/transaccountbill/findCustodyArrivalBill',
    ARRIVAL_LIST:EPF_TRADE_BASE+'/finance/arrivalDeposit/list',
    ARRIVAL_COMPETE:EPF_TRADE_BASE+'/finance/arrivalDeposit/findErroneousTransferForCompete',
    FIND_LICENSE:EPF_TRADE_BASE+ADMIN+'/transaccountbill/findByBillTypeAndTrustLicense',
    FIND_TRANSFER:EPF_TRADE_BASE+ADMIN+'/transaccountbill/findErroneousTransfer'
  },

}

//TRADEENGINE 交易引擎
const EPF_TRADEENGINE = {
  // LOG 交易记录
  LOG: {
    TRADE_PRICELIST: EPF_TRADEENGINE_BASE + '/transofferlog/getTransOfferLogJsonList',
    TRADE_PRICE: EPF_TRADEENGINE_BASE + '/transofferlog/getTransOfferLogJson',
    TRANS_JSON: EPF_TRADEENGINE_BASE + '/transtransactiontype/getTransTransactionTypeJson',
    TEMPLATE_JSON: EPF_TRADEENGINE_BASE + '/transnodetemplate/getTransNodeTemplateJson',
    CKECK_NODE: EPF_TRADEENGINE_BASE + '/transnodetemplate/checkTransNode',
    DEL_TEMPLATE: EPF_TRADEENGINE_BASE + '/transnodetemplate/deleteTransNodeTemplate',
    CKECK_TYPE: EPF_TRADEENGINE_BASE + '/transtransactiontype/checkTransType',
    DEL_TYPE: EPF_TRADEENGINE_BASE + '/transtransactiontype/deleteTransTransactionType',
    GET_TYPE: EPF_TRADEENGINE_BASE + 'transtransactiontype/getTransTransactionType',
    GET_TEMPLATE: EPF_TRADEENGINE_BASE + '/transnodetemplate/getTransNodeTemplate',
  },

}

export default {
  BASEURL,
  EPF_ADMIN,
  EPF_DOCUMENT,
  EPF_AUTH,
  EPF_ACTIVITI,
  EPF_CMS,
  EPF_GENERATOR,
  EPF_SEARCH,
  EPF_SUPPLY,
  EPF_LEDGER,
  EPF_TRANSFER,
  EPF_SUPPLYDEMAND,
  EPF_NOTICE,
  EPF_DEAL,
  EPF_CAPITAL,
  EPF_TRADE,
  EPF_TRADEENGINE,
  EPF_SUP,
  EPF_TRACT
}
