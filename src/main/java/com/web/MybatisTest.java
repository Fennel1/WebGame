package com.web;

import com.web.mapper.ScoreMapper;
import com.web.mapper.UserMapper;
import com.web.pojo.RankInfo;
import com.web.pojo.ScoreInfo;
import com.web.pojo.UserInfo;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MybatisTest {
    public static void main(String[] args) throws IOException {
//        String resource = "mybatis-config.xml";
//        InputStream inputStream = Resources.getResourceAsStream(resource);
//        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//
//        SqlSession sqlSession = sqlSessionFactory.openSession();
//        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
//        List<UserInfo> users = userMapper.selectAll();
//        System.out.println(users);

//        UserInfo userInfo = new UserInfo();
//        userInfo.setName("kim5");
//        userInfo.setPassword("555");
//        userMapper.add(userInfo);
//        sqlSession.commit();

//        sqlSession.close();

//        String resource = "mybatis-config.xml";
//        InputStream inputStream2 = Resources.getResourceAsStream(resource);
//        SqlSessionFactory sqlSessionFactory2 = new SqlSessionFactoryBuilder().build(inputStream2);
//        SqlSession sqlSession2 = sqlSessionFactory2.openSession();
//        ScoreMapper scoreMapper = sqlSession2.getMapper(ScoreMapper.class);
//        ScoreInfo scoreInfo = new ScoreInfo();
//
//        scoreInfo.setUid(22);
//        scoreInfo.setScore_snake(0);
//        scoreInfo.setScore_tetris(0);
//        scoreInfo.setScore_sweep(0);
//        scoreMapper.add(scoreInfo);
//        sqlSession2.commit();

//        String resource = "mybatis-config.xml";
//        InputStream inputStream = Resources.getResourceAsStream(resource);
//        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//
//        SqlSession sqlSession = sqlSessionFactory.openSession();
//        ScoreMapper scoreMapper = sqlSession.getMapper(ScoreMapper.class);
//        scoreMapper.updateSnakeScore(2, 8);
//        sqlSession.commit();
    }
}
