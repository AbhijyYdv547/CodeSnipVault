export interface Product{
    id: number,
    title:string,
    price:number,
    description:string,
    category:{
        id:string,
        name:string,
        image:string
    },
    images:string[]

}