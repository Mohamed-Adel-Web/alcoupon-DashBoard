"use client";
import { Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import useGetSwiper from "src/customHooks/swiperHooks/useGetSwiper";
import {  receivedSwiper } from "src/types/swiperTypes";
import UpdateSwiperModal from "./UpdateSwiperModal";
import DeleteSwiperModal from "./DeleteSwiperModal";
const swiperTitles: string[] = ["image", "Action"];
const swiperTitlesList = swiperTitles.map((title) => {
  return (
    <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});

export default function CategoryList() {
  const { data, isPending } = useGetSwiper();
  const swiperData: receivedSwiper[] = data?.data.data;

  const [swiper, setSwiper] = useState<receivedSwiper | undefined>();
  const [openUpdateSwiper, setOpenUpdateSwiper] = useState<boolean>(false);

  const handleUpdateSwiperClose: () => void = () => {
    setOpenUpdateSwiper(false);
  };
  const handleUpdateSwiperOpen: () => void = () => {
    setOpenUpdateSwiper(true);
  };
  const [openDeleteSwiper, setOpenDeleteSwiper] = useState<boolean>(false);
  const handleDeleteSwiperClose: () => void = () => {
    setOpenDeleteSwiper(false);
  };
  const handleDeleteSwiperOpen: () => void = () => {
    setOpenDeleteSwiper(true);
  };
  const swiperList = swiperData?.map((swiper, index) => {
    return (
      <Grid
        spacing={2}
        container
        key={index}
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
          <img
            src={`${swiper.images.images}`}
            width={100}
            height={50}
            alt="swiper image"
          />
        </Grid>
        <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setSwiper(swiper);
                handleUpdateSwiperOpen();
              }}
            >
              <EditIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setSwiper(swiper);
                handleDeleteSwiperOpen();
              }}
            >
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
        {swiperTitlesList}
      </Grid>
      {isPending ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        swiperList
      )}
      <UpdateSwiperModal
        swiper={swiper}
        open={openUpdateSwiper}
        handleUpdateSwiperClose={handleUpdateSwiperClose}
      />
      <DeleteSwiperModal
        swiper={swiper}
        open={openDeleteSwiper}
        handleDeleteSwiperClose={handleDeleteSwiperClose}
      />
    </Box>
  );
}
