import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { NftComponent } from "../dashboard/pages/nft/nft.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { RolesComponent } from "./pages/roles/roles.component";
import { PermissionsComponent } from "./pages/permissions/permissions.component";


const routes: Routes = [
    {
      path: '',
    //   canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: UserListComponent },
        { path: 'roles', component: RolesComponent },
        { path: 'permissions', component: PermissionsComponent },
       
  
        //------
        
  
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class UserRoutingModule {}