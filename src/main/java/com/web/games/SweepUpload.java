package com.web.games;

import com.alibaba.fastjson.JSON;
import com.web.mapper.ScoreMapper;
import com.web.pojo.RankInfo;
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

@WebServlet(urlPatterns = "/sweepUpload")
public class SweepUpload extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("sweepUpload");
        int score = Integer.parseInt(req.getParameter("score"));
        System.out.println(score);

        HttpSession session = req.getSession();
        int uid = (Integer) session.getAttribute("uid");

        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        ScoreMapper scoreMapper = sqlSession.getMapper(ScoreMapper.class);
        RankInfo rankInfo = scoreMapper.selectSweepByUid(uid);
        if (score < rankInfo.getScore()){
            scoreMapper.updateSweepScore(uid, score);
            sqlSession.commit();
            resp.getWriter().write("true");
        }
        else{
            resp.getWriter().write("false");
        }
    }
}
