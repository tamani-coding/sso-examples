package com.example.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class HelloController {

    @PreAuthorize("customPerm( #customer )")
    @GetMapping(path = "/hello/{customer}")
    public String hello (@RequestHeader("authorization") String authorization, @PathVariable String customer) {
        System.out.println(customer);
        System.out.println(authorization);
        return "{ \"message\": \"hello\" }";
    }
}
