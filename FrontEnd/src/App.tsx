import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Import all necessary components and pages
import Landing from './pages/LandingPage';
import Calendar from './pages/Calendar';
import TodoList from './pages/Task/TodoList.tsx';
import Settings from './pages/Pages/Settings';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import PageTitle from './components/PageTitle';

import ConnectionHandler from './components/ConnectionHandler';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // List of paths to exclude from ConnectionHandler
  const excludedRoutes = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/reset-password",
    "/auth/two-step-verification",
    "/downloads/*",
  ];

  // Function to determine if ConnectionHandler should be applied
  const shouldUseConnectionHandler = (path) => {
    return !excludedRoutes.includes(path) && !path.startsWith("/auth/");
  };

  // Conditionally apply ConnectionHandler
  const renderRoutes = () => (
    <Routes>
      <Route path="/" element={<><PageTitle title="DailyPlanify" /><Landing /></>} />
      <Route path="/calendar" element={<><PageTitle title="Calendar | DailyPlanify" /><Calendar /></>} />
      <Route path="/todo-list" element={<><PageTitle title="ToDo List | DailyPlanify" /><TodoList /></>} />
      <Route path="/settings" element={<><PageTitle title="Settings | DailyPlanify" /><Settings /></>} />
      <Route path="/auth/signin" element={<><PageTitle title="Sign In | DailyPlanify" /><SignIn /></>} />
      <Route path="/auth/signup" element={<><PageTitle title="Sign Up | DailyPlanify" /><SignUp /></>} />
      <Route path="/downloads/windows" element={<><PageTitle title="Download Windows App | DailyPlanify" /><SignUp /></>} />
    </Routes>
  );

  return (
    <>
      {shouldUseConnectionHandler(pathname) ? (
        <ConnectionHandler>
          {renderRoutes()}
        </ConnectionHandler>
      ) : (
        renderRoutes()
      )}
    </>
  );
}

export default App;
