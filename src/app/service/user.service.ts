import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API ='https://yohanbin.live/S7R18M13E5/S7R18M13E5/User/'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public token: TokenStorageService) { }

  //   UserRegistration(value: any){
  //   return this.http.post(
  //     AUTH_API + 'Register', value, {
  //       responseType: 'json',
  //     });
  // }

  UserRegistration(value: any) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };

  return this.http.post(
    AUTH_API + 'Register',
    {
      "sponcerid": value.sponcerid,
      "name": value.name,
      "phone": value.phone,
      "email": value.email,
      "password": value.password,
      "position": value.position,
      "placementid": value.placementid,
      "regtype": value.regtype,
      "product": value.product || null,
      "address": value.address || null,
      "pincode": value.pincode || null,
      "deliverytype": value.deliverytype || null,
    },
    httpOptions
  );
}

forgotPassword(value: { regid: string; email: string }): Observable<any> {
  return this.http.post(AUTH_API + 'Forget_password', {
    regid: value.regid,
    email: value.email
  });
}


  GetusersDataByRegID(id:any){
    return this.http.get(
      AUTH_API + 'Get_Userdatabyregid/'+id,
    );
  }

   UDashboardData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Home',
      httpOptions
    );
  }

   UProfile(){
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

  UpdateUserProfile(value: {
        name: string;
    email: string;
    password: string;
    wallet1: string;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Profileiupdate',
      { 
          "name":value.name, 
        "email":value.email, 
        "password":value.password, 
        "wallet1":value.wallet1, 
      },
      httpOptions
    );
  }

//withdraw wallet api
UserWithdraw(value: {
    amount: number;
    note: string;
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
      AUTH_API + 'Withdrawrequest',
      { 
      "amount":value.amount, 
      "note":value.note,
      "transactionpassword":value.transactionpassword, 
    },
       httpOptions 
    );
  }

  UserWithdrawPending(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Withdrawrequestdata_pending',
      httpOptions
    );   
  }

  UserWithdrawCompleted(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Withdrawrequestdata_complete',
      httpOptions
    );   
  }

  //transfer wallet api
    UserSelfTransferWallet(value: {
    amount: number;
    remark: string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Wallet_SelfTransefer',
      { 
      "amount":value.amount, 
      "remark":value.remark, 
    },
       httpOptions 
    );
  }

  UserTransferUserWallet(value: {
    regid:string;
    amount: number;
    remark: string;
    wallettyoe:string;
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
      "wallettyoe":value.wallettyoe
    },
       httpOptions 
    );
  }

  TransferWalletData(){
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

    ReceivedWalletData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Wallet_Receivereport',
      httpOptions
    );   
  }

 WalletReportData() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Wallet_Report`,
    httpOptions
  );
}

 WalletTodayReport() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Wallet_TodayReport`,
    httpOptions
  );
}

WalletMatchingReport() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Wallet_Matching`,
    httpOptions
  );
}

WalletSponsorReport() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Wallet_Sponsor`,
    httpOptions
  );
}


withdrawToBlockchain(value: {
  recipient: string;
  amount:number;
  flag:number;
}) {

  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Yohanpayout', 

   {
    recipient:value.recipient,
        amount: value.amount,
        flag:value.flag,
      },
    httpOptions
  );

}


YohanPrice(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_ROidynamicpaymentout',
    httpOptions
  );   
}

  WalletReport(page: number, perPage: number) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Wallet_Report?${pageDetails}`,
    httpOptions
  );
}

UserTreeView(id:any): Observable<any>{
const token1 = this.token.getToken();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token1
  })
}
return this.http.get(
  AUTH_API +`Tree_view/${id}` ,
  httpOptions
);
}

UserTreeViewDataById(id:any): Observable<any>{
const token1 = this.token.getToken();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token1
  })
}
return this.http.get(
  AUTH_API + 'Treedata/'+id,
  httpOptions
);
}


LeftTeamData(page: number, perPage: number) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Left_members?${pageDetails}`,
    httpOptions
  );
}


RightTeamData(page: number, perPage: number) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Right_members?${pageDetails}`,
    httpOptions
  );
}

 DirectReferrals() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Directteam`,
    httpOptions
  );
}

  DirectTeam(page: number, perPage: number) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Directteam?${pageDetails}`,
    httpOptions
  );
}

     DirectReferralClubIncome(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'User_Referalclubreport',
      httpOptions
    );   
  }

   LevelMembersData() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Level_members`,
    httpOptions
  );
}

    UserNameDisplay(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Userdatabyregid/'+id,
      httpOptions
    );  
  }

  //Packages Api

    GetPackages(){
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

    GetPackagesById(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Packagedata/'+id,
      httpOptions
    );  
  }

     ActivationData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Activation_data',
      httpOptions
    );   
  }

  //Support Ticket Api
AddSupport(value: {
  query: string;
  subject: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Add_Query',
    { "query":value.query,
    "subject":value.subject,   
   },
     httpOptions 
  );
}

GetSupportTickets(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'User_querydata',
    httpOptions
  );
}

//deposites api

  DepositWallet(value: { amount: string, note: string, transno: string }) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Deposite',
    {
      amount: value.amount,
      note: value.note,
      transno: value.transno,
    },
    httpOptions
  );
}

  DepositeUserData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'User_Deposites',
      httpOptions
    );   
  }

  //income report 
  SilverIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'User_silvericonreport',
    httpOptions
  );
}

GoldIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'User_goldiconreport',
    httpOptions
  );
}

DiamondIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'User_diamondiconreport',
    httpOptions
  );
}

LevelIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Level_income',
    httpOptions
  );
}

AutopoolIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Autopoll_Income',
    httpOptions
  );
}

//activate api
ActivatePackage(value: {
    regid:string;
    package:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Activate',
      { 
      "regid":value.regid, 
      "package":value.package, 
    },
       httpOptions 
    );
  }


  AchivedData(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Icon_Achivedata',
    httpOptions
  );
}

  salaryData(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Salary_Achivedata',
    httpOptions
  );
}

UpdateAutoLevel2(value: {
    awardtype:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Update_level2Award',
      { 
      "awardtype":value.awardtype, 
    },
       httpOptions 
    );
  }

  UpdateAutoLevel3(value: {
    awardtype:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Update_level3Award',
      { 
      "awardtype":value.awardtype, 
    },
       httpOptions 
    );
  }

  UpdateAutoLevel4(value: {
    awardtype:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Update_level4Award',
      { 
      "awardtype":value.awardtype, 
    },
       httpOptions 
    );
  }

  UpdateAutoLevel5(value: {
    awardtype:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Update_level5Award',
      { 
      "awardtype":value.awardtype, 
    },
       httpOptions 
    );
  }

   UserOrders() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `User_Delivery`,
    httpOptions
  );
}

GenerateOtp() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(AUTH_API + 'GenerateOtp', httpOptions);
  }

  VerifyOtp(value: {
  otp: string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Verify_Otp', 
   {
        otp: value.otp,
      },
    httpOptions
  );
}




}
