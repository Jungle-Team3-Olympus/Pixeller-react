// SidebarSection.js
import React, { useEffect, useState } from "react";
// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import '../../../static/css/swiper-bundle.min.css';
import { axiosCRUDInstance } from "../../../api/axios.jsx";

const ProductList = ({products}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleSwipe = (e) => {
      if (e.deltaY > 0) {
        // 스와이프 아래로
        setSelectedIndex((prevIndex) =>
          prevIndex < products.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else {
        // 스와이프 위로
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    };

    window.addEventListener("wheel", handleSwipe);

    if (products.length > 0) {
        const swiper = new Swiper('.product-bottom .swiper-container', {
            navigation: {
                nextEl: ".product-bottom .swiper-button-next",
                prevEl: ".product-bottom .swiper-button-prev",
            },
        });
    }
    return () => {
      window.removeEventListener("wheel", handleSwipe);
    };
  }, [products]);

  const comma3number = (num) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const dmHandler = async (e) => {
    const oppositeId = e.currentTarget.getAttribute('data-uid');
  
    try {
      const response = await axiosCRUDInstance.post("/api/chat-room/opposite/"+oppositeId,{}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("user"),
        },
      });
      const result = response.data;

      if (result.success) {
        console.log("Chat started successfully:", result);
      } else {
        console.error("Failed to start chat:", result.message);
      }
    } catch (error) {
      console.error("Error during DM API call:", error);
    }
  }

  // console.log(products);
  return (
    <>
        {products.map((item, index) => (
          <div
            key={item.productId}
            id={`product-${item.productId}`}
            className={`product-item-card ${
              index === selectedIndex ? "selected" : ""
            }`}
            style={{ transform: `translateY(${(index - selectedIndex) * 100}%)` }}
          >
            
            <div className="product-bottom">
                <div className="swiper-container swiper">
                    <div className="swiper-wrapper">
                    {item.imageFileUrls.map((url, index) => (
                        <>
                        <div key={index} className="swiper-slide">
                        <img key={index} src={url} alt="product" />
                        </div>
                        </>
                    ))}
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>
                <div className="new-product-info">
                  <div className="new-product-info-div">
                    <div className="product-name">
                        <span>{item.name}</span>
                    </div>
                    <div className="product-price">
                        <span>{comma3number ( item.price )}원</span>
                    </div>
                  </div>
                  <div className="new-product-seller">
                      <span>판매자 : {item.memberDto.id}</span>
                  </div>
                  <div className="new-product-DM-div">
                    <div>
                    <span onClick={dmHandler} data-uid={item.memberDto.memberId} >판매자에게 DM 보내기gg!!!</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
            ))}
    </>
  );
};

export default ProductList;
