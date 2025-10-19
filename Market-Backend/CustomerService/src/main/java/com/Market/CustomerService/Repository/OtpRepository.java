package com.Market.CustomerService.Repository;

import com.Market.CustomerService.Model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    @Query("SELECT o FROM Otp o WHERE o.emailOrMobile = :value")
    Optional<Otp> findByEmailOrMobile(@Param("value") String value);

    @Modifying
    @Transactional
    @Query("DELETE FROM Otp o WHERE o.emailOrMobile= :value")
    void deleteByEmailOrMobile(@Param("value") String value);


}
