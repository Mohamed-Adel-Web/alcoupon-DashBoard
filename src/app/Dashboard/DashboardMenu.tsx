import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import InventoryIcon from "@mui/icons-material/Inventory";
import logo from "../../../public/images/logo.png";
import ImageIcon from '@mui/icons-material/Image';
import Link from "next/link";
export const DashboardMenuData: { title: string; icon: React.ReactElement }[] =
  [
    { title: "stores", icon: <StoreIcon /> },
    { title: "Category", icon: <CategoryIcon /> },
    { title: "Coupons", icon: <BookOnlineIcon /> },
    { title: "products", icon: <InventoryIcon /> },
    { title: "swiper", icon: <ImageIcon /> },
  ];
const DashboardMenuList = DashboardMenuData.map((data, index) => {
  return (
    <Link
      href={`/Dashboard/${data.title}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItem disablePadding key={data.title}>
        <ListItemButton>
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText primary={data.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
});
export default function DashboardMenu({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
}) {
  return (
    <>
      <Box
        sx={{
          background: "#FFFFFF",
          height: "100%",
          minHeight: "100vh",
          padding: "1.2rem",
          overflow: "auto",
          transform: {
            xs: open ? "translateX(0)" : "translateX(-100%)",
            md: "translateX(0)",
          },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          border: "1px solid #9A328B",
          zIndex: "999",
          position: { xs: "fixed", md: "relative" },
          transition: "0.3s",
        }}
      >
        <Box
          className="menuClose"
          sx={{
            justifyContent: "flex-end",
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="menuHeader">
          <Image
            src={logo}
            width={200}
            style={{ width: "100%" }}
            height={80}
            alt="alcoupon dashboard image"
          />
        </Box>
        <Box className="menuBody">
          <List>
            <Link
              href={`/Dashboard`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding key={"Dashboard"}>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
            </Link>
            {DashboardMenuList}
          </List>
        </Box>
      </Box>
    </>
  );
}
