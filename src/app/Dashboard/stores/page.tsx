"use client";
import { Box } from "@mui/material";
import { Suspense } from "react";
import AddStoreModal from "./(storeComponents)/AddStoreModal";
import StoresList from "./(storeComponents)/storesList";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import useGetCategory from "src/customHooks/categoryHooks/useGetCategory";
import { categoryType } from "src/types/categoryTypes";
export default function store() {
  const { data } = useGetCategory();
  const categoryData: categoryType[] = data?.data.data;
  const [openAddStore, setOpenAddStore] = useState<boolean>(false);
  const handleAddStoreClose: () => void = () => {
    setOpenAddStore(false);
  };
  const handleAddStoreOpen: () => void = () => {
    setOpenAddStore(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading
        title="Stores"
        handleOpen={handleAddStoreOpen}
        buttonTitle="Add new store"
      />
      <StoresList categoryData={categoryData} />
      <AddStoreModal
        open={openAddStore}
        handleAddStoreClose={handleAddStoreClose}
        categoryData={categoryData}
      />
    </Box>
  );
}
