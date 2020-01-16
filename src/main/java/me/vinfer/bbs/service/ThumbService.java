package me.vinfer.bbs.service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:22
 * @description         点赞服务接口
 **/
public interface ThumbService {

    /**
     * 点赞检查,检验用户是否已点赞某帖子
     * @param userName  点赞的用户名
     * @param postId    点赞的帖子id
     * @return 返回点赞结果
     */
    Boolean thumbCheck(String userName, Integer postId);

    /**
     * 用户点赞帖子
     * @param userName  用户名
     * @param postsId   帖子id
     * @return  返回点赞结果
     */
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    Boolean thumbPosts(String userName,Integer postsId);

    /**
     * 用户取消点赞
     * @param userName  用户名
     * @param postsId   帖子id
     * @return      返回取消点赞的结果
     */
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    Boolean cancelThumb(String userName,Integer postsId);

}
