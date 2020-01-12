package me.vinfer.bbs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:19
 * @description         用户管理页面数据传输对象
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserManagePageDTO {

    /**
     * 行号，用于前端显示
     */
    private Integer rowNum;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 登录账号
     */
    private String loginAcc;

    /**
     * 账户类型
     */
    private Integer  accType;

    /**
     * 注册日期
     */
    private String registerDate;

}
