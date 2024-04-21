"use client";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const couponsTitles: string[] = [
  "name",
  "Category",
  "Code",
  "Feature",
  "status",
  "Action",
];
const couponsTitlesList = couponsTitles.map((title) => {
  return (
    <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});
const couponsData: {
  name: string;
  Feature: boolean;
  status: boolean;
  code: number;
  category: string;
}[] = [
  {
      name: "Alcoupon",
      Feature: true,
      status: true,
      code: 0,
      category: ""
  },
];
export default function CouponsList() {
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Grid
        spacing={2}
        container
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 0",
          margin: "1rem 0",
        }}
      >
        {couponsTitlesList}
      </Grid>
      <Grid
        spacing={2}
        container
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 0",
          color: "primary.main",
          margin: "1rem 0",
        }}
      >
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          Noon
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          Noon
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          3654
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          Active
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          Active
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon sx={{ color: "#d50000" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
