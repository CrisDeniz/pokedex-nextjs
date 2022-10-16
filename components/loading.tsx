import Image from "next/image";

export default function Loader() {
    return(
        <div style={{display: 'flex' , alignItems: 'center', justifyContent: 'center'}}>
            <img style={{textAlign: 'center'}} src='/loading.svg' width={50} height={50}/>
        </div>
    )
}