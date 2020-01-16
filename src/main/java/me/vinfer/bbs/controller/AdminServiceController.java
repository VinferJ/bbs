package me.vinfer.bbs.controller;

import me.vinfer.bbs.dto.AjaxCallback;
import me.vinfer.bbs.service.AdminService;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;


/**
 * @author by Vinfer
 * @date 2020-01-12  07:54
 * @description         管理员服务控制器
 **/
@RestController
public class AdminServiceController {

    @Resource
    private AdminService adminService;


    @PostMapping(value = "/bbs/admin/authorize")
    public Object authorizeUser(@Param("loginAcc")String loginAcc){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.authorizeUser(loginAcc));
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/admin/deletePost")
    public Object deletePosts(@Param("postsId")String postsId){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.deletePostById(Integer.parseInt(postsId)));
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/admin/markPost")
    public Object markPosts(@Param("postsId")String postsId){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.markPost(Integer.valueOf(postsId)));
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/admin/unMarkPost")
    public Object unmarkPosts(@Param("postsId")String postsId){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.unMarkPost(Integer.valueOf(postsId)));
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/admin/topPost")
    public Object topPosts(@Param("postsId")String postsId){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.topPost(Integer.valueOf(postsId)));
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/admin/unTopPost")
    public Object unTopPosts(@Param("postsId")String postsId){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.unTopPost(Integer.valueOf(postsId)));
        return ajaxCallback;
    }

}
