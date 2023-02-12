import { useField } from "formik"

export default function Input({classGroup,type ='text',children,errors,touched,...props}){
    const [field] = useField(props)

    return(
        <div className={classGroup}>
            <input className="c-input" type={type} {...field} {...props}  placeholder={children}/>
            {errors && touched ? (<p className="form-error">{errors}</p>) : null}
        </div>
    )
}