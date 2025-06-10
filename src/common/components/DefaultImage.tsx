import { MusicNote } from "@mui/icons-material";
import { Box, styled } from "@mui/material";

interface DefaultImageProps {
  iconSize?: number;
}

const DefaultImage = ({ iconSize = 24 }: DefaultImageProps) => {
  const DefaultImageContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828",
    color: theme.palette.text.secondary,
    borderRadius: "4px",
  }));

  return (
    <DefaultImageContainer>
      <MusicNote style={{ fontSize: `${iconSize}px` }} />
    </DefaultImageContainer>
  );
};

export default DefaultImage;
