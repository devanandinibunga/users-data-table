import { useState } from "react";
import { UserDataCards } from "./components/user-data-cards/user-data-cards";
import { UserDataTable } from "./components/user-data-table/user-data-table";
import { useDetectMobile } from "./custom-hooks/useDetectMobile";
import useFetch from "./custom-hooks/useFetch";
import "./App.css";

function App() {
  const { isMobile } = useDetectMobile();
  const { userData, error, isLoading, fetchUserData } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    fetchUserData()
      .then(() => setIsRetrying(false))
      .catch(() => setIsRetrying(false));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{`Error: ${error}`}</p>
        <button onClick={handleRetry} disabled={isRetrying} className="retry">
          {isRetrying ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }

  return isMobile ? (
    <UserDataCards userData={userData} />
  ) : (
    <UserDataTable userData={userData} />
  );
}

export default App;
