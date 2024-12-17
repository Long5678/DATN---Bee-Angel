import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCar } from '../../../../redux/action_vehicle';
import Item_Xe from './Item_Xe';
import Loading from '../../../layouts/loading';
import '../../../../publics/styles/listxe.scss'
const List_Xe = () => {
  const dispatch = useDispatch();
  const dataCars = useSelector((state) => state.carSL.carDatas);
  const isLoadingCar = useSelector((state) => state.carSL.isLoadingCar);
  const isErrFilter = useSelector((state) => state.carSL.isErrFilter);

  const [limit, setLimit] = useState(3);

  useEffect(() => {
    if (dataCars.length === 0) {
      dispatch(getAllCar());
    }
  }, []);

  const visibleCars = dataCars.slice(0, limit);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 3);
  };

  


  const listRef = React.useRef();

  const handleRetract = () => {
    setLimit(3);
  
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' }); // Cuộn về trên
    }
  };
  
  return (
    <>
      <article className="main-list-homexe" id="order-list">
        <section ref={listRef} className="box-list-homexe">
          <section className="tieuDe-homexe">
            <h2>Danh sách xe</h2>
          </section>
          <div className="line-homexe"></div>

          {isLoadingCar && <Loading top={35} left={50} position="absolute" />}
          {isErrFilter ? (
            <span>{isErrFilter}</span>
          ) : (
            <section className="list-homexe">
              {visibleCars.map((item, index) => (
                <Item_Xe key={index} {...item} />
              ))}
            </section>
          )}

          <div className="div-btn-xemThem">
            {limit < dataCars.length && (
              <button onClick={handleShowMore} disabled={limit >= dataCars.length} className="btn-xemThem">
                Xem Thêm
              </button>
            )}

            {limit > 3 && (
              <button onClick={handleRetract} className="btn-thuHoi" disabled={limit === 3}>
                Thu Hồi
              </button>
            )}
          </div>
          
        </section>
      </article>
    </>
  );
};


export default List_Xe;
