package com.web.main;

import com.alibaba.fastjson.JSON;
import com.web.mapper.ScoreMapper;
import com.web.pojo.RankInfo;
import com.web.pojo.ScoreInfo;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@WebServlet(urlPatterns = "/rank")
public class Rank extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("tetris");

        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        ScoreMapper scoreMapper = sqlSession.getMapper(ScoreMapper.class);

        List<RankInfo> snakeScoreList = scoreMapper.selectSnakeRank();
        List<RankInfo> tetrisScoreList = scoreMapper.selectTetrisRank();
        List<RankInfo> sweepScoreList = scoreMapper.selectSweepRank();

        resp.getWriter().write(JSON.toJSONString(Arrays.asList(snakeScoreList, tetrisScoreList, sweepScoreList)));
    }
}
