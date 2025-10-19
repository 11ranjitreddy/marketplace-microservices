package com.Market.CustomerService.Controller;

import com.Market.CustomerService.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class AuthenticationController {

    private final UserService userService;

    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> payload) {
        String emailOrMobile = payload.get("emailOrMobile");

        if (emailOrMobile == null || emailOrMobile.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email or Mobile is required"));
        }

        try {
            String result = userService.sendOtp(emailOrMobile);
            return ResponseEntity.ok(Map.of("message", result)); // always return JSON
        } catch (Exception e) {
            e.printStackTrace(); // log full error in backend
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to send OTP: " + e.getMessage()));
        }
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> payload) {
        String emailOrMobile = payload.get("emailOrMobile");
        String otp = payload.get("otp");

        if (emailOrMobile == null || emailOrMobile.isBlank() || otp == null || otp.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email/Mobile and OTP are required"));
        }

        try {
            boolean verified = userService.verifyOtp(emailOrMobile, otp);
            if (verified) {
                return ResponseEntity.ok(Map.of("message", "OTP Verified Successfully!", "user", emailOrMobile));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid or Expired OTP!"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to verify OTP: " + e.getMessage()));
        }
    }
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            var users = userService.getAllUsers(); // fetch list of users from DB
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Failed to fetch users"));
        }
    }



}