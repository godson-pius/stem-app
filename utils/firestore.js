import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs, onSnapshot,
    or,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from "@firebase/firestore";
import {db} from "@/firebaseConfig";

export const loginAdmin = async (user) => {
    try {
        const usersRef = collection(db, "users"); // Reference to the 'users' collection
        const q = query(usersRef,
            where("role", "==", "admin"),
            where("email", "==", user.email),
            where("password", "==", user.password)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data(); // Assuming only one admin with this email
            console.log("Admin found:", user);
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const addUserToDb = async (user, role) => {
    try {
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: role, // e.g., "admin", "general", "student"
        });
        console.log("Role assigned to user:", role);
    } catch (error) {
        console.error("Error assigning role:", error.message);
    }
}

export const getUserDetails = async () => {
    try {
        const usersRef = collection(db, "users"); // Reference to the 'users' collection
        const q = query(usersRef, where("email", "==", sessionStorage.getItem('user-email'))); // Query for a user by email
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No user found with this email.");
            return null;
        }

        const userData = querySnapshot.docs[0].data();
        return { id: querySnapshot.docs[0].id, ...userData };
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }
};

export const updateAdminInDb = async (uid, updatedData) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, updatedData);
        console.log("User data updated successfully!");
        return true;
    } catch (error) {
        console.error("Error updating user data:", error.message);
        return false;
    }
}

export const updateUserInDb = async (uid, updatedData) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, updatedData);
        console.log("User data updated successfully!");
        return true;
    } catch (error) {
        console.error("Error updating user data:", error.message);
        return false;
    }
}

export const addCourseToDb = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "courses"), {
            ...data,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error adding courses:", error.message);
        return false;
    }
}

export const addTopicToDb = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "topics"), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Topic added with document ID:", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding topic ID:", error.message);
        return false;
    }
}

export const addVideoToDb = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "uploads"), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Video added with document ID:", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding video ID:", error.message);
        return false;
    }
}

export const getAllStudents = async () => {
    try {
        const usersRef = collection(db, "users"); // Reference to the 'users' collection
        const q = query(usersRef, where("role", "==", "student")); // Query for users with role === "instructors"
        const querySnapshot = await getDocs(q);

        const instructors = [];
        querySnapshot.forEach((doc) => {
            instructors.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        console.log("Instructors:", instructors);
        return instructors;
    } catch (error) {
        console.error("Error fetching instructors:", error.message);
        return [];
    }
}

export const getAllInstructor = async () => {
    try {
        const usersRef = collection(db, "users"); // Reference to the 'users' collection
        const q = query(usersRef, where("role", "==", "instructor")); // Query for users with role === "instructors"
        const querySnapshot = await getDocs(q);

        const instructors = [];
        querySnapshot.forEach((doc) => {
            instructors.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        console.log("Instructors:", instructors);
        return instructors;
    } catch (error) {
        console.error("Error fetching instructors:", error.message);
        return [];
    }
}

export const getAllUploads = async () => {
    try {
        const topicRef = collection(db, "uploads"); // Reference to the 'uploads' collection
        const q = query(topicRef,
            orderBy("createdAt", "desc") // Descending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const uploads = [];
        querySnapshot.forEach((doc) => {
            uploads.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        return uploads;
    } catch (error) {
        console.error("Error fetching uploads:", error.message);
        return [];
    }
}

export const getAllCourse = async (course) => {
    console.log("=>", course.classname)
    try {
        const courseRef = collection(db, "courses"); // Reference to the 'courses' collection
        const q = query(courseRef,
            where("classname", "==", course.classname),
            // orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for courses
        const querySnapshot = await getDocs(q);

        const courses = [];
        querySnapshot.forEach((doc) => {
            courses.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });
        return courses;
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        return [];
    }
}

export const getAllTopicsForACourse = async (course) => {
    try {
        const topicRef = collection(db, "topics"); // Reference to the 'topics' collection
        const q = query(topicRef,
            where("classname", "==", course.classname),
            where("course", "==", course.course),
            where("user", "==", sessionStorage.getItem('user-email')),
            orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const topics = [];
        querySnapshot.forEach((doc) => {
            topics.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        console.log("Topics:", topics);
        return topics;
    } catch (error) {
        console.error("Error fetching topics:", error.message);
        return [];
    }
}

export const getAllUploadsForACourse = async (data) => {
    try {
        const topicRef = collection(db, "uploads"); // Reference to the 'uploads' collection
        const q = query(topicRef,
            where("course", "==", data.course),
            where("topic", "==", data.topic),
            where("user", "==", sessionStorage.getItem('user-email')),
            orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const uploads = [];
        querySnapshot.forEach((doc) => {
            uploads.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        return uploads;
    } catch (error) {
        console.error("Error fetching uploads:", error.message);
        return [];
    }
}

export const getAllUploadsForAnInstructor = async () => {
    try {
        const topicRef = collection(db, "uploads"); // Reference to the 'uploads' collection
        const q = query(topicRef,
            where("user", "==", sessionStorage.getItem('user-email')),
            orderBy("createdAt", "desc") // Descending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const uploads = [];
        querySnapshot.forEach((doc) => {
            uploads.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        return uploads;
    } catch (error) {
        console.error("Error fetching uploads:", error.message);
        return [];
    }
}

export const getAllTopicsForAnInstructor = async () => {
    try {
        const topicRef = collection(db, "topics"); // Reference to the 'topics' collection
        const q = query(topicRef,
            where("user", "==", sessionStorage.getItem('user-email')),
            orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const topics = [];
        querySnapshot.forEach((doc) => {
            topics.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        console.log("Topics:", topics);
        return topics;
    } catch (error) {
        console.error("Error fetching topics:", error.message);
        return [];
    }
}

export const deleteUpload = async (id) => {
    try {
        const docRef = doc(db, "uploads", id);
        await deleteDoc(docRef)
        return true;
    } catch (error) {
        console.log("Error deleting upload: ", error)
        return false;
    }
}

export const deleteTopic = async (id) => {
    try {
        const docRef = doc(db, "topics", id);
        await deleteDoc(docRef)
        return true;
    } catch (error) {
        console.log("Error deleting topic: ", error)
        return false;
    }
}

export const addChat = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "chats"), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Chat Added with document ID:", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding chat ID:", error.message);
        return false;
    }
}

export const addAdminChat = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "adminChats"), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Chat Added with document ID:", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding chat ID:", error.message);
        return false;
    }
}

export const getAllAdminChatWithAnInstructor = (setChats) => {
    try {
        const userEmail = sessionStorage.getItem('user-email');
        if (!userEmail) {
            console.error("No user email found in session storage.");
            return () => {};
        }

        const chatRef = collection(db, "adminChats");
        const q = query(
            chatRef,
            or(
                where("sent", "==", userEmail),
                where("received", "==", userEmail)
            ),
            orderBy("createdAt", "asc")
        );

        // Real-time listener
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedChats = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setChats(updatedChats); // Update state
        });

        return unsubscribe; // Cleanup function for unmounting
    } catch (error) {
        console.error("Error fetching chats:", error.message);
        return () => {};
    }
};

export const getGeneralChat = (setChats) => {
    try {
        const chatRef = collection(db, "chats");

        const q = query(
            chatRef,
            where("received", "==", "general"),
            orderBy("createdAt", "asc")
        );

        // Real-time listener
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedChats = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setChats(updatedChats); // Update state
        });

        return unsubscribe; // Cleanup function for unmounting
    } catch (error) {
        console.error("Error fetching chats:", error.message);
        return () => {};
    }
};

export const getAllTopics = async () => {
    try {
        const topicRef = collection(db, "topics"); // Reference to the 'topics' collection
        const q = query(topicRef,
            orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const topics = [];
        querySnapshot.forEach((doc) => {
            topics.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        console.log("Topics:", topics);
        return topics;
    } catch (error) {
        console.error("Error fetching topics:", error.message);
        return [];
    }
}