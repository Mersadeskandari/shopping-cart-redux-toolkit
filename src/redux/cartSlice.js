// import { createSlice } from "@reduxjs/toolkit";
//
// const initialState = {
// 	cart: [],
// 	amount: 0,
// 	total: 0
// }
//
// export const cartSlice = createSlice({
// 	name: "cart",
// 	initialState,
// 	reducers: {
// 		addToCart: (state , action) => {
// 			state.cart = [...state.cart ,
// 				{...action.payload
// 					, amount: 1
// 					, rating: {...action.payload.rating , count: action.payload.rating.count - 1}}]
// 		},
// 		increase: (state , action) => {
// 			state.cart = state.cart.map(item => item.id === action.payload
// 				? {...item , amount: item.amount + 1 , rating: {...item.rating , count: item.rating.count - 1}}
// 				: item
// 			)
// 		},
// 		decrease: (state , action) => {
// 			state.cart = state.cart.map(item => item.id === action.payload
// 				? {...item , amount: item.amount - 1 , rating: {...item.rating , count: item.rating.count + 1}}
// 				: item
// 			).filter(item => item.amount !== 0)
// 		},
// 		clearCart: state => {
// 		  state.cart = []
// 		},
// 		removeFromCart: (state , action) => {
// 			state.cart = state.cart.filter(item => item.id !== action.payload)
// 		},
// 		//از toggleAmount بجای increase و decrease استفاده شده است
// 		toggleAmount : (state , action) => {
// 			state.cart = state.cart.map(item => {
// 				if (item.id === action.payload.id){
// 					if (action.payload.type === 'inc'){
// 						return {
// 							...item ,
// 							amount: item.amount + 1 ,
// 							rating: {...item.rating , count: item.rating.count - 1}
// 						}
// 					}
// 					if (action.payload.type === 'dec'){
// 						return {
// 							...item ,
// 							amount: item.amount - 1  ,
// 							rating: {...item.rating , count: item.rating.count + 1}
// 						}
// 					}
// 				}
// 				return item;
// 			}).filter(item => item.amount !== 0)
// 		},
// 		getTotalAmount: state => {
// 			let { totalAmount , totalPrice } = state.cart.reduce((acc , current) => {
// 				const {amount , price} = current
// 				const itemTotal = amount * price
//
// 				acc.totalAmount += amount
// 				acc.totalPrice += itemTotal
//
// 				return acc;
// 			} , {
// 				totalAmount: 0,
// 				totalPrice: 0
// 			})
//
// 			state.total = parseFloat(totalPrice.toFixed(2))
// 			state.amount = totalAmount
// 		}
// 	}
// })
//
//
// export const {
// 	removeFromCart ,
// 	addToCart ,
// 	increase,
// 	clearCart,
// 	decrease,
// 	toggleAmount,
// 	getTotalAmount
// } = cartSlice.actions
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
	amount: 0,
	total: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, { payload }) => {
			state.cart.push({
				...payload,
				amount: 1,
				rating: { ...payload.rating, count: payload.rating.count - 1 },
			});
		},

		increase: (state, { payload }) => {
			state.cart = state.cart.map((item) =>
				item.id === payload
					? {
						...item,
						amount: item.amount + 1,
						rating: { ...item.rating, count: item.rating.count - 1 },
					}
					: item
			);
		},

		decrease: (state, { payload }) => {
			state.cart = state.cart
				.map((item) =>
					item.id === payload
						? {
							...item,
							amount: item.amount - 1,
							rating: { ...item.rating, count: item.rating.count + 1 },
						}
						: item
				)
				.filter((item) => item.amount !== 0);
		},

		clearCart: (state) => {
			state.cart = [];
			state.amount = 0;
			state.total = 0;
		},

		removeFromCart: (state, { payload }) => {
			state.cart = state.cart.filter((item) => item.id !== payload);
		},

		toggleAmount: (state, { payload: { id, type } }) => {
			state.cart = state.cart
				.map((item) =>
					item.id === id
						? {
							...item,
							amount: type === "inc" ? item.amount + 1 : item.amount - 1,
							rating: {
								...item.rating,
								count: type === "inc"
									? item.rating.count - 1
									: item.rating.count + 1,
							},
						}
						: item
				)
				.filter((item) => item.amount !== 0);
		},

		getTotalAmount: (state) => {
			const { total, amount } = state.cart.reduce(
				(acc, { amount, price }) => {
					acc.amount += amount;
					acc.total += amount * price;
					return acc;
				},
				{ total: 0, amount: 0 }
			);

			state.total = Number(total.toFixed(2));
			state.amount = amount;
		},
	},
});

export const {
	addToCart,
	increase,
	decrease,
	clearCart,
	removeFromCart,
	toggleAmount,
	getTotalAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
