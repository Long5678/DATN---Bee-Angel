import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../../../publics/styles/listxe.scss'
import Item_Xe from "./item-Xe"

import { getAllCar } from '../../../redux/action_vehicle'
import Header from '../../layouts/header'
function Main_Xe() {
    let dispatch = useDispatch()
    const dataCars = useSelector((state) => state.carSL.carDatas)
    console.log(dataCars);

    useEffect(() => {
        dispatch(getAllCar())
    },[])


    return <>
        <Header />
        <div className="main-list-xe">
            <div className="box-list-xe">
                <div className="tieuDe-xe">
                    <h2>Danh sách Xe</h2>
                    <p><a href="#">Hiển thị tất cả</a></p>
                </div>
                <div className="line-xe"></div>

                <div className="list-xe">
                    {dataCars.map((item, index) => {
                        return <Item_Xe key={index} {...item} />
                    })}

                </div>
            </div>
        </div>
    </>
}

export default Main_Xe
