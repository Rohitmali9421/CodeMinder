import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import QuestionTracker from './Pages/QuestionTracker';
import EventTracker from './Pages/EventTracker';
import SignIn from './Pages/SignIn';
import ProfileTracker from './Pages/ProfileTracker';
import SignUp from './Pages/SignUp';
import Layout from './Pages/Layout';
import ProblemSolving from './Components/ProblemSolving';
import DevStats from './Components/DevStats';
import ProfileEdit from './Pages/ProfileEdit';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="question-tracker" element={<QuestionTracker />} />
            <Route path="event-tracker" element={<EventTracker />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile/edit" element={<ProfileEdit />} />
            <Route path="profile/:id" element={<ProfileTracker />}>
                <Route index element={<ProblemSolving />} />  {/* Default Page */}
                <Route path="problemSolving" element={<ProblemSolving />} />
                <Route path="devStats" element={<DevStats />} />
            </Route>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
