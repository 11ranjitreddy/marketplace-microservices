package com.Market.Payment.RepositoryPayment;

import com.Market.Payment.UserPayment.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentTransaction,Long> {
    Optional<PaymentTransaction> findByOrderId(String orderId);
}
