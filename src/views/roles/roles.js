import React , { useState } from 'react'
import {
  CCardBody,
  CDataTable,
  CCard,
  CModalTitle,
  CModalFooter,
  CModalHeader,
  CButton,
  CModal,
  CModalBody,
  CForm,
  CFormGroup,
  CCol,
  CLabel,
  CInput,
  CFormText,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { saveAs } from 'file-saver';
import { getUsersAPI_2,getRolesAPI,getRoleAPI,addRoleAPI,deleteRoleAPI,getRolePermissionAPI,assignRoleAPI,unassignRoleAPI,submitRolePermissionAPI } from '../../API'; 
import styles from './styles.css'

const fields = ['name','actions']
var toasterText = "";

const Roles = () => {
    /* -------------------------------  States  -------------------------------*/
    const [rolesData, setRolesData] = useState()
    const [usersDataHTML, setUsersDataHTML] = useState([])
    const [newRolename, setnewRolename] = useState("")
    const [currentModifiedRole, setCurrentModifiedRole] = useState("")
    const [newRolePermissionJSON, setnewRolePermissionJSON] = useState("")
    const [currentModifiedRoleUsers, setCurrentModifiedRoleUsers] = useState([])
    const [currentModifiedRoleUsersHTML, setCurrentModifiedRoleUsersHTML] = useState([])


    /* Modals States */
    const [primary, setPrimary] = useState(false)
    const [danger, setDanger] = useState(false)
    const [warning, setWarning] = useState(false)


    /* Toaster states */
    const [position, ] = useState('top-center')
    const [autohide, ] = useState(true)
    const [autohideValue, ] = useState(2000)
    const [closeButton, ] = useState(true)
    const [fade, ] = useState(true)
    const [toasts, setToasts] = useState([])


    /* -------------------------------  Functions  -------------------------------*/
    let users = async () => {
        const res = await getUsersAPI_2();    
        for (const key in res) {
            const user = res[key]
            setUsersDataHTML(usersDataHTML => [...usersDataHTML, <CDropdownItem key={user} >{user}</CDropdownItem>]);
        }
    }
    

    let roles = async () => {
        const res = await getRolesAPI();
        setRolesData(res)
    }

    let newRole = async () => {
        setPrimary(!primary)
        const res = await addRoleAPI(newRolename);
        addToast(res)
    }

    let updateRolePermissions = async () => {
        setWarning(!warning)
        const res = await submitRolePermissionAPI(currentModifiedRole,newRolePermissionJSON);
        addToast(res)    
    }

    let deleteRole = async () => {
        setDanger(!danger)
        const res = await deleteRoleAPI(currentModifiedRole);
        addToast(res)
    }

    let downloadPermission = async () => {
        const res = await getRolePermissionAPI(currentModifiedRole);
        // Create a blob of the data
        var fileName = 'perm.json';
        var fileToSave = new Blob([JSON.stringify(res)], {
            type: 'application/json',
            name: fileName
        });
        saveAs(fileToSave, fileName);
    }

    let getRole = async (role) => {
        const res = await getRoleAPI(role);
        setCurrentModifiedRoleUsers(res.users.toString())
        setCurrentModifiedRoleUsersHTML([])
        for (const key in res.users) {
            const user = res.users[key]
            setCurrentModifiedRoleUsersHTML(currentModifiedRoleUsersHTML => [...currentModifiedRoleUsersHTML, <CDropdownItem key={user}>{user}</CDropdownItem>]);
        }
        
    }

    let assignRole = async (user) => {
        const res = await assignRoleAPI(currentModifiedRole,user);
        addToast(res)
        if(res.error == null){
            if(currentModifiedRoleUsers === "")
                setCurrentModifiedRoleUsers(user);

            else
                setCurrentModifiedRoleUsers(currentModifiedRoleUsers + ',' + user);
            setCurrentModifiedRoleUsersHTML(currentModifiedRoleUsersHTML => [...currentModifiedRoleUsersHTML, <CDropdownItem key={user}>{user}</CDropdownItem>]);
        }
    }

    let unassignRole = async (user) => {
        const res = await unassignRoleAPI(currentModifiedRole,user);
        addToast(res)
        getRole(currentModifiedRole)

    }

    /* Toaster Functions */
      const toasters = (()=>{
        return toasts.reduce((toasters, toast) => {
          toasters[toast.position] = toasters[toast.position] || []
          toasters[toast.position].push(toast)
          return toasters
        }, {})
      })()
      const addToast = (text) => {
        if(text.error){
            toasterText = text.error
        }
        else{
            toasterText = text
            roles()
        }
        setToasts([
          ...toasts, 
          { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
      }

    /* -------------------------------  LifeCycles  -------------------------------*/
    React.useEffect(() => {
        roles()
        users()  
      },[]);    
    return (
        <div > 
            <CCard>        
                <CCardBody>
                    <CButton className='btn-primary' color="primary" onClick={() => setPrimary(!primary)}>New Role</CButton>
                    <CModal 
                        show={primary} 
                        onClose={() => setPrimary(!primary)}
                        color="primary"
                        >
                        <CModalHeader>
                            <CModalTitle>New Role</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CCardBody>
                                <CForm className="form-horizontal">
                                    <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="input1-group1">Role Name</CLabel>
                                    </CCol> 
                                    <CCol xs="12" md="9">
                                        <CInput type="input1-group1" id="input1-group1" name="input1-group1" value={newRolename} onInput={e => setnewRolename(e.target.value)} placeholder="Enter Role Name..."/>
                                        <CFormText className="help-block">Please enter your Role Name</CFormText>
                                    </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                    </CFormGroup>
                                    <CModalFooter>
                                        <CButton color="primary" onClick={() => newRole()}>
                                        Submit
                                        </CButton>{' '}
                                        <CButton color="secondary" onClick={() => setPrimary(!primary)}>
                                        Cancel
                                        </CButton>
                                    </CModalFooter>
                                </CForm>
                            </CCardBody>
                        </CModalBody>
                    </CModal>
                    <CModal 
                        show={warning} 
                        onClose={() => {setWarning(!warning); setCurrentModifiedRoleUsersHTML([]);}}
                        color="warning"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Edit Role</CModalTitle>
                        </CModalHeader>
                        <CModalBody>                           
                            <CCardBody>
                                <CForm className="form-horizontal">
                                    <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="input1-group1">Users</CLabel>
                                    </CCol> 
                                    <CCol xs="12" md="9">
                                        <div>
                                            {currentModifiedRoleUsers}{' '}
                                            <CDropdown className="m-1 btn-group">
                                                <CDropdownToggle color="success">
                                                    <CIcon name="cil-user-follow"/> 
                                                </CDropdownToggle>
                                                <CDropdownMenu onClick={(e) => assignRole(e.target.outerText)}>
                                                    {usersDataHTML}
                                                </CDropdownMenu>
                                            </CDropdown>
                                            <CDropdown  className="m-1 btn-group">
                                                <CDropdownToggle color="danger">
                                                    <CIcon name="cil-user-unfollow"/> 
                                                </CDropdownToggle>
                                                <CDropdownMenu onClick={(e) => unassignRole(e.target.outerText)}>
                                                    {currentModifiedRoleUsersHTML}
                                                </CDropdownMenu>
                                            </CDropdown>
                                        </div>
                                    </CCol>
                                    </CFormGroup>
                                </CForm>
                                <CForm className="form-horizontal">
                                    <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="input1-group1">Role Name</CLabel>
                                    </CCol> 
                                    <CCol xs="12" md="9">
                                        <CInput type="input1-group1" id="input1-group1" name="input1-group1" value={currentModifiedRole} placeholder="Enter Role Name..." readOnly/>
                                    </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                    </CFormGroup>
                                </CForm>
                                <CCol xs="12" md="9">
                                    <CFormText className="help-block">Enter New Permissions (IN JSON FORMAT) </CFormText>
                                    <textarea id="permission" name="permission" placeholder="Enter JSON Text here" onChange={e => setnewRolePermissionJSON(e.target.value)} rows="4" cols="50">                           
                                    </textarea>
                                </CCol>
                            </CCardBody>
                        </CModalBody>
                        <CModalFooter>
                                <CButton color="primary" onClick={() => downloadPermission()}><CIcon name="cil-cloud-download"/> Download Permissions</CButton>  
                        </CModalFooter>
                        <CModalFooter>
                            <CButton color="warning" onClick={() => {updateRolePermissions(); setCurrentModifiedRoleUsersHTML([]);}}>Update Permissions</CButton>{' '}
                            <CButton color="secondary" onClick={() => {setWarning(!warning); setCurrentModifiedRoleUsersHTML([]);}}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>
                    <CModal 
                        show={danger} 
                        onClose={() => setDanger(!danger)}
                        color="danger"
                        size="sm"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Delete Role</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Delete Role <b>{currentModifiedRole}</b> ?
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="danger" onClick={() => deleteRole()}>Yes</CButton>{' '}
                            <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>
                    <CDataTable
                    items={rolesData}
                    fields={fields}
                    hover
                    striped
                    bordered
                    size="sm"
                    itemsPerPage={10}
                    pagination
                    scopedSlots = {{
                        'actions':
                          (role)=>(
                            <td>                                                               
                                <CButton onClick={() => {setWarning(!warning); setCurrentModifiedRole(role.name); getRole(role.name);}}>
                                    <CIcon
                                        name="cil-pencil" 
                                    />
                                </CButton>
                                <CButton onClick={() => { setDanger(!danger); setCurrentModifiedRole(role.name);}}>
                                    <CIcon
                                        name="cil-delete" 
                                    />
                                </CButton>
                            </td>
                          )
                      }}
                    />
                </CCardBody>
            </CCard>
            <CCol sm="12" lg="6">
                {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                    position={toasterKey}
                    key={'toaster' + toasterKey}
                >
                    {
                    toasters[toasterKey].map((toast,key)=>{
                    return(
                        <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={toast.autohide}
                        fade={toast.fade}
                        >
                        <CToastHeader closeButton={toast.closeButton}>
                            Message
                        </CToastHeader>
                        <CToastBody>
                            {toasterText}
                        </CToastBody>
                        </CToast>
                    )
                    })
                    }
                </CToaster>
                ))}
            </CCol>
        </div>
    )
}

export default Roles
