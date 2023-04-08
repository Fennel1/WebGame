package com.web.pojo;

import java.util.List;

public class RankInfo {
    private String name;
    private int score;

    private int difficulty;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }

    public int getDifficulty() { return difficulty; }

    public void setDifficulty(int difficulty) { this.difficulty = difficulty; }

    @Override
    public String toString() {
        return "RankInfo{" +
                "name='" + name + '\'' +
                ", score=" + score +
                '}';
    }
}
