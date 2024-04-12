const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

exports.createProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, categoryName } = req.body;
    const createdBy = req.user.userId;
    const productImages = req.files
      ? req.files.map((file) => file.filename)
      : null;

    // Validate required fields
    if (
      !productName ||
      !productDesc ||
      !productPrice ||
      !createdBy ||
      !productImages
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find or create category
    const [category] = await sequelize.query(
      `SELECT categoryId FROM categories WHERE categoryName = :categoryName AND createdBy = :createdBy`,
      {
        replacements: { categoryName, createdBy },
        type: QueryTypes.SELECT,
      }
    );

    let categoryId = category?.categoryId;

    if (!categoryId) {
      // Create new category if not found
      await sequelize.query(
        `INSERT INTO categories (categoryName, createdBy) VALUES (:categoryName, :createdBy)`,
        {
          replacements: { categoryName, createdBy },
          type: QueryTypes.INSERT,
        }
      );

      const [category] = await sequelize.query(
        `SELECT categoryId FROM categories WHERE categoryName = :categoryName AND createdBy = :createdBy`,
        {
          replacements: { categoryName, createdBy },
          type: QueryTypes.SELECT,
        }
      );

      categoryId = category?.categoryId;
      console.log(categoryId);
    }

    // Create product
    await sequelize.query(
      `INSERT INTO products (productName, productDesc, productPrice, categoryId, createdBy, productImages) VALUES (:productName, :productDesc, :productPrice, :categoryId, :createdBy, :productImages)`,
      {
        replacements: {
          productName,
          productDesc,
          productPrice,
          categoryId,
          createdBy,
          productImages: JSON.stringify(productImages),
        },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProductsByUser = async (req, res) => {
  const createdBy = req.user.userId;
  const userRole = req.user.roleName;
  let productResult;

  try {
    if (userRole === "admin") {
      productResult = await sequelize.query(
        `SELECT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId`,
        {
          type: QueryTypes.SELECT,
        }
      );
    } else {
      productResult = await sequelize.query(
        `SELECT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId WHERE p.createdBy = :createdBy`,
        {
          replacements: { createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (!productResult.length) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "success", products: productResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  //Get the product details from the request
  const { productName, productDesc, productPrice, categoryName } = req.body;

  // Get product images from the request
  const productImages = req.files
    ? req.files.map((file) => file.filename)
    : null;

  //Get the productId from the request
  const { productId } = req.params;

  //Get the userId from the request
  const createdBy = req.user.userId;

  console.log("createdBy", createdBy);

  //Get the role of the user from  the request
  const userRole = req.user.roleName;

  if (!productName || !productDesc || !productPrice || !categoryName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [product] = await sequelize.query(
      `SELECT * FROM products WHERE productId = :productId`,
      {
        replacements: { productId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    console.log("product", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (userRole !== "admin" && product.createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    // Find or create category
    const [category] = await sequelize.query(
      `SELECT categoryId FROM categories WHERE categoryName = :categoryName AND createdBy = :createdBy`,
      {
        replacements: { categoryName, createdBy },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let categoryId = category?.categoryId;

    // Create new category if not found
    if (!categoryId) {
      const [newCategory] = await sequelize.query(
        `INSERT INTO categories (categoryName, createdBy) VALUES (:categoryName, :createdBy) RETURNING categoryId`,
        {
          replacements: { categoryName, createdBy },
          type: sequelize.QueryTypes.INSERT,
        }
      );
      categoryId = newCategory?.categoryId;
    }

    // Update product
    await sequelize.query(
      `UPDATE products SET productName = :productName, productDesc = :productDesc, productPrice = :productPrice, productImages = :productImages WHERE productId = :productId`,
      {
        replacements: {
          productName,
          productDesc,
          productPrice,
          productImages: JSON.stringify(productImages),
          productId,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.searchProduct = async (req, res) => {
  // Get the search query from req.params
  const searchQuery = req.query.search;
  const createdBy = req.user.userId;
  const userRole = req.user.roleName;
  let productResult = [];

  try {
    if (userRole === "admin") {
      productResult = await sequelize.query(
        `SELECT DISTINCT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId WHERE LOWER(p.productName) LIKE :searchQuery OR LOWER(p.productDesc) LIKE :searchQuery`,
        {
          replacements: { searchQuery: `%${searchQuery}%` },
          type: QueryTypes.SELECT,
        }
      );
    } else {
      productResult = await sequelize.query(
        `SELECT DISTINCT p.productId, p.productName, p.productDesc, p.productPrice, p.productImages, c.categoryName FROM products AS p LEFT JOIN categories AS c ON p.categoryId = c.categoryId WHERE (LOWER(p.productName) LIKE :searchQuery OR LOWER(p.productDesc) LIKE :searchQuery) AND p.createdBy = :createdBy`,
        {
          replacements: { searchQuery: `%${searchQuery}%`, createdBy },
          type: QueryTypes.SELECT,
        }
      );
    }

    if (productResult.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res
      .status(200)
      .json({ message: "success", products: productResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  //Get the productId from the params
  const { productId } = req.params;

  //Get the userId from the request
  const createdBy = req.user.userId;

  //Get the role of the user from  the request
  const userRole = req.user.roleName;

  try {
    const product = await sequelize.query(
      `SELECT * FROM products WHERE productId = :productId`,
      {
        replacements: { productId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Check if the user is not an admin and the product was not created by the user
    if (userRole !== "admin" && product[0].createdBy !== createdBy) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    //Delete the product
    await sequelize.query(`DELETE FROM products WHERE productId = :productId`, {
      replacements: { productId },
      type: sequelize.QueryTypes.DELETE,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
