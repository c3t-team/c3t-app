const  rules = {
  customer: {
    routes: [
      {
        component: "CartPage",
        url: "/cart"
      },
      {
        component: "InfoPurchasePage",
        url: "/product/purchase"
      },
      {
        component: "ProductDetailPage",
        url: "/product-detail/:id"
      },
      {
        component: "ProfilePage",
        url: "/my-acount"
      },
      {
        component: "IntroducePage",
        url:"/introduce"
      },
      {
        component: "CustomHomePage",
        url:"/"
      },
      {
        component: "CustomHomePage",
        url:"**"
      }
    ]
  }
};

export default rules;