import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactionButton from '../ReactionButton/ReactionButton';
import axios from 'axios';
import { HOST } from '../../../utils/variable';
import './ProductDetailTop.scss';

const ProductDetailTop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${HOST}/events/${id}`)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      });
  }, []);

  const handleOrderClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');

      return;
    }

    if (status !== 'merchantable') {
      alert('팬 코드가 발급되지 않았습니다.');

      return;
    }

    navigate(`/order/${id}`, { state: data });
  };

  if (Object.keys(data).length === 0) return null;

  const {
    title,
    thumbnailImage,
    stage,
    startDate,
    playTime,
    seatS,
    seatR,
    seatA,
    seats,
    status,
    reactions,
    participate,
  } = data;

  return (
    <div className="productDetailTop">
      <div className="productDetailTopContainer">
        <div className="productTitle">{title}</div>
        <div className="infoContainer">
          <div className="thumbnailImage">
            <img src={thumbnailImage} alt="Product Thumbnail" />
          </div>

          <div className="productInfoText">
            <div className="label">
              <div className="stageLabel">장소</div>
              <div className="startDateLabel">일정</div>
              <div className="playTimeLabel">관람시간</div>

              <div className="priceLabel">가격</div>
              <div className="availableSeatsLabel">잔여좌석</div>
            </div>
            <div className="infoData">
              <div className="stage">{stage}</div>
              <div className="startDate">{startDate}</div>
              <div className="playTime">{playTime}</div>

              <div className="price">
                <div className="priceSeatS">
                  S석 {`${seatS.toLocaleString()}원`}
                </div>
                <div className="priceSeatR">
                  R석 {`${seatR.toLocaleString()}원`}
                </div>
                <div className="priceSeatA">
                  A석 {`${seatA.toLocaleString()}원`}
                </div>
              </div>
              <div className="availableSeats">
                {seats.map(seat => (
                  <div key={seat.grade}>
                    <div>
                      {seat.grade} :{' '}
                      {seat.available === 0 ? '매진' : seat.available}
                    </div>
                  </div>
                ))}
              </div>
              <div className="orderBtn">
                <button className="orderButton" onClick={handleOrderClick}>
                  예매하기!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactionButton
        num={id}
        reaction={reactions[0]}
        hasVoted={Boolean(participate[0].status)}
      />
    </div>
  );
};

export default ProductDetailTop;
