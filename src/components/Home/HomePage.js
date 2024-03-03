import videoHomePage from "../../assets/video-homepage-hoidanit.mp4";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">You dont want to make a boring form.</div>
        <div>
          <button className="title-3"> Get's started</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
