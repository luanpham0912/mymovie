import React from 'react'
import {useDispatch} from 'react-redux'
import './AdminAddMovie.css'
import moment from 'moment'
import { useFormik } from 'formik'
import { PlusOutlined } from '@ant-design/icons';

import {

  DatePicker,
  Form,
  Input,
  InputNumber,

  Switch,

} from 'antd';
import { useState } from 'react';
import { themPhimUploadHinhAction } from '../../Redux/Actions/QuanLyPhimAction'


export default function AdminAddMovie() {
    const dispatch = useDispatch()
    const [srcImg , setSrcImg] = useState('')
    const formik = useFormik({
      initialValues: {
        tenPhim: '',
        trailer: '',
        moTa: '',
        ngayKhoiChieu: '',
        dangChieu : false,
        sapChieu : false,
        hot : false,
        danhGia : 0,
        hinhAnh : {},
       

      },
      onSubmit: values => {
        values.maNhom = "GP00"
        let formData = new FormData()
        for( let key in values){
          if(key !== 'hinhAnh'){
              formData.append(key,values[key])
          }else{
            formData.append("File",values.hinhAnh,values.hinhAnh.name)
          }
        }
      dispatch(themPhimUploadHinhAction(formData))
      },
    });


    const onChangeSwitchs = (name) =>{
        return (value) => {
          formik.setFieldValue(name,value)
        }
  
    }

    const onChangeInputNumber= (name) =>{
      return (value) => {
        formik.setFieldValue(name,value)
      }

  }

    const onChangeDatePicker = (value, dateString) => {

      formik.setFieldValue("ngayKhoiChieu",dateString)
    };
    // const onOk = (value,) => {
    //   console.log('onOk: ', moment(value).format("DD/MM/YYYY - hh:mm:ss"));
    

    // };

    const handleChangePicture = (e) => {
        let file = e.target.files[0]
        console.log(file)
        
        if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'){
            let render = new FileReader()
            render.readAsDataURL(file)
            render.onload = e =>{
             
              setSrcImg(e.target.result)
            }

            formik.setFieldValue('hinhAnh',file);
        }
      
    }

    return (
      <>
        <h3 className='text-3xl'> THÊM PHIM </h3>
        <Form
          onSubmitCapture={formik.handleSubmit}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 800,
          }}
        >
          <Form.Item label="Tên phim">
            <Input name='tenPhim' onChange={formik.handleChange}/>
          </Form.Item>
          <Form.Item label="Trailer">
            <Input name='trailer' onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input name='moTa' onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu">
          <DatePicker name='ngayKhoiChieu'  format={"DD/MM/YYYY"} onChange={onChangeDatePicker}  />
          </Form.Item>
  
          <Form.Item label="Đang chiếu" valuePropName="checked">
            <Switch onChange={onChangeSwitchs("dangChieu")} />
          </Form.Item>
          <Form.Item label="Sắp chiếu" valuePropName="checked">
            <Switch  onChange={onChangeSwitchs("sapChieu")}/>
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch  onChange={onChangeSwitchs("hot")} />
          </Form.Item>
          <Form.Item label="Số sao">
            <InputNumber min={1} max={10} defaultValue={1}onChange={onChangeInputNumber("danhGia")}/>
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList">
              <input type='file'  name='hinhAnh' accept='image/png, image/jpeg,image/png' onChange={handleChangePicture}/>
              <br/>
              <img style={{width : "100px" , height : "100px"}} src={srcImg} alt='...'/>
          </Form.Item>
          <Form.Item label="Button">
            <button type='submit' className='p-2 bg-lime-600 text-white rounded-md'>Thêm phim</button>
          </Form.Item>
        </Form>
      </>
    );
  }


