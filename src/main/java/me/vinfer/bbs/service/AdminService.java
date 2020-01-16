package me.vinfer.bbs.service;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:21
 * @description         管理员服务接口
 **/
public interface AdminService {

    /**
     * 管理员删除帖子检查
     * @param postId    删除的帖子id
     * @return  返回删除检查结果
     */
    Boolean deletePostById(Integer postId);


    /**
     * 管理员给用户管理权限
     * @param loginAcc  用户账号
     * @return 返回授权结果
     */
    Boolean authorizeUser(String loginAcc);

    /**
     * 管理员给帖子加精
     * @param postsId   帖子id
     * @return  返回加精结果
     */
    Boolean markPost(Integer postsId);

    /**
     * 管理员取消帖子加精
     * @param postsId   帖子id
     * @return  返回帖子取消加精结果
     */
    Boolean unMarkPost(Integer postsId);

    /**
     * 管理员置顶帖子
     * @param postsId   帖子id
     * @return  返回帖子置顶结果
     */
    Boolean topPost(Integer postsId);

    /**
     * 管理员取消置顶帖子
     * @param postsId   帖子id
     * @return  返回取消结果
     */
    Boolean unTopPost(Integer postsId);

}
