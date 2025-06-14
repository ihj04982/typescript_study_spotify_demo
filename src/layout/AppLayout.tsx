import { NavLink, Outlet } from "react-router";
import { Box, Button, Card, styled, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./LibraryHead";
import Library from "./Library";
import Navbar from "./Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  width: "100%",
  boxSizing: "border-box",
  gap: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "20px",
  marginBottom: "8px",
  marginRight: "8px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
}));

const OutletContainer = styled("div")({
  flex: 1,
  minHeight: 0,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
});

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox height={"100%"}>
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
      <ContentBox>
        <Navbar />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;
