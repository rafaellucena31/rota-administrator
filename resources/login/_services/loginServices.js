//TODO: Refactor postAutentication and postGetPermissions to be intercepted in plugins/axios.js (only apiAuth)
export default  {
    postAutentication(payload) {
        let fakeAutentication = new Promise(
            function(resolve, reject) {
                setTimeout(() => {
                    if (payload.username == 'master' && payload.password == '123'){
                        resolve( {
                            userId : 1,
                            name: 'Rafael Lucena (Master)',
                            userName: 'master',
                            Roles: ['Administrator'],
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhZmFlbCBMdWNlbmEiLCJpYXQiOjE1MTYyMzkwMjJ9.1AMBZ1uCWgNp3GXjwdOm1Vc8gbxTZBNiHBv7CiKF588',
                            message: 'VALID_USERNAME_PASSWORD'
                        })
                    }else if (payload.username == 'user' && payload.password == '123'){
                        resolve( {
                            userId : 1,
                            name: 'Rafael Lucena (Restricted User)',
                            userName: 'user',
                            Roles: ['Operator'],
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSYWZhZWwgTHVjZW5hIC0gUmVzdHJpY3QiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.oqMv25Alc9n_pk7CFsGQenIsaSkyM6gstzWLS022bD8',
                            message: 'VALID_USERNAME_PASSWORD'
                        })
                    }
                    else{
                        reject('Invalid Username/Password')
                    }
                },1000)
            }
        )
        return fakeAutentication
    },
    postGetPermissions(payload){
        let fakeAuthorization = new Promise(
            function(resolve, reject) {
                setTimeout(() => {
                    if (payload.token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhZmFlbCBMdWNlbmEiLCJpYXQiOjE1MTYyMzkwMjJ9.1AMBZ1uCWgNp3GXjwdOm1Vc8gbxTZBNiHBv7CiKF588'){
                        resolve( {
                            Permissions: ['Rota_List', 'Rota_Generate', 'Rota_Get', 'User_List'],
                            message: 'SUCCESS'
                        })
                    }else if (payload.token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSYWZhZWwgTHVjZW5hIC0gUmVzdHJpY3QiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.oqMv25Alc9n_pk7CFsGQenIsaSkyM6gstzWLS022bD8'){
                        resolve( {
                            Permissions: ['Rota_List'],
                            message: 'SUCCESS'
                        })
                    }else{
                        reject('Invalid Token')
                    }
                },1000)
            }
        )
        return fakeAuthorization
    }
}