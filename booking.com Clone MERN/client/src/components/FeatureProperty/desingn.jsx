import "./FeatureProperty.css"

const FeatureProperty = () => {
  return (
    <div className="fp">
        <div className="fpItem">
            <img className="fpImg" src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1" alt="" />
            <span className="fpName">Aparthotel Stare Miasto</span>
            <span className="fpCity">Madrid</span>
            <span className="fpPrice">Staring from Rs:4000</span>
            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className="fpItem">
            <img className="fpImg" src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1" alt="" />
            <span className="fpName">Four Seanons Hotel</span>
            <span className="fpCity">Austin</span>
            <span className="fpPrice">Staring from Rs:4500</span>
            <div className="fpRating">
                <button>9.5</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className="fpItem">
            <img className="fpImg" src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1" alt="" />
            <span className="fpName">Hilton Garden Inn</span>
            <span className="fpCity">Berlin</span>
            <span className="fpPrice">Staring from Rs:3000</span>
            <div className="fpRating">
                <button>8.3</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className="fpItem">
            <img className="fpImg"
            src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
            alt=""
            />
            <span className="fpName">Hilton Garden Inn</span>
            <span className="fpCity">Berlin</span>
            <span className="fpPrice">Starting from 2800</span>
            <div className="fpRating">
                <button>8.3</button>
                <span>Excellent</span>
            </div>
        </div>
    </div>
  )
}

export default FeatureProperty