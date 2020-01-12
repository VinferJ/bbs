package me.vinfer.bbs.dao;

import me.vinfer.bbs.entity.PostsDO;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:38
 * @description         帖子数据访问接口
 **/
@Mapper
@Repository
public interface PostsDAO {

    /**
     * 查询所有的帖子
     * @return 返回帖子信息集合
     */
    @Select("select * from posts")
    List<PostsDO> queryAllPosts();

    /**
     * 通过用户名查询该用户发布的帖子的点赞数记录
     * @param userName      用户名
     * @return  返回点击数记录集合
     */
    @Select("select thumb_num from posts where post_user=#{userName}")
    List<Integer> queryThumbNumByPostUser(String userName);

    /**
     * 根据帖子Id查询帖子信息
     * @param postsId 帖子Id
     * @return  返回帖子信息
     */
    @Select("select * from posts where posts_id=#{postsId}")
    PostsDO queryPostsById(Integer postsId);

    /**
     * 通过用户名查询用户发表过的帖子/文章
     * @param userName  用户名
     * @return  返回帖子集合
     */
    @Select("select * from posts where post_user=#{userName}")
    List<PostsDO> queryPostsByPostUser(String userName);

    /**
     * 通过用户名查询用户发表过的提问帖
     * @param userName  用户名
     * @return  返回帖子集合
     */
    @Select("select * from posts where boutique_flag=1 and post_user=#{userName}")
    List<PostsDO> queryUserQuestionPosts(String userName);

    /**
     * 根据标签获取帖子内容
     * @param tagName 标签名
     * @return  返回标签对应的帖子
     */
    @Select("select * from posts where tag=#{tagName}")
    List<PostsDO> queryPostsByTag(String tagName);

    /**
     * 查询所有置顶帖
     * @return 返回所有的置顶帖
     */
    @Select("select * from posts where top_flag=1")
    List<PostsDO> queryAllTopPosts();

    /**
     * 获取所有的精品帖数据
     * @return 返回所有的精品贴
     */
    @Select("select * from posts where boutique_flag=1")
    List<PostsDO> queryAllBoutiquePosts();

    /**
     * 通过帖子id增加点赞数，增加1
     * @param postsId   帖子id
     * @return  返回对数据库表影响的行数
     */
    @Update("update posts set thumb_num=thumb_num+1 where posts_id=#{postsId}")
    Integer addThumbNumByPostsId(Integer postsId);

    /**
     * 通过帖子id增加点赞数，减少1
     * @param postsId   帖子id
     * @return  返回对数据库表影响的行数
     */
    @Update("update posts set thumb_num=thumb_num-1 where posts_id=#{postsId}")
    Integer reduceThumbNum(Integer postsId);

    /**
     * 通过帖子id删除一条帖子
     * @param postId    删除帖子id
     * @return  返回对数据库表影响的行数
     */
    @Delete("delete from posts where posts_id=#{postsId}")
    Integer deletePostByPostsId(int postId);

    /**
     * 通过帖子id更新帖子加精标识
     * @param postsId 帖子id
     * @param newBoutiqueFlag 新的帖子加精标识
     * @return 返回对数据库表影响的行数
     */
    @Update("update posts set boutique_flag=#{newBoutiqueFlag} where posts_id=#{postsId}")
    Integer updateBoutiqueFlagByPostsId(@Param("postsId") Integer postsId,@Param("newBoutiqueFlag") Integer newBoutiqueFlag);

    /**
     * 管理员置顶帖子
     * @param postsId 置顶的帖子id
     * @param newTopFlag 新的置顶标识
     * @return  返回对数据库表影响的行数
     */
    @Update("update posts set top_flag=#{newTopFlag} where posts_id=#{postsId}")
    Integer updateTopFlagByPostsId(@Param("postsId") Integer postsId,@Param("newTopFlag") Integer newTopFlag);

    /**
     * 新增一条帖子记录（发帖）
     * @param posts  帖子信息
     * @return 返回对数据库表影响的行数
     */
    @Insert("insert into posts(title,content,type,tag,reward,post_user) values(#{title},#{content},#{type},#{tag},#{reward},#{postUser})")
    Integer addOnePosts(PostsDO posts);

}
