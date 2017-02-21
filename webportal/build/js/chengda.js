/*var CHENGDA = {};
CHENGDA.www = {};
CHENGDA.www.userData = {};

CHENGDA.www.FYCKWWWINIT = function(d) {

}*/

CHENGDA.www.index = function() {

}

CHENGDA.www.index.prototype.init = function() {

}
$(function(){
	$('#headerAccount a').on('click', function(event) {
	    event.preventDefault();
	    debugger;
	    if ($(this).attr('href') == 'login_form') {
            $('#pop_login_out').modal('show');
            $('#pop_login_out .modal-dialog').removeClass('modal-md').addClass('modal-sm');
            $('#login_form').show();
            $('#register_form').hide();
	    }else if($(this).attr('href') == 'register_form'){
            $('#pop_login_out').modal('show');
            $('#pop_login_out .modal-dialog').removeClass('modal-sm').addClass('modal-md');
            $('#login_form').hide();
            $('#register_form').show();
	    }
	    
	    // if ($(this).attr('href') == 'user.html') {
	    //     window.location.href = 'user.html';
	    // }else if($(this).attr('href') == 'user.html?target=user_data.html') {
	    //     window.location.href = 'user.html?target=user_data.html';
	    // } else {
	    //     //登录pop窗口
	    //     $('#pop_login_out').modal('show');
	    //     //$('#pop_login_out').modal('toggle');
	    //     //$('#login_out_box a').eq(0).trigger('click');
	    // }
	})
})
