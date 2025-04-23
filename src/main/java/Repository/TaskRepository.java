package Repository;
import Models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface TaskRepository extends JpaRepository<Task,Integer> {
    Task findByLibelle(String name);

    Task findByDate(Date date);

    Task findById(int id);

}
