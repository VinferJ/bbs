package me.vinfer.bbs.service.impl;

import me.vinfer.bbs.dao.AccountDAO;
import me.vinfer.bbs.dao.PostsDAO;
import me.vinfer.bbs.dao.UserInfoDAO;
import me.vinfer.bbs.dto.UserAccInfoDTO;
import me.vinfer.bbs.dto.UserInfoPageDTO;
import me.vinfer.bbs.dto.UserManagePageDTO;
import me.vinfer.bbs.entity.AccountDO;
import me.vinfer.bbs.entity.PostsDO;
import me.vinfer.bbs.entity.UserInfoDO;
import me.vinfer.bbs.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author by Vinfer
 * @date 2020-01-12  03:36
 * @description         用户服务实现类
 **/
@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserInfoDAO userInfoDAO;

    @Resource
    private AccountDAO accountDAO;

    @Resource
    private PostsDAO postsDAO;

    @Override
    public Boolean loginCheck(String loginAcc, String password) {
        AccountDO accountDO = accountDAO.queryAccInfoByLoginAcc(loginAcc);
        if(accountDO!=null){
            return accountDO.getPassword().equals(password);
        }
        return false;
    }

    @Override
    public AccountDO getUserAccByLoginAcc(String loginAcc) {
        return accountDAO.queryAccInfoByLoginAcc(loginAcc);
    }

    @Override
    public List<UserManagePageDTO> getAllUserManageDTO() {
        List<UserManagePageDTO> userManageInfos = userInfoDAO.queryUserManageInfo();
        int counter=1;
        for (UserManagePageDTO userManagePageDTO:userManageInfos){
            userManagePageDTO.setRowNum(counter);
            counter++;
        }
        return userManageInfos;
    }

    @Override
    public UserInfoDO getUserInfoByUserName(String userName) {
        return userInfoDAO.queryUserInfoByCondition("user_name",userName);
    }

    @Override
    public UserAccInfoDTO getUserAccInfoByLoginAcc(String loginAcc) {
        return userInfoDAO.queryUserAccInfoByLoginAcc(loginAcc);
    }

    @Override
    public UserInfoPageDTO getUserInfoPageByUserName(String userName) {
        UserInfoDO userInfo = userInfoDAO.queryUserInfoByCondition("user_name", userName);
        AccountDO accountInfo = accountDAO.queryAccInfoByLoginAcc(userInfo.getEmail());
        /*
        * 计算用户被点赞数
        * 先获取该用户所发布的所有帖子的点赞数记录
        * 然后当记录集合非空时累加这些点赞数，否则直接设置为0
        * */
        List<Integer> thumbNumInfos=postsDAO.queryThumbNumByPostUser(userName);
        Integer totalThumbNum=0;
        if(thumbNumInfos!=null){
            for (Integer thumbNum:thumbNumInfos){
                totalThumbNum+=thumbNum;
            }
        }
        return new UserInfoPageDTO(userInfo,accountInfo,totalThumbNum);
    }

    @Override
    public Integer userRegister(UserAccInfoDTO userAccInfoDTO) {
        /*
        * 先查询用户是否已注册
        * 由于用户信息中email是主键，因此通过该字段查询
        * */
        String email=userAccInfoDTO.getEmail();
        String columnName="email";
        if(userInfoDAO.queryUserInfoByCondition(columnName,email)==null){
            /*为空时，说明不存在该用户，可以提交注册*/
            Integer addUserInfoRes = userInfoDAO.addOneUserInfo(new UserInfoDO(userAccInfoDTO.getUserName(), userAccInfoDTO.getEmail()
                    , userAccInfoDTO.getJobCategory(), userAccInfoDTO.getPhoneNum()));
            Integer addAccInfoRes = accountDAO.addOneAccount(new AccountDO(userAccInfoDTO.getEmail(), userAccInfoDTO.getPassword(), 0, 100, ""));
            if(addAccInfoRes==1&&addUserInfoRes==1){
                return 1;
            }else {
                return 2;
            }
        }else {
            return 0;
        }
    }

    @Override
    public List<PostsDO> getMyPosts(String userName) {
        return postsDAO.queryPostsByPostUser(userName);
    }

    @Override
    public List<PostsDO> getMyQuestionPosts(String userName) {
        return postsDAO.queryUserQuestionPosts(userName);
    }

    @Override
    public Boolean resetUserName(String userName, String newUserName) {
        return userInfoDAO.updateUserNameByUserName(userName,newUserName)==1;
    }

    @Override
    public Integer resetPassword(String userName, String email, String newPassword) {
        /*
        * 先校验用户名和邮箱对不对
        * */
        if(userInfoDAO.queryUserInfoByUserNameAndEmail(userName,email)!=null){
            if(accountDAO.updatePasswordByLoginAcc(email,newPassword)==1){
                return 0;
            }else {
                return 2;
            }
        }else {
            return 1;
        }

    }

    @Override
    public Boolean resetJobCategory(String newJobCategory, String userName) {
        return userInfoDAO.updateJobCategoryByUserName(userName,newJobCategory)==1;
    }

    @Override
    public Boolean resetPhoneNum(String newPhoneNum, String userName) {
        return userInfoDAO.updatePhoneNumByUserName(newPhoneNum,userName)==1;
    }
}
