import { TableCell, TableRow, styled } from "@mui/material";
import { IPlaylistTrack } from "../../../models/playlist";
import { IEpisode, ITrack } from "../../../models/track";
import { formatDuration, formatDate } from "../../../utils/format";

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
  padding: "8px",
}));

const StyledImgCell = styled("img")({
  width: "48px",
  height: "48px",
  borderRadius: "4px",
});

const StyledNameCell = styled(TableCell)(({ theme }) => ({
  border: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

interface IDesktopPlaylistItemProps {
  item: IPlaylistTrack;
}

const DesktopPlaylistItem = ({ item }: IDesktopPlaylistItemProps) => {
  const isEpisode = (track: ITrack | IEpisode): track is IEpisode => {
    return "description" in track;
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        {isEpisode(item.track) ? (
          <StyledImgCell src={item.track.images[0].url} alt={item.track.name} width={40} height={40} />
        ) : (
          <StyledImgCell src={item.track.album?.images[0].url} alt={item.track.name} width={40} height={40} />
        )}
      </StyledTableCell>
      <StyledNameCell>{item.track.name || "Unknown"}</StyledNameCell>
      <StyledTableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name || "Unknown Album"}</StyledTableCell>
      <StyledTableCell>{item.added_at ? formatDate(item.added_at) : "Unknown"}</StyledTableCell>
      <StyledTableCell>{item.track.duration_ms ? formatDuration(item.track.duration_ms) : "—"}</StyledTableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
