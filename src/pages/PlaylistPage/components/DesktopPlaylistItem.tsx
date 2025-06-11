import { TableCell, TableRow, styled } from "@mui/material";
import { IPlaylistTrack } from "../../../models/playlist";
import { IEpisode, ITrack } from "../../../models/track";

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  transition: "background-color 0.2s ease",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "none",
  color: theme.palette.text.secondary,
}));

const StyledNameCell = styled(TableCell)(({ theme }) => ({
  border: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

interface IDesktopPlaylistItemProps {
  item: IPlaylistTrack;
  index: number;
}

const DesktopPlaylistItem = ({ item, index }: IDesktopPlaylistItemProps) => {
  const isEpisode = (track: ITrack | IEpisode): track is IEpisode => {
    return "description" in track;
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{index}</StyledTableCell>
      <StyledNameCell>{item.track.name || "Unknown"}</StyledNameCell>
      <StyledTableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name || "Unknown Album"}</StyledTableCell>
      <StyledTableCell>{item.added_at ? formatDate(item.added_at) : "Unknown"}</StyledTableCell>
      <StyledTableCell>{item.track.duration_ms ? formatDuration(item.track.duration_ms) : "—"}</StyledTableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
