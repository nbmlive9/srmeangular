import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/Admin/login/login.component';
import { DashboardComponent } from './pages/Admin/dashboard/dashboard.component';
import { ActivationWalletComponent } from './pages/Admin/activation-wallet/activation-wallet.component';
import { TopNavibarComponent } from './pages/top-navibar/top-navibar.component';
import { MenuBarComponent } from './pages/menu-bar/menu-bar.component';
import { PackagesComponent } from './pages/Admin/packages/packages.component';
import { DepositesComponent } from './pages/Admin/deposites/deposites.component';
import { TotalUsersComponent } from './pages/Admin/total-users/total-users.component';
import { ActiveUsersComponent } from './pages/Admin/active-users/active-users.component';
import { InactiveUsersComponent } from './pages/Admin/inactive-users/inactive-users.component';
import { TodayUsersComponent } from './pages/Admin/today-users/today-users.component';
import { SearchUserComponent } from './pages/Admin/Widgets/search-user/search-user.component';
import { WalletComponent } from './pages/Admin/wallet/wallet.component';
import { PaidWalletReportComponent } from './pages/Admin/paid-wallet-report/paid-wallet-report.component';
import { ProfileUpdateComponent } from './pages/Admin/profile-update/profile-update.component';
import { UserDashboardComponent } from './pages/User/user-dashboard/user-dashboard.component';
import { UloginComponent } from './pages/User/ulogin/ulogin.component';
import { RegistrationComponent } from './pages/User/registration/registration.component';
import { SponsorRegistrationComponent } from './pages/User/sponsor-registration/sponsor-registration.component';
import { DepositRequestComponent } from './pages/User/deposit-request/deposit-request.component';
import { SelfActivationComponent } from './pages/User/self-activation/self-activation.component';
import { UserActivationComponent } from './pages/User/user-activation/user-activation.component';
import { UactivationReportComponent } from './pages/User/uactivation-report/uactivation-report.component';
import { ReferralsComponent } from './pages/User/referrals/referrals.component';
import { TransferWalletComponent } from './pages/User/transfer-wallet/transfer-wallet.component';
import { IncomesReportComponent } from './pages/User/incomes-report/incomes-report.component';
import { MyWalletComponent } from './pages/User/my-wallet/my-wallet.component';
import { WalletReportComponent } from './pages/User/wallet-report/wallet-report.component';
import { ProfileComponent } from './pages/User/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LevelIncomeComponent } from './pages/User/level-income/level-income.component';
import { ReferralIncomeComponent } from './pages/User/referral-income/referral-income.component';
import { ReferralClubIncomeComponent } from './pages/User/referral-club-income/referral-club-income.component';
import { SilverIncomeComponent } from './pages/User/silver-income/silver-income.component';
import { GoldIncomeComponent } from './pages/User/gold-income/gold-income.component';
import { DiamondIncomeComponent } from './pages/User/diamond-income/diamond-income.component';
import { RoyaltyIncomeComponent } from './pages/User/royalty-income/royalty-income.component';
import { AutoPoolIncomeComponent } from './pages/User/auto-pool-income/auto-pool-income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddNewsComponent } from './pages/Admin/add-news/add-news.component';
import { Package54UsersComponent } from './pages/Admin/package54-users/package54-users.component';
import { Package306UsersComponent } from './pages/Admin/package306-users/package306-users.component';
import { Package45UsersComponent } from './pages/Admin/package45-users/package45-users.component';
import { SilverCoinUsersComponent } from './pages/Admin/silver-coin-users/silver-coin-users.component';
import { GoldCoinUsersComponent } from './pages/Admin/gold-coin-users/gold-coin-users.component';
import { DiamondCoinUsersComponent } from './pages/Admin/diamond-coin-users/diamond-coin-users.component';
import { SupportTicketsComponent } from './pages/Admin/support-tickets/support-tickets.component';
import { SelfTransferComponent } from './pages/User/self-transfer/self-transfer.component';
import { UserSupportComponent } from './pages/User/user-support/user-support.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ReceivedReportComponent } from './pages/User/received-report/received-report.component';
import { LevelMembersComponent } from './pages/User/level-members/level-members.component';
import { AwardUsersDataComponent } from './pages/Admin/award-users-data/award-users-data.component';
import { RoyaltyUsersDataComponent } from './pages/Admin/royalty-users-data/royalty-users-data.component';
import { HomePageComponent } from './pages/MainHome/home-page/home-page.component';
import { ForgotPasswordComponent } from './pages/User/forgot-password/forgot-password.component';
import { LeftTeamComponent } from './pages/User/left-team/left-team.component';
import { RightTeamComponent } from './pages/User/right-team/right-team.component';
import { TreeViewComponent } from './pages/User/tree-view/tree-view.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeViewDataComponent } from './pages/User/tree-view-data/tree-view-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ActivationWalletComponent,
    TopNavibarComponent,
    MenuBarComponent,
    PackagesComponent,
    DepositesComponent,
    TotalUsersComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    TodayUsersComponent,
    SearchUserComponent,
    WalletComponent,
    PaidWalletReportComponent,
    ProfileUpdateComponent,
    UserDashboardComponent,
    UloginComponent,
    RegistrationComponent,
    SponsorRegistrationComponent,
    DepositRequestComponent,
    SelfActivationComponent,
    UserActivationComponent,
    UactivationReportComponent,
    ReferralsComponent,
    TransferWalletComponent,
    IncomesReportComponent,
    MyWalletComponent,
    WalletReportComponent,
    ProfileComponent,
    LevelIncomeComponent,
    ReferralIncomeComponent,
    ReferralClubIncomeComponent,
    SilverIncomeComponent,
    GoldIncomeComponent,
    DiamondIncomeComponent,
    RoyaltyIncomeComponent,
    AutoPoolIncomeComponent,
    AddNewsComponent,
    Package54UsersComponent,
    Package306UsersComponent,
    Package45UsersComponent,
    SilverCoinUsersComponent,
    GoldCoinUsersComponent,
    DiamondCoinUsersComponent,
    SupportTicketsComponent,
    SelfTransferComponent,
    UserSupportComponent,
    ReceivedReportComponent,
    LevelMembersComponent,
    AwardUsersDataComponent,
    RoyaltyUsersDataComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    LeftTeamComponent,
    RightTeamComponent,
    TreeViewComponent,
    TreeViewDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }), ClipboardModule, OrganizationChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
