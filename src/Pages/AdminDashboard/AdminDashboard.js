import React, { useRef, useState } from 'react'
import { AutoComplete, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined,DiffOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LayDanhSachFilmAction, xoaPhimAction } from '../../Redux/Actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';
const { Search } = Input;


export default function AdminDashboard(props) {

  const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LayDanhSachFilmAction())
  }, [])

  const columns = [
    {
      title: 'mã phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: 'descend',
      sortDirections: ['descend'],
      width: '10%',
    },
    {
      title: 'tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      //   defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim()
        let tenPhimB = b.tenPhim.toLowerCase().trim()
        if (tenPhimA > tenPhimB) {
          return 1
        }
        return -1

      },
      sortDirections: ['ascend', 'descend'],

      width: '35%',
    },
    {

      title: 'hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text, record, index) => {
        return <img className='w-10 h-10' src={record.hinhAnh} alt={index} />
      },
      width: '10%',
    },
    {
      title: 'mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      render: (text, record, index) => {
        return <Fragment>
          {record.moTa.length > 50 ? record.moTa.slice(0, 50).concat("...") : record.moTa}
        </Fragment>
      },
      width: '35%',

    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return <Fragment>
          <NavLink key={1} to={`/admin/edit/${record.maPhim}`} className='text-blue-600 mr-2'> <EditOutlined /></NavLink>
          <span key={2} onClick={() => {
            console.log("record.paPhim",record.maPhim)
            if (window.confirm("bạn có chắc xóa phim " + record.tenPhim)) {
              dispatch(xoaPhimAction(record.maPhim))
            }
          }} className='text-red-600'> <DeleteOutlined /></span>
          <NavLink key={3} to={`/admin/showtimes/${record.maPhim}`} className='text-lime-600 ml-2'><DiffOutlined /></NavLink>

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
      dispatch(LayDanhSachFilmAction(value))
    }, 300)

  };

  return (
    <div>
      <h3 className='text-4xl'>Quản lý phim</h3>
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
        placeholder="Nhập tên phim bạn muốn tìm kiếm"

      >
        {/* <Input.Search size="middle" placeholder="Nhập tên phim bạn muốn tìm kiếm" /> */}
      </AutoComplete>
      <span> <SearchOutlined className='text-blue-600' /></span>
      <Table size='small' rowKey={"maPhim"} columns={columns} dataSource={arrFilmDefault} onChange={onChange} />
    </div>
  )
}




