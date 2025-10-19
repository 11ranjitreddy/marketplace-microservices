package com.Market.Payment.UserPayment;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="Payment")
public class PaymentTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String paymentId;
    private String orderId;
    private double amount;
    private String currency;
    private String method;
    private String status;
    private LocalDateTime timestamp=LocalDateTime.now();


    public PaymentTransaction(){}

    public PaymentTransaction(Long id,String orderId,double amount,String currency,String method,String status,LocalDateTime timestamp,String paymentId){
        this.id=id;
        this.orderId=orderId;
        this.amount=amount;
        this.currency=currency;
        this.method=method;
        this.status=status;
        this.timestamp=timestamp;
        this.paymentId=paymentId;

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }


}
