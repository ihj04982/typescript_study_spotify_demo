import { ISimplifiedPlaylist } from "../models/playlist";
import PlaylistItem from "../common/components/PlaylistItem";

interface PlaylistProps {
  playlists: ISimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  return (
    <div>
      {playlists.map((item) => (
        <PlaylistItem
          key={item.id}
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ""}
          type={item.type || ""}
          ownerName={item.owner?.display_name || ""}
          handleClick={() => {}}
        />
      ))}
    </div>
  );
};

export default Playlist;
