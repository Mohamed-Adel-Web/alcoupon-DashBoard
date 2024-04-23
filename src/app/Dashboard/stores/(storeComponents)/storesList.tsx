"use client";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { ReceivedStoreType } from "src/types/storeTypes";
import UpdatedStoreModal from "./UpdateStoreModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const storesTitles: string[] = ["name", "image", "Feature", "status", "Action"];
const storesTitlesList = storesTitles.map((title) => {
  return (
    <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});
const storesData: ReceivedStoreType[] = [
  {
    id: 1,
    name_ar: "قلم رصاص أساسي",
    name_en: "Noon",
    image:
      "https://d318j52nj6xnxf.cloudfront.net/sites/all/themes/alcoupon/svg/logo-inverse.svg",
    featured: true,
    status: true,
    Link_en: "http://example.com/basic-pencil",
    Link_ar: "http://example.com/ar/basic-pencil",
    description_ar: "قلم رصاص مثالي لجميع احتياجاتك الكتابية.",
    description_en: "A perfect pencil for all your writing needs.",
    category: "Stationery",
    meta_title_ar: "قلم رصاص للبيع",
    meta_title_en: "Pencil for Sale",
    meta_description_en:
      "Buy our Basic Pencil, ideal for writing and sketching.",
    meta_description_ar: "اشتر قلمنا الرصاص الأساسي، المثالي للكتابة والرسم.",
    meta_keyword_ar: "قلم، رصاص، كتابة، رسم",
    meta_keyword_en: "pencil, writing, sketching",
  },
];

export default function StoresList() {
  const getSingleData = async () => {
    return axios.get("http://192.168.1.19/api/stores/1", {
      headers: {
        Authorization:
          "Bearer 4|mjwoY0Rwg7wGheS3yWbM1NaWaJgKgDN4YfhnQvVA480a70e0",
      },
    });
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSingleData,
    enabled: false,
  });

  const [store, setStore] = useState<ReceivedStoreType>({
    id: 0,
    name_ar: "",
    name_en: "",
    image: "",
    featured: false,
    status: false,
    Link_en: "",
    Link_ar: "",
    description_ar: "",
    description_en: "",
    category: "",
    meta_title_ar: "",
    meta_title_en: "",
    meta_description_en: "",
    meta_description_ar: "",
    meta_keyword_ar: "",
    meta_keyword_en: "",
  });
  const [openUpdateStore, setOpenUpdateStore] = useState<boolean>(false);
  const handleUpdateStoreClose: () => void = () => {
    setOpenUpdateStore(false);
  };
  const handleUpdateStoreOpen: () => void = () => {
    setOpenUpdateStore(true);
  };
  const storesList = storesData.map((store) => {
    return (
      <Grid
        key={store.id}
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
          {store.name_en}
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={`${store.image[0]}`}
            width={100}
            height={50}
            alt="store image"
          />
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {store.featured ? "Active" : "inactive"}
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {store.status ? "Active" : "inactive"}
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setStore(store);
                handleUpdateStoreOpen();
              }}
            >
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
        {storesTitlesList}
      </Grid>
      {storesList}
      <UpdatedStoreModal
        store={store}
        open={openUpdateStore}
        handleUpdatedStoreClose={handleUpdateStoreClose}
      />
    </Box>
  );
}
