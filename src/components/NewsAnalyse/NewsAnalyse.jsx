import React from 'react'
import axios from "axios";
import Loading from "../../screens/Loading/Loading";
import NewsCard from "../NewsCard/NewsCard";
import { useLocation } from 'react-router-dom';

export default function NewsAnalyse() {
    
    const [loading, setLoading] = React.useState(false);
    const [news, setNews] = React.useState([]);  

    const location = useLocation();
    const receivedData = location.state.data;

    const current_time = new Date().toLocaleTimeString();

    console.log(receivedData);
  
  return (
    <>
    {
      loading ? <Loading/> :
      <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0"></div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="text-3xl font-bold text-white">News Analysis</div>
            <div className="text-sm text-gray-400">Last Updated: {current_time}</div>
          </div>
        </div>




      </div>
    </div>
    }
    </>
  );
}





