import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/Store';
import { Toaster } from "@/components/ui/toaster";  // ✅ Import ShadCN Toaster

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
import BasicInfo from './Components/BasicInfo';
import AccountSettings from './Components/Accounts';
import Platform from './Components/Platform';
import Explore from './Components/Explore';
import MySheets from './Components/MySheets';
import Notes from './Components/Notes';
import Analysis from './Components/Analysis';
import Workspace from './Components/Workspace';
import SheetDetails from './Components/SheetDetails';
import LeetCodeStats from './Components/LeetCodeStats';
import { ToastContainer } from 'react-toastify';
import CodeforcesProfile from './Components/CodeforcesProfile';
import GFG from './Components/GFG';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            {/* Main Pages */}
            <Route index element={<LandingPage />} />
            <Route path="event-tracker" element={<EventTracker />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            {/* <Route path="profile" element={<Resume />} /> */}

            {/* Nested Routes for Question Tracker */}
            <Route path="question-tracker" element={<QuestionTracker />}>
                <Route index element={<Workspace />} /> {/* Default Page */}
                <Route path="workspace" element={<Workspace />} />
                <Route path="explore" element={<Explore />} />
                <Route path="mySheets" element={<MySheets />} />
                <Route path="notes" element={<Notes />} />
                <Route path="analysis" element={<Analysis />} />
                <Route path="explore/sheet/:id" element={<SheetDetails />} />
            </Route>

            {/* Profile Edit Nested Routes */}
            <Route path="profile/edit" element={<ProfileEdit />} />



            {/* Profile Tracker with Sub-Routes */}
            <Route path="profile" element={<ProfileTracker />}>
                <Route path="leetcode" element={<LeetCodeStats />} />
                <Route path="github" element={<DevStats />} />
                <Route path="codeforces" element={<CodeforcesProfile />} />
                {/* <Route path="geeksforgeeks" element={<GFG />} /> */}

            </Route>
        </Route>
    )
);

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
            <ToastContainer />
        </Provider>
    );
};

export default App;
