package com.Market.Payment.ServicePayment;

import com.Market.Payment.UserPayment.PaymentTransaction;
import com.razorpay.RazorpayException;

public interface PaymentService {
    PaymentTransaction createPayment(String orderId,double amount,String method) throws RazorpayException;
    void updatePaymentStatus(String orderId,String status);
}
