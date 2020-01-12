
/*
*
* 查看详细
* */
$("button[name='seeDetail']").click(function () {
    const postId=$(this).prev().val();
    /*页面跳转*/
    window.location.href="postDetail?postId="+postId;
});
/*
* 删除帖
* */
$("button[name='deletePost']").click(function () {
    const postId=$(this).prev().prev().val();
    /*
    * 有时候会出现在swal里面用不了 $ 操作
    * 所以这里用对象获取DOM
    * */
    const thisBtn=$(this);
    swal({
        title: "确定删除吗?",
        text: "删除后，该帖子将无法恢复",
        icon: "warning",
        buttons: true,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "取消",
        confirmButtonText:"确认",
        closeOnConfirm: false
    },function (isConfirm) {
        if (isConfirm){
            /*
            * 发送ajax请求到后台进行处理
            * */
            $.ajax({
                method:"post",
                url:"admin/deletePost",
                data:{
                    postId:postId
                },
                dataType:"json",
                success:function (callback) {
                    if (callback.successFlag){
                        swal("帖子删除成功","","success");
                        /*
                        * 直接remove该帖的div，不刷新页面
                        * 因为刷新页面会重写请求数据，最终页面效果一样
                        * */
                        thisBtn.parent().parent().parent().hide();
                    }else{
                        swal("删除失败","T-T好像出bug了呢...","error");
                    }
                },
                error:function () {
                    swal("服务异常","遇到了未知错误呢....o(╥﹏╥)....哇~难受","error");
                }
            });
        }
    });
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
            /*
            * 由该界面退出登录后将直接返回首页
            * */
            let url=window.location.pathname;
            /*截取两次*/
            const firstEnd = url.lastIndexOf("/");
            url = url.substring(0,firstEnd);
            const secondEnd=url.lastIndexOf("/");
            url=url.substring(0,secondEnd);
            window.location.href=url;
        },
        error:function () {
            swal("服务异常","","error");
        }
    });
});