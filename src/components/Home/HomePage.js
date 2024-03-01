import videoHomePage from "../../assets/video-homepage.mp4";
const HomePage = () => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source
          data-testid="currentDefaultVideo"
          src={videoHomePage}
          type="video/mp4"
        />
      </video>
    </div>
  );
};
export default HomePage;
