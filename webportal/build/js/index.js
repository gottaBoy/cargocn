// var CHENGDA = {};
// CHENGDA.www = {};
// CHENGDA.www.userData = {};

CHENGDA.www.index = function() {

};

CHENGDA.www.index.prototype.init = function() {
    this.loginStatus().init();
    // $("#menu-main").off("click").on("click", 'a[class="n"]', function (t) {
    //     switch (t.preventDefault(), $(this).attr("href")) {
    //         case "quote-detail.html":
    //         case "quote-list.html":
    //         case "order-quote-list.html":
    //         case "pay.html":
    //         case "order-detail.html":
    //         case "order-list.html":
    //         case "user.html":
    //             if($(this).attr("href")=="user.html"){
    //                 window.location.href = $(this).attr("href")
    //             }
    //             var user_data = getCookie('access_token')?JSON.parse(Base64.decode(getCookie('access_token'))):null;
    //             if(user_data!=null){
    //                 if(user_data.data.check_status!=1){
    //                     showIndent(user_data);
    //                 }else{
    //                     window.location.href = $(this).attr("href")
    //                 }
    //             }else{
    //                 $("#pop_login_out").modal("toggle"); $("#login_out_box a").eq(0).trigger("click");
    //             }
    //             break;
    //         case "index.html":
    //         case "quote-create.html":
    //             window.location.href = $(this).attr("href");
    //     }
    // });
};

CHENGDA.www.index.prototype.loginStatus = function() {
    window.showIndent=function(user_data){
        var IndentType=user_data.data.check_status;
        if(IndentType!=1){
            if(IndentType==0){
                var types=2;
            }else{
                var types=1;
            }
            $.ajax({
                    url:'show_tips_'+types+'.html?V='+Math.random(),
                    type: 'GET',
                    contentType: "text/plain",
                    dataType: 'html'
                })
                .done(function(back) {
                    $("body").append(back);
                    $("#pop_Indent").modal("show");
                    $("#closeIndent").off("click").on("click",function(){
                        $("#pop_Indent").modal("hide");
                    });
                    if($("#mod_user").length>0){
                        $("#mod_user").off("click").on("click",function(){
                            /* window.location.href = 'user.html?target=user_data.html'; */
                            window.location.href = 'user.html';
                        });
                    }
                });
        }
    }
    var setUser = function(page_name) {
        if (myCookie.get('access_token')) {
            // var user_data = JSON.parse(Base64.decode(myCookie.get('access_token')));
            // if(user_data.data.check_status==0){
            //      var userHtml="user.html?target=user_data.html"; 
            //     var userHtml="user.html";
            // }else{
            //     var ="user.html";
            // }
            var userHtml = "/";
            $("#headerAccount a").attr({
                href: userHtml
            }).html(myCookie.get('access_token'));//'<i class="fa fa-user"></i> '+(user_data.data.name?user_data.data.name:user_data.data.mobile));
            $('#logout a').attr({
                href: 'logout.html'
            }).html('退出');//<i class="fa fa-sign-out"></i> 退出');
            $('#index_login_box').hide();
            //quickSend();
        } else {
            $('#index_login_box').show();
            $('#headerAccount a').attr({
                href: 'login.html'
            }).html('登录');//('<i class="fa fa-sign-in"></i> 登录');
            $('#logout a').attr({
                href: 'register.html'
            }).html('注册');//('<i class="fa fa-user-plus"></i> 申请加入');
            $('#logout').off('click');
        }
        userActive();
    };
    var userActive = function() {
        $('#logout a').on('click', function(event) {
            event.preventDefault();
            if ($(this).attr('href') == 'logout.html') {
                ////var token = getCookie('access_token')?JSON.parse(Base64.decode(getCookie('access_token'))).data.token:null;
                // var username = myCookie.get('access_token');
                // $.ajax({
                //         url: '/cargocn-cloud-server/appLogout.do',//?username=' + getCookie('access_token'),
                //         type: 'POST', 
                //         dataType: 'JSON',
                //         contentType: "text/plain",
                //         data: {username: username},
                //     })
                //     .done(function(result) {
                //         if (result.code=='100') {
                //             $('#headerAccount a').attr({
                //                 href: 'login.html'
                //             }).html('登录');//('<i class="fa fa-sign-in"></i> 登录');
                //             $('#logout a').attr({
                //                 href: 'register.html'
                //             }).html('注册');//('<i class="fa fa-user-plus"></i> 申请加入')
                //             $('#logout').off('click');
                //             myCookie.delete('access_token');
                //             //clearCookie('access_token');
                //             window.location.href = 'index.html';
                //         };
                //     });
                $('#headerAccount a').attr({
                    href: 'login.html'
                }).html('登录');//('<i class="fa fa-sign-in"></i> 登录');
                $('#logout a').attr({
                    href: 'register.html'
                }).html('注册');//('<i class="fa fa-user-plus"></i> 申请加入')
                $('#logout').off('click');
                myCookie.delete('access_token');
                //clearCookie('access_token');
                debugger;
                console.log('用户退出');
                window.location.href = 'index.html';
            } else {
                //注册pop窗口
                $('#pop_login_out').modal('toggle');
                $('#login_out_box a').eq(1).trigger('click');
            }
        });

        $('#headerAccount a').on('click', function(event) {
            //debugger;
            event.preventDefault();
            
            // if ($(this).attr('href') == 'user.html') {
            //     window.location.href = 'user.html';
            // }else if($(this).attr('href') == 'user.html?target=user_data.html') {
            //     window.location.href = 'user.html?target=user_data.html';
            // } else {
                //登录pop窗口
                $('#pop_login_out').modal('toggle');
                $('#login_out_box a').eq(0).trigger('click');
            //}
        });
    };

    var popLoginOut = function() {
        $('#login_out_box').on('click', 'a', function(event) {
            event.preventDefault();
            var that = this;
            $.ajax({
                    url: $(this).attr('href'),
                    type: 'GET',
                    contentType: "text/plain",
                    dataType: 'html'
                })
                .done(function(back) {
                    $('#popular10').html(back);
                    $(that).parent('li').addClass('active').siblings().removeClass('active');
                });
        });
        // $('#pop_login_out').on('shown.bs.modal', function(event) {
        //     event.preventDefault();
        //     $('#login_out_box a').eq(0).trigger('click');
        // });
    };

    var pageCheck = function() {
        $('#mainMenu,#banner_register').on('click', 'a[class="n"]', function(event) {
            event.preventDefault();

            switch($(this).attr('href')) {
                case 'register.html':
                    $('#pop_login_out').modal('toggle');
                    $('#login_out_box a').eq(1).trigger('click');
                    break;
                case 'quote-detail.html':
                case 'quote-list.html':
                case 'order-quote-list.html':
                case 'pay.html':
                case 'order-detail.html':
                case 'order-list.html':
                case 'user.html':
                    if (getCookie('access_token') && JSON.parse(Base64.decode(getCookie('access_token'))).data.token) {
                        showIndent(JSON.parse(Base64.decode(getCookie('access_token'))));
                        window.location.href = $(this).attr('href');
                    } else {
                        $('#pop_login_out').modal('toggle');
                        $('#login_out_box a').eq(0).trigger('click');
                    }
                    break;
                case 'index.html':
                case 'quote-create.html':
                    window.location.href = $(this).attr('href');
                    break;
                default:
                // $('#mainMenu>li').eq(0).addClass('active');
            }
        });
    }

    //首页四个数值
    window.isCount=null;
    var grow = function() {
        var customer = $('#customer');
        var agent = $('#agent');
        var quote = $('#quote');
        var order = $('#order');
        setTimeout(function(){
            $.ajax({
                url: BASE_API_URL + "/common/achievement",
                type: "POST",
                contentType: "text/plain",
                async: true,
                dataType: "JSON"
            }).done(function(back) {
                if (back.status == 'Y') {
                    customer.text(back.data.customer+'+').attr("data-to", back.data.customer);
                    agent.text(back.data.agent+'+').attr("data-to",back.data.agent);
                    quote.text(back.data.quote+'+').attr("data-to",back.data.quote);
                    order.text(back.data.order+'+').attr("data-to",back.data.order);
                    isCount=true;
                };
            });
        }, 1000);
    }

    //友情链接
    var links = function () {
        var This = this;
        setTimeout(function(){
            $.ajax({
                url: BASE_API_URL+"/common/friendLink",
                type: "POST",
                contentType: "text/plain",
                async: true,
                dataType: "JSON"
            }).done(function(back) {
                if (back.status == 'Y' && back.data.length > 0) {
                    var html_str = '';
                    for (var i = 0; i < back.data.length; i++) {
                        if (i == back.data.length-1) {
                            html_str += '<span><a href="'+back.data[i].blogroll+'" target="_blank">'+back.data[i].title+'</a></span>'
                        } else {
                            html_str += '<span><a href="'+back.data[i].blogroll+'" target="_blank">'+back.data[i].title+'</a></span>　|　'
                        }
                    };
                    $('#links').html(html_str);
                };
            });
        }, 2000);
    };

    //行业新闻
    var report = function() {

        setTimeout(function(){
            $.ajax({
                    url: BASE_API_URL + '/common/mediaCoverage',
                    type: 'POST',
                    //contentType: "text/plain",
                    async: true,
                    Connection:"close",
                    dataType: "JSON",
                    data: {
                        limit: 3,
                        page: 1
                    }
                })
                .done(function(back) {
                    if (back.status == 'Y') {
                        var html_str = '<p style="font-size:28px; margin-bottom:10px;color:#00a9e0"><strong>行业新闻</strong></p><hr class="solid" style="margin-bottom: 20px ; margin-top:0px; height:2px">'
                        for (var i = 0; i < back.data.length; i++) {
                            html_str += '<h5 style="margin-bottom: 4px">'
                                +'<a href="'+back.data[i].blogroll+'" TARGET="_blank" style="color:#1d2127">'+back.data[i].title+'</a>'
                                +'</h5>'
                                +'<blockquote style="font-size:12px; margin-bottom: 10px">'
                                +'<p style="margin-bottom: 14px">'+back.data[i].intro+'</p>'
                                +'<footer style="text-align: right">'
                                +'<cite title="'+back.data[i].source+'" id="source">'+back.data[i].source+'</cite>'
                                +'</footer>'
                                +'</blockquote>';
                        };
                        $('#report').html(html_str);
                    };
                });
        }, 3000);
    }


    var loginGo = function() {
        $('#index_login').click(function(event) {
            event.preventDefault();
            if ($('#username_index').val() && $('#password_index').val()) {

                $.ajax({
                    url: BASE_API_URL+'/user/login',
                    type: 'POST',
                    async: true,
                    dataType: 'JSON',
                    //contentType: "text/plain",
                    // contentType: 'multipart/form-data',
                    data: {
                        mobile: $('#username_index').val(),
                        password: $('#password_index').val()
                    },
                    success: function(back) {
                        debugger;
                        if (back.status === 'Y') {
                            setCookie('access_token', Base64.encode(JSON.stringify(back)));
                            window.location.reload();
                        } else {
                            alert(back.msg);
                        }
                    }
                });
            } else {
                alert('请输入正确手机号和密码');
            }
        });
    }

    //在线下单
    var quickSend = function (argument) { 
        $('#index_send_box').show();
        $('#send_index').autoregion();
        $('#arrive_index').autoregion();
        $('#index_send').off('click').on('click', function(event) {
            event.preventDefault();
            if ($('input[name="hd_send_index"]').val() && $('input[name="hd_arrive_index"]').val()) {
                window.location.href = 'quote-create.html?sid='+$('input[name="hd_send_index"]').val()+'&eid='+$('input[name="hd_arrive_index"]').val();
            } else {
                if (!$('input[name="hd_send_index"]').val()) {
                    $('#banner_send_info').html('请选择装货地址');
                } else {
                    $('#banner_send_info').html('请选择卸货地址');
                }
            }
        });
    }

    //首页邀请banner跳转
    var bannerClick = function () {
        // $('#invite_click').off('click').on('click', function(event) {
        //     event.preventDefault();
        //     if (getCookie('access_token') && JSON.parse(Base64.decode(getCookie('access_token'))).data.token) {
        //        window.location.href = 'user.html?target=user_invite.html';
        //     } else {
        //         $('#pop_login_out').modal('toggle');
        //         $('#login_out_box a').eq(0).trigger('click');
        //     }
        // });

        $('#banner_5').off('click').on('click', function(event) {
            event.preventDefault();
            window.open('http://mp.weixin.qq.com/s?__biz=MzAxNzI0NDEwNw==&mid=400165470&idx=1&sn=0f0d7337c179c657b3ca41cd5bfbc717&scene=0#wechat_redirect');
        });
    }


    var banner1Click = function () {
        $('#star_click').off('click').on('click', function(event) {
            window.location.href = 'http://vote.fuyoukache.com/agent/vote.html';
        });
    }

    return {
        init: function(){
            console.log("init:start!");
            setUser();
            ////userActive();
            // pageCheck();
            //loginGo();
            popLoginOut();
            // grow();
            // links();
            // report();
            // quickSend();
            // banner1Click();
            // bannerClick();

        }
    }
};

new CHENGDA.www.index().init();
