/*
cookie helper class
easy to write,get,delete
 */
var myCookie={
    get:function(name){
        if(typeof name != "undefined")
        {
            //if name given call the get value function
            return myCookie_get(name);
        }else{
            //if name is not given,i want get all the cookie item
            return myCookie_getAll();
        }
    },
    add:function(name,value,options){
        //write the cookie
        myCookie_add(name,value,options);
    },
    delete:function(name){
        //delete the cookie
        myCookie_add(name,null);
    }
}

String.prototype.Trim = function()
{
    return this.replace(/^\s+/g,"").replace(/\s+$/g,"");
}

/*
cookie write function
@name:the cookie name not null
@value:the cookie value null==delete the cookie
@option:{"expires":expire time;"path":/;"domain":localhost;"secure":secure}
 */
function myCookie_add(name,value,options)
{
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
}

/*
get the name cookie
@name:the cookie's name
 */
function myCookie_get(name)
{
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].Trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/*
get all the cookie return as a json
 */
function myCookie_getAll()
{
    var cookieArray = new Array();
    var str="";
    var temp;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].Trim();
            temp=cookie.split('=');
            //take the
            cookieArray.push("{\"name\":\""+decodeURIComponent(temp[0])+"\",\"value\":\""+decodeURIComponent(temp[1])+"\"}");
        }
        str=cookieArray.join(",");
    }
    str="["+str+"]";
    return eval('('+str+')');
}
//使用例子
// myCookie.add("useraccount","admin",{"expires":5});//加入一个期限为5天的cookie
// alert(myCookie.get("useraccount"));//取出cookie
// cookies=myCookie.get();//得到所有的cookie
// for(var i=0;i<cookies.length;i++)
// {
//     alert(cookies[i]["name"]+":"+cookies[i]["value"]);
// }
// myCookie.delete("useraccount");//删除刚刚添加的cookie
// alert(myCookie.get("useraccount"));