package me.vinfer.bbs.controller;

import me.vinfer.bbs.dto.AjaxCallback;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.service.PostsService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author by Vinfer
 * @date 2020-01-12  05:41
 * @description         帖子/文章服务控制器
 **/
@Controller
public class PostsServiceController {

    @Resource
    private PostsService postsService;


    @ResponseBody
    @PostMapping(value = "/bbs/load")
    public Object indexPageDataLoad(){
        AjaxCallback ajaxCallback=new AjaxCallback();
        /*用map封装多个回传数据项*/
        Map<String,Object>dataMap=new HashMap<>();
        List<PostsDO> allPosts = postsService.getAllPosts();
        List<PostsDO> allTopPosts = postsService.getAllTopPosts();
        dataMap.put("allPostsData",allPosts);
        dataMap.put("topPostsData",allTopPosts);
        ajaxCallback.setCallbackData(dataMap);
        return ajaxCallback;
    }

    @GetMapping(value = "/bbs/postPage")
    public String postPage(@PathParam("type") String type, Map<String,Object>dataMap, HttpSession session){
        String keyName="userName";
        if(session.getAttribute(keyName)!=null){
            dataMap.put("type",type);
            return "post";
        }
        return "redirect:/";
    }

    @ResponseBody
    @PostMapping(value = "/bbs/user/post")
    public Object postNew(PostsDO postsDO,HttpSession session){
        AjaxCallback ajaxCallback=new AjaxCallback();
        String postUser= (String) session.getAttribute("userName");
        postsDO.setPostUser(postUser);
        ajaxCallback.setSuccessFlag(postsService.postNew(postsDO));
        return ajaxCallback;
    }

}
