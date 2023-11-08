type ReviewCardProps = {
  name: string;
  review: string;
};
const ReviewCard = ({ name, review }: ReviewCardProps) => {
  return (
    <>
      <div className="card">
        <div className="card-header">{name}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{review}</p>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
