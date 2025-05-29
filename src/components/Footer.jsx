//usar este footer para seguir un patron ya definido
import faceLogo from '/facebook.svg'
import instaLogo from '/instagram.svg'
import linkedLogo from '/linkedin.svg'
import xLogo from '/x.svg'
import youtuLogo from '/youtube.svg'


export default function Footer(){
    return(
        <footer className="h-[6vh] flex justify-between bg-black">
            <div className="flex items-center ml-4">
                <h1 className='text-white'>Copyright © Gimnasio 2024</h1>
            </div>
            <div className='flex items-center gap-4 mr-4'>
                <img src={faceLogo} className="logo facebook" alt="Facebook logo" />
                <img src={instaLogo} className="logo instagram" alt="Instagram logo" />
                <img src={linkedLogo} className="logo linkedin" alt="Linkedin logo" />
                <img src={xLogo} className="logo x" alt="X logo" />
                <img src={youtuLogo} className="logo youtube" alt="Youtube logo" />

            </div>
        </footer>
    )
}