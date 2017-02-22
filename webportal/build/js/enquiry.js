$(function(){
var reloadPage = function (){
    window.location.reload();
}

var showOrder = function(order){
   $("#orderNumber").html("发货单号：" + order.enquiryBillId); 
   $("#order_routine").html(order.startAddress + "——" + order.arriveAddress);
   $("#order_time").html("计划发运时间：" + order.planStartTime);//计划到达时间quoteEndTime
   $("#order_object").html( order.bidName + ":" + order.bidWeight);//bidNum,bidVolume,planArriveTime
}

var renderOrder = function(id){
    $('#shareOrder').modal('show');
     //分享
    $(".wxshare").on("click",function() {
      $(".wemcn").toggle();
    });
    var global_url = "http://dev2.cargocn.cn";
    var qrcode_text = global_url + "/cargocn-cloud-EnqiryQuotation/TmpInquiryShare/loadTmpEnqiryByid.do?tmpEnqiryId=" + id;
     
    var qrcode_setting = {
        // render method: 'canvas', 'image' or 'div'
        render: 'canvas',
        // version range somewhere in 1 .. 40
        minVersion: 1,
        maxVersion: 40,
        // error correction level: 'L', 'M', 'Q' or 'H'
        ecLevel: 'L',
        // offset in pixel if drawn onto existing canvas
        left: 0,
        top: 0,
        // size in pixel
        size: 100,
        // code color or image element
        fill: '#000',
        // background color or image element, null for transparent background
        background: null,
        // content
        text: qrcode_text,//'http://www.cargocn.com',
        // corner radius relative to module width: 0.0 .. 0.5
        radius: 0,
        // quiet zone in modules
        quiet: 0,
        // modes
        // 0: normal
        // 1: label strip
        // 2: label box
        // 3: image strip
        // 4: image box
        mode: 0,
        mSize: 0.1,
        mPosX: 0.5,
        mPosY: 0.5,
        label: 'no label',
        fontname: 'sans',
        fontcolor: '#000',
        image: null
    }
    $('#qrcode').qrcode(qrcode_setting);

}

var translateToSelect2 = function(flag){
   var iobject = window.cargocnData.zone;
   var arrs = [];
   if(flag==0){
     arrs.push({"id":"请选择发货地址", "text":"请选择发货地址"});
   }else{
     arrs.push({"id":"请选择到达地址", "text":"请选择到达地址"});
   }
   
   for(var i=0;i<iobject.length;i++){
      //arrs.push({"id": iobject[i].codeId, "text":iobject[i].codeName});
      arrs.push({"id": iobject[i].codeName, "text":iobject[i].codeName});
   }
   return arrs;
} 
var BASE_API_URL = "/cargocn-cloud-EnqiryQuotation/";
var login_flg = false;
$.fn.select2.defaults.set( "theme", "bootstrap" );
//$(document).ready(function() {//#enquiry_form 
  $("#send_enquiry").on('click',function(){
    //debugger;
    //$(this).disabled();
    console.log($("#enquiry_form").serialize());
    $.ajax({
        url: BASE_API_URL + "TmpEnqiryMain/addTmpEnqiry.do",
        type: "GET",
        //dataType: "json",
        contentType: "application/json; charset=utf-8",
        //contentType:"application/x-www-form-urlencoded",
        data: $("#enquiry_form").serialize(),
        success: function(result) {
           console.log("result"+result);
           if(result.code==100){
              //console.log("用户手机号：" + result.data.userTel);
              showOrder(result.data);
              renderOrder(result.data.id);
              // if(result.data.locked = false){ //正常的
                  
              // }else{ //true 未验证通过
                  
              // }
           }else{
              console.log(result);
           }
        },
        error:function(result){
           console.log('ajax请求出错！');
        }
    });
  })

  $(".car_type_box span.item").on('click',function(){
    if(!$(this).hasClass('active')){
      $(this).addClass('active').siblings('span.item').removeClass('active');
      var _this = $(this);
      var dataToggle = _this.data('toggle');
      var dataValue = _this.data('value');
      switch (dataToggle) {
        case "carMaximumLoad":
          $("#carMaximumLoad").val(dataValue);
          break;
        case "truckType":
          $("#truckType").val(dataValue);
          break;
        case "containerType":
          $("#containerType").val(dataValue);
          break;
        case "boatType":
          $("#boatType").val(dataValue);
          break;
        case "shipMaximumLoad":
          $("#shipMaximumLoad").val(dataValue);
          break;
      }
    }
   })

  //initialCookie();
  $("#vehicle").on('click',function(){
    if($(this).prop("checked")){
     $(".carshow").show(); 
     $(".shipshow").hide();
     $(".car_type_box span.item:first-child").addClass('active').siblings('span.item').removeClass('active');
    }
  })

  $("#carpool").on('click',function(){
    //alert($(this).prop("checked"));
    if($(this).prop("checked")){
       $(".carshow").hide(); 
       $(".shipshow").show();
       $(".car_type_box span.item:first-child").addClass('active').siblings('span.item').removeClass('active');
    }
  })

  $("#send_index").select2({
    //tags: true, //是否可以自定义tag
    language: "zh-CN",
    theme:'bootstrap',
    width:'100%',
    data:translateToSelect2(0)
  });
  $("#arrive_index").select2({
    language: "zh-CN",
    theme:'bootstrap',
    width:'100%',
    data:translateToSelect2(1)
  });

  var send_index = myCookie.get("send_index");
  var arrive_index = myCookie.get("arrive_index");
  if(send_index){
    $("#send_index").val(send_index).trigger("change");
  }
   if(arrive_index){
    $("#arrive_index").val(arrive_index).trigger("change");
  }
  $('.form_date').datetimepicker({
    language: "zh-CN",
    startDate: moment().format('YYYY-MM-DD'),
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
  });

  $("#send_another").on('click',function(){
      $('#shareOrder').modal('hide');
      reloadPage();
  });

  $('#start_send').on('click',function(){
    //debugger;
    if(login_flg==false){
      $("#tologin").modal('show');
      //login_flg = true;
      return;
    }
    if(login_flg){
      $('#myModal').modal('show');
    }
  });
  $('#index_send').on('click',function(){
    login_flg = true;
    $("#tologin").modal('hide');
  })
  $('#send_close').on('click',function(){
    $('#myModal').modal('hide');
  });
})
/*$('.sns-share').share();*/
/*var $config = {
url                 : 'http://172.16.10.55:3000/pages/weixinShare/shipshare.html',//'http://b966d904.ngrok.io/pages/weixinShare/shipshare.html',//'http://www.cargocn.com/cargocn-cloud-server/login', // 网址，默认使用 window.location.href
source              : 'http://172.16.10.55:3000',//'http://www.cargocn.com', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
title               : '货运中国网', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
description         : '货运中国网', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
image               : 'http://www.cargocn.com/images/logo.png', // 图片, 默认取网页中第一个img标签
sites               : ['wechat'], // 启用的站点
disabled            : ['google', 'facebook', 'twitter', 'qq', 'weibo','wechat', 'douban','linkedin','tencent','diandian'], //,'qzone' 禁用的站点
wechatQrcodeTitle   : "微信扫一扫：分享", // 微信二维码提示文字
wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
};

$('.socialShare').share($config);*/