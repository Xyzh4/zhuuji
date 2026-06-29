
package com.xinjiang.culture.service;

import com.xinjiang.culture.entity.Ethnic;
import com.xinjiang.culture.repository.EthnicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EthnicService {

    @Autowired
    private EthnicRepository ethnicRepository;

    public List&lt;Ethnic&gt; getAllEthnics() {
        return ethnicRepository.findAll();
    }

    public Optional&lt;Ethnic&gt; getEthnicById(Integer id) {
        return ethnicRepository.findById(id);
    }

    public Optional&lt;Ethnic&gt; getEthnicByName(String name) {
        return ethnicRepository.findByName(name);
    }

    public Ethnic saveEthnic(Ethnic ethnic) {
        return ethnicRepository.save(ethnic);
    }

    public void deleteEthnic(Integer id) {
        ethnicRepository.deleteById(id);
    }
}

