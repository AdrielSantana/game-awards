package social.adrielsan.gameawards.controller.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import social.adrielsan.gameawards.controller.BaseRestController;
import social.adrielsan.gameawards.domain.model.Game;
import social.adrielsan.gameawards.service.GameService;

import java.util.List;

@CrossOrigin
@RestController
public class GameRestController extends BaseRestController {

    @Autowired
    private GameService businessLayer;

    @GetMapping("games")
    public ResponseEntity<List<Game>> findAll() {
        List<Game> games = businessLayer.findAll();
        return ResponseEntity.ok(games);
    }

    @GetMapping("games/{id}")
    public ResponseEntity<Game> findById(@PathVariable Long id) {
        Game game = businessLayer.findById(id);
        return ResponseEntity.ok(game);
    }

    @PostMapping("games")
    public ResponseEntity<Game> insert(@RequestBody Game game) {
        businessLayer.insert(game);
        return ResponseEntity.ok(game);
    }

    @PutMapping ("games/{id}")
    public ResponseEntity<Game> update(@PathVariable Long id, @RequestBody Game game) {
        businessLayer.update(id, game);
        return ResponseEntity.ok(game);
    }

    @PatchMapping ("games/{id}/vote")
    public ResponseEntity<Game> vote(@PathVariable Long id) {
        businessLayer.vote(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping ("games/{id}")
    public ResponseEntity<Game> insert(@PathVariable Long id) {
        businessLayer.delete(id);
        return ResponseEntity.ok().build();
    }
}
