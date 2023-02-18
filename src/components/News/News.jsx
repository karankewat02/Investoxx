import axios from "axios";
import React from "react";
import Loading from "../../screens/Loading/Loading";
import AddComponent from "../AddComponent/AddComponent";
import NewsCard from "../NewsCard/NewsCard";

export default function News() {
  
  const [loading, setLoading] = React.useState(true);
  const [news, setNews] = React.useState([]);  

  const get_news = async () => {
    const newsAPI = "https://api.polygon.io/v2/reference/news?apiKey=_UQ5h1LONGUswPwxAjNXISHMSwRoWAtH";
    await axios.get(newsAPI).then((res) => {
      setNews(res.data.results);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }

  const current_time = new Date().toLocaleTimeString();

  React.useEffect(() => {
    get_news();
  }, []);
  
  return (
    <>
    {
      loading ? <Loading/> :
      <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0"></div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="text-3xl font-bold text-white">Market News</div>
            <div className="text-sm text-gray-400">Last Updated: {current_time}</div>
          </div>
        </div>

        {
          news.map((item, index) => {
            return (
              <div key={index} className="w-full p-2 lg:w-1/3">
                <div className="rounded-lg bg-card overflow-hidden h-80">
                  <NewsCard data={item} />
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </div>
    }
    </>
  );
}
