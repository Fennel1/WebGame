package com.web.pojo;

public class ScoreInfo {
    private int uid;
    private int score_snake;
    private int score_tetris;
    private int score_sweep;
    private String name;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getScore_snake() {
        return score_snake;
    }

    public void setScore_snake(int score_snake) {
        this.score_snake = score_snake;
    }

    public int getScore_tetris() {
        return score_tetris;
    }

    public void setScore_tetris(int score_tetris) {
        this.score_tetris = score_tetris;
    }

    public int getScore_sweep() {
        return score_sweep;
    }

    public void setScore_sweep(int score_sweep) {
        this.score_sweep = score_sweep;
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
                ", score_snake=" + score_snake +
                ", score_tetris=" + score_tetris +
                ", score_sweep=" + score_sweep +
                ", name='" + name + '\'' +
                '}';
    }
}
