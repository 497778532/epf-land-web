import Mock from 'mockjs'
function loginMock () {
	const loginData = Mock.mock({
        // 'list|1-10': [{
        //     // 属性 id 是一个自增数，起始值为 1，每次增 1
        //     'id|+1': 1,
        //     "userName": "@cname",
        //     "userId": "@integer(10000,99999)",
        //     "passward" : /[a-z][A-Z][0-9][a-z][A-Z][0-9][a-z][A-Z][0-9]/,
        // }]
        // {
            "msg": "success",
            "code": 0,
            "dictionariesEntities|1-8": [
                {
                    "id": "91dc0947-033a-4097-a461-1b62390bc6ae",
                    "dictKey": "area_beijing",
                    "zhCn": "北京",
                    "enUs": "sichuan province",
                    "creatorBy": null,
                    "createTime": '@date("yyyy-MM-dd")',
                    "updatorBy": null,
                    "updateTime":'@date("yyyy-MM-dd")',
                    "version": null,
                    "dictOrder": "4",
                    "dictDelete": "0",
                    "dictValue": "50000",
                    "groupId": "87f6dc78-a808-4aa5-8d9b-ee5ef16eef8c",
                    "parentId": "0"
                },
            ]
        // }
	})
  return loginData
}
export {loginMock }