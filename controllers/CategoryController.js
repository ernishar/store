const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

exports.createCategory = async (req, res) => {
  const { categoryName } = req.body;
  console.log(categoryName);

  const createdBy = req.user.userId;

  if (!categoryName) {
    return res.status(400).json({ message: "categoryName is required" });
  }

  try {
    const categoryExists = await sequelize.query(
      `SELECT categoryName FROM categories WHERE categoryName = :categoryName AND createdBy = :createdBy`,
      {
        replacements: { categoryName, createdBy },
        type: QueryTypes.SELECT,
      }
    );

    if (categoryExists.length) {
      return res.status(400).json({ message: "category already exists" });
    }

    await sequelize.query(
      "INSERT INTO categories (categoryName, createdBy) VALUES (:categoryName, :createdBy)",
      {
        replacements: { categoryName, createdBy },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCategoryByUser = async (req, res) => {
  const createdBy = req.user.userId;
  const userRole = req.user.roleName;
  let categoryResult;

  try {
    if (userRole === "admin") {
      categoryResult = await sequelize.query(`SELECT * FROM categories`, {
        type: QueryTypes.SELECT,
      });
    } else {
      categoryResult = await sequelize.query(
        `SELECT * FROM categories WHERE createdBy = :createdBy`,
        {
          replacements: { createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (!categoryResult.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res
      .status(200)
      .json({ message: "success", categories: categoryResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  //Get the categoryName from the request
  const { categoryName } = req.body;

  //Get the categoryId from the request
  const { categoryId } = req.params;

  //Get the userId from the request
  const createdBy = req.user.userId;

  //Get the role of the user from  the request
  const userRole = req.user.roleName;

  if (!categoryName) {
    return res.status(400).json({ message: "categoryName is required" });
  }

  try {
    const category = await sequelize.query(
      `SELECT * FROM categories WHERE categoryId = :categoryId`,
      {
        replacements: { categoryId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (userRole !== "admin" && category[0].createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await sequelize.query(
      `UPDATE categories SET categoryName = :categoryName WHERE categoryId = :categoryId`,
      {
        replacements: { categoryName, categoryId },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  //Get the categoryId from the params
  const { categoryId } = req.params;

  //Get the userId from the request
  const createdBy = req.user.userId;

  //Get the role of the user from  the request
  const userRole = req.user.roleName;

  try {
    const category = await sequelize.query(
      `SELECT * FROM categories WHERE categoryId = :categoryId`,
      {
        replacements: { categoryId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    //Check if the user is not an admin and the category was not created by the user
    if (userRole !== "admin" && category[0].createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the category
    await sequelize.query(
      `DELETE FROM categories WHERE categoryId = :categoryId`,
      {
        replacements: { categoryId },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

