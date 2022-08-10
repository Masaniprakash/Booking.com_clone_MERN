import "./PropertyList.css"
import useFetch from "../../hooks/useFetch"
import hotel from "../../images/hotels.webp"
import appartment from "../../images/appartment.jpg"
import cabin from "../../images/cabin.jpg"
import resort from "../../images/resort.jpg"
import villas from "../../images/villas.jpg"

const PropertyList = () => {
    return (
        <div className='property'>
            <div className="propertyItems">
                <img src={hotel} alt="properties" className="propertyImg" />
                <div className="propertyTitle">
                    <h1>Hotels</h1>
                    <h2>80 Hotels</h2>
                </div>
            </div>
            <div className="propertyItems">
                <img src={appartment} alt="properties" className="propertyImg" />
                <div className="propertyTitle">
                    <h1>Appartment</h1>
                    <h2>150 Hotels</h2>
                </div>
            </div>
            <div className="propertyItems">
                <img src={villas} alt="properties" className="propertyImg" />
                <div className="propertyTitle">
                    <h1>Villas</h1>
                    <h2>90 Hotels</h2>
                </div>
            </div>
            <div className="propertyItems">
                <img src={resort} alt="properties" className="propertyImg" />
                <div className="propertyTitle">
                    <h1>Resorts</h1>  
                    <h2>63 Hotels</h2>
                </div>
            </div>
                
            <div className="propertyItems">
                <img src={cabin} alt="properties" className="propertyImg" />
                <div className="propertyTitle">
                    <h1>Cabin</h1>
                    <h2>55 Hotels</h2>
                </div>
            </div>    
        </div>
    )
}

export default PropertyList