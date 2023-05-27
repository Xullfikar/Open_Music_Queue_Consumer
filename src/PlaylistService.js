const { Pool } = require("pg");

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongFromPlaylist(playlistId) {
    const queryPlaylist = {
      text: "SELECT playlists.id, playlists.name FROM playlists WHERE playlists.id = $1",
      values: [playlistId],
    };

    const querySongs = {
      text: "SELECT s.id AS id, s.title AS title, s.performer AS performer FROM playlist_songs ps LEFT JOIN song s ON ps.song_id = s.id WHERE ps.playlist_id = $1",
      values: [playlistId],
    };

    const resultPlaylist = await this._pool.query(queryPlaylist);
    const resultSongs = await this._pool.query(querySongs);

    const result = {
      playlist: {
        id: resultPlaylist.rows[0].id,
        name: resultPlaylist.rows[0].name,
        songs: resultSongs.rows,
      },
    };
    return result;
  }
}

module.exports = PlaylistService;
