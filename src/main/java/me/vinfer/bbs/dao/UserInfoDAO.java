package me.vinfer.bbs.dao;

import me.vinfer.bbs.dto.UserAccInfoDTO;
import me.vinfer.bbs.dto.UserManagePageDTO;
import me.vinfer.bbs.entity.AccountDO;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.entity.UserInfoDO;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:37
 * @description         用户信息数据访问接口
 **/
@Mapper
@Repository
public interface UserInfoDAO {

    /**
     * 获取所有用户信息
     * @return      返回所有用户信息
     */
    @Select("select * from user_info")
    List<UserInfoDO> queryAllUserInfo();

    /**
     * 通过用户名和邮箱查询用户信息
     * @param userName  用户名
     * @param email 邮箱
     * @return  返回用户信息
     */
    @Select("select * from user_info where user_name=#{userName} and email=#{email}")
    UserInfoDO queryUserInfoByUserNameAndEmail(@Param("userName") String userName,@Param("email") String email);

    /**
     * 连表查询用户信息和账户信息
     * @return      返回所有用户管理信息
     */
    @Select("select user_name,login_acc,acc_type,register_date from user_info,account where user_info.email=account.login_acc")
    List<UserManagePageDTO> queryUserManageInfo();

    /**
     * 通过登录账号连表查询用户的的用户+账户信息
     * @param loginAcc  登录账号
     * @return      返回所有信息的集合
     */
    @Select("select user_name,email,job_category,phone_num,`password`,acc_type,points,register_date from " +
            "user_info,account where user_info.email=account.login_acc and email=#{loginAcc}")
    UserAccInfoDTO queryUserAccInfoByLoginAcc(String loginAcc);

    /**
     * 根据传入的列名和条件查询用户信息（仅适用varchar字段）
     * @param columnName                数据库表字段的列名
     * @param condition                      查询条件
     * @return                                      返回查询信息
     */
    @Select("select * from user_info where ${columnName}=#{condition}")
    UserInfoDO queryUserInfoByCondition(@Param("columnName") String columnName,@Param("condition") String condition);

    /**
     * 新增一个用户信息
     * @param userInfo  用户信息
     * @return  返回对数据库表影响的行数
     */
    @Insert("insert into user_info values(#{userName},#{email},#{jobCategory},#{phoneNum})")
    Integer addOneUserInfo(UserInfoDO userInfo);

    /**
     * 更新用户名
     * @param userName  旧用户名
     * @param newUserName   新用户名
     * @return  返回对数据库表影响的行数
     */
    @Update("update user_info set user_name=#{newUserName} where user_name=#{userName}")
    Integer updateUserNameByUserName(@Param("userName") String userName, @Param("newUserName") String newUserName);

    /**
     * 更新用户工作类别
     * @param userName  用户名
     * @param newJobCategory    新工作类别
     * @return  返回对数据库表影响的行数
     */
    @Update("update user_info set job_category=#{newJobCategory} where user_name=#{userName}")
    Integer updateJobCategoryByUserName(@Param("userName") String userName,@Param("newJobCategory") String newJobCategory);

    /**
     * 更新用户手机号
     * @param newPhoneNum   新的电话号码
     * @param userName   用户名
     * @return  返回对数据库表影响的行数
     */
    @Update("update user_info set phone_num=#{newPhoneNum} where user_name=#{userName}")
    Integer updatePhoneNumByUserName(@Param("newPhoneNum") String newPhoneNum, @Param("userName") String userName);


}
