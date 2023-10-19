import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BestProduct.scss';

const BestProduct = () => {
  const navigate = useNavigate();
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    fetch('/data/mainData.json')
      .then(response => response.json())
      .then(data => setMainData(data))
      .catch(error => console.error('데이터를 불러오는 중 오류 발생:', error));
  }, []);

  //함수명 수정
  const goToBestProduct = id => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="bestProduct">
      {mainData.map(item => (
        <div className="bestProductContainer" key={item.id}>
          <div className="imgBox">
            <img
              src={item.thumbnail}
              alt="공연 포스터" //alt값 수정
              className="productImg"
              onClick={() => goToBestProduct(item.id)}
            />
          </div>
          <div className="productInfo" onClick={() => goToBestProduct(item.id)}>
            <div className="productTitle">{item.title}</div>
            <div className="productDate">{item.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestProduct;