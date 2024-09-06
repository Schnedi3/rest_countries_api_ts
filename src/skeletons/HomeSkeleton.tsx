import "./home_skeleton.css";

export const HomeSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <section className="skeleton_card">
      {skeletonItems.map((_, index) => (
        <ul key={index}>
          <li>
            <img />
            <div>
              <h3></h3>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </li>
        </ul>
      ))}
    </section>
  );
};
