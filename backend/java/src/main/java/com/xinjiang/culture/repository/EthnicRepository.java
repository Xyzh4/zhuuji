
package com.xinjiang.culture.repository;

import com.xinjiang.culture.entity.Ethnic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EthnicRepository extends JpaRepository<Ethnic, Integer> {
    Optional<Ethnic> findByName(String name);
}