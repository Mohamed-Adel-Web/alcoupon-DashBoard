"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { categoryType } from "src/types/categoryTypes";
import useAddCategory from "src/customHooks/useAddCategory";
import Grid from "@mui/material/Unstable_Grid2";

export default function AddCategoryModal({
  open,
  handleAddCategoryClose,
}: {
  open: boolean;
  handleAddCategoryClose: () => void;
}) {
  const { register, control, handleSubmit, formState } =
    useForm<categoryType>();
  const { errors, isSubmitting } = formState;
  const { mutate } = useAddCategory();
  const onSubmit = (data: categoryType) => {
    mutate(data);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddCategoryClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Add New Category</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  id="category Name in english"
                  label="category Name in english"
                  type="text"
                  variant="outlined"
                  {...register("category_en", {
                    required: "category Name  is required",
                  })}
                  error={!!errors.category_en}
                  helperText={errors.category_en?.message}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  id="category Name in arabic"
                  label="category Name in arabic"
                  type="text"
                  variant="outlined"
                  {...register("category_ar", {
                    required: "category Name  is required",
                  })}
                  error={!!errors.category_ar}
                  helperText={errors.category_ar?.message}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddCategoryClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Add Category
            </Button>
          </DialogActions>
        </form>
        <DevTool control={control} />
      </Dialog>
    </React.Fragment>
  );
}
