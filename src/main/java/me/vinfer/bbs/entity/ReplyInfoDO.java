package me.vinfer.bbs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:45
 * @description         帖子回复信息实体类
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReplyInfoDO {

    /**
     * 回复信息ID 主键
     */
    private Integer replyId;

    /**
     * 回复的帖子ID
     */
    private Integer postId;

    /**
     * 回复内容
     */
    private String replyContent;

    /**
     * 回复用户
     */
    private String replyUser;

    /**
     * 采纳标识  1采纳
     */
    private Integer replyAdoptFlag;

    /**
     * 回复日期
     */
    private String replyDate;

}
