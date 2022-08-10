import "./MailList.css"

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mailText">Save time, save money!</h1>
        <span className="mailDesc">Sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer">
            <input type="text" name="" id="" placeholder="Your email" />
            <button>Subscribe</button>
        </div>
        <div className="mlItems">

        </div>
    </div>
  )
}

export default MailList