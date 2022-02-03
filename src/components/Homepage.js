import React ,{ useEffect,useState }from 'react'
import Tables from './Tables'

const Homepage = () => {
    const [info, setInfo] = useState({electionid :'',stateid:'',cat:''})
    const [displaytable,setDisplaytable] = useState(false)
    const [data, setData] = useState([])
    const commonlink  = 'https://election-worker.elections-aadhan-in.workers.dev/'
    const fetchTodos = async () => {
        const response = await fetch(commonlink + 'electiontypes')
        const todos = await response.json()
        console.log(todos['data'])
        setData(todos['data'])
        
      }
      useEffect(() => {
        fetchTodos()
      }, [])
    
    
    const [states, setStates] = useState([])
    const state = async (electionid) => {
        let url = commonlink + 'electionstates?electionTypeId=' + electionid;
        const res = await fetch(url)
        const ans = await res.json()
        console.log(ans['data'])
        setStates(ans['data'])
        setInfo({...info,electionid :electionid})
        
        }

    const Statelist = states.map((st) =>
    <nav>
        <button onClick ={() => selectstate(st['stateName'],st['stateId'])} class = 'statebutton' >{st['stateName']}
            <i class="fa fa-caret-down"></i>
        </button>
    </nav>
    )

    const [selectedstate, setSelectedstate] = useState([])
    
    const selectstate = (stateselected,stateId) => {
        console.log(stateselected)
        setSelectedstate(stateselected)
        setInfo({...info,stateid:stateId})
        
        
    }

    const header = () => {
        if(info['stateid'] !== '') {
            console.log(info['electionid'])
            return (
            <div>   
                <h2>LIVE: Election Results | {selectedstate} </h2>
                <div class= 'category'>
                    <select placeholder="Select a Category"  onChange={e => setSelectcat({cat:e.target.value})} value={selectcat.cat} >
                        <option value="State" selected>State</option>
                        <option value="Constituency">Constituency</option>
                        <option value="Contestant">Contestant</option>
                        <option value="General">General</option>
                    </select>
                </div>
            </div> 
            )
        }
        
    }
    const [selectcat, setSelectcat] = useState({cat:''})
    
    const Electiontypes = data.map((num) =>
    <nav>
        <button onClick={() => state(num['electionTypeId'])} class ='dropbtn'>{num['electionType']}
            <i class="fa fa-caret-down"></i>
        </button>
    </nav>
    )
    const table = () => {
        console.log(selectcat)
        if(selectcat.cat !== '') {
            return <Tables info ={info} cat = {selectcat.cat}/>
        }

    }
    
    return (
        <div>
            <div class = 'navbar'>
                <div class="dropdown">
                        <button class="dropbtn">Election Type 
                            <i class="fa fa-caret-down"></i>
                        </button>
                    <div class="dropdown-content">
                        {Electiontypes}
                    </div>
                </div> 
            </div>
            <hr />
            <div class ='states'>
                {Statelist}
            </div>
            <div>
                {header()}            
            </div>
            <div>
                {table()}
            </div>
        
        </div>
    )
}

export default Homepage




