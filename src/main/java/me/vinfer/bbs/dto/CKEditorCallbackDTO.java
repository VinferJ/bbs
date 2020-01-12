package me.vinfer.bbs.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author by Vinfer
 * @date 2020-01-12  05:03
 * @description         用于ckEditor图片上传请求的回传对象
 **/
@Data
@NoArgsConstructor
@ToString
public class CKEditorCallbackDTO {

    /**
     *上传状态
     */
    private Integer uploaded;

    /**
     * 文件名称
     */
    private String fileName;

    /**
     * 文件url
     */
    private String url;

}
