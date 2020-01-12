package me.vinfer.bbs.dao;

import me.vinfer.bbs.entity.AccountDO;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:38
 * @description         账户数据访问接口
 **/
@Mapper
@Repository
public interface AccountDAO {

    /**
     * 查询所有账户信息
     * @return  返回所有账户信息的集合
     */
    @Select("select * from account")
    List<AccountDO>queryAllAccountInfos();

    /**
     * 通过登录账号查询账号信息
     * @param loginAcc 登录账号
     * @return  返回账号信息
     */
    @Select("select * from account where login_acc=#{loginAcc}")
    AccountDO queryAccInfoByLoginAcc(String loginAcc);

    /**
     * 新增一个账户
     * @param account 账号信息
     * @return  返回对数据库表影响的行数
     */
    @Insert("insert into account(login_acc,password) values(#{loginAcc},#{password})")
    Integer addOneAccount(AccountDO account);

    /**
     * 更新账号登录密码
     * @param loginAcc 用户登录账号
     * @param newPassword 新密码
     * @return  返回对数据库表影响的行数
     */
    @Update("update account set password=#{newPassword} where login_acc=#{loginAcc}")
    Integer updatePasswordByLoginAcc(@Param("loginAcc") String loginAcc, @Param("newPassword") String newPassword);

    /**
     * 更新用户账号类型
     * @param loginAcc 登陆账号
     * @param accType  账户类型
     * @return  返回对数据库表影响的行数
     */
    @Update("update account set acc_type=#{accType} where login_acc=#{loginAcc}")
    Integer updateAccTypeByLoginAcc(@Param("loginAcc") String loginAcc,@Param("accType") Integer accType);

}
