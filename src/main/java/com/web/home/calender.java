package com.web.home;




import com.alibaba.fastjson.JSON;
import com.web.main.Rank;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@WebServlet(urlPatterns = "/calender")
public class calender extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("calender");
        HttpSession session = req.getSession();
        int uid = (Integer)session.getAttribute("uid");

        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        ScoreMapper scoreMapper = sqlSession.getMapper(ScoreMapper.class);
        Map<String,Object> jsonObject = new HashMap<String, Object>();

        int snakeCount = scoreMapper.GetSnakeCount(uid);
        int tetrisCount = scoreMapper.GetTetrisCount(uid);
        int sweepCount = scoreMapper.GetSweepCount(uid);
        int sudokuCount = scoreMapper.GetSudokuCount(uid);
        int pacmanCount = scoreMapper.GetPacmanCount(uid);
        int allCount = snakeCount + tetrisCount + sweepCount + sudokuCount + pacmanCount;

        jsonObject.put("snakeCount", snakeCount);
        jsonObject.put("tetrisCount", tetrisCount);
        jsonObject.put("sweepCount", sweepCount);
        jsonObject.put("sudokuCount", sudokuCount);
        jsonObject.put("pacmanCount", pacmanCount);
        jsonObject.put("allCount", allCount);


        List<ScoreInfo> records = scoreMapper.GetAllRecord(uid);
        long[] calenderCount = new long[365];
        for (ScoreInfo record : records) {
            Date date = new Date(record.getDate().getTime());
            if (date.after(new Date(System.currentTimeMillis() - 365 * 24 * 60 * 60 * 1000L))) {
                calenderCount[(int) ((System.currentTimeMillis() - date.getTime()) / (24 * 60 * 60 * 1000))]++;
            }
        }
        jsonObject.put("calenderCount", calenderCount);

        resp.getWriter().write(JSON.toJSONString(jsonObject));
    }
}
