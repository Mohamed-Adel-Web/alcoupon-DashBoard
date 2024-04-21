"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Grid from "@mui/material/Unstable_Grid2";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import useAddStore from "src/customHooks/useAddStore";
import { storeType } from "src/types/storeTypes";
import { FormControlLabel, FormHelperText, Switch } from "@mui/material";

export default function AddStoreModal({
  open,
  handleAddStoreClose,
}: {
  open: boolean;
  handleAddStoreClose: () => void;
}) {
  const { register, control, handleSubmit, formState, watch, setValue, reset } =
    useForm<storeType>();
  const imageSrc = watch("storeImage");
  const { errors, isSubmitting } = formState;
  const handleFilePondUpdate = (fileItems: any[]) => {
    setValue(
      "storeImage",
      fileItems.map((fileItem) => fileItem.file),
      { shouldValidate: true }
    );
  };
  const { mutate, isSuccess } = useAddStore();
  React.useEffect(() => {
    register("storeImage", { required: "Image upload is required" }); // Ensures the field is registered
  }, [register]);

  const onSubmit = (data: storeType) => {
    const formData = new FormData();
    formData.append("storeName", data.storeName);
    formData.append("storeLink", data.storeLink);
    formData.append("storeDescription", data.storeDescription);
    formData.append("status", data.status ? "true" : "false");
    formData.append("feature", data.feature ? "true" : "false");
    formData.append("storeImage", data.storeImage[0]);
    mutate(formData);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddStoreClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Add New Store</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="store Name"
                  label="store Name"
                  type="text"
                  variant="outlined"
                  {...register("storeName", {
                    required: "store name is required",
                  })}
                  error={!!errors.storeName}
                  helperText={errors.storeName?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="store Link"
                  label="store Link"
                  type="text"
                  variant="outlined"
                  {...register("storeLink", {
                    required: "store Link is required",
                  })}
                  error={!!errors.storeLink}
                  helperText={errors.storeLink?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <FilePond
                  name="storeImage"
                  files={imageSrc}
                  labelIdle={`upload store image <span class="filepond--label-action"> Browse </span>`}
                  onupdatefiles={handleFilePondUpdate}
                />
                <FormHelperText error={!!errors.storeImage}>
                  {errors.storeImage?.message}
                </FormHelperText>
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="store Description"
                  label="store Description"
                  type="text"
                  variant="outlined"
                  {...register("storeDescription", {
                    required: "store Description is required",
                  })}
                  error={!!errors.storeDescription}
                  helperText={errors.storeDescription?.message}
                />
              </Grid>
              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="status"
                  {...register("status")}
                />
              </Grid>
              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="feature"
                  {...register("feature")}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddStoreClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Add Store
            </Button>
          </DialogActions>
        </form>
        <DevTool control={control} />
      </Dialog>
    </React.Fragment>
  );
}
