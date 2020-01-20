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

    public FastDfsClientUtil() throws Exception {

        /*
         * 使用默认的init方法需要外部的.conf配置文件，但是由于项目打包为jar后文件路径为虚拟路径
         * 因此之前的路径配置会出现io错误，即文件无法找到，没打包跑是没问题的
         * 因此这里可以直接使用initByProperties方法来初始化，只需要在properties文件中
         * 配置好fastDfs服务器地址以及端口即可
         * （这里还是保留了client.conf配置文件）
         */
        ClientGlobal.initByProperties("application.properties");
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
