package com.codewithsteve.hellosteve.controller;

import com.codewithsteve.hellosteve.model.Message;
import com.codewithsteve.hellosteve.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages") // Best practice: use RESTful path mapping
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    @RequestMapping("/")
    public String home(){
        return "Hello Stephen + el";
    }

    // GET /api/messages - Fetch all
    @GetMapping
    public List<Message> getAllMessage() {
        return service.getAllMessage();
    }

    // POST /api/messages - Pass the JSON object representing the Message
    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        return service.createMessage(message);
    }

    // GET /api/messages/{id} - Fetch single message or 404 if not found
    @GetMapping("/{id}")
    public ResponseEntity<Message> getByIdMessage(@PathVariable long id) {
        return service.getByIdMessage(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /api/messages/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable long id, @RequestBody Message message) {
        return service.updateMessage(id, message)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/messages/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable long id) {
        service.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }


}