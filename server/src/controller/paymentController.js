class PaymentController {
    static async GetStripeKey(req, res) {
        try {
            return res.status(200).json({
                message: "Loading public key success",
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Server Error" })
        }

    }
    static async CreateInTent(req, res) {
        try {
            const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
                apiVersion: "2022-11-15"
            })

            const { amount } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                currency: "usd",
                amount: amount,
                automatic_payment_methods: {
                    enabled: true
                }
            })

            return res.status(200).json({ client_secret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id, message: "Loading client_secret success" })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Server Error" })
        }
    }

    static async ConfirmPayment(req, res) {
        try {
            const { amount, price, name, description } = req.body.data;
            console.log(amount, price);
            if (!name || !description) {
                return res.status(400).json({ message: "Invalid name or description" });
            }

            if (!amount || !price || isNaN(amount) || isNaN(price)) {
                return res.status(400).json({ message: "Invalid amount or price" });
            }

            const quantity = parseInt(amount, 10);
            const unitAmount = parseFloat(price);

            if (quantity <= 0 || unitAmount <= 0) {
                return res.status(400).json({ message: "Amount and price must be greater than zero" });
            }

            const priceInCents = Math.round(unitAmount * 100);


            const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
                apiVersion: "2022-11-15"
            });

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: name,
                                description: description,
                            },
                            unit_amount: priceInCents,
                        },
                        quantity: quantity,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.DEPLOY_CLIENT_HOST}payment/success`,
                cancel_url: `${process.env.DEPLOY_CLIENT_HOST}payment/canceled`,
            });
            return res.status(200).json({
                success: true,
                data: session,
                message: "Payment successfully created"
            });
        } catch (error) {
            console.error('Error creating payment session:', error);
            return res.status(500).json({ message: "Server Error" });
        }
    }
    static async CheckSuccess(req, res) {
        try {
            console.log('Raw request body:', req.params); // Log the raw request body

            const { sessionId } = req.params;
            console.log('Parsed sessionId:', sessionId);
            const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
                apiVersion: "2022-11-15"
            });
            if (!sessionId) {
                return res.status(400).json({ success: 0, message: 'Session ID is required' });
            }

            const session = await stripe.checkout.sessions.retrieve(sessionId);
            console.log('Retrieved session:', session);

            if (session.payment_status === 'paid') {
                console.log(`Payment for session ${sessionId} was successful!`);
                return res.status(200).json({ success: 1, message: `Payment for session ${sessionId} was successful!` });
            } else {
                console.log(`Payment for session ${sessionId} was not successful.`);
                return res.status(404).json({ success: 0, message: `Payment for session ${sessionId} was not successful!` });
            }
        } catch (error) {
            console.error(`Failed to retrieve session: ${error.message}`);
            return res.status(500).json({ success: 0, message: `Failed to retrieve session: ${error.message}` });
        }
    }
}

exports.PaymentController = PaymentController