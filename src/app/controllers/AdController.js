const Ad = require('../models/Ad');

class AdController {
  async index (req, res) {
    const { query: { page = 1, price_min, price_max, title } } = req;
    const filters = {};

    if (price_min || price_max) {
      filters.price = {};

      if (price_min) {
        // the $gte is used by mongoose
        filters.price.$gte = price_min;
      }

      if (price_max) {
        filters.price.$lte = price_max;
      }
    }

    if (title) {
      filters.title = new RegExp(title, 'i');
    }

    const ad = await Ad.paginate(filters, {
      limit: 20,
      page,
      sort: '-createdAt',
      // defines what relationship should be populated
      populate: ['author']
    });

    return res.json(ad);
  }

  async show (req, res) {
    const ad = await Ad.findById(req.params.id);

    return res.json(ad);
  }

  async store (req, res) {
    throw new Error();
    const ad = await Ad.create({
      ...req.body,
      author: req.userId
    });

    return res.json(ad);
  }

  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(ad);
  }

  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new AdController();
