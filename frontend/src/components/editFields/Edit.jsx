import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import apiClient from "../../features/api/api";

const EditDialog = ({ field, open, onClose, onSave }) => {
  const [editedField, setEditedField] = useState({});
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [editedFieldsList, setEditedFieldsList] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (field) {
      const exclusionList = ["_id", "__v", "price", "id"];
      const filteredField = Object.keys(field).reduce((acc, key) => {
        if (!exclusionList.includes(key)) {
          acc[key] = field[key];
        }
        return acc;
      }, {});
      setEditedField(filteredField);
    }
  }, [field]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const listItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ccc",
  };

  const keyStyle = {
    fontWeight: "bold",
    marginRight: "8px",
  };

  const valueStyle = {
    flex: "1",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  };

  const handleEditField = (fieldName) => {
    if (fieldName === "created_at" || fieldName === "created_by") {
      // Disable editing for "created_at" and "created_by" fields
      return;
    }
    setFieldToEdit(fieldName);
    setEditedFieldsList((prevFields) => ({
      ...prevFields,
      [fieldName]: editedField[fieldName],
    }));
  };

  const handleEditClick = (key) => {
    setFieldToEdit(key);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldPath = name.split(".");

    if (fieldPath[0] === "sizes") {
      const updatedFieldsList = { ...editedFieldsList };
      updatedFieldsList[name] = value;
      setEditedFieldsList(updatedFieldsList);
    } else {
      // Handle other top-level fields
      setEditedFieldsList((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    const updatedFields = {};

    for (const key in editedFieldsList) {
      const value = editedFieldsList[key];
      if (Array.isArray(value)) {
        updatedFields[key] = value.filter((item) => item !== "");
      } else if (key === "description" || key === "images") {
        // Split comma-separated strings into arrays for description and images fields
        updatedFields[key] = value.split(",");
      } else {
        updatedFields[key] = value;
      }
    }

    // Prepare the payload with the updated fields
    const updatedProduct = {
      ...updatedFields, // Use the updatedFields object for the edited values
    };
    onClose();
    onSave(updatedProduct);
    setEditedField({});
    setEditedFieldsList({});
  };

  const handleCloseDialog = () => {
    setFieldToEdit(null);
    setEditedFieldsList({});
  };

  const renderSizesList = (sizes) => {
    return sizes.map((size, sizeIndex) => (
      <div key={sizeIndex} style={{ marginBottom: "8px" }}>
        <Typography variant="body1">Size: {size.size}</Typography>
        {size.storages.map((storage, storageIndex) => (
          <List key={storageIndex} style={{ marginLeft: "16px" }}>
            {fieldToEdit === `sizes.${sizeIndex}.storages.${storageIndex}` ? (
              <div style={{ marginTop: "8px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={`sizes.${sizeIndex}.storages.${storageIndex}._id`}
                  value={
                    editedFieldsList[
                      `sizes.${sizeIndex}.storages.${storageIndex}._id`
                    ] || storage._id
                  }
                  onChange={handleInputChange}
                  style={{ marginBottom: "8px" }}
                  disabled // Disable editing of the storage _id
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  name={`sizes.${sizeIndex}.storages.${storageIndex}.capacity`}
                  value={
                    editedFieldsList[
                      `sizes.${sizeIndex}.storages.${storageIndex}.capacity`
                    ] === undefined
                      ? storage.capacity
                      : editedFieldsList[
                          `sizes.${sizeIndex}.storages.${storageIndex}.capacity`
                        ]
                  }
                  onChange={handleInputChange}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  name={`sizes.${sizeIndex}.storages.${storageIndex}.price`}
                  value={
                    editedFieldsList[
                      `sizes.${sizeIndex}.storages.${storageIndex}.price`
                    ] === undefined
                      ? storage.price
                      : editedFieldsList[
                          `sizes.${sizeIndex}.storages.${storageIndex}.price`
                        ]
                  }
                  onChange={handleInputChange}
                  style={{ marginBottom: "16px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCloseDialog}
                  style={{ marginLeft: "8px" }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <ListItem style={listItemStyle}>
                <ListItemText primary={`Capacity: ${storage.capacity}`} />
                <ListItemText primary={`Price: ${storage.price}`} />
                {fieldToEdit !== null && (
                  <Button
                    variant="text"
                    disabled
                    style={{ marginLeft: "16px" }}
                  >
                    Edit
                  </Button>
                )}
                {fieldToEdit === null && (
                  <Button
                    variant="text"
                    color="primary"
                    style={{ marginLeft: "16px" }}
                    onClick={() =>
                      handleEditClick(
                        `sizes.${sizeIndex}.storages.${storageIndex}`
                      )
                    }
                  >
                    Edit
                  </Button>
                )}
              </ListItem>
            )}
          </List>
        ))}
      </div>
    ));
  };

  const renderEditObjectField = (obj, prefix = "") => {
    return Object.keys(obj).map((innerKey) => {
      const fieldName = prefix ? `${prefix}.${innerKey}` : innerKey;
      const isEditing = fieldToEdit === fieldName;
      const value = isEditing ? editedFieldsList[fieldName] : obj[innerKey];
      const isObjectOrArray =
        typeof value === "object" && !Array.isArray(value);

      // Check if the field is "created_at" or "created_by" to determine if it should be hidden
      const isHidden = fieldName === "created_at" || fieldName === "created_by";

      return (
        <div
          key={fieldName}
          style={{ marginBottom: "8px", marginLeft: prefix ? "16px" : 0 }}
        >
          <div style={{ marginLeft: "16px" }}>
            {isObjectOrArray ? (
              <div
                style={{
                  paddingLeft: "16px",
                  marginBottom: "8px",
                  borderLeft: "2px solid #ccc",
                }}
              >
                {renderEditObjectField(value, fieldName)}
              </div>
            ) : isEditing ? (
              <div style={{ marginBottom: "8px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={fieldName}
                  value={value}
                  onChange={handleInputChange}
                  disabled={isHidden} // Disable editing for "created_at" and "created_by" fields
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{ marginRight: "8px", marginTop: "8px" }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCloseDialog}
                  style={{ marginTop: "8px" }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography style={valueStyle}>
                  {JSON.stringify(value, null, 2)}
                </Typography>
                {!isHidden && (
                  <Button
                    variant="text"
                    color="primary"
                    style={{ marginLeft: "16px" }}
                    onClick={() => handleEditField(fieldName)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  const renderIntheBoxList = (inTheBox) => {
    if (Array.isArray(inTheBox)) {
      return inTheBox.map((item, index) => (
        <List key={index} style={{ marginLeft: "16px" }}>
          {fieldToEdit === `in_the_box.${index}` ? (
            <div style={{ marginTop: "8px" }}>
              <TextField
                fullWidth
                variant="outlined"
                name={`in_the_box.${index}.item`}
                value={
                  editedFieldsList[`in_the_box.${index}.item`] || item.item
                }
                onChange={handleInputChange}
                style={{ marginBottom: "8px" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                name={`in_the_box.${index}.image`}
                value={
                  editedFieldsList[`in_the_box.${index}.image`] || item.image
                }
                onChange={handleInputChange}
                style={{ marginBottom: "8px" }}
              />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleCloseDialog}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <ListItem style={listItemStyle}>
              <ListItemText primary={item.item} />
              {fieldToEdit !== null && (
                <Button variant="text" disabled style={{ marginLeft: "16px" }}>
                  Edit
                </Button>
              )}
              {fieldToEdit === null && (
                <Button
                  variant="text"
                  color="primary"
                  style={{ marginLeft: "16px" }}
                  onClick={() => handleEditClick(`in_the_box.${index}`)}
                >
                  Edit
                </Button>
              )}
            </ListItem>
          )}
        </List>
      ));
    }

    return null;
  };

  const renderColorsList = (colors) => {
    if (Array.isArray(colors)) {
      return colors.map((color, index) => (
        <List key={index} style={{ marginLeft: "16px" }}>
          {fieldToEdit === `colors.${index}` ? (
            <div style={{ marginTop: "8px" }}>
              <TextField
                fullWidth
                variant="outlined"
                name={`colors.${index}.des`}
                value={editedFieldsList[`colors.${index}.des`] || color.des}
                onChange={handleInputChange}
                style={{ marginBottom: "8px" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                name={`colors.${index}.hex`}
                value={editedFieldsList[`colors.${index}.hex`] || color.hex}
                onChange={handleInputChange}
                style={{ marginBottom: "8px" }}
              />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleCloseDialog}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <ListItem style={listItemStyle}>
              <ListItemText primary={`Color: ${color.des}`} />
              <ListItemText primary={`Hex: ${color.hex}`} />
              {fieldToEdit !== null && (
                <Button variant="text" disabled style={{ marginLeft: "16px" }}>
                  Edit
                </Button>
              )}
              {fieldToEdit === null && (
                <Button
                  variant="text"
                  color="primary"
                  style={{ marginLeft: "16px" }}
                  onClick={() => handleEditClick(`colors.${index}`)}
                >
                  Edit
                </Button>
              )}
            </ListItem>
          )}
        </List>
      ));
    }

    return null;
  };

  const renderImages = (images) => {
    const isEditing = fieldToEdit === "images";
    const value = isEditing ? editedFieldsList["images"] : images;

    return (
      <div style={{ marginBottom: "8px" }}>
        {isEditing ? (
          <div style={{ marginTop: "8px" }}>
            <TextField
              fullWidth
              variant="outlined"
              name="images"
              value={Array.isArray(value) ? value.join(", ") : value}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleCloseDialog}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={valueStyle}>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                value
              )}
            </div>
            {fieldToEdit !== null && (
              <Button variant="text" disabled style={{ marginLeft: "16px" }}>
                Edit
              </Button>
            )}
            {fieldToEdit === null && (
              <Button
                variant="text"
                color="primary"
                style={{ marginLeft: "16px" }}
                onClick={() => handleEditField("images")}
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDescription = (description) => {
    const isEditing = fieldToEdit === "description";
    const value = isEditing ? editedFieldsList["description"] : description;

    return (
      <div style={{ marginBottom: "8px" }}>
        {isEditing ? (
          <div style={{ marginTop: "8px" }}>
            <TextField
              fullWidth
              variant="outlined"
              name="description"
              value={Array.isArray(value) ? value.join(", ") : value}
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleCloseDialog}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={valueStyle}>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                value
              )}
            </div>
            {fieldToEdit !== null && (
              <Button variant="text" disabled style={{ marginLeft: "16px" }}>
                Edit
              </Button>
            )}
            {fieldToEdit === null && (
              <Button
                variant="text"
                color="primary"
                style={{ marginLeft: "16px" }}
                onClick={() => handleEditField("description")}
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderOutOfStock = () => {
    const fieldName = "out_of_stock";
    const isEditing = fieldToEdit === fieldName;
    const value = isEditing
      ? editedFieldsList[fieldName]
      : editedField[fieldName];

    return (
      <div style={{ ...valueStyle, display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                name="out_of_stock"
                value={value || false}
                onChange={handleInputChange}
                style={{ flex: "1" }}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                style={{ marginLeft: "8px" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleCloseDialog}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              {value ? "True" : "False"}
              {!fieldToEdit && (
                <Button
                  variant="text"
                  color="primary"
                  style={{ marginLeft: "auto" }}
                  onClick={() => handleEditField(fieldName)}
                >
                  Edit
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCategory = () => {
    const fieldName = "category";
    const isEditing = fieldToEdit === fieldName;
    const initialValue = editedField[fieldName];
    const value = isEditing ? editedFieldsList[fieldName] : initialValue; // Use categoryName as initial value

    const handleCategoryChange = (event) => {
      const newCategoryId = event.target.value; // Assuming event.target.value contains the objectId of the selected category
      setEditedFieldsList((prev) => ({
        ...prev,
        [fieldName]: newCategoryId, // Store the category objectId instead of the name
      }));
    };

    const fieldWrapperStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // To place the "Edit" button on the right
    };

    const editButtonStyle = {
      marginLeft: "16px",
    };

    if (isEditing) {
      return (
        <div style={fieldWrapperStyle}>
          <Select
            name="category"
            value={value || ""} // Ensure the correct value is set here
            onChange={handleCategoryChange}
            style={{ flex: "1" }}
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginLeft: "8px" }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseDialog}
            style={{ marginLeft: "8px" }}
          >
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <div style={fieldWrapperStyle}>
          {initialValue}
          {!fieldToEdit && (
            <Button
              variant="text"
              color="primary"
              style={editButtonStyle}
              onClick={() => handleEditField(fieldName)}
            >
              Edit
            </Button>
          )}
        </div>
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography>Edit</Typography>
      </DialogTitle>
      <DialogContent style={{ minWidth: "400px" }}>
        <List>
          {Object.keys(editedField).map((key) => (
            <ListItem key={key} style={listItemStyle}>
              <Typography style={keyStyle}>{key}:</Typography>
              {key === "sizes" ? (
                <div style={valueStyle}>
                  {renderSizesList(editedField[key])}
                </div>
              ) : key === "colors" ? (
                <div style={valueStyle}>
                  {renderColorsList(editedField[key])}
                </div>
              ) : key === "in_the_box" ? (
                <div style={valueStyle}>
                  {renderIntheBoxList(editedField[key])}
                </div>
              ) : key === "images" ? (
                <div style={valueStyle}>{renderImages(editedField[key])}</div>
              ) : key === "description" ? (
                <div style={valueStyle}>
                  {renderDescription(editedField[key])}
                </div>
              ) : key === "out_of_stock" ? (
                <div style={valueStyle}>
                  {renderOutOfStock(editedField[key])}
                </div>
              ) : key === "category" ? (
                <div style={valueStyle}>{renderCategory(editedField[key])}</div>
              ) : (
                <div style={valueStyle}>
                  {renderEditObjectField({ [key]: editedField[key] })}
                </div>
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
