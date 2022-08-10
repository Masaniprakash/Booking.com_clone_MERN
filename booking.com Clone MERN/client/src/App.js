import './App.css';
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from './pages/Home/Home';
import List from './pages/List/List';
import Hotel from './pages/Hotel/Hotel';
import SearchContext  from './context/searchContextMy';
import Login from './pages/Login/Login';

function App() {
    return (
        <div className="App">
            <SearchContext.Provider value={{search:[{
                city: undefined,
                date: [],
                options: {
                  adult: undefined,
                  children: undefined,
                  room: undefined,
                },
            }]}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hotels" element={<List />} />
                        <Route path="/hotels/:id" element={<Hotel />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
