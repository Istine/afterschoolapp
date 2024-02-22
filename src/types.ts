import { Session } from "next-auth";
import React from "react";

export type LoginType = {
  email: string;
  password: string;
};

export type MetricCardType = {
  title: string;
  value: number;
  Icon: any;
  color: string;
  bg: string;
};

export type AppType = {
  Component: any;
  pageProps: {
    session: Session;
    [key: string]: any;
  };
};

export type InstructorType = {
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  bio: string;
  id: string;
  imageUrl: string;
  file?: any;
};

export type LessonType = {
  title: string;
  id: string;
  duration: string;
  description: string;
  videoUrl: string;
};

export type LessonFormType = {
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
};

export type VideoStateType = {
  play: boolean;
  muted: boolean;
  volume: number;
  played: number;
  seeking: boolean;
  buffer: boolean;
  playBackRate: number;
  fullScreen: boolean;
};

export type ModuleCreationType = {
  module: string;
  lessons: { lessonId: string; selected: boolean }[];
};

export type ModuleType = {
  title: string;
  lessons: string[];
  id?: string;
};

export type CourseCreationType = {
  title: string;
  description: string;
  price: string;
  duration: string;
  courseObjectives: string[];
  teachers: string[];
  videoTrailerUrl: string;
  language: string[];
  modules: string[];
  category: string;
  thumbnail: string;
};

export type AdminType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  id: string;
};

export type FormState = { state: "slogin" | "signup"; visible: boolean };
