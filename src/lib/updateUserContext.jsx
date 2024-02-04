"use client";
import React from "react";

export const UpdateUserContext = React.createContext(null);

export const useUpdateUserContext = () => React.useContext(UpdateUserContext);
