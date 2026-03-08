package com.securefaculty.repository;

import com.securefaculty.model.FacultyProfile;
import com.securefaculty.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyProfileRepository extends JpaRepository<FacultyProfile, Long> {

    Optional<FacultyProfile> findByUser(User user);

    Optional<FacultyProfile> findByUserId(Long userId);

    boolean existsByUser(User user);
}
