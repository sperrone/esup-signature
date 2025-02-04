package org.esupportail.esupsignature.repository.ldap;

import org.esupportail.esupsignature.service.ldap.PersonLdapLight;
import org.springframework.data.ldap.repository.LdapRepository;
import org.springframework.data.ldap.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonLdapLightRepository extends LdapRepository<PersonLdapLight> {

    @Query(value = "(|(cn={0}*)(sn={0}*)(mail={0}*))", countLimit = 9)
    List<PersonLdapLight> fullTextSearch(String searchText);
}

