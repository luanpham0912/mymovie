import { Redirect, Route } from "react-router-dom";
import { USERLOGIN } from "../../Utils/ConstantDoMain/ConstantDomain";






export const CheckoutTemplate = (props)=>{
    const {Component,...restProps} = props;

    return <Route {...restProps} render={(propsRoute) =>{
        if(!localStorage.getItem(USERLOGIN)){
            return <Redirect to="/login"/>
        }
    
        return <>
     
         
            <Component  {...propsRoute} />
            

        </>
    }}/>
}