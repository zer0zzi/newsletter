package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import java.io.File;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.UUID;
import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.activation.DataSource;
import javax.mail.*;
import javax.mail.internet.*;

public class Send_Mail {
    String Sender = "";
    String Reciver = "";
    String Content = "";
    String Title = "";
    String File_id = "";



    public Send_Mail(){}

    public Send_Mail(String Sender, String Reciver, String Content, String Title, String File_id) {
        this.Sender = Sender;
        this.Reciver = Reciver;
        this.Content = Content;
        this.Title = Title;
        this.File_id = File_id;
    }

    @Autowired
    JavaMailSenderImpl mailSender; //20210607

    public void Send_News_Mail() throws MessagingException {
        Properties props = new Properties();

        //SSL 설정
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");//465
        props.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        //로그인 설정
        Session session = Session.getDefaultInstance(props,  new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                //return new PasswordAuthentication("icnetwebmaster","icnet789456");
                return new PasswordAuthentication("nemocompany2009@gmail.com", "Icnet2009#!");
            }
        });

        try {

            //String filename = "F:\\test1.txt"; //20210607

            MimeMessage message = new MimeMessage(session);
            final MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            message.setFrom(new InternetAddress(this.Sender)); //보내는 사람 이름
            //message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(this.Reciver));// 받는 사람
            String addrArr = this.Reciver.replaceAll(";",",");
            Address[] parse = InternetAddress.parse(addrArr);
            message.setRecipients(Message.RecipientType.TO, parse); //받는 사람(다중 사용자)
            message.setSubject(this.Title); //제목
            message.setText(this.Content); //내용

            /*String pathfile="C:\\dev\\demo\\demo\\src\\main\\resources\\templates\\20210629aaa.jpg";
            FileDataSource fds = new FileDataSource(pathfile);
            String originalFileNm = "학습사진.jpg";
            helper.addAttachment(MimeUtility.encodeText(originalFileNm, "UTF-8", "B"), fds);*/

            //message.setFileName(this.File_id); //파일 첨부
            //message.setFileName(this.File_id);


            //이메일 헤더
            message.setHeader("content-Type", "text/html; charset=utf-8");
            Transport.send(message);

            //System.out.println("Done");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
