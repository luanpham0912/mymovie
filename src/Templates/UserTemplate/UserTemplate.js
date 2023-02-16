import { Route } from "react-router-dom";
import Slider from "react-slick";
import HomeCarousel from "../HomeTemplate/Layout/HomeCarousel/HomeCarousel";







export const UserTemplate = (props) => {
    const { Component, ...restProps } = props;




    return <Route {...restProps} render={(propsRoute) => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return <section className="h-screen w-full fixed">
            <div className=" h-full text-gray-800">
                <div className="flex gap-5  md:justify-between justify-center items-center flex-wrap h-full g-6">


                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <Component  {...propsRoute} />
                    </div>




                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 w-0 h-1/2 md:mb-0">
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" /> */}
                                  <HomeCarousel />
                    </div>

                </div>
            </div>
        </section>






















    }} />
}