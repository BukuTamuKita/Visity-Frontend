import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import Layout from './components/Layout';
import 'tailwindcss/tailwind.css';
import './App.css';
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from './routes/routes';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './pages/ErrorPage';
// import { ThemeProvider } from '@material-ui/styles';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// import { StyledEngineProvider } from '@mui/styled-engine-sc';

const theme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#2E4DA7",
                    fontFamily: "Inter",
                }
            }
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

function App() {
    return (
//         <Router>
//             <Switch>
//                 {APP_ROUTE.map((value, index) => {
//                     return (
//                         <PublicRoute
//                             key={value.name}
//                             restricted={value.restricted}
//                             component={value.component}
//                             path={value.path}
//                             exact={value.exact}
//                         />
//                     )
//                 })}
//                 <div className="flex">
//                     <div className="h-screen sticky top-0">
//                         <Drawer />
//                     </div>
// 
//                     {/* Main Content */}
//                     <div className="flex-auto">
//                         {PRIVATE_ROUTE.map((value, index) => {
//                             return (
//                                 <PrivateRoute
//                                     key={value.name}
//                                     component={value.component}
//                                     path={value.path}
//                                     exact={value.exact}
//                                 />
//                             )
//                         })}
//                     </div>
//                 </div>
//             </Switch>
//         </Router>

        <StyledEngineProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        {PUBLIC_ROUTE.map((val) => (
                            <PublicRoute 
                                key={val.name}
                                path={val.path}
                                exact={val.exact}
                                component={val.component}
                                restricted={val.restricted}
                            />
                        ))}
                        <Route>
                            <Layout>
                                <Switch>
                                    {PRIVATE_ROUTE.map((val) => (
                                        <PrivateRoute 
                                            key={val.name}
                                            path={val.path}
                                            exact={val.exact}
                                            component={val.component}
                                            private={val.private}
                                        />
                                    ))}
                                </Switch>
                            </Layout>
                        </Route>
                        <Route path="/" render={() => (
                            <Redirect to="/" />
                        )} />
                        <Route component={ErrorPage} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;