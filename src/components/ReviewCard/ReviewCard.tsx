import avatar from "../../assets/images/User Profile/Avatar.png";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

type ReviewCardProps = {
  review: {
    reviewContent: string;
    userAvatarURL: string;
    displayName: string;
    reviewId: string;
    rating: number;
  };
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  console.log(review);
  return (
    <>
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <div className="rounded-circle">
            <img
              className="rounded-circle"
              src={review.userAvatarURL !== "" ? review.userAvatarURL : avatar}
              alt=""
              style={{ width: "50px" }}
            />
          </div>
          <h4 className="me-3">{review.displayName}</h4>
        </div>
        <div className="card-body">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              direction: "ltr",
              marginBottom: "1rem",
            }}
          >
            <Rating
              name="half-rating-read"
              value={review.rating}
              precision={0.1}
              readOnly
            />
          </Box>
          <blockquote className="blockquote mb-0">
            <p className="lead">{review.reviewContent}</p>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
