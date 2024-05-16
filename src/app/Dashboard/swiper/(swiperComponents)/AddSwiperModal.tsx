"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { categoryType } from "src/types/categoryTypes";
import Grid from "@mui/material/Unstable_Grid2";
import { Toaster } from "react-hot-toast";
import { FormHelperText } from "@mui/material";
import { Swiper } from "src/types/swiperTypes";
import useAddSwiper from "src/customHooks/swiperHooks/useAddSwiper";
export default function AddSwiperModal({
  open,
  handleAddSwiperClose,
}: {
  open: boolean;
  handleAddSwiperClose: () => void;
}) {
  const { handleSubmit, formState, watch, setValue } = useForm<Swiper>();
  const imageSrc = watch("images");
  const handleFilePondUpdate = (fileItems: any[]) => {
    setValue(
      "images",
      fileItems.map((fileItem) => fileItem.file),
      { shouldValidate: true }
    );
  };
  const { mutate, isSuccess } = useAddSwiper();

  const { errors, isSubmitting } = formState;

  React.useMemo(() => {
    if (isSuccess) {
      handleAddSwiperClose();
    }
  }, [isSuccess]);
  const onSubmit = (data: Swiper) => {
    const formData = new FormData();
    formData.append("images", data.images[0]);
    mutate(formData);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddSwiperClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Add New Image</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <FilePond
                  name="images"
                  files={imageSrc}
                  labelIdle={`Upload store image <span class="filepond--label-action"> Browse </span>`}
                  onupdatefiles={handleFilePondUpdate}
                />
                <FormHelperText error={!!errors.images}>
                  {errors.images?.message}
                </FormHelperText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddSwiperClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Add Image
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
