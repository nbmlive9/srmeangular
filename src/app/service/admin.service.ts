import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API ='https://srme.us/SRMEBNK/SRMEBNK/Admin/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient, private router:Router, public token: TokenStorageService) { }

      AdminHome(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Total_Credit',
      httpOptions
    );
  }

     Profile(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Profile',
      httpOptions
    );
  }

  TodayWalletpay(value: { regid: string; amount: number }): Observable<any> {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      }),
      responseType: 'text' as 'json' // FIX: Allow text response if backend doesn't return JSON
    };

    return this.http.post(
      AUTH_API + 'Withdraw',
      {
        regid: value.regid,
        amount: value.amount
      },
      httpOptions
    );
  }


    GetPckages(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Packages',
      httpOptions
    );
  }

  AddPackage(value:{
  pname: string;
  amount: number;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Add_Package',  { 
      "pname":value.pname, 
      "amount":value.amount,   
    },
     httpOptions 
  );
}

//members users api

GetTodayActiveUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Today_Active',
    httpOptions
  );   
}

GetTodayJoinUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Today_joins',
    httpOptions
  );   
}

TotalActiveUsers() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + 'Total_Activeusers',
    httpOptions
  );
}

TotalInactiveUsers() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + 'Total_Inactiveusers',
    httpOptions
  );
}

TotalMembers() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + 'Total_Members',
    httpOptions
  );
}

searchUsers(qry:string) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Total_Members?q=${qry}`,
    httpOptions
  );
}

TotalUsers(page: number, perPage: number) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Total_users?${pageDetails}`,
    httpOptions
  );
}

userblock(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Userprofile_Block/'+id,
    httpOptions
  );   
}

userunblock(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Userprofile_UnBlock/'+id,
    httpOptions
  );   
}

GetUserDataByid(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Userdatabyregid/'+id,
    httpOptions
  );   
}

GetUserDataByregid(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Userdatabyid/'+id,
    httpOptions
  );   
}

//wallet apis

GetuserWalletData(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Userwise_Walletdata',
    httpOptions
  );   
}

GetWalletWithdrawRequest(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_withdrawRequests',
    httpOptions
  );   
}

GetWalletCompletedWithdraw(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Complete_withdrawRequests',
    httpOptions
  );   
}

GetWalletPaidWithdraw(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Paid_withdrawRequests',
    httpOptions
  );   
}

GetWalletRejectedWithdraw(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Rejected_withdrawRequests',
    httpOptions
  );   
}

WalletWithdrawPay(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Pay_withdrawreq/'+id,
    httpOptions
  );   
}

WalletWithdrawReject(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Reject_withdrawreq/'+id,
    httpOptions
  );   
}

//trasnsfer wallet

TransferWalletUser(value: {
  regid: string;
  amount: number;
  remark: string;
  transactionpassword:string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Wallet_Transefer',
    { 
    "regid":value.regid, 
    "amount":value.amount, 
    "remark":value.remark, 
    "transactionpassword":value.transactionpassword, 
  },
     httpOptions 
  );
}

TransferwalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Transeferreport',
    httpOptions
  );   
}

//profile update

UpdateUserProfile(id: any, value: {
  name:string;
  phone:string;
  email:string;
  password:string;
  transpassword:string;
  wallet1:string;
}) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.put(
    AUTH_API + 'UpdateUserprofile/' + id,
    {
      "name":value.name,
      "phone":value.phone,
      "email":value.email,
      "password":value.password,
      "transpassword":value.transpassword,
      "wallet1":value.wallet1,
    },
    httpOptions
  );
}

//News Api
addNews(value: {
  news_title: string;
  news: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Add_News',
    { "news_title":value.news_title,
    "news":value.news,   
   },
     httpOptions 
  );
}

GetNews(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_News',
    httpOptions
  );
}

DeleteNews(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Deletenews/'+id,
    httpOptions
  );
}

// Query Support Ticket
QueryUpdate(id: any, value: {
  reply: string;
}) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.put(
    AUTH_API + 'Supporttoken_update/'+id,
    { "reply":value.reply, 
  },
    httpOptions
  );
}

PendingQuerys(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Pending_Supporttokens',
    httpOptions
  );
}

CompleteQuerys(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Completed_Supporttokens',
    httpOptions
  );
}


//deposites apis
GetPendingDeposites(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Deposites_Pending',
    httpOptions
  );   
}


DepositesUpdateById(id: any, value: {
  reply: string;
}) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.put(
    AUTH_API + 'Deposite_update/'+id,
    { "reply":value.reply, 
  },
    httpOptions
  );
}

GetCompletedDeposites(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Deposites_Completed',
    httpOptions
  );   
}

//icon club income 
GetSilverIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_silvericonusers',
    httpOptions
  );   
}

GetGoldIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_goldiconusers',
    httpOptions
  );   
}

GetDiamondIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_diamondiconusers',
    httpOptions
  );   
}

Get54PackageUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Package54users',
    httpOptions
  );   
}

Get306PackageUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Package306users',
    httpOptions
  );   
}

Get45PackageUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Package45users',
    httpOptions
  );   
}


TotalRoyaltyUsers(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Total_Royaltyusers',
    httpOptions
  );   
}

AwardDelivered(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'RoyaltyAward_Update/'+id,
    httpOptions
  );   
}

//awards update api
silveraward(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'SilverAward_Update/'+id,
    httpOptions
  );   
}

goldaward(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'GoldAward_Update/'+id,
    httpOptions
  );   
}

diamondaward(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'DiamondAward_Update/'+id,
    httpOptions
  );   
}



}
