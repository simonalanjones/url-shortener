import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
// import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      {/* <ThemeToggle /> */}

      <div className="grid grid-cols-[70%_30%] gap-4 p-4 pr-4">
        <div className="bg-gray-200 p-6 rounded-lg">
          <Header />
          <Form />
        </div>
        <div className="bg-gray-300 p-6 rounded-lg">Column 2</div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
