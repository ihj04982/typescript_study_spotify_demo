import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { BottomNavigationAction, BottomNavigation, Box, styled, Typography, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./LibraryHead";
import Library from "./Library";
import Navbar from "./Navbar";
import { useState } from "react";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";

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

const SidebarContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: "20px",
  marginBottom: "8px",
  marginRight: "8px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
}));

const MainContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  flex: 1,
  padding: "20px",
  marginBottom: "8px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    marginBottom: 0,
    paddingBottom: "50px",
  },
}));

const OutletContainer = styled("div")({
  flex: 1,
  minHeight: 0,
  overflow: "auto",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
});

const MobileNavbar = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
}));

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
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Layout>
      <Sidebar>
        <SidebarContentBox>
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
        </SidebarContentBox>
        <SidebarContentBox height={"100%"}>
          <LibraryHead />
          <Library />
        </SidebarContentBox>
      </Sidebar>
      <MainContentBox>
        <Navbar />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </MainContentBox>
      <MobileNavbar>
        <BottomNavigation
          showLabels
          value={location.pathname.split("/")[1]}
          onChange={(e, newValue) => {
            navigate(`/${newValue}`);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value={""} />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} value={"search"} />
          <BottomNavigationAction label="Library" icon={<Bookmark />} value={"library"} />
        </BottomNavigation>
      </MobileNavbar>
    </Layout>
  );
};

export default AppLayout;
