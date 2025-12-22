import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

// Instagram Posts
export const addPost = async (image: string, permalink: string) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            media_url: image,
            permalink,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding post: ", e);
        throw e;
    }
};

export const getPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
};

// Sponsors
export const addSponsor = async (image: string, link: string) => {
    try {
        const docRef = await addDoc(collection(db, "sponsors"), {
            imageUrl: image,
            link,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding sponsor: ", e);
        throw e;
    }
};

export const getSponsors = async () => {
    const q = query(collection(db, "sponsors"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteSponsor = async (id: string) => {
    await deleteDoc(doc(db, "sponsors", id));
};

// YouTube Videos
export const addYoutubeVideo = async (videoUrl: string, thumbnailUrl: string, title: string, views: string) => {
    try {
        const docRef = await addDoc(collection(db, "youtube_videos"), {
            videoUrl,
            thumbnailUrl,
            title,
            views,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding video: ", e);
        throw e;
    }
};

export const getYoutubeVideos = async () => {
    const q = query(collection(db, "youtube_videos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteYoutubeVideo = async (id: string) => {
    await deleteDoc(doc(db, "youtube_videos", id));
};

// Gear
export const addGear = async (image: string, name: string, category: string, link: string) => {
    try {
        const docRef = await addDoc(collection(db, "gear"), {
            imageUrl: image,
            name,
            category,
            link,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding gear: ", e);
        throw e;
    }
};

export const getGear = async () => {
    const q = query(collection(db, "gear"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteGear = async (id: string) => {
    await deleteDoc(doc(db, "gear", id));
};
