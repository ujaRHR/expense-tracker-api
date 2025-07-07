import Category from "../../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(
      { user: req.user._id },
      { user: 0, __v: 0 }
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
      categories,
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
      {
        user: req.user._id,
        _id: req.params.categoryId,
      },
      { user: 0, __v: 0 }
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
      category,
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
    const categoryTitle =
      typeof req.body.title === "string" && req.body.title.length >= 1
        ? req.body.title
        : null;

    const existingCategory = await Category.findOne({
      user: req.user._id,
      title: categoryTitle,
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "The category already exist",
      });
    }

    const category = await Category.create({
      user: req.user._id,
      title: categoryTitle,
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
      category,
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
      user: req.user._id,
      _id: categoryId,
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "This category doesn't exist",
      });
    }

    const deleted = await Category.deleteOne({
      user: req.user._id,
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
    const newTitle =
      typeof req.body.title === "string" && req.body.title.length >= 1
        ? req.body.title
        : null;

    if (!newTitle) {
      return res.status(400).json({
        success: false,
        message: "Invalid category title",
      });
    }

    const existingCategory = await Category.findOne({
      user: req.user._id,
      _id: categoryId,
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "This category doesn't exist",
      });
    }

    const updated = await Category.updateOne(
      { user: req.user._id, _id: categoryId },
      { title: newTitle }
    );

    if (updated.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Category title is the same as before or failed to update",
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
