package com.Market.Payment.ControllerPayment;

import com.Market.Payment.ServicePayment.PaymentService;
import com.Market.Payment.UserPayment.PaymentTransaction;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<PaymentTransaction> createPayment(@RequestParam String orderId,
                                                            @RequestParam double amount,
                                                            @RequestParam String method) throws RazorpayException {
        PaymentTransaction tx = paymentService.createPayment(orderId, amount, method);
        return ResponseEntity.ok(tx);
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody Map<String,Object> payload) {
        // Razorpay sends payment info here
        String orderId = (String) payload.get("order_id");
        String status = (String) payload.get("status"); // success/failed
        paymentService.updatePaymentStatus(orderId, status);
        return ResponseEntity.ok("Webhook received");
    }
}

