package com.codewithsteve.hellosteve.service;

import com.codewithsteve.hellosteve.model.Message;
import com.codewithsteve.hellosteve.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    
    private MessageRepository repository;

    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }
    
    public List<Message> getAllMessage(){
        return  repository.findAll();
    }

    public  Message createMessage(Message message){
       return repository.save(message);
    }

    public Optional<Message> getByIdMessage(long id){
        return  repository.findById(id);
    }

    public Optional<Message> updateMessage(Long id, Message message) {
        return repository.findById(id)
                .map(existingMessage -> {
                    existingMessage.setText(message.getText());
                    return repository.save(existingMessage);
                });
    }

    public void  deleteMessage(Long id){
       repository.deleteById(id);
    }
}
