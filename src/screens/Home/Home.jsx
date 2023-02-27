import React, { useContext } from 'react'
// import { themeContext } from '../../components/Home/Context'
// import Footer from '../../components/Home/Footer'
// import Intro from '../../components/Home/Intro'
// import NavBar from '../../components/Home/NavBar'
// import Results from '../../components/Home/Results'
// import Services from '../../components/Home/Services'
import './Home.css'
import Spline from '@splinetool/react-spline';

export default function Home() {


  return (
    <div className='homeContainer'>
  

      <div className="splineModel">
        <Spline scene="https://prod.spline.design/FTB66pNIpgpGcaeM/scene.splinecode" />
      </div>

      <div className="hero">

        <h1>Analyse Predict Trade</h1>
        <p>Investoxx</p>

      </div>
    </div>
  );
}

// export default function Home() {
//   const theme = useContext(themeContext)
//   const darkMode = theme.state.darkMode
//   return (
//     <div className='App'
//       style={{background: darkMode? 'black': '', color: darkMode? 'white': '' }}
//     >
//       <NavBar/>
//       <Intro/>
//       <Services/>
//       <Results/>
//       <Footer/>
//     </div>
//   )
// }
