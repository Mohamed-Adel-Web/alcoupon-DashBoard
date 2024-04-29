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
import useAddCategory from "src/customHooks/categoryHooks/useAddCategory";
import Grid from "@mui/material/Unstable_Grid2";
import { Toaster } from "react-hot-toast";
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
  const { mutate, isSuccess } = useAddCategory();
  const onSubmit = (data: categoryType) => {
    mutate(data);
    if (isSuccess) {
    }
  };
  React.useMemo(() => {
    if (isSuccess) {
      handleAddCategoryClose();
    }
  }, [isSuccess]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddCategoryClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>
          Add New Category
        </DialogTitle>
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
                  {...register("name_en", {
                    required: "name Name  is required",
                  })}
                  error={!!errors.name_en}
                  helperText={errors.name_en?.message}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  id="category Name in arabic"
                  label="category Name in arabic"
                  type="text"
                  variant="outlined"
                  {...register("name_ar", {
                    required: "category Name  is required",
                  })}
                  error={!!errors.name_ar}
                  helperText={errors.name_ar?.message}
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
    </React.Fragment>
  );
}
