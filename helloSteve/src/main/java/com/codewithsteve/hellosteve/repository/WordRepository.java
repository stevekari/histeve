package com.codewithsteve.hellosteve.repository;

import com.codewithsteve.hellosteve.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WordRepository extends JpaRepository<Word, Long> {

    @Override
    Optional<Word> findById(Long aLong);
}
