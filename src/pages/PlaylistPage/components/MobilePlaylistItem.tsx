import { styled, TableCell, TableRow, Typography } from "@mui/material";
import { formatDuration } from "../../../utils/format";
import { IPlaylistTrack } from "../../../models/playlist";
import { IEpisode, ITrack } from "../../../models/track";

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
  padding: "4px",
}));

const StyledImage = styled("img")({
  maxWidth: "48px",
  maxHeight: "48px",
  borderRadius: "4px",
});

const StyledName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

interface IMobilePlaylistItemProps {
  item: IPlaylistTrack;
}
const MobilePlaylistItem = ({ item }: IMobilePlaylistItemProps) => {
  const isEpisode = (track: ITrack | IEpisode): track is IEpisode => {
    return "description" in track;
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        {isEpisode(item.track) ? (
          <StyledImage src={item.track.images[0].url} alt={item.track.name} width={40} height={40} />
        ) : (
          <StyledImage src={item.track.album?.images[0].url} alt={item.track.name} width={40} height={40} />
        )}
      </StyledTableCell>
      <StyledTableCell>
        <StyledName>{item.track.name || "Unknown"}</StyledName>
      </StyledTableCell>
      <StyledTableCell>{item.track.duration_ms ? formatDuration(item.track.duration_ms) : "—"}</StyledTableCell>
    </StyledTableRow>
  );
};

export default MobilePlaylistItem;
