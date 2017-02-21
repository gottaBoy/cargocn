CHENGDA.www.login = function () {
	myCookie.add("access_token","18226626908",{"expires":5});
	var voiceStatus = true;
	var timer=null;
	var imgKeyRandom = '';
	var issubmits=true;
	var loginTimes=0;
	// validation using icons
	var handleValidation = function() {
		// for more info visit the official plugin documentation:
		// http://docs.jquery.com/Plugins/Validation

		var form2 = $('#logins_form');
		var error2 = $('.alert-danger', form2);
		var success2 = $('.alert-success', form2);

		form2.validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block help-block-error', // default input error message class
			focusInvalid: false, // do not focus the last invalid input
			ignore: "",  // validate all fields including form hidden input
			rules: {
				phone: {
					required: true,
					phoneZH: true
				},
				password: {
					passwordReg: true,
					required: true
				}
			},
			messages: {
				phone: {
					required: "请输入手机号"
				},
				password: {
					required: "密码为6~20个字符组合"
				}
			},
			invalidHandler: function (event, validator) { //display error alert on form submit
				success2.hide();
				error2.show();
				//Metronic.scrollTo(error2, -200);
			},

			errorPlacement: function (error, element) { // render error placement for each input type
				var icon = $(element).parent('.input-icon').children('i');
				icon.removeClass('fa-check').addClass("fa-warning");
				icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
			},

			highlight: function (element) { // hightlight error inputs
				$(element).closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group
			},

			unhighlight: function (element) { // revert the change done by hightlight

			},

			success: function (label, element) {
				var icon = $(element).parent('.input-icon').children('i');
				$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
				icon.removeClass("fa-warning").addClass("fa-check");
			},

			submitHandler: function (form) {
				loginSet({
					mobile: $('#phone').val(),
					password: $('#password').val()
				});
			}
		});


	};
	// var initLogtimes=function(i){
	// 	var isCookieT=getCookie('logintimes')?getCookie('logintimes'):null;
	// 	if(isCookieT==null){
	// 		setCookie('logintimes',0);
	// 	}else{
	// 		if(isCookieT>=3){
	// 			$("#imgcodecont").fadeIn(100);
	// 		}
	// 	}
	// }
	// initLogtimes();
	// var cLoginTimes=function(){
	// 	$("#phone").off("change").on("change",function(){
	// 		if(/^1\d{10}$/.test($(this).val())){
	// 			$.ajax({
	// 				url: BASE_API_URL+'/user/logintimes',
	// 				type: 'POST',
	// 				async: false,
	// 				dataType: 'JSON',
	// 				data: {mobile:$("#phone").val()},
	// 				success: function(back) {
	// 					if(back.data.login_times>3&&back.data.login_times<=5){
	// 						$("#imgcodecont").fadeIn(100);
	// 					}else if(back.login_times>5){
	// 						$("#imgcodecont").fadeIn(100);
	// 						$("#alert_box span").html(back.msg);
	// 						$("#alert_box").show();
	// 						if(timer==null){//5s后错误信息消失
	// 							timer=setTimeout(function(){
	// 								$("#alert_box span").html("");
	// 								$("#alert_box").hide();
	// 								clearTimeout(timer);
	// 								timer=null;
	// 							},5000);
	// 						}
	// 					}else{
	// 						$("#alert_box span").html("");
	// 						$("#alert_box").hide();
	// 						$("#imgcodecont").fadeOut(0);
	// 					}
	// 					loginTimes=back.data.login_times;
	// 				}
	// 			});
	// 		}
	// 	});
	// };
	// var sendImgCode = function() {
	// 	$('#imgcodeinput').blur(function(event) {
	// 		if ($('#imgcodeinput').val()) {
	// 			$.ajax({
	// 					url: BASE_API_URL+'/common/verifyImageCode',
	// 					type: 'POST',
	// 					async: false,
	// 					dataType: 'JSON',
	// 					data: {
	// 						code: $('#imgcodeinput').val(),
	// 						img: imgKeyRandom
	// 					}
	// 				})
	// 				.done(function(back) {
	// 					if (back.status == 'Y') {
	// 						issubmits=true;
	// 					} else {
	// 						issubmits=false;
	// 						$('#imgcode').trigger('click');
	// 						var icon = $('#imgcodeinput').parent('.input-icon').children('i');
	// 						icon.removeClass('fa-check').addClass("fa-warning");
	// 						icon.attr("data-original-title", back.msg).tooltip({'container': 'body'});
	// 						$('#imgcodeinput').closest('.form-group').removeClass("has-success").addClass('has-error');
	// 					}
	// 				});
	// 		};
	// 	});
		// $('#imgcodeinput').keyup(function(){
		// 	if($('#imgcodeinput').val()){
		// 		var icon = $('#imgcodeinput').parent('.input-icon').children('i');
		// 		icon.removeClass('fa-warning').addClass("fa-check");
		// 		icon.attr("data-original-title", "").tooltip({'container': 'body'});
		// 		$('#imgcodeinput').closest('.form-group').removeClass("has-error").addClass('has-success');
		// 	}
		// });
	//};
	// var getImgCode = function() {
	// 	$('#imgcode').click(function(event) {
	// 		imgKeyRandom = Math.random();
	// 		$('#imgcode').attr({
	// 			src: BASE_API_URL+'/common/imageCode?img='+imgKeyRandom
	// 		});
	// 	}).trigger('click');
	// };

	var loginSet = function (param) {
		console.log('loginSet:' + param);
		// loginTimes=getCookie('logintimes');
		// if(loginTimes>=3){
		// 	$("#imgcodecont").fadeIn(100);
		// 	if(!$('#imgcodeinput').val()){
		// 		var icon = $('#imgcodeinput').parent('.input-icon').children('i');
		// 		icon.removeClass('fa-check').addClass("fa-warning");
		// 		icon.attr("data-original-title","请输入图形验证码").tooltip({'container': 'body'});
		// 		$('#imgcodeinput').closest('.form-group').removeClass("has-success").addClass('has-error');
		// 		issubmits=false;
		// 	}else{
		// 		$('#imgcodeinput').trigger("blur");
		// 	}
		// }
		//if(issubmits){
			// $.ajax({
			// 	url: BASE_API_URL+'/user/login',
			// 	type: 'POST',
			// 	async: true,
			// 	dataType: 'JSON',
			// 	data: param,
			// 	success: function(back) {
					
					//if (back.status === 'Y') {
						//var checked = $('#remember_login').is(':checked') ? 30 : null;
						//setCookie('access_token', Base64.encode(JSON.stringify(back)), checked);
						
						//$('#pop_login_out').modal('toggle');
						setUser(1);
						// if (window.location.href.match('index') && window.location.href.match('index').length > 0) {
						// 	$('#index_login_box').hide();
						// 	quickSend();
						// } else if (window.location.href.match('quote-create') && window.location.href.match('quote-create').length > 0) {
						// 	if (window.quoteCreateObj) {
						// 		quoteCreateObj.retryPayType();
						// 	}
						// }else if(window.location.href.match('invitee') && window.location.href.match('invitee').length > 0){
						// 	if (window.inviteeObj) {
						// 		inviteeObj.register();
						// 	}
						// }

						// var urls=window.location.href;
						// var isQuote=(urls.indexOf("quote-create.html")>0) ? true : false;
						// if(isQuote){
						// 	if(back.data.is_quote==0){
						// 		$("#noQuote").modal("show");
						// 		$("#closeNoQuote").off("click").on("click",function(){
						// 			$("#noQuote").modal("hide");
						// 		});
						// 	}
						// 	setQuoteServ(back);
						// }
						// if(back.data.overdue){
						// 	$('#msg_order').text(back.data.overdue.overdue_msg)
						// 	$('#tixing').modal("show");
						// 	$('#i_know').click(function(event) {
						// 		/* Act on the event */
						// 		$('#tixing').modal("hide");
						// 	});
						// }
					//} else {
						// setCookie('logintimes',++loginTimes);
						// if(loginTimes>=3){
						// 	$("#imgcodecont").fadeIn(100);
						// 	$('#imgcode').trigger("click");
						// }
						// $("#alert_box span").html(back.msg);
						// $("#alert_box").show();
						// if(timer==null){//5s后错误信息消失
						// 	timer=setTimeout(function(){
						// 		$("#alert_box span").html("");
						// 		$("#alert_box").hide();
						// 		clearTimeout(timer);
						// 		timer=null;
						// 	},10000);
						// }
					//}
				//}
			//});
		//}
	};

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
	var setUser = function(page_name) {
		if (myCookie.get('access_token')) {//getCookie('access_token')
			// var user_data = JSON.parse(Base64.decode(getCookie('access_token')));
			// if(user_data.data.check_status==0){
			// 	 var userHtml="user.html?target=user_data.html"; 
			// 	var userHtml="user.html";
			// }else{
			// 	var userHtml="user.html";
			// }
			var userHtml="/";
			$("#headerAccount a").attr({
				href: userHtml
			}).html(myCookie.get('access_token'));//(user_data.data.name?user_data.data.name:user_data.data.mobile));//'<i class="fa fa-user"></i> '+ 
			$('#logout a').attr({
				href: 'logout.html'
			}).html('退出');//<i class="fa fa-sign-out"></i>
			//showIndent(user_data);
		} else {
			$('#headerAccount a').attr({
				href: 'login.html'
			}).html('登录');//<i class="fa fa-sign-in"></i> 
			$('#logout a').attr({
				href: 'register.html'
			}).html('注册');//<i class="fa fa-user-plus"></i> 
			//$('#logout').off('click');
		}
	};

	return {
		//main function to initiate the module
		init: function () {
			//cLoginTimes();
			//getImgCode();
			//sendImgCode();
			//handleValidation();
            loginSet(1);
		}

	};

}();
CHENGDA.www.login.init();