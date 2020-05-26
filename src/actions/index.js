import * as Types from "../constants/actionType";
import callApi from "../utils/apiCaller";

export const actloginRequest = login => {
  return dispatch => {
    return callApi("auth/login", "POST", login)
      .then(res => {
        res.data.status == 1
          ? dispatch(actlogin(res.data.payload))
          : dispatch(actlogin({}));
      })
      .catch(err => console.log("err:", err));
  };
};

export const actlogin = login => {
  return {
    type: Types.LOGIN,
    login
  };
};

export const actSignRequest = sign => {
  return dispatch => {
    return callApi("users", "POST", sign)
      .then(res => {
        res.data.status == 1
          ? dispatch(actSign(res.data.payload))
          : dispatch(actSign({}));
      })
      .catch(err => console.log("err:", err));
  };
};

export const actSign = sign => {
  return {
    type: Types.SIGN,
    sign
  };
};

// export const actGetCustomerRequest = () => {
//   return dispatch => {
//     return callApi(
//       "users?page=&per_page=&_return_fields=email%2Cname%2Cpassword%2CfacebookId%2Croles%2Cphone%2Caddress%2CshipAddresses%2CfavoriteProducts",
//       "GET"
//     )
//       .then(res => {
//         res.data.status == 1
//           ? dispatch(actCustomer(res.data.payload))
//           : dispatch(actCustomer([]));
//       })
//       .catch(err => console.log("err:", err));
//   };
// };

export const actGetCustomerRequest = () => {
  return dispatch => {
    return callApi("users/customers", "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(actCustomer(res.data.payload))
          : dispatch(actCustomer([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const actGetEmployeeRequest = () => {
  return dispatch => {
    return callApi("users/employees", "GET")
      .then(res => {
        console.log("employee ne ban res", res);
        res.data.status == 1
          ? dispatch(actCustomer(res.data.payload))
          : dispatch(actCustomer([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcSearchUserRequets = (filter, kind) => {
  return dispatch => {
    return callApi(`users/search?q=${filter}&k=${kind}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(actCustomer(res.data.payload))
          : dispatch(actCustomer([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcDeleteCustomerRequest = id => {
  return dispatch => {
    return callApi("users", "DELETE", `{"id": "${id}"}`)
      .then(res => {
        dispatch(actGetCustomerRequest());
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcDeleteEmployeeRequest = id => {
  return dispatch => {
    return callApi("users", "DELETE", `{"id": "${id}"}`)
      .then(res => {
        dispatch(actGetEmployeeRequest());
      })
      .catch(err => console.log("err:", err));
  };
};

export const actCustomer = customers => {
  return {
    type: Types.GET_CUSTOMERS,
    customers: customers
  };
};

export const actCategory = categories => {
  return {
    type: Types.GET_CATEGORYS,
    categories: categories
  };
};
export const atcGetCategoryRequest = () => {
  return dispatch => {
    return callApi("categories/group", "GET")
      .then(res => {
        try {
          res.data.status == 1
            ? dispatch(actCategory(res.data.payload))
            : dispatch(actCategory([]));
        } catch {
          console.log("erro");
        }
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcDeleteCaregoryRequest = id => {
  return dispatch => {
    return callApi("categories", "DELETE", `{"id": "${id}"}`)
      .then(res => {
        dispatch(atcGetCategoryRequest());
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcCreateCaregoryRequest = category => {
  return dispatch => {
    return callApi("categories", "POST", category)
      .then(res => {
        dispatch(atcGetCategoryRequest());
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcUpdateCaregoryRequest = (id, category) => {
  return dispatch => {
    return callApi(`categories/${id}`, "PUT", category)
      .then(res => {
        dispatch(atcGetCategoryRequest());
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcGetProductSale = () => {
  return dispatch => {
    return callApi("products/products-sale").then(res => {
      res.data.status == 1
        ? dispatch(atcGetProducts(res.data.payload))
        : dispatch(atcGetProducts([]));
    });
  };
};
export const atcGetProducts = products => {
  return {
    type: Types.GET_PRODUCTS,
    products: products
  };
};

export const atcGetProduct = product => {
  return {
    type: Types.GET_PRODUCT,
    product: product
  };
};


export const atcGetProductByCategoryMan = () => {
  return dispatch => {
    return callApi("products/product-man", "GET").then(res => {
      console.log("tesst product man", res);
      res.data.status == 1
        ? dispatch(atcGetProducts(res.data.payload))
        : dispatch(atcGetProducts([]));
    });
  };
};

export const atcGetProductByCategoryWomen = () => {
  return dispatch => {
    return callApi("products/product-women", "GET").then(res => {
      console.log("tesst product wwoment", res);
      res.data.status == 1
        ? dispatch(atcGetProducts(res.data.payload))
        : dispatch(atcGetProducts([]));
    });
  };
};
export const atcGetProductRequest = id => {
  return dispatch => {
    return callApi(`products/${id}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetProduct(res.data.payload))
          : dispatch(atcGetProduct([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcAddDetailItemProductRequets = (id, detail) => {
  return dispatch => {
    return callApi(`products/add-detail-item/${id}`, "PUT", detail)
      .then(res => {})
      .catch(err => {
        console.log("lỗi", err);
      });
  };
};

export const atcUpdateDetailItemProductRequets = (id, idItem, inventoryAdd) => {
  return dispatch => {
    return callApi(
      `products/update-detail-item/${id}`,
      "PUT",
      `{"id": "${idItem}", "inventory":"${inventoryAdd}"}`
    )
      .then(res => {})
      .catch(err => {
        console.log("lỗi", err);
      });
  };
};
export const atcGetProductsRequest = (activity) => {
  return dispatch => {
    return callApi(`products?activity=${activity}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetProducts(res.data.payload))
          : dispatch(atcGetProducts([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const actGetProductByFilter = (categories, price) => {
  return dispatch => {
    console.log("categories1", categories);
    if (categories && price) {
      console.log("categories2", categories);
      return callApi(`products/filter?categories=${categories}&price=${price}`)
        .then(res => {
          res.data.status == 1
            ? dispatch(atcGetProducts(res.data.payload))
            : dispatch(atcGetProducts([]));
        })
        .catch(err => {
          dispatch(atcGetProductsRequest(true));
        });
    } else {
      if (categories) {
        console.log("categories3", categories);
        return callApi(`products/filter?categories=${categories}`)
          .then(res => {
            res.data.status == 1
              ? dispatch(atcGetProducts(res.data.payload))
              : dispatch(atcGetProducts([]));
          })
          .catch(err => {
            dispatch(atcGetProductsRequest(true));
          });
      } else {
        if (price) {
          console.log("categories4", categories);
          return callApi(`products/filter?price=${price}`)
            .then(res => {
              res.data.status == 1
                ? dispatch(atcGetProducts(res.data.payload))
                : dispatch(atcGetProducts([]));
            })
            .catch(err => {
              dispatch(atcGetProductsRequest(true));
            });
        } else {
          console.log("categories5", categories);
          dispatch(atcGetProductsRequest(true));
        }
      }
    }
  };
};
export const atcCreateProductRequest = product => {
  console.log("product:", product);
  return dispatch => {
    return callApi("products", "POST", product)
      .then(res => {
        dispatch(atcGetProductsRequest(false));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcDeleteProductRequest = id => {
  return dispatch => {
    return callApi("products", "DELETE", `{"id": "${id}"}`)
      .then(res => {
        dispatch(atcGetProductsRequest(false));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcUpdateProductRequest = (id, product) => {
  return dispatch => {
    return callApi(`products/${id}`, "PUT", product)
      .then(res => {
        dispatch(atcGetProductsRequest(false));
      })
      .catch(err => {
        console.log("lỗi", err);
      });
  };
};

export const atcGetDetailProductRequest = id => {
  return async dispatch => {
    return await callApi(`products/detail/${id}`, "GET");
  };
};

export const atcGetDetailProduct = detailProduct => {
  return {
    type: Types.GET_DETAIL_PRODUCT,
    detailProduct: detailProduct
  };
};

export const atcSearchProductRequest = filter => {
  return dispatch => {
    return callApi(`products/search?q=${filter}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetProducts(res.data.payload))
          : dispatch(atcGetProducts([]));
      })
      .catch(err => console.log("err:", err));
  };
};
export const atcGetSupliers = supliers => {
  return {
    type: Types.GET_SUPLIERS,
    supliers: supliers
  };
};

// export const atcCreateOrderSuplierRequest = order => {
//   return dispatch => {
//     return callApi("order-suplier", "POST", order)
//       .then(res => {
//         res.data.status == 1
//           ? dispatch(atcSuccess("Tạo hóa đơn thành công!"))
//           : dispatch(atcFail("Tạo đơn hàng không thành công!"));
//       })
//       .catch(err => dispatch(atcFail("Tạo đơn hàng không thành công!")));
//   };
// };

export const atcCreateOrderSuplierRequest = order => {
  return dispatch => {
    return callApi("order-suplier", "POST", order)
  };
};


export const atcGetDetailOrderSuplierRequest = id => {
  return dispatch => {
    return callApi(`order-suplier/${id}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetDetailOrderSuplier(res.data.payload))
          : dispatch(atcGetDetailOrderSuplier({}));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcChangeStatusOrderSuplier = (id, status) => {
  return dispatch => {
    return callApi(
      `order-suplier/approve/${id}`,
      "PUT",
      `{"status": "${status}"}`
    )
      .then(res => {
        console.log("update duyet", res.data.payload);
      })
      .catch(err => {
        console.log("err:", err);
      });
  };
};

export const atcGetDetailOrderSuplier = order => {
  return {
    type: Types.GET_DETAIL_ORDER_SUPLIER,
    detailOrderSuplier: order
  };
};

export const atcDeleteOrderSuplier = id => {
  return dispatch => {
    return callApi(`order-suplier`, "DELETE", `{"id": "${id}"}`)
      .then(res => {
        dispatch(atcGetOrderSuplierRequest());
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcGetOrderSuplierRequest = filter => {
  return dispatch => {
    return callApi(`order-suplier?filter=&${filter}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetOrderSuplier(res.data.payload))
          : dispatch(atcGetOrderSuplier([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcGetOrderSuplier = orders => {
  return {
    type: Types.GET_ORDERS_SUPLIER,
    ordersSuplier: orders
  };
};

export const atcGetSuplier = suplier => {
  return {
    type: Types.GET_SUPLIER,
    suplier: suplier
  };
};

export const atcGetSuplierRequest = () => {
  return dispatch => {
    return callApi("brands", "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetSupliers(res.data.payload))
          : dispatch(atcGetSupliers([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcGetSuplierByIdRequest = id => {
  return dispatch => {
    return callApi(`brands/${id}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetSuplier(res.data.payload))
          : dispatch(atcGetSuplier([]));
      })
      .catch(err => console.log("err:", err));
  };
};
export const atcSearchSuplierRequest = filter => {
  return dispatch => {
    return callApi(`brands/search?q=${filter}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetSupliers(res.data.payload))
          : dispatch(atcGetSupliers([]));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcUpdateSuplierRequest = (id, data) => {
  return dispatch => {
    return callApi(`brands/${id}`, "PUT", data).then(res => {
      dispatch(atcGetSuplierRequest());
    });
  };
};
export const atcCreateSuplierRequest = suplier => {
  return dispatch => {
    return callApi("brands", "POST", suplier)
      .then(res => {
        dispatch(atcGetSuplierRequest());
      })
      .catch(err => console.log("err:", err));
  };
};
export const atcDeleteSuplierRequest = id => {
  return dispatch => {
    return callApi(`brands/${id}`, "DELETE")
      .then(res => {
        dispatch(atcGetSuplierRequest());
      })
      .catch(err => console.log("err:", err));
  };
};
export const atcCreateProdctSuplierRequest = (id, productId) => {
  return dispatch => {
    return callApi(
      `brands/add-product/${id}`,
      "PUT",
      `{"addProductId": "${productId}"}`
    )
      .then(res => {
        dispatch(atcGetProductSuplierRequest(id));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcGetProductSuplier = productSupliers => {
  return {
    type: Types.GET_PRODUCT_SUPLIER,
    productSupliers: productSupliers
  };
};

export const atcGetProductSuplierRequest = id => {
  return dispatch => {
    return callApi(`brands/list-product/${id}`, "GET")
      .then(res => {
        var products = [];
        if (res.data.payload && res.data.payload.products.length > 0) {
          products = res.data.payload.products;
        }
        dispatch(atcGetProductSuplier(products));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcDeletProductSuplierRequest = (id, productId) => {
  return dispatch => {
    return callApi(
      `brands/remove-product/${id}`,
      "PUT",
      `{"removeProductId": "${productId}"}`
    )
      .then(res => {
        dispatch(atcGetProductSuplierRequest(id));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcMakeOrderCustomer = order => {
  return dispatch => {
    return callApi("orders", "POST", order).then(res => {
      console.log("order make", order);
    });
  };
};

export const atcRemoveProductItemInOrderRequest = (orderId, itemId, userId) => {
  return dispatch => {
    return callApi(
      `orders/product-item/${orderId}`,
      "PUT",
      `{"idItem":"${itemId}"}`
    )
      .then(res => {
        console.log("remove order item", res);
        return dispatch(atcGetOrderCustomersRequest(userId));
      })
      .catch(err => {
        console.log(" catch remove order item", err);
      });
  };
};
export const atcGetListOrderRequest = () => {
  return dispatch => {
    return callApi("orders", "GET").then(res => {
      res.data.status == 1
        ? dispatch(atcGetListOrder(res.data.payload))
        : dispatch(atcGetListOrder([]));
    });
  };
};

export const atcDeleteOrder = id => {
  return dispatch => {
    return callApi(`orders/${id}`, "DELETE").then(res => {
      dispatch(atcGetListOrderRequest());
    });
  };
};
export const atcGetOrderCustomersRequest = id => {
  return dispatch => {
    return callApi(`orders/user/${id}`, "GET").then(res => {
      console.log("res order1111", res);
      console.log("id nenn", id);
      res.data.status == 1
        ? dispatch(atcGetOrderCustomer(res.data.payload))
        : dispatch(atcGetOrderCustomer([]));
    });
  };
};

export const atcGetOrderRequest = id => {
  return dispatch => {
    return callApi(`orders/${id}`, "GET").then(res => {
      console.log("res order", res);
      console.log("id nenn", id);
      res.data.status == 1
        ? dispatch(atcGetOrder(res.data.payload))
        : dispatch(atcGetOrder([]));
    });
  };
};

export const atcGetOrderCustomer = orders => {
  return {
    type: Types.GET_ORDER_CUSTOMERS,
    orders: orders
  };
};

export const atcGetListOrder = orders => {
  return {
    type: Types.GET_ORDERS,
    orders: orders
  };
};

export const atcGetOrder = order => {
  return {
    type: Types.GET_ORDER,
    order: order
  };
};
export const atcChangeRoleRequest = (id, role) => {
  return dispatch => {
    callApi(`users/role/${id}`, "PUT", `{"role": "${role}"}`)
      .then(res => {})
      .catch(err => console.log("err:", err));
  };
};

export const atcGetUserByIdRequest = id => {
  return dispatch => {
    return callApi(`users/${id}`, "GET")
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetUserById(res.data.payload))
          : dispatch(atcGetUserById({}));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcGetCurentUserRequest = token => {
  return dispatch => {
    return callApi("users/current-user", "POST", `{"token": "${token}"}`)
      .then(res => {
        res.data.status == 1
          ? dispatch(atcGetCurrentUser(res.data.payload))
          : dispatch(atcGetCurrentUser({}));
      })
      .catch(err => console.log("err:", err));
  };
};

export const atcUpdateUserRequest = (id, user) => {
  return dispatch => {
    return callApi(`users/${id}`, "PUT", user)
      .then(res => {
        console.log("update user", res);
        console.log("user", user);
      })
      .catch(err => console.log("err:", err));
  };
};

export const uploadAvatar = image => {
  return dispatch => {
    const data = new FormData();
    data.append("image", image);
    return callApi("uploads/images/single", "POST", data).then(res => {});
  };
};
export const atcGetUserById = user => {
  return {
    type: Types.GET_USER,
    user: user
  };
};
export const atcGetCurrentUser = infoUser => {
  return {
    type: Types.GET_CURRENT_USER,
    infoUser: infoUser
  };
};

export const atcAddToCart = count => {
  return {
    type: Types.COUNT_CARTS,
    count: count
  };
};

export const atcTotalPrice = price => {
  return {
    type: Types.TOTAL_PRICE,
    price: price
  };
};

export const atcAddProductFavourite = data => {
  return dispatch => {
    return callApi("users/favorited-product", "PUT", data).then(res => {
      console.log("faoutite", res);
    });
  };
};

export const atcGetFavoriteProductsRequest = userId => {
  return dispatch => {
    return callApi(`users/favorite-products/${userId}`, "GET").then(res => {
      res.data.status == 1
        ? dispatch(atcGetFavoriteProducts(res.data.payload))
        : dispatch(atcGetFavoriteProducts([]));
    });
  };
};

export const atcRemoveFavoriteProduct = (userId, productId) => {
  return dispatch => {
    return callApi(
      `users/favorite-products/${userId}`,
      "DELETE",
      `{"productId": "${productId}"}`
    ).then(res => {
      res.data.status == 1
        ? dispatch(atcGetFavoriteProducts(res.data.payload))
        : dispatch(atcGetFavoriteProducts([]));
    });
  };
};
export const atcGetFavoriteProducts = favoriteProducts => {
  return {
    type: Types.GET_FAVORITE_PRODUCTS,
    favoriteProducts: favoriteProducts
  };
};

export const atcChangeStatusOrderRequest = (orderId, status) => {
  return dispatch => {
    return callApi(
      `orders/status/${orderId}`,
      "PUT",
      `{"status":"${status}"}`
    ).then(res => {
      console.log("sttaus order", res);
      return dispatch(atcGetListOrderRequest());
    });
  };
};

export const atcUpdateAmountSold = (productId, color, size, quantity) => {
  return dispatch => {
    return callApi(
      `products/amount-sold/${productId}`,
      "PUT",
      `{"color": "${color}","size": "${size}", "quantity":"${quantity}" }`
    ).then(res => {
      console.log("aiji", res);
    });
  };
};

export const atcSuccess = message => {
  return {
    type: Types.SUCCESS,
    message: {
      status: true,
      message: message
    }
  };
};

export const atcFail = message => {
  return {
    type: Types.FAIL,
    message: {
      status: true,
      message: message
    }
  };
};

export const atcPriceAndInventoryAll = (priceAll, inventoryAll) => {
  return {
    type: Types.PRICEANDINVENTORYALL,
    priceAndInventoryAll: {
      priceAll: priceAll,
      inventoryAll: inventoryAll
    }
  };
};

export const atcCheckIsSave = (status)=>{
  return {
    type: 'SAVEORDER',
    status: status

  }
}