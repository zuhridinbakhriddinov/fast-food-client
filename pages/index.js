import Head from 'next/head'
import MenuList from "../components/menu/MenuList";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Footer from "../components/footer/Footer";
import AboutUs from "../components/about/AboutUs";


export default function Home() {
  return (
    <div >
      <Head>
        <title>Food2</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Sonya-Swarm-Fast-Food.ico" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
      </Head>

        <main>
            <Nav/>
            <Banner/>
            <div className="container  mx-6 my-2" id="menu">
                <MenuList/>
            </div>
        </main>
<AboutUs/>

<Footer/>

    </div>
  )
}
