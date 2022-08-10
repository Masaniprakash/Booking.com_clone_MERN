import Feature from "../../components/Feature/Feature"
import FeatureProperty from "../../components/FeatureProperty/FeatureProperty"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import MailList from "../../components/MailList/MailList"
import Navbar from "../../components/Navbar/Navbar"
import PropertyList from "../../components/probertyList/PropertyList"
import "./Home.css"

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Feature /> 
                <h1 className="homeTitle">Browse your properites</h1>
                <PropertyList />
                <h1 className="homeTitle homeTitleTwo">Homes guests love</h1>
                <FeatureProperty />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home