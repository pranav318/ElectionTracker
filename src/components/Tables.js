import React ,{ useEffect,useState }from 'react'

const Tables = ({info,cat}) => {
    const [constidata, setConstidata] = useState([])
    const data = info
    const commonlink  = 'https://election-worker.elections-aadhan-in.workers.dev/'
    
    const constdata = async () => {
        let url = commonlink +'constituencywisedata?electionTypeId=' + data['electionid'] + '&stateId=' + data['stateid'] ;
        const res1 = await fetch(url)
        const ans1 = await res1.json()
        setConstidata(ans1['data']['stateWiseData']["lstConstituencyWiseData"])
        }
        useEffect(() => {
            constdata()
            })
        
    const [stdata, setStdata] = useState([])
    
    const statedata = async () => {
        let url2 = commonlink+'statewisedata?electionTypeId=' + data['electionid'] + '&stateId=' + data['stateid'] ;
        const res2 = await fetch(url2)
        const ans2 = await res2.json()
        setStdata(ans2['data']['stateWiseData']["lstPartyWiseData"])
        console.log(stdata)
        }
        useEffect(() => {
            statedata()
            })

    
    const [general, setGeneral] = useState([])
    const generaldata = async () => {
        let url3 = commonlink+'countrywisedata' ;
        const res4 = await fetch(url3)
        const ans4 = await res4.json()
        setGeneral(ans4['data']['lstPartyWiseData'])
        }
        useEffect(() => {
            generaldata()
            })
    const [userwise, setUserwise] = useState([])
    const contestantdata = async () => {
        let url4 = commonlink+'?contestantsdata' ;
        const res3 = await fetch(url4)
        const ans3 = await res3.json()
        setUserwise(ans3)
        }
    
 
    if (cat === 'State') {

    return (
        <div>
        <table class="table">
            <thead>
                <tr>
                <th>partyName</th>
                <th>seats</th>
                <th>statusCount</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(stdata).map((i) => {
                let data = stdata[i];
                return (
                <tr key={i}>
                    <td>{data.partyName}</td>
                    <td>{data.seats}</td>
                    <td>{data.statusCount}</td>
                </tr>
                );
            })}
                
            </tbody>
        </table>
         
        </div>
        );
    
        }
    
    if (cat === 'Constituency') {
       
        return (
            <div>
                
            <table class="table">
                <thead>
                    <tr>
                    <th>Constituency</th>
                    <th>Contestant Name</th>
                    <th>partyName</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(constidata).map((i) => {
                    let data = constidata[i];
                    return (
                    <tr key={i}>
                        <td>{data.constituency}</td>
                        <td>{data.contestantName}</td>
                        <td>{data.partyName}</td>
                        <td>{data.status}</td>
                        
                    </tr>
                    );
                })}
                    
                </tbody>
            </table>
             
            </div>
            );
    }

    if (cat === 'Contestant') {
        
        return (
            <div>
                
            <table class="table">
                <thead>
                    <tr>
                    <th>Constituency</th>
                    <th>Contestant Name</th>
                    <th>partyName</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(stdata).map((i) => {
                    let data = stdata[i];
                    return (
                    <tr key={i}>
                        <td>{data.constituency}</td>
                        <td>{data.contestantName}</td>
                        <td>{data.partyName}</td>
                        <td>{data.status}</td>
                        
                    </tr>
                    );
                })}
                    
                </tbody>
            </table>
             
            </div>
            );
    }
    
    if( cat === 'General') {
        
        return (
            <div>
                
            <table class="table">
                <thead>
                    <tr>
                    <th>partyName</th>
                    <th>seats</th>
                    <th>seatsCount</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(general).map((i) => {
                    let data = general[i];
                    return (
                    <tr key={i}>
                        <td>{data.partyName}</td>
                        <td>{data.seats}</td>
                        <td>{data.seatsCount}</td>
                    </tr>
                    );
                })}
                    
                </tbody>
            </table>
             
            </div>
            );
    }
}

export default Tables
