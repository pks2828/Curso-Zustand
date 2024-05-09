import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session-storage";
import { fireBaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
  //!Se recomienda que los metodos esten aqui mismo por los slices
  //!Se hara con ontra interfaz por cuestion educativa
  // setFirstName: (value: string) => void;
  // setLastName: (value: string) => void;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

//Agregamos en el generico del state la firma obligatoria para que no salte error [["zustand/devtools", never]] >
const storeApi: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",

  // Se puede quitar el state pero se dejo para fines academicos
  //   setFirstName: (value: string) => set( state => ( { firstName: value } ), false, 'setFirstName' ),
  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

// type PersonStore = PersonState & Actions; Otra manera de mandar el generico

//!Si no tuvieramos el persist, el middleware
// export const usePersonStore = create<PersonState & Actions>()(storeApi);

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeApi, {
        name: "person-storage",
        // storage: customSessionStorage
        storage: fireBaseStorage,
      })
  )
);
