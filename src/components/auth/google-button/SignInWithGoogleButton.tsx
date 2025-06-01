"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithGoogle } from "@/lib/auth-actions";
import { FaGoogle, FaSpinner } from "react-icons/fa";

const SignInWithGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error with Google sign in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FaSpinner className="text-gray-600" />
          </motion.div>
          <span>Conectando...</span>
        </>
      ) : (
        <>
          <FaGoogle className="text-red-500" />
          <span>Continuar con Google</span>
        </>
      )}
    </motion.button>
  );
};

export default SignInWithGoogleButton;