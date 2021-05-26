function GetNameUser(users, userid){
    if (users != undefined && users.length > 0){
          for (let index = 0; index < users.length; index++) {
                const userTemp = users[index]
                if (userTemp.userId == userid){
                      return userTemp.user
                }
          }
    }
    
    return 'User Not Found'
}

function CanAddRota(usersselected, userid){
    if (usersselected == undefined || usersselected.length == 0){
          return true
    }else {
          for (let index = 0; index < usersselected.length; index++) {
                const userTemp = usersselected[index]
                if (userTemp.userId == userid){
                      return true
                }
          }
          return false
    }
}
function RotasLeftJoinUser(rotasData, userselected, usersData){
    let rotasTemp = []
    if (rotasData != undefined && rotasData.rotas != undefined && rotasData.rotas.length > 0){
            let rotasDataCopy = Object.assign({}, rotasData)
            for (let i=0; i<rotasDataCopy.rotas.length; i++) {
                let rotaObj = rotasDataCopy.rotas[i]
                for (let j=0; j< rotaObj.rota.length; j++) {
                        let rotaItem = rotaObj.rota[j]
                        if (CanAddRota(userselected, rotaItem.userId)){
                            rotaItem.user = GetNameUser(usersData, rotaItem.userId)
                            rotaItem.period = rotaObj.period
                            rotaItem.fatherRotaId = rotaObj.rotaID
                            rotaItem.isnew=false
                            rotasTemp.push(rotaItem)
                        }
                }
            }
    }
    
    return rotasTemp
}

function RotasLeftJoinUserByData(rotasData, userselected, usersData, dataSelected){
    debugger
    let rotasTemp = []
    if (rotasData != undefined && rotasData.rota != undefined && rotasData.rota.length > 0){
            let rotasDataCopy = Object.assign({}, rotasData)
            for (let j=0; j< rotasDataCopy.rota.length; j++) {
                    let rotaItem = rotasDataCopy.rota[j]
                    debugger
                    if (rotaItem.date == dataSelected && CanAddRota(userselected, rotaItem.userId)){
                        rotaItem.user = GetNameUser(usersData, rotaItem.userId)
                        rotaItem.period = rotasDataCopy.period
                        rotaItem.fatherRotaId = rotasDataCopy.rotaID
                        rotaItem.isnew=true
                        rotasTemp.push(rotaItem)
                    }
            }
    }
    return rotasTemp
}

export {
    RotasLeftJoinUser,
    RotasLeftJoinUserByData
}