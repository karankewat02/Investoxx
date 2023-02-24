import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Loading from "../../screens/Loading/Loading";
import AddComponent from "../AddComponent/AddComponent";
import NewsCard from "../NewsCard/NewsCard";
import Tryagain from "../TryAgain/Tryagain";

export default function News() {
  const [loading, setLoading] = React.useState(true);
  const [news, setNews] = React.useState([]);
  const location = useLocation();
  const receivedData = location?.state?.API;

  const newsAPI = receivedData
    ? receivedData
    : "https://api.polygon.io/v2/reference/news?limit=12&apiKey=_UQ5h1LONGUswPwxAjNXISHMSwRoWAtH";
  // toast(receivedData);

  const get_news = async () => {
    await axios
      .get(newsAPI)
      .then((res) => {
        setNews(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const current_time = new Date().toLocaleTimeString();

  React.useEffect(() => {
    get_news();
  }, []);

  const handelTryagain = () => {
    setLoading(true);
    setTimeout(() => {
      get_news();
    }, 4000);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full">
          <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0"></div>
          <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
            {news.length === 0 ? (
              <div className='TryagainContainer'>

              <div className="flex w-full">
                        <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0"></div>
                        <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
                          <div className="w-full sm:flex p-2 items-end">
                            <div className="sm:flex-grow flex-wrap flex justify-between">
                              <div className="text-3xl font-bold text-gray-400 mt-5 text-center">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </div>
              
                              <div className="w-full mt-10 p-2 lg:w-3/3">
                                <div className="rounded-lg bg-card overflow-hidden h-80">
                                  <div>
                                    <div className="w-full h-20 add-component-head" />
                                    <div
                                      className="flex flex-col items-center"
                                      style={{
                                        transform: "translate(0, -40px)",
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          background: "#414455",
                                          width: "80px",
                                          height: "80px",
                                          borderRadius: "999px",
                                        }}
                                      >
                                        <img
                                          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/error-3173169-2647854.png"
                                          alt=""
                                          className="w-full h-full"
                                        />
                                      </div>
                                      <div className="text-2xl text-white font-bold mt-3">
                                        Something went wrong
                                      </div>
                                      <div className="mt-2">
                                        We couldn't get the data you were looking for.
                                      </div>
                                      <div className="mt-1">
                                        try again after 1 minute
                                      </div>
                                      <div
                                        className="flex items-center p-3 mt-3"
                                        style={{
                                          background: "#2f49d1",
                                          borderRadius: "15px",
                                          padding: "8px 16px",
                                          justifyContent: "center",
                                          color: "white",
                                        }}
                                      >
                                        <div
                                          onClick={handelTryagain}
                                          style={{ cursor: "pointer" }}
                                          className="ml-2"
                                        >
                                          Try Again
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
              
                    </div>
            ) : (
              <>
                <div className="w-full sm:flex p-2 items-end">
                  <div className="sm:flex-grow flex justify-between">
                    <div className="text-3xl font-bold text-white">
                      Market News
                    </div>
                    <div className="text-sm text-gray-400">
                      Last Updated: {current_time}
                    </div>
                  </div>
                </div>

                {news.map((item, index) => {
                  return (
                    <div key={index} className="w-full p-2 lg:w-1/3">
                      <div className="rounded-lg bg-card overflow-hidden h-80">
                        <NewsCard data={item} />
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
