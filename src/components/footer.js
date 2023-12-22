import { Link } from "react-router-dom";
import '../styles/footer.css';


const Footer = ()=>{
    return(
        <>
            <footer class="footer">
                <div class="footer-wrapper">
                    <div class="footer-card">
                        <div class="f-headline f-item">LET US HELP YOU</div>
                        <div class="f-item">
                            <Link to=''>Contact Us</Link>
                        </div>

                    </div>
                    <div class="footer-card">
                        <div class="f-headline f-item">ABOUT DiasporaBlack</div>
                        <div class="f-item">
                            <Link to=''>About Us</Link>
                        </div>
                        <div class="f-item">
                            <Link to=''>Contact Us</Link>
                        </div>

                    </div>
                    <div class="footer-card">
                        <div class="f-headline f-item">MAKE MONEY BY BECOMING AN INSTRUCTOR</div>
                        <div class="f-item">
                            <Link to=''>Teach</Link>
                        </div>



                    </div>
                    <div class="footer-card">
                        <div class="f-headline ">ELEARNING INTERNATIONAL</div>
                        <div class="f-item">
                            <Link to=''>Teach on ELEARNING</Link>
                        </div>
                        <div class="f-item">
                            <a href="">UK</a>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;