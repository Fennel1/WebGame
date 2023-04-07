package com.web.mapper;

import com.web.pojo.RankInfo;
import com.web.pojo.ScoreInfo;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;

public interface ScoreMapper {

    List<ScoreInfo> selectAll();
    ScoreInfo selectByUid(int uid);
    RankInfo selectSnakeByUid(int uid);
    RankInfo selectTetrisByUid(int uid);
    RankInfo selectSweepByUid(int uid);
    List<RankInfo> selectSnakeRank();
    List<RankInfo> selectTetrisRank();
    List<RankInfo> selectSweepRank();

    void add(int uid, String name, int difficulty, int score, Timestamp timeStamp);
}