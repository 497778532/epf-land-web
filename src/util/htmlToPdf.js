// 导出页面为PDF格式
import html2canvas from "html2canvas";
import JSPDF from "jspdf";
import $ from 'jquery'
export default {
  install(Vue, options) {
    Vue.prototype.ExportSavePdf = function(file_id, file_title) {
      const title = file_title
      const Dom_height = $('#' + file_id).height() //获取要截取的dom元素内容高度
      const outer_height = $('#' + file_id).outerHeight() //获取dom元素的外部高度
      const window_height = window.screen.availHeight //窗口高度
      // console.log($('#' + file_id).height())
      html2canvas(document.querySelector('#' + file_id), {
        allowTaint: true,
        // height: window.screen.availHeight,
        height: Dom_height < window_height ? window_height : outer_height, //canvas画布的具体高度
        /*以上这个高度非常重要，如果dom内容高度在窗口高度内的话，那就用窗口高度，
        确保把当前页的内容都截取，如果超过一页，那就用外部高度*/
        windowHeight: document.getElementById(file_id).scrollHeight, 
        y: window.pageYOffset - 530 //面在垂直方向的滚动距离
      }).then(canvas=>{
        var pdf = new JSPDF("p", "mm", "a4") // A4纸，纵向
        var ctx = canvas.getContext("2d")
        var a4w = 190; var a4h = 277 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
        var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
        var renderedHeight = 0
 
        while (renderedHeight < canvas.height) {
          var page = document.createElement("canvas")
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页
 
          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 5, 5, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距
 
          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { pdf.addPage() }// 如果后面还有内容，添加一个空页
          // delete page;
        }
          pdf.save(file_title+'.pdf');
      })
    };
  }
};
