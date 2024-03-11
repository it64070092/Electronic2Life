import React, { useState, useEffect } from "react";
import backendip from '../../../backendip';
import axios from "axios";

const Offer = () => {

  const [offers, setOffers] = useState([]);

  const getUserById = async (userId) => {
    try {
        const response = await axios.get(`http://${backendip}:3000/get-user/${userId}`);
        return response.data.user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get("http://" + backendip + ":3000/get-offer");
          const offerData = response.data.offers;

          const offersWithUser = await Promise.all(offerData.map(async (offer) => {
              const user = await getUserById(offer.userId);
              return { ...offer, user };
          }));

          setOffers(offersWithUser);
      } catch (error) {
          console.error("Error fetching offers:", error);
      }
  };

  fetchData();
}, []);

  return (
    <>
      <div className='flex flex-col w-full h-full bg-white'>
        <div className='flex flex-col w-full'>
          {offers.map((offer) => (
            <div className='flex flex-row justify-between border-b-2 border-solid border-black py-6 px-4' key={offer._id}>
              <div className='flex flex-col w-1/2 gap-2'>
                <p>จากผู้ใช้ : {offer.user?.firstName} {offer.user?.lastName}</p>
                <p>เบอร์โทร: {offer.tel} </p>
                <p>ที่อยู่: {offer.address}</p>
                <p>หัวข้อ: {offer.name}</p>
                <p>รายละเอียด: {offer.description}</p>
                <p>สถานะ: {offer.status}</p>
              </div>
              <div className='flex flex-col mr-10 justify-center'>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Offer;
