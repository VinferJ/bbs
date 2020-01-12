package me.vinfer.bbs.controller;

import me.vinfer.bbs.dto.AjaxCallback;
import me.vinfer.bbs.dto.UserAccInfoDTO;
import me.vinfer.bbs.entity.AccountDO;
import me.vinfer.bbs.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * @author by Vinfer
 * @date 2020-01-12  05:07
 * @description     用户服务控制器
 **/
@Controller
public class UserServiceController {

    @Resource
    private UserService userService;

    /**
     * 用户登录
     * @param accountDO 账号信息
     * @param session   会话对象
     * @return  返回ajax请求响应对象
     */
    @ResponseBody
    @PostMapping(value = "/bbs/signIn")
    public Object loginCheck(AccountDO accountDO, HttpSession session){
        AjaxCallback ajaxCallback=new AjaxCallback();
        /*
         * 获取前端数据
         * */
        String loginAcc=accountDO.getLoginAcc();
        String password=accountDO.getPassword();
        /*
        * 登录校验
        * */
        if(userService.loginCheck(loginAcc,password)){
            ajaxCallback.setSuccessFlag(true);
            UserAccInfoDTO userAccInfoDTO = userService.getUserAccInfoByLoginAcc(loginAcc);
            session.setAttribute("userName",userAccInfoDTO.getUserName());
            session.setAttribute("userAccInfoDTO",userAccInfoDTO);
        }else {
            ajaxCallback.setSuccessFlag(false);
        }
        return ajaxCallback;
    }

    /**
     * 用户登出
     * @param session   会话对象
     */
    @PostMapping(value = "/bbs/signOut")
    public void signOut(HttpSession session){
        /*直接该用户的让所有session数据失效*/
        session.invalidate();
    }

    @ResponseBody
    @PostMapping(value = "/bbs/signUp")
    public Object register(UserAccInfoDTO userAccInfoDTO){
        AjaxCallback ajaxCallback=new AjaxCallback();
        Integer result = userService.userRegister(userAccInfoDTO);
        if(result==1){
            ajaxCallback.setSuccessFlag(true);
        }else {
            ajaxCallback.setSuccessFlag(false);
            if(result==0){
                ajaxCallback.setCallbackData("该用户已存在！请勿重复注册");
            }else {
                ajaxCallback.setCallbackData("注册服务异常");
            }
        }
        return ajaxCallback;
    }

    @ResponseBody
    @PostMapping(value = "/bbs/resetUserName")
    public Object resetUserName(@Param("userName")String userName,@Param("newUserName")String newUserName){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(userService.resetUserName(userName,newUserName));
        return ajaxCallback;
    }

    @ResponseBody
    @PostMapping(value = "/bbs/restPassword")
    public Object resetPassword(@Param("userName")String userName,@Param("email")String email,@Param("newPassword")String newPassword){
        AjaxCallback ajaxCallback=new AjaxCallback();
        Integer resetRes=userService.resetPassword(userName,email,newPassword);
        switch (resetRes){
            case 1:{
                ajaxCallback.setSuccessFlag(false);
                ajaxCallback.setCallbackData("用户名或邮箱错误！");
                break;
            }
            case 2:{
                ajaxCallback.setSuccessFlag(false);
                ajaxCallback.setCallbackData("重置密码服务异常~");
            }
            default:{
                ajaxCallback.setSuccessFlag(true);
                break;
            }
        }
        return ajaxCallback;
    }

    @ResponseBody
    @PostMapping(value = "/bbs/resetJobCategory")
    public Object resetJobCategory(@Param("userName")String userName,@Param("newJobCategory")String newJobCategory){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(userService.resetJobCategory(newJobCategory,userName));
        return ajaxCallback;
    }

    @ResponseBody
    @PostMapping(value = "/bbs/resetPhoneNum")
    public Object resetPhoneNum(@Param("userName")String userName,@Param("newPhoneNum")String newPhoneNum){
        AjaxCallback ajaxCallback=new AjaxCallback();
        ajaxCallback.setSuccessFlag(userService.resetPhoneNum(newPhoneNum,userName));
        return ajaxCallback;
    }

}
