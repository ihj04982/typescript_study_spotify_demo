import { useRef } from "react";
import { Box, Typography, styled, IconButton, alpha } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";

const ListContainer = styled("div")({
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    "& .next-button, & .prev-button": {
      opacity: 1,
    },
  },
});

const CarouselBox = styled(Box)({
  display: "flex",
  overflowX: "auto",
  scrollBehavior: "smooth",
  width: "100%",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
});

const ActionButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  zIndex: 1000,
  color: "white",
  backgroundColor: theme.palette.background.paper,
  top: "32%",
  minWidth: 0,
  width: 40,
  height: 40,
  borderRadius: "50%",
  opacity: 0,
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
  },
}));

interface SearchCarouselProps {
  queryParams: any;
  title: string;
  emptyMessage: string;
  getItems: (page: any) => any[];
  itemToCard: (item: any) => React.ReactNode;
}

const SearchCarousel = ({ queryParams, title, emptyMessage, getItems, itemToCard }: SearchCarouselProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const query = useSearchItemsByKeyword(queryParams);
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const allItems = data ? data.pages.flatMap(getItems) : [];

  const handleNext = async () => {
    if (!listRef.current) return;
    const scrollAmount = listRef.current.offsetWidth;
    const scrollRightEdge = listRef.current.scrollLeft + scrollAmount * 2;
    const contentRightEdge = listRef.current.scrollWidth;
    if (hasNextPage && !isFetchingNextPage && contentRightEdge < scrollRightEdge + 10) {
      await fetchNextPage();
    }
    listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (!listRef.current) return;
    const scrollAmount = listRef.current.offsetWidth;
    listRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message || "Something went wrong"} />;

  return (
    <>
      <Typography variant="h1" paddingTop={"8px"}>
        {title}
      </Typography>
      {allItems.length === 0 ? (
        <Typography variant="h2">{emptyMessage}</Typography>
      ) : (
        <ListContainer>
          <ActionButton className="prev-button" onClick={handlePrev} sx={{ left: 0 }}>
            <NavigateBefore />
          </ActionButton>
          <ActionButton className="next-button" onClick={handleNext} sx={{ right: 0 }}>
            <NavigateNext />
          </ActionButton>
          <CarouselBox ref={listRef}>{allItems.map(itemToCard)}</CarouselBox>
        </ListContainer>
      )}
    </>
  );
};

export default SearchCarousel;
