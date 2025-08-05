import { useEffect, useState } from "react";
import HotelCard from "../Components/HotelCardView";
// import SearchBar from "../components/SearchBar";
import axios from "axios";
import { baseApi } from "../BaseApi";

export default function Home() {
  const [hotelsData,setHotelData] = useState([])  
  const FetchAllHOtel = ()=>{
    axios.get(`${baseApi}/hotel/get-all`).then(resp=>{console.log("resp",resp)
      setHotelData(resp.data.hotel)
    }
    ).catch(e=>{console.log("error",e)})
  }
  useEffect(FetchAllHOtel,[])
  const [search, setSearch] = useState("");

  const filteredHotels = hotelsData.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* <SearchBar onSearch={setSearch} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHotels.map(h => <HotelCard key={h._id} hotel={h} />)}
      </div>
    </div>
  );
}
