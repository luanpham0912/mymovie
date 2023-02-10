import React from 'react'
import {useSelector} from 'react-redux'
import './Loading.css'

export default function Loading(props) {
    const {isLoading} = useSelector(state => state.LoadingReducer)
    return (
        <div className={`${isLoading ? ' fixed w-screen h-screen z-50' : "hidden"}`}>
            <div className='fixed w-screen h-screen' style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.9) 80%)", backdropFilter: "grayscale(10%) blur(10px)" }}>
                <div className='w-1/2 h-1/2 relative top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2' >
                    <img className='mx-auto w-1/2' src={require('./test.gif')} alt='movie'/>
                </div>
            </div>

        </div>
    )
}
