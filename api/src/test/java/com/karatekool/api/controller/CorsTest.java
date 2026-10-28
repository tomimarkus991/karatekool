package com.karatekool.api.controller;

import com.karatekool.api.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** The site calls the API from another origin, so browsers must be told it may. */
class CorsTest extends IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void theSite_mayCallTheApiWithAToken() throws Exception {
        mockMvc.perform(options("/me")
                        .header("Origin", "http://localhost:3000")
                        .header("Access-Control-Request-Method", "PATCH")
                        .header("Access-Control-Request-Headers", "authorization,content-type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"));
    }

    @Test
    void otherOrigins_areNotAllowed() throws Exception {
        mockMvc.perform(options("/me")
                        .header("Origin", "https://evil.example.com")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isForbidden());
    }
}
