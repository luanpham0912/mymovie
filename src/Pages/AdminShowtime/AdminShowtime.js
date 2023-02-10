import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { PlusOutlined } from '@ant-design/icons';
import {
    DatePicker,
    Form,
    InputNumber,
    Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinPhimAction } from '../../Redux/Actions/QuanLyPhimAction';
import { LayThongCumRapTheoHeThongAction, LayThongTinLichChieuHeThongRapAction } from '../../Redux/Actions/QuanLyRapAction';
import { TaoLichChieuAction } from '../../Redux/Actions/QuanLyDatVeAction';

export default function AdminShowtime(props) {
    const dispatch = useDispatch()
    const { thongTinPhimEdit } = useSelector(state => state.QuanLyPhimReducer)
    const { heThongRapChieu, cumRap } = useSelector(state => state.QuanLyRapReducer)

    console.log(cumRap)
    useEffect(() => {
        console.log(" console.log(first)")

        dispatch(layThongTinPhimAction(props.match.params.id))
        dispatch(LayThongTinLichChieuHeThongRapAction())

    }, [])
    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: 0

        },
        initialError : {
            giaVe : ''
        },
        onSubmit: values => {
            console.log(values)
            for (let key in values) {
                if (values[key] === '') {
                    alert('vui lòng nhập đầy đủ thông tin trước khi ấn tạo lịch chiếu')
                    return
                }
                if (values["giaVe"] < 75000 || values["giaVe"] > 120000) {
                      console.log(values["giaVe"])

                    alert('vui lòng nhập giá vé từ 75.000 đến 120.000')
                    return
        
                }

            }
            
            dispatch(TaoLichChieuAction(values))
        },
    });
    const handleChangeHeThongRap = (value) => {
        dispatch(LayThongCumRapTheoHeThongAction(value))
        formik.setFieldValue("maRap", '')

    };
    const handleChangeCumRap = (value) => {
        console.log("valueeee", value);
        formik.setFieldValue("maRap", value)
    };


    const handleChangeDatePicker = (value, dateString) => {

        console.log('Formatted Selected Time: ', dateString);
        formik.setFieldValue('ngayChieuGioChieu', dateString)
    };
    const handleChangeInputNumber = (value) => {
        if (value < 75000 || value > 120000) {
            formik.setFieldError("giaVe","từ 75.000 đến 120.000")

        } else {
            formik.setFieldError("giaVe","")
            formik.setFieldValue('giaVe', value)
        }
    };

    const onOk = (value) => {
        console.log('onOk: ', value);
    };
    return (
        <>
            <h3> Tạo Lịch Chiếu </h3>
            <div className='flex mt-5'>
                <div className='w-1/4'>
                    <img className='w-1/2 mx-auto' src={thongTinPhimEdit.hinhAnh} alt='...' />
                    <p className='text-center mt-2 font-bold text-lg'>{thongTinPhimEdit.tenPhim}</p>
                </div>
                <div className='w-3/4'>
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
                            width: '70%',
                        }}
                    >

                        <Form.Item labelCol={{ offset: 2, span: 8 }} label="Hệ thống rạp">
                            <Select placeholder='Chọn hệ thống rạp' onChange={handleChangeHeThongRap}>
                                {heThongRapChieu?.map((item, index) => {
                                    return <Select.Option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</Select.Option>
                                })}

                            </Select>
                        </Form.Item >
                        <Form.Item labelCol={{ offset: 2, span: 8 }} label="Rạp">
                            <Select placeholder='Chọn rạp' name='maRap' value={formik.values.maRap} onChange={handleChangeCumRap}>
                                {cumRap?.map((item, index) => {
                                    return <Select.Option key={index} value={item.maCumRap}>{item.tenCumRap}</Select.Option>
                                })}

                            </Select>
                        </Form.Item>

                        <Form.Item labelCol={{ offset: 2, span: 8 }} label="Ngày chiếu giờ chiếu">
                            <DatePicker name='ngayChieuGioChieu' showTime onChange={handleChangeDatePicker} onOk={onOk} format={'DD/MM/YYYY hh:mm:ss'} placeholder='chọn ngày giờ chiếu' />
                        </Form.Item >
                        <Form.Item labelCol={{ offset: 2, span: 8 }} label="Giá vé">
                            <InputNumber onChange={handleChangeInputNumber} />
                                <span className='ml-3 text-red-700'>{formik.errors.giaVe}</span>
                        </Form.Item>
                        <Form.Item labelCol={{ offset: 2, span: 8 }} label="Action">
                            <button type='submit' className=' hover:bg-blue-300 bg-blue-600  transition text-white p-2 rounded-xl' >Thêm lịch chiếu</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </>
    );
}

