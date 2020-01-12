package me.vinfer.bbs.dao;

import me.vinfer.bbs.entity.ThumbInfoDO;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:39
 * @description         点赞信息数据访问接口
 **/
@Mapper
@Repository
public interface ThumbInfoDAO {

    /**
     * 增加一条点赞信息
     * @param userName  点赞的用户名
     * @param postId    点赞帖子的id
     * @return  返回插入结果
     */
    @Insert("insert into thumb_info values(#{postsId},#{userName})")
    Integer addThumbInfo(@Param("userName") String userName, @Param("postsIdd") int postId);

    /**
     * 通过用户名和帖子id删除一个点赞信息
     * @param userName  用户名
     * @param postsId   帖子id
     * @return  返回对数据库表影响的行数
     */
    @Delete("delete from thumb_info where posts_id=#{postsId} and thumb_user=#{userName}")
    Integer deleteThumbInfoByUserNameAndPostId(@Param("userName")String userName,@Param("postsIdd")Integer postsId);

    /**
     * 通过用户名和帖子Id获取点赞信息
     * @param userName  用户名
     * @param postsId   帖子Id
     * @return  返回点赞信息
     */
    @Select("select * from thumb_info where posts_id=#{postsId} and thumb_user=#{userName}")
    ThumbInfoDO queryByPostsIdAndUserName(@Param("userName")String userName,@Param("postsIdd") Integer postsId);

    /**
     * 通过帖子id查询所有的点赞信息
     * @param postsId   帖子id
     * @return  返回点赞信息
     */
    @Select("select * from thumb_info where posts_id=#{postsId}")
    List<ThumbInfoDO> queryAllThumbInfoByPostsId(Integer postsId);

}
