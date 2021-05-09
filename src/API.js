import axios from 'axios';

/* -------------------------------  USER APIs  -------------------------------*/

export const getUsersAPI = async () => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.get(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authentication/db/MyBasicMetadataAuthenticator/users/`,
            { headers }
        )
        .then(res => {
            let ModifiedResponse = []
            for (var key in res.data){
                ModifiedResponse.push({ name: res.data[key] });
            }
            resolve(ModifiedResponse)
         })
        .catch(error => {
            resolve(error.response.data.error)
         })
    })  
};

export const getUsersAPI_2 = async () => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.get(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authentication/db/MyBasicMetadataAuthenticator/users/`,
            { headers }
        )
        .then(res => {
            resolve(res.data)
         })
        .catch(error => {
            resolve(error.response.data.error)
         })
    })  
};

export const addUserAPI = async (username,password) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.post(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authentication/db/MyBasicMetadataAuthenticator/users/` + username,{},
            {headers}
        )
        .then(() => {
            addAuthorizerAPI(username)
            const newReq = updateUserPasswordAPI(username,password)
            if(newReq.error){
                resolve(newReq.error)
            }
            resolve(`User ${username} is added successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};


export const updateUserPasswordAPI = async (username,password) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        const body = {
            password: password,
        };
        axios.post(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authentication/db/MyBasicMetadataAuthenticator/users/${username}/credentials`,body,
            {headers}
        )
        .then(() => {              
            resolve(`Password of User ${username} is updated successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};


export const deleteUserAPI = async (username) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.delete(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authentication/db/MyBasicMetadataAuthenticator/users/` + username,
            {headers}
        )
        .then(() => {
            deleteAuthorizerAPI(username)
            resolve(`User ${username} is deleted successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};


/* -------------------------------  ROLE APIs  -------------------------------*/

export const getRolesAPI = async () => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.get(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/roles/`,
            { headers }
        )
        .then(res => {
            let ModifiedResponse = []
            for (var key in res.data){
                ModifiedResponse.push({ name: res.data[key] });
            }
            resolve(ModifiedResponse)
         })
        .catch(error => {
            resolve(error.response.data.error)
         })
    })  
};

export const getUserRolesAPI = async (username) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.get(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/users/${username}`,
            { headers }
        )
        .then(res => {
            resolve(res.data.roles)
         })
        .catch(error => {
            resolve(error.response.data.error)
         })
    })  
};

export const getRoleAPI = async (role) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.get(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/roles/${role}?full`,
            { headers }
        )
        .then(res => {
            resolve(res.data)
         })
        .catch(error => {
            resolve(error.response.data.error)
         })
    })  
};



export const addRoleAPI = async (role) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.post(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/roles/` + role,{},
            {headers}
        )
        .then(() => {
            resolve(`Role ${role} is added successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};

export const assignRoleAPI = async (role,username) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.post(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/users/${username}/roles/` + role,{},
            {headers}
        )
        .then(() => {
            resolve(`Role ${role} is assigned to ${username} successfully`)
         })
        .catch(error => {
            console.log(error)
            resolve(error.response.data)
         })
    })  
};

export const unassignRoleAPI = async (role,username) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.delete(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/users/${username}/roles/` + role,
            {headers}
        )
        .then(() => {
            resolve(`Role ${role} is unassinged to ${username} successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};

export const getRolePermissionAPI = async (role) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.get(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/roles/${role}/permissions/`,
            { headers }
        )
        .then(res => {
            resolve(res.data)
         })
        .catch(error => {
            resolve(error.response.data.error)
         })
    })  
};


export const submitRolePermissionAPI = async (role,data) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.post(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/roles/${role}/permissions/`, JSON.parse(data) ,
            {headers}
        )
        .then(() => {
            resolve(`Permissions of ${role} are updated successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};




export const deleteRoleAPI = async (role) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.delete(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/roles/` + role,
            {headers}
        )
        .then(() => {
            resolve(`Role ${role} is deleted successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};

/* -------------------------------  AUTHORIZER APIs  -------------------------------*/

export const addAuthorizerAPI = async (username) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.post(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/users/` + username,{},
            {headers}
        )
        .then(() => {
            resolve(`User ${username} is authorizerd successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};


export const deleteAuthorizerAPI = async (username) => {
    return new Promise(function(resolve){
        const headers = {
            Authorization: 'Basic '+btoa(`${process.env.REACT_APP_DRUID_ADMIN_USERNAME}:${process.env.REACT_APP_DRUID_ADMIN_PASSWORD}`),
        };
        axios.delete(
            `${process.env.REACT_APP_DRUID_IP}/druid-ext/basic-security/authorization/db/MyBasicMetadataAuthorizer/users/` + username,
            {headers}
        )
        .then(() => {
            resolve(`Authorization ${username} is deleted successfully`)
         })
        .catch(error => {
            resolve(error.response.data)
         })
    })  
};
