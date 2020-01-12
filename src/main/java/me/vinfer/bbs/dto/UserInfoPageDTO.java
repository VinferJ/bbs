package me.vinfer.bbs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import me.vinfer.bbs.entity.AccountDO;
import me.vinfer.bbs.entity.UserInfoDO;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:53
 * @description         用户信息页数据传输对象
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserInfoPageDTO {

    /**
     * 用户名
     */
    private String userName;

    /**
     * 用户邮箱
     */
    private String email;

    /**
     * 账户类型
     */
    private Integer accType;

    /**
     * 账户积分
     */
    private Integer points;

    /**
     * 工作性质
     */
    private String jobCategory;

    /**
     * 联系手机
     */
    private String phoneNum;

    /**
     * 账号注册日期
     */
    private String registerDate;

    /**
     * 用户被点赞数
     * （发表过的帖子获得的总赞数）
     */
    private Integer  beenThumbNum;

    /**
     * 多参构造器
     * @param userInfoDO                用户信息对象
     * @param accountDO                 账户信息对象
     * @param beenThumbNum          被点赞数
     */
    public UserInfoPageDTO(UserInfoDO userInfoDO, AccountDO accountDO, Integer beenThumbNum){
        this.userName=userInfoDO.getUserName();
        this.email=userInfoDO.getEmail();
        this.accType=accountDO.getAccType();
        this.points=accountDO.getPoints();
        this.jobCategory=userInfoDO.getJobCategory();
        this.phoneNum=userInfoDO.getPhoneNum();
        this.registerDate=accountDO.getRegisterDate();
        this.beenThumbNum=beenThumbNum;

    }

}
