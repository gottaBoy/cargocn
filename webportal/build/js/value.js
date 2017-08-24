//$(function(){
	//$("#submit").on('click', function(){
		//alert("submitted");
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
        //表单验证
		$("#contactForm").validate(function(){
			//errorElement: 'span', //default input error message container
            //errorClass: 'help-block help-block-error', // default input error message class
            //focusInvalid: false, // do not focus the last invalid input
            //ignore: "",  // validate all fields including form hidden input
	        /*rules: {
                username: {
                    required: true,
                    isMobile: true
                },
                contact: {
                    //contactReg: true,
                    required: true
                },
				passworder: {
                    //passwordReg: true,
                    required: true
                },
                rpassword: {
				    //equalTo: "#password",
				    required:true
			    },
                verifyCode: {
                    required: true//,
                    //codeLength: true
                },
                imgcodeinput: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: "请输入手机号"//,
                    //isMobile:"请正确填写您的手机号码"
                },
                contact: {
                    required: "联系人不能为空"
                },
				passworder: {
                    required: "请设置6~20个字符组合"
                },
                rpassword:{
                	required:"请重新输入密码"//,
                	//equalTo:"两次密码不相同"
                },
                // usertype: {
                //     required: "请选择用户类型"
                // },
                verifyCode: "请输入手机验证码",
                imgcodeinput: "请输入图形验证码"
            }*/
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
                console.log("ok");
            }
		});
	     // $("#contactForm").submit();
	 //     submitHandler: function() {
		// 	alert("submitted!");
		// }
	     //用户名
	 //     var validate = function(){
		    
		// }
		
	//})
//})
