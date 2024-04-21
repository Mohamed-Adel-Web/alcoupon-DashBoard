"use client";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import CouponsList from "./(couponsComponents)/CouponsList";
export default function CouponsPage() {
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
        title="Coupons"
        handleOpen={handleAddStoreOpen}
        buttonTitle="Add new coupon"
      />
    <CouponsList />
    </Box>
  );
}
