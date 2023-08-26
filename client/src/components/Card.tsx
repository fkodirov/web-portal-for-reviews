import { StarFill } from "react-bootstrap-icons";
const Card: React.FC = () => {
  return (
    <>
      <div className="col-lg-3 col-md card card-default shadow p-3 mb-5 rounded">
        <img className="card-img-top" src="/12.jpg" alt="Card image cap" />
        <div className="card-body">
          <div className="card-top">
            <h5 className="card-title">Card title for Battlefield</h5>
            <div className="author-rate">8/10</div>
          </div>
          <h6>
            Battlefield 5 <span className="badge badge-games">Games</span>
          </h6>
        </div>
        <div className="card-footer">
          <div className="card-rating row">
            <div className="rate">5.0</div>
            <StarFill size={24} color="gold"></StarFill>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
