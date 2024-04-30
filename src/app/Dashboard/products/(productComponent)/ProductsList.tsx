"use client";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import { categoryType } from "src/types/categoryTypes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import useGetProduct from "src/customHooks/productHooks/useGetHooks";
import { ReceivedProductType } from "src/types/productTypes";

const productsTitles: string[] = ["title", "store name", "image", "Action"];
const categoryTitlesList = productsTitles.map((title) => {
  return (
    <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});

export default function ProductsList() {
  const { data } = useGetProduct();
  const productData: ReceivedProductType[] = data?.data.data;

  const productList = productData?.map((product) => {
    return (
      <Grid
        spacing={2}
        container
        key={product.id}
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
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          {product.title_en}
        </Grid>
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          {product.store_name_en}
        </Grid>
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`${product.image}`}
            width={100}
            height={50}
            alt="product image"
          />{" "}
        </Grid>
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => {}}>
              <EditIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => {}}>
              <DeleteIcon sx={{ color: "#d50000" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  });
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
        {categoryTitlesList}
      </Grid>
      {productList}
    </Box>
  );
}
{
  /* {categoryList}
      <UpdateCategoryModal
        category={category}
        open={openUpdateCategory}
        handleUpdateCategoryClose={handleUpdateCategoryClose}
      />
      <DeleteCategoryModal
        category={category}
        open={openDeleteCategory}
        handleDeleteCategoryClose={handleDeleteCategoryClose} */
}
{
  /* /> */
}
