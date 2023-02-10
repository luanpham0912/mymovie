import { DatePicker, Form, Input, InputNumber, Switch } from 'antd'
import { useFormik } from 'formik'
import moment from 'moment'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhapThongTinPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../Redux/Actions/QuanLyPhimAction'
dayjs.extend(customParseFormat)
export default function AdminEditMovie(props) {
    const dateFormat = 'DD/MM/YYYY';


    const dispatch = useDispatch()
    const { thongTinPhimEdit } = useSelector(state => state.QuanLyPhimReducer)
    console.log(thongTinPhimEdit)
    useEffect(() => {

        dispatch(layThongTinPhimAction(props.match.params.id))

    }, [])


    const [srcImg, setSrcImg] = useState('')
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim : thongTinPhimEdit?.maPhim,
            tenPhim: thongTinPhimEdit?.tenPhim,
            trailer: thongTinPhimEdit?.trailer,
            moTa: thongTinPhimEdit?.moTa,
            ngayKhoiChieu: moment(thongTinPhimEdit?.ngayKhoiChieu).format(dateFormat),
            dangChieu: thongTinPhimEdit?.dangChieu,
            sapChieu: thongTinPhimEdit?.sapChieu,
            hot: thongTinPhimEdit?.hot,
            danhGia: thongTinPhimEdit?.danhGia,
            hinhAnh: null,


        },
        onSubmit: values => {
            values.maNhom = "GP00"
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append("File", values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(capNhapThongTinPhimUploadAction(formData))
            console.log(" console.log(first)", values)
        },
    });
    console.log(formik.values)
    const onChangeSwitchs = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }

    }

    const onChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }

    }

    const onChangeDatePicker = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        formik.setFieldValue("ngayKhoiChieu", dateString)
    };


    const handleChangePicture = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        await  formik.setFieldValue('hinhAnh', file);
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            let render = new FileReader()
            render.readAsDataURL(file)
            render.onload = e => {

                setSrcImg(e.target.result)
            }

        }

    }


    return (
        <>

            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                // onValuesChange={onFormLayoutChange}
                // disabled={componentDisabled}
                style={{
                    maxWidth: 800,
                }}
            >
                <Form.Item label="Tên phim">
                    <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker onChange={onChangeDatePicker} value={dayjs(formik.values.ngayKhoiChieu, dateFormat)} format={dateFormat} />
                </Form.Item>

                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={onChangeSwitchs("dangChieu")} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={onChangeSwitchs("sapChieu")} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={onChangeSwitchs("hot")} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Số sao">
                    <InputNumber min={1} max={10} onChange={onChangeInputNumber("danhGia")} value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList">
                    <input type='file' name='hinhAnh' accept='image/jpg, image/jpeg,image/png' onChange={handleChangePicture} />
                    <br />
                    <img style={{ width: "100px", height: "100px" }} src={srcImg === '' ? thongTinPhimEdit?.hinhAnh : srcImg} alt='...' />
                </Form.Item>
                <Form.Item label="Button">
                    <button type='submit' className='p-2 bg-blue-600 text-white rounded-md'>Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
}
