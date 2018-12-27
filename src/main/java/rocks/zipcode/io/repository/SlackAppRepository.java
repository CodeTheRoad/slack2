package rocks.zipcode.io.repository;

import rocks.zipcode.io.domain.SlackApp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SlackApp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlackAppRepository extends JpaRepository<SlackApp, Long> {

}
