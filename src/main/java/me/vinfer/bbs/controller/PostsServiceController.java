package me.vinfer.bbs.controller;

import me.vinfer.bbs.dto.AjaxCallback;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.service.PostsService;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author by Vinfer
 * @date 2020-01-12  05:41
 * @description         帖子/文章服务控制器
 **/
@RestController
public class PostsServiceController {

    @Resource
    private PostsService postsService;


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

    @PostMapping(value = "/bbs/user/post")
    public Object postNew(PostsDO postsDO,HttpSession session){
        AjaxCallback ajaxCallback=new AjaxCallback();
        String postUser= (String) session.getAttribute("userName");
        postsDO.setPostUser(postUser);
        ajaxCallback.setSuccessFlag(postsService.postNew(postsDO));
        return ajaxCallback;
    }

    @GetMapping(value = "/bbs/posts/allQuestionPosts")
    public Object getQuestionPosts(){
        AjaxCallback ajaxCallback=new AjaxCallback();
        List<PostsDO> allQuestionPosts = postsService.getAllQuestionPosts();
        ajaxCallback.setSuccessFlag(true);
        ajaxCallback.setCallbackData(allQuestionPosts);
        return ajaxCallback;
    }

    @GetMapping(value = "/bbs/posts/boutiquePosts")
    public Object getBoutiquePosts(){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setCallbackData(postsService.getAllBoutiquePosts());
        ajaxCallback.setSuccessFlag(true);
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/posts/getByTag")
    public Object getPostsByTag(@Param("tagName") String tagName){
        AjaxCallback ajaxCallback=new AjaxCallback();
        List<PostsDO> postsDOList = postsService.getPostsByTag(tagName);
        ajaxCallback.setSuccessFlag(true);
        ajaxCallback.setCallbackData(postsDOList);
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/user/myAnswerPosts")
    public Object getUserAnswerPosts(@Param("userName")String userName){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(true);
        ajaxCallback.setCallbackData(postsService.getUserAnswerPosts(userName));
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/user/myQuestionPosts")
    public Object getUserQuestionPosts(@Param("userName")String userName){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(true);
        ajaxCallback.setCallbackData(postsService.getUserQuestionPosts(userName));
        return ajaxCallback;
    }

    /**
     * 获取用户被点赞的帖子内容
     * @param userName      用户名
     * @return  返回封装了用户被点赞的帖子的数据的ajax回传对象
     */
    @PostMapping(value = "/bbs/user/beenThumbedPosts")
    public Object getUserThumbPosts(@Param("userName")String userName){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(true);
        ajaxCallback.setCallbackData(postsService.getUserThumbPosts(userName));
        return ajaxCallback;
    }

    @PostMapping(value = "/bbs/user/myPosts")
    public Object getUserPosts(@Param("userName")String userName){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(true);
        ajaxCallback.setCallbackData(postsService.getUserAllPosts(userName));
        return ajaxCallback;
    }

}
