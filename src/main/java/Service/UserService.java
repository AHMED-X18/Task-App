package Service;
import Models.User;
import Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.jetbrains.annotations.*;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository UserRepository;

    public User createUser(@NotNull User user) {
        if (UserRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Nom d'utilisateur déja existant");
        }
        if (UserRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email déja existante");
        }
        user.setPassword(hashPassword(user.getPassword()));
        return UserRepository.save(user);
    }

    private @NotNull String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public User findByname (String name){
        return UserRepository.findByName(name);
    }

    public User findByEmail (String email){
        return UserRepository.findByEmail(email);
    }

    public List<User> findAll(){
        return UserRepository.findAll();
    }

    public User UpdateUser (User user, String username){
        User new_user = findByname(username);
        if (new_user==null){
            throw new RuntimeException("Utilisateur non trouvé");
        }
        new_user.setEmail(user.getEmail());
        new_user.setPassword(hashPassword(user.getPassword()));

        return UserRepository.save(new_user);
    }

    public void deleteUser(String identifiant) {
        if(findByname(identifiant)!=null || findByEmail(identifiant)!=null){
            User user = findByname(identifiant);
            UserRepository.delete(user);
        }
        else {
            throw new RuntimeException("Utilisateur non retrouvé");
        }
    }

}
