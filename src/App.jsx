import Header from "./components/Header";
import Footer from "./components/Footer";
import UrlShortenerForm from "./components/UrlShortenerForm";

const App = () => {
  return (
    <div className="container mx-auto max-w-screen-lg p-4 bg-white shadow-sm rounded-md mt-12">
      <Header />
      <main>
        <UrlShortenerForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
