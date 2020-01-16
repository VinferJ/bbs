package me.vinfer.bbs.service.impl;

import me.vinfer.bbs.dao.PostsDAO;
import me.vinfer.bbs.dao.ReplyInfoDAO;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.entity.ReplyInfoDO;
import me.vinfer.bbs.service.PostsService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:37
 * @description         帖子/文章服务实现类
 **/
@Service
public class PostsServiceImpl implements PostsService {

    @Resource
    private PostsDAO postsDAO;

    @Resource
    private ReplyInfoDAO replyInfoDAO;

    @Override
    public List<PostsDO> getAllPosts() {
        return postsDAO.queryAllPosts();
    }

    @Override
    public PostsDO getPostsById(Integer postsId) {
        return postsDAO.queryPostsById(postsId);
    }

    @Override
    public List<PostsDO> getPostsByTag(String tagName) {
        return postsDAO.queryPostsByTag(tagName);
    }

    @Override
    public List<PostsDO> getAllTopPosts() {
        return postsDAO.queryAllTopPosts();
    }

    @Override
    public List<PostsDO> getAllBoutiquePosts() {
        return postsDAO.queryAllBoutiquePosts();
    }

    @Override
    public List<PostsDO> getAllQuestionPosts() {
        return postsDAO.queryAllQuestionPosts();
    }

    @Override
    public Boolean postNew(PostsDO posts) {
        return postsDAO.addOnePosts(posts)==1;
    }

    @Override
    public PostsDO getDetailPostsById(String userName, Integer postsId) {
        return null;
    }

    @Override
    public List<ReplyInfoDO> getPostReplyInfosByPostsId(Integer postsId) {
        return replyInfoDAO.queryReplyInfoByPostsId(postsId);
    }

    @Override
    public Boolean commitComment(Integer postsId, String replyContent, String replyUser) {
        return replyInfoDAO.addOneReplyInfo(postsId, replyContent, replyUser)==1;
    }

    @Override
    public List<PostsDO> getUserAllPosts(String userName) {
        return postsDAO.queryPostsByPostUser(userName);
    }

    @Override
    public List<PostsDO> getUserThumbPosts(String userName) {
        return postsDAO.queryUserThumbPosts(userName);
    }

    @Override
    public List<PostsDO> getUserQuestionPosts(String userName) {
        return postsDAO.queryUserQuestionPosts(userName);
    }

    @Override
    public List<PostsDO> getUserAnswerPosts(String userName) {
        return postsDAO.queryUserAnswerPosts(userName);
    }
}
