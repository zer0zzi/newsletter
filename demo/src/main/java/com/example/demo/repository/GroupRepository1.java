package com.example.demo.repository;

import java.util.List;

import com.example.demo.model.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GroupRepository1 extends JpaRepository<Subscriber, Integer> {
    public final static String SELECT_SUBS_LIST_PAGED = ""
            + "SELECT"
            + "id,"
            + "name,"
            + "email,"
            + "group_title,";


    @Query(value = "SELECT * FROM subscribe_info", nativeQuery = true)
    List<Subscriber> subscriberinsert(Integer id, String name, String email, String group_title);

}