package me.vinfer.bbs.service.impl;

import me.vinfer.bbs.service.ThumbService;
import org.springframework.stereotype.Service;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:37
 * @description         点赞服务实现类
 **/
@Service
public class ThumbServiceImpl implements ThumbService {
    @Override
    public Boolean thumbCheck(String userName, Integer postId) {
        return null;
    }

    @Override
    public Boolean thumbPosts(String userName, Integer postsId) {
        return null;
    }

    @Override
    public Boolean cancelThumb(String userName, Integer postsId) {
        return null;
    }
}
