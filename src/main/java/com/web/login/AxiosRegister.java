package com.web.login;

import com.web.mapper.ScoreMapper;
import com.web.mapper.UserMapper;
import com.web.pojo.ScoreInfo;
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

@WebServlet(urlPatterns = "/register")
public class AxiosRegister extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
        System.out.println("regitser-post");
        String name = req.getParameter("name");
        String password = req.getParameter("password");
        String repassword = req.getParameter("repassword");
        System.out.println("register:" + name +','+ password+','+repassword);
//        resp.getWriter().write("login:" + name +','+ password);

        //Mybatis
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

        UserInfo user = userMapper.selectByName(name);
//        System.out.println(user);
        if (user == null){
            HttpSession session = req.getSession();
            UserInfo userInfo = new UserInfo();
            userInfo.setName(name);
            userInfo.setPassword(password);
            userMapper.add(userInfo);
            sqlSession.commit();

            UserInfo user2 = userMapper.selectByName(name);
            session.setAttribute("uid", user2.getUid());
            session.setAttribute("name", user2.getName());

            resp.getWriter().write("true");
        }
        else{
            resp.getWriter().write("false");
        }
        sqlSession.close();
    }
}
