<!-- 切换主题色  -->
<template>
  <div>
    <!-- <el-color-picker  @change="colorChange" v-model="colors.primary" ></el-color-picker> -->
    <el-color-picker
      class="theme-picker"
      popper-class="theme-picker-dropdown"
      v-model="theme"
      @change="colorChange"
      :size="size"
    >
    </el-color-picker>
  </div>
</template>
<script>
import generateColors from "@/util/color";
import objectAssign from "object-assign";
import * as types from '../store/commons/types.js'
const version = require("element-ui/package.json").version;
const ORIGINAL_THEME = "var(--lightColor)";
export default {
  name: "ThemePicker",
  props: {
    // 默认主题，可由外部传入
    default: {
      type: String,
      default: localStorage.getItem("COLOR_THEME")
    },
    size: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {
      originalStylesheetCount: -1, //记录当前已引入style数量
      originalStyle: "", //获取拿到的.css的字符串
      colors: {
        //颜色选择器默认颜色值,这个值要和element-variables一样
        primary: "var(--lightColor)"
      },
      // primaryColor: "", //提交成功后设置默认颜色
      cssUrl: [
        "//unpkg.com/element-ui/lib/theme-chalk/index.css",
        "./static/css/index.css"
      ],
      chalk: "", // content of theme-chalk css
      theme: ORIGINAL_THEME,
      showSuccess: true // 是否弹出换肤成功消息
    };
  },
  methods: {
    colorChange(e) {
      console.log("==============e", e);
      if (!e) return;
      localStorage.setItem("color", e);
      this.primaryColor = this.colors.primary;
      this.colors = objectAssign(
        {},
        this.colors,
        generateColors(this.colors.primary)
      );
      this.writeNewStyle();
    },
    writeNewStyle() {
      let cssText = this.originalStyle;
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp("(:|\\s+)" + key, "g"),
          "$1" + this.colors[key]
        );
      });
      if (this.originalStylesheetCount === document.styleSheets.length) {
        // 如果之前没有插入就插入
        const style = document.createElement("style");
        style.innerText =
          ".primaryColor{background-color:" +
          this.colors.primary +
          "}" +
          cssText;
        document.head.appendChild(style);
      } else {
        // 如果之前没有插入就修改
        document.head.lastChild.innerText =
          ".primaryColor{background-color:" +
          this.colors.primary +
          "} " +
          cssText;
      }
    },
    getIndexStyle(url) {
      let that = this;
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.onreadystatechange = function() {
        if (
          request.readyState === 4 &&
          (request.status == 200 || request.status == 304)
        ) {
          // 调用本地的如果拿不到会得到html,html是不行的
          if (request.response && !/DOCTYPE/gi.test(request.response)) {
            that.originalStyle = that.getStyleTemplate(request.response);
            that.writeNewStyle();
          } else {
            that.originalStyle = "";
          }
        } else {
          that.originalStyle = "";
        }
      };
      request.send(null);
    },
    getStyleTemplate(data) {
      const colorMap = {
        "#3a8ee6": "shade-1",
        "var(--lightColor)": "primary",
        "#53a8ff": "light-1",
        "#66b1ff": "light-2",
        "#79bbff": "light-3",
        "#8cc5ff": "light-4",
        "#a0cfff": "light-5",
        "#b3d8ff": "light-6",
        "#c6e2ff": "light-7",
        "#d9ecff": "light-8",
        "#ecf5ff": "light-9"
      };
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key];
        data = data.replace(new RegExp(key, "ig"), value);
      });
      return data;
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
          callback();
        }
      };
      xhr.open("GET", url);
      xhr.send();
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    }
  },
  mounted() {
    if (this.default != null) {
      this.theme = this.default;
      this.$emit("onThemeChange", this.theme);
      this.$store.commit(types.M_THEME_COLOR, this.theme);
      this.showSuccess = false;
    }
    // 默认从线上官方拉取最新css,2秒钟后做一个检查没有拉到就从本地在拉下
    let that = this;
    // 如果是记住用户的状态就需要，在主题切换的时候记录颜色值，在下次打开的时候从新赋值
    this.colors.primary = localStorage.getItem("color") || this.colors.primary; //例如
    this.getIndexStyle(this.cssUrl[0]);
    setTimeout(function() {
      if (that.originalStyle) {
        return;
      } else {
        that.getIndexStyle(that.cssUrl[1]);
      }
    }, 2000);
    this.$nextTick(() => {
      // 获取页面一共引入了多少个style 文件
      this.originalStylesheetCount = document.styleSheets.length;
    });
  },
  watch: {
    theme(val, oldVal) {
      if (typeof val !== "string") return;
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );

          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };

      const chalkHandler = getHandler("chalk", "chalk-style");

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        this.getCSSString(url, chalkHandler, "chalk");
      } else {
        chalkHandler();
      }

      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter(style => {
          const text = style.innerText;
          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });

      // 响应外部操作
      this.$emit("onThemeChange", val);
      this.$store.commit(types.M_THEME_COLOR, val);

      if (this.showSuccess) {
        this.$message({
          message: "换肤成功",
          type: "success"
        });
      } else {
        this.showSuccess = true;
      }
    }
  }
};
</script>
<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
