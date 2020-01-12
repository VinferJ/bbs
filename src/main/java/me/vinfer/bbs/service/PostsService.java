package me.vinfer.bbs.service;

import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.entity.ReplyInfoDO;

import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:21
 * @description         帖子/文章服务接口
 **/
public interface PostsService {

    /**
     * 获取所有帖子信息
     * @return 返回所有帖子信息
     */
    List<PostsDO> getAllPosts();

    /**
     * 根据帖子标签获取帖子信息
     * @param tagName 帖子标签名
     * @return 返回帖子信息集合
     */
    List<PostsDO> getPostsByTag(String tagName);

    /**
     * 获取所有的置顶帖
     * @return 返回置顶帖信息集合
     */
    List<PostsDO> getAllTopPosts();

    /**
     * 获得所有精品贴
     * @return 返回结果
     */
    List<PostsDO> getAllBoutiquePosts();

    /**
     * 获取所有问答帖
     * @return  返回问答帖信息
     */
    List<PostsDO> getAllQuestionPosts();

    /**
     * 删除一条帖子
     * @param postId 删除的帖子ID
     * @return 返回删除结果
     */
    Integer deletePost(int postId);

    /**
     * 用户发布新帖
     * @param posts   帖子对象
     * @return  返回发布结果
     */
    Boolean postNew(PostsDO posts);

    /**
     * 通过帖子ID获取帖子详细信息
     * 用户名是用来查看用户对该帖子的点赞信息
     * @param postsId     帖子id
     * @param userName  用户名
     * @return      返回帖子信息
     */
    PostsDO getDetailPostsById(String userName,Integer postsId);


    /**
     * 通过帖子Id获取帖子的全部评论信息
     * @param postsId       帖子Id
     * @return      返回帖子评论信息
     */
    List<ReplyInfoDO> getPostReplyInfosByPostsId(Integer postsId);

    /**
     * 用户提交评论
     * @param postsId          帖子id
     * @param replyContent  评论内容
     * @param replyUser     评论用户
     * @return  返回提交结果
     */
    Boolean commitComment(Integer postsId,String replyContent,String replyUser);

    /**
     * 获取用户被点赞的帖子
     * @param userName  用户名
     * @return  返回用户被点赞的帖子
     */
    List<PostsDO> getUserThumbPosts(String userName);

}
