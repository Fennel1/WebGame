package com.web.login;

import com.web.mapper.UserMapper;
import com.web.pojo.UserInfo;
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

@WebServlet(urlPatterns = "/login")
public class AxiosLogin extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("login-post");
        String name = req.getParameter("name");
        String password = req.getParameter("password");
        System.out.println("login:" + name +','+ password);
//        resp.getWriter().write("login:" + name +','+ password);

        //Mybatis
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        UserInfo user = userMapper.selectByName(name);

        HttpSession session = req.getSession();
        System.out.println(user);
        if (user != null && password.equals(user.getPassword())){   //成功登录
            session.setAttribute("uid", user.getUid());
            session.setAttribute("name", user.getName());

            resp.getWriter().write("true");
        }
        else{   //登录失败
            resp.getWriter().write("false");
        }

        sqlSession.close();
    }
}
