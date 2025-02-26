"use client";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";
import Loader from "../loader";
import { FirebaseError } from "firebase/app";
import { defaultImage } from "@/assets";

interface UserProps {
  name: string | null;
  email: string | null;
  photo: string | null;
}

const Profile = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser;
        setUser({
          name: currentUser.displayName || "No Name",
          email: currentUser.email,
          photo: currentUser.photoURL || defaultImage.src,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof FirebaseError ? error.message : "Failed to log out";
      toast.error(errorMessage);
    }
  };

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img
          src={user?.photo || defaultImage.src}
          alt="Profile"
          className={styles.profileImage}
        />
        <h2 className={styles.profileName}>Welcome to dashboard</h2>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
