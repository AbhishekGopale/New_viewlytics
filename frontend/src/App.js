import React from 'react';
import PrimeReact from 'primereact/api';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import './App.scss';
import components from './views/pages/primeReactComponentsIndex';
import {
    Chainlist,
    Dashboard,
    Task,
    Tasklist,
    Projectlist,
    Promosavailabilitylist,
    SKUlist,
    Storelist,
    Subadminlist,
    Target,
    Userlist,
    ZoneList,
    Profile,
    Attendance,
    UserAssignlist,
    Error,
    PlannerReport,
    Map,
    DashboardUi,
    ClientList,
    OnRequestReportList,
    BroadcastList,
    SKUCategorylist,
    AttendanceNew,
    ExecutiveDashboard,
    AttendanceAnalysis,
    ShairOfShell,
    OssReport,
    SalesAnalysis,
    Merchandise,
    OpeningInventory,
    ReportViewer
} from './indexMain';
import { UserRoute, AdminRoute, AuthRoute } from './routes/index';
import { AppTopbar, AppInlineMenu, AppMenu, AppFooter, jwtDecode } from './appIndex';
import { handleSetRole, handleUserDetails } from './redux/slice/AdminSlice/authSlice';
export const RTLContext = React.createContext();

const App = () => {
    const { React, useEffect, useRef, useState, Route, Routes, useLocation, useDispatch, useSelector, Tooltip, classNames } = components;
    const [ menuMode, setMenuMode ] = useState('static');
    const [ inlineMenuPosition, setInlineMenuPosition ] = useState('bottom');
    const [ desktopMenuActive, setDesktopMenuActive ] = useState(true);
    const [ mobileMenuActive, setMobileMenuActive ] = useState(false);
    const [ activeTopbarItem, setActiveTopbarItem ] = useState(null);
    const [ colorMode, setColorMode ] = useState('light');
    const [ rightMenuActive, setRightMenuActive ] = useState(false);
    const [ menuActive, setMenuActive ] = useState(false);
    const [ inputStyle, setInputStyle ] = useState('outlined');
    const [ isRTL, setRTL ] = useState(false);
    const [ ripple, setRipple ] = useState(true);
    const [ mobileTopbarActive, setMobileTopbarActive ] = useState(false);
    const [ menuTheme, setMenuTheme ] = useState('light');
    const [ topbarTheme, setTopbarTheme ] = useState('blue');
    const [ theme, setTheme ] = useState('indigo');
    const [ isInputBackgroundChanged, setIsInputBackgroundChanged ] = useState(false);
    const [ inlineMenuActive, setInlineMenuActive ] = useState({});
    const [ newThemeLoaded, setNewThemeLoaded ] = useState(false);
    const [ searchActive, setSearchActive ] = useState(false);
    const [ subAdminMenu, setSubAdminMenu ] = useState([]);
    const copyTooltipRef = useRef();
    let currentInlineMenuKey = useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const { roleId, token, userData } = useSelector((store) => store.auth);
    PrimeReact.ripple = true;
    let searchClick;
    let topbarItemClick;
    let menuClick;
    let inlineMenuClick;
    const getRole = async (token) => {
        let decodeData = await jwtDecode(token);
        getSidebarMenu(decodeData?.role_permission);
        dispatch(handleUserDetails(decodeData));
        dispatch(handleSetRole(decodeData?.role_id));
    };
    const userRoleId = roleId?.toString();
    const getSidebarMenu = (role_permission) => {
        const menusArray = [
            {
                id: 1,
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                to: '/admin/dashboard'
            },
            {
                id: 2,
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                to: '/admin/userlist'
            },
            {
                id: 3,
                label: 'Broadcast',
                icon: 'pi pi-fw pi-volume-up',
                to: '/admin/broadcast'
            },
            {
                id: 4,
                label: 'Projects',
                icon: 'pi pi-fw pi-slack',

                to: '/admin/projectlist'
            },
            {
                id: 5,
                label: 'Chain',
                icon: 'pi pi-fw pi-link',
                to: '/admin/chainlist'
            },
            {
                id: 6,
                label: 'Stores',
                icon: 'pi pi-fw pi-calculator',
                to: '/admin/storelist'
            },

            {
                id: 7,
                label: 'Store Assign',
                icon: 'pi pi-fw pi-users',
                to: '/admin/storeassignlist'
            },
            {
                id: 8,
                label: 'Master SKU',
                icon: 'pi pi-fw pi-th-large',
                items: [
                    { label: 'SKU Category List', icon: 'pi pi-fw pi-list', to: '/admin/skucategorylist' },
                    { label: 'SKU List', icon: 'pi pi-fw pi-list', to: '/admin/skulist' }
                ]
            },
            // {
            //     id: 8,
            //     label: 'SKU',
            //     icon: 'pi pi-fw pi-th-large',
            //     to: '/admin/skulist'
            // },
            {
                id: 9,
                label: 'Promos Availability ',
                icon: 'pi pi-fw pi-qrcode',
                to: '/admin/promosavailabilitylist'
            },
            {
                id: 10,
                label: 'Target',
                icon: 'pi pi-fw pi-chart-line',
                to: '/admin/target'
            }
        ];
        const filteredMenusArray = menusArray?.filter((obj) => role_permission?.includes(obj?.id));
        setSubAdminMenu(filteredMenusArray);
    };
    useEffect(() => {
        getRole(token);
    }, []);

    const productionReports = [
        { label: 'Attendance', icon: 'pi pi-fw pi-user-edit', to: '/attendance' },
        { label: 'Share Of Shelf', icon: 'pi pi-fw pi-chart-line', to: '/shair-of-shelf' },
        { label: 'Out Of Stock', icon: 'pi pi-fw pi-sign-out', to: '/out-of-stock' },
        { label: 'Sales Analysis', icon: 'pi pi-fw pi-chart-bar', to: '/sales-analysis' },
        { label: 'DSR', icon: 'pi pi-fw pi-book', to: '/dsr-report' },
        { label: 'Opening Inventory', icon: 'pi pi-check-circle', to: '/opening-inventory' },
        { label: 'Closing Inventory', icon: 'pi pi-times-circle', to: '/closing-inventory' },
        { label: 'New Inventory', icon: 'pi pi-plus-circle', to: '/new-inventory' },
        { label: 'Market Intelligence', icon: 'pi pi-chart-pie', to: '/market-intelligence' },
        { label: 'Checkin-Checkout', icon: 'pi pi-check-square', to: '/user-checkinfo' },
        { label: 'Assets Tracking', icon: 'pi pi-folder-open', to: '/assets-tracking' },
        { label: 'Shopper Engagement', icon: 'pi pi-shopping-bag', to: '/shopper-engagement' },
        { label: 'Promo', icon: 'pi pi-gift', to: '/promo-report' },
        { label: 'TL Report', icon: 'pi pi-file-edit', to: '/tl-report' },
        { label: 'Competition Brand', icon: 'pi pi-box', to: '/competition_brand' },
        { label: 'Home Leave', icon: 'pi pi-home', to: '/homeleave-report' },
        { label: 'Place Visit', icon: 'pi pi-map-marker', to: '/placevisit-report' },
        { label: 'Order Request', icon: 'pi pi-wallet', to: '/order-request' },
        { label: 'Checkin Activity', icon: 'pi pi-check-square', to: '/checkin-activity' }
    ];

    const menu1 = [
        //.......USER ROUTE...........//
        userRoleId == '1'
            ? {
                //ADMIN ROUTE
                label: '',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        to: '/admin/dashboard'
                    },
                    {
                        label: 'Executive Dashboard',
                        icon: 'pi pi-fw pi-bolt',
                        to: '/admin/executive-dashboard'
                    },
                    {
                        label: 'Projects',
                        icon: 'pi pi-fw pi-slack',
                        to: '/admin/projectlist'
                    },
                    {
                        label: 'Chain',
                        icon: 'pi pi-fw pi-link',
                        to: '/admin/chainlist'
                    },
                    {
                        label: 'Stores',
                        icon: 'pi pi-fw pi-calculator',
                        to: '/admin/storelist'
                    },

                    {
                        label: 'Store Assign',
                        icon: 'pi pi-fw pi-users',
                        to: '/admin/storeassignlist'
                    },
                    {
                        label: 'Master SKU',
                        icon: 'pi pi-fw pi-th-large',
                        items: [
                            { label: 'SKU Category List', icon: 'pi pi-fw pi-list', to: '/admin/skucategorylist' },
                            { label: 'SKU List', icon: 'pi pi-fw pi-list', to: '/admin/skulist' }
                        ]
                    },

                    {
                        label: 'Target',
                        icon: 'pi pi-fw pi-chart-line',
                        to: '/admin/target'
                    },

                    {
                        label: 'Planner',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'Tasks',
                                icon: 'pi pi-user-edit',
                                to: 'admin/task'
                            },
                            {
                                label: 'Planner Report',
                                icon: 'pi pi-fw pi-calendar-plus',
                                to: 'admin/planner-report'
                            },
                            // {
                            //     label: 'Reports',
                            //     icon: 'pi pi-fw pi-calendar-plus',
                            //     to: 'admin/report'
                            // }
                            {
                                label: 'Attendance',
                                icon: 'pi pi-fw pi-calendar-plus',
                                to: 'admin/attendance'
                            }
                        ]
                    },

                    {
                        label: 'Promos Availability ',
                        icon: 'pi pi-fw pi-qrcode',
                        to: '/admin/promosavailabilitylist'
                    },
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            { label: 'On Request Report', icon: 'pi pi-fw pi-list', to: '/admin/requestreportlist' },
                            {
                                label: 'Zone',
                                icon: 'pi pi-fw pi-map-marker',
                                to: '/admin/zone'
                            },
                            {
                                label: 'Sub-Admin',
                                icon: 'pi pi-fw pi-users',
                                to: '/admin/subadminlist'
                            },
                            {
                                label: 'Client',
                                icon: 'pi pi-fw pi-slack',
                                to: '/admin/clientlist'
                            },
                            {
                                label: 'Broadcast',
                                icon: 'pi pi-fw pi-volume-up',
                                to: '/admin/broadcast'
                            }
                        ]
                    },
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-user',
                        to: '/admin/userlist'
                    }
                ]
            }
            : //SUB ADMIN ROUTE
            userRoleId == '8'
                ? {
                    label: '',
                    items: subAdminMenu
                }
                : userRoleId == '9' || userRoleId == '10' || userRoleId == '11'
                    ? {
                        //CLIENT (NPC / ASE / SE) ROUTE - Matches live production + Executive Dashboard
                        label: '',
                        items: [
                            {
                                label: 'Dashboard',
                                icon: 'pi pi-fw pi-home',
                                to: '/client/dashboard'
                            },
                            {
                                label: 'Executive Dashboard',
                                icon: 'pi pi-fw pi-bolt',
                                to: '/executive-dashboard'
                            },
                            {
                                label: 'Map',
                                icon: 'pi pi-fw pi-map-marker',
                                to: '/map'
                            },
                            {
                                label: 'Reports',
                                icon: 'pi pi-fw pi-pencil',
                                items: productionReports
                            }
                        ]
                    }
                    : userRoleId == '4'
                        ? {
                            //TEAM LEADER (TL) ROUTE - Matches live production + Executive Dashboard
                            label: '',
                            items: [
                                {
                                    label: 'Dashboard',
                                    icon: 'pi pi-fw pi-home',
                                    to: '/dashboard',
                                    items: [
                                        { label: 'Attendance Analysis', icon: 'pi pi-fw pi-circle', to: '/attendanceanalysis' },
                                        { label: 'Share of Shelf', icon: 'pi pi-fw pi-circle', to: '/shareofshelf' },
                                        { label: 'OOS Analysis', icon: 'pi pi-fw pi-circle', to: '/oos-analysis' },
                                        { label: 'Sales Analysis', icon: 'pi pi-fw pi-circle', to: '/salesanalysis' },
                                        { label: 'Merchandising', icon: 'pi pi-fw pi-circle', to: '/merchandising' }
                                    ]
                                },
                                {
                                    label: 'Executive Dashboard',
                                    icon: 'pi pi-fw pi-bolt',
                                    to: '/executive-dashboard'
                                },
                                {
                                    label: 'Map',
                                    icon: 'pi pi-fw pi-map-marker',
                                    to: '/map'
                                },
                                {
                                    label: 'Reports',
                                    icon: 'pi pi-fw pi-pencil',
                                    items: productionReports
                                }
                            ]
                        }
                        : {
                            //DEFAULT (NPM / ASM - Role 2, 3) - Matches live production + Executive Dashboard
                            label: '',
                            items: [
                                {
                                    label: 'Dashboard',
                                    icon: 'pi pi-fw pi-home',
                                    to: '/dashboard',
                                    items: [
                                        { label: 'Attendance Analysis', icon: 'pi pi-fw pi-circle', to: '/attendanceanalysis' },
                                        { label: 'Share of Shelf', icon: 'pi pi-fw pi-circle', to: '/shareofshelf' },
                                        { label: 'OOS Analysis', icon: 'pi pi-fw pi-circle', to: '/oos-analysis' },
                                        { label: 'Sales Analysis', icon: 'pi pi-fw pi-circle', to: '/salesanalysis' },
                                        { label: 'Merchandising', icon: 'pi pi-fw pi-circle', to: '/merchandising' }
                                    ]
                                },
                                {
                                    label: 'Executive Dashboard',
                                    icon: 'pi pi-fw pi-bolt',
                                    to: '/executive-dashboard'
                                },
                                {
                                    label: 'Reports',
                                    icon: 'pi pi-fw pi-pencil',
                                    items: productionReports
                                }
                            ]
                        }
    ];

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [ location ]);

    useEffect(() => {
        if (menuMode === 'overlay') {
            hideOverlayMenu();
        }
        if (menuMode === 'static') {
            setDesktopMenuActive(true);
        }
    }, [ menuMode ]);

    useEffect(() => {
        onColorModeChange(colorMode);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onMenuThemeChange = (theme) => {
        setMenuTheme(theme);
    };

    const onTopbarThemeChange = (theme) => {
        setTopbarTheme(theme);
    };

    // useEffect(() => {
    //     const appLogoLink = document.getElementById('app-logo');

    //     if (topbarTheme === 'white' || topbarTheme === 'yellow' || topbarTheme === 'amber' || topbarTheme === 'orange' || topbarTheme === 'lime') {
    //         appLogoLink.src = 'assets/layout/images/logo-dark.svg';
    //     } else {
    //         appLogoLink.src = 'assets/layout/images/logo-light.svg';
    //         // appLogoLink.src = 'assets/layout/images/pages/logo.png';
    //     }
    // }, [ topbarTheme ]);

    const onColorModeChange = (mode) => {
        setColorMode(mode);
        setIsInputBackgroundChanged(true);

        if (isInputBackgroundChanged) {
            if (mode === 'dark') {
                setInputStyle('filled');
            } else {
                setInputStyle('outlined');
            }
        }

        if (mode === 'dark') {
            setMenuTheme('dark');
            setTopbarTheme('dark');
        } else {
            setMenuTheme('light');
            setTopbarTheme('blue');
        }

        const layoutLink = document.getElementById('layout-css');
        const layoutHref = '/assets/layout/css/layout-' + mode + '.css';
        replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[ urlTokens.length - 1 ] = 'theme-' + mode + '.css';
        const newURL = urlTokens.join('/');

        replaceLink(themeLink, newURL, () => {
            setNewThemeLoaded(true);
        });
    };

    const replaceLink = (linkElement, href, callback) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);

            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                const _linkElement = document.getElementById(id);
                _linkElement && _linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onInlineMenuPositionChange = (mode) => {
        setInlineMenuPosition(mode);
    };

    const onMenuModeChange = (mode) => {
        setMenuMode(mode);
    };

    const onRTLChange = () => {
        setRTL((prevState) => !prevState);
    };

    const onMenuClick = (event) => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;

        if (isDesktop()) setDesktopMenuActive((prevState) => !prevState);
        else setMobileMenuActive((prevState) => !prevState);

        event.preventDefault();
    };

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;
        if (activeTopbarItem === event.item) setActiveTopbarItem(null);
        else {
            setActiveTopbarItem(event.item);
        }

        event.originalEvent.preventDefault();
    };

    const onSearch = (event) => {
        searchClick = true;
        setSearchActive(event);
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items && (menuMode === 'overlay' || !isDesktop())) {
            hideOverlayMenu();
        }

        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    };

    const onRootMenuItemClick = (event) => {
        setMenuActive((prevState) => !prevState);
    };

    const onRightMenuButtonClick = () => {
        setRightMenuActive((prevState) => !prevState);
    };

    const onMobileTopbarButtonClick = (event) => {
        setMobileTopbarActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onDocumentClick = (event) => {
        if (!searchClick && event.target.localName !== 'input') {
            setSearchActive(false);
        }

        if (!topbarItemClick) {
            setActiveTopbarItem(null);
        }

        if (!menuClick && (menuMode === 'overlay' || !isDesktop())) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (inlineMenuActive[ currentInlineMenuKey.current ] && !inlineMenuClick) {
            let menuKeys = { ...inlineMenuActive };
            menuKeys[ currentInlineMenuKey.current ] = false;
            setInlineMenuActive(menuKeys);
        }

        if (!menuClick && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }

        searchClick = false;
        topbarItemClick = false;
        inlineMenuClick = false;
        menuClick = false;
    };

    const hideOverlayMenu = () => {
        setMobileMenuActive(false);
        setDesktopMenuActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 1024;
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };

    const onInlineMenuClick = (e, key) => {
        let menuKeys = { ...inlineMenuActive };
        if (key !== currentInlineMenuKey.current && currentInlineMenuKey.current) {
            menuKeys[ currentInlineMenuKey.current ] = false;
        }

        menuKeys[ key ] = !menuKeys[ key ];
        setInlineMenuActive(menuKeys);
        currentInlineMenuKey.current = key;
        inlineMenuClick = true;
    };

    const layoutContainerClassName = classNames('layout-wrapper ', 'layout-menu-' + menuTheme + ' layout-topbar-' + topbarTheme, {
        'layout-menu-static': menuMode === 'static',
        'layout-menu-overlay': menuMode === 'overlay',
        'layout-menu-slim': menuMode === 'slim',
        'layout-menu-horizontal': menuMode === 'horizontal',
        'layout-menu-active': desktopMenuActive,
        'layout-menu-mobile-active': mobileMenuActive,
        'layout-topbar-mobile-active': mobileTopbarActive,
        'layout-rightmenu-active': rightMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple,
        'layout-rtl': isRTL
    });

    return (
        <RTLContext.Provider value={isRTL}>
            <div className={layoutContainerClassName} onClick={onDocumentClick}>
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                <AppTopbar
                    horizontal={isHorizontal()}
                    activeTopbarItem={activeTopbarItem}
                    onMenuButtonClick={onMenuButtonClick}
                    onTopbarItemClick={onTopbarItemClick}
                    onRightMenuButtonClick={onRightMenuButtonClick}
                    onMobileTopbarButtonClick={onMobileTopbarButtonClick}
                    mobileTopbarActive={mobileTopbarActive}
                    searchActive={searchActive}
                    onSearch={onSearch}
                />

                <div className="menu-wrapper" onClick={onMenuClick}>
                    <div className="layout-menu-container ">
                        {(inlineMenuPosition === 'top' || inlineMenuPosition === 'both') && <AppInlineMenu menuKey="top" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />}
                        <AppMenu model={menu1} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick} menuMode={menuMode} active={menuActive} />
                        {(inlineMenuPosition === 'bottom' || inlineMenuPosition === 'both') && (
                            <AppInlineMenu menuKey="bottom" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />
                        )}
                    </div>
                </div>

                <div className="layout-main">
                    <div className="layout-content">
                        <Routes>
                            {/* Admin routes */}
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <AdminRoute id={1}>
                                        <Dashboard />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/executive-dashboard"
                                element={
                                    <AdminRoute id={1}>
                                        <ExecutiveDashboard />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/target"
                                element={
                                    <AdminRoute id={10}>
                                        <Target />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/requestreportlist"
                                element={
                                    <AdminRoute>
                                        <OnRequestReportList />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/broadcast"
                                element={
                                    <AdminRoute id={3}>
                                        <BroadcastList />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/subadminlist"
                                element={
                                    <AdminRoute id={11111}>
                                        <Subadminlist />
                                    </AdminRoute>
                                }
                            />
                            {/* <Route
                                path="/admin/rolepermission"
                                element={
                                    <AdminRoute>
                                        <RolePermission />
                                    </AdminRoute>
                                }
                            /> */}
                            <Route
                                path="/admin/userlist"
                                element={
                                    <AdminRoute id={2}>
                                        <Userlist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/clientlist"
                                element={
                                    <AdminRoute id={11111}>
                                        <ClientList />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/projectlist"
                                element={
                                    <AdminRoute id={4}>
                                        <Projectlist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/storelist"
                                element={
                                    <AdminRoute id={111111}>
                                        <Storelist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/chainlist"
                                element={
                                    <AdminRoute id={1111}>
                                        <Chainlist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/storeassignlist"
                                element={
                                    <AdminRoute id={7}>
                                        <UserAssignlist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/skulist"
                                element={
                                    <AdminRoute id={8}>
                                        <SKUlist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/skucategorylist"
                                element={
                                    <AdminRoute id={8}>
                                        <SKUCategorylist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/promosavailabilitylist"
                                element={
                                    <AdminRoute id={9}>
                                        <Promosavailabilitylist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/profile"
                                element={
                                    <AdminRoute id={1}>
                                        <Profile />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/zone"
                                element={
                                    <AdminRoute id={1111}>
                                        <ZoneList />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="admin/task"
                                element={
                                    <AdminRoute id={1111}>
                                        <Task />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="admin/task/tasklist"
                                element={
                                    <AdminRoute id={1111}>
                                        <Tasklist />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="admin/planner-report"
                                element={
                                    <AdminRoute id={1111}>
                                        <PlannerReport />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/attendance"
                                element={
                                    <AdminRoute id={1111}>
                                        <AttendanceNew />
                                    </AdminRoute>
                                }
                            />
                            {/* User routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <UserRoute>
                                        <DashboardUi />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/client/dashboard"
                                element={
                                    <UserRoute>
                                        <div className="px-3 py-2">
                                            <DashboardUi />
                                        </div>
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/executive-dashboard"
                                element={
                                    <UserRoute>
                                        <ExecutiveDashboard />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/dashboard2"
                                element={
                                    <UserRoute>
                                        <ExecutiveDashboard />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <AuthRoute>
                                        <Profile />
                                    </AuthRoute>
                                }
                            />
                            <Route
                                path="/map"
                                element={
                                    <UserRoute>
                                        <Map />
                                    </UserRoute>
                                }
                            />
                            {/* <Route path="/admin/dashboard" element={<Dashboard colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} /> */}
                            <Route
                                path="/attendance"
                                element={
                                    <UserRoute>
                                        {/* <Attendance /> */}
                                        <AttendanceNew />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/planner-report"
                                element={
                                    <UserRoute>
                                        <PlannerReport />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/attendanceanalysis"
                                element={
                                    <UserRoute>
                                        <AttendanceAnalysis />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/shareofshelf"
                                element={
                                    <UserRoute>
                                        <ShairOfShell />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/shair-of-shelf"
                                element={
                                    <UserRoute>
                                        <ShairOfShell />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/oos-analysis"
                                element={
                                    <UserRoute>
                                        <OssReport />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/out-of-stock"
                                element={
                                    <UserRoute>
                                        <OssReport />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/salesanalysis"
                                element={
                                    <UserRoute>
                                        <SalesAnalysis />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/sales-analysis"
                                element={
                                    <UserRoute>
                                        <SalesAnalysis />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/merchandising"
                                element={
                                    <UserRoute>
                                        <Merchandise />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/opening-inventory"
                                element={
                                    <UserRoute>
                                        <OpeningInventory />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/dsr-report"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="DSR Report" endpoint="/web/report/dsr_report" sheetName="DSR Data" filename="dsr_report.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/closing-inventory"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Closing Inventory" endpoint="/web/closingInventory-data" sheetName="Closinginventory Data" filename="closing_inventory.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/new-inventory"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="New Inventory" endpoint="/web/report/new_inventory" sheetName="Newinventory Data" filename="new_inventory.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/market-intelligence"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Market Intelligence" endpoint="/web/report/market_intelligence" sheetName="Market Intelligence" filename="market_intelligence.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/user-checkinfo"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Checkin-Checkout" endpoint="/web/report/checkinout" sheetName="Checkinout Data" filename="checkin_checkout.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/assets-tracking"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Assets Tracking" endpoint="/web/report/assets_tracking" sheetName="Assets Tracking" filename="assets_tracking.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/shopper-engagement"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Shopper Engagement" endpoint="/web/report/shopper_engagement" sheetName="Shopper Engagement" filename="shopper_engagement.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/promo-report"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Promo Report" endpoint="/web/report/promos_reports" sheetName="Promo Data" filename="promo_report.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/tl-report"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="TL Report" endpoint="/web/report/tl_report" sheetName="TL Report" filename="tl_report.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/competition_brand"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Competition Brand" endpoint="/web/report/competition_brand" sheetName="Competition Brand" filename="competition_brand.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/homeleave-report"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Home Leave" endpoint="/web/report/home_leave" sheetName="Home Leave" filename="home_leave.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/placevisit-report"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Place Visit" endpoint="/web/report/placevisit" sheetName="Place Visit" filename="place_visit.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/order-request"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Order Request" endpoint="/web/export/order_request_form" sheetName="Order Request" filename="order_request.xlsx" />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="/checkin-activity"
                                element={
                                    <UserRoute>
                                        <ReportViewer title="Checkin Activity" endpoint="/web/report/checkindetails" sheetName="Checkin Activity" filename="checkin_activity.xlsx" />
                                    </UserRoute>
                                }
                            />

                            <Route
                                path="/"
                                element={
                                    <UserRoute>
                                        <DashboardUi />
                                    </UserRoute>
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <UserRoute>
                                        <Error />
                                    </UserRoute>
                                }
                            />
                        </Routes>
                    </div>
                    <AppFooter colorMode={colorMode} />
                </div>
            </div>
        </RTLContext.Provider>
    );
};

export default App;
