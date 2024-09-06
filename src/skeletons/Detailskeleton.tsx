import "./detail_skeleton.css";

export const DetailSkeleton = () => {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <section className="detail_skeleton">
      <article>
        <img />

        <aside>
          <h2></h2>

          <section>
            <article>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </article>
            <article>
              <p></p>
              <p></p>
              <p></p>
            </article>
          </section>

          <div>
            <p></p>
            <ul>
              {skeletonItems.map((_, index) => (
                <li key={index}></li>
              ))}
            </ul>
          </div>
        </aside>
      </article>
    </section>
  );
};
