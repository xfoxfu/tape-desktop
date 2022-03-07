import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import LoginPage from "./login";
import QuestionsPage from "./questions";
import QuestionPage from "./question";
import LivePage from "./live";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/error_fallback";
import { NavigationContext } from "../navcontext";

export const App: React.FunctionComponent = () => {
  return (
    <Box bgGradient="linear(to-br, #9BF8F4, #6F7BF7)">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NavigationContext.Provider value={{}}>
          <BrowserRouter>
            <Routes>
              <Route index element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/questions" element={<QuestionsPage />}>
                <Route index element={<></>} />
                <Route path="/questions/:id" element={<QuestionPage />} />
              </Route>
              <Route path="/live" element={<LivePage />} />
            </Routes>
          </BrowserRouter>
        </NavigationContext.Provider>
      </ErrorBoundary>
    </Box>
  );
};

export default App;
