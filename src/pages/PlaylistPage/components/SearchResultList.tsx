import { IconButton, ListItemText, styled, Typography } from "@mui/material";
import { PAGE_LIMIT } from "../../../configs/commonConfig";
import { ITrack } from "../../../models/track";
import DefaultImage from "../../../common/components/DefaultImage";
import { AddCircleOutline, MoreHoriz } from "@mui/icons-material";
import useAddItemsToPlaylist from "../../../hooks/useAddItemsToPlaylist";

interface ISearchResultListProps {
  playlistId: string;
  list: ITrack[];
  pageIndex: number;
  keyword: string;
}

const SearchResultContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  justifyContent: "space-between",
  padding: "4px 8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const SearchResultList = ({ playlistId, list, pageIndex, keyword }: ISearchResultListProps) => {
  const { mutate: addItemsToPlaylist } = useAddItemsToPlaylist();

  const handleAddItemsToPlaylist = (item: ITrack) => {
    if (item.uri) {
      addItemsToPlaylist({
        playlist_id: playlistId,
        params: {
          uris: [item.uri],
          position: 0,
        },
      });
    }
  };

  return (
    <div>
      {list.length === 0 && <Typography variant="body1">No results found for {keyword}</Typography>}
      {list.map((item, itemIndex) => (
        <SearchResultContainer key={pageIndex * PAGE_LIMIT + itemIndex + 1}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {item.album?.images?.[0]?.url ? (
              <img src={item.album?.images?.[0]?.url} alt={item.album?.name} width={40} height={40} />
            ) : (
              <DefaultImage />
            )}
            <ListItemText
              primary={
                <Typography variant="h2" fontWeight={400} color="text.primary">
                  {item.name}
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.secondary">
                  {item.artists?.[0]?.name || "Unknown"}
                </Typography>
              }
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <ActionIconButton size="small">
              <MoreHoriz />
            </ActionIconButton>
            <ActionIconButton size="small" onClick={() => handleAddItemsToPlaylist(item)}>
              <AddCircleOutline />
            </ActionIconButton>
          </div>
        </SearchResultContainer>
      ))}
    </div>
  );
};

export default SearchResultList;
