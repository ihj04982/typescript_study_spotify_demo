import { Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from "@mui/material";
import { PAGE_LIMIT } from "../../../configs/commonConfig";
import DesktopPlaylistItem from "./DesktopPlaylistItem";
import { InfiniteData } from "@tanstack/react-query";
import { TGetPlaylistItemsResponse } from "../../../models/playlist";

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  border: "none",
  padding: "8px 16px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "12px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface PlaylistDetailTableProps {
  playlistItems: InfiniteData<TGetPlaylistItemsResponse, unknown> | undefined;
}

const PlaylistDetailTable = ({ playlistItems }: PlaylistDetailTableProps) => {
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <StyledHeaderCell>#</StyledHeaderCell>
          <StyledHeaderCell>Title</StyledHeaderCell>
          <StyledHeaderCell>Album</StyledHeaderCell>
          <StyledHeaderCell>Date Added</StyledHeaderCell>
          <StyledHeaderCell>Duration</StyledHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {playlistItems?.pages.map((page, pageIndex) =>
          page.items.map((item, itemIndex) => (
            <DesktopPlaylistItem
              key={pageIndex * PAGE_LIMIT + itemIndex + 1}
              index={pageIndex * PAGE_LIMIT + itemIndex + 1}
              item={item}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default PlaylistDetailTable;
