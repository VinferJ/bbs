package me.vinfer.bbs.service.impl;

import me.vinfer.bbs.dao.AccountDAO;
import me.vinfer.bbs.dao.PostsDAO;
import me.vinfer.bbs.dao.UserInfoDAO;
import me.vinfer.bbs.service.AdminService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:37
 * @description         用户服务实现类
 **/
@Service
public class AdminServiceImpl implements AdminService {

    @Resource
    private PostsDAO postsDAO;

    @Resource
    private AccountDAO accountDAO;

    @Override
    public Boolean deletePostById(Integer postId) {
        return postsDAO.deletePostByPostsId(postId)==1;
    }

    @Override
    public Boolean authorizeUser(String loginAcc) {
        return accountDAO.updateAccTypeByLoginAcc(loginAcc, 1)==1;
    }

    @Override
    public Boolean markPost(Integer postsId) {
        return postsDAO.updateBoutiqueFlagByPostsId(postsId, 1)==1;
    }

    @Override
    public Boolean unMarkPost(Integer postsId) {
        return postsDAO.updateBoutiqueFlagByPostsId(postsId, 0)==1;
    }

    @Override
    public Boolean topPost(Integer postsId) {
        return postsDAO.updateTopFlagByPostsId(postsId, 1)==1;
    }

    @Override
    public Boolean unTopPost(Integer postsId) {
        return postsDAO.updateTopFlagByPostsId(postsId, 0)==1;
    }
}
