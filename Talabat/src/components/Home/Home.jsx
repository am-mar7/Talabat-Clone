import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Logo.svg";
import { LocationContext } from "../../../Context/LocationContext";
import axios from "axios";
import { Trie } from "../../utils/Trie";
const key = "4776ee1bb2msh82c3fb00001f939p155d29jsn6e156f590dda";

export default function Home() {
  const { t } = useTranslation(),
    [areaDetails, setAreaDetails] = useState(null),
    {detailed, getDetailed } = useContext(LocationContext),
    [query, setQuery] = useState(""),
    [adressLoading, setAdressLoading] = useState(false),
    [trie] = useState(() => new Trie()),
    [suggestions, setSuggestions] = useState([]),
    headers = {
      "x-rapidapi-host": "talabat.p.rapidapi.com",
      "x-rapidapi-key": key,
    };

  useEffect(() => {
    if (detailed?.message === "address_ready") {
      setQuery(detailed?.address);
      localStorage.setItem('userArddess' , detailed?.address)
      setAdressLoading(false);
    }
    else if (detailed?.message === 'address_failed'){
      // setQuery('failed to find your location');
      console.log('some thing went wrong');      
      setAdressLoading(false);
    }
    console.log(detailed);    
    // if (!areaDetails) getAreaDetails();
  }, [detailed]);

  useEffect(() => {
    console.log(areaDetails);
    if (areaDetails) {
      areaDetails.forEach((area) => trie.insert(area.name));
      console.log(trie);
    }
  }, [areaDetails, trie]);

  async function getAreaDetails() {
    // try {
    //   const { data } = await axios.get(
    //     `https://talabat.p.rapidapi.com/area-details?country=${country}`,
    //     { headers }
    //   );
    //   setAreaDetails(data.data.areas);
    // } catch (error) {
    //   console.error("Failed to fetch area details:", error);
    // }
  }
  function showUserAdress() {
    setAdressLoading(true);
    getDetailed();
  }
  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    console.log(value);
    console.log(trie.suggestions(value));
    setSuggestions(trie.suggestions(value));
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
                    <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-2 z-50">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-orange-500 cursor-pointer hover:text-white"
                          onClick={() => {
                            setQuery(suggestion);
                            setSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {adressLoading ? (
                  <i className="fas fa-spinner fa-spin text-orange-500"></i>
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
    </>
  );
}
