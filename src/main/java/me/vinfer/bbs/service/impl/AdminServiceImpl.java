package me.vinfer.bbs.service.impl;

import me.vinfer.bbs.service.AdminService;
import org.springframework.stereotype.Service;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:37
 * @description         用户服务实现类
 **/
@Service
public class AdminServiceImpl implements AdminService {
    @Override
    public Boolean deletePostById(int postId) {
        return null;
    }

    @Override
    public Boolean authorizeUser(String loginAcc) {
        return null;
    }

    @Override
    public Boolean markPost(Integer postsId) {
        return null;
    }

    @Override
    public Boolean unMarkPost(Integer postsId) {
        return null;
    }

    @Override
    public Boolean topPost(Integer postsId) {
        return null;
    }

    @Override
    public Boolean unTopPost(Integer postsId) {
        return null;
    }
}
