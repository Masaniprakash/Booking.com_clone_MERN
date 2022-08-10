import './Footer.css'

const Footer = () => {
    return (  
        <div className="footer">
            <div className="footerLists">
                <ul className="footerOneList">
                    <li className='footerListItem'>Countries</li>
                    <li className='footerListItem'>Regions</li>
                    <li className='footerListItem'>Cities</li>
                    <li className='footerListItem'>Districts</li>
                    <li className='footerListItem'>Airports </li>
                    <li className='footerListItem'>Hotels</li>
                </ul>
                <ul className="footerOneList">
                    <li className="footerListItem">Homes </li>
                    <li className="footerListItem">Apartments </li>
                    <li className="footerListItem">Resorts </li>
                    <li className="footerListItem">Villas</li>
                    <li className="footerListItem">Hostels</li>
                    <li className="footerListItem">Guest houses</li>
                </ul>
                <ul className="footerOneList">
                    <li className="footerListItem">Car rental </li>
                    <li className="footerListItem">Flight Finder</li>
                    <li className="footerListItem">Restaurant reservations </li>
                    <li className="footerListItem">Travel Agents </li>
                </ul>
                <ul className="footerOneList">
                    <li className="footerListItem">Curtomer Service</li>
                    <li className="footerListItem">Partner Help</li>
                    <li className="footerListItem">Careers</li>
                    <li className="footerListItem">Sustainability</li>
                    <li className="footerListItem">Press center</li>
                    <li className="footerListItem">Safety Resource Center</li>
                    <li className="footerListItem">Investor relations</li>
                    <li className="footerListItem">Terms & conditions</li>
                </ul>
            </div>
            <div className="footerText">Copyright © {new Date().getFullYear()} Massbooking.</div>
        </div>   
    ) 
}

export default Footer