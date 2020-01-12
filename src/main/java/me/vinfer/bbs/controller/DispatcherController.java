package me.vinfer.bbs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author by Vinfer
 * @date 2020-01-12  08:55
 * @description     转发控制器，转发公共页面
 **/
@Controller
public class DispatcherController {

    @GetMapping(value = "/")
    public String indexPage(){
        return "index";
    }

    @GetMapping(value = {"/index","/index.html","/home"})
    public String redirectPage(){
        return "redirect:/";
    }

}
