import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import apiClient from "../../features/api/api";
import {
  addProduct,
  fetchProducts,
} from "../../features/products/productsSlice";

const AddProductForm = ({ addDialog, setAddDialog }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.user);
  const userId = currentUser?.user?._id || localStorage.getItem("userId");
  const [categories, setCategories] = useState([]);

  // Fetch categories when the dialog opens
  useEffect(() => {
    if (addDialog === true) {
      fetchCategories();
    }
  }, [addDialog]);

  const [formErrors, setFormErrors] = useState({
    name: false,
    category: false,
    sizes: false,
    colors: false,
    images: false,
    in_the_box: false,
    description: false,
    out_of_stock: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sizes: [
      {
        size: "",
        storages: [{ capacity: "", price: "" }],
      },
    ],
    colors: [{ hex: "", des: "" }],
    created_by: userId,
    images: [""],
    in_the_box: [{ item: "", image: "" }],
    description: [""],
    out_of_stock: false,
  });

  const handleClose = () => {
    setAddDialog(false);
    setFormData({
      name: "",
      category: "",
      sizes: [
        {
          size: "",
          storages: [{ capacity: "", price: "" }],
        },
      ],
      colors: [{ hex: "", des: "" }],
      created_by: userId,
      images: [""],
      in_the_box: [{ item: "", image: "" }],
      description: [""],
      out_of_stock: false,
    });
    setFormErrors({
      name: false,
      category: false,
      sizes: false,
      colors: false,
      images: false,
      in_the_box: false,
      description: false,
      out_of_stock: false,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //check for empty or null
  const isFormDataValid = () => {
    const updatedErrors = { ...formErrors };
    let isValid = true;

    for (const key in formData) {
      const value = formData[key];

      if (key !== "created_by") {
        if (
          (Array.isArray(value) && !value.length) ||
          (typeof value === "string" && value.trim() === "") ||
          (typeof value === "object" &&
            Object.values(value).every(
              (item) => typeof item === "string" && item.trim() === ""
            ))
        ) {
          updatedErrors[key] = true;
          isValid = false;
        } else {
          updatedErrors[key] = false;
        }

        if (key === "in_the_box" || key === "colors") {
          // Handle nested arrays (in_the_box, colors)
          for (const subField of value) {
            if (
              (Array.isArray(subField) && !subField.length) ||
              (typeof subField === "object" &&
                Object.values(subField).some(
                  (item) => typeof item === "string" && item.trim() === ""
                ))
            ) {
              updatedErrors[key] = true;
              isValid = false;
              break; // Break out of the loop if any subfield is invalid
            }
          }
        }

        if (key === "sizes") {
          for (const size of value) {
            if (
              (typeof size.size === "string" && size.size.trim() === "") ||
              size.storages.some(
                (storage) =>
                  (typeof storage.capacity === "string" &&
                    storage.capacity.trim() === "") ||
                  (typeof storage.price === "string" &&
                    storage.price.trim() === "")
              )
            ) {
              updatedErrors[key] = true;
              isValid = false;
              break; // Break out of the loop if any size or storage is invalid
            }
          }
        }
      }
    }

    setFormErrors(updatedErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormDataValid()) {
      return;
    }
    await dispatch(addProduct(formData)); // Wait for the addProduct action to complete
    await dispatch(fetchProducts()); // Wait for the fetchProducts action to complete
    handleClose();
  };

  // fetching categories
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/user/categories");
      const data = await response.data.categories;
      setCategories(data); // Assuming the data returned is an array of category objects
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSizeChange = (e, sizeIndex, field) => {
    const { value } = e.target;
    const updatedSizes = [...formData.sizes];
    updatedSizes[sizeIndex][field] = value;
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleStorageChange = (e, sizeIndex, storageIndex, field) => {
    const { value } = e.target;
    const updatedSizes = [...formData.sizes];
    updatedSizes[sizeIndex].storages[storageIndex][field] = value;
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleColorChange = (e, colorIndex, field) => {
    const { value } = e.target;
    const updatedColors = [...formData.colors];
    updatedColors[colorIndex][field] = value;
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleAddSize = () => {
    const updatedSizes = [...formData.sizes];
    updatedSizes.push({ size: "", storages: [{ capacity: "", price: "" }] });
    setFormData((prevData) => ({ ...prevData, sizes: updatedSizes }));
  };

  const handleAddColor = () => {
    const updatedColors = [...formData.colors];
    updatedColors.push({ hex: "", des: "" });
    setFormData((prevData) => ({ ...prevData, colors: updatedColors }));
  };

  const handleAddStorage = (sizeIndex) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[sizeIndex].storages.push({ capacity: "", price: "" });
    setFormData((prevData) => ({ ...prevData, sizes: updatedSizes }));
  };

  const handleImageChange = (e, imgIndex) => {
    const { value } = e.target;
    const updatedImages = [...formData.images];
    updatedImages[imgIndex] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ""],
    }));
  };

  const handleInTheBoxItemChange = (e, itemIndex) => {
    const { value } = e.target;
    const updatedInTheBox = [...formData.in_the_box];
    updatedInTheBox[itemIndex].item = value;
    setFormData({ ...formData, in_the_box: updatedInTheBox });
  };

  const handleInTheBoxImageChange = (e, itemIndex) => {
    const { value } = e.target;
    const updatedInTheBox = [...formData.in_the_box];
    updatedInTheBox[itemIndex].image = value;
    setFormData({ ...formData, in_the_box: updatedInTheBox });
  };

  const handleAddInTheBox = () => {
    setFormData((prevData) => ({
      ...prevData,
      in_the_box: [...prevData.in_the_box, { item: "", image: "" }],
    }));
  };

  const handleDescriptionChange = (e, descriptionIndex) => {
    const { value } = e.target;
    const updatedDescriptions = [...formData.description];
    updatedDescriptions[descriptionIndex] = value;
    setFormData({ ...formData, description: updatedDescriptions });
  };

  const handleAddDescription = () => {
    setFormData((prevData) => ({
      ...prevData,
      description: [...prevData.description, ""],
    }));
  };

  return (
    <Dialog open={addDialog} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent style={{ minWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            error={formErrors.name}
          />
          <FormControl fullWidth error={formErrors.category}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleFormChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Sizes */}
          {formData.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex}>
              <TextField
                label="Size"
                name={`size${sizeIndex}`}
                value={size.size}
                onChange={(e) => handleSizeChange(e, sizeIndex, "size")}
                fullWidth
                style={{ marginBottom: "10px" }}
                error={formErrors.sizes}
              />

              {size.storages.map((storage, storageIndex) => (
                <div key={storageIndex}>
                  <TextField
                    label="Capacity"
                    name={`capacity${sizeIndex}-${storageIndex}`}
                    value={storage.capacity}
                    onChange={(e) =>
                      handleStorageChange(
                        e,
                        sizeIndex,
                        storageIndex,
                        "capacity"
                      )
                    }
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    error={formErrors.sizes}
                  />
                  <TextField
                    label="Price"
                    name={`price${sizeIndex}-${storageIndex}`}
                    value={storage.price}
                    onChange={(e) =>
                      handleStorageChange(e, sizeIndex, storageIndex, "price")
                    }
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    type="number"
                    error={formErrors.sizes}
                  />
                </div>
              ))}

              <button type="button" onClick={() => handleAddStorage(sizeIndex)}>
                Add Storage
              </button>
            </div>
          ))}

          <button type="button" onClick={handleAddSize}>
            Add Size
          </button>

          {formData.colors.map((color, colorIndex) => (
            <div key={colorIndex}>
              <TextField
                label="Color Hex"
                name={`hex${colorIndex}`}
                value={color.hex}
                onChange={(e) => handleColorChange(e, colorIndex, "hex")}
                fullWidth
                style={{ marginBottom: "10px" }}
                error={formErrors.colors}
              />
              <TextField
                label="Color Description"
                name={`des${colorIndex}`}
                value={color.des}
                onChange={(e) => handleColorChange(e, colorIndex, "des")}
                fullWidth
                style={{ marginBottom: "10px" }}
                error={formErrors.colors}
              />
            </div>
          ))}

          <button type="button" onClick={handleAddColor}>
            Add Color
          </button>

          {/* Images */}
          {formData.images.map((image, imgIndex) => (
            <TextField
              key={imgIndex}
              label="Image"
              name={`image${imgIndex}`}
              value={image}
              onChange={(e) => handleImageChange(e, imgIndex)}
              fullWidth
              style={{ marginBottom: "10px" }}
              error={formErrors.images}
            />
          ))}
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>

          {/* In the Box */}
          {formData.in_the_box.map((item, itemIndex) => (
            <div key={itemIndex}>
              <TextField
                label="Item"
                name={`inTheBoxItem${itemIndex}`}
                value={item.item}
                onChange={(e) => handleInTheBoxItemChange(e, itemIndex)}
                fullWidth
                style={{ marginBottom: "10px" }}
                error={formErrors.in_the_box}
              />
              <TextField
                label="Image URL"
                name={`inTheBoxImage${itemIndex}`}
                value={item.image}
                onChange={(e) => handleInTheBoxImageChange(e, itemIndex)}
                fullWidth
                style={{ marginBottom: "10px" }}
                error={formErrors.in_the_box}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddInTheBox}>
            Add Item to In the Box
          </button>

          {/* Description */}
          {formData.description.map((desc, descIndex) => (
            <TextField
              key={descIndex}
              label="Description"
              name={`description${descIndex}`}
              value={desc}
              onChange={(e) => handleDescriptionChange(e, descIndex)}
              fullWidth
              style={{ marginBottom: "10px" }}
              error={formErrors.description}
            />
          ))}
          <button type="button" onClick={handleAddDescription}>
            Add Description
          </button>

          {/* Out of Stock */}
          <FormControl fullWidth>
            <InputLabel>Out of Stock</InputLabel>
            <Select
              name="out_of_stock"
              value={formData.out_of_stock}
              onChange={handleFormChange}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductForm;
