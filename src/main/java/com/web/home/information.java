package com.web.home;




import com.alibaba.fastjson.JSON;
import com.web.main.Rank;
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
import java.util.HashMap;
import java.util.Map;


@WebServlet(urlPatterns = "/information")
public class information extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("information");
        HttpSession session = req.getSession();
        int uid = (Integer)session.getAttribute("uid");
        String name = (String)session.getAttribute("name");

        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        ScoreMapper scoreMapper = sqlSession.getMapper(ScoreMapper.class);

        RankInfo snakeRankInfo = scoreMapper.selectSnakeByUid(uid);
        RankInfo tetrisRankInfo = scoreMapper.selectTetrisByUid(uid);
        RankInfo sweepRankInfo = scoreMapper.selectSweepByUid(uid);
        RankInfo sudokuRankInfo = scoreMapper.selectSudokuByUid(uid);

        Map<String,Object> jsonObject = new HashMap<String, Object>();
        jsonObject.put("uid",uid);
        jsonObject.put("name",name);
        jsonObject.put("snake",snakeRankInfo);
        jsonObject.put("tetris",tetrisRankInfo);
        jsonObject.put("sweep",sweepRankInfo);
        jsonObject.put("sudoku",sudokuRankInfo);

        System.out.println("Session:" + JSON.toJSONString(jsonObject));
        resp.getWriter().write(JSON.toJSONString(jsonObject));
    }
}
