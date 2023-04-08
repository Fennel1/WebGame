package com.web.games;

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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;

@WebServlet(urlPatterns = "/sudokuUpload")
public class SudokuUpload extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("snakeUpload");
        int score = Integer.parseInt(req.getParameter("score"));
        int difficulty = Integer.parseInt(req.getParameter("difficulty"));
        System.out.println(score);

        HttpSession session = req.getSession();
        int uid = (Integer) session.getAttribute("uid");
        String name = (String) session.getAttribute("name");

        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        ScoreMapper scoreMapper = sqlSession.getMapper(ScoreMapper.class);
        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
        ScoreInfo scoreInfo = new ScoreInfo();
        scoreInfo.setUid(uid);
        scoreInfo.setName(name);
        scoreInfo.setGame("sudoku");
        scoreInfo.setDifficulty(difficulty);
        scoreInfo.setScore(score);
        scoreInfo.setTimeStamp(timeStamp);
        System.out.println(scoreInfo);
        scoreMapper.add(scoreInfo);
        sqlSession.commit();
        resp.getWriter().write("true");
    }
}
