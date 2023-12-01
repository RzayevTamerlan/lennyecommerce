import './globals.scss'
import {Montserrat} from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AutoModal from "../components/AutoModal/AutoModal";
import {getCookie} from "../actions/auth";
import {setToken} from "../api/createAxios";

export const metadata = {
  title: 'Lenny shop',
  description: `Welcome to Lenny's E-Commerce Market, where shopping meets convenience and quality. Lenny's is not just an ordinary online store; it's your go-to destination for a seamless and enjoyable shopping experience. Whether you're looking for the latest fashion trends, cutting-edge gadgets, home essentials, or unique handmade crafts, Lenny's E-Commerce Market has it all.`,
}
const montserrat = Montserrat({subsets: ['latin']});
export default async function RootLayout({children}) {
  const token = await getCookie();
  if (token !== 'No Cookie Found') {
    console.log('In IF', token.value)
    await setToken(token.value);
  }
  return (
    <html lang="en">
    <body className={montserrat.className}>
    <Header/>
    <AutoModal/>
    {children}
    <Footer/>
    </body>
    </html>
  )
}
