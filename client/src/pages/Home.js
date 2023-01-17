import { Link } from "react-router-dom";
import "../styles/home.css";
const Home = () => {
  return (
    <div class="h-full">
      <div className="home h-screen p-10">
        <div className="container bg-slate-800 rounded bg-opacity-80">
          <div className="flex flex-col justify-center items-center p-10 md:p-20 lg:p-24">
            <h1 class="flex-auto  font-black lg:text-7xl md:text-5xl sm:text-4xl text-3xl text-white ">
              Welcome to Binbi 🏕️
            </h1>
            <div className="flex-auto text-white">
              <a
                type="button"
                href="/home#about"
                className="shadow-md mt-3 py-2 px-28 md:px-52 lg:px-80 rounded-md bg-cyan-800 text-white"
              >
                About us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
        <div id="about" className="flex flex-1 flex-col items-center ">
          <h1 className="text-cyan-700 font-extrabold text-5xl md:text-4 lg:text-6xl text-center lg:text-right mb-6">
            What is our goal?
          </h1>
          <h2 className="italic text-slade-800 text-xl md:text-4 lg:text-3xl text-center lg:text-right mb-6">
            We offer services to accomodate your travelling needs
          </h2>
          <p className="text-slade 800 text-lg text-center mb-6 bg-blue-300 text-slade-800 px-3 py-2">
            Our goal is to provide you with the greatest travel experiences from
            accomodations to hotels and flights.
          </p>
          <Link to="/browse">
            <button className="shadow-md py-3 px-6 rounded-md bg-slate-800 text-white hover:bg-blue-700">
              Browse Places
            </button>
          </Link>

          <p className="mt-80  text-slade 800 text-sm text-center mb-6 bg-white rounded px-5 py-2">
            This project is built for educational purposes only as a requirement
            for Web Technology final project
          </p>
        </div>
      </div>

      <footer class="p-4 bg-gray-800 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Oleh: Jowna Alynsah (51190331)
        </span>
        <a
          href="https://github.com/y0naa"
          class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="sr-only">GitHub account</span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
