import './Hotel.css'
import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import  SearchContext  from '../../context/searchContextMy'
import { AuthContext } from '../../context/AuthContextFor'
import Reserve from '../../components/Reserve/Reserve'

const Hotel = () => {
    const [openModal,setOpenModal]=useState(false)
    const [sliderNo,setSliderNo]=useState(0)
    const [openSlider,setOpenSlider]=useState(false)
    const navigate=useNavigate
    const location=useLocation()
    //{pathname: '/hotels/62cd3e326369834f9b31e9d2', search: '', hash: '', state: null, key: 'sovke39w'}
    // we want id split path as /
    let split=location.pathname.split("/")
    // console.log(split);//['', 'hotels', '62cd3e326369834f9b31e9d2'] we take the last one 
    let iNo=split.length-1
    // console.log(iNo);//ino=3 -1 = 2 so inois 2 we take the last one 
    const id=split[iNo]
    // console.log(id);

    const {data,loading}=useFetch(`http://localhost:5000/api/hotel/find/${id}`)
    // console.log(data);

    // console.log(photos[sliderNo].src);

    const handleClick=(i)=>{
        setSliderNo(i)
        setOpenSlider(true)
    }

    // const {date} = useContext(SearchContext)
    // console.log(SearchReducer);
    let context=useContext(SearchContext)
    
    
    let len = context.search.length-1
    let option=context.search[len]?.option
    // console.log(option.room);
    // console.log(context);
    let dates=context.search[len]?.date
    // console.log(dates[0]?.startDate);
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        // console.log(diffDays);
        // console.log(timeDiff);
        return diffDays;
    }

    const days=dayDifference(dates[0]?.endDate, dates[0]?.startDate);
    
    
    // console.log(days);
    const handleChangeSlider=(action)=>{
        let newSliderNo
        if(action==="left"){
            newSliderNo =sliderNo === 0 ? 5 : sliderNo-1 
        }else{
            newSliderNo =sliderNo === 5 ? 0 : sliderNo+1      
        }
        setSliderNo(newSliderNo) 
    }

    
    const {user}=useContext(AuthContext)
    const handleBook=()=>{
        if (user) {
            console.log(openModal);
            setOpenModal(true);
        } else {
            navigate("/login")
        }
        console.log(openModal);
    }
    
    return (
        <div className='hotel'>
            <Navbar />
            <Header type="list" />
            <div className="hotelContainer">
                {openSlider && <div className="slider">
                    <FontAwesomeIcon className='closeIcon' icon={faCircleXmark}
                        onClick={()=>setOpenSlider(false)}
                    />
                    <FontAwesomeIcon onClick={()=>handleChangeSlider("left")} className='leftIcon' icon={faCircleArrowLeft} />
                    <div className="sliderWrapper">
                            <img src={data.photos[sliderNo]} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon onClick={()=>handleChangeSlider("right")} className='rightIcon' icon={faCircleArrowRight} />
                </div>}
                {loading?"loading please wait":<div className="hotelWrapper">
                    <button className='bookNow' >Reserve or Book Now!</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.city}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location - {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over Rs:10,000 at this property and get a free snaks
                    </span>
                    <div className="hotelImages">
                        {data.photos?.map((photo,index)=>(
                            <div className="hotelImgWrapper" key={index}>
                                <img onClick={()=>handleClick(index)} src={photo} alt="" className='hotelImg' />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetils">
                        <div className="hotelDetailsText">
                            <h1>Stay in the heart of Chennai</h1>
                            <p className="hotelDesc">
                                Set in Chennai, 400 m from US Embassy, Four Season Hotel offers accommodation 
                                with a restaurant, free private parking, a bar and a shared lounge. This 3-star 
                                hotel offers a oncierge service and a tour desk. The accommodation provides a 24-hour 
                                front desk, airport transfers, room service and free WiFi throughout the property. 
                                The hotel will provide guests with air-conditioned rooms offering a desk, a kettle, 
                                a safety deposit box, a flat-screen TV and a private bathroom with a shower. At Four 
                                Season Hotel the rooms come with bed linen and towels.Continental and buffet breakfast 
                                options are available every morning at the accommodation.
                            </p>
                        </div>
                        <div className="hotelDetailPrice">
                        <h1>Perfect for a {days?days:"1"}-night stay!</h1>
                            <span>
                                Located in the real heart of chennai, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>Rs {days?days*data.cheapestPrice*option.room:data.cheapestPrice}</b>
                                ({days?days:"1"} nights)
                            </h2>
                            <button onClick={handleBook}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>}
                <MailList />
                <Footer />
            </div>  
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}         
        </div>
    )
}

export default Hotel