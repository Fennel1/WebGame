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
    RankInfo selectSudokuByUid(int uid);
    List<RankInfo> selectSnakeRank();
    List<RankInfo> selectTetrisRank();
    List<RankInfo> selectSweepRank();

    List<ScoreInfo> GetAllRecord(int uid);
    List<ScoreInfo> GetSnakeRecord(int uid);
    List<ScoreInfo> GetTetrisRecord(int uid);
    List<ScoreInfo> GetSweepRecord(int uid);
    List<ScoreInfo> GetSudokuRecord(int uid);
    List<ScoreInfo> GetPacmanRecord(int uid);

    int GetSnakeCount(int uid);
    int GetTetrisCount(int uid);
    int GetSweepCount(int uid);
    int GetSudokuCount(int uid);
    int GetPacmanCount(int uid);

    void add(ScoreInfo scoreInfo);
}