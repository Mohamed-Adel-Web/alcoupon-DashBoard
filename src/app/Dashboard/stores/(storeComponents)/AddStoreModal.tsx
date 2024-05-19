"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import useAddStore from "src/customHooks/storeHooks/useAddStore";
import { storeType } from "src/types/storeTypes";
import { Editor } from "primereact/editor";
import {
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { categoryType } from "src/types/categoryTypes";
import { DevTool } from "@hookform/devtools";

const editorHeader = (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-font">
        <option></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select>
      <select className="ql-size">
        <option value="small"></option>
        <option></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-blockquote"></button>
      <button className="ql-code-block"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-header" value="1"></button>
      <button className="ql-header" value="2"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-direction" value="rtl"></button>
      <select className="ql-align"></select>
      <select className="ql-color"></select>
      <select className="ql-background"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-clean"></button>
    </span>
  </div>
);
export default function AddStoreModal({
  open,
  handleAddStoreClose,
  categoryData,
}: {
  open: boolean;
  handleAddStoreClose: () => void;
  categoryData: categoryType[];
}) {
  const [textEn, setTextEn] = React.useState<string>("");
  const [textAr, setTextAr] = React.useState<string>("");
  const [aboutTextEn, setAboutTextEn] = React.useState<string>("");
  const [aboutTextAr, setAboutTextAr] = React.useState<string>("");
  const { register, control, handleSubmit, formState, watch, setValue } =
    useForm<storeType>();
  const { errors, isSubmitting } = formState;
  const imageSrc = watch("image");
  const handleFilePondUpdate = (fileItems: any[]) => {
    setValue(
      "image",
      fileItems.map((fileItem) => fileItem.file),
      { shouldValidate: true }
    );
  };
  React.useEffect(() => {
    register("image", { required: "Image upload is required" });
  }, [register]);
  const { mutate, isSuccess } = useAddStore();
  const categoryList = categoryData?.map((category: categoryType) => {
    return <MenuItem value={category.id}>{category.name_en}</MenuItem>;
  });
  React.useMemo(() => {
    if (isSuccess) {
      handleAddStoreClose();
    }
  }, [isSuccess]);
  React.useEffect(() => {
    register("description_en", {
      required: "description in English is required",
    });
    register("description_ar", {
      required: "description in Arabic is required",
    });
    register("about_en", {
      required: "description in English is required",
    });
    register("about_ar", {
      required: "description in Arabic is required",
    });
  }, [register]);

  const onSubmit = (data: storeType) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name_ar", data.name_ar);
    formData.append("name_en", data.name_en);
    formData.append("image", data.image[0]);
    formData.append("featured", data.featured ? "featured" : "not-featured");
    formData.append("status", data.status ? "active" : "in-active");
    formData.append("link_en", data.link_en);
    formData.append("link_ar", data.link_ar);
    formData.append("description_ar", data.description_ar);
    formData.append("description_en", data.description_en);
    formData.append("category_id", data.category_id.toString());
    formData.append("meta_title_ar", data.meta_title_ar);
    formData.append("meta_title_en", data.meta_title_en);
    formData.append("meta_description_en", data.meta_description_en);
    formData.append("meta_description_ar", data.meta_description_ar);
    formData.append("meta_keyword_ar", data.meta_keyword_ar);
    formData.append("meta_keyword_en", data.meta_keyword_en);
    formData.append("title_en", data.title_en);
    formData.append("title_ar", data.title_ar);
    formData.append("discount_en", data.title_en);
    formData.append("discount_ar", data.title_ar);
    formData.append("about_en", data.about_en);
    formData.append("about_ar", data.about_ar);
    formData.append("allstore", data.allstore ? "all-store" : "not-all-store");

    mutate(formData);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddStoreClose} maxWidth={"lg"}>
        <DialogTitle sx={{ color: "primary.main" }}>Add New Store</DialogTitle>
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
                    minLength: {
                      value: 3,
                      message: "minimum length is 3 character",
                    },
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
                    minLength: {
                      value: 3,
                      message: "minimum length is 3 character",
                    },
                    maxLength: {
                      value: 140,
                      message: "maximum length is 140 character",
                    },
                  })}
                  error={!!errors.name_ar}
                  helperText={errors.name_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="Store title in English"
                  label="Store title in English"
                  type="text"
                  variant="outlined"
                  {...register("title_en", {
                    required: "Store title is required",
                    minLength: {
                      value: 3,
                      message: "minimum length is 3 character",
                    },
                    maxLength: {
                      value: 140,
                      message: "maximum length is 140 character",
                    },
                  })}
                  error={!!errors.title_en}
                  helperText={errors.title_en?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="Store title in Arabic"
                  label="Store title in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("title_ar", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "minimum length is 3 character",
                    },
                  })}
                  error={!!errors.title_ar}
                  helperText={errors.title_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="Store discount in English"
                  label="Store discount in English"
                  type="text"
                  variant="outlined"
                  {...register("discount_en", {
                    required: "Store discount is required",
                    minLength: {
                      value: 3,
                      message: "minimum length is 3 character",
                    },
                    maxLength: {
                      value: 140,
                      message: "maximum length is 140 character",
                    },
                  })}
                  error={!!errors.discount_en}
                  helperText={errors.discount_en?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="Store discount in Arabic"
                  label="Store discount in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("discount_ar", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "minimum length is 3 character",
                    },
                  })}
                  error={!!errors.discount_ar}
                  helperText={errors.discount_ar?.message}
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
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
                      message: "Please enter a valid URL",
                    },
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
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
                      message: "Please enter a valid URL",
                    },
                  })}
                  error={!!errors.link_ar}
                  helperText={errors.link_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <div className="card">
                  <Editor
                    value={textEn}
                    headerTemplate={editorHeader}
                    placeholder="store description in english"
                    onTextChange={(e) => {
                      setTextEn(e.htmlValue || "");
                      setValue("description_en", e.htmlValue || "");
                    }}
                    style={{ height: "320px" }}
                  />
                  <FormHelperText error={!!errors.description_en}>
                    {errors.description_en?.message}
                  </FormHelperText>
                </div>
              </Grid>
              <Grid md={6} xs={12}>
                <div className="card">
                  <Editor
                    value={textAr}
                    placeholder="store description in arabic"
                    headerTemplate={editorHeader}
                    onTextChange={(e) => {
                      setTextAr(e.htmlValue || "");
                      setValue("description_ar", e.htmlValue || "");
                    }}
                    style={{ height: "320px" }}
                  />
                  <FormHelperText error={!!errors.description_ar}>
                    {errors.description_ar?.message}
                  </FormHelperText>
                </div>
              </Grid>
              <Grid md={6} xs={12}>
                <div className="card">
                  <Editor
                    value={aboutTextEn}
                    headerTemplate={editorHeader}
                    placeholder="store about in english"
                    onTextChange={(e) => {
                      setAboutTextEn(e.htmlValue || "");
                      setValue("about_en", e.htmlValue || "");
                    }}
                    style={{ height: "320px" }}
                  />
                  <FormHelperText error={!!errors.about_en}>
                    {errors.about_en?.message}
                  </FormHelperText>
                </div>
              </Grid>
              <Grid md={6} xs={12}>
                <div className="card">
                  <Editor
                    value={aboutTextAr}
                    placeholder="store about in arabic"
                    headerTemplate={editorHeader}
                    onTextChange={(e) => {
                      setAboutTextAr(e.htmlValue || "");
                      setValue("about_ar", e.htmlValue || "");
                    }}
                    style={{ height: "320px" }}
                  />
                  <FormHelperText error={!!errors.about_ar}>
                    {errors.about_ar?.message}
                  </FormHelperText>
                </div>
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
                    {...register("category_id", {
                      required: "Store category is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.category_id}
                  >
                    {categoryList}
                  </Select>
                  <FormHelperText error>
                    {errors.category_id?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="h3">SEO DATA</Typography>
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-title-en"
                  label="SEO Title in English"
                  type="text"
                  variant="outlined"
                  {...register("meta_title_en")}
                  error={!!errors.meta_title_en}
                  helperText={errors.meta_title_en?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  id="meta-title-ar"
                  label="SEO Title in Arabic"
                  type="text"
                  variant="outlined"
                  {...register("meta_title_ar")}
                  error={!!errors.meta_title_ar}
                  helperText={errors.meta_title_ar?.message}
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
                  {...register("meta_description_en")}
                  error={!!errors.meta_description_en}
                  helperText={errors.meta_description_en?.message}
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
                  {...register("meta_description_ar")}
                  error={!!errors.meta_description_ar}
                  helperText={errors.meta_description_ar?.message}
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
                  {...register("meta_keyword_en")}
                  error={!!errors.meta_keyword_en}
                  helperText={errors.meta_keyword_en?.message}
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
                  {...register("meta_keyword_ar")}
                  error={!!errors.meta_keyword_ar}
                  helperText={errors.meta_keyword_ar?.message}
                />
              </Grid>

              <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Status"
                  {...register("status")}
                />
              </Grid>
              <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Featured"
                  {...register("featured")}
                />
              </Grid>
              <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="All stores"
                  {...register("allstore")}
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
      </Dialog>
    </React.Fragment>
  );
}
