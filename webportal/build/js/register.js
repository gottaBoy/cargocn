CHENGDA.www.register = function () {
    var voiceStatus = true;
    var imgKeyRandom = '';
    var timer = null;
     // 手机号码验证 
    $.validator.addMethod("isMobile", function(value, element) { 
        var length = value.length; 
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
        return this.optional(element) || (length == 11 && mobile.test(value)); 
    }, "请正确填写您的手机号码"); 

    $.validator.addMethod("codeLength", function(value, element) { 
        //var length = value.length; 
        var num = /^(\d{4})$/; 
        return this.optional(element) || (num.test(value)); 
    }, "请输入4位数字验证码"); 

    $.validator.addMethod("passwordReg", function(value, element) { 
        var length = value.length;
        var tpassword = /^[\w]{6,20}$/;///^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/; 
        return this.optional(element) || (tpassword.test(value)); 
    },"请输入密码6-20个字符");

    // validation using icons
    var handleValidation = function() {
        // for more info visit the official plugin documentation:
            // http://docs.jquery.com/Plugins/Validation

            var form2 = $('#register_form');
            var error2 = $('.alert-danger', form2);
            var success2 = $('.alert-success', form2);

            form2.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                rules: {
                    userTel: {
                        required: true,
                        isMobile: true
                    },
                    contact: {
                        //contactReg: true,
                        required: true
                    },
					password: {
                        passwordReg: true,
                        required: true
                    },
                    rpassword: {
					    equalTo: "#password",
					    required:true
				    },
                    verifyCode: {
                        required: true,
                        codeLength: true
                    },
                    imgcodeinput: {
                        required: true
                    }
                },
                messages: {
                    userTel: {
                        required: "请输入手机号",
                        isMobile:"请正确填写您的手机号码"
                    },
                    contact: {
                        required: "联系人不能为空"
                    },
					password: {
                        required: "请设置6~20个字符组合"
                    },
                    rpassword:{
                    	required:"请重新输入密码",
                    	equalTo:"两次密码不相同"
                    },
                    // usertype: {
                    //     required: "请选择用户类型"
                    // },
                    verifyCode: "请输入手机验证码",
                    imgcodeinput: "请输入图形验证码"
                },
                invalidHandler: function (event, validator) { //display error alert on form submit
                    // success2.hide();
                    // error2.show();
                    //Metronic.scrollTo(error2, -200);
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    var icon = $(element).parent('.input-icon').children('i');
                    icon.removeClass('fa-check').addClass("fa-warning");
                    icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight

                },

                success: function (label, element) {
                    var icon = $(element).parent('.input-icon').children('i');
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                    icon.removeClass("fa-warning").addClass("fa-check");
                },

                submitHandler: function (form) {
                    // success2.show();
                    // error2.hide();
                    registerSet({
                        userTel: $('#phone').val(),
                        verifyCode: $('#verifyCode').val(),
                        //username: $('#contact').val(),
						password: $('#password').val(),
                        // account_type: $('#usertype').val(),
                        //invitation_code: $('#invite').val()
                    });
                }
            });


    };

    var registerSet = function(param){
        console.log(moment() + "start ajax register");
        //$("#pop_login_out").modal("toggle");
        //$('#login_out_box a').eq(0).trigger('click');
        //return;
        $.ajax({
            url: "/cargocn-cloud-server/creatUser.do",//BASE_API_URL,
            type: 'POST',
            //async: true,
            dataType: 'JSON',
            data: param,
            success: function(result) {
     //            if (back.status === 'Y') {
     //                //setCookie('access_token', Base64.encode(JSON.stringify(back)));
     //                //$('#pop_login_out').modal('toggle');
     //                //setUser();
     //                //if (window.location.href.match('index') && window.location.href.match('index').length > 0) {
     //                    //$('#index_login_box').hide();
     //                //};
     //                //if (window.location.pathname.match('invitee.html') && window.location.pathname.match('invitee.html').length > 0) {
     //                   // window.location.reload();
     //                //};
					// $("#alert_box span").html(back.msg);
					// $("#alert_box").show();
     //            } else {
     //                alert(back.msg);
     //            }
                //console.log(result);
                if(result.code=="100"){
                   console.log("register success");
                   //$("#pop_login_out").modal("toggle");
                   $('#login_out_box a').eq(0).trigger('click');
                   $("#alert_box span").html("恭喜您注册成功,请登录!");
                }else{
                    console.log(moment() + "register error");
                    $("#alert_box span").html("注册失败,请稍后重试!");
                }
                //$("#alert_box span").html(result.msg);
				$("#alert_box").show();
				if(timer==null){//5s后错误信息消失
					timer=setTimeout(function(){
						$("#alert_box span").html("");
						$("#alert_box").hide();
						clearTimeout(timer);
						timer=null;
					},10000);
				}
            }
        });
     //});
    };

    /*var setUser = function(page_name) {
        if (getCookie('access_token')) {
            var user_data = JSON.parse(Base64.decode(getCookie('access_token')));
            $('#headerAccount a').attr({
                href: 'user.html'
            }).html('<i class="fa fa-user"></i> '+(user_data.data.name?user_data.data.name:user_data.data.mobile));
            $('#logout a').attr({
                href: 'logout.html'
            }).html('<i class="fa fa-sign-out"></i> 退出');
        } else {
            $('#headerAccount a').attr({
                href: 'login.html'
            }).html('<i class="fa fa-sign-in"></i> 登录');
            $('#logout a').attr({
                href: 'register.html'
            }).html('<i class="fa fa-user-plus"></i> 申请加入');
            $('#logout').off('click');
        }
    };*/

    var sendPhoneCode = function(codetype, intervarObj) {
        if ($('#imgcodeinput').val()) {
            $.ajax({
                url: BASE_API_URL+'/user/verifyCode',
                type: 'POST',
                async: true,
                dataType: 'JSON',
                data: {
                    img: imgKeyRandom,
                    code: $('#imgcodeinput').val(),
                    type: 1,
                    mobile: $('#phone').val(),
                    extend: codetype
                },
            })
            .done(function(back) {
                if (back.status == 'N') {
                    alert(back.msg);
                    clearInterval(intervarObj);
                    if (codetype == 'text') {
                        $('#message_code').val('重新获取验证码');
                    };
                    $('#message_code').attr('disabled', false);
                    $('#imgcode').trigger('click');
                    voiceStatus = true;
                    $('#imgcodeinput').val('');
                };
            });
        } else {
            alert('请输入图片验证码');
        };
    };

    var sendImgCode = function() {
        $('#imgcodeinput').blur(function(event) {
            if ($('#imgcodeinput').val()) {
                $.ajax({
                    url: BASE_API_URL+'/common/verifyImageCode',
                    type: 'POST',
                    async: true,
                    dataType: 'JSON',
                    data: {
                        code: $('#imgcodeinput').val(),
                        img: imgKeyRandom
                    },
                })
                .done(function(back) {
                    if (back.status == 'Y') {
                        $('#voice_box').show();
                        $('#checkcode').removeAttr('disabled');
                        $('#message_code').removeAttr('disabled');
                    } else {
                        $('#voice_box').hide();
                        $('#checkcode').attr('disabled', 'disabled');
                        $('#message_code').attr('disabled', 'disabled');

                        $('#imgcode').trigger('click');
                        var icon = $('#imgcodeinput').parent('.input-icon').children('i');
                        icon.removeClass('fa-check').addClass("fa-warning");
                        icon.attr("data-original-title", back.msg).tooltip({'container': 'body'});
                        $('#imgcodeinput').closest('.form-group').removeClass("has-success").addClass('has-error');
                    }
                });
            };
        });
    }

    var getImgCode = function() {
        $('#imgcode').click(function(event) {
            imgKeyRandom = Math.random();
            $('#imgcode').attr({
                src: BASE_API_URL+'/common/imageCode?img='+imgKeyRandom
            });
        }).trigger('click');
    };



    var getPhoneCode = function(){
        $('#message_code').on('click', function(event){
            event.preventDefault();
            if (/^1\d{10}$/.test($('#phone').val())) {
                if ($('#imgcodeinput').val()) {
                    var num = 59;
                    var checktime = setInterval(function(){
                        if (num > 0) {
                            $('#message_code').val(num+'秒后重试');
                            $('#message_code').attr('disabled', true);
                            --num;
                        } else {
                            clearInterval(checktime);
                            $('#message_code').val('重新获取验证码');
                            $('#message_code').attr('disabled', false);
                        }
                    }, 1000);

                    sendPhoneCode('text', checktime);
                } else {
                    alert('请输入图形验证码');
                }
            } else {
                //alert('请输入正确手机号');
                var icon = $('#phone').parent('.input-icon').children('i');
                icon.removeClass('fa-check').addClass("fa-warning");
                icon.attr("data-original-title", '请输入正确手机号').tooltip({'container': 'body'});
                $('#phone').closest('.form-group').removeClass("has-success").addClass('has-error');
            };
        });

        $('#voice_code').on('click', function(event){
            event.preventDefault();
            if (/^1\d{10}$/.test($('#phone').val()) && voiceStatus) {
                if ($('#imgcodeinput').val()) {
                    voiceStatus = false;
                    var num = 59;
                    var checktime = setInterval(function(){
                        if (num > 0) {
                            $('#voice_code').html(num+'秒后重试');
                            $('#voice_code').attr('disabled', true);
                            --num;
                        } else {
                            voiceStatus = true;
                            clearInterval(checktime);
                            $('#voice_code').html('重新获取语音验证码');
                            $('#voice_code').attr('disabled', false);
                        }
                    }, 1000);
                    sendPhoneCode('voice', checktime);
                } else {
                    alert('请输入图形验证码');
                }
            } else {
                if (voiceStatus) {
                    var icon = $('#phone').parent('.input-icon').children('i');
                    icon.removeClass('fa-check').addClass("fa-warning");
                    icon.attr("data-original-title", '请输入正确手机号').tooltip({'container': 'body'});
                    $('#phone').closest('.form-group').removeClass("has-success").addClass('has-error');
                } else {
                    alert('正在获取语音验证码...');
                }
            }
        });
    };

    //倒计时
	var resetCode = function(){
	    $('#getCode').hide();
	    $('#code_second').html('60');
	    $('#resetCode').show();
	    var second = 60;
	    var timer1 = null;
	    timer1 = setInterval(function(){
	        second -= 1;
	        if(second >0 ){
	            $('#code_second').html(second);
	        }else{
	            clearInterval(timer1);
	            $('#getCode').show();
	            $('#resetCode').hide();
	        }
	    },1000);
	};

    var getVerifyCode = function(){
        /*获取验证码*/
		var isPhone = 0;
		$("#getCode").on("click",function(){
		    //checkPhone(); //验证手机号码
		    var userPhone = $("#phone").val();
		    if(/^1\d{10}$/.test($('#phone').val())){
		    	console.log(moment() + "start get code");
		    	resetCode(); //倒计时
		    	//return;
		        $.ajax({
		            url: "/cargocn-cloud-server/getUserLoginCode.do?userPhone=" + userPhone,
		            type: "POST",
		            dataType: "json",
		            success: function(result) {
		                //console.log(result);
		                if(result.code==100){
		                   console.log(moment() + result.msg);
                           $("#alert_box span").html("恭喜您获取验证码成功！");
		                }else{
		                   console.log(moment() + " get code error");
                           $("#alert_box span").html("获取验证码失败,请稍后重试！");
		                }
		                //$("#alert_box span").html(result.msg);
						$("#alert_box").show();
						if(timer==null){//5s后错误信息消失
							timer=setTimeout(function(){
								$("#alert_box span").html("");
								$("#alert_box").hide();
								clearTimeout(timer);
								timer=null;
							},10000);
						}
		            }
		        });
		    }else{
		    	var icon = $('#phone').parent('.input-icon').children('i');
                icon.removeClass('fa-check').addClass("fa-warning");
                icon.attr("data-original-title", '请输入正确手机号').tooltip({'container': 'body'});
                $('#phone').closest('.form-group').removeClass("has-success").addClass('has-error');
		        $('#phone').focus();
		    }
		});
    };

    return {
        //main function to initiate the module
        init: function () {
            //registerSet(1);
            getVerifyCode();
            handleValidation();
            //getImgCode();
            //sendImgCode();
            //getPhoneCode();

        }

    };

}();
CHENGDA.www.register.init();
// $(function(){
// 	$("#submit_user").on('click',function(){

// 	})
// })