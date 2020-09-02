//把数字金额转换成中文大写数字的函数
export function NumToChinese(money) {
  var cnNums = new Array(
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  ); //汉字的数字。
  var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
  var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
  var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
  var cnInteger = "整"; //整数金额时后面跟的字符
  var cnIntLast = "元"; //整型完以后的单位
  var maxNum = 999999999999999.9999; //最大处理的数字
  var IntegerNum; //金额整数部分
  var DecimalNum; //金额小数部分
  var ChineseStr = ""; //输出的中文金额字符串
  var parts; //分离金额后用的数组，预定义
  var Symbol = ""; //正负值标记
  if (money == "") {
    return "";
  }

  money = parseFloat(money);
  if (money >= maxNum) {
    alert("超出最大处理数字");
    return "";
  }
  if (money == 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
    return ChineseStr;
  }
  if (money < 0) {
    money = -money;
    Symbol = "负 ";
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf(".") == -1) {
    IntegerNum = money;
    DecimalNum = "";
  } else {
    parts = money.split(".");
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    //获取整型部分转换
    var zeroCount = 0;
    var IntLen = IntegerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = IntegerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (DecimalNum != "") {
    //小数部分
    var decLen = DecimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = DecimalNum.substr(i, 1);
      if (n != "0") {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr == "") {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (DecimalNum == "") {
    ChineseStr += cnInteger;
  }
  ChineseStr = Symbol + ChineseStr;

  return ChineseStr;
}
/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 *
 * @param num1被除数 | num2除数
 */
export function Division(num1, num2, s) {
  var baseNum1 = 0,
    baseNum2 = 0,
    ret;
    num2 = num2?num2:10000 
    s = s?s:4
  var baseNum3, baseNum4;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  // with (Math) {
  baseNum3 = Number(new Number(num1).toString().replace(".", ""));
  baseNum4 = Number(new Number(num2).toString().replace(".", ""));
  ret = (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
  return bcFixed(ret, s);
  // }
}
function toDecimal2(x, ss) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + ss) {
    s += "0";
  }
  return s;
}

function bcFixed(num, s) {
  var times = Math.pow(10, s);
  var des = num * times + 0.5;
  des = parseInt(des, 10) / times;
  return des;
  // return toDecimal2(des, s) + "";
}
