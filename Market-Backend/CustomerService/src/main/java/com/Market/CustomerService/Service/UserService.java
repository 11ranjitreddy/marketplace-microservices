package com.Market.CustomerService.Service;

import com.Market.CustomerService.Model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    String sendOtp(String emailOrMobile) throws Exception;
    boolean verifyOtp(String emailOrMobile, String otp) throws Exception;
    List<User> getAllUsers();
}