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
import { couponType } from "src/types/couponTypes";
import useAddCoupon from "src/customHooks/useAddCoupon";

import Grid from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function AddCouponModal({
  open,
  handleAddCategoryClose,
}: {
  open: boolean;
  handleAddCategoryClose: () => void;
}) {
  const { register, control, handleSubmit, formState } = useForm<couponType>();
  const { errors, isSubmitting } = formState;
  const { mutate } = useAddCoupon();
  const onSubmit = (data: couponType) => {
    mutate(data);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddCategoryClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Add New Coupon</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                {" "}
                <TextField
                  fullWidth
                  id="coupon title in english"
                  label="coupon title in english"
                  type="text"
                  variant="outlined"
                  {...register("title_en", {
                    required: "category Name  is required",
                  })}
                  error={!!errors.title_en}
                  helperText={errors.title_en?.message}
                />
              </Grid>{" "}
              <Grid xs={12} md={6}>
                {" "}
                <TextField
                  fullWidth
                  id="coupon title in arabic"
                  label="coupon title in arabic"
                  type="text"
                  variant="outlined"
                  {...register("title_ar", {
                    required: "coupon Name  is required",
                  })}
                  error={!!errors.title_ar}
                  helperText={errors.title_ar?.message}
                />
              </Grid>{" "}
              <Grid xs={12}>
                <TextField
                  fullWidth
                  id="coupon code"
                  label="coupon code"
                  type="text"
                  variant="outlined"
                  {...register("code", {
                    required: "coupon code is required",
                  })}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Grid xs={12} md={6}></Grid>
                <input
                  type="date"
                  style={{ padding: "0.5rem", width: "100%" }}
                  {...register("end_date", { valueAsDate: true })}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <input
                  type="date"
                  style={{ padding: "0.5rem", width: "100%" }}
                  {...register("end_date", { valueAsDate: true })}
                />
              </Grid>
              <Grid xs={12}>
                {" "}
                <FormControl fullWidth>
                  <InputLabel id="category-label">store</InputLabel>
                  <Select
                    labelId="store-label"
                    id="store-select"
                    label="Category"
                    {...register("store_id", {
                      required: "Store  is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.store_id}
                  >
                    <MenuItem value={1}>Noon</MenuItem>
                    <MenuItem value={2}>Amazon</MenuItem>
                    <MenuItem value={3}>Defacto</MenuItem>
                  </Select>
                  <FormHelperText error>
                    {errors.store_id?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddCategoryClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Add Coupon
            </Button>
          </DialogActions>
        </form>
        <DevTool control={control} />
      </Dialog>
    </React.Fragment>
  );
}
