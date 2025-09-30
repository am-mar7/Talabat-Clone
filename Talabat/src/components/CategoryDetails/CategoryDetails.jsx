import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const key = import.meta.env.VITE_API_KEY;

export default function CategoryDetails() {
  const [loading, setLoading] = useState(false),
    { name, id } = useParams(),
    [items, setItems] = useState([]),
    headers = {
      "x-rapidapi-host": "talabat.p.rapidapi.com",
      "x-rapidapi-key": key,
    };

  useEffect(() => {
    getItems();
    console.log("items", items);
  }, []);

  function getItems() {
    // const backUp = JSON.parse(localStorage.getItem(`all${name}`));
    // if (backUp) {
    //   console.log("backup", backUp);
    //   setItems(backUp);
    //   return;
    // }
    setLoading(true);
    console.log(name , id , 'alooooooooooooooooooooo');    
    axios.get(
        `https://talabat.p.rapidapi.com/details?country=kuwait&category=${name}&cityId=1244`,
        { headers }
      )
      .then(({ data }) => {
        console.log(data);
        setItems(data);
        localStorage.setItem(`all${name}`, JSON.stringify(data));
      })
      .catch((response) => {
        console.log('faild',response);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="mx-10 lg:mx-52 my-10">
        <div className="py-2 px-5 lg:px-7 text-slate-900 lg:text-2xl font-bold bg-slate-100  rounded-full">
          {name}
        </div>
        <div className="row p-5 gap-5 my-10">
          {items?.status === "success" ? (
            items?.data?.map((item) => {
              return (
                <div key={item.id} className="card shadow-lg">
                  <div className="card-img h-[60%] p-5">
                    <img
                      className="w-full h-[100%] object-cover"
                      src={item.logo}
                      alt="logo"
                    />
                  </div>
                  <div className="card-content px-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span className="text-gray-500 text-sm"><h1>{item.restaurantSlug}</h1></span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>                    
                    <p className="my-1">{item.name}</p>
                    <p className="my-1"> {item.rate} <i className="fas fa-star text-yellow-400"></i> </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>a7a h4of b3deen</div>
          )}
        </div>
      </div>
    </>
  );
}
