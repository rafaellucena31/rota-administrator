const Permissions  = {
    Rota_List: 'Rota_List',
    Rota_Generate: 'Rota_Generate',
    Rota_Get: 'Rota_Get',
    User_List: 'User_List',
}

function AdjustMenu(tree, permissionsGranted) {
    debugger
    for (let index = 0; index < tree.length; index++) {
        const Root = tree[index];
        Root = AdjustTree(Root, permissionsGranted);
    }
    return tree
}

function AdjustTree(tree, permissionsGranted){
    if (tree.hasOwnProperty('visible')){
        tree.visible = false
    }
    if (tree.hasOwnProperty('items') && tree.items.length > 0){
        for (let index = 0; index < tree.items.length; index++) {
            const element = tree.items[index]
            AdjustTree(element, permissionsGranted)
            if (element.visible){
                tree.visible = true
            }
        }
    }else {
        if (tree.hasOwnProperty('permission') && tree.permission == 'all'){
            tree.visible = true
        }else if (tree.hasOwnProperty('permission')){
            for (let index = 0; index < tree.permission.length; index++) {
                const permission = tree.permission[index];
                if (searchPermission(permissionsGranted, Permissions[permission])){
                    tree.visible = true
                    return
                }
            }
        }
    }
    return tree
}
function searchPermission(permissionUser, permissionMenu){
    for (let index = 0; index < permissionUser.length; index++) {
        const permusuario = permissionUser[index];
        if (permusuario == permissionMenu){
            return true
        }
    }
}

function searchPermissionEnum(permissionUser, permission){
    debugger
    let permissionString = Permissions[permission]
    for (let index = 0; index < permissionUser.length; index++) {
        const permuser = permissionUser[index];
        if (permuser == permissionString){
            return true
        }
    }
    return false
}

export {
    Permissions,
    AdjustMenu,
    searchPermissionEnum,
}