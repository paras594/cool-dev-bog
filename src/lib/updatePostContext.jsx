"use client";
import React from "react";

export const UpdatePostContext = React.createContext(null);

export const useUpdatePostContext = () => React.useContext(UpdatePostContext);
