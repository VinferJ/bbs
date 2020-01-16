package me.vinfer.bbs.util;

import me.vinfer.bbs.dto.CKEditorCallbackDTO;
import org.json.JSONObject;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author by 江文发
 * @date 2020-01-13    07:44
 **/
public class CkEditorImageUploadUtil {

    public static String getFileNameFromUrl(String url){
        int beginIndex = url.lastIndexOf("/");
        return url.substring(beginIndex+1);
    }

    public static void ckEditorImgUpload(String url, HttpServletResponse response)
            throws IOException {
        String fileName=getFileNameFromUrl(url);
        System.out.println(fileName);
        CKEditorCallbackDTO callbackInfo=new CKEditorCallbackDTO();
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        callbackInfo.setFileName(fileName);
        callbackInfo.setUrl(url);
        callbackInfo.setUploaded(1);
        JSONObject callback=new JSONObject(callbackInfo);
        out.println(callback);
        out.flush();
        out.close();
    }

}
