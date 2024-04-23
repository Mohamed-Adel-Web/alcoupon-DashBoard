"use client";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import AddCategoryModal from "./(categoryComponents)/AddCategoryModal";
import CouponsList from "./(categoryComponents)/CategoryList";
export default function CategoryPage() {
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const handleAddCategoryClose: () => void = () => {
    setOpenAddCategory(false);
  };
  const handleAddCategoryOpen: () => void = () => {
    setOpenAddCategory(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading
        title="Category"
        handleOpen={handleAddCategoryOpen}
        buttonTitle="Add new category"
      />
      <CouponsList />
      <AddCategoryModal
        open={openAddCategory}
        handleAddCategoryClose={handleAddCategoryClose}
      />
    </Box>
  );
}
