import "./header.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed, faCalendar, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons"
import { DateRange } from 'react-date-range';
import {useContext, useState} from 'react'
import {format} from "date-fns"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {useNavigate} from 'react-router-dom'
import  SearchContext from "../../context/searchContextMy";

const Header = ({type}) => {
    const navigate=useNavigate()
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);
    const [openDate,setOpenDate]=useState(false)
    const [openOption,setOpenOption]=useState(false)
    const [destination,setDestination]=useState("")
    const [option,setOption]=useState({
        adult:1,
        children:0,
        room:1
    })
    const handleOption=(person , operation)=>{
        setOption((prev)=>{
            return {
                ...prev,
                [person]:operation==="inc" ? option[person]+1 : option[person]-1
            }
        })
    }

    const context=useContext(SearchContext)
    const contextPush={destination,date,option}

    const handleSearch=()=>{
        console.log(context);
        console.log(contextPush);
        context.search.push(contextPush)
        navigate("/hotels",{state:{destination,date,option}})
    }

    return (
        <div className='header'>
            <div className={type==="list"?"headerContainer list":"headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== "list" && 
                    <><h1 className="headerTitle">A lifetime of discouts? it's Genius</h1>
                    <p className="headerDisc">
                        Get reward for your travels - unlock instant saving of 10% or 
                        more with a free massbooking account
                    </p>
                    <button className="headerBtn">Sign in / Register</button>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                            <input  
                                type="text"
                                placeholder="Where are you going"
                                className="headerSearchInput"
                                onChange={(e)=>setDestination(e.target.value)}
                            />
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendar} className="headerIcon" />
                            {/*MM is captial */}
                            <span 
                                className="headerSearchText"
                                onClick={()=>setOpenDate(!openDate)}
                            >
                                {`${format(date[0].startDate,"MMM/dd/yyyy")} to ${format(date[0].endDate,"MMM/dd/yyyy")}`}
                            </span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                minDate={new Date()}
                                className="date"
                            />}
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                            <span 
                                className="headerSearchText"
                                onClick={()=>setOpenOption(!openOption)}
                            >
                                {`${option.adult} adult . ${option.children} children . ${option.room} room`}  
                            </span>
                        {openOption  && <div className="option">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button 
                                            className="optionCounterBtn" 
                                            disabled={option.adult<=1} 
                                            onClick={()=>handleOption("adult","dec")}
                                        >
                                            -
                                        </button>
                                        <span className="optionCounterText">{option.adult}</span>
                                        <button className="optionCounterBtn" 
                                            onClick={()=>handleOption("adult","inc")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button 
                                            className="optionCounterBtn" 
                                            disabled={option.children<=1} 
                                            onClick={()=>handleOption("children","dec")}
                                        >
                                            -
                                        </button>
                                        <span className="optionCounterText">{option.children}</span>
                                        <button className="optionCounterBtn"  
                                            onClick={()=>handleOption("children","inc")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button 
                                            className="optionCounterBtn" 
                                            disabled={option.room<=1}   
                                            onClick={()=>handleOption("room","dec")}
                                        >
                                            -
                                        </button>
                                        <span className="optionCounterText">{option.room}</span>
                                        <button className="optionCounterBtn" 
                                            onClick={()=>handleOption("room","inc")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button 
                                className="headerBtn"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div></>
                }
            </div>
        </div>
    )
}

export default Header