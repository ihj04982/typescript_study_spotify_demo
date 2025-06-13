import { InputAdornment, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SearchType } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { useInView } from "react-intersection-observer";
import LoadMoreSection from "../../../common/components/LoadMoreSection";
import { Search } from "@mui/icons-material";

const SearchTextField = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-root": {
    backgroundColor: "#282828",
    borderRadius: "30px",
  },
  marginBottom: "10px",
});

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { ref, inView } = useInView();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: [
      SearchType.TRACK,
      SearchType.ALBUM,
      SearchType.ARTIST,
      SearchType.PLAYLIST,
      SearchType.SHOW,
      SearchType.EPISODE,
      SearchType.AUDIOBOOK,
    ],
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <Typography variant="h1" my="10px">
        Let's find something for your playlist
      </Typography>
      <SearchTextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "white" }}>
                <Search />
              </InputAdornment>
            ),
          },
        }}
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="What do you want to listen to?"
      />
      {isLoading && <LoadingSpinner />}
      {data?.pages.map((item, pageIndex) => {
        if (!item.tracks) return false;
        return <SearchResultList list={item.tracks?.items} pageIndex={pageIndex} keyword={keyword} />;
      })}
      <LoadMoreSection ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</LoadMoreSection>
    </div>
  );
};

export default EmptyPlaylistWithSearch;
