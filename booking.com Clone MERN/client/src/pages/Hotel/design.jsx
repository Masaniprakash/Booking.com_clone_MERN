import './Hotel.css'
import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

const Hotel = () => {
    const location=useLocation()
    
    //{pathname: '/hotels/62cd3e326369834f9b31e9d2', search: '', hash: '', state: null, key: 'sovke39w'}
    // we want id split path as /
    let split=location.pathname.split("/")
    // console.log(split);//['', 'hotels', '62cd3e326369834f9b31e9d2'] we take the last one 
    let iNo=split.length-1
    // console.log(iNo);//ino=3 -1 = 2 so inois 2 we take the last one 
    const id=split[iNo]
    console.log(id);

    const {data,loading}=useFetch(`http://localhost:5000/api/hotel/find/${id}`)
    // console.log(data);
    const [sliderNo,setSliderNo]=useState(0)
    const [openSlider,setOpenSlider]=useState(false)
    const photos = [
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
        },
    ];
    // console.log(photos[sliderNo].src);

    const handleClick=(i)=>{
        setSliderNo(i)
        setOpenSlider(true)
    }

    const handleChangeSlider=(action)=>{
        let newSliderNo
        if(action==="left"){
            newSliderNo =sliderNo === 0 ? 5 : sliderNo-1 
        }else{
            newSliderNo =sliderNo === 5 ? 0 : sliderNo+1      
        }
        setSliderNo(newSliderNo) 
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
                            <img src={photos[sliderNo].src} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon onClick={()=>handleChangeSlider("right")} className='rightIcon' icon={faCircleArrowRight} />
                </div>}
                {loading?"loading please wait":<div className="hotelWrapper">
                    <button className='bookNow'>Reserve or Book Now!</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.city}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location - {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over Rs:10,000 at this property and get a lunch
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
                        <h1>Perfect for a 9-night stay!</h1>
                            <span>
                                Located in the real heart of chennai, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>Rs 24,000</b> (9 nights)
                            </h2>
                            <button>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>}
                <MailList />
                <Footer />
            </div>           
        </div>
    )
}

export default Hotel