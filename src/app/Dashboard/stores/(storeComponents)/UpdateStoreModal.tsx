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
import useUpdatedStore from "src/customHooks/storeHooks/useUpdateStore";
import { storeType } from "src/types/storeTypes";
import { ReceivedStoreType } from "src/types/storeTypes";
import {
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { categoryType } from "src/types/categoryTypes";
import { tree } from "next/dist/build/templates/app-page";
export default function UpdatedStoreModal({
  store,
  open,
  categoryData,
  handleUpdatedStoreClose,
}: {
  store: ReceivedStoreType;
  open: boolean;
  handleUpdatedStoreClose: () => void;
  categoryData: categoryType[];
}) {
  const categoryList = categoryData?.map((category: categoryType) => {
    return <MenuItem value={category.id}>{category.name_en}</MenuItem>;
  });
  const { register, control, handleSubmit, formState, watch, setValue, reset } =
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
  const { mutate, isSuccess } = useUpdatedStore(store.id);
  React.useEffect(() => {
    register("image", { required: "Image upload is required" });
  }, [register]);
  React.useEffect(() => {
    if (store) {
      reset({
        name_ar: store.name_ar,
        name_en: store.name_en,
        featured: store.featured === "featured" ? true : false,
        status: store.status === "active" ? true : false,
        link_en: store.link_en,
        link_ar: store.link_ar,
        description_ar: store.description_ar,
        description_en: store.description_en,
        category_id: store.category_id,
        meta_title_ar: store.meta.meta_title_ar,
        meta_title_en: store.meta.meta_title_en,
        meta_description_en: store.meta.meta_description_en,
        meta_description_ar: store.meta.meta_description_ar,
        meta_keyword_ar: store.meta.meta_keyword_ar,
        meta_keyword_en: store.meta.meta_keyword_en,
      });
    }
    {
    }
  }, [reset, store]);
  const onSubmit = (data: storeType) => {
    const formData = new FormData();
    formData.append("name_ar", data.name_ar);
    formData.append("name_en", data.name_en);
    if (data.image) {
      formData.append("image", data?.image[0]);
    }
    if (data.category_id) {
      formData.append("category_id", data.category_id);
    }
    formData.append("featured", data.featured ? "featured" : "not-featured");
    formData.append("status", data.status ? "active" : "in-active");
    formData.append("link_en", data.link_en);
    formData.append("link_ar", data.link_ar);
    formData.append("description_ar", data.description_ar);
    formData.append("description_en", data.description_en);
    formData.append("meta_title_ar", data.meta_title_ar);
    formData.append("meta_title_en", data.meta_title_en);
    formData.append("meta_description_en", data.meta_description_en);
    formData.append("meta_description_ar", data.meta_description_ar);
    formData.append("meta_keyword_ar", data.meta_keyword_ar);
    formData.append("meta_keyword_en", data.meta_keyword_en);
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
                  {...register("link_en", {
                    required: "Store link is required",
                  })}
                  error={!!errors.link_en}
                  helperText={errors.link_en?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="store-link-ar"
                  label="Store Link in arabic"
                  type="text"
                  variant="outlined"
                  {...register("link_ar", {
                    required: "Store link is required",
                  })}
                  error={!!errors.link_ar}
                  helperText={errors.link_ar?.message}
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
                    {...register("category_id")}
                    error={!!errors.category_id}
                  >
                    {categoryList}
                  </Select>
                  <FormHelperText error>
                    {errors.category_id?.message}
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
                  control={<Switch />}
                  label="Status"
                  {...register("status")}
                />
              </Grid>
              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  value={store.featured === "featured"}
                  control={<Switch />}
                  label="Featured"
                  {...register("featured")}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdatedStoreClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Update Store
            </Button>
          </DialogActions>
        </form>
        {/* <DevTool control={control} /> */}
      </Dialog>
    </React.Fragment>
  );
}
