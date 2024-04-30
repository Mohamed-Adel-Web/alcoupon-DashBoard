"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { categoryType } from "src/types/categoryTypes";
import Grid from "@mui/material/Unstable_Grid2";
import useUpdateCategory from "src/customHooks/categoryHooks/useUpdateCategory";
export default function UpdateCategoryModal({
  category,
  open,
  handleUpdateCategoryClose,
}: {
  category: categoryType;
  open: boolean;
  handleUpdateCategoryClose: () => void;
}) {
  const { register, control, handleSubmit, formState, reset } =
    useForm<categoryType>();
  const { errors, isSubmitting } = formState;
  const { mutate, isSuccess } = useUpdateCategory(category.id);
  const onSubmit = (data: categoryType) => {
    mutate(data);
  };
  React.useMemo(() => {
    if (isSuccess) {
      handleUpdateCategoryClose();
    }
  }, [isSuccess]);
  React.useEffect(() => {
    if (category) {
      reset({
        name_ar: category.name_ar,
        name_en: category.name_en,
      });
    }
    {
    }
  }, [reset, category]);
  return (
    <Dialog open={open} onClose={handleUpdateCategoryClose} fullWidth>
      <DialogTitle sx={{ color: "primary.main" }}>Update Category</DialogTitle>
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
                  required: "category Name  is required",
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
          <Button onClick={handleUpdateCategoryClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            updated Category
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
