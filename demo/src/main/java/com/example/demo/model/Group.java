package com.example.demo.model;

import jdk.nashorn.internal.objects.annotations.Getter;
import jdk.nashorn.internal.objects.annotations.Setter;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "group_info")
@DynamicInsert
@DynamicUpdate
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer group_code;

    @Column(name = "group_title")
    private String group_title;


    public Group() {
        super();
    }

    public Group(Integer group_code, String group_title) {
        super();
        this.group_code = group_code;
        this.group_title = group_title;

    }
    public Integer getGroup_code() {
        return group_code;
    }

    public void setGroup_code(Integer group_code) {
        this.group_code = group_code;
    }

    public String getGroup_title() {
        return group_title;
    }

    public void setGroup_title(String group_title) {
        this.group_title = group_title;
    }


    @Override
    public String toString() {
        return "Group [group_code=" + group_code + ", group_title=" + group_title + "]";
    }

}