package me.vinfer.bbs.controller;

import me.vinfer.bbs.dto.AjaxCallback;
import me.vinfer.bbs.dto.UserAccInfoDTO;
import me.vinfer.bbs.dto.UserManagePageDTO;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.service.AdminService;
import me.vinfer.bbs.service.PostsService;
import me.vinfer.bbs.service.UserService;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * @author by Vinfer
 * @date 2020-01-12  07:54
 * @description         管理员服务控制器
 **/
@Controller
public class AdminServiceController {

    @Resource
    private UserService userService;

    @Resource
    private AdminService adminService;

    @Resource
    private PostsService postsService;

    @GetMapping(value = "/bbs/userManage")
    public String userManagePage(HttpSession session, Map<String,Object>dataMap){
        /*
        * 先校验身份
        * 通过验证才跳转到用户管理页面，否则重新回到首页
        * 防止直接输入url进行页面跳转
        * */
        if(authentication(session)){
            List<UserManagePageDTO> allUserManageDTO = userService.getAllUserManageDTO();
            dataMap.put("allUserManageDTO",allUserManageDTO);
            return "userManage";
        }else {
            return "redirect:/";
        }

    }

    @GetMapping(value = "/bbs/postsManage")
    public String postsManagePage(HttpSession session,Map<String,Object>dataMap){
        if(authentication(session)){
            List<PostsDO>allPostsInfos=postsService.getAllPosts();
            dataMap.put("allPostsInfos",allPostsInfos);
            return "postsManage";
        }else{
            return "redirect:/";
        }
    }

    /**
     * 用户身份验证
     * @param session   会话对象
     * @return  返回验证结果
     */
    private Boolean authentication(HttpSession session){
        UserAccInfoDTO userAccInfoDTO= (UserAccInfoDTO) session.getAttribute("userAccInfoDTO");
        if(userAccInfoDTO!=null){
            return userAccInfoDTO.getAccType()==1;
        }else {
            return false;
        }
    }

    @ResponseBody
    @PostMapping(value = "/bbs/admin/authorize")
    public Object authorizeUser(@Param("loginAcc")String loginAcc){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.authorizeUser(loginAcc));
        return ajaxCallback;
    }

    @ResponseBody
    @PostMapping(value = "/bbs/admin/deletePost")
    public Object deletePosts(@Param("postsId")String postsId){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(adminService.deletePostById(Integer.parseInt(postsId)));
        return ajaxCallback;
    }



}
