import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import food from "../../assets/food.png";
import flowers from "../../assets/flowers.jpeg";
import groceries from "../../assets/groceries.webp";
import medecine from "../../assets/medecine.avif";
import donation from "../../assets/donation.jpg";
import { Link } from "react-router-dom";

export default function Categories({ cityId }) {
  const [item, setItem] = useState();
  const { t } = useTranslation();

  useEffect(() => {}, []);
  console.log(cityId);

  return (
    <>
      <div className="container flex flex-col w-full p-10 mx-auto justify-center items-center gap-5">
        <div className="row max-w-[1200px] justify-center gap-5">
          {/* Food */}
          <Link
            className="w-full lg:w-1/2 flex flex-col justify-between max-w-[290px] xs:max-w-[300px] sm:max-w-[400px] rounded-3xl overflow-hidden cursor-pointer "
            to={`Category/restaurants/${cityId}`}
          >
            <div className="relative h-[100%]">
              <img className="w-full h-[100%] object-cover" src={food} alt={t('categories.food.alt')} />
              <div className="absolute top-0 left-0 text-shadow-black bg-black/30 h-[100%] px-5 py-2 w-full transition text-2xl text-slate-50 font-bold">
                {t('categories.food.title')}
              </div>
            </div>
            <div className="card-content bg-orange-500 p-4">
              <p className="p-3 text-white">
                {t('categories.food.description')}
              </p>
              <button className="text-orange-700 hover:bg-orange-700 font-bold hover:text-slate-100 bg-slate-100 py-1.5 px-3 rounded-full">
                {t('categories.food.cta')}
              </button>
            </div>
          </Link>

          {/* Flowers */}
          <Link
            className="w-full lg:w-1/4 bg-orange-500 flex flex-col justify-between max-w-[290px] sm:max-w-[400px] rounded-3xl overflow-hidden cursor-pointer "
            to={`Category/flowers/${cityId}`}
          >
            <div className="relative h-[100%]">
              <img className="w-full h-[100%] object-cover" src={flowers} alt={t('categories.flowers.alt')} />
              <div className="absolute top-0 left-0 text-shadow-black bg-black/30 h-[100%] px-5 py-2 w-full transition text-2xl text-slate-50 font-bold">
                {t('categories.flowers.title')}
              </div>
            </div>
            <div className="card-content bg-orange-500 p-4">
              <p className="p-3 text-white">
                {t('categories.flowers.description')}
              </p>
              <button className="text-orange-700 hover:bg-orange-700 font-bold hover:text-slate-100 bg-slate-100 py-1.5 px-3 rounded-full">
                {t('categories.flowers.cta')}
              </button>
            </div>
          </Link>

          {/* Medicine */}
          <Link
            className="w-full lg:w-1/4 flex flex-col justify-between max-w-[290px] sm:max-w-[400px] rounded-3xl overflow-hidden cursor-pointer "
            to={`Category/pharmacies/${cityId}`}
          >
            <div className="relative h-[100%]">
              <img className="w-full h-[100%] object-cover" src={medecine} alt={t('categories.medicine.alt')} />
              <div className="absolute top-0 left-0 text-shadow-black bg-black/30 h-[100%] px-5 py-2 w-full transition text-2xl text-slate-50 font-bold">
                {t('categories.medicine.title')}
              </div>
            </div>
            <div className="card-content bg-orange-500 p-4">
              <p className="p-3 text-white">
                {t('categories.medicine.description')}
              </p>
              <button className="text-orange-700 hover:bg-orange-700 font-bold hover:text-slate-100 bg-slate-100 py-1.5 px-3 rounded-full">
                {t('categories.medicine.cta')}
              </button>
            </div>
          </Link>
        </div>

        <div className="row max-w-[1200px] justify-center gap-5 ">
          {/* Groceries */}
          <Link
            className="w-full lg:w-8/18 flex flex-col justify-between max-w-[290px] sm:max-w-[400px] lg:max-w-[560px] rounded-3xl overflow-hidden cursor-pointer "
            to={`Category/groceries/${cityId}`}
          >
            <div className="relative h-[100%]">
              <img className="w-full h-[100%] object-cover" src={groceries} alt={t('categories.groceries.alt')} />
              <div className="absolute top-0 left-0 text-shadow-black bg-black/30 h-[100%] px-5 py-2 w-full transition text-2xl text-slate-50 font-bold">
                {t('categories.groceries.title')}
              </div>
            </div>
            <div className="card-content bg-orange-500 p-4">
              <p className="p-3 text-white">
                {t('categories.groceries.description')}
              </p>
              <button className="text-orange-700 hover:bg-orange-700 font-bold hover:text-slate-100 bg-slate-100 py-1.5 px-3 rounded-full">
                {t('categories.groceries.cta')}
              </button>
            </div>
          </Link>

          {/* Donations */}
          <Link
            className="w-full lg:w-8/18 flex flex-col justify-between max-w-[290px] sm:max-w-[400px] lg:max-w-[560px] rounded-3xl overflow-hidden cursor-pointer "
            to={`Category/donations/${cityId}`}
          >
            <div className="relative h-[100%]">
              <img className="w-full h-[100%] object-cover" src={donation} alt={t('categories.donations.alt')} />
              <div className="absolute top-0 left-0 text-shadow-black bg-black/30 h-[100%] px-5 py-3 w-full transition text-2xl text-slate-50 font-bold">
                {t('categories.donations.title')}
              </div>
            </div>
            <div className="card-content bg-orange-500 p-4">
              <p className="p-3 text-white">
                {t('categories.donations.description')}
              </p>
              <button className="text-orange-700 hover:bg-orange-700 font-bold hover:text-slate-100 bg-slate-100 py-1.5 px-3 rounded-full">
                {t('categories.donations.cta')}
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
