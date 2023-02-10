
import React, { useRef, useState } from 'react'
import { AutoComplete, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined,DiffOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LayDanhSachFilmAction, xoaPhimAction } from '../../Redux/Actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';
import { LayDanhSachNguoiDung, XoaNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
const { Search } = Input;


export default function AdminUsers(props) {

  const { arrUsers } = useSelector(state => state.QuanLyUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LayDanhSachNguoiDung())
  }, [])

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim()
        let taiKhoanB = b.taiKhoan.toLowerCase().trim()
        if (taiKhoanA > taiKhoanB) {
          return 1
        }
        return -1

      },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      width: '20%',
    },
    {
      title: 'họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      //   defaultSortOrder: 'ascend',
    //   sorter: (a, b) => {
    //     let tenPhimA = a.tenPhim.toLowerCase().trim()
    //     let tenPhimB = b.tenPhim.toLowerCase().trim()
    //     if (tenPhimA > tenPhimB) {
    //       return 1
    //     }
    //     return -1

    //   },
      sortDirections: ['ascend', 'descend'],

      width: '25%',
    },
    {

      title: 'email',
      dataIndex: 'email',
      key: 'email',
    //   render: (text, record, index) => {
    //     return <img className='w-10 h-10' src={record.hinhAnh} alt={index} />
    //   },
      width: '25%',
    },
    {

        title: 'số điện thoại',
        dataIndex: 'soDt',
        key: 'soDt',
      //   render: (text, record, index) => {
      //     return <img className='w-10 h-10' src={record.hinhAnh} alt={index} />
      //   },
      sortDirections: ['ascend'],
        width: '10%',
      },
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      sorter: (a) => {
       
        if (a.maLoaiNguoiDung === "QuanTri") {
          return 1
        }else {
            return -1
        }
        

      },
    //   render: (text, record, index) => {
    //     return <Fragment>
    //       {record.moTa.length > 50 ? record.moTa.slice(0, 50).concat("...") : record.moTa}
    //     </Fragment>
    //   },
      width: '10%',

    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return <Fragment>
          <NavLink key={1} to={`/users/edit/${record.taiKhoan}`} className='text-blue-600 mr-2'> <EditOutlined /></NavLink>
          <span key={2} onClick={() => {
            if (window.confirm("bạn có chắc xóa người dùng " + record.taiKhoan)) {
              dispatch(XoaNguoiDungAction(record.taiKhoan))
            }
          }} className='text-red-600'> <DeleteOutlined /></span>
         

        </Fragment>
      },
      width: '10%',

    },
  ];

  let searchRef = useRef(null)

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  const handleSearch = (value) => {
    console.log(value)                             //debounce search
    if (searchRef.current) {

      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
      dispatch(LayDanhSachNguoiDung(value))
    }, 300)

  };

  return (
    <div>
      <h3 className='text-4xl'>Quản lý người dùng</h3>
      {/* <Search
      placeholder="input search text"
      allowClear
      enterButton = {<SearchOutlined className='text-blue-600'/>}
      onSearch={onSearch}
      style={{
        width: "100%",
        marginBottom : "20px"
      }}
    /> */}
      <AutoComplete
        style={{
          width: '98%',
          marginBottom: "10px"
        }}
        onSearch={handleSearch}
        allowClear
        placeholder="Nhập tên người dùng bạn muốn tìm kiếm"

      >
        {/* <Input.Search size="middle" placeholder="Nhập tên phim bạn muốn tìm kiếm" /> */}
      </AutoComplete>
      <span> <SearchOutlined className='text-blue-600' /></span>
      <Table size='small' rowKey={"taiKhoan"} columns={columns} dataSource={arrUsers} onChange={onChange} />
    </div>
  )
}




