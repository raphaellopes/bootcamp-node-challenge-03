const Purchase = require('../models/Purchase');
const { errorMessage } = require('../utils');

class ApproveController {
  async update (req, res) {
    const { purchase } = req.params;
    const { ad } = await Purchase.findById(purchase).populate({
      path: 'ad'
    });

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json(errorMessage('You\'re not the ad author'));
    }

    if (ad.purchasedBy) {
      return res
        .status(400)
        .json(errorMessage('This Ad had already been purchased'));
    }

    ad.purchasedBy = purchase;

    return res.json(ad);
  }
}

module.exports = new ApproveController();
