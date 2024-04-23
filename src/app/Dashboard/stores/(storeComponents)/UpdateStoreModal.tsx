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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import useUpdatedStore from "src/customHooks/useUpdateStore";
import { storeType } from "src/types/storeTypes";
import { ReceivedStoreType } from "src/types/storeTypes";
import {
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import axios from "axios";
import { headers } from "next/headers";

export default function UpdatedStoreModal({
  store,
  open,
  handleUpdatedStoreClose,
}: {
  store: ReceivedStoreType;
  open: boolean;
  handleUpdatedStoreClose: () => void;
}) {
  const { register, control, handleSubmit, formState, watch, setValue } =
    useForm<storeType>();

  const imageSrc = watch("image");
  const { errors, isSubmitting } = formState;
  const handleFilePondUpdate = (fileItems: any[]) => {
    setValue(
      "image",
      fileItems.map((fileItem) => fileItem.file),
      { shouldValidate: true }
    );
  };
  const { mutate, isSuccess } = useUpdatedStore();
  React.useEffect(() => {
    register("image", { required: "Image upload is required" });
  }, [register]);

  const onSubmit = (data: storeType) => {
    const formData = new FormData();
    formData.append("name_en", data.name_en);
    formData.append("name_ar", data.name_ar);
    formData.append("Link", data.Link_ar);
    formData.append("description_ar", data.description_ar);
    formData.append("description_en", data.description_en);
    formData.append("status", data.status ? "active" : "inactive");
    formData.append("featured", data.featured ? "featured" : "not-featured");
    formData.append("category", data.category);
    formData.append("image", data.image[0]);
    mutate(formData);
  };
 
  
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleUpdatedStoreClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Update Store</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="store-name-en"
                  label="Store Name in English"
                  type="text"
                  variant="outlined"
                  {...register("name_en", {
                    required: "Store name is required",
                  })}
                  error={!!errors.name_en}
                  helperText={errors.name_en?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="store-name-ar"
                  label="Store Name in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("name_ar", {
                    required: "Store name is required",
                  })}
                  error={!!errors.name_ar}
                  helperText={errors.name_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="store-link-en"
                  label="Store Link in english"
                  type="text"
                  variant="outlined"
                  {...register("Link_en", {
                    required: "Store link is required",
                  })}
                  error={!!errors.Link_en}
                  helperText={errors.Link_en?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="store-link-ar"
                  label="Store Link in arabic"
                  type="text"
                  variant="outlined"
                  {...register("Link_ar", {
                    required: "Store link is required",
                  })}
                  error={!!errors.Link_ar}
                  helperText={errors.Link_ar?.message}
                />
              </Grid>

              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="store-description-en"
                  label="Store Description in English"
                  type="text"
                  variant="outlined"
                  {...register("description_en", {
                    required: "Store description is required",
                  })}
                  error={!!errors.description_en}
                  helperText={errors.description_en?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="store-description-ar"
                  label="Store Description in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("description_ar", {
                    required: "Store description is required",
                  })}
                  error={!!errors.description_ar}
                  helperText={errors.description_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <FilePond
                  name="image"
                  files={imageSrc}
                  labelIdle={`Upload store image <span class="filepond--label-action"> Browse </span>`}
                  onupdatefiles={handleFilePondUpdate}
                />
                <FormHelperText error={!!errors.image}>
                  {errors.image?.message}
                </FormHelperText>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    label="Category"
                    {...register("category", {
                      required: "Store category is required",
                    })}
                    error={!!errors.category}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText error>
                    {errors.category?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-title-ar"
                  label="Meta Title in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("meta_title_ar", {
                    required: "Meta title is required",
                  })}
                  error={!!errors.meta_title_ar}
                  helperText={errors.meta_title_ar?.message}
                />
              </Grid>

              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-title-en"
                  label="Meta Title in English"
                  type="text"
                  variant="outlined"
                  {...register("meta_title_en", {
                    required: "Meta title is required",
                  })}
                  error={!!errors.meta_title_en}
                  helperText={errors.meta_title_en?.message}
                />
              </Grid>

              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-description-ar"
                  label="Meta Description in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("meta_description_ar", {
                    required: "Meta description is required",
                  })}
                  error={!!errors.meta_description_ar}
                  helperText={errors.meta_description_ar?.message}
                />
              </Grid>

              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-description-en"
                  label="Meta Description in English"
                  type="text"
                  variant="outlined"
                  {...register("meta_description_en", {
                    required: "Meta description is required",
                  })}
                  error={!!errors.meta_description_en}
                  helperText={errors.meta_description_en?.message}
                />
              </Grid>

              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-keyword-ar"
                  label="Meta Keywords in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("meta_keyword_ar", {
                    required: "Meta keywords are required",
                  })}
                  error={!!errors.meta_keyword_ar}
                  helperText={errors.meta_keyword_ar?.message}
                />
              </Grid>

              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-keyword-en"
                  label="Meta Keywords in English"
                  type="text"
                  variant="outlined"
                  {...register("meta_keyword_en", {
                    required: "Meta keywords are required",
                  })}
                  error={!!errors.meta_keyword_en}
                  helperText={errors.meta_keyword_en?.message}
                />
              </Grid>

              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Status"
                  {...register("status")}
                />
              </Grid>
              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Featured"
                  {...register("featured")}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdatedStoreClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} >
              Update Store
            </Button>
          </DialogActions>
        </form>
        <DevTool control={control} />
      </Dialog>
    </React.Fragment>
  );
}
