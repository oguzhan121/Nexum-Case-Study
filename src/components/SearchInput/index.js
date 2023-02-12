export default function SearchInput({type ='text',onChange,handleSubmit,children,...props}){
    return(
        <div className="app-search">
            <form onSubmit={handleSubmit}>
                <input className="c-input-search" type={type} onChange={(e) => onChange(e.target.value)} {...props}   placeholder={children}/>
            </form>
        </div>
    )
}