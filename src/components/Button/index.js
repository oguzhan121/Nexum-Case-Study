export default function Button({type ='button',text,...props}){
    return(
        <button  type={type} {...props}>{text}</button>
    )
}