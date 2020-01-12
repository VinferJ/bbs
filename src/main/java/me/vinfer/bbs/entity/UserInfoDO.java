package me.vinfer.bbs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:40
 * @description     用户信息类
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserInfoDO {

    /**
     * 用户名
     */
    private String userName;

    /**
     * 用户邮箱，与用户登录账号关联
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

}
