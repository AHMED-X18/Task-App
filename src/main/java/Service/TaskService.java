package Service;
import Models.Task;
import Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.jetbrains.annotations.*;
import java.util.Date;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository TaskRepository;

    public Task createTask(@NotNull Task task) {
        if (TaskRepository.existsById(task.getId())) {
            throw new RuntimeException("Tache déja existante");
        }
        return TaskRepository.save(task);
    }

    public Task findByLibelle (String libelle){
        return TaskRepository.findByLibelle(libelle);
    }

    public Task findByDate(Date date){
        return TaskRepository.findByDate(date);
    }

    public List<Task> findAll(){
        return TaskRepository.findAll();
    }

    public Task UpdateTask (Task task){
        Task new_task = findById(task.getId());
        if (new_task==null){
            throw new RuntimeException("Tache non trouvée");
        }
        new_task.setDate(task.getDate());
        new_task.setEtiquette(task.getEtiquette());
        new_task.setHeure(task.getHeure());
        new_task.setLibelle(task.getLibelle());
        new_task.setPriorite(task.getPriorite());
        new_task.setRappel(task.getRappel());
        new_task.setStatut(task.getStatut());

        return TaskRepository.save(task);
    }

    public Task findById(int id) {
        return TaskRepository.findById(id);
    }

    public void deleteTask(int id) {
        if(findById(id)!=null){
            Task task = findById(id);
            TaskRepository.delete(task);
        }
        else {
            throw new RuntimeException("Tache non retrouvée");
        }
    }

}
