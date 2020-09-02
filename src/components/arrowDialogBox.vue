<template>
    <div class="arrowDialogBox-container">
        <div class="arrowDialogBox">
            <div class="arrowDialogBox_title">{{title}}</div>
            <slot></slot>
        </div>
    </div>
</template>
 
<script>
export default {
    props:['title']
}
</script>
 
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.arrowDialogBox-container{
    .arrowDialogBox {
        width: 1100px;
        // height: 307px;
        position: relative;
        background-color: #ffffff;
        box-shadow: 0px 0px 24px 0px rgba(101, 103, 144, 0.11);
        box-sizing: border-box;
        border: solid 1px #e0dfdf;
        border-radius: 8px;
        .arrowDialogBox_title{
            width:100%;
            height:50px;
            line-height: 50px;
            box-sizing: border-box;
            padding-left: 32px;
            border-bottom:1px  solid #f3f3f3;
            font-size: 14px;
            color: #333333;
            font-weight: bold;
        }
    }
    .arrowDialogBox:after,.arrowDialogBox:before{
        content: '';
        border-top: 10px transparent dashed;
        border-left: 10px transparent dashed;
        border-right: 10px transparent dashed;
        border-bottom: 10px #fff solid;
        position: absolute;
        top:-20px;
        left:300px;
    }
    .arrowDialogBox:before{
        border-bottom: 10px #e0dfdf solid;
    }
    .arrowDialogBox:after{
        border-bottom: 10px #fff solid;
        left:300px;
        top:-19px;
    }
}
</style>