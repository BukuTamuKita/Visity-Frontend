import * as React from 'react';
import PropTypes from 'prop-types';
import { 
    AppBar, 
    Box, 
    CssBaseline, 
    Divider, 
    Drawer, 
    IconButton, 
    Toolbar, 
} from '@mui/material';
import { MenuRounded } from '@mui/icons-material';
import Sidebar from './Sidebar/Sidebar';
import { logoLight } from '../assets/logo';
import { COLORS } from '../constants/colors';
import ProfileIcon from '../components/ProfileIcon';
import { UpperBlueBlob } from "../assets/backgrounds/upper_blue_blob";
import { LowerBlueBlob } from "../assets/backgrounds/lower_blue_blob";

const drawerWidth = 240;

const Layout = props => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <>
            <Toolbar>
                <img src={logoLight} alt="logo" className="w-10 h-10" />
            </Toolbar>
            <Divider />
            <Sidebar />
        </>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    background: "#FFFFFF",
                    borderBottom: "1px solid #E0E0E0",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                            sx={{ marginRight: 2, display: { sm:"none", } }}
                        >
                            <MenuRounded sx={{ color: COLORS.primary }} />
                        </IconButton>
                    </Box>
                    <ProfileIcon />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    { drawer }
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    { drawer }
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <div className="lg:grid lg:grid-cols-12 grid grid-cols-4">
                    <div className="fixed md:-z-10 md:visible invisible">
                        <UpperBlueBlob />
                    </div>
                    <div className="fixed md:bottom-0 md:-right-10 z-0 md:visible invisible">
                        <LowerBlueBlob />
                    </div>
                    { props.children }
                </div>
            </Box>
        </Box>
    );
}

Layout.propTypes = {
    window: PropTypes.func,
};

export default Layout;