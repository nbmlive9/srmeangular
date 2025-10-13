import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/Admin/login/login.component';
import { DashboardComponent } from './pages/Admin/dashboard/dashboard.component';
import { PackagesComponent } from './pages/Admin/packages/packages.component';
import { ActivationWalletComponent } from './pages/Admin/activation-wallet/activation-wallet.component';
import { DepositesComponent } from './pages/Admin/deposites/deposites.component';
import { TotalUsersComponent } from './pages/Admin/total-users/total-users.component';
import { WalletComponent } from './pages/Admin/wallet/wallet.component';
import { ProfileUpdateComponent } from './pages/Admin/profile-update/profile-update.component';
import { UloginComponent } from './pages/User/ulogin/ulogin.component';
import { UserDashboardComponent } from './pages/User/user-dashboard/user-dashboard.component';
import { DepositRequestComponent } from './pages/User/deposit-request/deposit-request.component';
import { SelfActivationComponent } from './pages/User/self-activation/self-activation.component';
import { ReferralsComponent } from './pages/User/referrals/referrals.component';
import { TransferWalletComponent } from './pages/User/transfer-wallet/transfer-wallet.component';
import { IncomesReportComponent } from './pages/User/incomes-report/incomes-report.component';
import { MyWalletComponent } from './pages/User/my-wallet/my-wallet.component';
import { WalletReportComponent } from './pages/User/wallet-report/wallet-report.component';
import { RegistrationComponent } from './pages/User/registration/registration.component';
import { SponsorRegistrationComponent } from './pages/User/sponsor-registration/sponsor-registration.component';
import { ProfileComponent } from './pages/User/profile/profile.component';
import { AddNewsComponent } from './pages/Admin/add-news/add-news.component';
import { SilverCoinUsersComponent } from './pages/Admin/silver-coin-users/silver-coin-users.component';
import { SupportTicketsComponent } from './pages/Admin/support-tickets/support-tickets.component';
import { UserSupportComponent } from './pages/User/user-support/user-support.component';
import { AuthGuard } from './service/auth.guard';
import { UserActivationComponent } from './pages/User/user-activation/user-activation.component';
import { LevelMembersComponent } from './pages/User/level-members/level-members.component';
import { AwardUsersDataComponent } from './pages/Admin/award-users-data/award-users-data.component';
import { RoyaltyUsersDataComponent } from './pages/Admin/royalty-users-data/royalty-users-data.component';
import { ForgotPasswordComponent } from './pages/User/forgot-password/forgot-password.component';
import { TreeViewComponent } from './pages/User/tree-view/tree-view.component';

const routes: Routes = [
  {path:"login",component:LoginComponent },
  {path:"",component:UloginComponent },
  {path:"auth-login",component:UloginComponent },
  {path:"forgot",component:ForgotPasswordComponent },
//   {path:"auth-signup",component:RegistrationComponent },
// { path: "auth-sponsorsignup/:regid", component: SponsorRegistrationComponent },

  //Admin Routings
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"packages",component:PackagesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"activationwallet",component:ActivationWalletComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"deposites",component:DepositesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"users",component:TotalUsersComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"wallet",component:WalletComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"updateprofile",component:ProfileUpdateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"addnews",component:AddNewsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"silverusers",component:SilverCoinUsersComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:"adminsupport",component:SupportTicketsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
   {path:"awardusers",component:AwardUsersDataComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
   {path:"royaltyusers",component:RoyaltyUsersDataComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },

  //User Routings
  {path:"mydashboard",component:UserDashboardComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"despositesreq",component:DepositRequestComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"activation",component:UserActivationComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"referrals",component:ReferralsComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"transferwallet",component:TransferWalletComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"myincomes",component:IncomesReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"walletwithdraw",component:MyWalletComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"myprofile",component:ProfileComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:"support",component:UserSupportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    {path:"team",component:LevelMembersComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    {path:"treeview/:regid",component:TreeViewComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  // {path:"activation/:regid",component:UserActivation, canActivate: [AuthGuard], data: { roles: ['user'] } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
