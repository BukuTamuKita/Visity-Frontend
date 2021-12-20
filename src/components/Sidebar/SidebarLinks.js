import React, { useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { ListItemIcon, ListItem, ListItemText, Tooltip } from '@mui/material';
import { COLORS } from '../../constants/colors';

const SidebarLinks = props => {
    const { primary, to, icon } = props;
    const location = useLocation();

    const renderLink = useMemo(
        () => forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem
                button
                component={renderLink}
                selected={to === location.pathname}
                sx={{ 
                    color: "white", 
                    borderRadius: 1.5,
                    '&:hover': {
                        backgroundColor: COLORS.primaryHover,
                    },
                    marginBottom: 1,
                }}
                style={to === location.pathname ? { 
                    backgroundColor: COLORS.secondary,
                    color: COLORS.primary, 
                } : {}}
            >
                {icon && 
                    <Tooltip title={primary} placement="right" arrow>
                        <ListItemIcon 
                            sx={{ color: "white" }}
                            style={to === location.pathname ? { color: COLORS.primary } : {}}
                        >
                            { icon }
                        </ListItemIcon>
                    </Tooltip>
                }
                    <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

SidebarLinks.propTypes = {
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.element,
};

SidebarLinks.defaultProps = {
    selected: false,
};

export default SidebarLinks;