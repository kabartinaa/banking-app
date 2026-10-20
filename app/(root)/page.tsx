import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import {getLoggedInUser} from '@/lib/actions/user.actions'
import React from 'react'

const Home = async() => {
  const loggedIn = await getLoggedInUser();
  const totalCurrentBalance = 115243.56;

      return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.name ||'Guest'}
          subtext="Access your account and manage your finances with ease."
          />  


          <TotalBalanceBox 
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={totalCurrentBalance}
          />
        </header>

        RECENT TRANSACTIONS

      </div>

      {/* RIGHT SIDE BAR */}
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{},{ }]}
        totalCurrentBalance={totalCurrentBalance}
      />
    </section>
  )
}

export default Home