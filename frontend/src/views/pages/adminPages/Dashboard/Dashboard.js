import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../../../../App.scss';
import '../../../../assets/scss/style.scss';
import components from '../../primeReactComponentsIndex';
import { handleResetState } from '../../../../redux/slice/AdminSlice/authSlice';
import { GetAdminDashboardRequest, getProjectWiseDetailsRequest } from '../../../../redux/slice/AdminSlice/dashboardSlice';

const Dashboard = () => {
  const { React, useState, useEffect, useRef, useDispatch, useSelector, Toast, Button } = components;
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [ projectName, setProjectName ] = useState('IDONNEOUS');
  const { successMessage } = useSelector((store) => store.auth);
  const { dashboardData, promoterData } = useSelector((store) => store.dashboard);
  const handleGetPromoterDetails = (e) => {
    const id = e.id;
    setProjectName(e.project_name);
    dispatch(getProjectWiseDetailsRequest(id));
  };
  const handleRefresh = () => {
    setProjectName('IDONNEOUS');
    dispatch(GetAdminDashboardRequest());
  };
  useEffect(() => {
    dispatch(GetAdminDashboardRequest());
  }, [ dispatch ]);
  useEffect(() => {
    if (successMessage) {
      toast.current.show({ severity: 'success', summary: 'Successful', detail: successMessage, life: 2000 });
      dispatch(handleResetState());
    }
  }, [ successMessage ]);
  return (
    <>
      <div className="dashboard-main-component">
        <Toast ref={toast} />
        <div className="col-12 mb-2">
          <div className="card ">
            <div className="flex flex-column">
              <div className="flex flex-row justify-content-between">
                <h5 className="pt-1 title">{projectName}</h5>
                <Button
                  icon="pi pi-refresh"
                  tooltip="Refresh"
                  tooltipOptions={{ position: 'bottom' }}
                  disabled={projectName == 'IDONNEOUS' ? true : false}
                  className="p-button-rounded p-button-outlined mr-2 mb-2"
                  onClick={() => handleRefresh()}
                />
              </div>
              <div className="border-1 surface-border border-round m-1 text-center py-1">
                <div className="p-1">
                  <div className="flex p-1">
                    <div className="card w-3 my-1 mx-2 p-3 attendence-box flex flex-row justify-content-center align-items-center" style={{ backgroundColor: '#86BC05', color: 'white' }}>
                      <i className="pi pi-sign-in text-2xl mr-2"></i>
                      <div className="flex flex-column ml-2">
                        <div className="text-center text-2xl">{promoterData?.check_in ? promoterData?.check_in : null}</div>
                        <div className="text-center text-lg">Check In</div>
                      </div>
                    </div>
                    <div className="card w-3 my-1 mx-2  p-3 attendence-box flex flex-row justify-content-center align-items-center" style={{ backgroundColor: '#E20404', color: 'white' }}>
                      <i className="pi pi-sign-out text-2xl mr-2"></i>
                      <div className="flex flex-column ml-2">
                        <div className="text-center text-2xl">{promoterData?.check_out ? promoterData?.check_out : null}</div>
                        <div className="text-center text-lg">Check Out</div>
                      </div>
                    </div>
                    <div className="card w-3 my-1 mx-2 p-3 attendence-box flex flex-row justify-content-center align-items-center" style={{ backgroundColor: '#2F4F4F', color: 'white' }}>
                      <i className="pi pi-user-minus text-2xl mr-2"></i>
                      <div className="flex flex-column ml-2 ">
                        <div className="text-center text-2xl">{promoterData?.leaves ? promoterData?.leaves : 0}</div>
                        <div className="text-center text-lg">Leave</div>
                      </div>
                    </div>
                    <div className="card w-3 my-1 mx-2 p-3 attendence-box flex flex-row justify-content-center align-items-center" style={{ backgroundColor: '#00688B', color: 'white' }}>
                      <i className="pi pi-exclamation-circle text-2xl mr-2"></i>
                      <div className="flex flex-column ml-2">
                        <div className="text-center text-2xl">{promoterData?.week_off ? promoterData?.week_off : 0}</div>
                        <div className="text-center text-lg">Week Off</div>
                      </div>
                    </div>
                    <div className="card w-3 my-1 mx-2  p-3 attendence-box flex flex-row justify-content-center align-items-center" style={{ backgroundColor: '#104E8B', color: 'white' }}>
                      <i className="pi pi-times-circle text-2xl mr-2"></i>
                      <div className="flex flex-column ml-2">
                        <div className="text-center text-2xl">{promoterData?.inactiveuser ? promoterData?.inactiveuser : 0}</div>
                        <div className="text-center text-lg">Inactive</div>
                      </div>
                    </div>
                    <div className="card w-3 my-1 mx-2  p-3 attendence-box flex flex-row justify-content-center align-items-center" style={{ backgroundColor: '#888888', color: 'white' }}>
                      <i className="pi pi-users text-2xl mr-2"></i>
                      <div className="flex flex-column ml-2">
                        <div className="text-center text-2xl">{promoterData?.totalUser ? promoterData?.totalUser : 0}</div>
                        <div className="text-center text-lg">Total </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 ">
          <div className="dashboards-cards-grid cursor-pointer mt-2">
            {dashboardData?.map((e) => {
              return (
                <div
                  key={e.id}
                  className="card sale-store-card "
                  style={{
                    backgroundColor: projectName == e.project_name ? 'rgb(186 235 182)' : ''
                  }}
                  onClick={() => handleGetPromoterDetails(e)}
                >
                  <div className="flex flex-row">
                    <div className="dashboard-card-img card col-3">
                      <img src={e.image} className="dashboard-imgs" />
                    </div>
                    <div className="flex col-9 justify-content-between">
                      <span className="font-bold mr-10" style={{ fontSize: '15px' }}>
                        {e.project_name}
                      </span>
                      <div className="flex flex-row">
                        <i className="pi pi-building stores-details-dashboard-icon" style={{ fontSize: '25px', color: '#1565C0' }} />
                        <div className="flex flex-column">
                          <span className="pb-1 text-center font-normal">Stores</span>
                          <span className="text-center font-medium" style={{ fontSize: '18px' }}>
                            {e.storeCountNumber === null ? '-' : e.storeCountNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-0" style={{ borderTop: '1px solid #d0c0c0' }} />
                  <div className="flex">
                    <div className="col-6" style={{ borderRight: '1px solid #d0c0c0' }}>
                      <div className="flex justify-content-center">
                        <span className="font-bold " style={{ fontSize: '15px' }}>
                          Amount
                        </span>
                      </div>
                      <div className="col-12">
                        <div className="flex justify-content-between">
                          <div className="flex flex-column ">
                            <span>Target</span>
                            <span className="text-left font-medium text-1xl mt-1">{e.amount_target === null ? '-' : e.amount_target}</span>
                          </div>
                          <div className="flex flex-column ">
                            <span>Achieved</span>
                            <span className="text-left font-medium text-1xl mt-1">{e.amount_achieved === null ? '-' : e.amount_achieved}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="flex justify-content-center">
                        <span className="font-bold " style={{ fontSize: '15px' }}>
                          Pieces
                        </span>
                      </div>
                      <div className="col-12">
                        <div className="flex justify-content-between">
                          <div className="flex flex-column ">
                            <span>Target</span>
                            <span className="text-left font-medium text-1xl mt-1">{e.pieces_target === null ? '-' : e.pieces_target}</span>
                          </div>
                          <div className="flex flex-column ">
                            <span>Achieved</span>
                            <span className="text-left font-medium text-1xl mt-1 ">{e.pieces_achieved === null ? '-' : e.pieces_achieved}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
