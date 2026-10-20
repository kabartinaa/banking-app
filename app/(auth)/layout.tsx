import Image from "next/image";
export default function RootLayout({ children, }: Readonly< 
    {
        children: React.ReactNode;
        //"children is allowed to contain React content."
    }
    >) {
  return (
    <main className="flex min-h-screen w-full 
        justify-between font-inter">
        
        {children}     
        <div className="auth-asset">
          <div>
            <Image 
              src="/icons/auth-image.svg"
              alt="auth-img"
              width={500}
              height={500}
              />

          </div>

        </div>
       {/* children-the page that is currently needed the sidebar layout */}


    </main>
  );
}
