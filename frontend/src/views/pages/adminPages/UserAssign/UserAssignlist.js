import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useDispatch, useSelector } from 'react-redux';
import _default from 'react-redux/es/components/connect';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Paginator } from 'primereact/paginator';
import { FileUpload } from 'primereact/fileupload';
import * as XLSX from 'xlsx';
import { GetAllCityRequest, GetAllStateRequest, GetAllStoreRequest, GetUserRoleByNameRequest, handleResetStore } from '../../../../redux/slice/AdminSlice/storeSlice';
import { CreateUserAssignRequest, DeleteUserAssignRequest, EditUserAssignRequest, getUserIdRequest, handleResetUserAssign, MultipalDeleteUserAssignRequest } from '../../../../redux/slice/AdminSlice/userAssignSlice';
import { getAllAsmRequest, getAllMerchandiserRequest, getAllNpmRequest, getAllPromoterRequest, getAllStoreLabelRequest, getAllTaRequest, getAllTeamLeaderRequest, getAllUserNameRequest } from '../../../../redux/slice/AdminSlice/userSlice';
import { getAllAseListRequest, getAllNpcListRequest, getAllSeListRequest } from '../../../../redux/slice/AdminSlice/clientSlice';
import { getZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import { DeleteModal, ImportModal, chain_sample_excel } from '../../../../indexMain';
import SubHeader from '../../../components/SubHeader';

const UserAssignlist = () => {
    const dispatch = useDispatch();
    const { npcList, aseList, seList } = useSelector((state) => state.client);
    console.log(aseList, 'aseList')
    const { zoneList } = useSelector((state) => state.zone);
    const { storeData, stateData, cityData, userRole } = useSelector((state) => state.store);
    console.log(userRole, 'userRole')
    const { successMessage, userIdData, } = useSelector((state) => state.userAssign);
    const { promoterList, teamLeaderList, merchandiserList, asmList, storeList, taList, getByUserNameData, npmList } = useSelector((state) => state.user);
    const [ submitted, setSubmitted ] = useState(false);
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isViewDialogOpen, setIsViewDialogOpen ] = useState(false);
    const [ isEditDialogOpen, setIsEditDialogOpen ] = useState(false);
    const [ deleteStoresDialog, setDeleteStoresDialog ] = useState(false);
    const [ selectedStores, setSelectedStores ] = useState([]);
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ userDeleteId, setuserDeleteId ] = useState('');
    const [ deleteUserDialog, setDeleteUserDialog ] = useState(false);
    const [ expandedRows, setExpandedRows ] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [ filters, setFilters ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ chainFilterValue, setChainFilterValue ] = useState('');
    const [ zoneFilterValue, setZoneFilterValue ] = useState('');
    const [ stateFilterValue, setStateFilterValue ] = useState('');
    const [ cityFilterValue, setCityFilterValue ] = useState('');

    const [ first, setFirst ] = useState(0);
    const tableData = {
        page: 1,
        limit: 10,
        filter_value: '',
        sort_order: 'desc',
        order_column: ''
    };
    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`);

    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);

        dispatch(GetAllStoreRequest(`page=${event.page + 1}&filter_value=${searchFilterValue}&limit=${event.rows}`));
    };

    const handleQueryChange = (data) => {
        let queryStr = Object.keys(data)
            .map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[ key ]);
            })
            .join('&');
        setQueryString(queryStr);
    };

    const template = {
        layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport',
        CurrentPageReport: (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            );
        }
    };
    const roleOptions = [
        { label: 'NPC', value: '9' },
        { label: 'ASM', value: '10' },
        { label: 'SE', value: '11' }
    ];
    const [ role, setRole ] = useState({
        user_id: '',
        role: '',
        roleName: '',
        roleLabel: '',
        promoter: '',
        promoterLabel: '',
        merchandiser: '',
        merchandiserLabel: '',
        teamLeader: '',
        teamLeaderLabel: '',
        asm: '',
        asmLabel: '',
        npm: '',
        npmLabel: '',
        store_code: '',
        store_code: '',
        store_name: '',
        chain: '',
        zone: '',
        city: '',
        cityLabel: '',
        state: '',
        stateLabel: '',
        location: '',
        zone: '',
        zoneLabel: '',
        tlLabel: '',
        tl: '',
        ta: '',
        taLabel: '',
        userName: '',
        userNameLabel: '',
        userType: '',

        // Client states

        client_role_id: '',
        client_role_label: '',
        client_se: '',
        client_se_label: '',
        client_asm: '',
        client_asm_label: '',
        client_npc: '',
        client_npc_label: ''
    });
    console.log(role, 'role');
    const handleReset = () => {
        setRole({
            user_id: '',
            role: '',
            roleLabel: '',
            promoter: '',
            promoterLabel: '',
            merchandiser: '',
            merchandiserLabel: '',
            teamLeader: '',
            teamLeaderLabel: '',
            asm: '',
            asmLabel: '',
            npm: '',
            npmLabel: '',
            store_code: '',
            store_code: '',
            store_name: '',
            chain: '',
            zone: '',
            city: '',
            cityLabel: '',
            state: '',
            stateLabel: '',
            location: '',
            zone: '',
            zoneLabel: '',
            tlLabel: '',
            tl: '',
            ta: '',
            taLabel: '',
            userName: '',
            userNameLabel: '',
            userType: '',
            role_id: '',
            client_role_id: '',
            client_se: '',
            client_se_label: '',
            client_asm: '',
            client_asm_label: '',
            client_npc: '',
            client_npc_label: ''
        });
    };
    const userTypeList = [
        { label: 'User Name', value: '0' },
        { label: 'User Id', value: '1' }
    ];

    const hideDialog = () => {
        setIsModalOpen(false);
        setIsEditDialogOpen(false);
        setSubmitted(false);
        handleReset();
        dispatch(handleResetUserAssign());
        dispatch(handleResetStore());
    };
    const hideEditDialog = () => {
        setIsEditDialogOpen(false);
    };
    const handleUserUpdate = () => {
        // dispatch(handleUserUpdate());
    };
    const handleCreateUser = () => {
        if (userRole?.role_name == 'promoter') {
            const userData = {
                store_code: role.store_code,
                user_id: role.userName,
                promoter_id: role.userName,
                promoter: `${userRole?.first_name} ${userRole?.last_name}`,
                tl_id: role.teamLeader,
                tl: role.teamLeaderLabel,
                asm_id: role.asm,
                asm: role.asmLabel,
                ta_id: role.ta,
                ta: role.taLabel,
                npm_id: role.npm,
                npm: role.npmLabel,
                zone: role.zone,
                city: role.city,
                state: role.state,
                se_id: role.client_se,
                client_se: role.client_se_label,
                client_asm_id: role.client_asm,
                client_asm: role.client_asm_label,
                npc_id: role.client_npc,
                client_npc: role.client_npc_label
            };
            dispatch(CreateUserAssignRequest(userData));
        } else if (userRole?.role_name == 'merchandiser') {
            const userData = {
                store_code: role.store_code,
                user_id: role.userName,
                merchandiser_id: role.userName,
                merchandiser: `${userRole.first_name} ${userRole.last_name}`,
                tl_id: role.teamLeader,
                tl: role.teamLeaderLabel,
                asm_id: role.asm,
                asm: role.asmLabel,
                ta_id: role.ta,
                ta: role.taLabel,
                npm_id: role.npm,
                npm: role.npmLabel,
                zone: role.zone,
                state: role.state,
                city: role.city,
                se_id: role.client_se,
                client_se: role.client_se_label,
                client_asm_id: role.client_asm,
                client_asm: role.client_asm_label,
                npc_id: role.client_npc,
                client_npc: role.client_npc_label
            }
            dispatch(CreateUserAssignRequest(userData));
        } else if (userRole?.role_name == 'tl') {
            const userData = {
                store_code: role.store_code,
                user_id: role.userName,
                tl_id: role.userName,
                tl: `${userRole.first_name} ${userRole.last_name}`,
                asm_id: role.asm,
                asm: role.asmLabel,
                ta_id: role.ta,
                ta: role.taLabel,
                npm_id: role.npm,
                npm: role.npmLabel,
                zone: role.zone,
                city: role.city,
                state: role.state,
                client_npc: role.npc,
                se_id: role.se,
                client_se: role.seLabel,
                client_asm_id: role.asm,
                client_asm: role.client_asm_label,
                ase: role.ase,
                client_npc: role.client_npc_label,
                npc_id: role.npc
            };
            dispatch(CreateUserAssignRequest(userData));
        } else if (userRole?.role_name == 'asm') {
            const userData = {
                store_code: role.store_code,
                user_id: role.userName,
                tl_id: role.teamLeader,
                tl: role.teamLeaderLabel,
                asm_id: role.userName,
                asm: `${userRole.first_name} ${userRole.last_name}`,
                ta_id: role.ta,
                ta: role.taLabel,
                npm_id: role.npm,
                npm: role.npmLabel,
                zone: role.zone,
                city: role.city,
                state: role.state,
                se_id: role.se,
                client_se: role.seLabel,
                client_asm_id: role.asm,
                client_asm: role.client_asm_label,
                ase: role.ase,
                client_npc: role.client_npc_label,
                npc_id: role.npc
            };
            dispatch(CreateUserAssignRequest(userData));
        } else if (userRole?.role_name == 'ta') {
            const userData = {
                store_code: role.store_code,
                user_id: role.userName,
                asm_id: '',
                asm: '',
                ta_id: role.userName,
                ta: `${userRole.first_name} ${userRole.last_name}`,
                npm_id: role.npm,
                npm: role.npmLabel,
                zone: role.zone,
                city: role.city,
                state: role.state,
                se_id: role.se,
                client_se: role.seLabel,
                client_asm_id: role.asm,
                client_asm: role.client_ase_label,
                ase: role.ase,
                client_npc: role.npcLabel,
                npc_id: role.npc
            };
            dispatch(CreateUserAssignRequest(userData));
        }
    };
    const handleUpdateUser = () => {
        console.log('role?.role_name in', role?.role_name);

        if (role?.role_name == 'promoter') {
            const userData = {
                store_code: role.store_code,
                promoter_id: role.userName,
                promoter: role.promoterLabel,
                user_id: role.userName,
                merchandiser_id: role.merchandiser,
                merchandiser: role.merchandiserLabel,
                tl_id: role.teamLeader,
                tl: role.teamLeaderLabel,
                asm_id: role.asm,
                asm: role.asmLabel,
                ta_id: role.ta,
                ta: role.taLabel,
                user_npm: role.npm,
                zone: role.zone,
                city: role.city,
                npm_id: role.npm,
                npm: role.npmLabel,
                city: role.city,
                cityLabel: role.cityLabel,
                state: role.state,
                stateLabel: role.stateLabel,
                se_id: role.client_se,
                client_se: role.client_se_label,
                client_asm_id: role.client_asm,
                client_asm: role.client_asm_label,
                npc_id: role.client_npc,
                client_npc: role.client_npc_label,
            };
            dispatch(EditUserAssignRequest(role?.user_id, userData));
            console.log(userData, 'userData');
        } else if (role?.role_name == 'merchandiser') {
            console.log('merch')
            const userData = {
                store_code: role.store_code,
                promoter_id: '',
                promoter: '',
                user_id: role.userName,
                merchandiser_id: role.userName,
                // merchandiser: `${userRole?.first_name} ${userRole?.last_name}`,
                merchandiser: `${'meet'} ${'patel'}`,
                tl_id: role.teamLeader,
                tl: role.teamLeaderLabel,
                asm_id: role.asm,
                asm: role.asmLabel,
                ta_id: role.ta,
                ta: role.taLabel,
                user_npm: 53,
                zone: role.zone,
                city: role.city,
                // cityLabel: role.cityLabel,
                state: role.state,
                ase: role.ase,
                client_npc: role.npc,
                se: role.se,
                // stateLabel: role.stateLabel,
                se_id: role.se,
                client_se: role.seLabel,
                client_asm_id: role.asm,
                client_asm: role.client_ase_label,
                ase: role.ase,
                client_npc: role.npcLabel,
                npc_id: role.npc
            };
            dispatch(EditUserAssignRequest(userData));
        } else if (userRole?.role_name == 'tl') {
            const userData = {
                store_code: role.store_code,
                promoter_id: '',
                promoter: '',
                user_id: role.userName,
                merchandiser_id: '',
                merchandiser: '',
                tl_id: role.userName,
                tl: `${userRole.first_name} ${userRole.last_name}`,
                asm_id: role.userName,
                asm: role.asmLabel,
                ta_id: role.ta,
                ta: role.taLabel,
                user_npm: 53,
                zone: role.zone,
                city: role.city,
                // cityLabel: role.cityLabel,
                state: role.state,
                // stateLabel: role.stateLabel,
                client_npc: role.npc,
                se_id: role.se,
                client_se: role.seLabel,
                client_asm_id: role.asm,
                client_asm: role.client_ase_label,
                ase: role.ase,
                client_npc: role.npcLabel,
                npc_id: role.npc
            };
            dispatch(EditUserAssignRequest(userData));
        } else if (userRole?.role_name == 'asm') {
            const userData = {
                store_code: role.store_code,
                promoter_id: '',
                promoter: '',
                user_id: role.userName,
                merchandiser_id: '',
                merchandiser: '',
                tl_id: role.teamLeader,
                tl: role.teamLeaderLabel,
                asm_id: role.userName,
                asm: `${userRole.first_name} ${userRole.last_name}`,
                ta_id: role.ta,
                ta: role.taLabel,
                user_npm: 53,
                zone: role.zone,
                city: role.city,
                // cityLabel: role.cityLabel,
                state: role.state,
                // stateLabel: role.stateLabel,
                se_id: role.se,
                client_se: role.seLabel,
                client_asm_id: role.asm,
                client_asm: role.client_ase_label,
                ase: role.ase,
                client_npc: role.npcLabel,
                npc_id: role.npc
            };
            dispatch(EditUserAssignRequest(userData));
        } else if (userRole?.role_name == 'ta') {
            const userData = {
                store_code: role.store_code,
                promoter_id: '',
                promoter: '',
                user_id: role.userName,
                merchandiser_id: '',
                merchandiser: '',
                tl_id: '',
                tl: '',
                asm_id: '',
                asm: '',
                ta_id: role.userName,
                ta: `${userRole.first_name} ${userRole.last_name}`,
                user_npm: 53,
                zone: role.zone,
                city: role.city,
                // cityLabel: role.cityLabel,
                state: role.state,
                // stateLabel: role.stateLabel,
                se_id: role.se,
                client_se: role.seLabel,
                client_asm_id: role.asm,
                client_asm: role.client_ase_label,
                ase: role.ase,
                client_npc: role.npcLabel,
                npc_id: role.npc
            };
            dispatch(EditUserAssignRequest(userData));
        }
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };
    const handleDeleteUser = () => {
        dispatch(DeleteUserAssignRequest(userDeleteId));
        setDeleteUserDialog(false);
    };
    const confirmDeleteUser = (userId) => {
        setuserDeleteId(userId?.id);
        setDeleteUserDialog(true);
    };
    const hideDeleteStoreDialog = () => {
        setDeleteStoresDialog(false);
        setDeleteUserDialog(false);
    };
    const confirmDeleteSelected = () => {
        setDeleteStoresDialog(true);
    };
    const deleteSelectedStores = () => {
        let stores = storeData?.Store.filter((val) => selectedStores.includes(val));
        let ids = [];
        stores?.map((e) => {
            let id = e.id;
            ids.push(id);
        });
        const formData = {
            id: ids
        };
        dispatch(MultipalDeleteUserAssignRequest(formData));
        setSelectedStores(null);
        setDeleteStoresDialog(false);
        dispatch(handleResetStore());
    };
    const handleClearFliter = () => {
        filterClearCallback();
        chainfilterClearCallback();
        zonefilterClearCallback();
        statefilterClearCallback();
        cityfilterClearCallback();
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={confirmDeleteSelected} disabled={selectedStores?.length > 1 ? false : true} />

                    <Button
                        label="Clear Filter"
                        disabled={!searchFilterValue && !chainFilterValue && !zoneFilterValue && !stateFilterValue && !cityFilterValue}
                        className="p-button-outlined ml-2 "
                        onClick={() => handleClearFliter()}
                        icon="pi pi-filter-slash"
                    >
                        {' '}
                    </Button>
                </div>
            </React.Fragment>
        );
    };
    const handleCreate = () => {
        setIsModalOpen(true);
    };
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Store Assign" icon="pi pi-plus" className="p-button-outlined mr-2 p-button-success" onClick={() => handleCreate()} />
                <Button icon="pi pi-plus" onClick={() => setModalExcel(!modalExcel)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help" />
            </React.Fragment>
        );
    };
    const viewDialogFooter = <>{/* <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={() => setIsViewDialogOpen(false)} /> */}</>;
    const hideViewDialog = () => {
        setIsViewDialogOpen(false);
    };
    const viewDetailsDialog = (rowData) => {
        setRole({
            store_code: rowData.store_code,
            store_name: rowData.store_name,
            chain: rowData.chain,
            zone: rowData.zone_name,
            city: rowData.city,
            state: rowData.state,
            location: rowData.location,
            merchandiser: rowData.merchandiser,
            promoter: rowData.promoter,
            tl: rowData.tl,
            asm: rowData.asm
        });
        setIsViewDialogOpen(true);
    };

    const handleEdit = (rowData) => {
        console.log(rowData, 'rowData');
        setRole({
            ...role,
            user_id: rowData?.id,
            store_code: [ rowData?.store_code ],
            store_name: rowData?.store_name,
            chain: rowData?.chain_id,
            zone: rowData?.zone,
            city: rowData?.city_id,
            state: rowData?.state_id,
            location: rowData?.location,
            // merchandiser: rowData?.merchandiser_id,
            promoter: rowData?.promoter_id,
            tl: rowData?.tl_id,
            asm: rowData?.asm_id,
            ta: rowData?.ta_id,
            npm: rowData?.npm_id,
            role_name: 'promoter'
        });
        // if (rowData?.merchandiser_id) {
        //     setRole({
        //         ...role,
        //         role_name: 'merchandiser'
        //     });
        // }
        // if (rowData?.promoter_id) {
        //     setRole({
        //         ...role,
        //         role: 'promoter'
        //     });
        // }
        dispatch(getAllPromoterRequest());
        dispatch(getAllMerchandiserRequest());
        dispatch(getAllTeamLeaderRequest());
        dispatch(getAllStoreLabelRequest());
        dispatch(getAllAsmRequest());
        dispatch(getAllTaRequest());
        dispatch(getZoneLableRequest());
        dispatch(GetAllStateRequest(rowData?.zone));
        dispatch(GetAllCityRequest(rowData?.state_id));
        dispatch(getAllNpmRequest());
        setIsEditDialogOpen(true);
    };
    const hideExcelDialog = () => {
        setModalExcel(false);
    };
    const readExcel = (e) => {
        const file = e.files[ 0 ];
        console.log(file);
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const wsname = wb.SheetNames[ 0 ];

                const ws = wb.Sheets[ wsname ];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((data) => {
            const storeArray = { storeArray: data };
            // dispatch(CreateStoreRequest(storeArray));
        });
    };
    const storeDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={() => hideDialog()} />
            <Button
                label="Save"
                icon="pi pi-check"
                // disabled={role.ta != "" ? false : true}
                className="p-button-outlined p-button-success mr-2 mb-2"
                onClick={() => handleCreateUser()}
            />
        </>
    );
    const storeEditDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={() => hideDialog()} />
            <Button
                label="Save"
                icon="pi pi-check"
                // disabled={role.ta != "" ? false : true}
                className="p-button-outlined p-button-success mr-2 mb-2"
                onClick={() => handleUpdateUser()}
            />
        </>
    );
    const storeBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.store_code}</div>;
    };
    const chainBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.chain_name}</div>;
    };
    const zoneBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.zone_name}</div>;
    };
    const cityBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.city}</div>;
    };
    const stateBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.state}</div>;
    };
    const nameBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.store_name}</div>;
    };
    const locationBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.location}</div>;
    };
    const merchandiserBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.merchandiser == null || rowData.merchandiser == '' ? 'N / A' : rowData.merchandiser}</div>;
    };
    const promoterBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.promoter == null || rowData.promoter == '' ? 'N / A' : rowData.promoter}</div>;
    };
    const tlBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.tl == null || rowData.tl == '' ? 'N / A' : rowData.tl}</div>;
    };
    const asmBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.asm == null || rowData.asm == '' ? 'N / A' : rowData.asm}</div>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button
                    tooltip="Edit"
                    tooltipOptions={{ position: 'bottom' }}
                    icon="pi pi-pencil"
                    id="edits-icons"
                    className="p-button-rounded p-button-text  p-button-help"
                    onClick={() => {
                        handleEdit(rowData);
                        // dispatch(getAllStoreLabelRequest());
                    }}
                />
                <Button tooltip="View" tooltipOptions={{ position: 'bottom' }} icon="pi pi-eye" className="p-button-rounded p-button-warning p-button-text" id="eyes-icons" onClick={() => viewDetailsDialog(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    };
    const deleteStoreDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeleteUser} autoFocus />
        </>
    );
    const deleteStoresDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteStoreDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={deleteSelectedStores} autoFocus />
        </>
    );
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    <Column field="location" header="Location" body={locationBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
                    <Column field="promoter" header="Promoter Name" body={promoterBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                    <Column field="merchandiser" header="Merchandiser Name" body={merchandiserBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
                    <Column field="tl" header="TL Name" body={tlBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                    <Column field="asm" header="ASM Name" body={asmBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        );
    };
    const filterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${searchFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const chainfilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${chainFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const zonefilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${zoneFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const statefilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${stateFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const cityfilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${cityFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        if (searchFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const chainfilterClearCallback = (options) => {
        setChainFilterValue('');
        if (chainFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const zonefilterClearCallback = (options) => {
        setZoneFilterValue('');
        if (zoneFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const statefilterClearCallback = (options) => {
        setStateFilterValue('');
        if (stateFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const cityfilterClearCallback = (options) => {
        setCityFilterValue('');
        if (cityFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const filterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => filterClearCallback(options)} label="Clear" />;
    };
    const chainfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => chainfilterClearCallback(options)} label="Clear" />;
    };
    const zonefilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => zonefilterClearCallback(options)} label="Clear" />;
    };
    const statefilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => statefilterClearCallback(options)} label="Clear" />;
    };
    const cityfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => cityfilterClearCallback(options)} label="Clear" />;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => filterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const chainfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => chainfilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const zonefilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => zonefilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const statefilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => statefilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const cityfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => cityfilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const handleFilter = (e) => {
        setSearchFilterValue(e.target.value);
    };
    const chainhandleFilter = (e) => {
        setChainFilterValue(e.target.value);
    };
    const zonehandleFilter = (e) => {
        setZoneFilterValue(e.target.value);
    };
    const statehandleFilter = (e) => {
        setStateFilterValue(e.target.value);
    };
    const cityhandleFilter = (e) => {
        setCityFilterValue(e.target.value);
    };
    const storeFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={searchFilterValue} onChange={(e) => handleFilter(e)} placeholder="Search Store" />;
    };
    const chainFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={chainFilterValue} onChange={(e) => chainhandleFilter(e)} placeholder="Search Chain" />;
    };
    const zoneFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={zoneFilterValue} onChange={(e) => zonehandleFilter(e)} placeholder="Search Zone" />;
    };
    const stateFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={stateFilterValue} onChange={(e) => statehandleFilter(e)} placeholder="Search State" />;
    };
    const cityFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={cityFilterValue} onChange={(e) => cityhandleFilter(e)} placeholder="Search City" />;
    };

    const initFilters = () => {
        setFilters({
            store_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            chain: { value: null, matchMode: FilterMatchMode.CONTAINS },
            zone: { value: null, matchMode: FilterMatchMode.CONTAINS },
            city: { value: null, matchMode: FilterMatchMode.CONTAINS },
            state: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
    };
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllStoreRequest(queryString));
    }, [ dispatch, queryString ]);

    useEffect(() => {
        initFilters();
    }, []);
    useEffect(() => {
        if (successMessage) {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: successMessage, life: 3000 });
            setIsModalOpen(false);
            setDeleteStoresDialog(false);
            setDeleteUserDialog(false);
            handleReset();
            dispatch(handleResetStore());
            dispatch(handleResetUserAssign());
            dispatch(handleResetUserAssign());
            dispatch(GetAllStoreRequest(queryString));
        }
    }, [ successMessage, queryString ]);
    useEffect(() => {
        if (role.role == '6') {
            dispatch(getAllTaRequest());
        }
        if (role.role == '5') {
            dispatch(getAllPromoterRequest());
        }
        if (userRole == 'promoter') {
            dispatch(getAllMerchandiserRequest());
        }
        if (userRole == 'merchandiser' || userRole == 'promoter' || role.merchandiser != '') {
            dispatch(getAllTeamLeaderRequest());
        }
        if (userRole == 'asm') {
            dispatch(getAllTaRequest());
        }
        if (role.merchandiser) {
            dispatch(getAllStoreLabelRequest());
        }
        if (role.promoter) {
            dispatch(getAllStoreLabelRequest());
            dispatch(getAllAsmRequest());
        }
        if (role.teamLeader || userRole == 'tl') {
            dispatch(getAllAsmRequest());
        }
    }, [ role.role, role.merchandiser, role.promoter, role.teamLeader, userRole ]);
    useEffect(() => {
        if (role.userType == '0') {
            dispatch(getAllUserNameRequest());
        }
        if (role.userType == '1') {
            dispatch(getUserIdRequest());
        }
        if (role.userName != '') {
            // console.log("bug is here 000")
            dispatch(getAllTeamLeaderRequest());
            dispatch(getAllTaRequest());
        }
        // if (role.zone != '') {
        //     dispatch(GetAllStateRequest(role.zone));
        // }
        // if (role.role == '3' && role.teamLeader != '') {
        //     dispatch(GetAllCityRequest(role.state));
        // }
        if (role.role == '3' && role.teamLeader != '') {
            dispatch(GetAllStateRequest(role.zone));
        }
        if (role.userName != '') {
            dispatch(GetUserRoleByNameRequest(role.userName));
        }
        if (role.city != '') {
            dispatch(getAllStoreLabelRequest());
            dispatch(getAllNpmRequest());
        }
        if (role.asm != '') {
            dispatch(getAllTaRequest());
        }
    }, [ role.promoter, role.zone, role.role, role.teamLeader, role.userName, role.asm, role.city, role.userType ]);

    useEffect(() => {
        if (role.se && seList) {
            const filteredArr = seList.filter((item) => item.value === role.se);
            setRole({ ...role, npc: filteredArr[ 0 ]?.npc.value, ase: filteredArr[ 0 ]?.asm.value });
        }
    }, [ role.se, role.asm ]);

    useEffect(() => {
        if (role.ase && aseList) {
            const filteredArr = aseList.filter((item) => item.value === role.ase);
            setRole({ ...role, npc: filteredArr[ 0 ]?.npc.value });
        }
    }, [ role.ase ]);

    return (
        <div className="userassign-main-component">
            <SubHeader headerName={'Store Assign List'} />
            <div className="grid crud-demo userassigntable ml-0 mr-0">
                <div className="col-12">
                    <div className="card userassignlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            // loading={isLoading}
                            filters={filters}
                            value={storeData?.Store}
                            showGridlines
                            stripedRows
                            selection={selectedStores}
                            onSelectionChange={(e) => setSelectedStores(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            autoLayout={true}
                            scrollable
                            globalFilter={globalFilter}
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>
                            <Column expander style={{ width: '2%' }} />
                            <Column field="store_code" sortable header="Store Code" body={storeBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
                            <Column
                                field="store_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={storeFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="store_name"
                                header="Store Name"
                                sortable
                                body={nameBodyTemplate}
                                headerStyle={{ width: '15%', minWidth: '10rem' }}
                            ></Column>
                            <Column
                                field="chain"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={chainFilterTemplate}
                                filterClear={chainfilterClearTemplate}
                                filterApply={chainfilterApplyTemplate}
                                filterField="chain"
                                header="Chain"
                                sortable
                                body={chainBodyTemplate}
                                headerStyle={{ width: '15%', minWidth: '8rem' }}
                            ></Column>
                            <Column
                                field="zone"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={zoneFilterTemplate}
                                filterClear={zonefilterClearTemplate}
                                filterApply={zonefilterApplyTemplate}
                                filterField="zone"
                                header="Zone"
                                body={zoneBodyTemplate}
                                sortable
                                headerStyle={{ width: '10%', minWidth: '8rem' }}
                            ></Column>
                            <Column
                                field="state"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={stateFilterTemplate}
                                filterClear={statefilterClearTemplate}
                                filterApply={statefilterApplyTemplate}
                                filterField="state"
                                header="State"
                                body={stateBodyTemplate}
                                sortable
                                headerStyle={{ width: '10%', minWidth: '8rem' }}
                            ></Column>
                            <Column
                                field="city"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={cityFilterTemplate}
                                filterClear={cityfilterClearTemplate}
                                filterApply={cityfilterApplyTemplate}
                                filterField="city"
                                header="City"
                                body={cityBodyTemplate}
                                sortable
                                headerStyle={{ width: '10%', minWidth: '8rem' }}
                            ></Column>
                            {/* <Column field="location" header="Location" body={locationBodyTemplate} sortable headerStyle={{ width: '10%', minWidth: '8rem' }}></Column> */}
                            {/* <Column field="merchandiser" header="Merchandiser Name" body={merchandiserBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
                            <Column field="promoter" header="Promoter Name" body={promoterBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                            <Column field="tl" header="TL Name" body={tlBodyTemplate} headerStyle={{ width: '13%', minWidth: '10rem' }}></Column>
                            <Column field="asm" header="ASM Name" body={asmBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column> */}
                            <Column headerStyle={{ width: '5%', minWidth: '9rem' }} className="action" header="Actions" body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={storeData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={isModalOpen} style={{ width: '80vw' }} header="Store Assign Create" modal className="p-fluid usercreation" footer={storeDialogFooter} onHide={hideDialog}>
                            <h5 className="my-2">Store User Assign</h5>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="firstname" className="required">
                                        Select User
                                    </label>
                                    <Dropdown
                                        placeholder="Select User Type"
                                        required
                                        value={role.userType}
                                        optionLabel="label"
                                        optionValue="value"
                                        options={userTypeList}
                                        onChange={(e) => setRole({ ...role, userType: e.target.value }, setSubmitted(false))}

                                    // className={classNames({ 'p-invalid': submitted && !value.firstName })}
                                    />
                                    {/* {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null} */}
                                </div>
                                {role.userType == '0' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="firstname" className="required">
                                            Name
                                        </label>
                                        <Dropdown
                                            placeholder="Select  Name"
                                            required
                                            optionLabel="label"
                                            optionValue="value"
                                            filter
                                            options={getByUserNameData}
                                            value={role.userName}
                                            onChange={(e) => setRole({ ...role, userName: e.target.value, userNameLabel: e.originalEvent.target.ariaLabel }, setSubmitted(false), dispatch(getZoneLableRequest()))}

                                        // className={classNames({ 'p-invalid': submitted && !value.firstName })}
                                        />
                                        {/* {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null} */}
                                    </div>
                                ) : null}
                                {role.userType == '1' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="firstname" className="required">
                                            User Id
                                        </label>
                                        <Dropdown
                                            placeholder="Select User Id"
                                            required
                                            optionLabel="label"
                                            optionValue="value"
                                            filter
                                            options={userIdData}
                                            value={role.userName}
                                            onChange={(e) => setRole({ ...role, userName: e.target.value }, setSubmitted(false))}

                                        // className={classNames({ 'p-invalid': submitted && !value.firstName })}
                                        />
                                        {/* {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null} */}
                                    </div>
                                ) : null}
                                {userRole ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown">Role</label>
                                        <InputText value={userRole?.role_name} disabled className="uppercase" />
                                    </div>
                                ) : null}
                                {userRole?.role_name == 'asm' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                TA
                                            </label>
                                            <Dropdown
                                                value={role.ta}
                                                filter
                                                required
                                                autoFocus
                                                placeholder="Select TA"
                                                optionLabel="label"
                                                optionValue="value"
                                                options={taList}
                                                onChange={(e) => setRole({ ...role, ta: e.target.value, taLabel: e.originalEvent.target.ariaLabel })}
                                            />
                                        </div>
                                    </>
                                ) : null}

                                {userRole != null ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select Zone
                                            </label>

                                            <Dropdown value={role.zone} placeholder="Select Zone" required options={zoneList} onChange={(e) => { setRole({ ...role, zone: e.value }, dispatch(GetAllStateRequest(e.value))) }} />
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select State
                                            </label>
                                            <Dropdown
                                                value={role.state}
                                                filter
                                                placeholder="Select State"
                                                disabled={role.zone == '' ? true : false}
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                options={stateData}
                                                onChange={(e) => {
                                                    setRole({ ...role, state: e.value, stateLabel: e.originalEvent.target.ariaLabel });
                                                    dispatch(GetAllCityRequest(e.value));
                                                }}
                                            />
                                        </div>

                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                City
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                optionValue="value"
                                                optionLabel="label"
                                                filter
                                                required
                                                placeholder="Select City"
                                                disabled={role.state == '' ? true : false}
                                                options={cityData}
                                                value={role.city}
                                                onChange={(e) => {
                                                    setRole({ ...role, city: e.target.value, cityLabel: e.originalEvent.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && !role.city })}
                                            />
                                            {submitted && !role.city && <small className="p-invalid error">City is required.</small>}
                                            {/* {errors ? <small className="p-invalid error">{errors.city}</small> : null} */}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="location" className="required">
                                                Select Store Name
                                            </label>
                                            <MultiSelect
                                                value={role.store_code}
                                                disabled={role.city == '' ? true : false}
                                                filter
                                                showClear
                                                onChange={(e) => setRole({ ...role, store_code: e.value })}
                                                options={storeList}
                                                optionLabel="label"
                                                maxSelectedLabels={3}
                                                placeholder="Select Store Name"
                                                className="addstoreselect"
                                            />
                                        </div>
                                    </>
                                ) : null}
                                {role.merchandiser != '' || userRole?.role_name == 'promoter' || userRole?.role_name == 'merchandiser' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Select Team Leader
                                        </label>
                                        <Dropdown
                                            value={role.teamLeader}
                                            filter
                                            placeholder="Select TL"
                                            required
                                            options={teamLeaderList}
                                            onChange={(e) => setRole({ ...role, teamLeader: e.target.value, teamLeaderLabel: e.originalEvent.target.ariaLabel })}
                                        />
                                    </div>
                                ) : null}
                                {role.promoter || role.promoter || role.merchandiser ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Team Leader
                                            </label>
                                            <Dropdown
                                                value={role.teamLeader}
                                                filter
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select TL"
                                                required
                                                options={teamLeaderList}
                                                onChange={(e) => setRole({ ...role, teamLeader: e.target.value, teamLeaderLabel: e.originalEvent.target.ariaLabel })}
                                            />
                                        </div>
                                    </>
                                ) : null}
                                {userRole?.role_name == 'promoter' || userRole?.role_name == 'merchandiser' || userRole?.role_name == 'tl' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                ASM
                                            </label>
                                            <Dropdown value={role.asm} filter required placeholder="Select ASM" options={asmList} onChange={(e) => setRole({ ...role, asm: e.target.value, asmLabel: e.originalEvent.target.ariaLabel })} />
                                        </div>
                                    </>
                                ) : null}
                                {role.promoter || role.merchandiser || role.teamLeader || role.asm ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                TA
                                            </label>
                                            <Dropdown
                                                value={role.ta}
                                                filter
                                                required
                                                placeholder="Select TA"
                                                optionLabel="label"
                                                optionValue="value"
                                                options={taList}
                                                onChange={(e) => setRole({ ...role, ta: e.target.value, taLabel: e.originalEvent?.target.ariaLabel })}
                                            />
                                        </div>
                                    </>
                                ) : null}
                                {role.promoter || role.asm || role.ta ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                NPM
                                            </label>
                                            <Dropdown
                                                value={role.npm}
                                                placeholder="Select NPM"
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                options={npmList}
                                                onChange={(e) => setRole({ ...role, npm: e.value, npmLabel: e.originalEvent?.target.ariaLabel })}
                                            />
                                        </div>
                                    </>
                                ) : null}
                            </div>

                            <h5 className="my-2">Store Client Assign</h5>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Role
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder=" Select Role"
                                        options={roleOptions}
                                        value={role.client_role_id}
                                        onChange={(e) => {
                                            setRole({ ...role, client_role_id: e.value, client_role_label: e.originalEvent.target.ariaLabel });
                                            dispatch(getAllAseListRequest());
                                            dispatch(getAllNpcListRequest());
                                            dispatch(getAllSeListRequest());
                                        }}
                                        className={classNames({ 'p-invalid': submitted && role.client_role_id == '' })}
                                    />

                                    {/* {submitted && errors?.role_id ? <small className="p-invalid error">{errors?.role_id}</small> : null} */}
                                </div>
                                {role.client_role_id == '11' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select SE
                                            </label>

                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select SE"
                                                options={seList}
                                                value={role.client_se}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_se: e.value, client_se_label: e.originalEvent?.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_se == '' })}
                                            />

                                            {/* {submitted && errors?.se ? <small className="p-invalid error">{errors?.se}</small> : null} */}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select ASM
                                            </label>

                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select ASM"
                                                options={aseList}
                                                value={role.client_asm}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_asm: e.value, client_asm_label: e.originalEvent?.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_asm == '' })}
                                            />

                                            {/* {submitted && errors?.ase ? <small className="p-invalid error">{errors?.ase}</small> : null} */}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={role.client_npc}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_npc: e.value, client_npc_label: e.originalEvent?.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_npc == '' })}
                                            />

                                            {/* {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null} */}
                                        </div>
                                    </>
                                ) : null}
                                {role.client_role_id == '10' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select ASM
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select ASM"
                                                options={aseList}
                                                value={role.client_asm}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_asm: e.value, client_asm_label: e.originalEvent?.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_asm == '' })}
                                            />

                                            {/* {submitted && errors?.ase ? <small className="p-invalid error">{errors?.ase}</small> : null} */}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={role.client_npc}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_npc: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_npc == '' })}
                                            />

                                            {/* {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null} */}
                                        </div>
                                    </>
                                ) : null}
                                {role.client_role_id == '9' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={role.client_npc}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_npc: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_npc == '' })}
                                            />

                                            {/* {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null} */}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </Dialog>
                        <Dialog visible={isEditDialogOpen} style={{ width: '80vw' }} header="Store Assign Edit" modal className="p-fluid usercreation" footer={storeEditDialogFooter} onHide={hideEditDialog}>
                            <h5 className="my-2">Store User Assign Edit</h5>
                            <div className="grid p-fluid mt-1">
                                {role.promoter != '' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Promoter
                                        </label>
                                        <Dropdown
                                            value={role.promoter}
                                            filter
                                            disabled
                                            placeholder="Select Promoter"
                                            required
                                            options={promoterList}
                                            onChange={(e) => setRole({ ...role, promoter: e.target.value, promoterLabel: e.originalEvent.target.ariaLabel })}
                                        />
                                    </div>
                                ) : null}

                                {role.merchandiser != '' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Merchandiser
                                        </label>
                                        <Dropdown
                                            value={role.merchandiser}
                                            filter
                                            disabled
                                            placeholder="Select Merchandiser"
                                            required
                                            options={merchandiserList}
                                            onChange={(e) => setRole({ ...role, merchandiser: e.target.value, merchandiserLabel: e.originalEvent.target.ariaLabel })}
                                        />
                                    </div>
                                ) : null}
                                {role.teamLeader != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Select Team Leader
                                        </label>
                                        <Dropdown value={role.teamLeader} filter placeholder="Select TL" required options={teamLeaderList} onChange={(e) => setRole({ ...role, teamLeader: e.target.value, teamLeaderLabel: e.originalEvent.target.ariaLabel })} />
                                    </div>
                                ) : null}
                                {role.asm != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            ASM
                                        </label>
                                        <Dropdown value={role.asm} filter required placeholder="Select ASM" options={asmList} onChange={(e) => setRole({ ...role, asm: e.target.value, asmLabel: e.originalEvent.target.ariaLabel })} />
                                    </div>
                                ) : null}
                                <>
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Select Zone
                                        </label>
                                        <Dropdown value={role.zone} filter placeholder="Select Zone" required options={zoneList} onChange={(e) => setRole({ ...role, zone: e.target.value })} />
                                    </div>
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Select State
                                        </label>
                                        <Dropdown
                                            value={role.state}
                                            filter
                                            placeholder="Select State"
                                            disabled={role.zone == '' ? true : false}
                                            required
                                            optionLabel="label"
                                            optionValue="value"
                                            options={stateData}
                                            onChange={(e) => {
                                                setRole({ ...role, state: e.target.value, stateLabel: e.originalEvent.target.ariaLabel });
                                                dispatch(GetAllCityRequest(e.value));
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            City
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            optionValue="value"
                                            optionLabel="label"
                                            filter
                                            required
                                            placeholder="Select City"
                                            disabled={role.state == '' ? true : false}
                                            options={cityData}
                                            value={role.city}
                                            onChange={(e) => {
                                                setRole({ ...role, city: e.target.value, cityLabel: e.originalEvent.target.ariaLabel });
                                            }}
                                            className={classNames({ 'p-invalid': submitted && !role.city })}
                                        />
                                        {submitted && !role.city && <small className="p-invalid error">City is required.</small>}
                                        {/* {errors ? <small className="p-invalid error">{errors.city}</small> : null} */}
                                    </div>
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="location" className="required">
                                            Select Store Name
                                        </label>
                                        <MultiSelect
                                            value={role?.store_code}
                                            disabled={role?.city == '' ? true : false}
                                            filter
                                            showClear
                                            display="chip"
                                            onChange={(e) => setRole({ ...role, store_code: e.value })}
                                            options={storeList}
                                            optionLabel="label"
                                            valueLabel="value"
                                            maxSelectedLabels={3}
                                            placeholder="Select Store Name"
                                            className="addstoreselect"
                                        />
                                    </div>
                                </>
                                <>
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Team Leader
                                        </label>
                                        <Dropdown
                                            value={role.tl}
                                            filter
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Select TL"
                                            required
                                            options={teamLeaderList}
                                            onChange={(e) => setRole({ ...role, tl: e.target.value, teamLeaderLabel: e.originalEvent.target.ariaLabel })}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            ASM
                                        </label>
                                        <Dropdown value={role.asm} filter required placeholder="Select ASM" options={asmList} onChange={(e) => setRole({ ...role, asm: e.target.value, asmLabel: e.originalEvent.target.ariaLabel })} />
                                    </div>

                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            TA
                                        </label>
                                        <Dropdown value={role.ta} filter required placeholder="Select TA" optionLabel="label" optionValue="value" options={taList} onChange={(e) => setRole({ ...role, ta: e.target.value })} />
                                    </div>

                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            NPM
                                        </label>
                                        <Dropdown value={role.npm} filter placeholder="Select NPM" optionLabel="label" optionValue="value" options={npmList} onChange={(e) => setRole({ ...role, npm: e.value })} />
                                    </div>
                                </>
                            </div>

                            <h5 className="my-2">Store Client Assign Edit</h5>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Role
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder=" Select Role"
                                        options={roleOptions}
                                        value={role.client_role_id}
                                        onChange={(e) => {
                                            setRole({ ...role, client_role_id: e.value, client_role_label: e.originalEvent.target.ariaLabel });
                                            dispatch(getAllAseListRequest());
                                            dispatch(getAllNpcListRequest());
                                            dispatch(getAllSeListRequest());
                                        }}
                                        className={classNames({ 'p-invalid': submitted && role.client_role_id == '' })}
                                    />

                                    {/* {submitted && errors?.client_role_id ? <small className="p-invalid error">{errors?.role_id}</small> : null} */}
                                </div>
                                {role.client_role_id === '11' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select SE
                                            </label>

                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select SE"
                                                options={seList}
                                                value={role.client_se}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_se: e.value, client_se_label: e.originalEvent.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_se == '' })}
                                            />

                                            {/* {submitted && errors?.se ? <small className="p-invalid error">{errors?.se}</small> : null} */}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select ASM
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select ASM"
                                                options={aseList}
                                                value={role.client_asm}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_asm: e.value, client_asm_label: e.originalEvent.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_ase == '' })}
                                            />

                                            {/* {submitted && errors?.ase ? <small className="p-invalid error">{errors?.ase}</small> : null} */}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={role.client_npc}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_npc: e.value, client_npc_label: e.originalEvent.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_npc == '' })}
                                            />

                                            {/* {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null} */}
                                        </div>
                                    </>
                                ) : null}
                                {role.client_role_id == '10' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select ASM
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select ASM"
                                                options={aseList}
                                                value={role.client_asm}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_asm: e.value, client_asm_label: e.originalEvent.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_asm == '' })}
                                            />

                                            {/* {submitted && errors?.ase ? <small className="p-invalid error">{errors?.ase}</small> : null} */}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={role.client_npc}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_npc: e.value, client_npc_label: e.originalEvent.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_npc == '' })}
                                            />

                                            {/* {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null} */}
                                        </div>
                                    </>
                                ) : null}
                                {role.client_role_id == '9' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={role.client_npc}
                                                onChange={(e) => {
                                                    setRole({ ...role, client_npc: e.value, client_se_label: e.originalEvent.target.ariaLabel });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && role.client_npc == '' })}
                                            />

                                            {/* {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null} */}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </Dialog>
                        <Dialog visible={isViewDialogOpen} style={{ width: '80vw' }} header="Store Assign Details" modal className="p-fluid usercreation viewmodel" footer={viewDialogFooter} onHide={hideViewDialog}>
                            <h5 className="my-2">Store User Assign Details</h5>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="store_code">Store Code</label>
                                    <InputText id="store_code" type="text" readOnly required value={role.store_code} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="chain">Chain</label>
                                    <InputText id="chain" type="text" readOnly required value={role.chain} />
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="storename">Store Name</label>
                                    <InputText id="storename" type="text" readOnly required value={role.store_name} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="location">Location</label>
                                    <InputText id="location" readOnly required type="text" value={role.location} />
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="zone">Zone</label>
                                    <InputText id="zone" readOnly required type="text" value={role.zone} />
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="state">State</label>
                                    <InputText id="state" readOnly required type="text" value={role.state} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="city">City</label>
                                    <InputText id="city" readOnly required type="text" value={role.city} />
                                </div>
                                {role.merchandiser != '' && role.merchandiser != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="location">Merchandiser Name</label>
                                        <InputText id="location" readOnly required type="text" value={role.merchandiser} />
                                    </div>
                                ) : null}
                                {role.promoter != '' && role.promoter != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="zone">Promoter Name</label>
                                        <InputText id="zone" readOnly required type="text" value={role.promoter} />
                                    </div>
                                ) : null}

                                {role.tl != '' && role.tl != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="state">TL Name</label>
                                        <InputText id="state" readOnly required type="text" value={role.tl} />
                                    </div>
                                ) : null}
                                {role.asm != '' && role.asm != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="city">ASM Name</label>
                                        <InputText id="city" readOnly required type="text" value={role.asm} />
                                    </div>
                                ) : null}
                            </div>
                            <h5 className="my-2">Store Client Assign Details</h5>
                        </Dialog>
                        <DeleteModal isOpenDialog={deleteUserDialog} modalFooter={deleteStoreDialogFooter} hideModal={hideDeleteStoreDialog} modalDescription={'Are you sure you want to delete the selected User Assign?'} />
                        <DeleteModal isOpenDialog={deleteStoresDialog} modalFooter={deleteStoresDialogFooter} hideModal={hideDeleteStoreDialog} modalDescription={'Are you sure you want to delete the selected User Assign?'} />
                        <ImportModal modalopen={modalExcel} hideModal={hideExcelDialog} readExcel={readExcel} sampleExcel={chain_sample_excel} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAssignlist;
