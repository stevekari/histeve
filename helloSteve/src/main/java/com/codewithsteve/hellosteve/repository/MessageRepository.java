package com.codewithsteve.hellosteve.repository;

import com.codewithsteve.hellosteve.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository  extends JpaRepository<Message, Long> {
}
