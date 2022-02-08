import React ,{ useEffect,useState }from 'react'

const Tables = ({info,cat}) => {
    const [constidata, setConstidata] = useState([])
    const [insull1,setIsnull1] = useState(true)
    const data = info
    const commonlink  = 'https://election-worker.elections-aadhan-in.workers.dev/'
    
    const constdata = async () => {
        let url = commonlink +'constituencywisedata?electionTypeId=' + data['electionid'] + '&stateId=' + data['stateid'] ;
        const res1 = await fetch(url)
        const ans1 = await res1.json()
        console.log(ans1['data'])
        if (ans1['data']['stateWiseData'] !== null) {
        setConstidata(ans1['data']['stateWiseData']['lstConstituencyWiseData'])
        setIsnull1(false)
        }
        }
        useEffect(() => {
            constdata()
            },[])
        
    const [stdata, setStdata] = useState([])
    const [insull2,setIsnull2] = useState(true)

    const statedata = async () => {
        let url2 = commonlink+'statewisedata?electionTypeId=' + data['electionid'] + '&stateId=' + data['stateid'] ;
        const res2 = await fetch(url2)
        const ans2 = await res2.json()
        console.log(ans2['data'])
        if (ans2['data']['stateWiseData'] !== null) {
        setStdata(ans2['data']['stateWiseData']["lstPartyWiseData"])
        setIsnull2(false)
        }
        }
        useEffect(() => {
            statedata()
            },[])

    
    const [general, setGeneral] = useState([])
    const [insull3,setIsnull3] = useState(true)
    const generaldata = async () => {
        let url3 = commonlink+'countrywisedata' ;
        const res4 = await fetch(url3)
        const ans4 = await res4.json()
        console.log(ans4['data'])
        if (ans4['data']['stateWiseData'] !== null) {
        setGeneral(ans4['data']['stateWiseData']['lstPartyWiseData'])
        setIsnull3(false)
        }}
        useEffect(() => {
            generaldata()
            },[])
    const [userwise, setUserwise] = useState([])
    const contestantdata = async () => {
        let url4 = commonlink+'?contestantsdata' ;
        const res3 = await fetch(url4)
        const ans3 = await res3.json()
        setUserwise(ans3)
        }
    
 
    if (cat === 'State') {
        if (insull2 === false){
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
        else {
            return (
                <div>No Data As Of Now</div>
            )
        }}
    
    if (cat === 'Constituency') {
        if (insull1 === false){
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
    else {
        return (
            <div>No data to show as of now</div>
        )
    }}

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
        console.log(insull3)
        if (insull3 === false){
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
                    {Object.keys(general).map((i) => {
                    let data = general[i];
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
    else {
        return(
    
            <div>No data to show as of now</div>
        )
    }}
}


export default Tables
