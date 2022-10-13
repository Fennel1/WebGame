package com.web.pojo;

import java.util.List;

public class RankInfo {
    private String name;
    private int score;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }

    @Override
    public String toString() {
        return "RankInfo{" +
                "name='" + name + '\'' +
                ", score=" + score +
                '}';
    }
}
