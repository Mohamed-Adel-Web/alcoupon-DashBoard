"use client";
import { Box, Button, Typography } from "@mui/material";
import AddStoreModal from "./(storeComponents)/AddStoreModal";
import AddIcon from "@mui/icons-material/Add";
import StoresList from "./(storeComponents)/storesList";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
export default function store() {
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
      <StoresList />
      <AddStoreModal
        open={openAddStore}
        handleAddStoreClose={handleAddStoreClose}
      />
    </Box>
  );
}
