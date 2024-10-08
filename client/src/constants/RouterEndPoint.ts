enum RouterEndPoint {
  // HOME
  Home = "/home",

  // SERVICES

  // AUTH
  SignIn = "/sign-in",
  SignUp = "/sign-up",

  //DESTINATION
  Destinations = "/destinations",
  DestinationDetail = "/destinations/:name",

  // STAYS
  Stays = "/stays",
  StayDetail = "/stays/:name",

  // TRANSPORTS
  Transports = "/transports",

  // COUPONS
  Coupons = "/coupons",

  // BLOGS
  Blogs = "/blogs",
  BlogDetail = "/blogs/:title",

  //PAYMENT
  Payment = "/payment",
  PaymentCompletion = "/payment/success",
  PaymentStripe = "/payment-stripe"
}

export default RouterEndPoint
