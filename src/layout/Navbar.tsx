import { Box, InputAdornment, styled, TextField } from "@mui/material";
import LoginButton from "../common/components/LoginButton";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import UserProfile from "./UserProfile";
import { useLocation, useNavigate } from "react-router";
import { Search } from "@mui/icons-material";
import { useState } from "react";

const NavbarContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  height: "50px",
  gap: "10px",
});

const SearchTextField = styled(TextField)({
  width: "100%",
  maxWidth: "450px",
  "& .MuiInputBase-root": {
    backgroundColor: "#282828",
    borderRadius: "30px",
  },
  marginBottom: "10px",
});

const Navbar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data: userProfile } = useGetCurrentUserProfile();
  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search");
  const navigate = useNavigate();

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && keyword) {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <NavbarContainer>
      <Box flex={1} marginBottom={0}>
        {isSearchPage && (
          <SearchTextField
            sx={{ marginBottom: 0 }}
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
            onKeyDown={handleSearch}
            placeholder="What do you want to listen to?"
          />
        )}
      </Box>
      <Box flexShrink={0}>{userProfile ? <UserProfile userProfile={userProfile} /> : <LoginButton />}</Box>
    </NavbarContainer>
  );
};

export default Navbar;
