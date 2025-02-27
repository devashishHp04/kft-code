"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./profile.module.css";
import { defaultImage } from "@/assets";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AxiosError } from "axios";

interface UserProps {
  name: string | null;
  email: string;
  photo: string | null;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let email = localStorage.getItem("email");
        email = "tt@gmail.com";
        if (!email) {
          throw new Error("No email found in local storage.");
        }
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log("User Data:", userData);
          setUser(userData as UserProps);
        } else {
          throw new Error("User not found in database.");
        }
      } catch (error) {
        toast.error("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    // fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully!");
      push("/");
    } catch (error: unknown) {
      let errorMessage = "Failed to log out";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {/* <Image
          src={user?.photoURL || defaultImage.src}
          alt="Profile"
          className={styles.profileImage}
          height={100}
          width={100}
        />
        <h2 className={styles.profileName}>{user?.displayName || "User"} </h2>
        <p>{user?.email}</p> */}
        <p>welcome to dashboard</p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
