import "./PropertyList.css"
import useFetch from "../../hooks/useFetch"
import hotel from "../../images/hotels.webp"
import appartment from "../../images/appartment.jpg"
import cabin from "../../images/cabin.jpg"
import resort from "../../images/resort.jpg"
import villas from "../../images/villas.jpg"

const PropertyList = () => {
    const images=[hotel,appartment,villas,resort,cabin]
    let url="http://localhost:5000/api"
    //use proxy in package.json it used to staring common url for ex:"http://localhost:5000/api"
    const {data,loading}=useFetch(`${url}/hotel/countByType`)
    console.log(data);
    return (
        <div className='property'>
            {loading?("loading"):
                (<>
                    {data && images.map((img,i)=>
                        (<div className="propertyItems" key={i}>
                            <img src={img} alt="properties" className="propertyImg" />
                            <div className="propertyTitle">
                                <h1>{data[i]?.type}</h1>
                                <h2>{data[i]?.count} {data[i]?.type}</h2>
                                {/* ? is not used to if fetch not coming or any error its shows error as 
                                typeError count undefined .....................
                                ? is overcome this error its shows img but not display h1, h2  
                                if see do error in url so error and remove ?*/}

                            </div>
                        </div>)
                    )}
                </>)
            }
        </div>
        
    )
}

export default PropertyList