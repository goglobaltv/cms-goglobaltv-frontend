import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// layouts
import LayoutDashboard from './layout/LayoutDashboard';
//Page
import Dashboard from './page/Dashboard';
import News from './page/News';
import Footer from './page/Footer';
import Login from './page/Login';
import Logout from './Logout';
import Media from './page/Media';
import Ads from './page/Ads';
import CreateNews from './components/News/CreateNews';
import UpdateNews from './components/News/UpdateNews';
// import DetailOffer from './components/Offer/DetailOffer';
// ----------------------------------------------------------------------

export default function Router() {

    const token = window.localStorage.getItem("token");


    let pageLogin = <Login />;

    let AppPage = useRoutes([
        {
            path: "/",
            element: <LayoutDashboard to="/dashboard" />,
            children: [
                { path: '/', element: <Navigate to="/dashboard" /> },
                { path: "dashboard", element: <Dashboard /> },
                { path: "media", element: <Media /> },
                { path: "news", element: <News /> },
                { path: "createNews", element: <CreateNews /> },
                { path: "updateNews", element: <UpdateNews /> },
                { path: "footer", element: <Footer /> },
                { path: "ads", element: <Ads /> }
            ]
        },

    ]);

    // return element;
    if (token) {
        return AppPage;
    } 
        
    return pageLogin;
    
}