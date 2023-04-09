package com.example.demo.repository;

        import java.util.List;
        import com.example.demo.model.Group;
        import org.apache.ibatis.annotations.Param;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Query;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    public final static String SELECT_GROUP_LIST_PAGED = ""
            + "SELECT "
            + "group_code,"
            + "group_title,";
    //+ "ORDER BY group_code DESC LIMIT ?1, ?2";
    /*@Query(value = SELECT_GROUP_LIST_PAGED, nativeQuery = true)
    List<Group> findFromTo(
            final Integer objectStartNum,
            final Integer objectEndNum
    );*/


    /*@Query(value = SELECT_GROUP_LIST_PAGED "SELECT group_code, group_title FROM group_info WHERE group_title='IT융합학부'", nativeQuery = true)
    List<Group> findFromTo(
            final Integer objectStartNum,
            final Integer objectEndNum);*/
    @Query(value = "SELECT * FROM group_info", nativeQuery = true)
    List<Group> findGroupByGroupCodeAndGroup_title(Integer group_code, String group_title);
/*
    @Query(value = "select * from group_member m join group_info i on m.group_code = i.group_code", nativeQuery = true)
    List<Group> findGroupMember(Integer group_code, String name, String mail);*/
}