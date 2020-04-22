import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';

import rootReducer from 'store/reducers';

export default function configureStore(state = {}) {
    return createStore(rootReducer, state, devToolsEnhancer());
}
