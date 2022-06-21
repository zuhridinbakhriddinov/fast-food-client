import React from 'react';
import * as actions from "../reducers/actionTypes"

const CartReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_TO_CART:
            // logic part
            const item = action.payload
            return [...state, item]
        default:
            return state;
    }
};

export default CartReducer;