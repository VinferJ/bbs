package me.vinfer.bbs.dao;

import me.vinfer.bbs.entity.ReplyInfoDO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:38
 * @description         回复信息数据访问接口
 **/
@Mapper
@Repository
public interface ReplyInfoDAO {

    /**
     * 通过帖子Id查询该帖子的所有回复信息
     * @param postsId   帖子Id
     * @return  帖子的回复信息集合
     */
    @Select("select * from reply_info where posts_id=#{postsId}")
    List<ReplyInfoDO> queryReplyInfoByPostsId(Integer postsId);

    /**
     * 增加一条帖子的回复/评论信息
     * @param postsId   帖子id
     * @param replyContent 回复内容
     * @param replyUser 发表回复的用户
     * @return  返回对数据库表影响的行数
     */
    @Insert("insert into reply_info(posts_id,reply_content,reply_user) values(#{postsId},#{replyContent},#{replyUser})")
    Integer addOneReplyInfo(@Param("postsId") Integer postsId,@Param("replyContent") String replyContent,@Param("replyUser") String replyUser);

}
