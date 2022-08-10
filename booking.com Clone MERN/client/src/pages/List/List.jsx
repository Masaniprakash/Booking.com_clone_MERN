import './List.css'
import Header from '../../components/Header/Header'
import Navbar from "../../components/Navbar/Navbar"
import SearchItem from '../../components/searchItem/SearchItem'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {format} from "date-fns"
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useFetch from '../../hooks/useFetch'

const List = () => {
    const location=useLocation()
    // console.log(location);
    // {pathname: '/hotels', search: '', hash: '', state: {date: [{endDate: Sun Jul 10 2022 10:50:28 GMT+0530 
    //(India Standard Time) key: "selection"startDate: Sun Jul 10 2022 10:50:28 GMT+0530 (I}]
    // destination: "ooty"
    // option: {adult: 1, children: 0, room: 1}}, key: 'esfqakng'}
    
    const [destination,setDestination]=useState(location.state.destination)
    const [date,setDate]=useState(location.state.date)
    const [options,setOptions]=useState(location.state.option)
    const [min,setMin]=useState()
    const [max,setMax]=useState()
    const [openDate,setOpenDate]=useState(false)

    const  {data,loading,reFetch}=useFetch(`http://localhost:5000/api/hotel?city=${destination}&min=${min || 0 }&max=${max || 110999}`)
    
    
    const handleClick = () => {
        reFetch();
    };
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input placeholder={destination} type="text"
                                onChange={(e)=>setDestination(e.target.value)}
                            />
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>
                                {`${format(date[0].startDate,"MMM/dd/yyyy")} to 
                                ${format(date[0].endDate, "MMM/dd/yyyy")}`}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDate([item.selection])}
                                    minDate={new Date()}
                                    ranges={date}
                                />
                            )}
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input type="number"
                                        className="lsOptionInput" 
                                        onChange={(e)=>setMin(e.target.value)}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input type="number" className="lsOptionInput" 
                                        onChange={(e)=>setMax(e.target.value)}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.adult}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="lsOptionInput"
                                        placeholder={options.children}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.room}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? "loading" : <>{data.map((item,index)=>(

                            <SearchItem item={item} key={index}/>
                        ))}</>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List