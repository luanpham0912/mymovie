import React, { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as _ from "lodash"
import { KetQuaDatVe } from '../../../../Pages/Checkout/Checkout'
import { TOKEN, USERLOGIN } from '../../../../Utils/ConstantDoMain/ConstantDomain'
import { history } from '../../../../App'
import { AutoComplete, Dropdown, Input, Space } from 'antd'
import { DownOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { LayDanhSachFilmAction } from '../../../../Redux/Actions/QuanLyPhimAction'


export default function Header(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()
    console.log(props)

    const items = [
        {
            key: '1',
            label: (
                <NavLink to='/profile'  >Thông tin</NavLink>
            ),

        },
        {
            key: '2',
            label: (
                <button
                    onClick={() => {
                        localStorage.removeItem(USERLOGIN)
                        localStorage.removeItem(TOKEN)

                        dispatch({
                            type: "DANG_XUAT"
                        })
                        history.push('/')
                    }}>
                    Đăng xuất
                </button>
            ),

        },

    ];

    const renderUser = () => {
        if (!_.isEmpty(userLogin)) {
            return <>

                <Dropdown
                    menu={{ items }}
                    overlayClassName=''

                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className=''>
                            <div className='ml-auto flex w-auto items-center '>
                                <div> <p className='mb-0 mr-1 font-thin text-sm text-white'>{userLogin.hoTen}</p> </div>
                                <div className='mx-2' >
                                    <img className='rounded-full  h-8' alt='avatar' src={`https://i.pravatar.cc/32?img=${userLogin.hoTen}`} />
                                </div>
                                <DownOutlined className='text-violet-400' />
                            </div>

                        </Space>
                    </a>
                </Dropdown>
            </>
        }
        return <Fragment >
            <UserOutlined className='tracking-wide text-slate-300 font-thin  mr-2' /> <NavLink to='/login' className="text-xs tracking-wide text-slate-300 font-thin  mr-2 self-center  rounded"> Đăng nhập</NavLink>
            {/* <NavLink to='/register' className="text-xs font-thin self-center  rounded text-white  ">Sign up</NavLink> */}
        </Fragment>
    }

    let searchRef = useRef(null)
    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer)
    const [value,setOption] = useState('')

    const handleSearch = (value) => {
        setOption(value)
        console.log(value)                             //debounce search
        if (searchRef.current) {

            clearTimeout(searchRef.current)
        }
        searchRef.current = setTimeout(() => {
            dispatch(LayDanhSachFilmAction(value))
        }, 300)

    };
    const onSelect = (value,option) => {
        setOption(option.label)
        console.log('onSelect', value);
        history.push(`/detail/${value}`)
       
        
      };

    return (
        <header className=" bg-gray-600 bg-opacity-70 text-gray-900 fixed w-full h-auto z-10">
            
            <div className="w-11/12 flex justify-between h-16 mx-auto">
                <div className=" flex justify-between  items-center w-2/3">
                    <a href="/" className="inline-block w-10">
                        <img src={require("../../../../Assets/Img/icon-logo-png-11.jpg")} alt="Logo" style={{width : "100%",display:"inline-block"}}/>
                    </a>
                    <ul className=" w-5/12 mb-0 hidden  lg:flex">
                        <li className="flex">
                            <NavLink to='/' activeClassName='text-violet-400' className="flex text-base items-center px-4 -mb-1 text-white hover:text-violet-400 transition-all duration-500">Home</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to='/listmovies' activeClassName='  text-violet-400' className="flex text-base items-center px-4 -mb-1 text-white hover:text-violet-400 transition-all duration-500">Movies</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to='/listshowtimes' activeClassName='  text-violet-400' className="flex text-base items-center px-4 -mb-1 text-white hover:text-violet-400 transition-all duration-500">Showtimes</NavLink>
                        </li>

                    </ul>
                    <div className=' w-5/12'>
                        <AutoComplete
                            style={{
                                width: '300px',
                            }}
                            onSearch={handleSearch}
                            options={arrFilmDefault.map((item,index)=>{
                                return {label : item.tenPhim, value : item.maPhim}
                            })}
                            onChange={(text) => {
                                setOption(text)
                            }}
                            value={value}
                            onSelect={onSelect}
                            placeholder="Nhập tên phim bạn muốn tìm kiếm"
                        >
                            {/* <Input.Search size="middle"  /> */}
                        </AutoComplete>
      
                    </div>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderUser()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            

        </header>


    )
}
