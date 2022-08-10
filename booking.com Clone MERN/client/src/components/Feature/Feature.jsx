import "./Feature.css"
import useFetch  from "../../hooks/useFetch"
import feature1 from '../../images/f1.jpg'
import feature2 from '../../images/f2.jpg'
import feature3 from '../../images/f3.jpg'
const Feature = () => {
    let url="http://localhost:5000/api"
    //use proxy in package.json it used to staring common url for ex:"http://localhost:5000/api"
    const {data,loading}=useFetch(`${url}/hotel/countByCity?cities=Chennai,Coimbatore,Tiruppur`)
    return (
        <div className='feature'>
            {loading?"loading please wait":<><div className="featureItem">
                <img src={feature1} alt="Hotel" className="featureImg"/>
                <div className="featureTitle">
                    <h1>Chennai</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featureItem">
                <img src={feature2} alt="Hotel" className="featureImg"/>
                <div className="featureTitle">
                    <h1>Coimbatore</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featureItem">
                <img src={feature3  } alt="Hotel" className="featureImg"/>
                <div className="featureTitle">
                    <h1>Tiruppur</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div></>}
        </div>
    )
}

export default Feature