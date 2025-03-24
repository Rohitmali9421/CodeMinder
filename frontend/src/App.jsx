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
import SocialProfile from './Components/Socials';
import AccountSettings from './Components/Accounts';
import Platform from './Components/Platform';
import Explore from './Components/Explore';
import MySheets from './Components/MySheets';
import Notes from './Components/Notes';
import Analysis from './Components/Analysis';
import Workspace from './Components/Workspace';
import SheetDetails from './Components/SheetDetails';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            {/* Main Pages */}
            <Route index element={<LandingPage />} />
            <Route path="event-tracker" element={<EventTracker />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />

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
            <Route path="profile/edit" element={<ProfileEdit />}>
                <Route index element={<BasicInfo />} />
                <Route path="basicinfo" element={<BasicInfo />} />
                <Route path="socials" element={<SocialProfile />} />
                <Route path="accounts" element={<AccountSettings />} />
                <Route path="platform" element={<Platform />} />
            </Route>

            {/* Profile Tracker with Sub-Routes */}
            <Route path="profile/:id" element={<ProfileTracker />}>
                <Route index element={<ProblemSolving />} /> {/* Default */}
                <Route path="problemSolving" element={<ProblemSolving />} />
                <Route path="devStats" element={<DevStats />} />
            </Route>
        </Route>
    )
);

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />  {/* ✅ Add ShadCN Toaster Here */}
        </Provider>
    );
};

export default App;
