import { Box, Button, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import useCreatePlaylist from "../hooks/useCreatePlaylist";
import { idText } from "typescript";

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  justifyContent: "space-between",
});

const LibraryTitleBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const LibraryAddButton = styled(Button)({});

const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();

  const handleCreatePlaylist = () => {
    console.log("createPlaylist");
    createPlaylist({ name: "내 플레이리스트" });
  };

  return (
    <Head>
      <LibraryTitleBox>
        <BookmarkIcon />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </LibraryTitleBox>
      <LibraryAddButton color="primary" size="large" onClick={handleCreatePlaylist}>
        <AddIcon />
      </LibraryAddButton>
    </Head>
  );
};

export default LibraryHead;
