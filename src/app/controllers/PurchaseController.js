const Ad = require('../models/Ad');
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const { PurchaseMail } = require('../jobs');
const Queue = require('../services/Queue');
const { errorMessage } = require('../utils');

class PurchaseController {
  async store (req, res) {
    const { body: { ad, content }, userId } = req;
    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(userId);

    if (await Purchase.findOne({ ad })) {
      return res
        .status(400)
        .json(errorMessage('This Ad had already been purchased'));
    }
    await Purchase.create({ ad, user: userId });

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save();

    return res.send('ok');
  }
}

module.exports = new PurchaseController();
