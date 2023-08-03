import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
  runTransaction,
  Transaction,
} from "firebase/firestore";
import { Member, RoomModel } from "../interfaces/room";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import toast from "react-hot-toast";

const useRoom = () => {
  const [rooms, setRooms] = useState<RoomModel[]>();
  const [roomsLoading, setRoomsLoading] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<RoomModel | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getAllRooms = async () => {
      setRoomsLoading(true);
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
      } finally {
        setRoomsLoading(false);
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

  const enterRoom = (roomID: string) => {
    const roomReference = collection(db, "coderoom");
    const localId = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL;
    const displayName = auth.currentUser?.displayName;
    const unsubscribe = onSnapshot(
      query(
        roomReference,
        where("room_member", "array-contains", {
          local_id: localId,
          display_name: displayName,
          photo_url: photoURL,
        }),
        where("__name__", "==", roomID)
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          const roomSnapshot = snapshot.docs[0];
          setRoomData({
            id: roomSnapshot.id,
            ...roomSnapshot.data(),
          } as RoomModel);
          const members = roomSnapshot.data().room_member as Member[];
          dispatch({ type: "PUSH_MEMBER", payload: members });
        } else {
          setRoomData(null);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  };

  const leaveRoom = () => {
    setRoomData(null);
    dispatch({ type: "PUSH_MEMBER", payload: [] });
  };

  const updateCode = async (code: string, roomID: string) => {
    const roomReference = doc(db, "coderoom", roomID);
    try {
      const response = await updateDoc(roomReference, { code: code });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const createNewRoom = async (roomName: string) => {
    const roomReference = collection(db, "coderoom");
    const localId = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL;
    const displayName = auth.currentUser?.displayName;
    const body: RoomModel = {
      room_name: roomName,
      code: 'console.log("Hello World")',
      room_member: [
        { display_name: displayName, local_id: localId, photo_url: photoURL },
      ],
      created_at: serverTimestamp(),
    };

    try {
      const response = await addDoc(roomReference, body);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const enterRoomCode = async (roomCode: string) => {
    const roomReference = doc(db, "coderoom", roomCode);
    const localId = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL;
    const displayName = auth.currentUser?.displayName;

    try {
      await runTransaction(db, async (transaction: Transaction) => {
        const roomDoc = await transaction.get(roomReference);

        if (!roomDoc.exists()) {
          return Promise.reject("Invalid Room Code!");
        }

        const roomData = roomDoc.data();
        const currentUserExists = roomData?.room_member.some(
          (user: Record<string, unknown>) => {
            return user.local_id === localId;
          }
        );

        if (!currentUserExists) {
          const currentUserData = {
            local_id: localId,
            display_name: displayName,
            photo_url: photoURL,
          };
          transaction.update(roomReference, {
            room_member: [...roomData.room_member, currentUserData],
          });

          toast.success("User added to the room successfully.");
        } else {
          toast.error("User already exists in the room.");
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    rooms,
    roomData,
    enterRoom,
    updateCode,
    createNewRoom,
    leaveRoom,
    roomsLoading,
    enterRoomCode,
  };
};

export default useRoom;
