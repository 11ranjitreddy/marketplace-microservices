package com.Market.Payment.ServicePayment;

import com.Market.Payment.RepositoryPayment.PaymentRepository;
import com.Market.Payment.UserPayment.PaymentTransaction;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    @Override
    public PaymentTransaction createPayment(String orderId, double amount, String method) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(key, secret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) (amount * 100)); // convert rupees to paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", orderId);
        orderRequest.put("payment_capture", 1);

        com.razorpay.Order razorOrder = client.orders.create(orderRequest);

        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setOrderId(orderId);
        transaction.setAmount(amount);
        transaction.setMethod(method);
        transaction.setStatus("CREATED");
        transaction.setCurrency("INR");
        transaction.setPaymentId(razorOrder.get("id"));

        return paymentRepository.save(transaction);
    }

    @Override
    public void updatePaymentStatus(String orderId, String status) {
        paymentRepository.findByOrderId(orderId).ifPresent(tx -> {
            tx.setStatus(status);
            paymentRepository.save(tx);
        });
    }
}
