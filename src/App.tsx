import React, {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import logo from "./logo.svg";
import debounce from "lodash/debounce";
import "./App.css";

function App() {
  const [val, setVal] = useState("");
  const [composing, setComposing] = useState(false);

  const trimmedVal = val.trim();

  const search = useCallback((word: string) => {
    console.log("search keyword is ", word);
  }, []);

  const handleCompositionStart = () => {
    setComposing(true);
  };

  const handleCompositionEnd = () => {
    setComposing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const debouncedSearch = useMemo(() => debounce(search, 500), [search]);

  useEffect(() => {
    if (!composing) debouncedSearch(trimmedVal);
  }, [composing, trimmedVal, debouncedSearch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <input
          value={val}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </header>
    </div>
  );
}

export default App;
