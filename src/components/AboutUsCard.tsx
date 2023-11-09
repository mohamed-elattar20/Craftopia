type AboutUsCardProps = {
  title: string;
  imgSrc: string;
};

export const AboutUsCard = ({ title, imgSrc }: AboutUsCardProps) => {
  return (
    <article className="col">
      <div className="card dd-flex flex-column justify-content-center align-items-center py-5">
        <img src={imgSrc} className="" alt="..." />
        <div className="card-body text-center">
          <h5 className="card-title fw-semibold">{title}</h5>
        </div>
      </div>
    </article>
  );
};
