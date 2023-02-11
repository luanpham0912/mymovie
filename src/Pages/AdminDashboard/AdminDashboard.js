import React, { useMemo, useRef, useState } from 'react'
import { AutoComplete, Popover, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LayDanhSachFilmAction, xoaPhimAction } from '../../Redux/Actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';



export default function AdminDashboard(props) {

  const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LayDanhSachFilmAction())
  }, [])
  let searchRef = useRef(null)

  const [showArrow, setShowArrow] = useState(false);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const mergedArrow = useMemo(() => {
    if (arrowAtCenter)
      return {
        arrowPointAtCenter: true,
      };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
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
          <Popover placement="bottomRight" title={text} content={
            <p className='mb-0'>Cập nhật phim</p>
          }    arrow={mergedArrow}>
            <NavLink key={1} to={`/admin/edit/${record.maPhim}`} className='text-blue-600 mr-2'> <EditOutlined /></NavLink>
          </Popover>

          <Popover placement="bottomRight" title={text} content={
            <p className='mb-0'>Xóa phim</p>
          }    arrow={mergedArrow}>
         
            <span key={2} onClick={() => {

              if (window.confirm("bạn có chắc xóa phim " + record.tenPhim)) {
                dispatch(xoaPhimAction(record.maPhim))
              }
            }} className='text-red-600 cursor-pointer'> <DeleteOutlined /></span>
          </Popover>
          <Popover placement="bottomRight" title={text} content={
            <p className='mb-0'>Tạo lịch chiếu</p>
          }    arrow={false}>
            <NavLink key={3} to={`/admin/showtimes/${record.maPhim}`} className='text-lime-600 ml-2'><DiffOutlined /></NavLink>
          </Popover>


        </Fragment>
      },
      width: '10%',

    },
  ];


  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };


  const handleSearch = (value) => {
    //debounce search
    if (searchRef.current) {

      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
      dispatch(LayDanhSachFilmAction(value))
    }, 400)

  };

  return (
    <div>
      <h3 className='text-3xl'>QUẢN LÝ PHIM</h3>
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
      <Table size='small' rowKey={"maPhim"} columns={columns} dataSource={arrFilmDefault} />
    </div>
  )
}




