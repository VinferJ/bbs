package me.vinfer.bbs.service;

import me.vinfer.bbs.dto.UserAccInfoDTO;
import me.vinfer.bbs.dto.UserInfoPageDTO;
import me.vinfer.bbs.dto.UserManagePageDTO;
import me.vinfer.bbs.entity.AccountDO;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.entity.UserInfoDO;
import org.apache.ibatis.annotations.Insert;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:21
 * @description         用户服务接口
 **/
public interface UserService {

    /**
     * 用户登录验证
     * @param loginAcc             用户登录账号
     * @param password             登录密码
     * @return                              返回登录校验结果
     */
    Boolean loginCheck(String loginAcc, String password);


    /**
     * 通过登录账号获取用户账号信息
     * @param loginAcc              用户登录账号
     * @return                              返回用户账号信息
     */
    AccountDO getUserAccByLoginAcc(String loginAcc);

    /**
     * 获取所有的用户管理界面的信息
     * @return  返回结果信息
     */
    List<UserManagePageDTO> getAllUserManageDTO();


    /**
     * 通过用户登录账号获取用户信息
     * @param userName              用户登录账号
     * @return                              返回用户信息
     */
    UserInfoDO getUserInfoByUserName(String userName);


    /**
     * 通过用户登录账号获取用户信息及账户新的数据传输对象
     * @param loginAcc              用户登录账号
     * @return                              返回用户信息及账户新的数据传输对象
     */
    UserAccInfoDTO getUserAccInfoByLoginAcc(String loginAcc);

    /**
     * 通过用户名获取用户信息页数据
     * @param userName          用户名
     * @return                          返回信息数据
     */
    UserInfoPageDTO getUserInfoPageByUserName(String userName);

    /**
     * 用户注册
     * 涉及到两张表同时更新，需要开启事务管理
     * @param userAccInfoDTO            用户信息及账户信息数据传输对象
     * @return                                      返回注册结果信息,1表示注册成功，0表示用户已存在，注册失败，2表示服务异常
     */
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    Integer userRegister(UserAccInfoDTO userAccInfoDTO);

    /**
     * 用户获取自己发布过的所有普通帖子（限定帖子类型）
     * @param userName          用户名
     * @return                          返回所有用户已发帖子集合
     */
    List<PostsDO> getMyPosts(String userName);

    /**
     * 用户获取自己发布过的所有问答帖（限定帖子类型）
     * @param userName          用户名
     * @return                          返回用户所有已发的提问帖的集合
     */
    List<PostsDO> getMyQuestionPosts(String userName);

    /**
     * 重置用户名
     * @param userName              旧用户名
     * @param newUserName       新用户名
     * @return                              返回重置结果
     */
    Boolean resetUserName(String userName, String newUserName);

    /**
     * 重置密码
     * @param userName              用户名
     * @param email                     邮箱
     * @param newPassword        新密码
     * @return                              返回重置结果，0表示重置成功，1表示用户名或账号错误，2表示服务异常
     */
    Integer resetPassword(String userName, String email, String newPassword);

    /**
     * 重置工作类别
     * @param newJobCategory        新的工作类别
     * @param userName                  用户名
     * @return                                    返回重置结果
     */
    Boolean resetJobCategory(String newJobCategory, String userName);


    /**
     * 重置电话号码
     * @param newPhoneNum           新的电话号码
     * @param userName                  用户名
     * @return                                  返回重置结果
     */
    Boolean resetPhoneNum(String newPhoneNum, String userName);

}
