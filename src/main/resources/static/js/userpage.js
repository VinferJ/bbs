
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
        case "myPosts": emptyTip="您当前还没发布过任何帖子哦~";break;
        case "myQuestionPosts": emptyTip="您当前还未发布过任何提问帖哦~";break;
        case "myAnswerPosts": emptyTip="您当前没回答过任何帖子哦~";break;
        case "beenThumbedPosts": emptyTip="您当前没有任何被点赞的帖子哦~";break;
        default:
            emptyTip="";
    }
    /*获取DOM*/
    const infoContent=$("#posts-info-container");
    $("#menu-title").text(tagText);
    /*清空数据*/
    infoContent.empty();
    $.ajax({
        method:"post",
        url:"user/"+tagVal,
        data:{},
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
* 返回首页
* 用绝对路径跳转
* 因为url加了一级父级路径bbs
* */
$("#returnHome").click(function () {
    let url=window.location.pathname;
    /*截取两次*/
    const firstEnd = url.lastIndexOf("/");
    url = url.substring(0,firstEnd);
    const secondEnd=url.lastIndexOf("/");
    url=url.substring(0,secondEnd);
    window.location.href=url;
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
