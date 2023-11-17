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
          <div className="rounded-circle">
            {review.userAvatarURL !== "" ? (
              <img
                className="rounded-circle"
                src={review.userAvatarURL}
                alt=""
                style={{ width: "50px" }}
              />
            ) : (
              <img
                className="rounded-circle"
                src={avatar}
                alt=""
                style={{ width: "50px" }}
              />
            )}
          </div>
          <h4 className="me-3">{review.displayName}</h4>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p className="lead">{review.reviewContent}</p>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
