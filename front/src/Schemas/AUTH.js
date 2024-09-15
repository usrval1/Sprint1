import {z}   from "zod";
export const loginSchema = z.object({
    email:z.string().min(1, { message: 'Tienes que colocar tu email!!!!' }),
    password:z.string()//crear las validaciones
    
});