import "./App.css";
import { Button } from "./components/ui/Button";

function App() {
  return (
    <>
      <Button
        variant="primary"
        size="md"
        text="Add Content"
        onClick={() => {
          alert("heello");
        }}
      />
    </>
  );
}

export default App;
