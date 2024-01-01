import "./App.css"
import Form from './Form.js'
import { Link } from 'react-router-dom';

function Home() {
    return <div>

            <div id="home"></div>

            <nav className="navbar" id="navbar">
                <ul><li><a href="">quran API</a></li></ul>
                <ul>
                    <li><a href="#home">OVERVIEW</a></li>
                    <li><a href="#docs">DOCS</a></li>
                    <li><a href="">TRY NOW</a></li>
                </ul>
            </nav>   

            <div className="home">
                <div className="home-left">
                    <h1 className="heading">The only Quran API you'll ever need.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laborum magni nostrum repellendus, architecto quaerat rem omnis saepe corrupti facere ab distinctio delectus sunt aspernatur non ratione maiores recusandae aperiam.</p>                   
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt libero vitae facere? Culpa non quibusdam odio suscipit ab nobis asperiores tenetur velit, magni vel necessitatibus vero vitae rem officia officiis.</p>
                </div>
                <div className="home-right">
                    <h1>The only Quran API you'll ever need.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti praesentium tempora magnam assumenda ipsa fuga obcaecati esse molestiae sint est cum, consectetur, similique earum adipisci soluta repellendus ex laboriosam at.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa minima quis quae necessitatibus, aperiam repellat adipisci ullam consequatur, officiis impedit aliquam nisi ratione pariatur sapiente iusto? Expedita omnis earum architecto.</p>
                </div>
            </div>   

            <div className="documentation" id="docs">
                    <h1 className="heading">Documentation</h1>
            </div>

    </div>
}
  
  export default Home;
