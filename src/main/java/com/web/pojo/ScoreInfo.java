package com.web.pojo;

import java.sql.Timestamp;

public class ScoreInfo {
    private int uid;
    private String name;

    private String game;
    private int difficulty;
    private int score;
    private Timestamp date;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGame() { return game; }

    public void setGame(String game) { this.game = game; }

    public int getDifficulty() { return difficulty; }

    public void setDifficulty(int difficulty) { this.difficulty = difficulty; }

    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }

    public Timestamp getDate() { return date; }

    public void setTimeStamp(Timestamp date) { this.date = date; }

    @Override
    public String toString() {
        return "ScoreInfo{" +
                "uid=" + uid +
                ", name='" + name + '\'' +
                ", game='" + game + '\'' +
                ", score=" + score +
                ", difficulty=" + difficulty +
                ", date=" + date +
                '}';
    }
}
