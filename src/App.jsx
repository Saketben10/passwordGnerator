import { useCallback, useState, useEffect } from "react";

function App() {
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberallowed) str = str + "0123456789";
    if (charallowed) str = str + "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass = pass + str.charAt(char);
    }

    setpassword(pass);
  }, [numberallowed, charallowed, length]);

  useEffect(() => {
    passwordGenerator();
  }, [numberallowed, charallowed, length, passwordGenerator]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000); // Hide the success message after 3 seconds
      })
      .catch(() => {
        setCopySuccess(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md w-full">
        <h1 className="text-3xl text-gray-800 font-bold mb-4">Password Generator</h1>
        <input
          type="text"
          value={password}
          readOnly
          placeholder="Generated Password"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleCopyClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Copy
        </button>
        {copySuccess && (
          <div className="mt-2 bg-green-100 border border-green-500 text-green-800 px-4 py-2 rounded">
            Copied to clipboard!
          </div>
        )}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Password Length</label>
          <input
            type="range"
            min={0}
            max={100}
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
            className="w-full mt-1"
          />
          <div className="flex items-center justify-between text-sm">
            <span>{length}</span>
            <span>20</span>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Include in Password</label>
          <div className="flex space-x-2">
            <label>
              <input
                type="checkbox"
                checked={numberallowed}
                onChange={() => {
                  setnumberallowed((prev) => !prev);
                }}
                className="form-checkbox text-blue-500"
              />
              <span className="ml-2">Numbers</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={charallowed}
                onChange={() => {
                  setcharallowed((prev) => !prev);
                }}
                className="form-checkbox text-blue-500"
              />
              <span className="ml-2">Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
