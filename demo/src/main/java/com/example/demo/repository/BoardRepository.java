package com.example.demo.repository;

import java.util.List;
import com.example.demo.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    public final static String SELECT_BOARD_LIST_PAGED = ""
            + "SELECT "
            + "no,"
            + "type,"
            + "title,"
            + "contents,"
            + "member_no,"
            + "member_rev"
            + "created_time,"
            + "updated_time,"
            + "likes,"
            + "counts"
            + "file_id";


    @Query(value = SELECT_BOARD_LIST_PAGED, nativeQuery = true)
    List<Board> findFromTo(
            final Integer objectStartNum,
            final Integer objectEndNum);
}