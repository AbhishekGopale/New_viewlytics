import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';
import { useContext, useRef } from 'react';
import { RTLContext } from './App';
import { Tooltip } from 'primereact/tooltip';
import { handleLogout } from './redux/slice/AdminSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import blankuser from './assets/images/blank-user.jpg';
import { useNavigate } from 'react-router-dom';
const AppInlineMenu = (props) => {
    const inlineMenuRef = useRef(null);
    const isRTL = useContext(RTLContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roleName, userData, profileImage } = useSelector((store) => store.auth);
    const menuKey = props.menuKey || 'inline-menu';

    const inlineMenuClassName = classNames(
        'layout-inline-menu',
        {
            'layout-inline-menu-active': props.inlineMenuActive[ props.menuKey ]
        },
        props.className
    );

    const isSlim = () => {
        return props.menuMode === 'slim';
    };
    const handleNavigate = () => {
        if (roleName == 'admin' || roleName == 'sub_admin') {
            navigate('/admin/profile');
        } else {
            navigate('/profile');
        }
    };
    const handleLogoutEvent = () => {
        dispatch(handleLogout());
        if (roleName == 'admin' || roleName == 'sub_admin') {
            navigate('/admin/login');
        } else {
            navigate('/web/login');
        }
    };
    return (
        <div className={inlineMenuClassName} style={props.style}>
            {isSlim() && <Tooltip target=".avatarTooltip" />}

            <button
                data-pr-tooltip="Amy Elsner"
                className={classNames('avatarTooltip layout-inline-menu-action p-link flex flex-row align-items-center', { 'p-3 lg:p-1 py-3': props.horizontal, 'p-3': !props.horizontal })}
                onClick={(e) => props.onInlineMenuClick(e, menuKey)}
            >
                {/* <img src="assets/demo/images/avatar/amyelsner.png" alt="avatar" style={{ width: '32px', height: '32px' }} /> */}
                {/* {userData?.profile_image ? (
                    <img src={profileImage != "" ? profileImage : blankuser} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '22px' }} />
                ) : (
                    <img src={blankuser} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '22px' }} />
                )} */}
                <img src={profileImage == '' ? blankuser : profileImage} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '22px' }} />

                <span className={classNames('flex flex-column', { 'ml-2': !isRTL, 'mr-2': isRTL })}>
                    <span className="font-bold capitalize">{userData?.first_name}</span>
                    {/* <small className='capitalize'>{roleName == 'admin' ? roleName : 'sub admin'}</small> */}
                    {roleName == 'admin' ? <small className="capitalize"> admin</small> : null}
                    {roleName == 'npc' ? <small className="capitalize">NPC</small> : null}
                    {roleName == 'npm' ? <small className="capitalize">NPM</small> : null}
                    {roleName == 'sub_admin' ? <small className="capitalize">sub admin</small> : null}
                    {roleName == 'tl' ? <small className="uppercase">tl</small> : null}
                    {roleName == 'ta' ? <small className="uppercase">ta</small> : null}
                    {roleName == 'asm' ? <small className="uppercase">asm</small> : null}
                    {roleName == 'ase' ? <small className="uppercase">ase</small> : null}
                    {roleName == 'se' ? <small className="uppercase">se</small> : null}
                </span>
                <i className={classNames('layout-inline-menu-icon pi pi-angle-down', { 'ml-auto': !isRTL, 'mr-auto': isRTL })}></i>
            </button>

            <CSSTransition nodeRef={inlineMenuRef} classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={props.inlineMenuActive[ menuKey ]} unmountOnExit>
                <>
                    <ul ref={inlineMenuRef} className="layout-inline-menu-action-panel">
                        <li className="layout-inline-menu-action-item tooltip" data-pr-tooltip="Settings" onClick={() => handleNavigate()}>
                            <button className="flex flex-row align-items-center p-link">
                                <i className="pi pi-user pi-fw"></i>
                                <span>Profile</span>
                            </button>
                        </li>
                        {/* <li className="layout-inline-menu-action-item tooltip" data-pr-tooltip="Terms of Usage">
                            <button className="flex flex-row align-items-center p-link">
                                <i className="pi pi-file pi-fw"></i>
                                <span>Terms of Usage</span>
                            </button>
                        </li> */}
                        {/* <li className="layout-inline-menu-action-item tooltip" data-pr-tooltip="Support">
                            <button className="flex flex-row align-items-center p-link">
                                <i className="pi pi-compass pi-fw"></i>
                                <span>Support</span>
                            </button>
                        </li> */}
                        <li className="layout-inline-menu-action-item tooltip" data-pr-tooltip="Logout" onClick={() => handleLogoutEvent()}>
                            <button className="flex flex-row align-items-center p-link">
                                <i className="pi pi-power-off pi-fw"></i>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                    {isSlim() && <Tooltip target=".tooltip" />}
                </>
            </CSSTransition>
        </div>
    );
};

export default AppInlineMenu;
