package me.vinfer.bbs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

/**
 * @author Vinfer
 */
@SpringBootApplication
public class BbsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BbsApplication.class, args);
    }

    /**
     * springboot中MultipartFile文件上传的最大值默认为1M
     * 因此需要手动修改最大值
     * @return  文件上传设置类
     */
    @Bean
    public MultipartConfigElement multipartConfigElement(){
        MultipartConfigFactory multipartConfigFactory=new MultipartConfigFactory();
        /*设置单个文件最大大小为10M*/
        multipartConfigFactory.setMaxFileSize(DataSize.ofMegabytes(10));
        /*设置一次请求最大上传总大小为100M的文件*/
        multipartConfigFactory.setMaxRequestSize(DataSize.ofMegabytes(100));
        return multipartConfigFactory.createMultipartConfig();
    }

}
