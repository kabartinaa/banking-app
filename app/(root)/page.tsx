import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn={firstName:'Kabartinaa' , lastName:'S', email:'kabartinaa.s@example.com'}
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
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1000.34}
          />
        </header>

        RECENT TRANSACTIONS

      </div>

      {/* RIGHT SIDE BAR */}
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{},{ }]}
      />
    </section>
  )
}

export default Home