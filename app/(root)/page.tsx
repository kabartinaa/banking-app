import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import {getLoggedInUser} from '@/lib/actions/user.actions'
import {getAccounts,getAccount} from '@/lib/actions/bank.actions'
import RecentTransactions from '@/components/RecentTransactions'

import React from 'react'

const Home = async ({ searchParams }: SearchParamProps) => {

  const { id, page } = await searchParams;
  const currentPage=Number(page as string)||1
  const loggedIn = await getLoggedInUser();
  //const totalCurrentBalance = 115243.56;
  const accounts=await getAccounts({userId:loggedIn.$id})

  if(!accounts) return;

  const accountsData=accounts?.data
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account =await getAccount({appwriteItemId})

  console.log({accountsData,
    account
  })
      return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName ||'Guest'}
          subtext="Access your account and manage your finances with ease."
          />  


          <TotalBalanceBox 
          accounts={accountsData}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

       
        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />

      </div>

      {/* RIGHT SIDE BAR */}
      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0,2)}
        totalCurrentBalance={accounts?.totalCurrentBalance}
        />
    </section>
  )
}

export default Home