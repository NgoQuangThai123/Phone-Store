import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';

function DashBoard() {
    return (
        <div className="App">
            <div className="AppGlass">
                <MainDash />
                <RightSide />
            </div>
        </div>
    );
}

export default DashBoard;
