"use client";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import { categoryType } from "src/types/categoryTypes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const couponsTitles: string[] = ["category name", "Action"];
const couponsTitlesList = couponsTitles.map((title) => {
  return (
    <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});
const categoryData: [{ category: string }] = [
  {
    category: "Beauty",
  },
];
const categoryList = categoryData.map((category) => {
  return (
    <Grid
      spacing={2}
      container
      key={category.category}
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
      <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
        {category.category}
      </Grid>
      <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
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
  );
});
export default function CategoryList() {
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
      {categoryList}
    </Box>
  );
}
