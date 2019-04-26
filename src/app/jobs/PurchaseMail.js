const Mail = require('../services/Mail');

class PurchaseMail {
  // uniq key for this job
  get key () {
    return 'PurchaseMail';
  }

  // sends the email
  async handle (job, done) {
    const { ad, user, content } = job.data;

    await Mail.sendMail({
      from: '"Raphael Lopes <ph.campanario07@gmail.com>"',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad: { ad } }
    });

    return done();
  }
}

module.exports = new PurchaseMail();
