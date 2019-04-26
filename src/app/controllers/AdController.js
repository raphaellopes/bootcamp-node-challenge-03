const Ad = require('../models/Ad');
const Purchase = require('../models/Purchase');

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

    filters.purchasedBy = null;

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

  async accept_buy (req, res) {
    const { id: ad } = req.params;
    const purchase = await Purchase.findOne({ ad }).populate({
      path: 'ad'
    });

    if (!purchase.ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: "You're not the ad author" });
    }

    await Ad.findByIdAndUpdate(ad, { purchasedBy: purchase._id });

    return res.json(purchase);
  }
}

module.exports = new AdController();
