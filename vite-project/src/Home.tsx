import "./App.css"
import Form from './Form.tsx'
import { Link } from 'react-router-dom';

function Home() {
    return <div>

        <div className="block title-block">
            <p className="subtitle">Your gateway to the timeless wisdom, guidance, and beauty of the Quran.</p>
            <p style={{cursor:"pointer"}} onClick={()=>{window.open('http://localhost:5000/api/docs/', '_blank')}} className="doc-button">Documentation</p>
        </div>

        <div className="block verse-block">
            <div className="verse-arabic">
                <p className="verse-text-arabic">يَرْفَعِ ٱللَّهُ ٱلَّذِينَ ءَامَنُوا۟ مِنكُمْ وَٱلَّذِينَ أُوتُوا۟ ٱلْعِلْمَ دَرَجَـٰتٍۢ ۚ وَٱللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌۭ    (١١)</p>
            </div>
            <div className="verse-english">
                <p className="verse-text-english">"Allah will elevate those of you who are faithful, and ˹raise˺ those gifted with knowledge in rank. And Allah is All-Aware of what you do." 58:11</p>
            </div>
            <p className="heading">Leverage this API along with your programming prowess to elevate your project, spread Islamic knowledge, and seek Allah's pleasure.</p>

        </div>

        <div className="block about-block">
            <div className="container">
                <div className="box ">
                    <img className="image" src="./src/assets/accessibility.png"></img>
                    <p className="about-heading">Accessibility</p>
                    <p className="paragraph about-paragraph">Designed with accessibility in mind, offering an intuitive and user-friendly experience, making it effortless for developers to integrate and utilize its features—all while being 100% free of charge.</p>
                </div>
                <div className="box">
                    <img className="image" src="./src/assets/handshake.png"></img>
                    <p className="about-heading">Trustworthy</p> 
                    <p className="paragraph about-paragraph">Our open-source API is built on a foundation of trust and transparency, ensuring that developers can rely on its integrity and openly review its code for complete peace of mind.</p>
                </div>
                <div className="box">
                    <img className="image" src="./src/assets/web-development.png"></img>
                    <p className="about-heading">Dev-friendly</p>
                    <p className="paragraph about-paragraph">Thoughtfully crafted to be developer-friendly, with clear documentation, robust support, and intuitive features that empower developers to seamlessly integrate and innovate.</p>
                </div>
            </div>
        </div>

        <div className="block form-block">
            <Form></Form>
        </div>

    </div>
}
  
  export default Home;