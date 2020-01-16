package me.vinfer.bbs.controller;

import me.vinfer.bbs.dto.UserAccInfoDTO;
import me.vinfer.bbs.dto.UserInfoPageDTO;
import me.vinfer.bbs.dto.UserManagePageDTO;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.service.PostsService;
import me.vinfer.bbs.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Map;

/**
 * @author by Vinfer
 * @date 2020-01-12  08:55
 * @description     页面跳转控制器，负责公共或鉴权页面的跳转
 **/
@Controller
public class DispatcherController {

    @Resource
    private UserService userService;

    @Resource
    private PostsService postsService;


    @GetMapping(value = "/")
    public String indexPage(){
        return "index";
    }

    @GetMapping(value = {"/index","/index.html","/home"})
    public String redirectPage(){
        return "redirect:/";
    }

    @GetMapping(value = "/bbs/postDetail")
    public String postDetailPage(@Param("postId") String postId, Map<String,Object>dataMap){
        dataMap.put("postsDO", postsService.getPostsById(Integer.valueOf(postId)));
        dataMap.put("postsReplyInfos", postsService.getPostReplyInfosByPostsId(Integer.valueOf(postId)));
        return "postDetail";
    }

    @GetMapping(value = "/bbs/userManage")
    public String userManagePage(HttpSession session, Map<String,Object> dataMap){
        /*
         * 先校验身份
         * 通过验证才跳转到用户管理页面，否则重新回到首页
         * 防止直接输入url进行页面跳转
         * */
        if(adminAuthentication(session)){
            List<UserManagePageDTO> allUserManageDTO = userService.getAllUserManageDTO();
            dataMap.put("allUserManageDTO",allUserManageDTO);
            return "userManage";
        }else {
            return "error/403";
        }
    }

    @GetMapping(value = "/bbs/postsManage")
    public String postsManagePage(HttpSession session,Map<String,Object>dataMap){
        /*
         * 一样要先检验身份
         * 通过校验后才跳转，否则重定向回首页
         * */
        if(adminAuthentication(session)){
            List<PostsDO>allPostsInfos=postsService.getAllPosts();
            dataMap.put("allPostsInfos",allPostsInfos);
            return "postsManage";
        }else{
            return "error/403";
        }
    }

    @GetMapping(value = "/bbs/postPage")
    public String postPage(@PathParam("type") String type, Map<String,Object>dataMap, HttpSession session){
        String keyName="userName";
        if(session.getAttribute(keyName)!=null){
            dataMap.put("type",type);
            return "post";
        }
        return "error/403";
    }

    @GetMapping(value = "/bbs/userInfoPage")
    public String userInfoPage(@PathParam("userName")String userName,Map<String,Object>dataMap){
        UserInfoPageDTO userInfoPageDTO=userService.getUserInfoPageByUserName(userName);
        /*
        * 校验该用户是否存在，如果不存在，直接返回404
        * */
        if(userInfoPageDTO!=null){
            dataMap.put("userInfoPageDTO", userInfoPageDTO);
            dataMap.put("myPosts", postsService.getUserAllPosts(userName));
            return "userInfo";
        }
        return "error/404";
    }

    /**
     * 管理员身份验证
     * @param session   会话对象
     * @return  返回验证结果
     */
    private Boolean adminAuthentication(HttpSession session){
        UserAccInfoDTO userAccInfoDTO= (UserAccInfoDTO) session.getAttribute("userAccInfoDTO");
        if(userAccInfoDTO!=null){
            return userAccInfoDTO.getAccType()==1;
        }else {
            return false;
        }
    }


}
