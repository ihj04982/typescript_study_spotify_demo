import { Menu, MenuItem } from "@mui/material";
import React from "react";

interface ProfileMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  logout: () => void;
}

const ProfileMenu = ({ anchorEl, open, onClose, logout }: ProfileMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={logout} style={{ fontSize: 13 }}>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
