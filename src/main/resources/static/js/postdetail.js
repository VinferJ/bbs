



/*
记录点赞，加精，置顶的点击和取消
如果是奇数则是未点赞/加精/置顶，如果是偶数则是已经完成过了
每点击一次点击成功钮就自增1
让用户能不重复进行这3样行为，要么是点赞/加精/置顶，要是取消...
*/
let thumbCounter;
let markCounter;
let topCounter;

$(function () {

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
   * jsp渲染数据出错，用ajax获取
   * */
    /*const postsId=$("#postId").val();
    const commentBody=$("#comment-body");
    $.ajax({
        method:"post",
        url:"getPostsReplyInfos",
        data:{
            postsId:postsId
        },
        dataType:"json",
        success:function (callback) {
            commentData=callback.callbackData;
            if (commentData!==undefined){
                if (commentData.length>0){
                    $("#comment-num").text(commentData.length+" 条评论");
                    for (let i = 0; i <commentData.length ; i++) {
                        commentBody.append("<div class='comment-content'>" +
                            "                <div class='avatar' style='margin-top: -5px'>" +
                            "                    <img src='../static/images/user-64.png' class='avatar'>" +
                            "                </div>" +
                            "                <div class='comment-text-container'>" +
                            "                    <div class='commentator-name' style='line-height: 55px'>" +
                            "                        <a class='text-decoration-none' href='userInfoPage?userName="+commentData[i].replyUser+"'><strong >"+commentData[i].replyUser+"：</strong></a>" +
                            "                    </div>" +
                            "                    <div class='content-text'>" +
                            "                        <p>"+commentData[i].replyContent+"</p>" +
                            "                    </div>" +
                            "                </div>" +
                            "                <div class='reply-date'>" +
                            "                    评论于 "+commentData[i].replyDate+
                            "                </div>" +
                            "            </div><div style='width: 100%;height: 100px;'></div>");
                    }
                }
            }else {
                commentBody.append("<div style='width: 100%;height: 60px;line-height: 60px;text-align: center;'>暂未有用户评论哦，快来抢沙发吧~</div>" +
                    "                <div style='width: 100%;height: 100px'></div>");
            }

        },
        error:function () {
            toastr.error("服务异常，评论数据获取失败");
        }
    });*/

    /*0是未点赞过，1是已点赞过，其他两项同理*/
    const thumbFlag=parseInt($("#thumbFlag").val());
    const markFlag=parseInt($("#markFlag").val());
    const topFlag=parseInt($("#topFlag").val());
    /*
    * 设置计数器的值同时渲染按钮的文本
    * */
    if (thumbFlag===0){
        thumbCounter=1;
        $("#thumb").text("赞 · "+$("#thumbNum").text());
    }else{
        thumbCounter=2;
        $("#thumb").text("已赞 · "+$("#thumbNum").text());
    }
    if (markFlag==='0'){
        markCounter=1;
        $("#mark").text("标记精品");
    }else {
        markCounter=2;
        $("#mark").text("精品帖")
    }
    if (topFlag==='0'){
        topCounter=1;
        $("#top").text("置顶");
    }else {
        topCounter=2;
        $("#top").text("#置顶帖");
    }

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
            url:"signIn",
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
        url:"signOut",
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
            url:"resetPassword",
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
                    swal("修改失败",callback.callbackData,"error");
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
            url:"signUp",
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
* 点赞按钮
* */
$("#thumb").click(function () {
    let label=$("#thumbNum");
    let thumbNum=parseInt(label.text());
    const postsId=$("#postId").val();
    let url;
    let flag=(thumbCounter%2!==0);
    if (flag){
        url="user/thumb";
    }else {
        url="user/cancelThumb";
    }
    /*点赞或取消点赞*/
    $.ajax({
        method:"post",
        url:url,
        data:{
            postsId:postsId
        },
        dataType:"json",
        success:function (callback) {
            if (callback.successFlag){
                thumbCounter++;
            }else{
                toastr.error("出bug了T-T....");
            }
        },
        error:function () {
            toastr.error("服务异常....");
        }
    });
    if (flag){
        toastr.success("点赞成功");
        thumbNum=thumbNum+1;
        $(this).text("已赞 · "+thumbNum);
        label.text(thumbNum);
    }else{
        toastr.success("已取消点赞");
        thumbNum=thumbNum-1;
        $(this).text("赞 · "+thumbNum);
        label.text(thumbNum);
    }
});

/*
* 精品贴标记
* */
$("#mark").click(function () {
    const postsId=$("#postId").val();
    let flag=(markCounter%2!==0);
    let url;
    if(flag){
        url="admin/markPost";
    }else {
        url = "admin/unMarkPost";
    }
    $.ajax({
        method:"post",
        url:url,
        data:{
            postsId:postsId
        },
        dataType:"json",
        success:function (callback) {
            if (callback.successFlag){
                markCounter++;
            }else{
                toastr.error("出bug了T-T...");
            }
        },
        error:function () {
            toastr.error("服务异常.....");
        }
    });
    if (flag){
        toastr.success("帖子已加精");
        $(this).text("精品帖");
    }else {
        toastr.success("帖子已取消加精");
        $(this).text("标记精品");
    }
});

/*
* 置顶帖子
* */
$("#top").click(function () {
    const postsId=$("#postId").val();
    let flag=(topCounter%2!==0);
    let url;
    if(flag){
        url="admin/topPost";
    }else {
        url = "admin/unTopPost";
    }
    $.ajax({
        method:"post",
        url:url,
        data:{
            postsId:postsId
        },
        dataType:"json",
        success:function (callback) {
            if (callback.successFlag){
                topCounter++;
            }else{
                toastr.error("出bug了T-T...");
            }
        },
        error:function () {
            toastr.error("服务异常.....");
        }
    });
    if (flag){
        toastr.success("帖子已置顶");
        $(this).text("已置顶");
    }else {
        toastr.success("帖子已取消置顶");
        $(this).text("置顶");
    }
});

/*
* 提交评论
* */
$("#commit-comment").click(function () {
    /*
    * 先校验登录状态，登录的用户才能评论
    * */
    const loginState=$.session.get("loginState");
    if (loginState===undefined||loginState==='false'){
        $("#myModal").modal('show');
    }else{
        const commentData=$("#edit-comment").val();
        if (commentData===''){
            swal("提示","评论不能是空的哦~","info");
        }else if (commentData.length>100){
            /*评论内容不能超过100个字符*/
            swal("提示","评论字数不能超过100字哦（包括标点符号）","info");
        }else{
            const postsId=$("#postId").val();
            $.ajax({
                method:"post",
                url:"user/commitComment",
                data:{
                    postsId:postsId,
                    commentData:commentData
                },
                dataType:"json",
                success:function (callback) {
                    if (callback.successFlag){
                        window.location.reload();
                    }else {
                        swal("提交失败","T-T...好像出bug了呢","error");
                    }
                },
                error:function () {
                    swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
                }
            });
        }
    }
});

$("#returnHome").click(function () {
    let url=window.location.pathname;
    /*截取两次*/
    const firstEnd = url.lastIndexOf("/");
    url = url.substring(0,firstEnd);
    const secondEnd=url.lastIndexOf("/");
    url=url.substring(0,secondEnd);
    window.location.href=url;
});

