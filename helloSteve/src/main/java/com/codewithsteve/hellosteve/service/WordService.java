package com.codewithsteve.hellosteve.service;

import com.codewithsteve.hellosteve.model.Word;
import com.codewithsteve.hellosteve.repository.WordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordService {

    private final WordRepository repository;

    public WordService(WordRepository repository) {
        this.repository = repository;
    }


    public List<Word> getAllWord(){
        return repository.findAll();
    }

    public Word createWord (Word word){
        return  repository.save(word);
    }




}
