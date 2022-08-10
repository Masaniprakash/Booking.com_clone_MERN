import './SearchItem.css'
import sI from '../../images/searchItem.webp'
import { Link } from 'react-router-dom';

const SearchItem = ({item,index}) => {
    // console.log(item);
    return (
        <div className='searchItem' key={index}>
            <img src={sI} alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}m from center</span>
                <span className="siTaxiOp">free airport taxi</span>
                <span className="siSubtitle">Studio {item.type} with Air conditioning</span>
                <span className="siFeature">Studio . 1 bathroom . 21m<sup>2</sup> 1full bed</span>
                <span className="siCancel">Free cancellation</span>
                <span className="siCancelSubtiltle">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="siDetail">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>
                <div className="siPrice">
                    
                    <span className="siPriceRate">RS {item.cheapestPrice}</span>
                    <span className="siPriceTax">+ RS 600 taxes and charges</span>
                    <Link to={`/hotels/${item._id}`}>                  
                        <button className='siCheckButton'>See availability</button>
                    </Link>
                </div>
                <div className="si"></div>
            </div>
        </div>
    )
}

export default SearchItem