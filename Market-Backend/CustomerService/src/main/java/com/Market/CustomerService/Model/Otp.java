package com.Market.CustomerService.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp")
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String otpCode;
    @Column(name = "email_or_mobile")
    private String emailOrMobile;
    private LocalDateTime expiryTime;

    // Default constructor
    public Otp() {
    }

    // All-args constructor
    public Otp(Long id, String otpCode, String emailOrMobile, LocalDateTime expiryTime) {
        this.id = id;
        this.otpCode = otpCode;
        this.emailOrMobile = emailOrMobile;
        this.expiryTime = expiryTime;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public String getEmailOrMobile() {
        return emailOrMobile;
    }

    public void setEmailOrMobile(String emailOrMobile) {
        this.emailOrMobile = emailOrMobile;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }

    // toString()
    @Override
    public String toString() {
        return "Otp{" +
                "id=" + id +
                ", otpCode='" + otpCode + '\'' +
                ", emailOrMobile='" + emailOrMobile + '\'' +
                ", expiryTime=" + expiryTime +
                '}';
    }
}
