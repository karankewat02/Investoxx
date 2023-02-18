import clsx from "clsx";
import 'cors'
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { UserContext } from "../../provider/Auth";
import Graph from "../../components/Graph/Graph";
import Sidebar from "../../components/Sidebar/Sidebar";
import Icon from "../../components/Icon/Icon";
import NameCard from "../../components/NameCard/NameCard";
import Satisfication from "../../components/Satisfication/Satisfication";
import News from "../../components/News/News";
import Portfolio from "../../components/Portfolio/Portfolio";
import Watchlist from "../../components/Watchlist/Watchlist";
import axios from "axios";
import Loading from "../Loading/Loading";
import AddComponent from "../../components/AddComponent/AddComponent";
import NewsAnalyse from "../../components/NewsAnalyse/NewsAnalyse";
import { toast } from "react-hot-toast";
import SearchResult from "../../components/SearchResult/SearchResult";

const BASE_URL = "http://localhost:5000";


const employeeData = [
  {
    id: 1,
    name: "NASDAQ 100",
    position: "Large cap index",
    transactions: 3490,
    rise: true,
    tasksCompleted: 5,
    imgId: 0,
    symbol: "^NDX",
  },

  {
    id: 2,
    name: "S&P 400 ",
    position: "Mid cap index",
    transactions: 590,
    rise: false,
    tasksCompleted: 5,
    imgId: 2,
    symbol: "^MID",
  },

  {
    id: 3,
    name: "Nasdaq US 700",
    position: "Small cap index",
    transactions: 2600,
    rise: true,
    tasksCompleted: 5,
    imgId: 3,
    symbol: "^NQUSS",
  },
];

const Countrydata = [
  { name: "USA", rise: true, value: 21942.83, id: 1 },
  { name: "Ireland", rise: false, value: 19710.0, id: 2 },
  { name: "Ukraine", rise: false, value: 12320.3, id: 3 },
  { name: "Sweden", rise: true, value: 9725.0, id: 4 },
];
const segmentationData = [
  { c1: "Not Specified", c2: "800", c3: "#363636", color: "#535353" },
  { c1: "Male", c2: "441", c3: "#818bb1", color: "#595f77" },
  { c1: "Female", c2: "233", c3: "#2c365d", color: "#232942" },
  { c1: "Other", c2: "126", c3: "#334ed8", color: "#2c3051" },
];

 
export default function Dashboard() {
  const { user } = React.useContext(UserContext);

  const [showSidebar, onSetShowSidebar] = useState(false);

  return (
    <>
      {user?.loginStatus ? (

        <div className="dashboardContainer flex">
        <Sidebar
          onSidebarHide={() => {
            onSetShowSidebar(false);
          }}
          showSidebar={showSidebar}
        />

        <Routes>
          <Route path="" element={<Content onSidebarHide={() => {onSetShowSidebar(true);}}/>} />
          <Route path="news" element={<News/>} />
          <Route path="portfolio" element={<Portfolio/>} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="news-analyse" element={<NewsAnalyse />} />
          <Route path="search-result/:symbol" element={<SearchResult />} />
        </Routes>
      </div>
    ):
    (
      <h1><Link to='/login' >Login First</Link></h1>  
    )}
    </>
    );
  }
  

function Content({ onSidebarHide }) {

  const { user, updateUser } = React.useContext(UserContext);
  // format of date monthname day
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const navigate = useNavigate();

  const [search , setSearch] = useState("");

  const satistfactionData = "Rehovot, Israel, Feb.  17, 2023  (GLOBE NEWSWIRE) --  G Medical Innovations Holdings Ltd. (Nasdaq: GMVD) (the “Company”) announced today that on February 16, 2023, the Company received notice from the Listing Qualifications Department (the “Staff”) of The Nasdaq Stock Market LLC (“Nasdaq”) that, based upon the Company’s non-compliance with the stockholders’ equity requirement for continued listing on The Nasdaq Capital Market, as set forth in Nasdaq Listing Rule 5550(b) (the “Equity Rule”), the Company is subject to delisting from Nasdaq unless the Company timely requests a hearing before a Nasdaq Hearings Panel (the “Panel”).  Accordingly, the Company plans to timely request a hearing before the Panel, which will stay any delisting or suspension action pending the hearing and the expiration of any additional extension period granted by the Panel following the hearing."

  const handelSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search-result/${search}`, {state: {symbol: search}})
  }

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0"></div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">Hello {user?.loginStatus? user.user.name : "Login!"}</div>

              </div>
              <div className="flex items-center">
                <Icon
                  path="res-react-dash-date-indicator"
                  className="w-3 h-3"
                />
                <div className="ml-2">{date}</div>
              </div>
            </div>
            <IconButton
              icon="res-react-dash-sidebar-open"
              className="block sm:hidden"
              onClick={onSidebarHide}
            />
          </div>
          <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
            <Icon
              path="res-react-dash-search"
              className="w-5 h-5 search-icon left-3 absolute"
            />
            <form onSubmit={handelSearch} >
              <input
                type="text"
                name="company_website"
                id="company_website"
                className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
                placeholder="search symbol"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        {employeeData.map(
          ({
            id,
            name,
            position,
            transactions,
            rise,
            tasksCompleted,
            imgId,
            symbol
          }) => (
            <NameCard
              key={id}
              id={id}
              name={name}
              position={position}
              transactionAmount={transactions}
              rise={rise}
              tasksCompleted={tasksCompleted}
              imgId={imgId}
              symbol={symbol}
            />
          )
        )}

        <div className="w-full p-2 lg:w-2/3">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph  symbol="^NDX" name="NASDAQ 100 Summary" />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-80">
            <TopCountries />
          </div>
        </div>

        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-80">
            <Segmentation />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-80">
            <Satisfication description={satistfactionData} />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card overflow-hidden h-80">
            <AddComponent />
          </div>
        </div>
      </div>
    </div>
  );
}



function TopCountries() {

  const [data , setData] = useState([])
  const [loading , setLoading] = useState(true)

  const top_stock_data = async () => {
      await axios.get("http://localhost:5000/api/prediction/get-top-stocks").then((res) => {
      const data = res.data.resultData.sort(() => Math.random() - 0.5).slice(0, 5)
      setData(data)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    top_stock_data()
  }, [])
  
  const navigate = useNavigate()

  const handelSymbolSearch = (symbol) => {
    navigate(`/dashboard/search-result/${symbol}`, {state: {symbol: symbol}})
  }

  return (
    <>
      {loading ? <Loading/> :
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Current Top Stocks</div>
        {/* <Icon path="res-react-dash-plus" className="w-5 h-5" /> */}
      </div>
      <br />
      {/* <div className="">favourites</div> */}
      <div className="flex items-center mt-3" >
          <div className="">&nbsp;</div>
          <div className="ml-2">Symbol</div>
          <div className="flex-grow" />
          <div className="">Current</div>
          <div className="flex-grow" />
          <div className="">Predicted(next month)</div>

        </div>
      {data.map((i,index) => (
        <div className="flex items-center mt-3" key={index}>
          <div className="">{index+1}</div>
          <div onClick={()=>handelSymbolSearch(i.symbol)} className="ml-2" style={{background:"#82818185", cursor:"pointer",color:"#fff",padding:".1rem .5rem", borderRadius:"100vw"}}>{i.symbol}</div>
          &nbsp;
          <Icon path="res-react-dash-tick" />
          <div className="flex-grow" />
          <div className="">{`$${i.last_known_price}`}</div>
          <div className="flex-grow" />
          <div className="">{`$${i.predicted_performance}`}</div>
          <Icon
            path={
              ((i.predicted_performance-i.last_known_price)>0) ? "res-react-dash-country-up" : "res-react-dash-country-down"
            }
            className="w-4 h-4 mx-3"
            />
        </div>
      ))}
      <div className="flex-grow" />
    </div>
    }
  </>
  );
}

function Segmentation() {
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Segmentation</div>

        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div className="mt-3">All users</div>
      {segmentationData.map(({ c1, c2, c3, color }) => (
        <div className="flex items-center" key={c1}>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: color,
            }}
          />
          <div className="ml-2" style={{ color }}>
            {c1}
          </div>
          <div className="flex-grow" />
          <div className="" style={{ color }}>
            {c2}
          </div>
          <div className="ml-2 w-12 card-stack-border" />
          <div className="ml-2 h-8">
            <div
              className="w-20 h-28 rounded-lg overflow-hidden"
              style={{
                background: c3,
              }}
            >
              {c1 === "Other" && (
                <img
                  src="https://assets.codepen.io/3685267/res-react-dash-user-card.svg"
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex mt-3 px-3 items-center justify-between bg-details rounded-xl w-36 h-12">
        <div className="">Details</div>
        <Icon path="res-react-dash-chevron-right" className="w-4 h-4" />
      </div>
    </div>
  );
}


function IconButton({
  onClick = () => {},
  icon = "options",
  className = "w-4 h-4",
}) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="w-full h-full"
      />
    </button>
  );
}

function Image({ path = "1", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt=""
      className={clsx(className, "rounded-full")}
    />
  );
}

// ReactDOM.render(<App />,
// document.getElementById("root"))
