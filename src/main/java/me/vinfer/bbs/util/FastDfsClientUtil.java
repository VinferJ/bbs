package me.vinfer.bbs.util;


import org.csource.common.MyException;
import org.csource.common.NameValuePair;
import org.csource.fastdfs.*;

import java.io.IOException;

/**
 * @author by Vinfer
 * @date 2020-01-01  13:59
 **/
public class FastDfsClientUtil {

    private static StorageClient1 storageClient = null;

    public FastDfsClientUtil(String conf) throws Exception {
        if (conf.contains("classpath:")) {
            conf = conf.replace("classpath:", this.getClass().getResource("/").getPath());
            System.out.println("==================================>>>>>>>>>>"+conf);
        }
        ClientGlobal.init(conf);
        TrackerClient trackerClient = new TrackerClient();
        TrackerServer trackerServer = trackerClient.getTrackerServer();
        StorageServer storageServer = null;
        storageClient = new StorageClient1(trackerServer, storageServer);
    }


    public String uploadFile(String fileName,String extName, NameValuePair[] metas) throws IOException, MyException {
        return storageClient.upload_file1(fileName, extName, metas);
    }

    public String uploadFile(String fileName) throws Exception {
        return uploadFile(fileName, null, null);
    }

    public String uploadFile(String fileName, String extName) throws Exception {
        return uploadFile(fileName, extName, null);
    }

    public String uploadFile(byte[] fileContent, String extName, NameValuePair[] metas) throws Exception {
        return storageClient.upload_file1(fileContent, extName, metas);
    }

    public String uploadFile(byte[] fileContent) throws Exception {
        return uploadFile(fileContent, null, null);
    }

    public String uploadFile(byte[] fileContent, String extName) throws Exception {
        return uploadFile(fileContent, extName, null);
    }


}
