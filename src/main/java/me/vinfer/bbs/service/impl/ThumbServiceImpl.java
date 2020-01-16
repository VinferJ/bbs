package me.vinfer.bbs.service.impl;

import me.vinfer.bbs.dao.PostsDAO;
import me.vinfer.bbs.dao.ThumbInfoDAO;
import me.vinfer.bbs.service.ThumbService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:37
 * @description         点赞服务实现类
 **/
@Service
public class ThumbServiceImpl implements ThumbService {

    @Resource
    private ThumbInfoDAO thumbInfoDAO;

    @Resource
    private PostsDAO postsDAO;

    @Override
    public Boolean thumbCheck(String userName, Integer postId) {
        return thumbInfoDAO.queryByPostsIdAndUserName(userName, postId)!=null;
    }

    @Override
    public Boolean thumbPosts(String userName, Integer postsId) {
        Integer addThumbNumRes = postsDAO.addThumbNumByPostsId(postsId);
        Integer addThumbInfoRes = thumbInfoDAO.addThumbInfo(userName, postsId);
        return addThumbInfoRes==1&&addThumbNumRes==1;
    }

    @Override
    public Boolean cancelThumb(String userName, Integer postsId) {
        Integer reduceThumbNumRes = postsDAO.reduceThumbNum(postsId);
        Integer delThumbInfoRes = thumbInfoDAO.deleteThumbInfoByUserNameAndPostId(userName, postsId);
        return reduceThumbNumRes==1&&delThumbInfoRes==1;
    }
}
