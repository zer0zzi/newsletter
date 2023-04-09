package com.example.demo.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

@Component("fileUtils")
public class FileUtils1 {
    //단일 파일 업로드
    public String parseInsertFile(Map<String, Object> map, HttpServletRequest request, String filePath) throws  Exception {
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
        MultipartFile multipartFile = null;

        String file_id = null;
        String originalFileName = null;
        String originalFileExtension = null;

        File file = new File(filePath);
        if (file.exists() == false) {
            file.mkdirs();
        }

        while (iterator.hasNext()) {
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            if (multipartFile.isEmpty() == false) {
                originalFileName = multipartFile.getOriginalFilename();
                originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                file_id = UUID.randomUUID().toString()+originalFileExtension;
                file = new File(filePath + file_id);
                multipartFile.transferTo(file);
            }
        }
        return  file_id;
    }
}
