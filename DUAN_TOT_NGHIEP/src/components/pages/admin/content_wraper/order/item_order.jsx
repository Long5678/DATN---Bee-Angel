import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { getOneTour, getOneUser, getoneOder, updatestatusOrder, updatestatusOrderRefund } from '../../../../../redux/action_thunk';
import { PopupContext } from "../../../../../context/popupContext";
import { useFindUserComment } from '../../../../../hooks/usefindusercomment';
import { useFindTour } from '../../../../../hooks/findTourFetch';

function Item_order({ _id, numberOfPeople, numberOfChildren, idTour, idUser, status, task_status, departureDate, returnDate, mustPay, i, setStatus_task, setActiveTab }) {
    let dispatch = useDispatch()
    const { setPopupEditTour, setPopupEdit } = useContext(PopupContext)

    const { recipientUser } = useFindUserComment(idUser);
    const { recipientTour } = useFindTour(idTour);

    if (!recipientUser) {
        return;
    }

    if (!recipientTour) {
        return;
    }

    function handlevieworder() {
        dispatch(getoneOder(_id))
        dispatch(getOneUser(idUser))
        dispatch(getOneTour(idTour))
        setPopupEditTour(true)
    }

    function handleEditOrder() {
        dispatch(getoneOder(_id))
        dispatch(getOneUser(idUser))
        dispatch(getOneTour(idTour))
        setPopupEdit(true)
    }

    async function handleConfirm() {
        const updatedStatus = "Sẵn sàng khởi hành";
        await dispatch(updatestatusOrder(_id, updatedStatus))
        setStatus_task("Sẵn sàng khởi hành")
        setActiveTab(1)
    }

    async function handleConfirmRefund() {
        const updatedStatusRefund = "Đã hoàn";
        await dispatch(updatestatusOrderRefund(_id, updatedStatusRefund))
        const updatedStatus = "Đã hủy";
        await dispatch(updatestatusOrder(_id, updatedStatus))
        alert("Hoàn tiền thành công !")
    }

    return <>
        <tr >
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{"BAG-" + _id?.slice(-5).toUpperCase()}</td>
            <td>{recipientUser.name}</td>
            <td>{recipientTour.name}</td>
            <td>{numberOfPeople} L - {numberOfChildren} N</td>
            <td>{departureDate} - {returnDate}</td>
            <td>{task_status}</td>
            <td>{status}</td>
            <td className='btns-order'>
                <Button onClick={handlevieworder} variant="contained" size="small">Chi tiết</Button>
                {(task_status === 'Sẵn sàng khởi hành' || task_status === 'Chờ xác nhận') && (
                    <Button onClick={handleEditOrder} variant="contained" size="small">Edit</Button>
                )}
                {task_status === 'Chờ xác nhận' && (
                    <Button onClick={handleConfirm} variant="contained" size="small" color="success">Xác nhận</Button>
                )}
                {task_status === 'Đã hủy' && mustPay > 0 && status !== 'Đã hoàn' && (
                    <Button onClick={handleConfirmRefund} variant="contained" size="small" style={{ marginRight: "10px" }}>Đã hoàn</Button>
                )}
            </td>
        </tr>
    </>
}

export default Item_order