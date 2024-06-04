const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one product by its `id`
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, category_id, tagIds } = req.body;
    const productData = await Product.create({ product_name, price, stock, category_id });

    if (tagIds && tagIds.length) {
      const productTagIdArr = tagIds.map((tag_id) => {
        return { product_id: productData.id, tag_id };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { product_name, price, stock, category_id, tagIds } = req.body;

    await Product.update({ product_name, price, stock, category_id }, {
      where: { id: req.params.id },
    });

    if (tagIds && tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return { product_id: req.params.id, tag_id };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
