package me.vinfer.bbs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:43
 * @description     文章/帖子实体类
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PostsDO {

    /**
     * 帖子Id
     */
    private Integer postsId;

    /**
     * 发布帖子的用户的用户名
     */
    private String postUser;

    /**
     * 帖子标题
     */
    private String title;

    /**
     * 帖子内容
     */
    private String content;

    /**
     * 帖子类型 0普通帖 1问答帖
     */
    private Integer type;

    /**
     * 帖子种类标签 默认其他
     */
    private String tag;

    /**
     * 帖子点赞量
     */
    private Integer thumbNum;

    /**
     * 置顶标记
     */
    private Integer topFlag;

    /**
     * 帖子加精标签 1表示加精
     */
    private Integer boutiqueFlag;

    /**
     * 帖子发布日期
     */
    private String postDate;

    /**
     * 帖子积分奖励，默认为0
     */
    private Integer reward;

    /**
     * 多参构造器
     * @param postUser          帖子发表用户
     * @param title                  帖子标题
     * @param content            帖子内容
     * @param type                 帖子类型
     * @param tag                   帖子标签
     * @param reward             帖子积分
     */
    public PostsDO(String postUser, String title, String content, Integer type, String tag, Integer reward) {
        this.postUser = postUser;
        this.title = title;
        this.content = content;
        this.type = type;
        this.tag = tag;
        this.reward = reward;
    }


}
