package social.adrielsan.gameawards.service;

import java.util.List;

import social.adrielsan.gameawards.domain.model.Game;

public interface GameService {
    List<Game> findAll();

    Game findById(Long id);

    void insert(Game game);

    void update(Long id, Game game);

    void delete(Long id);
}
