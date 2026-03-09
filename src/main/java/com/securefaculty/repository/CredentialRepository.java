package com.securefaculty.repository;

import com.securefaculty.model.Credential;
import com.securefaculty.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CredentialRepository extends JpaRepository<Credential, Long> {

    List<Credential> findByFaculty(User faculty);

    List<Credential> findByFacultyId(Long facultyId);

    List<Credential> findByStatus(Credential.CredentialStatus status);

    Optional<Credential> findByCredentialUid(String credentialUid);
}
