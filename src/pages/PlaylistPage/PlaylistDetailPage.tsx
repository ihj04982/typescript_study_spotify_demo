import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { styled, Typography } from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";
import ErrorMessage from "../../common/components/ErrorMessage";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: id || "" });
  if (id === undefined) return <Navigate to="/" />;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const PlaylistDetailContainer = styled("div")(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "190px 1fr",
    gridTemplateRows: "200px",
    gap: "16px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      gap: "12px",
      gridTemplateColumns: "120px 1fr",
      gridTemplateRows: "120px",
    },
  }));

  const PlaylistImage = styled("img")({
    width: "100%",
    height: "100%",
    borderRadius: "4px",
    objectFit: "cover",
  });

  const PlaylistDetailInfo = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    justifyContent: "end",
  });

  const PlaylistTitle = styled(Typography)(({ theme }) => ({
    fontSize: "48px",
    fontWeight: "bold",
    lineHeight: 1.1,
    [theme.breakpoints.down("lg")]: {
      fontSize: "40px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "32px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "24px",
    },
  }));

  return (
    <PlaylistDetailContainer>
      {playlist?.images?.[0]?.url ? (
        <PlaylistImage src={playlist?.images?.[0]?.url} alt={playlist?.name} />
      ) : (
        <DefaultImage iconSize={64} />
      )}
      <PlaylistDetailInfo>
        <Typography>{playlist?.type}</Typography>
        <PlaylistTitle>{playlist?.name}</PlaylistTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={"https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"}
            style={{ width: "20px", height: "20px", borderRadius: "50%", objectFit: "cover" }}
            alt={"spotify-logo-image"}
          />
          <Typography fontWeight={500}>{playlist?.owner?.display_name}</Typography>
        </div>
      </PlaylistDetailInfo>
    </PlaylistDetailContainer>
  );
};

export default PlaylistDetailPage;
