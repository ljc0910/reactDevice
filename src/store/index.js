import store from './store.js';
import { addDevice,deleteDevice }  from './actions/device-actions';
import { updata } from './actions/updata-actions' 
// console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// store.dispatch(addToCart('Coffee 500gm', 1, 250));
// store.dispatch(addToCart('Flour 1kg', 2, 110));
// store.dispatch(addToCart('Juice 2L', 1, 250));
// store.dispatch(updateCart('Flour 1kg', 5, 110));

// store.dispatch(addDevice())
// store.dispatch(deleteDevice())

// Delete from Cart
// store.dispatch(deleteFromCart('Coffee 500gm'));
unsubscribe();