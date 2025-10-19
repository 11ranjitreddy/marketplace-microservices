package com.Market.CustomerService.Service;

import com.Market.CustomerService.Model.Otp;
import com.Market.CustomerService.Model.User;
import com.Market.CustomerService.Repository.OtpRepository;
import com.Market.CustomerService.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class ServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final JavaMailSender mailSender;

    public ServiceImplementation(UserRepository userRepository,
                                 OtpRepository otpRepository,
                                 JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.mailSender = mailSender;
    }

    @Value("${twilio.account.sid}")
    private String twilioSid;

    @Value("${twilio.auth.token}")
    private String twilioAuthToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000)); // 6-digit OTP
    }

    @Override
    public String sendOtp(String emailOrMobile) {
        otpRepository.deleteByEmailOrMobile(emailOrMobile);
        String otpCode = generateOtp();

        Otp otp = new Otp();
        otp.setEmailOrMobile(emailOrMobile);
        otp.setOtpCode(otpCode);
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otp);

        if (emailOrMobile.contains("@")) {
            // Send OTP via email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(emailOrMobile);
            message.setSubject("Your OTP Code");
            message.setText("Your OTP is: " + otpCode + " (valid for 5 minutes)");
            try {
                mailSender.send(message);
                System.out.println("Email OTP sent successfully to "+emailOrMobile);
            }catch (Exception e){
                System.out.println("Failed to send email OTP (Network Issue).");
            }
        } else {
            // Send OTP via SMS
            String formattedNumber = formatPhoneNumber(emailOrMobile); // Format to E.164
            Twilio.init(twilioSid, twilioAuthToken);
            Message.creator(
                    new PhoneNumber(formattedNumber),
                    new PhoneNumber(twilioPhoneNumber),
                    "Your OTP is: " + otpCode + " (valid for 5 minutes)"
            ).create();
        }

        return "OTP sent successfully!";
    }


    private String formatPhoneNumber(String phone) {
        phone = phone.replaceAll("[^0-9]", ""); // Remove any non-digit characters
        if (phone.startsWith("0")) {
            phone = phone.substring(1); // Remove leading 0
        }
        if (!phone.startsWith("+")) {
            phone = "+91" + phone; // Add India country code by default
        }
        return phone;
    }


    @Override
    public boolean verifyOtp(String emailOrMobile, String otpCode) {
        return otpRepository.findByEmailOrMobile(emailOrMobile)
                .filter(o -> o.getOtpCode().equals(otpCode) &&
                        o.getExpiryTime().isAfter(LocalDateTime.now()))
                .map(o -> {
                    // Find user by email or mobile
                    otpRepository.delete(o);
                    userRepository.findByEmail(emailOrMobile)
                            .ifPresentOrElse(user -> {
                                        user.setVerified(true);
                                        userRepository.save(user);
                                    },
                                    () -> {
                                        userRepository.findByMobile(emailOrMobile)
                                                .ifPresentOrElse(user -> {
                                                            user.setVerified(true);
                                                            userRepository.save(user);
                                                        },
                                                        () -> {
                                                            // Create new user if not found
                                                            User newUser = new User();
                                                            if (emailOrMobile.contains("@")) {
                                                                newUser.setEmail(emailOrMobile);
                                                            } else {
                                                                newUser.setMobile(emailOrMobile);
                                                            }
                                                            newUser.setVerified(true);
                                                            userRepository.save(newUser);
                                                        });
                                    });

                    return true;
                })
                .orElse(false);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
