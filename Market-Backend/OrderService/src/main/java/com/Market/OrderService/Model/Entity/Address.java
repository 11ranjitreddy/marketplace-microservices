package com.Market.OrderService.Model.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String addressLine;
    private String city;
    private String zipCode;


    public Address(){}

    public Address(Long id,String addressLine,String city,String zipCode){
        this.id=id;
        this.addressLine=addressLine;
        this.city=city;
        this.zipCode=zipCode;
    }

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getAddressLine(){return addressLine;}
    public void setAddressLine(String addressLine){this.addressLine=addressLine;}

    public String getCity(){return city;}
    public void  setCity(String city){this.city=city;}

    public String getZipCode(){return zipCode;}
    public void setZipCode(String zipCode){this.zipCode=zipCode;}
}
