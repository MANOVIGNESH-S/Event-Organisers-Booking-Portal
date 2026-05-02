package com.example.demo.controller;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository uRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        try {
            User user = userService.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());
            if (user != null) {
                return ResponseEntity.ok(user); 
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
    @PostMapping("/authenticate")
    public AuthResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        System.out.println(authRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            
        if (authentication.isAuthenticated()) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setUsername(authRequest.getUsername());
            authResponse.setToken(jwtService.generateToken(authRequest.getUsername()));
            // Fetch the user by name
            Optional<User> userOptional = uRepository.findByName(authRequest.getUsername());
            
            if (userOptional.isPresent()) {
                // If the user exists, set the role from the user entity
                User user = userOptional.get();
                authResponse.setRole(user.getRole());
                authResponse.setEmail(user.getEmail());
            } else {
                // If the user does not exist, set the role to "Organizer"
                authResponse.setRole("Organiser");
            }
            return authResponse;
        } else {
            System.out.println(authentication.isAuthenticated());
            throw new UsernameNotFoundException("invalid user request !");
        }

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        try {
            userService.registerUser(newUser);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
