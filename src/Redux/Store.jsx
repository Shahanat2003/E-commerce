import {configureStore} from '@reduxjs/toolkit'
import SignReducer from './ReduxSlice/SignSlice'
import LoginReducer  from './ReduxSlice/LoginSlice'
import productReducer from './ReduxSlice/ProductSlice'
import PrdctDetailsReducer from './ReduxSlice/ProductDetailsSlice'
import CartReducer from './ReduxSlice/AddtoCartSlice'
import userReducer from './ReduxSlice/GetUsersSlice'
import addProductReducer from './ReduxSlice/AddProductSlice'
import getProductReducer from './ReduxSlice/AllProductSlice'
import EditProductReducer from './ReduxSlice/EditProductSlice'
import OrderReducer from './ReduxSlice/GetOrderSlice'
import WishlistReducer  from './ReduxSlice/WishlistSlice'
// import CartFetch from './ReduxSlice/CartSlice'
const store=configureStore({
        reducer: {
            signUp: SignReducer,
            login:LoginReducer,
            product:productReducer,
            productDetails:PrdctDetailsReducer,
            addCart:CartReducer,
            // fetchCart:CartFetch,
            users:userReducer,
            addProduct:addProductReducer,
            allProduct:getProductReducer,
            editProduct:EditProductReducer,
            orders:OrderReducer,
            wishlist:WishlistReducer
            
          },

})
export default store