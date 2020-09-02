// 检测表单个数
export function validateNum(rule, value, callback,min,max,text) {
  var len = 0;

  if (value != null && value != "") {
    for (var i = 0; i < value.length; i++) {
      var c = value.charCodeAt(i);
      //单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }
    if ((len < min && len > 0) || len > max) {
      //重点重点，下面就是填写提示的文字
      callback(new Error(text));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
export function info(min, max, text) {
  console.log("=========min==", min);
  console.log("=========max==", max);
  return min, max, text;
}
// 元转万元
export function oneToTen(one, ten) {
  ten/10
  return min, max, text;
}
// 万元转元
export function tenToOne(min, max, text) {
  console.log("=========min==", min);
  console.log("=========max==", max);
  return min, max, text;
}
var regIdCard = /^[1-9]\d{5}((((19|[2-9][0-9])\d{2})(0?[13578]|1[02])(0?[1-9]|[12][0-9]|3[01]))|(((19|[2-9][0-9])\d{2})(0?[13456789]|1[012])(0?[1-9]|[12][0-9]|30))|(((19|[2-9][0-9])\d{2})0?2(0?[1-9]|1[0-9]|2[0-8]))|(((1[6-9]|[2-9][0-9])(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0?229))\d{3}[0-9Xx]$/
export  default{ regIdCard } 
// /* 是否是公司邮箱*/
// export function isWscnEmail(str) {
//   const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i;
//   return reg.test(str.trim());
// }

// /* 合法uri*/
// export function validateURL(textval) {
//   const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
//   return urlregex.test(textval);
// }

// // 验证是否整数
// export function isInteger(rule, value, callback) {
//   if (!value) {
//     return callback(new Error('输入不可以为空'));
//   }
//   setTimeout(() => {
//     if (!Number(value)) {
//       callback(new Error('请输入正整数'));
//     } else {
//       const re = /^[0-9]*[1-9][0-9]*$/;
//       const rsCheck = re.test(value);
//       if (!rsCheck) {
//         callback(new Error('请输入正整数'));
//       } else {
//         callback();
//       }
//     }
//   }, 1000);
// }

// // 验证是否是[0-1]的小数
// export function isDecimal(rule, value, callback) {
//   if (!value) {
//     return callback(new Error('输入不可以为空'));
//   }
//   setTimeout(() => {
//     if (!Number(value)) {
//       callback(new Error('请输入数字'));
//     } else {
//       if (value < 0 || value > 1) {
//         callback(new Error('请输入[0,1]之间的数字'));
//       } else {
//         callback();
//       }
//     }
//   }, 1000);
// }

// // 验证端口是否在[0,65535]之间
// export function isPort(rule, value, callback) {
//   if (!value) {
//     return callback(new Error('输入不可以为空'));
//   }
//   setTimeout(() => {
//     if (value == '' || typeof(value) == undefined) {
//       callback(new Error('请输入端口值'));
//     } else {
//       const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
//       const rsCheck = re.test(value);
//       if (!rsCheck) {
//         callback(new Error('请输入在[0-65535]之间的端口值'));
//       } else {
//         callback();
//       }
//     }
//   }, 1000);
// }

// /* 小写字母*/
// export function validateLowerCase(str) {
//   const reg = /^[a-z]+$/;
//   return reg.test(str);
// }
