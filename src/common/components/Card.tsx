import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayButton from "./PlayButton";

interface ICardProps {
  name: string | undefined;
  artistName?: string | undefined;
  image: string | undefined;
}

const CardContainer = styled("div")(({ theme }) => ({
  minWidth: "160px",
  padding: "10px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.secondary,
    "& .play-button-wrapper": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const CardImage = styled("img")({
  width: "100%",
  position: "relative",
  borderRadius: "8px",
});

const PlayButtonWrapper = styled("div")({
  position: "absolute",
  bottom: "12px",
  right: "6px",
  opacity: 0,
  transform: "translateY(10px)",
  transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
});

const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const Card = ({ image, name, artistName }: ICardProps) => {
  return (
    <CardContainer>
      <div style={{ position: "relative" }}>
        <CardImage src={image} alt={name} />
        <PlayButtonWrapper className="play-button-wrapper">
          <PlayButton />
        </PlayButtonWrapper>
      </div>
      <EllipsisTypography fontSize="16px">{name || "Unknown Album"}</EllipsisTypography>
      <EllipsisTypography color="text.secondary">{artistName || "Unknown Artist"}</EllipsisTypography>
    </CardContainer>
  );
};

export default Card;
