import { Route } from "react-router-dom";
import Slider from "react-slick";
import HomeCarousel from "../HomeTemplate/Layout/HomeCarousel/HomeCarousel";







export const UserTemplate = (props) => {
    const { Component, ...restProps } = props;




    return <Route {...restProps} render={(propsRoute) => {
       
        return <section className="h-screen w-full relative" style={{backgroundImage : "url('../img/supermario.jpg')", backgroundPosition : "center", backgroundSize : "cover"}}>
            <div className="absolute rounded-lg" style={{top:"50%",left : "50%" , transform : "translate(-50%,-50%)",width : "30%" , padding : "45px 30px" , borderTop : "1px solid rgba(255,255,255,.2)" , borderLeft : "1px solid rgba(255,255,255,.2)", backdropFilter : "blur(10px)",boxShadow : "10px 10px 30px rgba(0, 0, 0, .1)" }}>
                <Component  {...propsRoute} />
            </div>
        </section>

    }} />
}

/* 

            <div className=" h-full text-gray-800">
              
                <div className="flex gap-5  md:justify-between justify-center items-center flex-wrap h-full g-6">


                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <Component  {...propsRoute} />
                    </div>






                </div>
            </div>



*/