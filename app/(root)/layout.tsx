import SideBar from "@/components/SideBar";
import Image from "next/image";
import MobileNavBar from "@/components/MobileNavBar";


export default function RootLayout({ children, }: Readonly< 
    {
        children: React.ReactNode;
        //"children is allowed to contain React content."
    }
    >) {

      const loggedIn={firstName:'Kabartinaa' , lastName:'S'}
  return (
    <main className ="flex h-screen w-full front-inter">
        {/* SIDEBAR */}
        <SideBar user={loggedIn}/>

        <div className="flex size-full flex-col">
           <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
            <div>
              <MobileNavBar user={loggedIn}/>
            </div>

           </div> 
           {children}
        </div>

       
    </main>
  );
}
