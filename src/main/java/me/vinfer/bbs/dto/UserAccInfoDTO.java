package me.vinfer.bbs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:50
 * @description         用户信息及用户账户信息数据传输对象，将用户信息及账户信息同时封装到一个DTO中回传给前端
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserAccInfoDTO {

    /**
     * 用户名
     */
    private String userName;

    /**
     * 用户邮箱/登录账号
     */
    private String email;

    /**
     * 用户工作性质
     */
    private String jobCategory;

    /**
     * 用户联系电话
     */
    private String phoneNum;

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
