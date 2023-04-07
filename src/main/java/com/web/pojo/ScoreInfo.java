package com.web.pojo;

import java.security.Timestamp;

public class ScoreInfo {
    private int uid;
    private String name;
    private int difficulty;
    private int score;

    private Timestamp date;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getScore_snake() {
        return score;
    }

    public int getScore_tetris() {
        return score;
    }

    public int getScore_sweep() {
        return score;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ScoreInfo{" +
                "uid=" + uid +
                ", score=" + score +
                ", difficulty=" + difficulty +
                ", name='" + name + '\'' +
                '}';
    }
}
