package me.vinfer.bbs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:41
 * @description     账户信息类
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AccountDO {

    /**
     * 账户登录账号
     */
    private String loginAcc;

    /**
     * 账号登录密码
     */
    private String password;

    /**
     * 账户类型
     * 1表示管理员，0表示普通用户
     */
    private Integer accType;

    /**
     * 账户积分
     */
    private Integer points;

    /**
     * 账号注册日期
     */
    private String registerDate;

}
