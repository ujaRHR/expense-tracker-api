import Category from "../../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(
      { userId: req.user._id },
      { userId: 0, __v: 0 }
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: { categories },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const categoryInfo = async (req, res) => {
  try {
    const category = await Category.findOne(
      { userId: req.user._id, _id: req.params.categoryId },
      { userId: 0, __v: 0 }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: { category },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const categoryName =
      typeof req.body.name === "string" && req.body.name.length >= 1
        ? req.body.name
        : null;

    const existingCategory = await Category.findOne({
      userId: req.user._id,
      name: categoryName,
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "The category already exist",
      });
    }

    const category = await Category.create({
      userId: req.user._id,
      name: categoryName,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Failed to create new category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: { category },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const existingCategory = await Category.findOne({
      userId: req.user._id,
      _id: categoryId,
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "This category doesn't exist",
      });
    }

    const deleted = await Category.deleteOne({
      userId: req.user._id,
      _id: categoryId,
    });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Failed to delete the category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const newName =
      typeof req.body.name === "string" && req.body.name.length >= 1
        ? req.body.name
        : null;

    if (!newName) {
      return res.status(400).json({
        success: false,
        message: "Invalid category name",
      });
    }

    const existingCategory = await Category.findOne({
      userId: req.user._id,
      _id: categoryId,
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "This category doesn't exist",
      });
    }

    const updated = await Category.updateOne(
      { userId: req.user._id, _id: categoryId },
      { name: newName }
    );

    if (updated.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Category name is the same or failed to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};
