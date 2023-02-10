import { SET_CAROUSEL_API } from "../Types/ConstQuanLyPhim/ConstQuanLyPhim"

const initState = {
    arrCarousel : [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
          },

    ]
}

export const CarouselReducer = (state = initState, action) => {
    switch(action.type) {
      case SET_CAROUSEL_API :{
        state.arrCarousel = action.arrCarousel
        return {...state}
      }
     default : return {...state}   
    }
}   



