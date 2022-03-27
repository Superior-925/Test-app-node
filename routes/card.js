const mongoose = require('mongoose');
const router = require('express').Router();
const Card = mongoose.model('Card');

router.post('/payment',
   async (req, res) => {
        try {
            const { cardNumber, expDate, cvv, amount } = req.body;
            if (!cardNumber || !expDate || !cvv || !amount) {
                return res.status(406).json({ message: `Empty data!`})
            }

            const foundCard = await Card.findOne({cardNumber: +cardNumber}).exec();

            if (foundCard) {
                return res.status(409).json({ message: `Card already exist!`})
            }

            const newCard = new Card({
                cardNumber: +cardNumber,
                expirationDate: expDate,
                cvv: +cvv,
                amount: +amount
            });
            await newCard.save();

            const respObj = {requestId: newCard._id, amount: newCard.amount};
            res.status(200).send(JSON.stringify(respObj));

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });

module.exports = router;
