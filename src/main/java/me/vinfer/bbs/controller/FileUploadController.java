package me.vinfer.bbs.controller;

import com.sun.deploy.net.HttpResponse;
import me.vinfer.bbs.util.CkEditorImageUploadUtil;
import me.vinfer.bbs.util.FastDfsClientUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

/**
 * @author by 江文发
 * @date 2020-01-13    07:48
 * @description     文件上传控制器
 **/
@Controller
public class FileUploadController {

    /**
     * 远程服务器地址
     * 即fastDfs部署的服务器地址加映射端口
     */
    private final static String REMOTE_SERVER_ADDRESS="your-fastDfs-server-address";

    @PostMapping(value = "/bbs/imgUpload",headers="content-type=multipart/form-data")
    public void fileUpload(@RequestParam("upload")MultipartFile file, HttpServletResponse response){
        /*获取源文件名称*/
        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        /*获取文件后缀，判别上传文件的类型，同时fastDfs生成随机文件名也需要拼接该后缀*/
        String extName = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        /*上传到图片服务器*/
        FastDfsClientUtil fastDfsClient;
        String url;
        try {
            fastDfsClient = new FastDfsClientUtil("classpath:client.conf");
            /*要拼接服务器地址，才是文件完整的url*/
            url = REMOTE_SERVER_ADDRESS+fastDfsClient.uploadFile(file.getBytes(), extName);
            CkEditorImageUploadUtil.ckEditorImgUpload(url,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
