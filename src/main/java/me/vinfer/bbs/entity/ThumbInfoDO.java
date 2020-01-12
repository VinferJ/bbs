package me.vinfer.bbs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:47
 * @description         帖子点赞信息
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ThumbInfoDO {

    /**
     * 点赞的帖子ID
     */
    private Integer postsId;

    /**
     * 点赞的用户的用户名
     */
    private String thumbUser;

}
