
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Button, List } from '@mui/material';
import { accountService } from '../../_services/account.service';
const AdminLayout = () => {
  let navigate = useNavigate()
  if(!accountService.isLogged()){
      return navigate('/auth/login')
  }
  return (
    <div className='grid grid-cols-10 gap-2'>
      <Sidebar className='h-screen col-span-2 max-w-4xl mt-6' >
        <Menu>
          <MenuItem> 
            <Button  onClick={()=>{
                accountService.logout()
                navigate('/')
              }} >Logout
            </Button>
        </MenuItem>
          <MenuItem> Tableau de bord </MenuItem>
          <SubMenu label="Gestion Adherents">
            <MenuItem> <Button onClick={()=>navigate("/admin/adherent")} >Liste des adherents</Button></MenuItem>
            <MenuItem>  <Button onClick={()=>navigate("/admin/adherent/add")} > Ajouter un adherent</Button> </MenuItem>
            <MenuItem> <Button onClick={()=>navigate("/admin/adherent/edit")} >Editer un adherent</Button> </MenuItem>
          </SubMenu>
          <SubMenu label="Gestion Utilisateurs">
            <MenuItem> Liste des utilisateurs</MenuItem>
            <MenuItem> Ajouter un utilisateur</MenuItem>
            <MenuItem> Editer un utilisateur</MenuItem>
          </SubMenu>
          
          <MenuItem> 

          
           </MenuItem>
        </Menu>
      </Sidebar>
       <div className='col-span-8'>
       <Outlet/>
       </div>
        
    </div>
  )
}

export default AdminLayout
