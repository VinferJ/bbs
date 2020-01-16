
$(function () {
    $("#menu-title").text($("#myPost-btn").text());
    $("#userName-block").hide();
    $("#jobInfo-block").hide();
    $("#phoneNum-block").hide();

    /*初始化toastr提示框的显示效果*/
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
});

/*
* 编辑/修改用户名
* */
$("#edit-userName").click(function () {
    /*隐藏编辑键*/
    $(this).hide();
    /*隐藏原来得到信息*/
    $("#info-userName").hide();
    /*
    * 获取信息并绑定到下拉框
    * */
    $("#userName-input").val($("#info-userName").text());
    /*显示编辑下拉框*/
    $("#userName-block").show();
});

/*
* 编辑/修改工作信息
* */
$("#edit-jobInfo").click(function () {
    /*隐藏编辑键*/
    $(this).hide();
    /*隐藏原来得到信息*/
    $("#info-jobInfo").hide();
    /*
    * 获取信息并绑定到下拉框
    * */
    $("#sel-job").val($("#info-jobInfo").text());
    /*显示编辑下拉框*/
    $("#jobInfo-block").show();
});
/*
* 编辑/修改手机号码
* */
$("#edit-phoneNum").click(function () {
    /*隐藏编辑键*/
    $(this).hide();
    /*隐藏原来的信息*/
    $("#info-phoneNum").hide();
    /*
    * 获取信息并绑定到输入框
    * */
    $("#phoneNum").val($("#info-phoneNum").text());
    /*显示编辑输入框*/
    $("#phoneNum-block").show();
});

/*
* 取消编辑
* */
$("#cancel-edit-jobInfo").click(function () {
    /*
    * 隐藏父级div，显示新和编辑键
    * */
    $(this).parent().hide();
    $("#info-jobInfo").show();
    $("#edit-jobInfo").show();
});
$("#cancel-edit-phoneNum").click(function () {
    /*
    * 隐藏父级div，显示新和编辑键
    * */
    $(this).parent().hide();
    $("#info-phoneNum").show();
    $("#edit-phoneNum").show();
});
$("#cancel-edit-userName").click(function () {
    /*
    * 隐藏父级div，显示新和编辑键
    * */
    $(this).parent().hide();
    $("#info-userName").show();
    $("#edit-userName").show();
});

/*
* 保存修改操作
* */
/*
* 保存用户名的修改
* */
$("#save-edit-userName").click(function () {
    var newUserName=$("#userName-input").val();
    if (newUserName===''){
        swal("提示","不能为空哦","info");
    }else{
        $.ajax({
            method:"post",
            url:"user/resetUserName",
            data:{
                newUserName:newUserName
            },
            dataType:"json",
            success:function (callback) {
                if (callback.successFlag){
                    swal("已保存修改","您需要重新登录才可以重置状态","success");
                    /*
                    * 显示信息，直接将修改信息绑定到label，不刷新页面
                    * 先隐藏编辑框再显示
                    * */
                    $("#userName-block").hide();
                    $("#info-userName").text(newUserName).show();
                    $("#edit-userName").show();
                }else{
                    swal("修改失败","出bug了T-T.....","error");
                    /*
                    * 显示信息，显示原来信息因为修改失败了
                    * 先隐藏编辑框再显示
                    * */
                    $("#userName-block").hide();
                    $("#info-userName").show();
                    $("#edit-userName").show();
                }
            },
            error:function () {
                swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
            }
        });
    }
});
/*
* 保存工作性质的修改
* */
$("#save-edit-jobInfo").click(function () {
    const newJobCategory = $("#sel-job").val();
    $.ajax({
        method:"post",
        url:"user/resetJobCategory",
        data:{
            newJobCategory:newJobCategory
        },
        dataType:"json",
        success:function (callback) {
            if (callback.successFlag){
                swal("已保存修改","","success");
                /*
                * 显示信息，直接将修改信息绑定到label，不刷新页面
                * 先隐藏编辑框再显示
                * */
                $("#jobInfo-block").hide();
                $("#info-jobInfo").text(newJobCategory).show();
                $("#edit-jobInfo").show();
            }else{
                swal("修改失败","","error");
                /*
                * 显示信息，显示原来信息因为修改失败了
                * 先隐藏编辑框再显示
                * */
                $("#jobInfo-block").hide();
                $("#info-jobInfo").show();
                $("#edit-jobInfo").show();
            }
        },
        error:function () {
            swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
        }
    });
});
/*
* 保存修改用户联系手机
* */
$("#save-edit-phoneNum").click(function () {
    const newPhoneNum = $("#phoneNum").val();
    /*手机号码正则表达式*/
    const phoneNumReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (newPhoneNum===''){
        swal("提示","不能为空哦","info");
    }else if (!phoneNumReg.test(newPhoneNum)){
        swal("提示","要输入正确的手机号码哦","warning");
    }else {
        $.ajax({
            method:"post",
            url:"user/resetPhoneNum",
            data:{
                newPhoneNum:newPhoneNum
            },
            dataType:"json",
            success:function (callback) {
                if (callback.successFlag){
                    swal("已保存修改","","success");
                    /*
                    * 显示信息，直接将修改信息绑定到label，不刷新页面
                    * 先隐藏编辑框再显示
                    * */
                    $("#phoneNum-block").hide();
                    $("#info-phoneNum").text(newPhoneNum).show();
                    $("#edit-phoneNum").show();
                }else{
                    swal("修改失败","","error");
                    /*
                    * 显示信息，显示原来信息因为修改失败了
                    * 先隐藏编辑框再显示
                    * */
                    $("#phoneNum-block").hide();
                    $("#info-phoneNum").show();
                    $("#edit-phoneNum").show();
                }
            },
            error:function () {
                swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
            }
        });
    }
});

/*
* 左侧选择栏的button点击操作
* 根据button的name来绑定click事件
* 点击后动态显示菜单名
* 并且到后台获取数据进行数据绑定
* */
$("button[name='left-side-btn']").click(function () {
    /*
    * 获取btn的val，事先将路径的最后一部分绑定到btn的val中
    * 获取该值用作url的字符拼接
    * */
    const tagVal = $(this).val();
    const tagText = $(this).text();
    /*空数据提示信息*/
    let emptyTip;
    switch (tagVal) {
        case "myPosts": emptyTip="当前还没发布过任何帖子哦~";break;
        case "myQuestionPosts": emptyTip="当前还未发布过任何提问帖哦~";break;
        case "myAnswerPosts": emptyTip="当前没回答过任何帖子哦~";break;
        case "beenThumbedPosts": emptyTip="当前没有任何被点赞的帖子哦~";break;
        default:
            emptyTip="";
    }
    /*获取DOM*/
    const infoContent=$("#posts-info-container");
    /*获取用户名信息*/
    const userName=$("#info-userName").text();
    $("#menu-title").text(tagText);
    /*清空数据*/
    infoContent.empty();
    $.ajax({
        method:"post",
        url:"user/"+tagVal,
        data:{
            userName:userName
        },
        dataType:"json",
        success:function (callback) {
            /*
            * 数据绑定
            * */
            if (callback.callbackData.length===0||callback.callbackData===null){
                /*空数据时显示特定信息*/
                infoContent.append("<div style='width: 80%;height: 100px;line-height: 100px;font-size: 15px;font-weight: bolder;text-align: center'>"+emptyTip+"</div>")
            }else {
                let data=callback.callbackData;
                for (let i = 0; i <data.length ; i++) {
                    infoContent.append("<div class='lists-group'>\n" +
                        "                            <div class='top-line' style='width: 100%;height: 1.5px;background: #999999;'></div>\n" +
                        "                            <input value='"+data[i].postsId+"' hidden>\n" +
                        "                            <div class='content-lists'>\n" +
                        "                                <div style='background: #FCF8E3' class='thumb-num'>获赞 "+data[i].thumbNum+"</div>\n" +
                        "                                <div class='posts-info'>"+data[i].title+"</div>\n" +
                        "                            </div>\n" +
                        "                        </div>");
                }
            }
        },
        error:function () {
            toastr.error("服务异常，数据获取失败T-T.....");
        }
    });
});
/*
* 当使用ajax动态生成页面元素时，普通的事件绑定将不生效
* 即jquery选择器直接绑定事件不生效（因为实际上source file里没有生成真正的元素）
* 因此要使用$(document).on()方法来为元素进行事件绑定
* */
/*
* 点击查看帖子详细内容
* */
$(document).on('click',".content-lists",function () {
   const postId=$(this).prev().val();
   window.location.href="postDetail?postId="+postId;
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