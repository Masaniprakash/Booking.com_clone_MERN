import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { useState } from "react"
import SearchContext from "../../context/searchContextMy"
import useFetch from '../../hooks/useFetch'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import "./Reserve.css"

const Reserve = ({setOpen,hotelId}) => {
    const {data,loading,error}=useFetch(`http://localhost:5000/api/hotel/getHotelRooms/${hotelId}`)
    console.log(data);
    console.log(hotelId);
    const [selectedRooms,setSelectedRooms]=useState([])

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        // console.log(checked);//if checket it true uncheck false
        // console.log(value);
        setSelectedRooms(
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)//its unchecked to remove the id
        );
    };
    console.log(selectedRooms);

    let context=useContext(SearchContext)
    //to get date
    let len = context.search.length-1
    // console.log(context);
    let dates=context.search[len]?.date

    //use getTime its important because value is insert in backend but in reach is available
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);//take as date type
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];
        //for ex: startdateid 16june to 18june  
        // console.log(start);//Sat Jul 16 2022 00:00:00 GMT+0530 (India Standard Time)
        // console.log(end);//Mon Jul 18 2022 00:00:00 GMT+0530 (India Standard Time)
        // console.log(date);//Sat Jul 16 2022 00:00:00 GMT+0530 (India Standard Time)
        //its used get one by date forex: selected date is 4 june to 6 june 
        //loop return 4june 5june 6june 
        while (date <= end) {
            dates.push(new Date(date)?.getTime());
            // console.log(new Date(date).getTime());//its return 1st startdate gettime after 1657909800000 
            //2st 1657996200000 3rd 1658082600000
            date.setDate(date.getDate() + 1);
            // console.log(date.getDate());//17 18 19
            // console.log(date.getDate() + 1);//18 19 20
        }
        console.log(dates);//[1657909800000, 1657996200000, 1658082600000]
        return dates;
    };
    // console.log(getDatesInRange(dates[0]?.startDate, dates[0]?.endDate));
    const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);
    console.log(alldates)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
        alldates.includes(new Date(date)?.getTime())
        );

        return !isFound;
    };
    const navigate = useNavigate();
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                const res = axios.put(`http://localhost:5000/api/room/availability/${roomId}`, {
                    dates: alldates,
                });
                console.log(res.data);
                return res.data;
                })
            );
            setOpen(false);
            navigate("/");
        } catch (err) {}
      };

    return (
        <div className="reserve">
            <div className="reserveContainer">
                <FontAwesomeIcon  icon={faCircleXmark} className="reserveClose" onClick={ ()=>setOpen(false)} />
                <span>Select the rooms:</span>
                {data?.map((item,index)=>(
                    <div className="reserveItem" key={index}>
                        <div className="reserveItemInfo">
                            <div className="reserveItemInfoTitle">{item?.title}</div>
                            <div className="reserveItemInfoDesc">{item?.desc}</div>
                            <div className="reserveItemInfoMax">Max People:<b>{item?.maxPeople}</b></div>
                            <div className="reserveItemInfoPrice">{item?.price}</div>
                        </div>
                        {item?.roomNumbers?.map((roomNo,index)=>(
                            <div className="room" key={index}>
                                <label>{roomNo?.number}</label>
                                <input type="checkbox" 
                                    value={roomNo?._id} 
                                    disabled={!isAvailable(roomNo)} 
                                    onChange={handleSelect}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <button className="reserveButton" onClick={handleClick}>Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve