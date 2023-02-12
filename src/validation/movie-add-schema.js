import Yup from "./valide";


export const movieAddSchema = Yup.object().shape({
    original_title:Yup.string()
        .required(),
    vote_average:Yup.string()
        .required(),
    artist:Yup.string()
        .required(),
    overview:Yup.string()
        .required(),
})