import useFetch from "../../hooks/useFetch"
import "./FeatureProperty.css"

const FeatureProperty = () => {
    const images=[
        "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
    ]

    //we are use query featured and limit , 
    //limit is use how many item are need if 100item are there we need 1st 4 so we use limit
    const {data,loading}=useFetch(`http://localhost:5000/api/hotel?featured=true&limit=4`)
    // console.log(data[0]?.photos[0]|| images[0]);
    return (
    <div className="fp">
        {loading ? "loading please wait" : (data && images.map((img,i)=>(
                <div className="fpItem" key={i}>
                    {/* we use length because 1st we use data[0]?.photos===null it result opposite */}
                    <img className="fpImg" src={data[0]?.photos.length===0 ? img :data[0]?.photos[0]} alt="" />
                    <span className="fpName">{data[i]?.name}</span>
                    <span className="fpCity">{data[i]?.city}</span>
                    <span className="fpPrice">Staring from Rs:{data[i]?.cheapestPrice}</span>
                    <div className="fpRating">
                    <button>{data[i]?.rating}/5</button>
                    <span>Excellent</span>
                    </div>
                </div>
            )
        ))
            
        }
    </div>
  )
}

export default FeatureProperty