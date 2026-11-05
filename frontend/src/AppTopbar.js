import React, { useContext, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { MegaMenu } from 'primereact/megamenu';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { RTLContext } from './App';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from './redux/slice/AdminSlice/authSlice';
import logos from './assets/images/mainlogo.png';
import blankuser from './assets/images/blank-user.jpg';

const AppTopbar = (props) => {
    const dispatch = useDispatch();
    const { roleName, userData, profileImage } = useSelector((store) => store.auth);
    const isRTL = useContext(RTLContext);
    const navigate = useNavigate();
    const topbarRef1 = useRef(null);
    const topbarRef2 = useRef(null);
    const topbarRef3 = useRef(null);
    const topbarRef4 = useRef(null);

    // Fixed for 6.1.0
    // eslint-disable-next-line
    const searchPanel = useRef(null);
    const logout = () => {
        dispatch(handleLogout());
        if (roleName == 'admin' || roleName == 'sub_admin') {
            navigate('/login');
        } else {
            navigate('/web/login');
        }
    };
    const handleProfile = () => {
        if (roleName == 'admin' || roleName == 'sub_admin') {
            navigate('/admin/profile');
        } else {
            navigate('/profile');
        }
    };
    useEffect(() => {
        // Fixed for 6.1.0
        /*if (props.searchActive) {
            searchPanel.current.element.focus();
        }*/
    }, [ props.searchActive ]);

    const onInputKeydown = (event) => {
        const key = event.which;

        //escape, tab and enter
        if (key === 27 || key === 9 || key === 13) {
            props.onSearch(false);
        }
    };

    const userModel = [
        // //.........User...........//

        // {
        //     label: 'Dashboard',
        //     command: () => {
        //         navigate('/dashboard');
        //     }
        // },
        // {
        //     label: 'Map',
        //     command: () => {
        //         navigate('/map');
        //     }
        // },
        // {
        //     label: 'Reports',
        //     items: [
        //         [
        //             {
        //                 // label: 'PAGES 1',
        //                 items: [
        //                     {
        //                         label: 'Attendance',
        //                         icon: 'pi pi-fw pi-user-edit',
        //                         command: () => {
        //                             navigate('/attendance');
        //                         }
        //                     }
        //                 ]
        //             }
        //         ]
        //     ]
        // }
        // {
        //     label: 'Planner',
        //     items: [
        //         [
        //             {
        //                 // label: 'PAGES 1',
        //                 items: [
        //                     {
        //                         label: 'Tasks',
        //                         icon: 'pi pi-user-edit',
        //                         command: () => {
        //                             navigate('/task');
        //                         }
        //                     },
        //                     {
        //                         label: 'Planner Report',
        //                         icon: 'pi pi-fw pi-calendar-plus',
        //                         command: () => {
        //                             navigate('/planner-report');
        //                         }
        //                     }
        //                 ]
        //             }
        //         ]
        //     ]
        // }
    ];
    // const adminModel = [
    //     //admin
    //     {
    //         label: 'Dashboard',
    //         icon: 'pi pi-home',
    //         command: () => {
    //             navigate('/admin/dashboard');
    //         }
    //     },
    //     {
    //         label: 'Users',
    //         icon: 'pi pi-user',
    //         command: () => {
    //             navigate('/admin/userlist');
    //         }
    //     },
    //     {
    //         label: 'Projects',
    //         icon: 'pi pi-slack',
    //         command: () => {
    //             navigate('/admin/projectlist');
    //         }
    //     },
    //     {
    //         label: 'Stores',
    //         icon: 'pi pi-calculator',
    //         command: () => {
    //             navigate('/admin/storelist');
    //         }
    //     },
    //     {
    //         label: 'Chain',
    //         icon: 'pi pi-link',
    //         command: () => {
    //             navigate('/admin/chainlist');
    //         }
    //     },
    //     {
    //         label: 'Store User Assign',
    //         icon: 'pi pi-users',
    //         command: () => {
    //             navigate('/admin/userassignlist');
    //         }
    //     },

    //     {
    //         label: 'SKU',
    //         icon: 'pi pi-th-large',
    //         command: () => {
    //             navigate('/admin/skulist');
    //         }
    //     },

    //     {
    //         label: 'Promos Availability ',
    //         icon: 'pi pi-qrcode',
    //         command: () => {
    //             navigate('/admin/promosavailabilitylist');
    //         }
    //     }
    // ];
    return (
        <div className="layout-topbar shadow-4">
            <div className="layout-topbar-left">
                <button
                    type="button"
                    style={{ cursor: 'pointer' }}
                    className="layout-topbar-logo p-link"
                    onClick={() => {
                        roleName == 'admin' ? navigate('/admin/dashboard') : navigate('/dashboard');
                    }}
                >
                    <img id="app-logo" src={logos} alt="layout" style={{ height: '3.25rem' }} />
                    {/* <img id="app-logo" src='' alt="layout" style={{ height: '3.25rem' }} /> */}
                </button>
                <button type="button" className="layout-menu-button shadow-6 p-link" onClick={props.onMenuButtonClick}>
                    <i className="pi pi-chevron-right"></i>
                </button>
                <button type="button" className="layout-topbar-mobile-button p-link">
                    <i className="pi pi-ellipsis-v fs-large" onClick={props.onMobileTopbarButtonClick}></i>
                </button>
            </div>

            <div className={classNames('layout-topbar-right', { 'layout-topbar-mobile-active': props.mobileTopbarActive })}>
                <div className="layout-topbar-actions-left">
                    {/* <MegaMenu model={roleName == 'admin' ? adminModel : userModel} className="layout-megamenu" /> */}
                    {roleName == 'tl' ? <MegaMenu model={userModel} className="layout-megamenu" /> : null}
                </div>
                <div className="layout-topbar-actions-right">
                    <ul className="layout-topbar-items">
                        <li className="layout-topbar-item notifications">
                            {/* <button className="layout-topbar-action rounded-circle p-link" onClick={(event) => props.onTopbarItemClick({ originalEvent: event, item: 'notifications' })}>
                                <span className="p-overlay-badge">
                                    <i className="pi pi-bell fs-large"></i>
                                    <span className="p-badge p-badge-warning p-badge-dot"></span>
                                </span>
                            </button> */}

                            {/* <CSSTransition nodeRef={topbarRef2} classNames="p-toggleable" timeout={{ enter: 1000, exit: 450 }} in={props.activeTopbarItem === 'notifications'} unmountOnExit>
                                <ul ref={topbarRef2} className="layout-topbar-action-panel shadow-6 fadeInDown">
                                    <li className="mb-3">
                                        <span className="px-3 fs-small">
                                            You have <b>4</b> new notifications
                                        </span>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-1.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Jerome Bell</span>
                                                    <small>42 mins ago</small>
                                                </div>
                                                <span className="fs-small">How to write content about your photographs?</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-2.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Cameron Williamson</span>
                                                    <small>48 mins ago</small>
                                                </div>
                                                <span className="fs-small">Start a blog to reach your creative peak.</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-3.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Anna Miles</span>
                                                    <small>1 day ago</small>
                                                </div>
                                                <span className="fs-small">Caring is the new marketing</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-4.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Arlene Mccoy</span>
                                                    <small>4 day ago</small>
                                                </div>
                                                <span className="fs-small">Starting your traveling blog with Vasco.</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </CSSTransition> */}
                        </li>
                        {/* <li className="layout-topbar-item app">
                            <button className="layout-topbar-action rounded-circle p-link" onClick={(event) => props.onTopbarItemClick({ originalEvent: event, item: 'apps' })}>
                                <i className="pi pi-table fs-large"></i>
                            </button>

                            <CSSTransition nodeRef={topbarRef3} classNames="p-toggleable" timeout={{ enter: 1000, exit: 450 }} in={props.activeTopbarItem === 'apps'} unmountOnExit>
                                <div ref={topbarRef3} className="layout-topbar-action-panel shadow-6">
                                    <div className="grid grid-nogutter">
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-image action indigo-bgcolor white-color"></i>
                                                <span>Products</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-file-pdf action orange-bgcolor white-color"></i>
                                                <span>Reports</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-dollar action teal-bgcolor white-color"></i>
                                                <span>Balance</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-cog action pink-bgcolor white-color"></i>
                                                <span>Settings</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-key action bluegrey-bgcolor white-color"></i>
                                                <span>Credentials</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center justify-content-center flex-column text-color p-link">
                                                <i className="pi pi-sitemap action cyan-bgcolor white-color"></i>
                                                <span>Sitemap</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>
                        </li> */}
                        <div className="flex flex-column">
                            <span className="mt-3 font-bold capitalize">{userData?.first_name}</span>
                            {/* <small className='font-light capitalize'>{roleName == 'admin' ? roleName : 'sub admin'}</small> */}
                            {roleName == "admin" ? <small className="capitalize"> admin</small> : null}
                            {roleName == 'npc' ? <small className="capitalize">NPC</small> : null}
                            {roleName == 'npm' ? <small className="capitalize">NPM</small> : null}
                            {roleName == 'sub_admin' ? <small className="capitalize">sub admin</small> : null}
                            {roleName == 'tl' ? <small className="uppercase">tl</small> : null}
                            {roleName == 'ta' ? <small className="uppercase">ta</small> : null}
                            {roleName == 'asm' ? <small className="uppercase">asm</small> : null}
                            {roleName == 'ase' ? <small className="uppercase">ase</small> : null}
                            {roleName == 'se' ? <small className="uppercase">se</small> : null}
                        </div>
                        <li className="layout-topbar-item">
                            <button className="layout-topbar-action flex flex-row justify-content-center align-items-center px-2 rounded-circle p-link" onClick={(event) => props.onTopbarItemClick({ originalEvent: event, item: 'profile' })}>
                                {/* <img src="assets/demo/images/avatar/amyelsner.png" alt="avatar" style={{ width: '32px', height: '32px' }} /> */}
                                {/* <img src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png" alt="avatar" style={{ width: '32px', height: '32px' }} /> */}
                                {/* {userData?.profile_image ? (
                                    <img src={userData?.profile_image != '' ? profileImage : blankuser} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '22px' }}></img>
                                ) : (
                                    <img src={blankuser} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '22px' }}></img>
                                )} */}
                                {profileImage != '' ? (
                                    <img src={profileImage} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '22px' }} />
                                ) : (
                                    <img src={blankuser} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '22px' }} />
                                )}
                            </button>
                            <CSSTransition nodeRef={topbarRef4} classNames="p-toggleable" timeout={{ enter: 1000, exit: 450 }} in={props.activeTopbarItem === 'profile'} unmountOnExit>
                                <ul ref={topbarRef4} className="layout-topbar-action-panel shadow-6">
                                    <li className="layout-topbar-action-item">
                                        <button className="flex flex-row align-items-center p-link profile-button" onClick={() => handleProfile()}>
                                            <i className={classNames('pi pi-user', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Profile</span>
                                        </button>
                                    </li>
                                    {/* <li className="layout-topbar-action-item">
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-file', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Terms of Usage</span>
                                        </button>
                                    </li>
                                    <li className="layout-topbar-action-item ">
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-compass', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Support</span>
                                        </button>
                                    </li> */}
                                    <li className="layout-topbar-action-item" onClick={() => logout()}>
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-power-off', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </CSSTransition>
                        </li>
                        {/* <li className="layout-topbar-item">
                            <button type="button" className="layout-topbar-action rounded-circle p-link" onClick={props.onRightMenuButtonClick}>
                                <i className="pi fs-large pi-arrow-left"></i>
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AppTopbar;
