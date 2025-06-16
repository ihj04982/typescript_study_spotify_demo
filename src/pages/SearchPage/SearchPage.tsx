import { Card, Grid, ListItem, styled, Typography } from "@mui/material";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import useGetBrowseCategories from "../../hooks/useGetBrowseCategories";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const PAGE_LIMIT = 50;

const CategoryCard = styled(Card)(({ theme }) => ({
  borderRadius: 8,
  overflow: "hidden",
  aspectRatio: "16 / 9",
  width: "100%",
  minWidth: 140,
  position: "relative",
  boxSizing: "border-box",
  color: "#fff",
  boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.02)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  cursor: "pointer",
  padding: 16,
}));

const CategoryImage = styled("img")({
  objectFit: "cover",
  objectPosition: "center center",
  borderRadius: 4,
  bottom: 0,
  boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
  position: "absolute",
  width: "45%",
  right: 0,
  transform: "rotate(25deg) translate(18%,-2%)",
  zIndex: 1,
});

function getColorFromId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return "#" + (hash & 0x00ffffff).toString(16).padStart(6, "0");
}

const SearchPage = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetBrowseCategories({
    locale: "ko-KR",
    limit: PAGE_LIMIT,
    offset: 0,
  });

  const { ref, inView } = useInView();

  const allCategories = data?.pages ? data.pages.flatMap((page) => page.categories.items) : [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <div>
      <h1>Browse All</h1>
      <Grid container spacing={2}>
        {allCategories.map((category) => (
          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={category.id}>
            <ListItem disableGutters sx={{ padding: 0, display: "block" }}>
              <CategoryCard sx={{ backgroundColor: getColorFromId(category.id) }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    wordBreak: "keep-all",
                    zIndex: 2,
                  }}
                >
                  {category.name}
                </Typography>
                <CategoryImage src={category.icons[0]?.url} alt={category.name} />
              </CategoryCard>
            </ListItem>
          </Grid>
        ))}
      </Grid>
      <div ref={ref} style={{ height: 1 }} />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default SearchPage;
