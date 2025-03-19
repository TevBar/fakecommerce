import { BiSolidOffer } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";

function Features() {
  return (
    <div className="features-container">
      <div className="features-wrapper">
        {/* Feature 1: Season Sale */}
        <div className="feature-item">
            <div className="feature-icon"><BiSolidOffer /></div>
            <h2 className="feature-title">Season Sale</h2>
            <p className="feature-description">Don't miss out on this opportunity to snag your favorite handbag at a great price! Shop now while stocks last.</p>
        </div>

        {/* Feature 2: Free Shipping */}
        <div className="feature-item">
            <div className="feature-icon"><FaShippingFast /></div>
            <h2 className="feature-title">Free Shipping</h2>
            <p className="feature-description">We offer free and smooth shipping for all our customers across India. Choose your favorite bag and the shipping fees is on us.</p>
        </div>

        {/* Feature 3: Assured Quality */}
        <div className="feature-item">
            <div className="feature-icon"><HiBadgeCheck /></div>
            <h2 className="feature-title">Assured Quality</h2>
            <p className="feature-description">Each and every bag undergoes rigorous testing and meticulous craftsmanship, ensuring that it meets the highest industry standards.</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
