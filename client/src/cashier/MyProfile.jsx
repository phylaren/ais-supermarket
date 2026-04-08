import { PageName } from "../pageElems/PageName"

export default function MyProfile(worker){
    return(
        <div>
            <PageName name="Мій профіль"/>
            <h1>My Profile</h1>
            <DataSet/>
        </div>
        );
}

function DataSet(){
    return(
        <ul>
            {/* TB DONE */}
        </ul>
    )
}