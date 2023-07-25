import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { RoomModel } from "../interfaces/room";

const useRoom = () => {
  const [rooms, setRooms] = useState<RoomModel[]>();

  useEffect(() => {
    const getAllRooms = async () => {
      const roomReference = collection(db, "coderoom");
      const localId = auth.currentUser?.uid;
      const photoURL = auth.currentUser?.photoURL;
      const displayName = auth.currentUser?.displayName;

      try {
        const querySnapshot = await getDocs(
          query(
            roomReference,
            where("room_member", "array-contains", {
              local_id: localId,
              display_name: displayName,
              photo_url: photoURL,
            })
          )
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (data) {
          const roomData: RoomModel[] = data as RoomModel[];
          return roomData;
        }
      } catch (err) {
        setRooms([]);
        throw err;
      }
    };

    const onAuthStateChangedCallback = () => {
      getAllRooms()
        .then((data) => {
          setRooms(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const unsubscribe = auth.onAuthStateChanged(onAuthStateChangedCallback);
    return () => unsubscribe();
  }, []);

  return { rooms };
};

export default useRoom;
