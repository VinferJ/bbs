
/*
* 主页的自定义js文件
* */

/*定义全局的数据数组，用于存放帖子数据，用于分组*/
/*首页全部数据*/
let indexPageData=[];
let thumbCounter=1;
/*所有帖子的数据*/
let allPostsData=[];
/*置顶帖数据*/
let topPostsData=[];
$(function () {

    /*
* 由于前端页面不管是js还是jquery都不允许直接操作后端生产的session数据
* 因此在页面渲染时，新建session信息，存储用户的登录状态以及页面加载状态
* 用户的登录状态用于某些操作的判别
* 页面加载状态用于判断是否需要重新到后端获取数据
* */
    if (sessionStorage.length===0){
        sessionStorage.setItem("loginState",false);
        sessionStorage.setItem("loadState",false);
    }


    /*初始化alert提示框的显示效果*/
    toastr.options= {
        "closeButton":false,//显示关闭按钮
        "debug":false,//启用debug
        "positionClass":"toast-top-center",//弹出的位置
        "showDuration":"300",//显示的时间
        "hideDuration":"1000",//消失的时间
        "timeOut":"2000",//停留的时间
        "extendedTimeOut":"1000",//控制时间
        "showEasing":"swing",//显示时的动画缓冲方式
        "hideEasing":"linear",//消失时的动画缓冲方式
        "showMethod":"fadeIn",//显示时的动画方式
        "hideMethod":"fadeOut"//消失时的动画方式
    };

    /*
    * 给左侧栏第一个按钮添加样式和修改name
    * 不能将name属性直接写在div的属性里
    * 这样会导致div的默认name属性被设置
    * 会导致后面通过name点击按钮改变样式无效
    * */
    $("#all-notes").css("font-weight","bolder").css("background","#009a61").css("color","white")
        .attr("name","left-side-btn-active");

    /*
    * 加载首页数据，通过ajax获取后进行渲染
    * 这是我开始的想法，但是用jquery宣传出来的标签
    * 对于name属性不能绑定，即后续再使用jquery操作dom时（按照name定位button）
    * 会出现函数无法生效的情况，所以还是用jsp来渲染首页的数据
    * */
    /*显示加载条*/
    $("#loading-data").show();
    $.ajax({
        method:"post",
        url:"bbs/load",
        data:{},
        dataType:"json",
        success:function (callback) {
            let cardBody=$("#card-body");
            let rightSide=$("#right-side");
            indexPageData=callback.callbackData;
            if (indexPageData!==undefined ){
                allPostsData=indexPageData.allPostsData;
                topPostsData=indexPageData.topPostsData;
                if (allPostsData!==null){
                    cardBody.empty();
                    for (let i=0;i<allPostsData.length;i++) {
                        cardBody.append("<div class=\"note-card\">\n" +
                            "                    <div class=\"note-title\"><input value="+allPostsData[i].postsId+" hidden>" +
                            "<h4 style=\"color: #212121\">"+allPostsData[i].title+"</h4></div>\n" +
                            "                    <div class=\"note-content\">\n" +allPostsData[i].content+
                            "                    </div>\n" +
                            "                    <div class=\"note-opt\">\n" +
                            "                        <!--该隐藏的输入框用于存放帖子的id-->\n" +
                            "                        <!--点赞按钮，这里为了简单，用户以及游客均可为帖子点赞-->\n" +
                            "                        <button type=\"button\" class=\"btn btn-light\"  name=\"thumb\" style=\"width: 36px;height:36px;font-size: 14px;font-weight:bolder;border: 0;text-align: center;\n" +
                            "                          border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%; color: #009a61\">赞</button>\n" +
                            "                        <span style=\"color: #009a61;font-weight: bolder;font-size: 14px\"> x "+allPostsData[i].thumbNum+"</span>\n" +
                            "                        <!--此处显示发帖用户的用户名-->" +
                            "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 20%;font-size: 14px;color:#999999;border: 0;text-align: center;background: #FFFFFF;margin-left: 10px\">"+
                            "                       <a class='text-decoration-none' href='bbs/userInfoPage?userName="+allPostsData[i].postUser+"'>"+allPostsData[i].postUser+"</a>"+"</button>"+
                            "                        <!--此处显示发帖时间-->\n" +
                            "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 30%;font-size: 14px;color:#999999;border: 0;text-align: left;background: #FFFFFF;margin-left: 10px\">"+allPostsData[i].postDate+"</button>\n" +
                            "                    </div>\n" +
                            "                </div>");
                    }
                    /*渲染完成后关闭*/
                    $("#loading-data").hide();
                }else {
                    $("#loading-data").hide();
                    cardBody.append("<div  style='text-align: center;width: 100%;margin-top: 50px'>论坛还没有任何用户发表帖子呢，快去抢沙发吧！</div>");
                }
                if (topPostsData!==null){
                    for (let i = 0; i <topPostsData.length ; i++) {
                        rightSide.append("<div class='boutique-recommend'>" +
                            "                <div style='width: 100%;height: 32px;display: block'>" +
                            "       <input value='"+topPostsData[i].postsId+"' hidden><span style='font-size: 17px;font-weight: bold' class='top-post-title'>"+topPostsData[i].title+"</span>" +
                            "                </div>" +
                            "                <div style='width: 100%;height: 1.5px;background: #999999'></div>\n" +
                            "                <div class='top-post-content'>"+topPostsData[i].content+"</div>" +
                            "            </div>");
                    }
                }else {
                    $("#loading-data").hide();
                    rightSide.append("<div style='width: 100%;text-align: center;margin-top: 5%'>暂无置顶帖哦</div>");
                }

            }
        },
        error:function () {
            $("#loading-data").hide();
            toastr.error("服务异常，数据加载失败");
        }
    });

});

/*
* 登录输入验证
* */
$("#signIn-btn").click(function () {
    var loginAcc=$("#loginAcc").val();
    var password=$("#password").val();
    if (loginAcc===''){
        $("#check-loginAcc-tip").text("请输入登录账号！");
    }
    if (password===''){
        $("#check-password-tip").text("请输入登录密码！");
    }
    if (loginAcc!==''&&password!==''){
        /*显示加载条*/
        $("#loading-sp-1").attr("style","display:flex;position: absolute;margin-left: 190px;z-index: 999");
        $.ajax({
            method:"post",
            url:"bbs/signIn",
            data:{
                loginAcc:loginAcc,
                password:password
            },
            dataType:"json",
            success:function (callback) {
                if (callback.successFlag){
                    /**
                     * 用户登录成功后
                     * 将页面session的登录状态设置为true
                     */
                    $.session.set("loginState",true);
                    /*
                    * 登录成功后不做任何页面跳转，但是需要显示相应的用户信息
                    * 顶部栏会显示用户已登录的一些信息，并且关闭对话框
                    * 所以直接刷新页面就行了
                    * */
                    window.location.reload();
                }else{
                    swal("验证失败","账号或登录密码错误！","error");
                }
                /*
                * 关闭加载动画要放在ajax请求里面
                * 否则将不会再请求执行完成后才关闭
                * 而是立刻关闭，因为这是异步请求
                * */
                $("#loading-sp-1").attr("style","display:none");
            },
            error:function () {
                /*关闭加载动画*/
                $("#loading-sp-1").attr("style","display:none");
                swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
            }
        });

    }
});

/*
* 用户登出
* */
$("#signOut").click(function () {
    /*
    * 将用户登录状态的session信息删除，带重新载入
    * 页面时重新初始化该session信息
    * */
    $.session.remove("loginState");
    $.ajax({
        method:"post",
        url:"bbs/signOut",
        data:{},
        dataType:"json",
        success:function () {
            window.location.reload();
        },
        error:function () {
            swal("服务异常","","error");
        }
    });
});

/*
* 校验提示显示隐藏
* */
$("#loginAcc").change(function () {
    $("#check-loginAcc-tip").text("");
});
$("#password").change(function () {
    $("#check-password-tip").text("");
});

/*
* 注册对话框div显示
* */
$("#registerAcc-btn").click(function () {
    $("#signIn-content").attr("style","display:none");
    $("#register-content").attr("style","display:flex");
    $("#modalLabel").text("用户注册");
});

/*
* 登录对话框div显示，从注册回到登录
* */
$("#returnToSignIn-btn").click(function () {
    $("#register-content").attr("style","display:none");
    $("#signIn-content").attr("style","display:flex");
    $("#modalLabel").text("用户登录");
});
/*
*从重置密码回到登录
* */
$("#returnToSignIn-btn-reset").click(function () {
    $("#resetPwd-content").attr("style","display:none");
    $("#signIn-content").attr("style","display:flex");
    $("#modalLabel").text("用户登录");
});

/*
* 重置密码对话框div显示
* */
$("#resetPwd").click(function () {
    $("#signIn-content").attr("style","display:none");
    $("#resetPwd-content").attr("style","display:flex");
    $("#modalLabel").text("重置密码");
});

/*
* 重置密码校验
* */
$("#confirm-reset").click(function () {
    var userName=$("#userName-reset").val();
    var email=$("#email-reset").val();
    var newPassword=$("#password-reset").val();
    /*邮箱验证的正则表达式*/
    const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(userName===''){
        swal("提示","用户名不能为空哦","info");
    }else if (email===''){
        swal("提示","注册邮箱不能为空哦","info");
    }else if (!emailReg.test(email)){
        swal("提示","要输入合法的邮箱地址哦","warning");
    }else if (newPassword===''){
        swal("提示","重置密码就得输入新密码哦","info");
    }else if (newPassword.length<6){
        swal("提示","哇~说了密码长度不能小于6位嘛","warning");
    }else {
        $.ajax({
            method:"post",
            url:"bbs/resetPassword",
            data:{
                userName:userName,
                email:email,
                newPassword:newPassword
            },
            dataType:"json",
            success:function (callback) {
                if (callback.successFlag){
                    swal("重置成功","您已成功修改了密码","success");
                }else{
                    swal("重置失败","..(ಥ_ಥ)..好像出bug了，要不再试一试？","error");
                }
            },
            error:function () {
                swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
            }
        });
    }

});


/*
* 因为modal里面有三个信息的div，所以这里让
* 每次对话框关闭后都回到显示登录信息
* 隐藏其余两个信息的状态
* */
$("#myModal").on('hidden.bs.modal',function () {
    $("#register-content").attr("style","display:none");
    $("#resetPwd-content").attr("style","display:none");
    $("#signIn-content").attr("style","display:flex");
    $("#modalLabel").text("用户登录");
});

/*
* 点击注册
* */
$("#register").click(function () {
    /*
    * 让登陆信息的div隐藏
    * 让注册信息的div显示
    * */
    $("#signIn-content").attr("style","display:none");
    $("#register-content").attr("style","display:flex");
    $("#modalLabel").text("用户注册");
    /*显示对话框*/
    $("#myModal").modal('show');
});

/*
* 注册校验
* */
$("#register-btn").click(function () {
    var userName=$("#userName").val();
    var contact=$("#contact").val();
    var jobCategory=$("#jobCategory").val();
    var email=$("#email").val();
    var password=$("#register-password").val();
    /*邮箱验证的正则表达式*/
    const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    /*手机号码正则表达式*/
    const phoneNumReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (userName===''){
        swal("提示","用户名不能为空哦~","info");
    }else if(contact===''){
        swal("提示","联系不能为空哦~","info");
    } else if (!phoneNumReg.test(contact)){
        swal("提示","手机号码不可以乱来填哦~","warning");
    }else if (email===''){
        swal("提示","注册邮箱不能为空哦~","info");
    }else if (!emailReg.test(email)){
        swal("提示","注册邮箱不可以乱填哦~","warning");
    }else if (password===''){
        swal("提示","登录不能为空哦~","info");
    }else if (password.length<6){
        swal("提示","说了登录密码长度不能小于6位嘛~","warning");
    }else{
        /*
        * 验证通过，那么运行提交请求到后台进行注册
        * */
        /*显示加载条*/
        $("#loading-sp-2").attr("style","display:flex;position: absolute;margin-left: 190px;z-index: 999");
        $.ajax({
            method: "post",
            url:"bbs/signUp",
            data:{
                userName:userName,
                phoneNum:contact,
                jobCategory:jobCategory,
                email:email,
                password:password
            },
            dataType: "json",
            success:function (callback) {
                if (callback.callbackData==="existing-userName"){
                    swal("注册失败","用户名 "+userName+" 已存在了哦，换个用户名注册嘛","error");
                }else if (callback.callbackData==="existing-email"){
                    swal("注册失败","邮箱 "+email+" 已被注册了哦，换个邮箱进行注册嘛","error");
                }else if (callback.callbackData==="success"){
                    /*隐藏对话框*/
                    $("#myModal").modal('hide');
                    swal("注册成功","您已成功注册为论坛用户~( ＾∀＾）／欢迎＼( ＾∀＾）","success");
                }else {
                    swal("注册失败","好像是服务君在开小差了呢....o(╥﹏╥)....","error");
                }
                /*关闭加载动画*/
                $("#loading-sp-2").attr("style","display:none");
            },
            error:function () {
                /*关闭加载动画*/
                $("#loading-sp-2").attr("style","display:none");
                swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
            }
        });
    }
});

/*
* 分页点击操作
* */
/*上一页*/
$("#previous").click(function () {
    /*
    * 获取首页的class值，查看是否已选中
    * */
    let classStr=$("#headPage").prop("class");
    /*
    * 当首页未选中时进行上一页操作
    * */
    if (classStr.search("active")===-1){
        /*通过遍历li获取选中的页码*/
        $("li").each(function () {
           if ($(this).prop("class").search("active")!==-1){
               $(this).prop("class","page-item");
               $(this).prev().prop("class","page-item active");
               let pageNum=$(this).prev().children().text();
               let cardBody=$("#card-body");
               cardBody.empty();
               var pageData=indexPageData[parseInt(pageNum)-1];
               for (let i = 0; i <pageData.length ; i++) {
                   cardBody.append("<div class=\"note-card\">\n" +
                       "                    <div class=\"note-tile\"><h4 style=\"color: #212121\">"+pageData[i].title+"</h4></div>\n" +
                       "                    <div class=\"note-content\">\n" +pageData[i].content+
                       "                    </div>\n" +
                       "                    <div class=\"note-opt\">\n" +
                       "                        <!--该隐藏的输入框用于存放帖子的id-->\n" +
                       "                        <input value=\"note-id\" hidden>\n" +
                       "                        <!--点赞按钮，这里为了简单，用户以及游客均可为帖子点赞-->\n" +
                       "                        <button type=\"button\" class=\"btn btn-light\"  name=\"thumb\" style=\"width: 36px;height:36px;font-size: 14px;font-weight:bolder;border: 0;text-align: center;\n" +
                       "                          border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%; color: #009a61\">赞</button>\n" +
                       "                        <span style=\"color: #009a61;font-weight: bolder;font-size: 14px\"> x 2</span>\n" +
                       "                        <!--此处显示发帖用户的用户名-->\n" +
                       "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 20%;font-size: 14px;color:#999999;border: 0;text-align: center;background: #FFFFFF;margin-left: 10px\">极客Style</button>\n" +
                       "                        <!--此处显示发帖时间-->\n" +
                       "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 30%;font-size: 14px;color:#999999;border: 0;text-align: left;background: #FFFFFF;margin-left: 10px\">2019-12-23 18:19</button>\n" +
                       "                    </div>\n" +
                       "                </div>");
               }
               return false;
           }
        });
    }
});
/*下一页*/
$("#next").click(function () {
    /*
    * 获取尾页的class，查看是否已被选中
    * */
    let classStr=$("#tailPage").prop("class");
    /*
    * 当尾页未选中时可以选择下一页
    * */
    if (classStr.search("active")===-1){
        /*通过遍历li获取当前选中的页码*/
        $("li").each(function () {
            if ($(this).prop("class").search("active")!==-1){
                $(this).prop("class","page-item");
                $(this).next().prop("class","page-item active");
                let pageNum=$(this).next().children().text();
                let cardBody=$("#card-body");
                cardBody.empty();
                var pageData=indexPageData[parseInt(pageNum)-1];
                for (let i = 0; i <pageData.length ; i++) {
                    cardBody.append("<div class=\"note-card\">\n" +
                        "                    <div class=\"note-tile\"><h4 style=\"color: #212121\">"+pageData[i].title+"</h4></div>\n" +
                        "                    <div class=\"note-content\">\n" +pageData[i].content+
                        "                    </div>\n" +
                        "                    <div class=\"note-opt\">\n" +
                        "                        <!--该隐藏的输入框用于存放帖子的id-->\n" +
                        "                        <input value=\"note-id\" hidden>\n" +
                        "                        <!--点赞按钮，这里为了简单，用户以及游客均可为帖子点赞-->\n" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  name=\"thumb\" style=\"width: 36px;height:36px;font-size: 14px;font-weight:bolder;border: 0;text-align: center;\n" +
                        "                          border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%; color: #009a61\">赞</button>\n" +
                        "                        <span style=\"color: #009a61;font-weight: bolder;font-size: 14px\"> x 2</span>\n" +
                        "                        <!--此处显示发帖用户的用户名-->\n" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 20%;font-size: 14px;color:#999999;border: 0;text-align: center;background: #FFFFFF;margin-left: 10px\">极客Style</button>\n" +
                        "                        <!--此处显示发帖时间-->\n" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 30%;font-size: 14px;color:#999999;border: 0;text-align: left;background: #FFFFFF;margin-left: 10px\">2019-12-23 18:19</button>\n" +
                        "                    </div>\n" +
                        "                </div>");
                }
                return false;
            }
        });
    }
});
/*单个页码的点击*/
$(".page-link").click(function () {
    /*
    * 由于上下页的按钮也是page-link的class
    * 所以这里要用if进行限制
    * 上下页的按钮是有children的，而单个页码的没有
    * 所以当点击的按钮是没有子节点时进行相应操作
    * 可以通过子节点对象数组长度来判断是否还有子节点
    * */
    if ($(this).children().length===0){
        /*
        * 当点击的是已选中的页码，那么这是无效点击，不作处理
        * 只有点击的不是已选中页码才有进一步操作
        * */
        if ($(this).parent().prop("class").search("active")===-1){
            /*遍历li获取已选中的页码*/
            $("li").each(function () {
                if ($(this).prop("class").search("active")!==-1){
                    $(this).prop("class","page-item");
                    return false;
                }
            });
            /*将当前选中的页码置为active*/
            $(this).parent().prop("class","page-item active");
            /*
            * 渲染帖子内容
            * */
            let cardBody=$("#card-body");
            cardBody.empty();
            var pageData=indexPageData[parseInt($(this).text())-1];
            for (let i = 0; i <pageData.length ; i++) {
                cardBody.append("<div class=\"note-card\">\n" +
                    "                    <div class=\"note-tile\"><h4 style=\"color: #212121\">"+pageData[i].title+"</h4></div>\n" +
                    "                    <div class=\"note-content\">\n" +pageData[i].content+
                    "                    </div>\n" +
                    "                    <div class=\"note-opt\">\n" +
                    "                        <!--该隐藏的输入框用于存放帖子的id-->\n" +
                    "                        <input value=\"note-id\" hidden>\n" +
                    "                        <!--点赞按钮，这里为了简单，用户以及游客均可为帖子点赞-->\n" +
                    "                        <button type=\"button\" class=\"btn btn-light\"  name=\"thumb\" style=\"width: 36px;height:36px;font-size: 14px;font-weight:bolder;border: 0;text-align: center;\n" +
                    "                          border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%; color: #009a61\">赞</button>\n" +
                    "                        <span style=\"color: #009a61;font-weight: bolder;font-size: 14px\"> x 2</span>\n" +
                    "                        <!--此处显示发帖用户的用户名-->\n" +
                    "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 20%;font-size: 14px;color:#999999;border: 0;text-align: center;background: #FFFFFF;margin-left: 10px\">极客Style</button>\n" +
                    "                        <!--此处显示发帖时间-->\n" +
                    "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 30%;font-size: 14px;color:#999999;border: 0;text-align: left;background: #FFFFFF;margin-left: 10px\">2019-12-23 18:19</button>\n" +
                    "                    </div>\n" +
                    "                </div>");
            }
        }
    }
});

/*
* 当左侧栏按钮点击时样式改变
* 以及内容获取
* */
$("button[name='left-side-btn']").click(function () {
    /*先修改未选中按钮的样式*/
    $(this).css("font-weight","bolder").css("background","#009a61").css("color","white");
    /*
    * 再修改经选中按钮的样式
    * 同时将其name修改为left-side-btn
    * */
    $("button[name='left-side-btn-active']").css("font-weight","unset").css("color","#999999").css("background","#f8f9fa")
        .attr("name","left-side-btn");
    /*
    * 同时修改该按钮的name为left-side-btn-active
    * */
    $(this).attr("name","left-side-btn-active");

    /*
    * 对于技术频道的专题选择
    * 还需要进行后台数据获取
    * 那么专题按钮是有孩子节点的
    * 可以根据这个进行判断
    * */
    if ($(this).children().length>0){
        $("#loading-data").show();
        let tagName=$(this).val();
        let data = [];
        /*
        * 先清空再渲染
        * */
        let cardBody=$("#card-body");
        cardBody.empty();
        $("#page-select").prop("hidden",true);
        $.ajax({
            method:"post",
            url:"bbs/posts/getByTag",
            data:{
                tagName:tagName
            },
            dataType:"json",
            success:function (callback) {
                /*
                * 如果获取到的数据为空时
                * 即数组长度为零，那么不渲染数据的div
                * 只显示该专题目前没有用户发表帖子
                * */
                data=callback.callbackData;
                if (data.length===0||data===null){
                    $("#loading-data").hide();
                    cardBody.append("<div style='text-align: center;width: 100%;margin-top: 50px'>该专题暂无用户发表帖子，快去抢沙发吧！</div>");
                }else{
                    /*渲染内容*/
                    cardBody.empty();
                    for (let i = 0; i <data.length ; i++) {
                        $("#card-body").append("<div class=\"note-card\">\n" +
                            "                    <div class=\"note-title\"><input value="+data[i].postsId+" hidden>" +
                            "<h4 style=\"color: #212121\">"+data[i].title+"</h4></div>\n" +
                            "                    <div class=\"note-content\">\n" +data[i].content+
                            "                    </div>\n" +
                            "                    <div class=\"note-opt\">\n" +
                            "                        <!--该隐藏的输入框用于存放帖子的id-->\n" +
                            "                        <!--点赞按钮，这里为了简单，用户以及游客均可为帖子点赞-->\n" +
                            "                        <button type=\"button\" class=\"btn btn-light\"  name=\"thumb\" style=\"width: 36px;height:36px;font-size: 14px;font-weight:bolder;border: 0;text-align: center;\n" +
                            "                          border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%; color: #009a61\">赞</button>\n" +
                            "                        <span style=\"color: #009a61;font-weight: bolder;font-size: 14px\"> x "+data[i].thumbNum+"</span>\n" +
                            "                        <!--此处显示发帖用户的用户名-->" +
                            "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 20%;font-size: 14px;color:#999999;border: 0;text-align: center;background: #FFFFFF;margin-left: 10px\">"+
                            "                       <a class='text-decoration-none' href='bbs/userInfoPage?userName="+data[i].postUser+"'>"+data[i].postUser+"</a>"+"</button>"+
                            "                        <!--此处显示发帖时间-->\n" +
                            "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 30%;font-size: 14px;color:#999999;border: 0;text-align: left;background: #FFFFFF;margin-left: 10px\">"+data[i].postDate+"</button>" +
                            "                    </div>\n" +
                            "                </div>");
                    }
                    $("#loading-data").hide();
                }
            },
            error:function () {
                $("#loading-data").hide();
                toastr.error("服务异常，数据获取失败T-T.....");
                cardBody.append("<div style='width: 60%;height:180px;margin-left: 25%;margin-top: 50px;'><img src='images/no-data.jpg' style='width: 80%;height: 100%;background: #FFFFFF'></div>");
            }
        });

    }
});

/*
* 所有帖子
* */
$("#all-notes").click(function () {
    /*
    * 因为首页直接加载了所有帖子，所以这里直接刷新
    * */
    window.location.reload();
});

/*
* 全部问答帖
* */
$("#my-post").click(function () {
    let cardBody=$("#card-body");
    cardBody.empty();
    /*
    * 分页功能涉及到的工作量比较大，这里只完成所有贴的分页
    * 其他内容分页到后面再完善
    * */
    $("#page-select").prop("hidden",true);
    var data=[];
    $.ajax({
        method:"get",
        url:"bbs/posts/allQuestionPosts",
        dataType:"json",
        success:function (callback) {
            data=callback.callbackData;
            if (data.length===0){
                cardBody.append("<div style='text-align: center;width: 100%;margin-top: 50px'>目前还没任何用户发过问答帖子，快去发一条吧~</div>");
            }else{
                /*渲染内容*/
                cardBody.empty();
                for (let i = 0; i <data.length ; i++) {
                    $("#card-body").append("<div class=\"note-card\">\n" +
                        "                    <div class=\"note-title\"><input value="+data[i].postsId+" hidden>" +
                        "<h4 style=\"color: #212121\">"+data[i].title+"</h4></div>\n" +
                        "                    <div class=\"note-content\">\n" +data[i].content+
                        "                    </div>\n" +
                        "                    <div class=\"note-opt\">\n" +
                        "                        <!--该隐藏的输入框用于存放帖子的id-->\n" +
                        "                        <!--点赞按钮，这里为了简单，用户以及游客均可为帖子点赞-->\n" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  name=\"thumb\" style=\"width: 36px;height:36px;font-size: 14px;font-weight:bolder;border: 0;text-align: center;\n" +
                        "                          border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%; color: #009a61\">赞</button>\n" +
                        "                        <span style=\"color: #009a61;font-weight: bolder;font-size: 14px\"> x "+data[i].thumbNum+"</span>\n" +
                        "                        <!--此处显示发帖用户的用户名-->" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 20%;font-size: 14px;color:#999999;border: 0;text-align: center;background: #FFFFFF;margin-left: 10px\">"+
                        "                       <a class='text-decoration-none' href='userInfoPage?userName="+data[i].postUser+"'>"+data[i].postUser+"</a>"+"</button>"+
                        "                        <!--此处显示发帖时间-->\n" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 30%;font-size: 14px;color:#999999;border: 0;text-align: left;background: #FFFFFF;margin-left: 10px\">"+data[i].postDate+"</button>" +
                        "                    </div>\n" +
                        "                </div>");
                }
            }
        },
        error:function () {
            toastr.error("服务异常，数据获取失败T-T.....");
            cardBody.append("<div style='width: 60%;height:180px;margin-left: 25%;margin-top: 50px;'><img src='images/no-data.jpg' style='width: 80%;height: 100%;background: #FFFFFF'></div>");
        }
    });
});

/*
* 全部精品贴
* */
$("#boutique-notes").click(function () {
    let cardBody=$("#card-body");
    cardBody.empty();
    $("#page-select").prop("hidden",true);
    let data = [];
    $.ajax({
        method:"get",
        url:"bbs/posts/boutiquePosts",
        dataType:"json",
        success:function (callback) {
            data=callback.callbackData;
            if (data.length===0){
                cardBody.append("<div style='text-align: center;width: 100%;margin-top: 50px'>目前还没有任何精品帖子哦，去找找别的看吧~</div>");
            }else{
               /*渲染内容*/
                cardBody.empty();
                for (let i = 0; i <data.length ; i++) {
                    $("#card-body").append("<div class=\"note-card\">\n" +
                        "                    <div class=\"note-title\"><input value="+data[i].postsId+" hidden>" +
                        "<h4 style=\"color: #212121\">"+data[i].title+"</h4></div>\n" +
                        "                    <div class=\"note-content\">\n" +data[i].content+
                        "                    </div>\n" +
                        "                    <div class=\"note-opt\">\n" +
                        "                        <!--该隐藏的输入框用于存放帖子的id-->\n" +
                        "                        <!--点赞按钮，这里为了简单，用户以及游客均可为帖子点赞-->\n" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  name=\"thumb\" style=\"width: 36px;height:36px;font-size: 14px;font-weight:bolder;border: 0;text-align: center;\n" +
                        "                          border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%; color: #009a61\">赞</button>\n" +
                        "                        <span style=\"color: #009a61;font-weight: bolder;font-size: 14px\"> x "+data[i].thumbNum+"</span>\n" +
                        "                        <!--此处显示发帖用户的用户名-->" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 20%;font-size: 14px;color:#999999;border: 0;text-align: center;background: #FFFFFF;margin-left: 10px\">"+
                        "                       <a class='text-decoration-none' href='userInfoPage?userName="+data[i].postUser+"'>"+data[i].postUser+"</a>"+"</button>"+
                        "                        <!--此处显示发帖时间-->\n" +
                        "                        <button type=\"button\" class=\"btn btn-light\"  style=\"width: 30%;font-size: 14px;color:#999999;border: 0;text-align: left;background: #FFFFFF;margin-left: 10px\">"+data[i].postDate+"</button>" +
                        "                    </div>\n" +
                        "                </div>");
                }
            }
        },
        error:function () {
            toastr.error("服务异常，数据获取失败T-T.....");
            cardBody.append("<div style='width: 60%;height:180px;margin-left: 25%;margin-top: 50px;'><img src='images/no-data.jpg' style='width: 80%;height: 100%;background: #FFFFFF'></div>");
        }
    });
});

/*点赞*/
$("button[name='thumb']").click(function () {
    const thumbNum=parseInt($(this).prev().val());
    if ($.session.get("loginState")==="true"){
        const postId=$(this).prev().prev().val();
        if (thumbCounter%2!==0){
            /*为帖子添加该用户的点赞记录*/
            $.ajax({
                method:"post",
                url:"bbs/user/thumb",
                data:{
                    postId:postId
                },
                dataType:"json",
                success:function (callback) {
                    if (callback.successFlag){
                        toastr.success("点赞成功");
                        $(this).prev().val(thumbNum+1);
                        $(this).next().text(thumbNum+1);
                        thumbCounter++;
                    }else{
                        toastr.error("点赞失败，服务异常....");
                    }
                },
                error:function () {
                    toastr.error("点赞失败，服务异常....");
                }
            });
        }else {
            /*
            * 用户不能重复点赞
            * 因此点赞后再点击那么将取消之前的点赞
            * 那么将帖子该用户的点赞记录删除
            * */
            $.ajax({
                method:"post",
                url:"bbs/user/cancelThumb",
                data:{
                    postId:postId
                },
                dataType:"json",
                success:function (callback) {
                    if (callback.successFlag){
                        toastr.info("已取消点赞");
                        $(this).prev().val(thumbNum+1);
                        $(this).next().text(thumbNum+1);
                        thumbCounter++;
                    }else{
                        toastr.error("取消点赞失败，服务异常....");
                    }
                },
                error:function () {
                    toastr.error("取消点赞失败，服务异常....");
                }
            });
            $(this).prev().val(thumbNum-1);
            $(this).next().text(thumbNum-1);
        }
    }else{
        $("#myModal").modal('show');
    }
});

/*
* 跳转到帖子详情页
* */
$(".note-tile").click(function () {
    const postId=$(this).children().val();
    window.location.href="bbs/postDetail?postId="+postId;
});
/*绑定由jquery动态生成的元素*/
$(document).on('click','.note-title',function () {
   const postId=$(this).children().val();
   window.location.href="bbs/postDetail?postId="+postId;
});

$(document).on('click','.top-post-title',function () {
    const postId=$(this).prev().val();
    window.location.href="bbs/postDetail?postId="+postId;
});
