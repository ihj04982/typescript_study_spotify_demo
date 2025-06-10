import { ISimplifiedPlaylist } from "../models/playlist";
import PlaylistItem from "../common/components/PlaylistItem";
import { useNavigate } from "react-router";
import { useState } from "react";

interface PlaylistProps {
  playlists: ISimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    navigate(`/playlist/${id}`);
    setSelectedId(id);
  };

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
          handleClick={handleClick}
          selected={selectedId === item.id}
        />
      ))}
    </div>
  );
};

export default Playlist;
