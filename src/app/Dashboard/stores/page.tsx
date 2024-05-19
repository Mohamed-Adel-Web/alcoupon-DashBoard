"use client";
import { Box } from "@mui/material";
import AddStoreModal from "./(storeComponents)/AddStoreModal";
import StoresList from "./(storeComponents)/storesList";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import useGetCategory from "src/customHooks/categoryHooks/useGetCategory";
import { categoryType } from "src/types/categoryTypes";
import { Toaster } from "react-hot-toast";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

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
    <PrimeReactProvider>
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
        <Toaster
          toastOptions={{
            position: "bottom-left",
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
              },
            },
          }}
        />
      </Box>
    </PrimeReactProvider>
  );
}
