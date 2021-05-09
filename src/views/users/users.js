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
  CToastBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { getUsersAPI,addUserAPI,updateUserPasswordAPI,deleteUserAPI,getUserRolesAPI } from '../../API'; 
import styles from './styles.css'

const fields = ['name','actions']
var toasterText = "";

const Users = () => {
    /* -------------------------------  States  -------------------------------*/
    const [usersData, setUsersData] = useState()
    const [newUsername, setnewUsername] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [currentModifiedUser, setCurrentModifiedUser] = useState("")
    const [currentModifiedUserRoles, setCurrentModifiedUserRoles] = useState("")


    /* Modals States */
    const [primary, setPrimary] = useState(false)
    const [danger, setDanger] = useState(false)
    const [warning, setWarning] = useState(false)
    const [info, setInfo] = useState(false)


    /* Toaster states */
    const [position, ] = useState('top-center')
    const [autohide, ] = useState(true)
    const [autohideValue, ] = useState(2000)
    const [closeButton, ] = useState(true)
    const [fade, ] = useState(true)
    const [toasts, setToasts] = useState([])


    /* -------------------------------  Functions  -------------------------------*/
    let users = async () => {
        const res = await getUsersAPI();
        setUsersData(res)
    }

    let newUser = async () => {
        setPrimary(!primary)
        const res = await addUserAPI(newUsername,newPassword);
        addToast(res)
    }

    let updateUser = async () => {
        setWarning(!warning)
        const res = await updateUserPasswordAPI(currentModifiedUser,newPassword);
        addToast(res)
    }

    let deleteUser = async () => {
        setDanger(!danger)
        const res = await deleteUserAPI(currentModifiedUser);
        addToast(res)
    }

    let getUserRoles = async (username) => {
        const res = await getUserRolesAPI(username);
        setCurrentModifiedUserRoles(JSON.stringify(res))
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
            users()
        }
        setToasts([
          ...toasts, 
          { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
      }

    /* -------------------------------  LifeCycles  -------------------------------*/
    React.useEffect(() => {
        users()   
      },[]);    
    return (
        <div > 

            <CCard>        
                <CCardBody>
                    <CButton className="btn-primary" color="primary" onClick={() => setPrimary(!primary)}>New User</CButton>
                    <CModal 
                        show={primary} 
                        onClose={() => setPrimary(!primary)}
                        color="primary"
                        >
                        <CModalHeader>
                            <CModalTitle>New User</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CCardBody>
                                <CForm className="form-horizontal">
                                    <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="input1-group1">Username</CLabel>
                                    </CCol> 
                                    <CCol xs="12" md="9">
                                        <CInput type="input1-group1" id="input1-group1_1" name="input1-group1" value={newUsername} onInput={e => setnewUsername(e.target.value)} placeholder="Enter Username..."/>
                                        <CFormText className="help-block">Please enter your username</CFormText>
                                    </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="hf-password">Password</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="password" id="hf-password1" name="hf-password" value={newPassword} onInput={e => setnewPassword(e.target.value)} placeholder="Enter Password..." autoComplete="current-password"/>
                                        <CFormText className="help-block">Please enter your password</CFormText>
                                    </CCol>
                                    </CFormGroup>
                                    <CModalFooter>
                                        <CButton color="primary" onClick={() => newUser()}>
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
                        show={info} 
                        onClose={() => setInfo(!info)}
                        color="info"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Roles: {currentModifiedUserRoles}
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="info" onClick={() => setInfo(!info)}>Close</CButton>{' '}
                        </CModalFooter>
                    </CModal>
                    <CModal 
                        show={warning} 
                        onClose={() => setWarning(!warning)}
                        color="warning"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Edit User</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CCardBody>
                                <CForm className="form-horizontal">
                                    <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="input1-group1">Username</CLabel>
                                    </CCol> 
                                    <CCol xs="12" md="9">
                                        <CInput type="input1-group1" id="input1-group1_2" name="input1-group1" value={currentModifiedUser} placeholder="Enter Username..." readOnly/>
                                    </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="hf-password">New Password</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="password" id="hf-password2" name="hf-password" value={newPassword} onInput={e => setnewPassword(e.target.value)} placeholder="Enter Password..." autoComplete="current-password"/>
                                        <CFormText className="help-block">Please enter your password</CFormText>
                                    </CCol>
                                    </CFormGroup>
                                </CForm>
                            </CCardBody>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="warning" onClick={() => updateUser()}>Update</CButton>{' '}
                            <CButton color="secondary" onClick={() => setWarning(!warning)}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>
                    <CModal 
                        show={danger} 
                        onClose={() => setDanger(!danger)}
                        color="danger"
                        size="sm"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Delete User</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Delete User <b>{currentModifiedUser}</b> ?
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="danger" onClick={() => deleteUser()}>Yes</CButton>{' '}
                            <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>
                    <CDataTable
                    items={usersData}
                    fields={fields}
                    hover
                    striped
                    bordered
                    size="sm"
                    itemsPerPage={10}
                    pagination
                    scopedSlots = {{
                        'actions':
                          (user)=>(
                            <td>    
                                <CButton onClick={() => { setInfo(!info); setCurrentModifiedUser(user.name); getUserRoles(user.name)}}>
                                    <CIcon
                                        name="cil-info" 
                                    />
                                </CButton>                                                                                           
                                <CButton onClick={() => { setWarning(!warning); setCurrentModifiedUser(user.name);}}>
                                    <CIcon
                                        name="cil-pencil" 
                                    />
                                </CButton>
                                <CButton onClick={() => { setDanger(!danger); setCurrentModifiedUser(user.name);}}>
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
                    toasters[toasterKey].map((toast)=>{
                    return(
                        <CToast
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

export default Users
