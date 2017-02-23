CHENGDA.www.register = function () {
    var voiceStatus = true;
    var imgKeyRandom = '';
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
                        required: true//,
                        //phoneZH: true
                    },
                    contact: {
                        //contactReg: true,
                        required: true
                    },
					password: {
                        //passwordReg: true,
                        required: true
                    },
                    rpassword: {
					    equalTo: "#password",
					    required:true
				    },
                    verifyCode: {
                        required: true,
                        number: true
                    },
                    imgcodeinput: {
                        required: true
                    }
                },
                messages: {
                    userTel: {
                        required: "请输入手机号"
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
     //$("#submit_user").on('click',function(){
        // var param = {
        //     userTel: $('#phone').val(),
        //     verifyCode:$('#verifyCode').val(),
        //     password: $('#password').val(),
        // }
        console.log("已进入");
        //return ;
        $.ajax({
            url: "/cargocn-cloud-server/creatUser.do",//BASE_API_URL,
            type: 'POST',
            async: true,
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
                   $("#pop_login_out").modal("hide");
                }else{
                	console.log("注册失败！");
                }

            }
        });
     //});
    };

    var setUser = function(page_name) {
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
    };

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
	    var timer = null;
	    timer = setInterval(function(){
	        second -= 1;
	        if(second >0 ){
	            $('#code_second').html(second);
	        }else{
	            clearInterval(timer);
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
		    	console.log("获取验证码成功！");
		    	resetCode(); //倒计时
		    	//return;
		        $.ajax({
		            url: "/cargocn-cloud-server/getUserLoginCode.do?userPhone=" + userPhone,
		            type: "POST",
		            dataType: "json",
		            success: function(result) {
		               console.log(result);
		               if(result.code==100){
		                 //resetCode(); //倒计时
		                 console.log(result.data);
		               }else{
		                 console.log("获取验证码失败！");
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