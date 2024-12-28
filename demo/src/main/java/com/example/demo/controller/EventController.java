package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")  // Allows cross-origin requests from any domain
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000/")  // Allows cross-origin requests from any domain
    public List<Event> getAllEvents() {
        System.out.println("Testing the endpoint");
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*")  // Allows cross-origin requests from any domain
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @CrossOrigin(origins = "*")  // Allows cross-origin requests from any domain
    public Event createEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*")  // Allows cross-origin requests from any domain
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody Event eventDetails) {
        return eventService.getEventById(id)
                .map(existingEvent -> {
                    existingEvent.setName(eventDetails.getName());
                    existingEvent.setLocation(eventDetails.getLocation());
                    existingEvent.setRating(eventDetails.getRating());
                    existingEvent.setReviewCount(eventDetails.getReviewCount());
                    existingEvent.setImage(eventDetails.getImage());
                    existingEvent.setAmenities(eventDetails.getAmenities());
                    existingEvent.setDescription(eventDetails.getDescription());
                    existingEvent.setRecentReview(eventDetails.getRecentReview());
                    existingEvent.setBasePrice(eventDetails.getBasePrice());
                    existingEvent.setEmail(eventDetails.getEmail());
                    existingEvent.setPhone(eventDetails.getPhone());
                    return ResponseEntity.ok(eventService.saveEvent(existingEvent));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*")  // Allows cross-origin requests from any domain
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(event -> {
                    eventService.deleteEvent(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
