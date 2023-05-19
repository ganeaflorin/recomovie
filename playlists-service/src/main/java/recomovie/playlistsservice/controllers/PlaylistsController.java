package recomovie.playlistsservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import recomovie.playlistsservice.request.PlaylistId;
import recomovie.playlistsservice.request.PlaylistRequest;
import recomovie.playlistsservice.services.PlaylistService;

@RestController
@RequestMapping("/playlists")
@AllArgsConstructor
public class PlaylistsController {
    private PlaylistService playlistService;

    @RequestMapping("/save")
    @PostMapping
    public ResponseEntity savePlaylist(@RequestBody PlaylistRequest playlist) {
        return playlistService.savePlaylist(playlist);
    }

    @RequestMapping("/userPlaylists")
    @GetMapping
    public ResponseEntity getUserPlaylists(@RequestParam Long userId) {
        return playlistService.getUserPlaylists(userId);
    }

    @GetMapping
    public ResponseEntity getPlaylist(@RequestParam Long playlistId) {
        return playlistService.getPlaylistById(playlistId);

    }

    @DeleteMapping
    public ResponseEntity deletePlaylist(@RequestBody PlaylistId playlistId) {
        System.out.println("BAAAAAAA\n\n\nAAAA:" + playlistId.getPlaylistId());
        return playlistService.deletePlaylist(playlistId.getPlaylistId());
    }

}
