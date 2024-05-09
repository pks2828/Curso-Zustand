import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = 'https://zustand-storage-eee3e-default-rtdb.firebaseio.com/zustand'


const storageApi: StateStorage = {

    getItem: async function (name: string): Promise<string | null> {
        
        // eslint-disable-next-line no-useless-catch
        try{
            const data = await fetch(`${firebaseUrl}/${ name }.json`).then( res => res.json())
            console.log(data);
            return JSON.stringify( data );//! Opcion 1 Lo grabamos como un string

        } catch (error) {
            throw error;
        }

    },

    setItem: async function (name: string, value: string): Promise<void> {
        const data = await fetch(`${firebaseUrl}/${ name }.json`, {
            method: 'PUT',
            body: value //! Opcion 2 lo grabamos como un objeto
        }).then( res => res.json())

        console.log(data);
        

        return;
    },

    removeItem: function (name: string): void  {
        console.log( 'removeItem', name );
    }
}

export const fireBaseStorage = createJSONStorage( () => storageApi )