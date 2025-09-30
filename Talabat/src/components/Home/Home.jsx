import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Logo.svg";
import { LocationContext } from "../../../Context/LocationContext";
import axios from "axios";
import { Trie } from "../../utils/Trie";
import Categories from "../Categories/Categories";
import phone from "../../assets/phone.webp";
import appStore from "../../assets/appStore.png";
import playStore from "../../assets/PlayStore.png";
import appGallery from "../../assets/appGallery.jpg";
import becomePartner from "../../assets/becomePartner.webp";
import career from "../../assets/career.svg";
import { Link } from "react-router-dom";
import map from '../../assets/map.PNG'
const key = import.meta.env.VITE_API_KEY;
const APP_STORE_LINK =
  "https://apps.apple.com/us/app/talabat-food-grocery-more/id451001072";
const PLAY_STORE_LINK =
  "https://play.google.com/store/apps/details?id=com.talabat";
const APP_GALLERY_LINK =
  "https://consumer.huawei.com/en/community/details/topicId-173893/";

export default function Home() {
  const { t } = useTranslation(),
    { detailed, getDetailed, country, city } = useContext(LocationContext),
    [areaDetails, setAreaDetails] = useState(null),
    [query, setQuery] = useState(""),
    [adressLoading, setAdressLoading] = useState(false),
    [trie] = useState(() => new Trie()),
    [suggestions, setSuggestions] = useState([]),
    [cityId, setCityId] = useState(null),
    [cities , setCities] = useState(() => new Map()),
    headers = {
      "x-rapidapi-host": "talabat.p.rapidapi.com",
      "x-rapidapi-key": key,
    };

  useEffect(() => {
    console.log('detailed' , detailed);
    
    if (!areaDetails) getAreaDetails();
  }, [detailed]);

  useEffect(() => {
    getDetailed();
    console.log(country, city);
    console.log( 'area details' ,areaDetails);
    if (areaDetails) {
      const map = new Map()
      areaDetails.forEach((area) => {
        trie.insert(area.name);
        // console.log(city , area.city);
        map.set(area.cityName , true)
        if (city === area.cityName && !cityId) {
          setCityId(area.cityId);
        }
      });
      setCities(map)
      console.log(trie);
    }
  }, [areaDetails, trie, country, city]);

  async function getAreaDetails() {
    // reducing api requset so rappid api does not block us for the 5-th time
    if (JSON.parse(localStorage.getItem("areaDetails"))) {
      setAreaDetails(JSON.parse(localStorage.getItem("areaDetails")));
      console.log("we solve it three ");
      return;
    }
    console.log("a7a" , country);
    if (!country) return;
    try {
      const { data } = await axios.get(
        `https://talabat.p.rapidapi.com/area-details?country=${country}`,
        { headers }
      );
      setAreaDetails(data.data.areas);
      localStorage.setItem("areaDetails", JSON.stringify(data.data.areas));
    } catch (error) {
      console.error("Failed to fetch area details:", error);
    }
  }
  function showUserAdress() {
    setAdressLoading(true);
    if (detailed?.message === "address_ready") {
      setQuery(detailed?.address);
      setAdressLoading(false);
    } else if (detailed?.message === "address_failed") {
      // setQuery('failed to find your location');
      console.log("some thing went wrong");
      setAdressLoading(false);
    }
  }
  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    // console.log(value);
    // console.log(trie.suggestions(value));
    setSuggestions(trie.suggestions(value, 6));
  }
  if (!cityId) {
    return (
      <>
        <div
          role="status"
          className="w-full h-100 flex justify-center items-center"
        >
          <svg
            aria-hidden="true"
            className="w-15 h-15 text-gray-200 animate-spin dark:text-gray-100 fill-orange-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }
  return (
    <>
      <section className="bg-orange-50">
        <div id="heroSection" className="container mx-auto">
          <div className="flex items-center p-5 flex-col gap-5">
            <img src={logo} alt="" />
            <h1 className="text-orange-500 text-4xl py-3 text-center">
              {t("hero text")}
            </h1>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
              <div className="flex justify-between items-center gap-3 text-slate-900 bg-white px-5 border border-slate-300 rounded-full py-3">
                <div className="flex gap-3 items-center relative flex-1">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    placeholder={t("search place holder")}
                    className="outline-none md:w-[400px]"
                    value={query || ""}
                    onChange={(e) => handleChange(e)}
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute top-full border-0 left-0 right-0 bg-white h-[200px] lg:h-[250] overflow-y-scroll rounded-lg shadow-lg mt-2 z-50">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-orange-500 cursor-pointer hover:text-white flex items-center gap-5"
                          onClick={() => {
                            setQuery(suggestion);
                            setSuggestions([]);
                          }}
                        >
                          <i className="fa-solid fa-location-dot text-gray-600 text-xl"></i>
                          <div>
                            <span className="text-md block text-slate-900">
                              {suggestion.split(" ").slice(0, 2).join(" ")}
                            </span>
                            <span className="block text-[13px]">
                              {suggestion}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {suggestions.length ? (
                  <i
                    className="fa-regular fa-circle-xmark cursor-pointer text-black"
                    onClick={() => {
                      setSuggestions([]);
                    }}
                  ></i>
                ) : (
                  <i
                    onClick={() => showUserAdress()}
                    className="fa-solid fa-location-crosshairs cursor-pointer"
                  ></i>
                )}
              </div>
              <button className="bg-orange-500 rounded-full py-3 px-4 text-white hover:bg-orange-600 cursor-pointer">
                {t("hero btn")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Categories cityId={cityId} />

      <section className="px-5 py-10 bg-orange-100">
        <div className="justify-center flex gap-6">
          <div className="sm:flex justify-center items-center hidden">
            <img
              className="w-[100px] md:h-[220px] md:w-[200px] "
              src={phone}
              alt=""
            />
          </div>
          <div className="py-10 flex flex-col gap-5 text-center">
            <h1 className=" text-2xl sm:text-5xl text-orange-950 font-bold">
              {t("get the talabat App")}
            </h1>
            <p className="sm:text-xl text-slate-900 ">
              {t("Get what you need, when you need it")}
            </p>
            <div className="flex flex-col md:flex-row gap-3 mt-2 items-center">
              {/* Google Play */}
              <a
                href={PLAY_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="inline-block"
              >
                <img
                  src={playStore}
                  alt="Get it on Google Play"
                  className="h-12 w-auto block"
                />
              </a>

              {/* App Store */}
              <a
                href={APP_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="inline-block"
              >
                <img
                  src={appStore}
                  alt="Download on the App Store"
                  className="h-12 w-auto block"
                />
              </a>

              {/* Huawei AppGallery */}
              <a
                href={APP_GALLERY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore it on AppGallery"
                className="inline-block"
              >
                <img
                  src={appGallery}
                  alt="Explore it on AppGallery"
                  className="h-12 w-auto block"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center">
        <div className="max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-5 py-10 px-5 w-full">
          {/* Become a Partner Card */}
          <div className="flex flex-col justify-between gap-5 bg-orange-200 p-5 rounded-2xl">
            <div className="flex gap-5 items-start">
              <div className="min-w-[120px] h-[120px] flex-shrink-0">
                <img
                  className="w-full h-full object-contain"
                  src={becomePartner}
                  alt="become a partner"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl mb-3 text-orange-950 font-bold">
                  {t("become a partner")}
                </h1>
                <p className="text-sm md:text-md text-slate-950">
                  {t("marketing.reach_headline")}
                </p>
              </div>
            </div>
            <Link className="w-full bg-orange-500 py-2 text-center rounded-full text-slate-100 hover:bg-orange-600">
              {t("marketing.join_cta")}
            </Link>
          </div>

          {/* Careers Card */}
          <div className="flex flex-col justify-between gap-5 bg-orange-200 p-5 rounded-2xl">
            <div className="flex gap-5 items-start">
              <div className="min-w-[120px] h-[120px] flex-shrink-0">
                <img
                  className="w-full h-full object-contain"
                  src={career}
                  alt="career"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl mb-3 text-orange-950 font-bold">
                  {t("careers.grow_headline")}
                </h1>
                <p className="text-sm md:text-md text-slate-950">
                  {t("careers.description")}
                </p>
              </div>
            </div>
            <Link className="w-full bg-orange-500 py-2 text-center rounded-full text-slate-100 hover:bg-orange-600">
              {t("careers.cta")}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h1 className="font-semibold text-lg md:text-3xl py-10 text-center">Cities we serve in Egypt</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 lg:px-40 py-10 bg-cover bg-center max-h-[600px] overflow-y-scroll" style={{ backgroundImage: `url(${map})` }}>
          {Array.from(cities).map(([key , value]) => {
            return (
              <div className="text-slate-900 bg-slate-50 shadow-2xl mx-5 my-2 rounded-2xl p-3">
                {key}
              </div>
            )
          })}
        </div>            
      </section>
    </>
  );
}
