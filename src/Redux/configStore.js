import {combineReducers,applyMiddleware, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './Reducers/CarouselReducer';
import { LoadingReducer } from './Reducers/LoadingReducer';
import { QuanLyDatVeReducer } from './Reducers/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './Reducers/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './Reducers/QuanLyPhimCarousel';
import { QuanLyRapReducer } from './Reducers/QuanLyRapReducer';
import { QuanLyUsers } from './Reducers/QuanLyUsers';

const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    QuanLyUsers,
});


const store = createStore(rootReducer,applyMiddleware(thunk))
export default store