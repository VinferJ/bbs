package me.vinfer.bbs.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  02:48
 * @description         ajax请求数据回传对象
 **/
@Data
@NoArgsConstructor
@ToString
public class AjaxCallback {

    /**
     * 请求成功标识
     */
    private Boolean successFlag;

    /**
     * 回显数据
     */
    private Object callbackData;

}
