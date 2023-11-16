import avatar from "../../assets/images/User Profile/Avatar.png";

type ReviewCardProps = {
  review: {
    reviewContent: string;
    userAvatarURL: string;
    displayName: string;
  };
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  console.log(review);
  return (
    <>
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <div className="">
            {review.userAvatarURL !== "" ? (
              <img
                src={review.userAvatarURL}
                alt=""
                style={{ width: "50px" }}
              />
            ) : (
              <img src={avatar} alt="" style={{ width: "50px" }} />
            )}
          </div>
          <h5 className="ms-2">{review.displayName}</h5>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{review.reviewContent}</p>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
