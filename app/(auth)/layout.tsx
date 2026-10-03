


export default function RootLayout({ children, }: Readonly< 
    {
        children: React.ReactNode;
        //"children is allowed to contain React content."
    }
    >) {
  return (
    <main>
        
        {children}     
       {/* children-the page that is currently needed the sidebar layout */}


    </main>
  );
}
