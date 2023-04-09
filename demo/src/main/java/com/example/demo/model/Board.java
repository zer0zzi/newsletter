package com.example.demo.model;

import jdk.nashorn.internal.objects.annotations.Getter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "board")
@DynamicInsert
@DynamicUpdate
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type")
    private String type;

    @Column(name = "title")
    private String title;

    @Column(name = "contents")
    private String contents;

    @Column(name = "member_no")
    private String memberNo;

    @Column(name = "member_rev")
    private String member_rev;

    @Column(name = "created_time")
    private String created_time;

    @Column(name = "updated_time")
    private Date updatedTime;

    @Column(name = "likes")
    private Integer likes;

    @Column(name = "counts")
    private Integer counts;

    @Column(name = "file_id")
    private String file_id;


    public Board() {
        super();
    }

    public Board(Integer id, String type, String title, String contents, String memberNo, String member_rev, String created_time, Date updatedTime,
                 Integer likes, Integer counts, String file_id) {
        super();
        this.id = id;
        this.type = type;
        this.title = title;
        this.contents = contents;
        this.memberNo = memberNo;
        this.member_rev = member_rev;
        this.created_time = created_time;
        this.updatedTime = updatedTime;
        this.likes = likes;
        this.counts = counts;
        this.file_id = file_id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer Id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getMemberNo() {
        return memberNo;
    }

    public void setMemberNo(String memberNo) {
        this.memberNo = memberNo;
    }

    public String getMember_rev() {
        return member_rev;
    }

    public void setMember_rev(String member_rev) {
        this.member_rev = member_rev;
    }

    public String getCreated_time() {
        return created_time;
    }
    public void setCreated_time(String created_time) {
        this.created_time = created_time;
    }
    /*
    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }*/

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getCounts() {
        return counts;
    }

    public void setCounts(Integer counts) {
        this.counts = counts;
    }

    public String getFile_id() { return file_id; }

    public void setFile_id(String file_id) { this.file_id = file_id; }

    @Override
    public String toString() {
        return "Board [id=" + id + ", type=" + type + ", title=" + title + ", contents=" + contents + ", memberNo="
                + memberNo + ", member_rev=" + member_rev + ", created_time=" + created_time + ", updatedTime=" + updatedTime + ", likes=" + likes
                + ", counts=" + counts + ", file_id=" + file_id + "]";
    }
// ---Getter/Setter ---

}