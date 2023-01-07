import NavigationBar from "./NavigationBar";
import hero from "../assets/hero.jpg";
import styles from "../index.css";
const Home = () => {
  return (
    <div class="h-full">
      <NavigationBar />
      <img
        className="absolute w-screen overflow-hidden"
        src={hero}
        alt="some forest"
      />
      <section className="relative">
        <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
          {/* Content */}
          <div className="flex flex-1 flex-col items-center lg:items-end">
            <h2 className="text-slade-800 text-3xl md:text-4 lg:text-5xl text-center lg:text-right mb-6">
              For all your travel needs
            </h2>
            <p className="text-slade 800 text-lg text-center mb-6 bg-blue-300 text-slade-800 px-3 py-2">
              Our goal is to provide you with the greatest travel experiences
              from accomodations to hotels and flights.
            </p>
            <div className="flex justify-center flex-wrap gap-6">
              <a
                type="button"
                href="/dashboard"
                className="shadow-md py-3 px-6 rounded-md bg-slate-800 text-white"
              >
                Browse Places
              </a>
            </div>

            <p className="mt-80 text-slade 800 text-lg text-right mb-6 bg-white rounded px-5 py-2">
              Created by: Jowna Alynsah (51190331)
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
